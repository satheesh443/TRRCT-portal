const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken, requireRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All student routes require student role
router.use(verifyToken, requireRoles('student'));

router.get('/assignments', studentController.getStudentAssignments);
router.post('/assignments/submit', upload.single('submissionFile'), studentController.submitAssignment);
router.get('/submissions', studentController.getMySubmissions);
router.get('/results', studentController.getStudentResults);
router.get('/attendance', studentController.getStudentAttendance);
router.get('/timetable', studentController.getStudentTimeTable);

module.exports = router;
