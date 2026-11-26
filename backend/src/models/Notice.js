const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['Examinations', 'Academic', 'Admissions', 'Placements', 'Events'] },
  priority: { type: String, default: 'normal', enum: ['normal', 'high'] },
  targetAudience: { type: String, default: 'all' },
  publishedBy: { type: String, required: true },
  publishDate: { type: String, required: true },
  attachmentName: { type: String },
  attachmentUrl: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);
