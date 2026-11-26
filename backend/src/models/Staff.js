const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  role: { type: String, default: 'faculty' },
  email: { type: String, lowercase: true, trim: true },
  phone: { type: String },
  joiningYear: { type: Number, default: 2020 },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
