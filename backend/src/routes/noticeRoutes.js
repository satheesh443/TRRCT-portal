const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/noticeController');

// Public endpoints accessible from the college homepage
router.get('/notices', noticeController.getPublicNotices);
router.get('/events', noticeController.getUpcomingEvents);

module.exports = router;
