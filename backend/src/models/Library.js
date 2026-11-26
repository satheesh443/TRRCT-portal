const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: String, default: 'All Semesters' },
  subject: { type: String, default: 'General Engineering' },
  authorOrPublisher: { type: String },
  fileSize: { type: String, default: '15 MB' },
  format: { type: String, default: 'PDF' },
  gdriveFileId: { type: String },
  gdriveViewUrl: { type: String, required: true },
  gdriveDownloadUrl: { type: String, required: true },
  description: { type: String },
  accessRestricted: { type: Boolean, default: true },
  downloadsCount: { type: Number, default: 0 },
  uploadedBy: { type: String, default: 'Administration' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Library', librarySchema);
