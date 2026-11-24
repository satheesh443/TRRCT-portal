// TRR College of Technology - Management Admin Console Logic
let adminUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  const role = API.getRole();
  if (role !== 'admin') {
    API.showToast('Please log in with Administrator credentials.', 'warning');
    setTimeout(() => { window.location.href = '/'; }, 1000);
    return;
  }

  adminUser = API.getUser();
  if (adminUser) {
    document.getElementById('header-admin-name').textContent = adminUser.name || 'System Administrator';
    document.getElementById('admin-name-display').textContent = `${adminUser.name || 'Office of Principal'}`;
  }

  // Set default event date
  const evtDate = document.getElementById('evt-date');
  if (evtDate) {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    evtDate.value = d.toISOString().split('T')[0];
  }

  // Load Admin Data
  await loadAdminOverview();
  await loadAdminNotices();
  await loadAdminEvents();
  await loadAdminStudents();
  await loadAdminStaff();
  await loadAdminLibrary();
});

// Tab Switching
function switchAdminTab(tabId) {
  const tabs = ['notices', 'events', 'students', 'staff', 'library'];
  tabs.forEach(t => {
    const navBtn = document.getElementById(`admin-tab-${t}`);
    const section = document.getElementById(`admin-content-${t}`);
    if (t === tabId) {
      navBtn.className = 'admin-nav-tab active bg-trr-blue text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm';
      section.classList.remove('hidden');
    } else {
      navBtn.className = 'admin-nav-tab bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all';
      section.classList.add('hidden');
    }
  });
}

// Load Overview Statistics
async function loadAdminOverview() {
  try {
    const res = await API.getAdminOverview();
    if (res.success && res.stats) {
      document.getElementById('metric-admin-students').textContent = res.stats.totalStudents;
      document.getElementById('metric-admin-faculty').textContent = res.stats.totalFaculty;
      document.getElementById('metric-admin-notices').textContent = res.stats.totalNotices;
    }
  } catch (err) {
    console.error('Error loading admin stats:', err);
  }
}

// Notice Board Operations
async function loadAdminNotices() {
  const container = document.getElementById('admin-notices-list');
  try {
    const res = await API.getPublicNotices('all');
    if (res.success && res.notices) {
      document.getElementById('admin-notice-count').textContent = `${res.notices.length} Total Published`;
      container.innerHTML = res.notices.map(n => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="bg-blue-100 text-trr-blue text-[10px] font-bold px-2 py-0.5 rounded">${n.category}</span>
              ${n.priority === 'high' ? '<span class="bg-red-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded">High Priority</span>' : ''}
              <span class="text-xs text-slate-400">${n.publishDate}</span>
            </div>
            <h4 class="font-bold text-sm text-slate-900">${n.title}</h4>
            <p class="text-xs text-slate-600 line-clamp-1">${n.content}</p>
          </div>
          <div class="flex items-center gap-2 self-end md:self-auto">
            <button onclick="deleteNoticeItem('${n.id}')" class="text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
              <i class="fa-solid fa-trash-can mr-1"></i> Delete
            </button>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading admin notices:', err);
  }
}

async function handleCreateNotice(e) {
  e.preventDefault();
  const btn = document.getElementById('notice-submit-btn');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> Posting...`;

  const formData = new FormData();
  formData.append('title', document.getElementById('notice-title').value);
  formData.append('category', document.getElementById('notice-category').value);
  formData.append('priority', document.getElementById('notice-priority').value);
  formData.append('content', document.getElementById('notice-content').value);

  const fileInput = document.getElementById('notice-file');
  if (fileInput.files[0]) {
    formData.append('noticeFile', fileInput.files[0]);
  }

  try {
    const res = await API.createNotice(formData);
    if (res.success) {
      API.showToast('Notice published successfully to public website & student portals!', 'success');
      document.getElementById('create-notice-form').reset();
      await loadAdminNotices();
      await loadAdminOverview();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to publish notice', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Post to College Notice Board';
  }
}

async function deleteNoticeItem(noticeId) {
  if (!confirm('Are you sure you want to remove this notice from the board?')) return;
  try {
    const res = await API.deleteNotice(noticeId);
    if (res.success) {
      API.showToast('Notice removed successfully.', 'info');
      await loadAdminNotices();
      await loadAdminOverview();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to delete notice', 'error');
  }
}

// Events Management
async function loadAdminEvents() {
  const container = document.getElementById('admin-events-list');
  try {
    const res = await API.getUpcomingEvents();
    if (res.success && res.events) {
      container.innerHTML = res.events.map(evt => `
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center text-xs">
          <div>
            <span class="text-amber-600 font-bold block">${evt.date} • ${evt.time}</span>
            <h4 class="font-bold text-sm text-slate-900">${evt.title}</h4>
            <p class="text-slate-500">${evt.venue}</p>
          </div>
          <button onclick="deleteEventItem('${evt.id}')" class="text-rose-600 hover:text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-lg font-bold">
            Delete
          </button>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading events:', err);
  }
}

async function handleCreateEvent(e) {
  e.preventDefault();
  const btn = document.getElementById('evt-submit-btn');
  btn.disabled = true;

  const eventData = {
    title: document.getElementById('evt-title').value,
    date: document.getElementById('evt-date').value,
    time: document.getElementById('evt-time').value,
    venue: document.getElementById('evt-venue').value,
    description: document.getElementById('evt-desc').value
  };

  try {
    const res = await API.createEvent(eventData);
    if (res.success) {
      API.showToast('Event successfully added to college calendar!', 'success');
      document.getElementById('create-event-form').reset();
      await loadAdminEvents();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to add event', 'error');
  } finally {
    btn.disabled = false;
  }
}

async function deleteEventItem(eventId) {
  if (!confirm('Remove this event from calendar?')) return;
  try {
    const res = await API.deleteEvent(eventId);
    if (res.success) {
      API.showToast('Event removed.', 'info');
      await loadAdminEvents();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to delete event', 'error');
  }
}

// Student Management
async function loadAdminStudents() {
  const tbody = document.getElementById('admin-students-table');
  try {
    const res = await API.getAllStudents();
    if (res.success && res.students) {
      tbody.innerHTML = res.students.map(s => `
        <tr>
          <td class="py-3 px-4 font-mono font-bold text-trr-blue">${s.collegeId}</td>
          <td class="py-3 px-4 font-bold text-slate-900">${s.name}</td>
          <td class="py-3 px-4 font-mono text-slate-600">${s.dob}</td>
          <td class="py-3 px-4 text-slate-600">${s.department}</td>
          <td class="py-3 px-4 text-right">
            <button onclick="deleteStudentItem('${s.id}')" class="text-rose-600 hover:text-rose-800 text-xs font-bold">Remove</button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading students:', err);
  }
}

async function handleEnrolStudent(e) {
  e.preventDefault();
  const collegeId = document.getElementById('enrol-stu-id').value;
  const name = document.getElementById('enrol-stu-name').value;
  const dob = document.getElementById('enrol-stu-dob').value;
  const department = document.getElementById('enrol-stu-dept').value;
  const rollNumber = document.getElementById('enrol-stu-roll').value;

  try {
    const res = await API.createStudent({ collegeId, name, dob, department, rollNumber });
    if (res.success) {
      API.showToast(`Student ${name} enrolled with College ID: ${collegeId}!`, 'success');
      document.getElementById('enrol-student-form').reset();
      await loadAdminStudents();
      await loadAdminOverview();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to enrol student', 'error');
  }
}

async function deleteStudentItem(studentId) {
  if (!confirm('Permanently remove this student record from MongoDB?')) return;
  try {
    const res = await API.deleteStudent(studentId);
    if (res.success) {
      API.showToast('Student record removed from primary database.', 'info');
      await loadAdminStudents();
      await loadAdminOverview();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to remove student', 'error');
  }
}

// Faculty Management
async function loadAdminStaff() {
  const tbody = document.getElementById('admin-staff-table');
  try {
    const res = await API.getAllStaff();
    if (res.success && res.staff) {
      tbody.innerHTML = res.staff.map(st => `
        <tr>
          <td class="py-3 px-4 font-mono font-bold text-emerald-700">${st.staffId}</td>
          <td class="py-3 px-4 font-bold text-slate-900">${st.name}</td>
          <td class="py-3 px-4 text-slate-600">${st.department}</td>
          <td class="py-3 px-4 text-slate-600">${st.designation}</td>
          <td class="py-3 px-4 text-slate-500 uppercase text-[10px] font-bold">${st.role}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading staff:', err);
  }
}

async function handleEnrolStaff(e) {
  e.preventDefault();
  const staffId = document.getElementById('enrol-staff-id').value;
  const name = document.getElementById('enrol-staff-name').value;
  const password = document.getElementById('enrol-staff-pwd').value;
  const department = document.getElementById('enrol-staff-dept').value;
  const designation = document.getElementById('enrol-staff-desig').value;

  try {
    const res = await API.createStaff({ staffId, name, password, department, designation });
    if (res.success) {
      API.showToast(`Faculty member ${name} enrolled with ID: ${staffId}!`, 'success');
      document.getElementById('enrol-staff-form').reset();
      await loadAdminStaff();
      await loadAdminOverview();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to enrol faculty', 'error');
  }
}

// Google Drive Library Admin
async function loadAdminLibrary() {
  const container = document.getElementById('admin-library-table');
  try {
    const res = await API.getLibraryResources('All', 'All', '');
    if (res.success && res.resources) {
      container.innerHTML = res.resources.map(item => `
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row justify-between md:items-center gap-3 text-xs">
          <div>
            <span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded"><i class="fa-brands fa-google-drive"></i> ${item.category}</span>
            <h4 class="font-bold text-sm text-slate-900 mt-1">${item.title}</h4>
            <p class="text-slate-500 text-[11px]">Drive File ID: <code class="font-mono">${item.gdriveFileId}</code> | Uploaded by: ${item.uploadedBy || 'Admin'}</p>
          </div>
          <div class="flex items-center gap-2">
            <a href="${item.gdriveViewUrl}" target="_blank" class="bg-blue-50 text-trr-blue hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded font-bold">Preview</a>
            <button onclick="deleteLibraryItem('${item.id}')" class="text-rose-600 hover:text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded font-bold">Remove</button>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading library for admin:', err);
  }
}

async function deleteLibraryItem(resourceId) {
  if (!confirm('Remove this digital library resource?')) return;
  try {
    const res = await API.deleteLibraryResource(resourceId);
    if (res.success) {
      API.showToast('Resource removed from Central Digital Library repository.', 'info');
      await loadAdminLibrary();
    }
  } catch (err) {
    API.showToast(err.message || 'Failed to delete resource', 'error');
  }
}
