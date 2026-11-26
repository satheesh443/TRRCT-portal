const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  studentId: { type: String, required: true, uppercase: true },
  rollNumber: { type: String, required: true },
  studentName: { type: String, required: true },
  status: { type: String, required: true, enum: ['Present', 'Absent'] }
}, { _id: false });

const attendanceSessionSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  date: { type: String, required: true },
  subjectCode: { type: String, default: 'CS401PC' },
  subjectName: { type: String, required: true },
  semester: { type: String, default: 'IV Semester (2nd Year)' },
  department: { type: String, default: 'Computer Science & Engineering' },
  facultyId: { type: String, required: true },
  facultyName: { type: String, required: true },
  period: { type: String, required: true },
  totalStudents: { type: Number, required: true },
  presentCount: { type: Number, required: true },
  records: [attendanceRecordSchema],
  recordedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
