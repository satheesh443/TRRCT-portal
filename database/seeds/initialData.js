// TRR College of Technology (TRRCT) - Enterprise Production Seed Registry
// Admin: admin | Password: Admin@123
const adminHash = "$2b$10$DGGUyCHcaqKhCPHG9W7.a.9YSTs60bJKEGgc3JsWWJQLYtsXMbQMq"; // Admin@123

module.exports = {
  // ONLY ONE ADMIN ACCOUNT: admin (Password: Admin@123)
  admins: [
    {
      id: "ADM001",
      adminId: "admin",
      name: "System Administrator",
      title: "System Administrator",
      email: "admin@trrct.co.in",
      phone: "+91 91543 64306",
      passwordHash: adminHash,
      role: "admin",
      department: "Administration",
      institution: "TRR College of Technology",
      campus: "Pragathi Colony, Meerpet, Hyderabad",
      createdAt: "2026-01-10T09:00:00.000Z"
    }
  ],

  // Faculty and Students are empty by default so admin can enrol and manage them dynamically
  staff: [],
  students: [],

  // WEEKLY ACADEMIC TIMETABLES (Preserved)
  timetables: {
    student: {
      classTitle: "B.Tech II Year - IV Semester (CSE-A)",
      department: "Computer Science & Engineering",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      room: "Lecture Hall 204 (CSE Block)",
      periods: [
        { id: "P1", time: "09:30 AM - 10:30 AM", label: "Period 1" },
        { id: "P2", time: "10:30 AM - 11:30 AM", label: "Period 2" },
        { id: "P3", time: "11:30 AM - 12:30 PM", label: "Period 3" },
        { id: "LUNCH", time: "12:30 PM - 01:15 PM", label: "Lunch Break" },
        { id: "P4", time: "01:15 PM - 02:15 PM", label: "Period 4" },
        { id: "P5", time: "02:15 PM - 03:15 PM", label: "Period 5" },
        { id: "P6", time: "03:15 PM - 04:15 PM", label: "Period 6" }
      ],
      days: [
        {
          day: "Monday",
          slots: [
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "DBMS Hands-on Practical Lab", code: "CS405PC", faculty: "Faculty Incharge", room: "Computing Lab 3" },
            { subject: "DBMS Hands-on Practical Lab", code: "CS405PC", faculty: "Faculty Incharge", room: "Computing Lab 3" },
            { subject: "Library / Technical Seminar", code: "AC408MC", faculty: "Coordinator", room: "Central Library" }
          ]
        },
        {
          day: "Tuesday",
          slots: [
            { subject: "Operating Systems", code: "CS404PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Mentoring & Remedial Class", code: "AC409MC", faculty: "Class Incharge", room: "LH-204" }
          ]
        },
        {
          day: "Wednesday",
          slots: [
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Algorithms Implementation Lab", code: "CS406PC", faculty: "Faculty Incharge", room: "Computing Lab 2" },
            { subject: "Algorithms Implementation Lab", code: "CS406PC", faculty: "Faculty Incharge", room: "Computing Lab 2" },
            { subject: "Sports & Physical Education", code: "PE401", faculty: "Physical Director", room: "Sports Ground" }
          ]
        },
        {
          day: "Thursday",
          slots: [
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Constitution of India", code: "MC407HS", faculty: "Guest Faculty", room: "LH-204" },
            { subject: "Competitive Coding Practice", code: "CS410SK", faculty: "Coding Club Lead", room: "CC-1" }
          ]
        },
        {
          day: "Friday",
          slots: [
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Full Stack Web Tech Lab", code: "CS407PC", faculty: "Faculty Incharge", room: "Web Lab 4" },
            { subject: "Full Stack Web Tech Lab", code: "CS407PC", faculty: "Faculty Incharge", room: "Web Lab 4" },
            { subject: "Aptitude & Soft Skills", code: "TP401", faculty: "Placement Trainer", room: "Seminar Hall" }
          ]
        },
        {
          day: "Saturday",
          slots: [
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Faculty Incharge", room: "LH-204" },
            { subject: "Technical Project Presentation", code: "CS411PR", faculty: "Project Panel", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Hackathon & Innovation Lab", code: "RD401", faculty: "R&D Cell", room: "Incubation Center" },
            { subject: "Hackathon & Innovation Lab", code: "RD401", faculty: "R&D Cell", room: "Incubation Center" },
            { subject: "Weekend Club Activities", code: "CL401", faculty: "Student Council", room: "Auditorium" }
          ]
        }
      ]
    },
    staff: {}
  },

  attendance_sessions: [],
  subject_attendance: {},

  // OFFICIAL NOTICES (Preserved)
  notices: [
    {
      id: "NOT001",
      title: "JNTUH B.Tech 2nd, 3rd & 4th Year Even Semester Mid-1 Examination Schedule 2026",
      content: "All B.Tech students are hereby informed that the 1st Mid-Term Examinations for the ongoing academic year 2025-26 (2-2, 3-2, and 4-2 Semesters) are scheduled to commence from 15th December 2026. Hall tickets will be issued through student portals. Strict adherence to academic dress code and college ID card is mandatory.",
      category: "Examinations",
      priority: "high",
      targetAudience: "all",
      publishedBy: "Office of the Controller of Examinations, TRRCT",
      publishDate: "2026-11-20",
      attachmentName: "Mid1_Exam_Timetable_2026.pdf",
      attachmentUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      isActive: true,
      createdAt: "2026-11-20T10:00:00.000Z"
    },
    {
      id: "NOT002",
      title: "Admissions Open for B.Tech & Polytechnic Diploma 2026-27 | TS EAPCET Code: TRRM",
      content: "Admissions counseling and management quota registrations have officially commenced for the academic year 2026-27 across Computer Science & Engineering, Artificial Intelligence & Machine Learning, Electronics & Communication Engineering, and Electrical Engineering. For merit scholarships and spot admissions, contact the Admissions Cell at Meerpet Campus.",
      category: "Admissions",
      priority: "high",
      targetAudience: "all",
      publishedBy: "Admissions Director, TRR Group",
      publishDate: "2026-11-18",
      attachmentName: "TRRCT_Information_Brochure_2026.pdf",
      attachmentUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      isActive: true,
      createdAt: "2026-11-18T09:30:00.000Z"
    },
    {
      id: "NOT003",
      title: "Annual National Technical Symposium 'TECHNO-TRRCT 2026' Call for Papers & Project Expo",
      content: "The Department of CSE & ECE is delighted to announce the flagship Annual National Technical Symposium 'TECHNO-TRRCT 2026'. Events include Code Marathon, AI Project Expo, Paper Presentation, Circuit Debugging, and Robotics Challenge. Exciting cash prizes up to INR 1,50,000 for top innovations.",
      category: "Events",
      priority: "normal",
      targetAudience: "all",
      publishedBy: "Faculty Coordinator, Tech Fest Committee",
      publishDate: "2026-11-15",
      attachmentName: "Techno_TRRCT_Poster_Guidelines.pdf",
      attachmentUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      isActive: true,
      createdAt: "2026-11-15T14:00:00.000Z"
    },
    {
      id: "NOT004",
      title: "Campus Recruitment Drive - Top IT & Product MNCs Visiting Next Month",
      content: "Training & Placement Cell (T&P) alerts eligible B.Tech 3rd and 4th-year students to update their resumes in the college database. Shortlisted candidates for technical assessments in Software Engineering, Full Stack, and Cloud Support will receive assessment schedules via institutional email.",
      category: "Placements",
      priority: "high",
      targetAudience: "students",
      publishedBy: "Head, Training & Placement Cell",
      publishDate: "2026-11-12",
      attachmentName: "Placement_Drive_Eligibility_Criteria.pdf",
      attachmentUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      isActive: true,
      createdAt: "2026-11-12T11:15:00.000Z"
    }
  ],

  // UPCOMING EVENTS (Preserved)
  events: [
    {
      id: "EVT001",
      title: "TECHNO-TRRCT 2026: National Level Hackathon & Tech Fest",
      description: "A 24-Hour continuous hackathon bringing together bright engineering minds to solve real-world problems in Healthcare AI, Smart Cities, Clean Energy, and Cyber Security.",
      date: "2026-12-18",
      time: "09:00 AM - 05:00 PM",
      venue: "Main Auditorium & Central Computing Center, TRRCT",
      organizer: "Department of Computer Science & Engineering",
      bannerUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      registrationStatus: "Open",
      createdAt: "2026-11-10T10:00:00.000Z"
    },
    {
      id: "EVT002",
      title: "Industrial Workshop on Cloud Architecture & Generative AI Systems",
      description: "Hands-on masterclass led by Principal Cloud Engineers from Hyderabad IT Corridor covering Kubernetes, Microservices, and LLM fine-tuning pipelines.",
      date: "2026-12-22",
      time: "10:30 AM - 04:00 PM",
      venue: "Seminar Hall - Block B, 2nd Floor",
      organizer: "Industry-Institute Interaction Cell (IIIC)",
      bannerUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      registrationStatus: "Limited Seats",
      createdAt: "2026-11-11T12:00:00.000Z"
    },
    {
      id: "EVT003",
      title: "Annual Sports Meet & Inter-Department Championship 2026",
      description: "Cricket tournament, Badminton, Table Tennis, Volleyball, and Track & Field events between departments. Trophy ceremony presided over by Hon'ble Chairman.",
      date: "2027-01-08",
      time: "08:30 AM - 05:30 PM",
      venue: "TRR Sports Ground & Indoor Complex",
      organizer: "Department of Physical Education",
      bannerUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
      registrationStatus: "Registrations via Class Reps",
      createdAt: "2026-11-14T15:00:00.000Z"
    }
  ],

  assignments: [],
  submissions: [],
  results: [],

  // CENTRAL DIGITAL LIBRARY (Preserved & Integrated with Google Drive)
  // Shared Drive Root: https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK
  library: [
    {
      id: "LIB001",
      title: "Database System Concepts (6th Edition) - Silberschatz, Korth & Sudarshan",
      category: "Textbooks",
      department: "Computer Science & Engineering",
      semester: "IV Semester",
      subject: "Database Management Systems",
      authorOrPublisher: "Abraham Silberschatz, Henry F. Korth (McGraw Hill)",
      fileSize: "28.4 MB",
      format: "PDF",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Standard prescribed textbook for relational models, SQL queries, transaction management, indexing, and NoSQL storage architectures.",
      accessRestricted: true,
      downloadsCount: 142,
      uploadedBy: "Central Library Division",
      createdAt: "2026-02-01T10:00:00.000Z"
    },
    {
      id: "LIB002",
      title: "Design & Analysis of Algorithms Complete Lecture Notes & Handouts",
      category: "Lecture Notes",
      department: "Computer Science & Engineering",
      semester: "IV Semester",
      subject: "Design & Analysis of Algorithms",
      authorOrPublisher: "Department of Computer Science & Engineering",
      fileSize: "14.2 MB",
      format: "PDF",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Comprehensive compiled class notes covering Divide & Conquer, Greedy, Dynamic Programming, Backtracking, Branch & Bound, and NP-Completeness.",
      accessRestricted: true,
      downloadsCount: 289,
      uploadedBy: "Department of CSE",
      createdAt: "2026-02-05T11:30:00.000Z"
    },
    {
      id: "LIB003",
      title: "JNTUH Official Curriculum & Academic Syllabus (R22 Regulations - B.Tech CSE)",
      category: "Syllabus",
      department: "Computer Science & Engineering",
      semester: "All Semesters (I to VIII)",
      subject: "Curriculum Regulation",
      authorOrPublisher: "JNTU Hyderabad (JNTUH)",
      fileSize: "6.8 MB",
      format: "PDF",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Official JNTUH R22 regulation course structure, course outcomes, credit distribution, and lab assessment schemes.",
      accessRestricted: true,
      downloadsCount: 415,
      uploadedBy: "Administration",
      createdAt: "2026-01-20T09:00:00.000Z"
    },
    {
      id: "LIB004",
      title: "Advanced DBMS Lab Manual, Oracle/MySQL Practice Queries & Schema DDL",
      category: "Lab Manuals",
      department: "Computer Science & Engineering",
      semester: "IV Semester",
      subject: "Database Management Systems Lab",
      authorOrPublisher: "Department of CSE, TRR College of Technology",
      fileSize: "8.5 MB",
      format: "PDF & SQL",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Step-by-step practical lab experiments, ER schema diagrams, triggers, stored procedures, cursors, and NoSQL query hands-on exercises.",
      accessRestricted: true,
      downloadsCount: 198,
      uploadedBy: "Department of CSE",
      createdAt: "2026-02-10T14:15:00.000Z"
    },
    {
      id: "LIB005",
      title: "Previous 5 Years JNTUH End-Semester Question Papers Collection (2020 - 2025)",
      category: "Previous Question Papers",
      department: "Computer Science & Engineering",
      semester: "IV Semester",
      subject: "All Core Subjects",
      authorOrPublisher: "TRRCT Central Examination Wing",
      fileSize: "22.1 MB",
      format: "PDF",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Compiled solved and unsolved JNTUH university examination question papers for DAA, DBMS, Operating Systems, Computer Networks, and Discrete Mathematics.",
      accessRestricted: true,
      downloadsCount: 630,
      uploadedBy: "Administration",
      createdAt: "2026-02-12T16:00:00.000Z"
    }
  ]
};
