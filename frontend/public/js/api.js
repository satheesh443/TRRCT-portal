// TRR College of Technology - Client API & Session Service
const API_BASE = ''; // Same-origin relative URLs

const API = {
  // Authentication & Session
  getToken: () => localStorage.getItem('trrct_token'),
  getUser: () => {
    try {
      const u = localStorage.getItem('trrct_user');
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },
  getRole: () => localStorage.getItem('trrct_role'),

  setSession: (token, user, role) => {
    localStorage.setItem('trrct_token', token);
    localStorage.setItem('trrct_user', JSON.stringify(user));
    localStorage.setItem('trrct_role', role);
  },

  clearSession: () => {
    localStorage.removeItem('trrct_token');
    localStorage.removeItem('trrct_user');
    localStorage.removeItem('trrct_role');
  },

  logout: () => {
    API.clearSession();
    window.location.href = '/';
  },

  // Base Request Handler
  request: async (endpoint, options = {}) => {
    const token = API.getToken();
    const headers = options.headers || {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401 && !endpoint.includes('/login')) {
          API.clearSession();
          if (!window.location.pathname.endsWith('/') && window.location.pathname !== '') {
            API.showToast('Session expired. Please log in again.', 'warning');
            setTimeout(() => { window.location.href = '/'; }, 1200);
          }
        }
        throw new Error(data.message || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (err) {
      console.error(`API Error [${endpoint}]:`, err);
      throw err;
    }
  },

  // Auth Operations
  loginStudent: async (collegeId, dob) => {
    const data = await API.request('/api/auth/student/login', {
      method: 'POST',
      body: JSON.stringify({ collegeId, dob })
    });
    if (data.success && data.token) {
      API.setSession(data.token, data.user, 'student');
    }
    return data;
  },

  loginStaff: async (staffId, password) => {
    const data = await API.request('/api/auth/staff/login', {
      method: 'POST',
      body: JSON.stringify({ staffId, password })
    });
    if (data.success && data.token) {
      API.setSession(data.token, data.user, 'staff');
    }
    return data;
  },

  loginAdmin: async (adminId, password) => {
    const data = await API.request('/api/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ adminId, password })
    });
    if (data.success && data.token) {
      API.setSession(data.token, data.user, 'admin');
    }
    return data;
  },

  getProfile: async () => {
    return await API.request('/api/auth/me');
  },

  // Public Operations
  getPublicNotices: async (category = 'all') => {
    return await API.request(`/api/public/notices?category=${category}`);
  },

  getUpcomingEvents: async () => {
    return await API.request('/api/public/events');
  },

  // Student Operations
  getStudentAssignments: async () => {
    return await API.request('/api/student/assignments');
  },

  submitAssignment: async (formData) => {
    return await API.request('/api/student/assignments/submit', {
      method: 'POST',
      body: formData
    });
  },

  getStudentSubmissions: async () => {
    return await API.request('/api/student/submissions');
  },

  getStudentResults: async () => {
    return await API.request('/api/student/results');
  },

  getStudentAttendance: async () => {
    return await API.request('/api/student/attendance');
  },

  getStudentTimeTable: async () => {
    return await API.request('/api/student/timetable');
  },

  // Staff Operations
  getStaffAssignments: async () => {
    return await API.request('/api/staff/assignments');
  },

  createAssignment: async (formData) => {
    return await API.request('/api/staff/assignments', {
      method: 'POST',
      body: formData
    });
  },

  getAssignmentSubmissions: async (assignmentId = 'all') => {
    return await API.request(`/api/staff/submissions/${assignmentId}`);
  },

  evaluateSubmission: async (submissionId, marksAwarded, feedback) => {
    return await API.request(`/api/staff/submissions/${submissionId}/evaluate`, {
      method: 'POST',
      body: JSON.stringify({ marksAwarded, feedback })
    });
  },

  updateStudentMarks: async (marksData) => {
    return await API.request('/api/staff/results/update', {
      method: 'POST',
      body: JSON.stringify(marksData)
    });
  },

  submitLiveAttendance: async (attendanceData) => {
    return await API.request('/api/staff/attendance/submit', {
      method: 'POST',
      body: JSON.stringify(attendanceData)
    });
  },

  getAttendanceHistory: async () => {
    return await API.request('/api/staff/attendance/history');
  },

  getStaffTimeTable: async () => {
    return await API.request('/api/staff/timetable');
  },

  getEnrolledStudents: async () => {
    return await API.request('/api/staff/students');
  },

  // Admin Operations
  getAdminOverview: async () => {
    return await API.request('/api/admin/overview');
  },

  createNotice: async (formData) => {
    return await API.request('/api/admin/notices', {
      method: 'POST',
      body: formData
    });
  },

  deleteNotice: async (noticeId) => {
    return await API.request(`/api/admin/notices/${noticeId}`, {
      method: 'DELETE'
    });
  },

  createEvent: async (eventData) => {
    return await API.request('/api/admin/events', {
      method: 'POST',
      body: JSON.stringify(eventData)
    });
  },

  deleteEvent: async (eventId) => {
    return await API.request(`/api/admin/events/${eventId}`, {
      method: 'DELETE'
    });
  },

  getAllStudents: async () => {
    return await API.request('/api/admin/students');
  },

  createStudent: async (studentData) => {
    return await API.request('/api/admin/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
  },

  deleteStudent: async (studentId) => {
    return await API.request(`/api/admin/students/${studentId}`, {
      method: 'DELETE'
    });
  },

  getAllStaff: async () => {
    return await API.request('/api/admin/staff');
  },

  createStaff: async (staffData) => {
    return await API.request('/api/admin/staff', {
      method: 'POST',
      body: JSON.stringify(staffData)
    });
  },

  deleteStaff: async (staffId) => {
    return await API.request(`/api/admin/staff/${staffId}`, {
      method: 'DELETE'
    });
  },

  // Central Digital Library (Protected)
  getLibraryResources: async (category = 'All', department = 'All', search = '') => {
    return await API.request(`/api/library?category=${encodeURIComponent(category)}&department=${encodeURIComponent(department)}&search=${encodeURIComponent(search)}`);
  },

  getLibraryResourceById: async (resourceId) => {
    return await API.request(`/api/library/${resourceId}`);
  },

  addLibraryResource: async (resourceData) => {
    return await API.request('/api/library', {
      method: 'POST',
      body: JSON.stringify(resourceData)
    });
  },

  deleteLibraryResource: async (resourceId) => {
    return await API.request(`/api/library/${resourceId}`, {
      method: 'DELETE'
    });
  },

  // UI Toast Notification Helper
  showToast: (message, type = 'success') => {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const colorClasses = {
      success: 'bg-emerald-600 text-white border-emerald-500',
      error: 'bg-rose-600 text-white border-rose-500',
      warning: 'bg-amber-600 text-white border-amber-500',
      info: 'bg-blue-600 text-white border-blue-500'
    }[type] || 'bg-slate-800 text-white border-slate-700';

    toast.className = `${colorClasses} border px-4 py-3 rounded-lg shadow-xl text-sm font-medium flex items-center gap-3 transition-all transform duration-300 pointer-events-auto max-w-md`;
    toast.innerHTML = `
      <span>${message}</span>
      <button class="ml-auto text-white/80 hover:text-white font-bold" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
};
