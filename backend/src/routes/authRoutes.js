const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/student/login', authController.studentLogin);
router.post('/staff/login', authController.staffLogin);
router.post('/admin/login', authController.adminLogin);
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
