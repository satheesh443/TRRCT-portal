const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');
const { verifyToken, requireRoles } = require('../middleware/authMiddleware');

// The Google Drive Common Library can ONLY be accessed after login by any authenticated role
router.use(verifyToken);

router.get('/', libraryController.getLibraryResources);
router.get('/:resourceId', libraryController.getLibraryResourceById);

// Adding resources allowed for Staff and Admin
router.post('/', requireRoles('staff', 'admin'), libraryController.addLibraryResource);

// Deleting resources restricted to Admin
router.delete('/:resourceId', requireRoles('admin'), libraryController.deleteLibraryResource);

module.exports = router;
