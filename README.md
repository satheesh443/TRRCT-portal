# TRR College of Technology (TRRCT) - Integrated Institutional Operations Portal

An enterprise-grade, full-stack Academic & Administrative Operations Management Portal engineered for **TRR College of Technology (TRRCT)**, Meerpet, Hyderabad (Approved by AICTE, Affiliated to JNTU Hyderabad, TS EAPCET Code: `TRRM`, JNTUH College Code: `XZ`).

Architected following the **Agile Software Development Lifecycle (SDLC)** with clean modular codebases, role-based separation of concerns, and a **Two-Tier Hybrid Architecture** (Primary Operations MongoDB Database + Central Digital Library Cloud Storage).

---

## 🏛️ System Architecture Overview

```
                        ┌─────────────────────────────────────────────────────────┐
                        │        TRR College of Technology Gateway (Port 5000)    │
                        └──────────────────────────┬──────────────────────────────┘
                                                   │
                ┌──────────────────────────────────┼──────────────────────────────────┐
                │                                  │                                  │
    ┌───────────▼───────────┐          ┌───────────▼───────────┐          ┌───────────▼───────────┐
    │     Student Portal    │          │     Faculty Portal    │          │  Management Admin     │
    │  (College ID + DOB)   │          │ (Staff ID + Password) │          │  (Admin Credentials)  │
    └───────────┬───────────┘          └───────────┬───────────┘          └───────────┬───────────┘
                │                                  │                                  │
                └──────────────────────────────────┼──────────────────────────────────┘
                                                   │
                        ┌──────────────────────────▼──────────────────────────┐
                        │      REST API Backend (Express.js & JWT Middleware)  │
                        └──────────────────────────┬──────────────────────────┘
                                                   │
                ┌──────────────────────────────────┴──────────────────────────────────┐
                │                                                                     │
    ┌───────────▼─────────────────────────────────┐               ┌───────────────────▼──────────────────┐
    │        PRIMARY DATABASE (MongoDB)           │               │     SECONDARY STORAGE (Central Drive)│
    │  • Students, Faculty, Admins                │               │  • Central Academic Digital Library  │
    │  • Notice Board & Upcoming Events           │               │  • Prescribed Standard Textbooks     │
    │  • Weekly Timetable Schedules (Class/Staff) │               │  • JNTUH R22 Curricula & Syllabus    │
    │  • Live Classroom Attendance System         │               │  • Lab Manuals & Solved PYQ Banks    │
    │  • Assignments, Submissions & Evaluations   │               │  * Protected: Accessible after login │
    │  • End-Semester Exam Results & Grade Cards  │               │                                      │
    └─────────────────────────────────────────────┘               └──────────────────────────────────────┘
```

---

## 🚀 Key Functional Modules

### 1. Institutional Public Web Presence (`/`)
* **Branding & Legacy:** Comprehensive profile of TRR College of Technology, established under the Teegala Ram Reddy Educational Society, highlighting Founder Chairman Sri Teegala Ram Reddy's vision.
* **Academic Programs:** Showcases B.Tech in Computer Science & Engineering (CSE), Artificial Intelligence & Machine Learning (AI&ML), Electronics & Communication (ECE), Electrical Engineering (EEE), and 3-Year Polytechnic Technical Diplomas.
* **Live Breaking Notice Ticker:** Dynamically synchronized with the Admin Notice Board for instant publication of circulars.
* **Upcoming Campus Events:** Highlights hackathons (TECHNO-TRRCT 2026), industrial workshops, and sports championships.
* **Quick Portal Access:** Seamless modal sign-in for Students, Faculty, and Administrators.

### 2. Student Academic Portal (`/student-portal`)
* **Authentication:** Secured via registered **College ID** and **Date of Birth (DOB)**.
* **Weekly Academic Timetable:**
  * Period-by-period class schedule (Monday–Saturday) showing subject, course code, instructor, and classroom/lab location.
* **Live Classroom Attendance Tracking:**
  * Real-time subject-wise percentage, total classes held vs attended, and clear JNTUH compliance indicator (>75% examination eligibility standing).
  * Recent period attendance ledger with date, subject, faculty, and status.
* **Course Assignments & Task Submission:**
  * Real-time list of assignments posted by course professors.
  * Direct submission via PDF/ZIP file upload or external GitHub / cloud repository links with execution remarks.
  * Dynamic tracking of submission status: *Pending*, *Submitted*, or *Evaluated*.
  * Instant view of marks awarded (e.g., 24/25) and qualitative teacher feedback.
* **Semester Results & Grade Cards:**
  * Official examination performance breakdown adhering to JNTUH evaluation patterns (Internal Marks /25, External Marks /75, Total /100, Letter Grades, Grade Points, and Course Credits).
  * Semester SGPA & cumulative CGPA calculation.
  * Print-ready Grade Sheet export with institutional watermark.
* **Central Digital Library Access:**
  * Instant access to textbooks and faculty lecture handouts from the authenticated cloud repository.

### 3. Faculty Operations Portal (`/staff-portal`)
* **Authentication:** Secured via **Staff ID** and custom faculty password.
* **Live Attendance Management System:**
  * Interactive classroom roll-call: select date, course subject, semester, and lecture period.
  * Student roster with one-click **"Mark All Present"** and individual **Present / Absent** toggle switches.
  * Instantly commits session attendance to the MongoDB database and recalculates student percentages.
  * View past attendance submission history with session timestamps and attendance counts.
* **Faculty Teaching Timetable:**
  * Personalized daily lecture schedule displaying time slots, assigned sections, and lecture hall numbers.
* **Assignment Management & Grading Console:**
  * Post new assignments with title, course code, semester, deadline, max marks, and case-study attachments.
  * Review student submissions, preview attachments or source repositories, assign marks, and write feedback.
* **Semester Marks Publishing:**
  * Submit end-semester internal and external marks directly to student records.

### 4. Management Admin Console (`/admin-portal`)
* **Dedicated Administrative Panel:** Completely segregated from student and staff views.
* **College Notice Board CRUD:** Create, update, set priority (high-priority ticker vs normal), and delete circulars in real time.
* **Upcoming Campus Events Manager:** Add hackathons, technical conferences, and sports meets to the campus calendar.
* **Student Directory Management:** Register new students, update records, and manage enrollments.
* **Faculty Directory Management:** Onboard faculty members and assign departments and designations.
* **System Metrics & Analytics:** Real-time metrics on students, faculty, circulars, and system connectivity.

### 5. Central Digital Library (`/library`)
* **Strict Access Control:** Requires verified student, faculty, or admin JWT session.
* **Cloud Repository:** Catalogs textbooks, JNTUH R22 syllabus copies, lab manuals, and previous years' question papers (PYQs).
* **Document Viewer & Direct Download:** Preview document summaries and open directly in the central cloud drive folder.

---

## 🔑 Operational Credentials Matrix

| Role | Username / Identifier | Password Format | User Profile |
| :--- | :--- | :--- | :--- |
| **Student** | `24TRRCT001` | Date of Birth (`15-08-2004`) | Aditya Varma (B.Tech CSE, IV Sem) |
| **Student** | `24TRRCT002` | Date of Birth (`10-12-2003`) | Sneha Reddy (B.Tech CSE, IV Sem) |
| **Student** | `24TRRCT003` | Date of Birth (`22-03-2004`) | Kiran Kumar (B.Tech CSE, IV Sem) |
| **Faculty (CSE HOD)** | `FAC-CSE-01` | Custom Password (`cse@trrct123`) | Dr. A. Ramakrishna (Professor & HOD, CSE) |
| **Faculty (Assistant Prof)**| `FAC-CSE-02` | Custom Password (`faculty@123`) | Prof. Sunita Rao (Assistant Professor, CSE) |
| **Management / Admin** | `admin` | Custom Password (`admin@trrct2026`) | Dr. P. Venkata Rao (Principal & Admin) |

---

## 📂 Agile Codebase Structure

```
demo/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Dual-Mode Data Access Layer (MongoDB Atlas + Document Engine)
│   │   ├── controllers/
│   │   │   ├── adminController.js    # Executive Notice Board & User Operations
│   │   │   ├── authController.js     # Student & Staff/Admin Authentication
│   │   │   ├── libraryController.js  # Central Digital Library Engine
│   │   │   ├── noticeController.js   # Public Notices & Event Feeds
│   │   │   ├── staffController.js    # Live Attendance, Timetable & Grading
│   │   │   └── studentController.js  # Attendance View, Timetable & Grade Cards
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # JWT Verification & Role-Based Guarding
│   │   │   └── uploadMiddleware.js   # Multer Storage for Student Task Uploads
│   │   └── routes/
│   │       ├── adminRoutes.js        # Admin REST Endpoints
│   │       ├── authRoutes.js         # Authentication Endpoints
│   │       ├── libraryRoutes.js      # Protected Central Digital Library Routes
│   │       ├── noticeRoutes.js       # Public Notice Board Endpoints
│   │       ├── staffRoutes.js        # Faculty Management Routes
│   │       └── studentRoutes.js      # Student Academic Routes
│   ├── uploads/                      # Uploaded assignment artifacts & circulars
│   ├── package.json
│   └── server.js                     # Express Gateway & Route Orchestrator
├── database/
│   ├── seeds/
│   │   └── initialData.js            # Initial Seed Registry (Users, Timetables, Attendance)
│   └── trrct_local_db.json           # High-Performance Document Persistence Engine
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   │   └── logo.png              # Official TRR College of Technology Emblem
│   │   ├── css/
│   │   │   └── style.css             # Institutional Styles & Animations
│   │   └── js/
│   │       ├── api.js                # Central API Gateway Client
│   │       ├── admin.js              # Management Console Controller
│   │       ├── library.js            # Central Digital Library Controller
│   │       ├── main.js               # Homepage Notice Ticker & Modals
│   │       ├── staff.js              # Faculty Attendance, Timetable & Grading
│   │       └── student.js            # Student Timetable, Attendance & Results
│   ├── index.html                    # Public Institutional Homepage
│   ├── student-portal.html           # Authenticated Student Academic Workspace
│   ├── staff-portal.html             # Authenticated Faculty Operations Workspace
│   ├── admin-portal.html             # Dedicated Management Admin Console
│   └── library.html                  # Authenticated Central Digital Library
├── .env                              # Environment Configuration (Isolated Secrets)
└── README.md
```

---

## ⚙️ Installation & Deployment

### Local Development Setup
```bash
# 1. Clone repository & install dependencies
cd demo
npm run install:all

# 2. Configure environment variables in backend/.env
# PORT=5000
# JWT_SECRET=your_jwt_secret_key
# MONGODB_URI=your_mongodb_connection_uri
# GOOGLE_DRIVE_FOLDER_URL=https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK

# 3. Start development server
npm start
# Server listens at: http://localhost:5000
```

### Production Deployment
The application is pre-configured for one-click deployment to standard cloud platforms (e.g. Render, Railway, AWS EC2, or DigitalOcean):
1. **Build Command:** `npm run install:all`
2. **Start Command:** `npm start`
3. **Environment Variables:** Provide `MONGODB_URI`, `JWT_SECRET`, and `GOOGLE_DRIVE_FOLDER_URL` in your platform's environment settings.
