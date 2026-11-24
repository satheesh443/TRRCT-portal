const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { verifyToken, requireRoles } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All staff routes require staff role
router.use(verifyToken, requireRoles('staff'));

router.get('/assignments', staffController.getStaffAssignments);
router.post('/assignments', upload.single('assignmentFile'), staffController.createAssignment);
router.get('/submissions/:assignmentId', staffController.getAssignmentSubmissions);
router.post('/submissions/:submissionId/evaluate', staffController.evaluateSubmission);
router.post('/results/update', staffController.updateStudentMarks);
router.get('/students', staffController.getEnrolledStudents);

// Live Attendance & Timetable
router.post('/attendance/submit', staffController.submitLiveAttendance);
router.get('/attendance/history', staffController.getAttendanceHistory);
router.get('/timetable', staffController.getStaffTimeTable);

module.exports = router;
