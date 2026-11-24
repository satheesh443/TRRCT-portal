const { DataStore } = require('../config/db');

// Get all assignments for student's department/semester
async function getStudentAssignments(req, res) {
  try {
    const student = await DataStore.getCollection('students').findOne({ collegeId: req.user.collegeId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    const allAssignments = await DataStore.getCollection('assignments').find();
    const mySubmissions = await DataStore.getCollection('submissions').find({ studentCollegeId: student.collegeId });

    // Map assignments with submission status
    const assignmentsWithStatus = allAssignments.map(asn => {
      const submission = mySubmissions.find(sub => String(sub.assignmentId) === String(asn.id));
      return {
        ...asn,
        isSubmitted: !!submission,
        submission: submission || null
      };
    });

    return res.json({
      success: true,
      count: assignmentsWithStatus.length,
      assignments: assignmentsWithStatus
    });
  } catch (err) {
    console.error('Error fetching student assignments:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assignments' });
  }
}

// Submit Assignment
async function submitAssignment(req, res) {
  try {
    const { assignmentId, submissionNotes, externalUrl } = req.body;
    const studentCollegeId = req.user.collegeId;

    if (!assignmentId) {
      return res.status(400).json({ success: false, message: 'Assignment ID is required' });
    }

    const assignment = await DataStore.getCollection('assignments').findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment does not exist' });
    }

    const student = await DataStore.getCollection('students').findOne({ collegeId: studentCollegeId });

    let fileName = 'solution_document.pdf';
    let fileUrl = '';

    if (req.file) {
      fileName = req.file.originalname;
      fileUrl = `/uploads/${req.file.filename}`;
    } else if (externalUrl) {
      fileName = 'Project_Repository_Link';
      fileUrl = externalUrl;
    }

    // Check if previously submitted -> update, else create
    const existing = await DataStore.getCollection('submissions').findOne({
      assignmentId: String(assignmentId),
      studentCollegeId
    });

    if (existing) {
      const updated = await DataStore.getCollection('submissions').updateOne(
        { id: existing.id },
        {
          fileName: fileName || existing.fileName,
          fileUrl: fileUrl || existing.fileUrl,
          externalUrl: externalUrl || existing.externalUrl,
          studentNotes: submissionNotes || existing.studentNotes,
          submissionDate: new Date().toISOString(),
          status: 'Submitted'
        }
      );
      return res.json({
        success: true,
        message: 'Assignment submission updated successfully',
        submission: updated
      });
    }

    const newSubmission = await DataStore.getCollection('submissions').create({
      assignmentId: String(assignmentId),
      assignmentTitle: assignment.title,
      studentCollegeId,
      studentName: student ? student.name : req.user.name,
      department: student ? student.department : 'Computer Science & Engineering',
      submissionDate: new Date().toISOString(),
      submissionType: req.file ? 'Document Upload' : 'External Link / Repository',
      fileName,
      fileUrl,
      externalUrl: externalUrl || '',
      studentNotes: submissionNotes || '',
      status: 'Submitted',
      marksAwarded: null,
      maxMarks: assignment.maxMarks || 25,
      feedback: 'Pending faculty evaluation.',
      evaluatedBy: null,
      evaluatedAt: null
    });

    return res.status(201).json({
      success: true,
      message: 'Assignment submitted successfully to course faculty',
      submission: newSubmission
    });
  } catch (err) {
    console.error('Error submitting assignment:', err);
    return res.status(500).json({ success: false, message: 'Failed to submit assignment' });
  }
}

// Get all submissions for logged in student
async function getMySubmissions(req, res) {
  try {
    const studentCollegeId = req.user.collegeId;
    const submissions = await DataStore.getCollection('submissions').find({ studentCollegeId });
    return res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (err) {
    console.error('Error fetching student submissions:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
  }
}

// Get Exam Results / Grade Card
async function getStudentResults(req, res) {
  try {
    const studentCollegeId = req.user.collegeId;
    const results = await DataStore.getCollection('results').find({ studentCollegeId });

    return res.json({
      success: true,
      count: results.length,
      results
    });
  } catch (err) {
    console.error('Error fetching student results:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve results' });
  }
}

// Get Live Attendance & Academic Standing
async function getStudentAttendance(req, res) {
  try {
    const student = await DataStore.getCollection('students').findOne({ collegeId: req.user.collegeId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    const memoryDb = require(require('path').join(__dirname, '../../../database/seeds/initialData.js'));
    const subjectList = memoryDb.subject_attendance[student.collegeId] || [
      { code: "CS401PC", name: "Database Management Systems", faculty: "Prof. Sunita Rao", totalHeld: 48, attended: 44, percentage: 91.6 },
      { code: "CS402PC", name: "Design & Analysis of Algorithms", faculty: "Dr. A. Ramakrishna", totalHeld: 50, attended: 45, percentage: 90.0 },
      { code: "CS403PC", name: "Web Technologies Full Stack", faculty: "Prof. Sunita Rao", totalHeld: 42, attended: 36, percentage: 85.7 },
      { code: "CS404PC", name: "Operating Systems", faculty: "Dr. M. Sridhar", totalHeld: 46, attended: 40, percentage: 86.9 }
    ];

    const totalClassesHeld = subjectList.reduce((acc, s) => acc + s.totalHeld, 0);
    const totalAttended = subjectList.reduce((acc, s) => acc + s.attended, 0);
    const overallPercentage = totalClassesHeld > 0 ? ((totalAttended / totalClassesHeld) * 100).toFixed(1) : student.attendancePercentage;

    return res.json({
      success: true,
      studentId: student.collegeId,
      name: student.name,
      attendancePercentage: Number(overallPercentage),
      totalHeld: totalClassesHeld,
      totalAttended: totalAttended,
      standing: Number(overallPercentage) >= 75 ? 'Good Standing (Eligible for Examinations)' : 'Shortage Alert (< 75%)',
      subjects: subjectList
    });
  } catch (err) {
    console.error('Error fetching student live attendance:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve attendance record' });
  }
}

// Get Student Weekly Timetable
async function getStudentTimeTable(req, res) {
  try {
    const memoryDb = require(require('path').join(__dirname, '../../../database/seeds/initialData.js'));
    const timetable = memoryDb.timetables.student;

    return res.json({
      success: true,
      timetable
    });
  } catch (err) {
    console.error('Error fetching student timetable:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve timetable' });
  }
}

module.exports = {
  getStudentAssignments,
  submitAssignment,
  getMySubmissions,
  getStudentResults,
  getStudentAttendance,
  getStudentTimeTable
};
