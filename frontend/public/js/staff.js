// TRR College of Technology - Faculty Portal Logic
let staffUser = null;
let allSubmissions = [];
let enrolledStudentsList = [];

document.addEventListener('DOMContentLoaded', async () => {
  const role = API.getRole();
  if (role !== 'staff') {
    API.showToast('Please sign in with faculty credentials to access this portal.', 'warning');
    setTimeout(() => { window.location.href = '/'; }, 1000);
    return;
  }

  staffUser = API.getUser() || {
    name: "Dr. A. Ramakrishna",
    staffId: "FAC-CSE-01",
    designation: "Professor & Head of Department",
    department: "Computer Science & Engineering"
  };

  populateStaffHeader(staffUser);

  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const attDate = document.getElementById('att-date');
  if (attDate) attDate.value = today;

  const dueInput = document.getElementById('asn-due-date');
  if (dueInput) {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    dueInput.value = future.toISOString().split('T')[0];
  }

  // Load Data
  await loadAttendanceRoster();
  await loadAttendanceHistory();
  await loadStaffTimeTable();
  await loadStaffAssignments();
  await loadSubmissions();
  await loadStaffLibrary();
});

function populateStaffHeader(user) {
  document.getElementById('header-staff-name').textContent = user.name || 'Professor';
  document.getElementById('header-staff-meta').textContent = `${user.staffId || 'FAC-CSE-01'} • ${user.designation || 'Faculty'}`;
  document.getElementById('staff-name-display').textContent = user.name || 'Professor';
  document.getElementById('staff-meta-display').textContent = `${user.designation || 'Faculty'} | ${user.department || 'Computer Science & Engineering'}`;
}

// Tab Switching
function switchStaffTab(tabId) {
  const tabs = ['attendance', 'timetable', 'assignments', 'grading', 'marks', 'library'];
  tabs.forEach(t => {
    const navBtn = document.getElementById(`staff-tab-${t}`);
    const section = document.getElementById(`staff-content-${t}`);
    if (navBtn && section) {
      if (t === tabId) {
        navBtn.className = 'staff-nav-tab active bg-emerald-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm';
        section.classList.remove('hidden');
      } else {
        navBtn.className = 'staff-nav-tab bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all';
        section.classList.add('hidden');
      }
    }
  });
}

// 1. LIVE ATTENDANCE ROSTER
async function loadAttendanceRoster() {
  const tbody = document.getElementById('attendance-roster-tbody');
  if (!tbody) return;

  try {
    const res = await API.getEnrolledStudents();
    if (res.success && res.students) {
      enrolledStudentsList = res.students;
      document.getElementById('metric-staff-students').textContent = enrolledStudentsList.length;

      tbody.innerHTML = enrolledStudentsList.map(s => `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-2.5 px-3 font-mono font-bold text-trr-blue">${s.rollNumber}</td>
          <td class="py-2.5 px-3 font-bold text-slate-900">${s.name}</td>
          <td class="py-2.5 px-3 text-center">
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked id="att-chk-${s.collegeId}" class="student-attendance-chk sr-only peer" data-student-id="${s.collegeId}" data-name="${s.name}" data-roll="${s.rollNumber}">
              <div class="relative w-11 h-6 bg-rose-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              <span class="ms-2 text-[11px] font-bold text-slate-600 status-text">Present</span>
            </label>
          </td>
        </tr>
      `).join('');

      // Add event listeners for checkbox labels
      document.querySelectorAll('.student-attendance-chk').forEach(chk => {
        chk.addEventListener('change', (e) => {
          const span = e.target.parentElement.querySelector('.status-text');
          if (span) {
            span.textContent = e.target.checked ? 'Present' : 'Absent';
            span.className = e.target.checked ? 'ms-2 text-[11px] font-bold text-emerald-700 status-text' : 'ms-2 text-[11px] font-bold text-rose-700 status-text';
          }
        });
      });
    }
  } catch (err) {
    console.error('Error loading attendance roster:', err);
  }
}

// Toggle all checkboxes
function toggleAllAttendance(status) {
  document.querySelectorAll('.student-attendance-chk').forEach(chk => {
    chk.checked = status;
    const span = chk.parentElement.querySelector('.status-text');
    if (span) {
      span.textContent = status ? 'Present' : 'Absent';
      span.className = status ? 'ms-2 text-[11px] font-bold text-emerald-700 status-text' : 'ms-2 text-[11px] font-bold text-rose-700 status-text';
    }
  });
}

// Submit Live Attendance
async function submitAttendanceSession() {
  const btn = document.getElementById('commit-att-btn');
  const date = document.getElementById('att-date').value;
  const subjectSelect = document.getElementById('att-subject');
  const subjectCode = subjectSelect.value;
  const subjectName = subjectSelect.options[subjectSelect.selectedIndex].text.split(': ')[1] || subjectSelect.value;
  const period = document.getElementById('att-period').value;

  const checkboxes = document.querySelectorAll('.student-attendance-chk');
  const attendanceList = [];
  checkboxes.forEach(chk => {
    attendanceList.push({
      studentId: chk.getAttribute('data-student-id'),
      studentName: chk.getAttribute('data-name'),
      rollNumber: chk.getAttribute('data-roll'),
      status: chk.checked ? 'Present' : 'Absent'
    });
  });

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Recording attendance in database...`;

  try {
    const res = await API.submitLiveAttendance({
      date,
      subjectCode,
      subjectName,
      semester: 'IV Semester (2nd Year)',
      period,
      attendanceList
    });
    if (res.success) {
      API.showToast(res.message, 'success');
      await loadAttendanceHistory();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to submit attendance', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up mr-1"></i> Commit Attendance to Database`;
  }
}

// Load Attendance History Log
async function loadAttendanceHistory() {
  const container = document.getElementById('attendance-history-list');
  const countSpan = document.getElementById('att-sessions-count');
  if (!container) return;

  try {
    const res = await API.getAttendanceHistory();
    if (res.success && res.sessions) {
      if (countSpan) countSpan.textContent = `${res.sessions.length} Recorded`;
      if (res.sessions.length === 0) {
        container.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">No sessions recorded today.</div>`;
        return;
      }

      container.innerHTML = res.sessions.slice(-8).reverse().map(ses => {
        const pct = ((ses.presentCount / ses.totalStudents) * 100).toFixed(0);
        return `
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div class="flex justify-between items-center">
              <span class="font-bold text-slate-900">${ses.subjectName}</span>
              <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">${pct}% Present</span>
            </div>
            <div class="text-[11px] text-slate-500 flex justify-between">
              <span><i class="fa-solid fa-calendar mr-1"></i> ${ses.date} • ${ses.period}</span>
              <span>${ses.presentCount} / ${ses.totalStudents} Attended</span>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Error loading attendance history:', err);
  }
}

// 2. TEACHING TIMETABLE
async function loadStaffTimeTable() {
  const tbody = document.getElementById('staff-timetable-tbody');
  if (!tbody) return;

  try {
    const res = await API.getStaffTimeTable();
    if (res.success && res.schedule) {
      tbody.innerHTML = res.schedule.map(slot => `
        <tr class="hover:bg-slate-50 transition-colors">
          <td class="py-3 px-4 font-bold text-slate-900">${slot.day}</td>
          <td class="py-3 px-4 font-mono text-emerald-700 font-bold">${slot.time}</td>
          <td class="py-3 px-4 font-bold text-slate-900">${slot.subject}</td>
          <td class="py-3 px-4 text-slate-600">${slot.class}</td>
          <td class="py-3 px-4 font-mono text-slate-500">${slot.room}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading staff timetable:', err);
  }
}

// 3. STAFF ASSIGNMENTS
async function loadStaffAssignments() {
  const container = document.getElementById('staff-assignments-list');
  try {
    const res = await API.getStaffAssignments();
    if (res.success && res.assignments) {
      document.getElementById('staff-asn-count').textContent = `${res.assignments.length} Total`;
      document.getElementById('metric-staff-assignments').textContent = res.assignments.length;

      if (res.assignments.length === 0) {
        container.innerHTML = `<div class="p-6 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">No assignments created yet. Use the form to post one.</div>`;
        return;
      }

      container.innerHTML = res.assignments.map(asn => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 hover:border-emerald-500 transition-colors">
          <div class="flex justify-between items-center text-xs">
            <span class="font-bold text-emerald-700 uppercase">${asn.subject} • ${asn.semester}</span>
            <span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">Due: ${asn.dueDate}</span>
          </div>
          <h4 class="font-bold text-sm text-slate-900">${asn.title}</h4>
          <p class="text-xs text-slate-600 line-clamp-2">${asn.description}</p>
          <div class="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
            <span class="text-slate-400">Max Marks: ${asn.maxMarks}</span>
            <button onclick="filterSubmissionsFor('${asn.id}')" class="text-emerald-700 font-bold hover:underline flex items-center gap-1">
              View Student Submissions <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading staff assignments:', err);
  }
}

// Handle Create Assignment
async function handleCreateAssignment(e) {
  e.preventDefault();
  const btn = document.getElementById('create-asn-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Publishing...`;

  const formData = new FormData();
  formData.append('title', document.getElementById('asn-title').value);
  formData.append('subject', document.getElementById('asn-subject').value);
  formData.append('semester', document.getElementById('asn-semester').value);
  formData.append('dueDate', document.getElementById('asn-due-date').value);
  formData.append('maxMarks', document.getElementById('asn-max-marks').value);
  formData.append('description', document.getElementById('asn-desc').value);
  formData.append('instructions', document.getElementById('asn-instructions').value);

  try {
    const res = await API.createAssignment(formData);
    if (res.success) {
      API.showToast('Assignment published successfully to student portals!', 'success');
      document.getElementById('create-assignment-form').reset();
      await loadStaffAssignments();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to create assignment', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Publish Assignment to Students';
  }
}

// 4. SUBMISSIONS & GRADING
async function loadSubmissions() {
  const tbody = document.getElementById('submissions-table-body');
  try {
    const res = await API.getAssignmentSubmissions('all');
    if (res.success && res.submissions) {
      allSubmissions = res.submissions;
      document.getElementById('metric-staff-submissions').textContent = allSubmissions.length;

      if (allSubmissions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-400">No submissions received yet.</td></tr>`;
        return;
      }

      renderSubmissionsTable(allSubmissions);
    }
  } catch (err) {
    console.error('Error loading submissions:', err);
  }
}

function renderSubmissionsTable(subs) {
  const tbody = document.getElementById('submissions-table-body');
  tbody.innerHTML = subs.map(sub => {
    const isEvaluated = sub.status === 'Evaluated';
    const statusClass = isEvaluated ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800';

    let artifactLink = `<span class="text-slate-400">None</span>`;
    if (sub.externalUrl) {
      artifactLink = `<a href="${sub.externalUrl}" target="_blank" class="text-trr-blue hover:underline font-mono text-[11px]"><i class="fa-solid fa-link mr-1"></i> Project Repo</a>`;
    } else if (sub.fileUrl) {
      artifactLink = `<a href="${sub.fileUrl}" target="_blank" class="text-trr-blue hover:underline text-[11px]"><i class="fa-solid fa-file-pdf mr-1"></i> View File</a>`;
    }

    return `
      <tr>
        <td class="py-3 px-4 font-bold text-slate-900">
          <div>${sub.studentName}</div>
          <div class="text-[10px] text-slate-400 font-mono">${sub.studentCollegeId}</div>
        </td>
        <td class="py-3 px-4 text-slate-700">${sub.assignmentTitle}</td>
        <td class="py-3 px-3 text-slate-500 text-[11px]">${new Date(sub.submissionDate).toLocaleDateString()}</td>
        <td class="py-3 px-3">${artifactLink}</td>
        <td class="py-3 px-3 text-center font-bold">
          ${isEvaluated ? `<span class="text-emerald-700 font-black">${sub.marksAwarded} / ${sub.maxMarks || 25}</span>` : '<span class="text-slate-400">--</span>'}
        </td>
        <td class="py-3 px-3 text-center">
          <span class="${statusClass} text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">${sub.status}</span>
        </td>
        <td class="py-3 px-4 text-right">
          <button onclick="openGradingModal('${sub.id}')" class="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 px-3 py-1 rounded text-xs font-bold transition-colors">
            ${isEvaluated ? 'Edit Marks' : 'Evaluate'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterSubmissionsFor(assignmentId) {
  switchStaffTab('grading');
  const filtered = allSubmissions.filter(s => String(s.assignmentId) === String(assignmentId));
  renderSubmissionsTable(filtered.length ? filtered : allSubmissions);
}

// Grading Modal
function openGradingModal(submissionId) {
  const sub = allSubmissions.find(s => String(s.id) === String(submissionId));
  if (!sub) return;

  document.getElementById('grade-sub-id').value = sub.id;
  document.getElementById('grade-student-name').textContent = `${sub.studentName} (${sub.studentCollegeId})`;
  document.getElementById('grade-task-title').textContent = sub.assignmentTitle;
  document.getElementById('grade-max-marks').textContent = sub.maxMarks || 25;
  document.getElementById('grade-marks-input').value = sub.marksAwarded !== null ? sub.marksAwarded : 24;
  document.getElementById('grade-feedback-input').value = sub.feedback || 'Well analyzed and properly structured solution.';

  const artifactDiv = document.getElementById('grade-artifact-container');
  artifactDiv.innerHTML = `
    <strong>Student Submission Notes:</strong> ${sub.studentNotes || 'No additional comments.'}
    <div class="mt-1 pt-1 border-t border-slate-200">
      ${sub.externalUrl ? `<a href="${sub.externalUrl}" target="_blank" class="text-trr-blue font-bold hover:underline"><i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> Open Repository / Link: ${sub.externalUrl}</a>` : ''}
      ${sub.fileUrl ? `<a href="${sub.fileUrl}" target="_blank" class="text-trr-blue font-bold hover:underline ml-2"><i class="fa-solid fa-download mr-1"></i> Download Solution File: ${sub.fileName || 'Document'}</a>` : ''}
    </div>
  `;

  document.getElementById('grading-modal').classList.remove('hidden');
}

function closeGradingModal() {
  document.getElementById('grading-modal').classList.add('hidden');
}

async function submitEvaluation(e) {
  e.preventDefault();
  const subId = document.getElementById('grade-sub-id').value;
  const marks = document.getElementById('grade-marks-input').value;
  const feedback = document.getElementById('grade-feedback-input').value;

  const btn = document.getElementById('save-grade-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Saving...`;

  try {
    const res = await API.evaluateSubmission(subId, marks, feedback);
    if (res.success) {
      API.showToast('Grade and evaluation successfully recorded in student database!', 'success');
      closeGradingModal();
      await loadSubmissions();
    }
  } catch (err) {
    API.showToast(err.message || 'Evaluation submission failed', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save & Publish Grade';
  }
}

// 5. MARKS UPLOAD
async function handleMarksUpload(e) {
  e.preventDefault();
  const studentCollegeId = document.getElementById('marks-student-id').value;
  const semester = document.getElementById('marks-semester').value;
  const sgpa = document.getElementById('marks-sgpa').value;
  const cgpa = document.getElementById('marks-cgpa').value;

  const internalMarks = Number(document.getElementById('sub-internal').value);
  const externalMarks = Number(document.getElementById('sub-external').value);
  const grade = document.getElementById('sub-grade').value;

  const marksData = {
    studentCollegeId,
    semester,
    sgpa,
    cgpa,
    examType: 'Regular End-Semester Examinations 2026',
    subjects: [
      {
        code: 'CS401PC',
        name: 'Database Management Systems',
        internalMarks,
        externalMarks,
        totalMarks: internalMarks + externalMarks,
        grade,
        gradePoints: 10,
        credits: 4.0,
        status: 'Pass'
      }
    ]
  };

  const btn = document.getElementById('marks-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Committing to DB...`;

  try {
    const res = await API.updateStudentMarks(marksData);
    if (res.success) {
      API.showToast('Marks successfully committed to student grade sheet in MongoDB!', 'success');
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to update marks', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Commit Marks to Student Grade Sheet';
  }
}

// 6. CENTRAL DIGITAL LIBRARY
async function handleAddLibraryItem(e) {
  e.preventDefault();
  const title = document.getElementById('lib-title').value;
  const category = document.getElementById('lib-category').value;
  const department = document.getElementById('lib-dept').value;
  const gdriveViewUrl = document.getElementById('lib-drive-url').value;
  const authorOrPublisher = document.getElementById('lib-author').value;

  const btn = document.getElementById('add-lib-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Registering...`;

  try {
    const res = await API.addLibraryResource({
      title,
      category,
      department,
      gdriveViewUrl,
      gdriveDownloadUrl: gdriveViewUrl,
      authorOrPublisher
    });
    if (res.success) {
      API.showToast('Resource registered in Central Digital Library repository!', 'success');
      document.getElementById('add-library-form').reset();
      await loadStaffLibrary();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to register resource', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Register to Central Digital Library';
  }
}

async function loadStaffLibrary() {
  const container = document.getElementById('staff-library-list');
  try {
    const res = await API.getLibraryResources('All', 'All', '');
    if (res.success && res.resources) {
      container.innerHTML = res.resources.map(item => `
        <div class="bg-white p-3.5 rounded-xl border border-slate-200 flex justify-between items-center text-xs shadow-sm">
          <div>
            <span class="text-[10px] font-bold text-amber-600 uppercase">${item.category}</span>
            <h4 class="font-bold text-slate-900">${item.title}</h4>
            <span class="text-[10px] text-slate-400">Uploaded by: ${item.uploadedBy || 'Faculty'}</span>
          </div>
          <a href="${item.gdriveViewUrl}" target="_blank" class="bg-blue-50 text-trr-blue hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold transition-colors">
            Preview
          </a>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading library:', err);
  }
}
