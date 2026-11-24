// TRR College of Technology - Public Home Page Script
let allNotices = [];
let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Load notices and events
  await fetchNotices();
  await fetchEvents();
});

// Fetch & Display Notices
async function fetchNotices() {
  try {
    const data = await API.getPublicNotices();
    if (data.success && data.notices) {
      allNotices = data.notices;
      renderTicker(allNotices);
      renderNotices(allNotices);
    }
  } catch (err) {
    console.error('Failed to load notices:', err);
    const container = document.getElementById('notices-container');
    if (container) {
      container.innerHTML = `<div class="p-6 text-center text-slate-500 text-sm">Unable to load notices. Please refresh.</div>`;
    }
  }
}

// Render Breaking Ticker
function renderTicker(notices) {
  const ticker = document.getElementById('notice-ticker');
  if (!ticker || !notices.length) return;

  const tickerHtml = notices.map(n => `
    <span class="inline-flex items-center px-6 cursor-pointer hover:underline" onclick="showNoticeDetail('${n.id}')">
      <span class="w-2 h-2 rounded-full bg-slate-900 inline-block mr-2"></span>
      <span>${n.title}</span>
    </span>
  `).join('');

  // Duplicate for seamless infinite loop
  ticker.innerHTML = tickerHtml + tickerHtml;
}

// Render Notices List
function renderNotices(notices) {
  const container = document.getElementById('notices-container');
  if (!container) return;

  let filtered = notices;
  if (currentCategory !== 'all') {
    filtered = notices.filter(n => n.category && n.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="p-8 text-center text-slate-400 text-sm">No notices available in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(notice => {
    const isHigh = notice.priority === 'high';
    const badgeClass = isHigh ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-blue-100 text-trr-blue border-blue-200';
    return `
      <div class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-trr-blue transition-all cursor-pointer shadow-sm hover:shadow-md" onclick="showNoticeDetail('${notice.id}')">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeClass}">
              ${notice.category || 'General'}
            </span>
            ${isHigh ? '<span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">Important</span>' : ''}
          </div>
          <span class="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <i class="fa-regular fa-clock"></i> ${notice.publishDate || 'Recent'}
          </span>
        </div>
        <h3 class="font-bold text-base text-slate-900 group-hover:text-trr-blue transition-colors">
          ${notice.title}
        </h3>
        <p class="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          ${notice.content}
        </p>
        <div class="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
          <span class="text-slate-500 font-medium"><i class="fa-solid fa-feather mr-1"></i> ${notice.publishedBy || 'Administration'}</span>
          <span class="text-trr-blue font-bold flex items-center gap-1">Read Full Notice <i class="fa-solid fa-arrow-right text-[10px]"></i></span>
        </div>
      </div>
    `;
  }).join('');
}

// Filter Notices
function filterNotices(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll('#notice-filter-buttons button');
  buttons.forEach(btn => {
    btn.classList.remove('active', 'bg-trr-blue', 'text-white');
    btn.classList.add('bg-slate-100', 'text-slate-700');
  });

  const activeBtn = Array.from(buttons).find(b => b.textContent.trim().toLowerCase().includes(category.toLowerCase()));
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-trr-blue', 'text-white');
    activeBtn.classList.remove('bg-slate-100', 'text-slate-700');
  }

  renderNotices(allNotices);
}

// Show Notice Detail Modal
function showNoticeDetail(noticeId) {
  const notice = allNotices.find(n => String(n.id) === String(noticeId));
  if (!notice) return;

  document.getElementById('notice-modal-title').textContent = notice.title;
  document.getElementById('notice-modal-category').textContent = notice.category || 'Notification';
  document.getElementById('notice-modal-date').textContent = notice.publishDate || 'Recent';
  document.getElementById('notice-modal-author').textContent = notice.publishedBy || 'Administration';
  document.getElementById('notice-modal-content').textContent = notice.content;

  const attachDiv = document.getElementById('notice-modal-attachment');
  const attachLink = document.getElementById('notice-modal-link');
  if (notice.attachmentUrl) {
    attachDiv.classList.remove('hidden');
    attachLink.href = notice.attachmentUrl;
    attachLink.textContent = `Download: ${notice.attachmentName || 'Circular Attachment'}`;
  } else {
    attachDiv.classList.add('hidden');
  }

  document.getElementById('notice-modal').classList.remove('hidden');
}

function closeNoticeModal() {
  document.getElementById('notice-modal').classList.add('hidden');
}

// Fetch & Render Events
async function fetchEvents() {
  const container = document.getElementById('events-container');
  if (!container) return;

  try {
    const data = await API.getUpcomingEvents();
    if (data.success && data.events && data.events.length) {
      container.innerHTML = data.events.map(evt => {
        const dateObj = new Date(evt.date);
        const day = dateObj.getDate() || '15';
        const month = dateObj.toLocaleString('default', { month: 'short' }) || 'DEC';

        return `
          <div class="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3 shadow-sm hover:border-amber-400 transition-colors">
            <div class="bg-amber-500 text-slate-950 rounded-lg p-2 text-center min-w-[50px] shadow-sm flex flex-col justify-center">
              <span class="text-[10px] font-black uppercase tracking-wider">${month}</span>
              <span class="text-lg font-black leading-tight">${day}</span>
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-xs text-slate-900 leading-tight">${evt.title}</h4>
              <p class="text-[11px] text-slate-500 mt-1"><i class="fa-solid fa-clock mr-1 text-slate-400"></i> ${evt.time || '10:00 AM'}</p>
              <p class="text-[11px] text-slate-500"><i class="fa-solid fa-location-dot mr-1 text-rose-500"></i> ${evt.venue || 'Campus Auditorium'}</p>
            </div>
          </div>
        `;
      }).join('');
    } else {
      container.innerHTML = `<div class="p-4 text-center text-slate-400 text-xs">No upcoming events scheduled.</div>`;
    }
  } catch (err) {
    console.error('Failed to load events:', err);
  }
}

// Modal & Auth Tab Handlers
function openLoginModal(role = 'student') {
  document.getElementById('login-modal').classList.remove('hidden');
  switchLoginTab(role);
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
}

function switchLoginTab(role) {
  const tabs = ['student', 'staff', 'admin'];
  tabs.forEach(r => {
    const btn = document.getElementById(`tab-btn-${r}`);
    const form = document.getElementById(`${r}-login-form`);
    if (r === role) {
      btn.className = 'py-2 rounded-lg transition-colors text-trr-blue bg-white shadow-sm font-bold';
      form.classList.remove('hidden');
    } else {
      btn.className = 'py-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 font-semibold';
      form.classList.add('hidden');
    }
  });
}

// Student Login Form Submission
async function handleStudentLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('student-login-btn');
  const collegeId = document.getElementById('student-college-id').value;
  const dob = document.getElementById('student-dob').value;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Verifying Credentials...`;

  try {
    const res = await API.loginStudent(collegeId, dob);
    if (res.success) {
      API.showToast(`Welcome back, ${res.user.name}!`, 'success');
      setTimeout(() => {
        window.location.href = '/student-portal';
      }, 700);
    }
  } catch (err) {
    API.showToast(err.message || 'Login failed. Please check your College ID & DOB.', 'error');
    btn.disabled = false;
    btn.textContent = 'Sign In to Student Portal';
  }
}

// Staff Login Form Submission
async function handleStaffLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('staff-login-btn');
  const staffId = document.getElementById('staff-id').value;
  const password = document.getElementById('staff-password').value;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Authenticating Faculty...`;

  try {
    const res = await API.loginStaff(staffId, password);
    if (res.success) {
      API.showToast(`Welcome Professor ${res.user.name}!`, 'success');
      setTimeout(() => {
        window.location.href = '/staff-portal';
      }, 700);
    }
  } catch (err) {
    API.showToast(err.message || 'Login failed. Invalid Staff ID or Password.', 'error');
    btn.disabled = false;
    btn.textContent = 'Sign In to Faculty Portal';
  }
}

// Admin Login Form Submission
async function handleAdminLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('admin-login-btn');
  const adminId = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Accessing Admin Console...`;

  try {
    const res = await API.loginAdmin(adminId, password);
    if (res.success) {
      API.showToast(`Welcome Administrator: ${res.user.name}!`, 'success');
      setTimeout(() => {
        window.location.href = '/admin-portal';
      }, 700);
    }
  } catch (err) {
    API.showToast(err.message || 'Admin authentication failed.', 'error');
    btn.disabled = false;
    btn.textContent = 'Sign In to Admin Console';
  }
}
