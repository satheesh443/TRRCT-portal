const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, required: true },
  staffId: { type: String, required: true },
  staffName: { type: String, required: true },
  dueDate: { type: String, required: true },
  maxMarks: { type: Number, default: 25 },
  description: { type: String },
  instructions: { type: String },
  resourceFile: { type: String },
  status: { type: String, default: 'Active', enum: ['Active', 'Closed'] },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
