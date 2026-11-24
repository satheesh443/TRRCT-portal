const { DataStore } = require('../config/db');

// Central Digital Library Service & Controller
// STRICT ACCESS CONTROL: Only authenticated students, faculty, or management can access.

const DEFAULT_DRIVE_FOLDER = process.env.GOOGLE_DRIVE_FOLDER_URL || 'https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK';

// Get all library resources
async function getLibraryResources(req, res) {
  try {
    const { category, department, search } = req.query;
    let items = await DataStore.getCollection('library').find();

    if (category && category !== 'All') {
      items = items.filter(item => item.category && item.category.toLowerCase() === category.toLowerCase());
    }

    if (department && department !== 'All') {
      items = items.filter(item => item.department && item.department.toLowerCase().includes(department.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter(item =>
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.subject && item.subject.toLowerCase().includes(q)) ||
        (item.authorOrPublisher && item.authorOrPublisher.toLowerCase().includes(q))
      );
    }

    return res.json({
      success: true,
      count: items.length,
      storageEngine: 'Central Digital Academic Repository',
      repositoryFolderUrl: DEFAULT_DRIVE_FOLDER,
      driveFolderUrl: DEFAULT_DRIVE_FOLDER,
      userRole: req.user.role,
      userName: req.user.name,
      resources: items
    });
  } catch (err) {
    console.error('Error fetching library resources:', err);
    return res.status(500).json({ success: false, message: 'Failed to access central digital library' });
  }
}

// Get single resource details
async function getLibraryResourceById(req, res) {
  try {
    const { resourceId } = req.params;
    const item = await DataStore.getCollection('library').findById(resourceId);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    // Increment download/view counter
    await DataStore.getCollection('library').updateOne(
      { id: item.id },
      { downloadsCount: (item.downloadsCount || 0) + 1 }
    );

    return res.json({
      success: true,
      item
    });
  } catch (err) {
    console.error('Error retrieving library resource:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve item' });
  }
}

// Add New Material (Faculty or Admin only)
async function addLibraryResource(req, res) {
  try {
    const {
      title,
      category,
      department,
      semester,
      subject,
      authorOrPublisher,
      gdriveViewUrl,
      gdriveDownloadUrl,
      description
    } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and Category are required' });
    }

    const viewUrl = gdriveViewUrl || DEFAULT_DRIVE_FOLDER;
    const downloadUrl = gdriveDownloadUrl || DEFAULT_DRIVE_FOLDER;

    const newResource = await DataStore.getCollection('library').create({
      title,
      category,
      department: department || 'Computer Science & Engineering',
      semester: semester || 'All Semesters',
      subject: subject || 'General Engineering',
      authorOrPublisher: authorOrPublisher || `${req.user.name}`,
      fileSize: '18.5 MB',
      format: 'PDF',
      gdriveFileId: process.env.GOOGLE_DRIVE_FOLDER_ID || '1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK',
      gdriveViewUrl: viewUrl,
      gdriveDownloadUrl: downloadUrl,
      description: description || 'Digital learning material uploaded to central institutional repository.',
      accessRestricted: true,
      downloadsCount: 0,
      uploadedBy: `${req.user.name} (${req.user.role.toUpperCase()})`,
      createdAt: new Date().toISOString()
    });

    return res.status(201).json({
      success: true,
      message: 'Resource successfully added to Central Digital Library',
      resource: newResource
    });
  } catch (err) {
    console.error('Error adding library resource:', err);
    return res.status(500).json({ success: false, message: 'Failed to add resource' });
  }
}

// Delete Resource (Admin only)
async function deleteLibraryResource(req, res) {
  try {
    const { resourceId } = req.params;
    const result = await DataStore.getCollection('library').deleteOne({ id: resourceId });
    return res.json({ success: true, message: 'Resource removed from Digital Library', result });
  } catch (err) {
    console.error('Error deleting library resource:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete resource' });
  }
}

module.exports = {
  getLibraryResources,
  getLibraryResourceById,
  addLibraryResource,
  deleteLibraryResource
};
