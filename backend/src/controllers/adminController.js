const bcrypt = require('bcryptjs');
const { DataStore } = require('../config/db');

// Overall System Statistics for Admin Dashboard
async function getAdminOverview(req, res) {
  try {
    const studentsCount = await DataStore.getCollection('students').count();
    const staffCount = await DataStore.getCollection('staff').count();
    const noticesCount = await DataStore.getCollection('notices').count();
    const eventsCount = await DataStore.getCollection('events').count();
    const assignmentsCount = await DataStore.getCollection('assignments').count();
    const submissionsCount = await DataStore.getCollection('submissions').count();
    const libraryCount = await DataStore.getCollection('library').count();

    const recentSubmissions = await DataStore.getCollection('submissions').find();
    const recentNotices = await DataStore.getCollection('notices').find();

    return res.json({
      success: true,
      stats: {
        totalStudents: studentsCount,
        totalFaculty: staffCount,
        totalNotices: noticesCount,
        totalEvents: eventsCount,
        totalAssignments: assignmentsCount,
        totalSubmissions: submissionsCount,
        totalLibraryResources: libraryCount,
        primaryDatabase: DataStore.isLiveMongo() ? 'MongoDB Cluster (Active Connection)' : 'MongoDB Unified Engine (Active)',
        secondaryDatabase: 'Central Digital Academic Repository'
      },
      recentSubmissions: recentSubmissions.slice(-5).reverse(),
      recentNotices: recentNotices.slice(-4).reverse()
    });
  } catch (err) {
    console.error('Error fetching admin overview:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve overview statistics' });
  }
}

// Notice Board Operations (Admin)
async function createNotice(req, res) {
  try {
    const { title, content, category, priority, targetAudience, publishDate } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Notice Title and Content are required' });
    }

    const newNotice = await DataStore.getCollection('notices').create({
      title,
      content,
      category: category || 'Academic',
      priority: priority || 'normal',
      targetAudience: targetAudience || 'all',
      publishedBy: req.user.name || 'Office of the Principal, TRRCT',
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      attachmentName: req.file ? req.file.originalname : null,
      attachmentUrl: req.file ? `/uploads/${req.file.filename}` : null,
      isActive: true
    });

    return res.status(201).json({
      success: true,
      message: 'Notice successfully published on the college portal',
      notice: newNotice
    });
  } catch (err) {
    console.error('Error creating notice:', err);
    return res.status(500).json({ success: false, message: 'Failed to create notice' });
  }
}

async function updateNotice(req, res) {
  try {
    const { noticeId } = req.params;
    const updateData = req.body;

    const notice = await DataStore.getCollection('notices').findById(noticeId);
    if (!notice) {
      return res.status(404).json({ success: false, message: 'Notice not found' });
    }

    const updated = await DataStore.getCollection('notices').updateOne({ id: notice.id }, updateData);
    return res.json({
      success: true,
      message: 'Notice updated successfully',
      notice: updated
    });
  } catch (err) {
    console.error('Error updating notice:', err);
    return res.status(500).json({ success: false, message: 'Failed to update notice' });
  }
}

async function deleteNotice(req, res) {
  try {
    const { noticeId } = req.params;
    const result = await DataStore.getCollection('notices').deleteOne({ id: noticeId });
    return res.json({
      success: true,
      message: 'Notice removed from notice board',
      result
    });
  } catch (err) {
    console.error('Error deleting notice:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete notice' });
  }
}

// Events Management (Admin)
async function createEvent(req, res) {
  try {
    const { title, description, date, time, venue, organizer, bannerUrl, registrationStatus } = req.body;
    if (!title || !date) {
      return res.status(400).json({ success: false, message: 'Event Title and Date are required' });
    }

    const newEvent = await DataStore.getCollection('events').create({
      title,
      description: description || '',
      date,
      time: time || '10:00 AM',
      venue: venue || 'Campus Auditorium, TRRCT',
      organizer: organizer || 'TRR College of Technology',
      bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
      registrationStatus: registrationStatus || 'Open'
    });

    return res.status(201).json({
      success: true,
      message: 'Upcoming event added successfully',
      event: newEvent
    });
  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ success: false, message: 'Failed to create event' });
  }
}

async function deleteEvent(req, res) {
  try {
    const { eventId } = req.params;
    const result = await DataStore.getCollection('events').deleteOne({ id: eventId });
    return res.json({ success: true, message: 'Event deleted successfully', result });
  } catch (err) {
    console.error('Error deleting event:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete event' });
  }
}

// Student Management (Admin)
async function getAllStudents(req, res) {
  try {
    const students = await DataStore.getCollection('students').find();
    return res.json({ success: true, count: students.length, students });
  } catch (err) {
    console.error('Error fetching students:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve students' });
  }
}

async function createStudent(req, res) {
  try {
    const { collegeId, name, dob, department, rollNumber, semester, email, phone } = req.body;
    if (!collegeId || !name || !dob) {
      return res.status(400).json({ success: false, message: 'College ID, Name, and DOB are required' });
    }

    const cleanId = collegeId.trim().toUpperCase();
    const existing = await DataStore.getCollection('students').findOne({ collegeId: cleanId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Student with this College ID already exists' });
    }

    const newStudent = await DataStore.getCollection('students').create({
      collegeId: cleanId,
      name,
      dob: dob.trim(),
      department: department || 'Computer Science & Engineering',
      rollNumber: rollNumber || `22TR1A0${Math.floor(Math.random() * 900 + 100)}`,
      course: 'B.Tech',
      semester: semester || 'IV Semester (2nd Year)',
      section: 'A',
      academicYear: '2025-2026',
      email: email || `${cleanId.toLowerCase()}@trrct.co.in`,
      phone: phone || '+91 98000 00000',
      attendancePercentage: 85.0,
      cgpa: 8.0,
      role: 'student'
    });

    return res.status(201).json({
      success: true,
      message: 'Student enrolled successfully',
      student: newStudent
    });
  } catch (err) {
    console.error('Error creating student:', err);
    return res.status(500).json({ success: false, message: 'Failed to create student' });
  }
}

async function deleteStudent(req, res) {
  try {
    const { studentId } = req.params;
    const cleanId = String(studentId).trim();
    const mongoose = require('mongoose');
    const col = DataStore.getCollection('students');

    let result = await col.deleteOne({ collegeId: cleanId });
    if (!result || !result.deletedCount) {
      result = await col.deleteOne({ collegeId: cleanId.toUpperCase() });
    }
    if (!result || !result.deletedCount) {
      result = await col.deleteOne({ id: cleanId });
    }
    if ((!result || !result.deletedCount) && mongoose.isValidObjectId(cleanId)) {
      result = await col.deleteOne({ _id: cleanId });
    }
    return res.json({ success: true, message: 'Student record removed successfully', result });
  } catch (err) {
    console.error('Error deleting student:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete student' });
  }
}

// Staff Management (Admin)
async function getAllStaff(req, res) {
  try {
    const staffList = await DataStore.getCollection('staff').find();
    const safeStaff = staffList.map(s => {
      const { passwordHash, ...safe } = s;
      return safe;
    });
    return res.json({ success: true, count: safeStaff.length, staff: safeStaff });
  } catch (err) {
    console.error('Error fetching staff list:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve staff' });
  }
}

async function createStaff(req, res) {
  try {
    const { staffId, name, email, department, designation, password, assignedSubjects } = req.body;
    if (!staffId || !name || !password) {
      return res.status(400).json({ success: false, message: 'Staff ID, Name, and Password are required' });
    }

    const cleanId = staffId.trim().toUpperCase();
    const existing = await DataStore.getCollection('staff').findOne({ staffId: cleanId });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Staff ID already exists' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password.trim(), salt);

    const newStaff = await DataStore.getCollection('staff').create({
      staffId: cleanId,
      name,
      email: email || `${cleanId.toLowerCase()}@trrct.co.in`,
      department: department || 'Computer Science & Engineering',
      designation: designation || 'Assistant Professor',
      passwordHash,
      role: 'staff',
      assignedSubjects: assignedSubjects ? (Array.isArray(assignedSubjects) ? assignedSubjects : [assignedSubjects]) : ['Core Engineering']
    });

    const { passwordHash: _, ...safe } = newStaff;
    return res.status(201).json({
      success: true,
      message: 'Faculty member enrolled successfully',
      staff: safe
    });
  } catch (err) {
    console.error('Error creating staff:', err);
    return res.status(500).json({ success: false, message: 'Failed to create staff' });
  }
}

async function deleteStaff(req, res) {
  try {
    const { staffId } = req.params;
    const cleanId = String(staffId).trim();
    const mongoose = require('mongoose');
    const col = DataStore.getCollection('staff');

    let result = await col.deleteOne({ staffId: cleanId });
    if (!result || !result.deletedCount) {
      result = await col.deleteOne({ staffId: cleanId.toUpperCase() });
    }
    if (!result || !result.deletedCount) {
      result = await col.deleteOne({ id: cleanId });
    }
    if ((!result || !result.deletedCount) && mongoose.isValidObjectId(cleanId)) {
      result = await col.deleteOne({ _id: cleanId });
    }
    return res.json({ success: true, message: 'Faculty member record removed successfully', result });
  } catch (err) {
    console.error('Error deleting staff:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete faculty member' });
  }
}

module.exports = {
  getAdminOverview,
  createNotice,
  updateNotice,
  deleteNotice,
  createEvent,
  deleteEvent,
  getAllStudents,
  createStudent,
  deleteStudent,
  getAllStaff,
  createStaff,
  deleteStaff
};
