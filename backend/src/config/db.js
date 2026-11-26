const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const models = require('../models');

const LOCAL_DB_PATH = path.join(__dirname, '../../../database/trrct_local_db.json');
const SEED_DATA_PATH = path.join(__dirname, '../../../database/seeds/initialData.js');

let isMongoConnected = false;
let memoryDb = null;

// Map collection names to Mongoose Models
const MODEL_MAP = {
  students: models.Student,
  staff: models.Staff,
  admins: models.Admin,
  notices: models.Notice,
  events: models.Event,
  assignments: models.Assignment,
  submissions: models.Submission,
  results: models.Result,
  library: models.Library,
  attendance_sessions: models.AttendanceSession,
  timetables: models.Timetable
};

// Ensure local JSON DB exists with initial data if needed
function loadLocalDatabase() {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const initialSeed = require(SEED_DATA_PATH);
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialSeed, null, 2), 'utf-8');
      console.log('✓ Initialized Local Document Store with TRRCT seed data');
    }
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    memoryDb = JSON.parse(raw);
    return memoryDb;
  } catch (err) {
    console.error('Error loading local DB:', err);
    memoryDb = {
      admins: [],
      staff: [],
      students: [],
      notices: [],
      events: [],
      assignments: [],
      submissions: [],
      results: [],
      library: [],
      attendance_sessions: []
    };
    return memoryDb;
  }
}

function saveLocalDatabase() {
  try {
    if (memoryDb) {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(memoryDb, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error saving local DB:', err);
  }
}

// Automatically seed MongoDB from initialData.js if collections are empty
async function seedMongoIfEmpty() {
  try {
    const studentCount = await models.Student.countDocuments();
    if (studentCount === 0) {
      console.log('🌱 Empty MongoDB database detected. Seeding collections with TRRCT academic data...');
      const seedData = require(SEED_DATA_PATH);

      if (seedData.admins && seedData.admins.length) {
        await models.Admin.insertMany(seedData.admins.map(a => ({ ...a, id: a.id || a.adminId })));
      }
      if (seedData.staff && seedData.staff.length) {
        await models.Staff.insertMany(seedData.staff.map(s => ({ ...s, id: s.id || s.staffId })));
      }
      if (seedData.students && seedData.students.length) {
        await models.Student.insertMany(seedData.students.map(s => ({ ...s, id: s.id || s.collegeId })));
      }
      if (seedData.notices && seedData.notices.length) {
        await models.Notice.insertMany(seedData.notices.map(n => ({ ...n, id: n.id })));
      }
      if (seedData.events && seedData.events.length) {
        await models.Event.insertMany(seedData.events.map(e => ({ ...e, id: e.id })));
      }
      if (seedData.assignments && seedData.assignments.length) {
        await models.Assignment.insertMany(seedData.assignments.map(a => ({ ...a, id: a.id })));
      }
      if (seedData.submissions && seedData.submissions.length) {
        await models.Submission.insertMany(seedData.submissions.map(s => ({ ...s, id: s.id })));
      }
      if (seedData.results && seedData.results.length) {
        await models.Result.insertMany(seedData.results.map(r => ({ ...r, id: r.id })));
      }
      if (seedData.library && seedData.library.length) {
        await models.Library.insertMany(seedData.library.map(l => ({ ...l, id: l.id })));
      }
      if (seedData.attendance_sessions && seedData.attendance_sessions.length) {
        await models.AttendanceSession.insertMany(seedData.attendance_sessions.map(att => ({ ...att, id: att.id })));
      }

      console.log('✓ Successfully seeded live MongoDB Atlas collections with TRRCT institutional data!');
    } else {
      console.log(`✓ Live MongoDB Atlas verified: ${studentCount} students registered.`);
    }
  } catch (err) {
    console.error('Warning during MongoDB auto-seed:', err.message);
  }
}

// Connect to MongoDB with automatic fallback
async function connectDB() {
  loadLocalDatabase();
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trrct_portal';
  
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    });
    isMongoConnected = true;
    console.log('=======================================================');
    console.log('✓ SUCCESS: Connected to live MongoDB Atlas Cluster!');
    console.log('📌 Database:', mongoose.connection.name);
    console.log('=======================================================');
    
    // Seed initial data to Atlas if empty
    await seedMongoIfEmpty();
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ Notice: MongoDB Atlas connection attempt: ' + err.message);
    console.log('  Operating in High-Performance Persistent Document Store Mode.');
    console.log('✓ Local Document Database active at:', LOCAL_DB_PATH);
  }
}

// Universal Data Access Layer routing to Mongoose Models or Local Store
const DataStore = {
  isLiveMongo: () => isMongoConnected,
  getModels: () => models,
  
  getCollection: (name) => {
    const Model = MODEL_MAP[name];

    // LIVE MONGOOSE MODEL HANDLER
    if (isMongoConnected && Model) {
      return {
        find: async (query = {}) => {
          try {
            return await Model.find(query).lean();
          } catch (err) {
            console.error(`Mongo find error in ${name}:`, err.message);
            return [];
          }
        },

        findOne: async (query = {}) => {
          try {
            return await Model.findOne(query).lean();
          } catch (err) {
            console.error(`Mongo findOne error in ${name}:`, err.message);
            return null;
          }
        },

        findById: async (id) => {
          try {
            return await Model.findOne({
              $or: [{ id: String(id) }, { _id: mongoose.isValidObjectId(id) ? id : null }].filter(Boolean)
            }).lean();
          } catch (err) {
            console.error(`Mongo findById error in ${name}:`, err.message);
            return null;
          }
        },

        create: async (data) => {
          try {
            const id = data.id || data._id || 'trr_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
            const doc = await Model.create({ ...data, id, _id: data._id || undefined });
            return doc.toObject();
          } catch (err) {
            console.error(`Mongo create error in ${name}:`, err.message);
            throw err;
          }
        },

        updateOne: async (query, updateData) => {
          try {
            const updated = await Model.findOneAndUpdate(query, updateData, { new: true }).lean();
            return updated;
          } catch (err) {
            console.error(`Mongo updateOne error in ${name}:`, err.message);
            return null;
          }
        },

        deleteOne: async (query) => {
          try {
            const res = await Model.deleteOne(query);
            return { deletedCount: res.deletedCount };
          } catch (err) {
            console.error(`Mongo deleteOne error in ${name}:`, err.message);
            return { deletedCount: 0 };
          }
        },

        count: async (query = {}) => {
          try {
            return await Model.countDocuments(query);
          } catch (err) {
            return 0;
          }
        }
      };
    }

    // FALLBACK DOCUMENT ENGINE HANDLER
    if (!memoryDb) loadLocalDatabase();
    if (!memoryDb[name]) memoryDb[name] = [];
    
    return {
      find: async (query = {}) => {
        let results = memoryDb[name];
        for (const [key, value] of Object.entries(query)) {
          results = results.filter(item => {
            if (value && typeof value === 'object' && value.$ne !== undefined) {
              return item[key] !== value.$ne;
            }
            if (value && typeof value === 'object' && value.$regex !== undefined) {
              const regex = new RegExp(value.$regex, value.$options || '');
              return regex.test(item[key]);
            }
            return String(item[key]).toLowerCase() === String(value).toLowerCase();
          });
        }
        return JSON.parse(JSON.stringify(results));
      },

      findOne: async (query = {}) => {
        const results = await DataStore.getCollection(name).find(query);
        return results.length > 0 ? results[0] : null;
      },

      findById: async (id) => {
        return await DataStore.getCollection(name).findOne({ id: String(id) }) || 
               await DataStore.getCollection(name).findOne({ _id: String(id) });
      },

      create: async (data) => {
        const id = data.id || data._id || 'trr_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        const newItem = {
          ...data,
          id: id,
          _id: id,
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        memoryDb[name].push(newItem);
        saveLocalDatabase();
        return JSON.parse(JSON.stringify(newItem));
      },

      updateOne: async (query, updateData) => {
        const index = memoryDb[name].findIndex(item => {
          return Object.entries(query).every(([k, v]) => String(item[k]).toLowerCase() === String(v).toLowerCase());
        });
        if (index === -1) return null;
        
        const updated = {
          ...memoryDb[name][index],
          ...updateData,
          updatedAt: new Date().toISOString()
        };
        memoryDb[name][index] = updated;
        saveLocalDatabase();
        return JSON.parse(JSON.stringify(updated));
      },

      deleteOne: async (query) => {
        const initialLength = memoryDb[name].length;
        memoryDb[name] = memoryDb[name].filter(item => {
          return !Object.entries(query).every(([k, v]) => String(item[k]).toLowerCase() === String(v).toLowerCase());
        });
        saveLocalDatabase();
        return { deletedCount: initialLength - memoryDb[name].length };
      },

      count: async (query = {}) => {
        const items = await DataStore.getCollection(name).find(query);
        return items.length;
      }
    };
  }
};

module.exports = {
  connectDB,
  DataStore,
  saveLocalDatabase,
  models
};
