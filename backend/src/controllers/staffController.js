const { DataStore } = require('../config/db');

// Get assignments created by this staff member
async function getStaffAssignments(req, res) {
  try {
    const staffId = req.user.staffId;
    const assignments = await DataStore.getCollection('assignments').find({ staffId });
    return res.json({
      success: true,
      count: assignments.length,
      assignments
    });
  } catch (err) {
    console.error('Error fetching staff assignments:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve assignments' });
  }
}

// Create new assignment
async function createAssignment(req, res) {
  try {
    const { title, subject, department, semester, dueDate, maxMarks, description, instructions } = req.body;
    const staffId = req.user.staffId;
    const staffName = req.user.name;

    if (!title || !subject || !dueDate) {
      return res.status(400).json({
        success: false,
        message: 'Assignment Title, Subject, and Due Date are mandatory'
      });
    }

    let resourceFile = '';
    if (req.file) {
      resourceFile = `/uploads/${req.file.filename}`;
    }

    const newAssignment = await DataStore.getCollection('assignments').create({
      title,
      subject,
      department: department || req.user.department || 'Computer Science & Engineering',
      semester: semester || 'IV Semester (2nd Year)',
      staffId,
      staffName,
      dueDate,
      maxMarks: Number(maxMarks) || 25,
      description: description || '',
      instructions: instructions || 'Submit your report or code repository via portal.',
      resourceFile,
      status: 'Active'
    });

    return res.status(201).json({
      success: true,
      message: 'Assignment created and published to students',
      assignment: newAssignment
    });
  } catch (err) {
    console.error('Error creating assignment:', err);
    return res.status(500).json({ success: false, message: 'Failed to create assignment' });
  }
}

// Get all submissions for an assignment
async function getAssignmentSubmissions(req, res) {
  try {
    const { assignmentId } = req.params;
    const query = assignmentId && assignmentId !== 'all' ? { assignmentId } : {};
    const submissions = await DataStore.getCollection('submissions').find(query);
    return res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (err) {
    console.error('Error fetching submissions:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve submissions' });
  }
}

// Evaluate & Grade a Student Submission
async function evaluateSubmission(req, res) {
  try {
    const { submissionId } = req.params;
    const { marksAwarded, feedback } = req.body;
    const evaluatorName = req.user.name;

    if (marksAwarded === undefined || marksAwarded === null) {
      return res.status(400).json({ success: false, message: 'Marks awarded is required' });
    }

    const submission = await DataStore.getCollection('submissions').findById(submissionId);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission record not found' });
    }

    const updated = await DataStore.getCollection('submissions').updateOne(
      { id: submission.id },
      {
        marksAwarded: Number(marksAwarded),
        feedback: feedback || 'Satisfactory work.',
        status: 'Evaluated',
        evaluatedBy: evaluatorName,
        evaluatedAt: new Date().toISOString()
      }
    );

    return res.json({
      success: true,
      message: 'Submission successfully evaluated and graded',
      submission: updated
    });
  } catch (err) {
    console.error('Error evaluating submission:', err);
    return res.status(500).json({ success: false, message: 'Failed to evaluate submission' });
  }
}

// Post/Update Student Semester Exam Result
async function updateStudentMarks(req, res) {
  try {
    const { studentCollegeId, semester, examType, subjects, sgpa, cgpa } = req.body;

    if (!studentCollegeId || !semester || !subjects) {
      return res.status(400).json({
        success: false,
        message: 'Student College ID, Semester, and Subjects list are required'
      });
    }

    const student = await DataStore.getCollection('students').findOne({ collegeId: studentCollegeId });
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student record not found' });
    }

    const existingResult = await DataStore.getCollection('results').findOne({
      studentCollegeId,
      semester
    });

    if (existingResult) {
      const updated = await DataStore.getCollection('results').updateOne(
        { id: existingResult.id },
        {
          subjects,
          sgpa: Number(sgpa) || existingResult.sgpa,
          cgpa: Number(cgpa) || existingResult.cgpa,
          publishedDate: new Date().toISOString().split('T')[0]
        }
      );
      return res.json({
        success: true,
        message: 'Student examination marks updated successfully',
        result: updated
      });
    }

    const newResult = await DataStore.getCollection('results').create({
      studentCollegeId,
      studentName: student.name,
      rollNumber: student.rollNumber,
      department: student.department,
      course: student.course || 'B.Tech',
      semester,
      academicYear: student.academicYear || '2025-2026',
      examType: examType || 'Regular End-Semester Examinations',
      monthYear: 'November 2026',
      sgpa: Number(sgpa) || 8.5,
      cgpa: Number(cgpa) || 8.5,
      resultStatus: 'PASSED',
      totalCreditsRegistered: 20.0,
      totalCreditsEarned: 20.0,
      subjects,
      publishedDate: new Date().toISOString().split('T')[0]
    });

    return res.status(201).json({
      success: true,
      message: 'Examination result successfully published to student record',
      result: newResult
    });
  } catch (err) {
    console.error('Error posting student marks:', err);
    return res.status(500).json({ success: false, message: 'Failed to post student marks' });
  }
}

// Live Attendance: Submit Daily Class Attendance
async function submitLiveAttendance(req, res) {
  try {
    const { date, subjectCode, subjectName, semester, period, attendanceList } = req.body;
    const facultyId = req.user.staffId;
    const facultyName = req.user.name;

    if (!date || !subjectName || !attendanceList || !Array.isArray(attendanceList)) {
      return res.status(400).json({
        success: false,
        message: 'Date, Subject, and Attendance List are required'
      });
    }

    const presentCount = attendanceList.filter(s => s.status === 'Present').length;

    const newSession = await DataStore.getCollection('attendance_sessions').create({
      date,
      subjectCode: subjectCode || 'CS401PC',
      subjectName,
      semester: semester || 'IV Semester (2nd Year)',
      department: req.user.department || 'Computer Science & Engineering',
      facultyId,
      facultyName,
      period: period || 'Period 1 (09:30 - 10:30 AM)',
      totalStudents: attendanceList.length,
      presentCount,
      records: attendanceList,
      recordedAt: new Date().toISOString()
    });

    // Update students' real-time percentage
    for (const record of attendanceList) {
      const student = await DataStore.getCollection('students').findOne({ collegeId: record.studentId });
      if (student) {
        // Minor dynamic adjustment based on status
        let updatedPct = student.attendancePercentage || 88.0;
        if (record.status === 'Present' && updatedPct < 98.0) {
          updatedPct = Math.min(100, Number((updatedPct + 0.3).toFixed(1)));
        } else if (record.status === 'Absent' && updatedPct > 60.0) {
          updatedPct = Math.max(0, Number((updatedPct - 0.7).toFixed(1)));
        }
        await DataStore.getCollection('students').updateOne(
          { collegeId: record.studentId },
          { attendancePercentage: updatedPct }
        );
      }
    }

    return res.status(201).json({
      success: true,
      message: `Daily attendance successfully committed to database (${presentCount}/${attendanceList.length} Present)`,
      session: newSession
    });
  } catch (err) {
    console.error('Error submitting live attendance:', err);
    return res.status(500).json({ success: false, message: 'Failed to commit attendance' });
  }
}

// Live Attendance: Get past sessions submitted by this faculty
async function getAttendanceHistory(req, res) {
  try {
    const facultyId = req.user.staffId;
    const sessions = await DataStore.getCollection('attendance_sessions').find({ facultyId });
    return res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (err) {
    console.error('Error fetching attendance history:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve history' });
  }
}

// Get Faculty Timetable
async function getStaffTimeTable(req, res) {
  try {
    const memoryDb = require(require('path').join(__dirname, '../../../database/seeds/initialData.js'));
    const staffId = req.user.staffId;
    const schedule = (memoryDb.timetables.staff && memoryDb.timetables.staff[staffId]) || [
      { day: "Monday", time: "09:30 AM - 10:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
      { day: "Tuesday", time: "10:30 AM - 11:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
      { day: "Wednesday", time: "10:30 AM - 11:30 AM", subject: "Web Technologies Full Stack", class: "IV Sem CSE-A", room: "LH-204" },
      { day: "Thursday", time: "09:30 AM - 10:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
      { day: "Friday", time: "09:30 AM - 10:30 AM", subject: "Web Technologies Full Stack", class: "IV Sem CSE-A", room: "LH-204" }
    ];

    return res.json({
      success: true,
      facultyId: staffId,
      facultyName: req.user.name,
      schedule
    });
  } catch (err) {
    console.error('Error fetching faculty timetable:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve timetable' });
  }
}

// Get enrolled students in department
async function getEnrolledStudents(req, res) {
  try {
    const students = await DataStore.getCollection('students').find();
    return res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (err) {
    console.error('Error fetching enrolled students:', err);
    return res.status(500).json({ success: false, message: 'Failed to retrieve students' });
  }
}

module.exports = {
  getStaffAssignments,
  createAssignment,
  getAssignmentSubmissions,
  evaluateSubmission,
  updateStudentMarks,
  submitLiveAttendance,
  getAttendanceHistory,
  getStaffTimeTable,
  getEnrolledStudents
};
