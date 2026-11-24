// TRR College of Technology - Student Portal Logic
let studentUser = null;
let assignmentsList = [];

document.addEventListener('DOMContentLoaded', async () => {
  const role = API.getRole();
  if (role !== 'student') {
    API.showToast('Please sign in as an enrolled student to access this portal.', 'warning');
    setTimeout(() => { window.location.href = '/'; }, 1000);
    return;
  }

  studentUser = API.getUser() || {
    name: "Aditya Varma",
    collegeId: "24TRRCT001",
    rollNumber: "22TR1A0501",
    department: "Computer Science & Engineering",
    branchCode: "CSE",
    semester: "IV Semester (2nd Year)",
    attendancePercentage: 88.5,
    cgpa: 8.72
  };

  populateStudentHeader(studentUser);

  // Load Data
  await loadAssignments();
  await loadLiveAttendance();
  await loadTimeTable();
  await loadResults();
  await loadLibraryPreview();
  await loadNotices();
});

function populateStudentHeader(user) {
  document.getElementById('header-student-name').textContent = user.name || 'Aditya Varma';
  document.getElementById('header-student-id').textContent = `${user.collegeId || '24TRRCT001'} • ${user.branchCode || 'CSE'}`;
  document.getElementById('student-name-display').textContent = user.name || 'Aditya Varma';
  document.getElementById('student-meta-display').innerHTML = `
    Roll No: <span class="text-white font-mono font-bold">${user.rollNumber || '22TR1A0501'}</span> | 
    Branch: <span class="text-white font-bold">${user.department || 'Computer Science & Engineering'}</span> | 
    Semester: <span class="text-white font-bold">${user.semester || 'IV Semester (2nd Year)'}</span>
  `;

  if (user.attendancePercentage) {
    document.getElementById('metric-attendance').textContent = `${user.attendancePercentage}%`;
  }
  if (user.cgpa) {
    document.getElementById('metric-cgpa').textContent = user.cgpa;
  }
}

// Tab Switching
function switchStudentTab(tabId) {
  const tabs = ['assignments', 'timetable', 'attendance', 'results', 'library', 'notices'];
  tabs.forEach(t => {
    const navBtn = document.getElementById(`tab-nav-${t}`);
    const section = document.getElementById(`tab-content-${t}`);
    if (navBtn && section) {
      if (t === tabId) {
        navBtn.className = 'student-nav-tab active bg-trr-blue text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm';
        section.classList.remove('hidden');
      } else {
        navBtn.className = 'student-nav-tab bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all';
        section.classList.add('hidden');
      }
    }
  });
}

// Load Assignments
async function loadAssignments() {
  const container = document.getElementById('student-assignments-list');
  try {
    const res = await API.getStudentAssignments();
    if (res.success && res.assignments) {
      assignmentsList = res.assignments;
      document.getElementById('metric-submissions').textContent = `${assignmentsList.filter(a => a.isSubmitted).length}/${assignmentsList.length}`;

      if (assignmentsList.length === 0) {
        container.innerHTML = `<div class="p-8 text-center text-slate-400 col-span-2">No active assignments for your semester.</div>`;
        return;
      }

      container.innerHTML = assignmentsList.map(asn => {
        const sub = asn.submission;
        const isSubmitted = asn.isSubmitted;
        const isEvaluated = sub && sub.status === 'Evaluated';

        let statusBadge = `<span class="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full"><i class="fa-regular fa-clock mr-1"></i> Pending Submission</span>`;
        if (isEvaluated) {
          statusBadge = `<span class="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2.5 py-1 rounded-full"><i class="fa-solid fa-check-double mr-1"></i> Evaluated: ${sub.marksAwarded}/${sub.maxMarks || asn.maxMarks}</span>`;
        } else if (isSubmitted) {
          statusBadge = `<span class="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-full"><i class="fa-solid fa-paper-plane mr-1"></i> Submitted (${new Date(sub.submissionDate).toLocaleDateString()})</span>`;
        }

        return `
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-trr-blue transition-colors">
            <div>
              <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wide">${asn.subject}</span>
                ${statusBadge}
              </div>
              <h3 class="font-bold text-base text-slate-900 leading-snug">${asn.title}</h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">${asn.description}</p>
              ${asn.instructions ? `<div class="mt-2 bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-600 border border-slate-100"><strong>Instructions:</strong> ${asn.instructions}</div>` : ''}
              
              <div class="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span><i class="fa-solid fa-user-tie text-slate-400 mr-1"></i> ${asn.staffName}</span>
                <span><i class="fa-regular fa-calendar-xmark text-rose-500 mr-1"></i> Due: <strong>${asn.dueDate}</strong></span>
                <span><i class="fa-solid fa-trophy text-amber-500 mr-1"></i> Max: ${asn.maxMarks} Marks</span>
              </div>

              ${isEvaluated ? `
                <div class="mt-3 bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                  <div class="font-bold flex items-center justify-between">
                    <span>Faculty Evaluation & Feedback:</span>
                    <span class="bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px]">${sub.marksAwarded} / ${asn.maxMarks}</span>
                  </div>
                  <p class="mt-1 text-[11px] text-emerald-800">${sub.feedback || 'Good job.'}</p>
                  <p class="mt-1 text-[10px] text-emerald-600">Evaluated by: ${sub.evaluatedBy || asn.staffName}</p>
                </div>
              ` : ''}
            </div>

            <div class="pt-3 border-t border-slate-100 flex justify-between items-center">
              ${asn.resourceFile ? `<a href="${asn.resourceFile}" target="_blank" class="text-xs text-trr-blue font-bold hover:underline flex items-center gap-1"><i class="fa-solid fa-download"></i> Problem Case File</a>` : '<span></span>'}
              <button onclick="openSubmissionModal('${asn.id}')" class="bg-trr-blue hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5">
                <i class="fa-solid fa-upload"></i> ${isSubmitted ? 'Resubmit / Update' : 'Submit Task'}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Error loading assignments:', err);
    container.innerHTML = `<div class="p-6 text-center text-rose-600 text-sm">Failed to retrieve assignments.</div>`;
  }
}

// Open Submission Modal
function openSubmissionModal(assignmentId) {
  const asn = assignmentsList.find(a => String(a.id) === String(assignmentId));
  if (!asn) return;

  document.getElementById('submit-assignment-id').value = asn.id;
  document.getElementById('submit-assignment-title').textContent = `${asn.title} (${asn.subject})`;
  document.getElementById('submission-modal').classList.remove('hidden');
}

function closeSubmissionModal() {
  document.getElementById('submission-modal').classList.add('hidden');
  document.getElementById('submission-form').reset();
}

// Handle Submission
async function handleAssignmentSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const assignmentId = document.getElementById('submit-assignment-id').value;
  const fileInput = document.getElementById('submit-file');
  const urlInput = document.getElementById('submit-url').value;
  const notesInput = document.getElementById('submit-notes').value;

  if (!fileInput.files[0] && !urlInput.trim()) {
    API.showToast('Please either upload a solution file or provide a project URL.', 'warning');
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Uploading...`;

  const formData = new FormData();
  formData.append('assignmentId', assignmentId);
  if (fileInput.files[0]) {
    formData.append('submissionFile', fileInput.files[0]);
  }
  formData.append('externalUrl', urlInput);
  formData.append('submissionNotes', notesInput);

  try {
    const res = await API.submitAssignment(formData);
    if (res.success) {
      API.showToast('Assignment submitted successfully to course faculty!', 'success');
      closeSubmissionModal();
      await loadAssignments();
    }
  } catch (err) {
    API.showToast(err.message || 'Submission failed. Please try again.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Submit to Faculty';
  }
}

// Load Time Table
async function loadTimeTable() {
  const tbody = document.getElementById('student-timetable-body');
  if (!tbody) return;

  try {
    const res = await API.getStudentTimeTable();
    if (res.success && res.timetable && res.timetable.days) {
      tbody.innerHTML = res.timetable.days.map(dayObj => {
        return `
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="py-3 px-4 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">${dayObj.day}</td>
            ${dayObj.slots.map(slot => {
              if (slot.subject === 'LUNCH BREAK') {
                return `<td class="py-2 px-2 text-center bg-slate-100 text-[10px] font-bold text-slate-500 border-r border-slate-200">LUNCH</td>`;
              }
              const isLab = slot.subject.toLowerCase().includes('lab');
              const bgClass = isLab ? 'bg-purple-50 text-purple-900 border-purple-100' : 'bg-blue-50 text-blue-900 border-blue-100';
              return `
                <td class="py-2 px-2 border-r border-slate-100">
                  <div class="${bgClass} p-2 rounded-lg border text-center shadow-xs">
                    <div class="font-bold text-[11px] leading-tight">${slot.subject}</div>
                    <div class="text-[9px] text-slate-500 mt-1">${slot.faculty}</div>
                    <div class="text-[9px] text-slate-400 font-mono">${slot.room}</div>
                  </div>
                </td>
              `;
            }).join('')}
          </tr>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Error loading timetable:', err);
  }
}

// Load Live Attendance
async function loadLiveAttendance() {
  const tbody = document.getElementById('live-attendance-tbody');
  if (!tbody) return;

  try {
    const res = await API.getStudentAttendance();
    if (res.success && res.subjects) {
      document.getElementById('metric-attendance').textContent = `${res.attendancePercentage}%`;
      const isEligible = res.attendancePercentage >= 75.0;

      const badge = document.getElementById('attendance-eligibility-pill');
      if (badge) {
        badge.className = isEligible
          ? 'bg-emerald-100 text-emerald-800 text-xs px-3.5 py-1.5 rounded-lg font-bold border border-emerald-200'
          : 'bg-rose-100 text-rose-800 text-xs px-3.5 py-1.5 rounded-lg font-bold border border-rose-200';
        badge.textContent = isEligible ? 'Status: Eligible (> 75% Threshold)' : 'Alert: Attendance Shortage (< 75%)';
      }

      tbody.innerHTML = res.subjects.map(sub => {
        const pct = sub.percentage;
        const color = pct >= 85 ? 'text-emerald-600' : (pct >= 75 ? 'text-blue-600' : 'text-rose-600');
        const status = pct >= 75 ? '<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Eligible</span>' : '<span class="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold">Shortage</span>';

        return `
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-trr-blue">${sub.code}</td>
            <td class="py-3 px-4 font-bold text-slate-900">${sub.name}</td>
            <td class="py-3 px-4 text-slate-600">${sub.faculty}</td>
            <td class="py-3 px-4 text-center font-bold text-slate-700">${sub.totalHeld}</td>
            <td class="py-3 px-4 text-center font-bold text-emerald-700">${sub.attended}</td>
            <td class="py-3 px-4 text-right font-black ${color}">${pct}%</td>
            <td class="py-3 px-4 text-center">${status}</td>
          </tr>
        `;
      }).join('');
    }
  } catch (err) {
    console.error('Error loading live attendance:', err);
  }
}

// Load Semester Results / Grade Card
async function loadResults() {
  const container = document.getElementById('student-results-container');
  try {
    const res = await API.getStudentResults();
    if (res.success && res.results && res.results.length) {
      container.innerHTML = res.results.map(result => {
        return `
          <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm grade-sheet-watermark">
            <div class="bg-gradient-to-r from-trr-navy to-trr-blue text-white p-5 flex flex-col md:flex-row justify-between md:items-center gap-3">
              <div>
                <h3 class="text-base font-extrabold uppercase tracking-wide">TRR COLLEGE OF TECHNOLOGY • EXAMINATIONS BRANCH</h3>
                <p class="text-xs text-amber-300 font-semibold">${result.examType} - ${result.monthYear}</p>
                <p class="text-[11px] text-slate-300">Degree: ${result.course} | Branch: ${result.department} | ${result.semester}</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-center">
                  <span class="text-[10px] block text-slate-300 uppercase font-bold">SGPA</span>
                  <span class="text-lg font-black text-amber-300">${result.sgpa}</span>
                </div>
                <div class="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-center">
                  <span class="text-[10px] block text-slate-300 uppercase font-bold">CGPA</span>
                  <span class="text-lg font-black text-emerald-300">${result.cgpa}</span>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-slate-100 text-slate-700 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th class="py-3 px-4">Subject Code</th>
                    <th class="py-3 px-4">Course Name</th>
                    <th class="py-3 px-3 text-center">Internal (25)</th>
                    <th class="py-3 px-3 text-center">External (75)</th>
                    <th class="py-3 px-3 text-center">Total (100)</th>
                    <th class="py-3 px-3 text-center">Grade</th>
                    <th class="py-3 px-3 text-center">Grade Pts</th>
                    <th class="py-3 px-3 text-center">Credits</th>
                    <th class="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  ${result.subjects.map(sub => `
                    <tr>
                      <td class="py-3 px-4 font-mono font-bold text-trr-blue">${sub.code}</td>
                      <td class="py-3 px-4 font-bold text-slate-900">${sub.name}</td>
                      <td class="py-3 px-3 text-center text-slate-600">${sub.internalMarks}</td>
                      <td class="py-3 px-3 text-center text-slate-600">${sub.externalMarks}</td>
                      <td class="py-3 px-3 text-center font-bold text-slate-900">${sub.totalMarks}</td>
                      <td class="py-3 px-3 text-center font-black ${sub.grade === 'O' ? 'text-purple-600' : 'text-emerald-600'}">${sub.grade}</td>
                      <td class="py-3 px-3 text-center font-bold text-slate-700">${sub.gradePoints}</td>
                      <td class="py-3 px-3 text-center text-slate-700 font-semibold">${sub.credits}</td>
                      <td class="py-3 px-4 text-center">
                        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Pass</span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center text-xs text-slate-600">
              <span><strong>Result Status:</strong> <span class="text-emerald-600 font-black">${result.resultStatus}</span> (Credits Registered: ${result.totalCreditsRegistered} | Earned: ${result.totalCreditsEarned})</span>
              <span class="text-[11px] text-slate-400">Published by Controller of Examinations on ${result.publishedDate}</span>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.innerHTML = `<div class="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">No examination results published yet.</div>`;
    }
  } catch (err) {
    console.error('Error loading results:', err);
  }
}

// Load Central Digital Library Preview
async function loadLibraryPreview() {
  const container = document.getElementById('student-library-container');
  try {
    const res = await API.getLibraryResources('All', 'All', '');
    if (res.success && res.resources) {
      container.innerHTML = res.resources.slice(0, 6).map(item => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-400 transition-colors">
          <div>
            <div class="flex justify-between items-center text-[10px] text-slate-400 uppercase font-bold mb-1">
              <span>${item.category}</span>
              <span class="text-amber-600 font-bold">${item.format || 'PDF'}</span>
            </div>
            <h4 class="font-bold text-sm text-slate-900 leading-snug">${item.title}</h4>
            <p class="text-[11px] text-slate-500 mt-1">${item.authorOrPublisher || 'Academic Resource'}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-semibold">
            <span class="text-slate-400 text-[11px]">${item.fileSize || 'PDF'}</span>
            <a href="${item.gdriveViewUrl}" target="_blank" class="text-trr-blue hover:text-blue-800 flex items-center gap-1">
              Open Document <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            </a>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading library preview:', err);
  }
}

// Load Notices
async function loadNotices() {
  const container = document.getElementById('student-notices-container');
  try {
    const res = await API.getPublicNotices('all');
    if (res.success && res.notices) {
      container.innerHTML = res.notices.map(n => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="bg-blue-100 text-trr-blue text-[10px] font-bold px-2 py-0.5 rounded">${n.category}</span>
              <span class="text-xs text-slate-400">${n.publishDate}</span>
            </div>
            <h4 class="font-bold text-sm text-slate-900">${n.title}</h4>
            <p class="text-xs text-slate-600 mt-1">${n.content}</p>
          </div>
          ${n.attachmentUrl ? `<a href="${n.attachmentUrl}" target="_blank" class="self-start md:self-auto text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-bold border border-slate-200 flex items-center gap-1"><i class="fa-solid fa-paperclip"></i> View Document</a>` : ''}
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading notices:', err);
  }
}
