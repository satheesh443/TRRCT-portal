const mongoose = require('mongoose');

const subjectResultSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  internalMarks: { type: Number, required: true },
  externalMarks: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: { type: String, required: true },
  gradePoints: { type: Number, required: true },
  credits: { type: Number, required: true },
  status: { type: String, default: 'Pass' }
}, { _id: false });

const resultSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  studentCollegeId: { type: String, required: true, uppercase: true },
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true, uppercase: true },
  department: { type: String, required: true },
  course: { type: String, default: 'B.Tech' },
  semester: { type: String, required: true },
  academicYear: { type: String, default: '2025-2026' },
  examType: { type: String, default: 'Regular End-Semester Examinations' },
  monthYear: { type: String },
  sgpa: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  resultStatus: { type: String, default: 'PASSED' },
  totalCreditsRegistered: { type: Number, default: 20.0 },
  totalCreditsEarned: { type: Number, default: 20.0 },
  subjects: [subjectResultSchema],
  publishedDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
