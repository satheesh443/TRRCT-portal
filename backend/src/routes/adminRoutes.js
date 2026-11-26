const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, requireRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All admin routes require admin role
router.use(verifyToken, requireRoles('admin'));

router.get('/overview', adminController.getAdminOverview);

// Notice Board Management
router.post('/notices', upload.single('noticeFile'), adminController.createNotice);
router.put('/notices/:noticeId', adminController.updateNotice);
router.delete('/notices/:noticeId', adminController.deleteNotice);

// Events Management
router.post('/events', adminController.createEvent);
router.delete('/events/:eventId', adminController.deleteEvent);

// Student Directory Management
router.get('/students', adminController.getAllStudents);
router.post('/students', adminController.createStudent);
router.delete('/students/:studentId', adminController.deleteStudent);

// Staff Directory Management
router.get('/staff', adminController.getAllStaff);
router.post('/staff', adminController.createStaff);
router.delete('/staff/:staffId', adminController.deleteStaff);

module.exports = router;
