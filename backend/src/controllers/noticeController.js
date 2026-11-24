const { DataStore } = require('../config/db');

// Get all active public notices
async function getPublicNotices(req, res) {
  try {
    const { category, priority } = req.query;
    let notices = await DataStore.getCollection('notices').find({ isActive: true });

    if (category && category !== 'all') {
      notices = notices.filter(n => n.category && n.category.toLowerCase() === category.toLowerCase());
    }

    if (priority) {
      notices = notices.filter(n => n.priority === priority);
    }

    // Sort newest first
    notices.sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt));

    return res.json({
      success: true,
      count: notices.length,
      notices
    });
  } catch (err) {
    console.error('Error fetching public notices:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve notices' });
  }
}

// Get upcoming events
async function getUpcomingEvents(req, res) {
  try {
    let events = await DataStore.getCollection('events').find();
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.json({
      success: true,
      count: events.length,
      events
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve events' });
  }
}

module.exports = {
  getPublicNotices,
  getUpcomingEvents
};
