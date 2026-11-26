const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true, trim: true },
  description: { type: String },
  date: { type: String, required: true },
  time: { type: String, default: '09:30 AM - 04:30 PM' },
  venue: { type: String, required: true },
  organizer: { type: String, default: 'TRR College of Technology' },
  bannerUrl: { type: String },
  registrationStatus: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
