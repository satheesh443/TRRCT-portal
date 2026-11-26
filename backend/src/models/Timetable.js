const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  type: { type: String, enum: ['student', 'staff'], required: true },
  targetId: { type: String, required: true }, // e.g. 'CSE-IV-A' or 'FAC-CSE-01'
  scheduleData: { type: mongoose.Schema.Types.Mixed, required: true },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
