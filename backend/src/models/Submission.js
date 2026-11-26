const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  assignmentId: { type: String, required: true },
  assignmentTitle: { type: String },
  studentCollegeId: { type: String, required: true, uppercase: true },
  studentName: { type: String, required: true },
  department: { type: String },
  submissionDate: { type: Date, default: Date.now },
  submissionType: { type: String, default: 'Document Upload' },
  fileName: { type: String },
  fileUrl: { type: String },
  externalUrl: { type: String },
  studentNotes: { type: String },
  status: { type: String, default: 'Submitted', enum: ['Submitted', 'Evaluated'] },
  marksAwarded: { type: Number, default: null },
  maxMarks: { type: Number, default: 25 },
  feedback: { type: String, default: 'Pending faculty evaluation.' },
  evaluatedBy: { type: String, default: null },
  evaluatedAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
