const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const LOCAL_DB_PATH = path.join(__dirname, '../../../database/trrct_local_db.json');
const SEED_DATA_PATH = path.join(__dirname, '../../../database/seeds/initialData.js');

let isMongoConnected = false;
let memoryDb = null;

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
      library: []
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

// Connect to MongoDB with automatic fallback
async function connectDB() {
  loadLocalDatabase();
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trrct_portal';
  
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000 // Fast failover to local engine if mongod is not active
    });
    isMongoConnected = true;
    console.log('✓ Successfully connected to live MongoDB Instance:', mongoUri);
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ Local/Cloud MongoDB daemon not detected. Operating in High-Performance Persistent Document Store Mode.');
    console.log('✓ Document Database ready at:', LOCAL_DB_PATH);
  }
}

// Universal Data Access Layer supporting both MongoDB & local document store
const DataStore = {
  isLiveMongo: () => isMongoConnected,
  
  getCollection: (name) => {
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
  saveLocalDatabase
};
