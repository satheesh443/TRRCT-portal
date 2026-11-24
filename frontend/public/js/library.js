// TRR College of Technology - Central Digital Library Script
let allResources = [];
let currentCategory = 'All';

document.addEventListener('DOMContentLoaded', async () => {
  const token = API.getToken();
  const user = API.getUser();
  const role = API.getRole();

  const authBanner = document.getElementById('auth-restriction-banner');
  const authContent = document.getElementById('authenticated-library-content');
  const headerUser = document.getElementById('library-header-user');

  if (!token || !user) {
    // Show restriction banner
    authBanner.classList.remove('hidden');
    authContent.classList.add('hidden');
    headerUser.innerHTML = `
      <button onclick="openLoginModal('student')" class="bg-trr-blue hover:bg-blue-800 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm">
        Sign In to Access
      </button>
    `;
    return;
  }

  // User is authenticated
  authBanner.classList.add('hidden');
  authContent.classList.remove('hidden');
  document.getElementById('session-user-badge').textContent = `${user.name} (${role.toUpperCase()})`;

  const portalHref = role === 'student' ? '/student-portal' : (role === 'staff' ? '/staff-portal' : '/admin-portal');
  headerUser.innerHTML = `
    <span class="text-xs text-slate-600 hidden sm:inline">Signed in as: <strong>${user.name}</strong></span>
    <a href="${portalHref}" class="bg-trr-blue hover:bg-blue-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
      My Portal
    </a>
    <button onclick="API.logout()" class="text-xs text-slate-500 hover:text-rose-600 px-2 py-1 font-semibold">
      Logout
    </button>
  `;

  await loadLibraryResources();
});

// Load resources from API
async function loadLibraryResources() {
  const container = document.getElementById('library-cards-container');
  try {
    const res = await API.getLibraryResources('All', 'All', '');
    if (res.success && res.resources) {
      allResources = res.resources;
      applyFilters();
    }
  } catch (err) {
    console.error('Error fetching library resources:', err);
    container.innerHTML = `<div class="col-span-3 p-8 text-center text-rose-600 text-sm">Authentication check failed or server error.</div>`;
  }
}

// Set category filter
function setCategoryFilter(category) {
  currentCategory = category;
  const buttons = document.querySelectorAll('#lib-category-pills button');
  buttons.forEach(btn => {
    btn.className = 'lib-cat-btn bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors';
  });

  const activeBtn = Array.from(buttons).find(b => b.textContent.trim().toLowerCase() === category.toLowerCase() || (category === 'All' && b.textContent.includes('All')));
  if (activeBtn) {
    activeBtn.className = 'lib-cat-btn active bg-amber-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors';
  }

  applyFilters();
}

// Apply Filters & Search
function applyFilters() {
  const container = document.getElementById('library-cards-container');
  const search = document.getElementById('lib-search-input').value.toLowerCase().trim();
  const dept = document.getElementById('lib-dept-filter').value;

  let filtered = allResources;

  if (currentCategory !== 'All') {
    filtered = filtered.filter(item => item.category && item.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (dept !== 'All') {
    filtered = filtered.filter(item => item.department && item.department.toLowerCase().includes(dept.toLowerCase()));
  }

  if (search) {
    filtered = filtered.filter(item =>
      (item.title && item.title.toLowerCase().includes(search)) ||
      (item.authorOrPublisher && item.authorOrPublisher.toLowerCase().includes(search)) ||
      (item.subject && item.subject.toLowerCase().includes(search))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="col-span-3 p-12 text-center text-slate-400 text-sm bg-white rounded-2xl border border-slate-200">No resources match your search criteria.</div>`;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all">
      <div>
        <div class="flex justify-between items-center text-xs mb-2">
          <span class="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
            ${item.category}
          </span>
          <span class="text-slate-400 text-[11px] font-mono"><i class="fa-brands fa-google-drive text-amber-500"></i> ${item.fileSize || 'PDF'}</span>
        </div>
        <h3 class="font-bold text-base text-slate-900 leading-snug">${item.title}</h3>
        <p class="text-xs text-slate-500 mt-1"><i class="fa-solid fa-pen-nib mr-1 text-slate-400"></i> ${item.authorOrPublisher || 'Department Resource'}</p>
        <p class="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">${item.description}</p>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
        <span class="text-slate-400 text-[11px]"><i class="fa-solid fa-cloud-arrow-down mr-1"></i> ${item.downloadsCount || 100}+ downloads</span>
        <button onclick="openPreviewModal('${item.id}')" class="bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-lg border border-amber-200 flex items-center gap-1.5 transition-colors">
          <i class="fa-solid fa-book-open"></i> Preview & Download
        </button>
      </div>
    </div>
  `).join('');
}

// Preview Modal
function openPreviewModal(resourceId) {
  const item = allResources.find(r => String(r.id) === String(resourceId));
  if (!item) return;

  document.getElementById('preview-modal-title').textContent = item.title;
  document.getElementById('preview-modal-meta').textContent = `${item.department} • ${item.category}`;
  document.getElementById('preview-open-external').href = item.gdriveViewUrl;

  document.getElementById('preview-doc-badge').textContent = item.category;
  document.getElementById('preview-doc-title').textContent = item.title;
  document.getElementById('preview-doc-author').textContent = `Prescribed by: ${item.authorOrPublisher || 'Faculty of TRRCT'}`;
  document.getElementById('preview-doc-desc').textContent = item.description;

  const dlBtn = document.getElementById('preview-doc-download-btn');
  dlBtn.href = item.gdriveDownloadUrl;

  document.getElementById('gdrive-preview-modal').classList.remove('hidden');
}

function closePreviewModal() {
  document.getElementById('gdrive-preview-modal').classList.add('hidden');
}

// Modal Auth Handlers
function openLoginModal(role = 'student') {
  document.getElementById('login-modal').classList.remove('hidden');
  document.getElementById('lib-login-id').value = '';
  document.getElementById('lib-login-pwd').value = '';
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.add('hidden');
}

async function handleLibraryLogin(e) {
  e.preventDefault();
  const id = document.getElementById('lib-login-id').value.trim();
  const pwd = document.getElementById('lib-login-pwd').value.trim();
  const btn = document.getElementById('lib-login-submit');

  btn.disabled = true;
  btn.textContent = 'Verifying...';

  try {
    if (id.startsWith('FAC-') || id.includes('FAC')) {
      await API.loginStaff(id, pwd);
    } else if (id.toLowerCase() === 'admin') {
      await API.loginAdmin(id, pwd);
    } else {
      await API.loginStudent(id, pwd);
    }
    API.showToast('Login successful! Accessing Central Digital Library...', 'success');
    setTimeout(() => { window.location.reload(); }, 600);
  } catch (err) {
    API.showToast(err.message || 'Login failed. Please verify credentials.', 'error');
    btn.disabled = false;
    btn.textContent = 'Authenticate & Access Library';
  }
}
