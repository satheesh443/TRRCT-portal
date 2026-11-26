const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  collegeId: { type: String, required: true, unique: true, uppercase: true, trim: true },
  name: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true }, // Format: DD-MM-YYYY
  department: { type: String, required: true },
  course: { type: String, default: 'B.Tech' },
  semester: { type: String, default: 'IV Semester (2nd Year)' },
  academicYear: { type: String, default: '2025-2026' },
  rollNumber: { type: String, required: true, unique: true, uppercase: true, trim: true },
  attendancePercentage: { type: Number, default: 85.0 },
  cgpa: { type: Number, default: 8.5 },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
