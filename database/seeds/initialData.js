// TRR College of Technology (TRRCT) - Enterprise Production Seed Registry
// Precomputed bcrypt hashes for offline/cloud zero-dependency seeding
const adminHash = "$2b$10$gKndavjpHzXYByzL9y7IDuB4OH7SLxAh9IbiABt.1AXjzPpO5nDne";   // admin@trrct2026
const cseHash = "$2b$10$3u9Y6qTdYZDrIJnZWYGtXe1DC.dNlRKkdYMiLuJKk7pxF9KL8gCaG";     // cse@trrct123
const facultyHash = "$2b$10$rCSrI1rTrQq0qQmKhzs1t./WDY3iPps5ZQzAceCjNKsnO7TtoB90m"; // faculty@123
const eceHash = "$2b$10$zyk9GXkHFBKxFNwYfQWv1uaDUjlDwlKbH4EeBqPcWqPZpB.Kf4BGO";     // ece@trrct123

module.exports = {
  admins: [
    {
      id: "ADM001",
      adminId: "admin",
      name: "Dr. P. Venkata Rao",
      title: "Principal & Academic Director",
      email: "principal@trrct.co.in",
      phone: "+91 91543 64306",
      passwordHash: adminHash,
      role: "admin",
      department: "Office of the Principal",
      institution: "TRR College of Technology",
      campus: "Pragathi Colony, Meerpet, Hyderabad",
      createdAt: "2026-01-10T09:00:00.000Z"
    }
  ],

  staff: [
    {
      id: "STF001",
      staffId: "FAC-CSE-01",
      name: "Dr. A. Ramakrishna",
      email: "hod.cse@trrct.co.in",
      phone: "+91 98480 11223",
      department: "Computer Science & Engineering",
      designation: "Professor & Head of Department",
      qualification: "Ph.D (Algorithms & Distributed Systems, JNTUH)",
      passwordHash: cseHash,
      role: "staff",
      assignedSubjects: ["Design & Analysis of Algorithms", "Advanced Data Structures", "Artificial Intelligence"],
      officeRoom: "CSE Block - Ground Floor, Room 102",
      joiningYear: 2021,
      createdAt: "2026-01-15T10:00:00.000Z"
    },
    {
      id: "STF002",
      staffId: "FAC-CSE-02",
      name: "Prof. Sunita Rao",
      email: "sunita.cse@trrct.co.in",
      phone: "+91 98480 33445",
      department: "Computer Science & Engineering",
      designation: "Associate Professor",
      qualification: "M.Tech (Software Engineering)",
      passwordHash: facultyHash,
      role: "staff",
      assignedSubjects: ["Database Management Systems", "Full Stack Web Technologies", "Cloud Computing"],
      officeRoom: "CSE Block - 1st Floor, Room 204",
      joiningYear: 2022,
      createdAt: "2026-01-15T10:30:00.000Z"
    },
    {
      id: "STF003",
      staffId: "FAC-ECE-01",
      name: "Dr. M. Sridhar",
      email: "hod.ece@trrct.co.in",
      phone: "+91 98480 55667",
      department: "Electronics & Communication Engineering",
      designation: "Professor & Head of Department",
      qualification: "Ph.D (VLSI Design & Embedded Systems)",
      passwordHash: eceHash,
      role: "staff",
      assignedSubjects: ["Digital Signal Processing", "Microprocessors & Microcontrollers", "IoT Systems"],
      officeRoom: "ECE Block - Room 301",
      joiningYear: 2020,
      createdAt: "2026-01-15T11:00:00.000Z"
    }
  ],

  students: [
    {
      id: "STU001",
      collegeId: "24TRRCT001",
      name: "Aditya Varma",
      dob: "15-08-2004",
      rollNumber: "22TR1A0501",
      department: "Computer Science & Engineering",
      branchCode: "CSE",
      course: "B.Tech",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      email: "aditya.varma@trrct.co.in",
      phone: "+91 97000 11223",
      bloodGroup: "O+",
      fatherName: "K. Nageswara Rao",
      attendancePercentage: 88.5,
      cgpa: 8.72,
      role: "student",
      createdAt: "2026-01-18T08:00:00.000Z"
    },
    {
      id: "STU002",
      collegeId: "24TRRCT002",
      name: "Sneha Reddy",
      dob: "10-12-2003",
      rollNumber: "22TR1A0502",
      department: "Computer Science & Engineering",
      branchCode: "CSE",
      course: "B.Tech",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      email: "sneha.reddy@trrct.co.in",
      phone: "+91 97000 44556",
      bloodGroup: "B+",
      fatherName: "R. M. Reddy",
      attendancePercentage: 92.0,
      cgpa: 9.15,
      role: "student",
      createdAt: "2026-01-18T08:15:00.000Z"
    },
    {
      id: "STU003",
      collegeId: "24TRRCT003",
      name: "Kiran Kumar",
      dob: "22-03-2004",
      rollNumber: "22TR1A0503",
      department: "Computer Science & Engineering",
      branchCode: "CSE",
      course: "B.Tech",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      email: "kiran.kumar@trrct.co.in",
      phone: "+91 97000 77889",
      bloodGroup: "A+",
      fatherName: "B. V. Prasad",
      attendancePercentage: 84.0,
      cgpa: 8.10,
      role: "student",
      createdAt: "2026-01-18T08:30:00.000Z"
    },
    {
      id: "STU004",
      collegeId: "24TRRCT004",
      name: "Pooja Sharma",
      dob: "05-11-2004",
      rollNumber: "22TR1A0504",
      department: "Computer Science & Engineering",
      branchCode: "CSE",
      course: "B.Tech",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      email: "pooja.sharma@trrct.co.in",
      phone: "+91 97000 88990",
      bloodGroup: "AB+",
      fatherName: "S. K. Sharma",
      attendancePercentage: 94.2,
      cgpa: 9.40,
      role: "student",
      createdAt: "2026-01-18T08:45:00.000Z"
    },
    {
      id: "STU005",
      collegeId: "24TRRCT005",
      name: "Rohan Mehta",
      dob: "14-02-2004",
      rollNumber: "22TR1A0505",
      department: "Computer Science & Engineering",
      branchCode: "CSE",
      course: "B.Tech",
      semester: "IV Semester (2nd Year)",
      section: "A",
      academicYear: "2025-2026",
      email: "rohan.mehta@trrct.co.in",
      phone: "+91 97000 99001",
      bloodGroup: "O-",
      fatherName: "V. D. Mehta",
      attendancePercentage: 79.5,
      cgpa: 7.95,
      role: "student",
      createdAt: "2026-01-18T09:00:00.000Z"
    }
  ],

  // ACADEMIC TIMETABLES
  timetables: {
    student: {
      program: "B.Tech",
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
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Dr. A. Ramakrishna", room: "LH-204" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "DBMS Hands-on Practical Lab", code: "CS405PC", faculty: "Prof. Sunita Rao", room: "Computing Lab 3" },
            { subject: "DBMS Hands-on Practical Lab", code: "CS405PC", faculty: "Prof. Sunita Rao", room: "Computing Lab 3" },
            { subject: "Library / Technical Seminar", code: "AC408MC", faculty: "Faculty Coordinator", room: "Central Library" }
          ]
        },
        {
          day: "Tuesday",
          slots: [
            { subject: "Operating Systems", code: "CS404PC", faculty: "Dr. M. Sridhar", room: "LH-204" },
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Dr. A. Ramakrishna", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Prof. T. Prasad", room: "LH-204" },
            { subject: "Mentoring & Remedial Class", code: "AC409MC", faculty: "Class Incharge", room: "LH-204" }
          ]
        },
        {
          day: "Wednesday",
          slots: [
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Dr. A. Ramakrishna", room: "LH-204" },
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Dr. M. Sridhar", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Algorithms Implementation Lab", code: "CS406PC", faculty: "Dr. A. Ramakrishna", room: "Computing Lab 2" },
            { subject: "Algorithms Implementation Lab", code: "CS406PC", faculty: "Dr. A. Ramakrishna", room: "Computing Lab 2" },
            { subject: "Sports & Physical Education", code: "PE401", faculty: "Physical Director", room: "Sports Ground" }
          ]
        },
        {
          day: "Thursday",
          slots: [
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Prof. T. Prasad", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Dr. M. Sridhar", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Dr. A. Ramakrishna", room: "LH-204" },
            { subject: "Constitution of India", code: "MC407HS", faculty: "Guest Faculty", room: "LH-204" },
            { subject: "Competitive Coding Practice", code: "CS410SK", faculty: "Coding Club Lead", room: "CC-1" }
          ]
        },
        {
          day: "Friday",
          slots: [
            { subject: "Web Technologies Full Stack", code: "CS403PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "Operating Systems", code: "CS404PC", faculty: "Dr. M. Sridhar", room: "LH-204" },
            { subject: "Database Management Systems", code: "CS401PC", faculty: "Prof. Sunita Rao", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Full Stack Web Tech Lab", code: "CS407PC", faculty: "Prof. Sunita Rao", room: "Web Lab 4" },
            { subject: "Full Stack Web Tech Lab", code: "CS407PC", faculty: "Prof. Sunita Rao", room: "Web Lab 4" },
            { subject: "Aptitude & Soft Skills", code: "TP401", faculty: "Placement Trainer", room: "Seminar Hall" }
          ]
        },
        {
          day: "Saturday",
          slots: [
            { subject: "Design & Analysis of Algorithms", code: "CS402PC", faculty: "Dr. A. Ramakrishna", room: "LH-204" },
            { subject: "Discrete Mathematics", code: "MA401BS", faculty: "Prof. T. Prasad", room: "LH-204" },
            { subject: "Technical Project Presentation", code: "CS411PR", faculty: "Project Panel", room: "LH-204" },
            { subject: "LUNCH BREAK", code: "--", faculty: "--", room: "Cafeteria" },
            { subject: "Hackathon & Innovation Lab", code: "RD401", faculty: "R&D Cell", room: "Incubation Center" },
            { subject: "Hackathon & Innovation Lab", code: "RD401", faculty: "R&D Cell", room: "Incubation Center" },
            { subject: "Weekend Club Activities", code: "CL401", faculty: "Student Council", room: "Auditorium" }
          ]
        }
      ]
    },
    staff: {
      "FAC-CSE-01": [
        { day: "Monday", time: "10:30 AM - 11:30 AM", subject: "Design & Analysis of Algorithms", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Tuesday", time: "11:30 AM - 12:30 PM", subject: "Design & Analysis of Algorithms", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Wednesday", time: "09:30 AM - 10:30 AM", subject: "Design & Analysis of Algorithms", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Wednesday", time: "01:15 PM - 03:15 PM", subject: "DAA Implementation Lab", class: "IV Sem CSE-A", room: "Computing Lab 2" },
        { day: "Thursday", time: "01:15 PM - 02:15 PM", subject: "Design & Analysis of Algorithms", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Saturday", time: "09:30 AM - 10:30 AM", subject: "Design & Analysis of Algorithms", class: "IV Sem CSE-A", room: "LH-204" }
      ],
      "FAC-CSE-02": [
        { day: "Monday", time: "09:30 AM - 10:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Monday", time: "11:30 AM - 12:30 PM", subject: "Web Technologies Full Stack", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Monday", time: "01:15 PM - 03:15 PM", subject: "DBMS Hands-on Practical Lab", class: "IV Sem CSE-A", room: "Computing Lab 3" },
        { day: "Tuesday", time: "10:30 AM - 11:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Wednesday", time: "10:30 AM - 11:30 AM", subject: "Web Technologies Full Stack", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Thursday", time: "09:30 AM - 10:30 AM", subject: "Database Management Systems", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Friday", time: "09:30 AM - 10:30 AM", subject: "Web Technologies Full Stack", class: "IV Sem CSE-A", room: "LH-204" },
        { day: "Friday", time: "01:15 PM - 03:15 PM", subject: "Full Stack Web Tech Lab", class: "IV Sem CSE-A", room: "Web Lab 4" }
      ]
    }
  },

  // LIVE ATTENDANCE SESSIONS & AGGREGATE
  attendance_sessions: [
    {
      id: "ATT_SES_001",
      date: "2026-11-23",
      subjectCode: "CS401PC",
      subjectName: "Database Management Systems",
      semester: "IV Semester (2nd Year)",
      department: "Computer Science & Engineering",
      facultyId: "FAC-CSE-02",
      facultyName: "Prof. Sunita Rao",
      period: "Period 1 (09:30 - 10:30 AM)",
      totalStudents: 5,
      presentCount: 5,
      records: [
        { studentId: "24TRRCT001", rollNumber: "22TR1A0501", studentName: "Aditya Varma", status: "Present" },
        { studentId: "24TRRCT002", rollNumber: "22TR1A0502", studentName: "Sneha Reddy", status: "Present" },
        { studentId: "24TRRCT003", rollNumber: "22TR1A0503", studentName: "Kiran Kumar", status: "Present" },
        { studentId: "24TRRCT004", rollNumber: "22TR1A0504", studentName: "Pooja Sharma", status: "Present" },
        { studentId: "24TRRCT005", rollNumber: "22TR1A0505", studentName: "Rohan Mehta", status: "Present" }
      ],
      createdAt: "2026-11-23T10:35:00.000Z"
    },
    {
      id: "ATT_SES_002",
      date: "2026-11-24",
      subjectCode: "CS402PC",
      subjectName: "Design & Analysis of Algorithms",
      semester: "IV Semester (2nd Year)",
      department: "Computer Science & Engineering",
      facultyId: "FAC-CSE-01",
      facultyName: "Dr. A. Ramakrishna",
      period: "Period 2 (10:30 - 11:30 AM)",
      totalStudents: 5,
      presentCount: 4,
      records: [
        { studentId: "24TRRCT001", rollNumber: "22TR1A0501", studentName: "Aditya Varma", status: "Present" },
        { studentId: "24TRRCT002", rollNumber: "22TR1A0502", studentName: "Sneha Reddy", status: "Present" },
        { studentId: "24TRRCT003", rollNumber: "22TR1A0503", studentName: "Kiran Kumar", status: "Absent" },
        { studentId: "24TRRCT004", rollNumber: "22TR1A0504", studentName: "Pooja Sharma", status: "Present" },
        { studentId: "24TRRCT005", rollNumber: "22TR1A0505", studentName: "Rohan Mehta", status: "Present" }
      ],
      createdAt: "2026-11-24T11:35:00.000Z"
    }
  ],

  // SUBJECT-WISE ATTENDANCE ACCUMULATOR
  subject_attendance: {
    "24TRRCT001": [
      { code: "CS401PC", name: "Database Management Systems", faculty: "Prof. Sunita Rao", totalHeld: 48, attended: 44, percentage: 91.6 },
      { code: "CS402PC", name: "Design & Analysis of Algorithms", faculty: "Dr. A. Ramakrishna", totalHeld: 50, attended: 45, percentage: 90.0 },
      { code: "CS403PC", name: "Web Technologies Full Stack", faculty: "Prof. Sunita Rao", totalHeld: 42, attended: 36, percentage: 85.7 },
      { code: "CS404PC", name: "Operating Systems", faculty: "Dr. M. Sridhar", totalHeld: 46, attended: 40, percentage: 86.9 }
    ],
    "24TRRCT002": [
      { code: "CS401PC", name: "Database Management Systems", faculty: "Prof. Sunita Rao", totalHeld: 48, attended: 46, percentage: 95.8 },
      { code: "CS402PC", name: "Design & Analysis of Algorithms", faculty: "Dr. A. Ramakrishna", totalHeld: 50, attended: 47, percentage: 94.0 },
      { code: "CS403PC", name: "Web Technologies Full Stack", faculty: "Prof. Sunita Rao", totalHeld: 42, attended: 38, percentage: 90.5 },
      { code: "CS404PC", name: "Operating Systems", faculty: "Dr. M. Sridhar", totalHeld: 46, attended: 41, percentage: 89.1 }
    ]
  },

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

  assignments: [
    {
      id: "ASN001",
      title: "Database Normalization & Complex SQL Query Optimization",
      subject: "Database Management Systems",
      department: "Computer Science & Engineering",
      semester: "IV Semester (2nd Year)",
      staffId: "FAC-CSE-02",
      staffName: "Prof. Sunita Rao",
      dueDate: "2026-12-05",
      maxMarks: 25,
      description: "Design a normalized 3NF/BCNF relational database schema for a Healthcare Hospital Management System. Include SQL DDL statements, sample inserts, and write optimized queries using JOINs, Window functions, and indexing strategies.",
      instructions: "Submit your solution as a single PDF containing ER diagram, schema definitions, query explanations, and execution plans.",
      resourceFile: "DBMS_Assignment_1_Case_Study.pdf",
      status: "Active",
      createdAt: "2026-11-15T09:00:00.000Z"
    },
    {
      id: "ASN002",
      title: "Dynamic Programming: 0/1 Knapsack & Bellman-Ford Shortest Path",
      subject: "Design & Analysis of Algorithms",
      department: "Computer Science & Engineering",
      semester: "IV Semester (2nd Year)",
      staffId: "FAC-CSE-01",
      staffName: "Dr. A. Ramakrishna",
      dueDate: "2026-12-08",
      maxMarks: 30,
      description: "Implement the 0/1 Knapsack problem using Bottom-Up Tabulation and Space-Optimized DP in C++/Java. Analyze time and space complexity with formal recurrence relations and compare with Greedy approach.",
      instructions: "Upload source code and detailed complexity analysis report. GitHub repository links are encouraged.",
      resourceFile: "DAA_Assignment_DP_Problems.pdf",
      status: "Active",
      createdAt: "2026-11-17T11:00:00.000Z"
    },
    {
      id: "ASN003",
      title: "Enterprise Full-Stack Academic Portal Architecture",
      subject: "Web Technologies",
      department: "Computer Science & Engineering",
      semester: "IV Semester (2nd Year)",
      staffId: "FAC-CSE-02",
      staffName: "Prof. Sunita Rao",
      dueDate: "2026-12-12",
      maxMarks: 25,
      description: "Develop a responsive frontend and RESTful API backend handling role-based authentication, student record submission, and database storage.",
      instructions: "Include screenshots, API test evidence, and live code zip or repository link.",
      resourceFile: "WebTech_Project_Rubric.pdf",
      status: "Active",
      createdAt: "2026-11-20T14:30:00.000Z"
    }
  ],

  submissions: [
    {
      id: "SUB001",
      assignmentId: "ASN001",
      assignmentTitle: "Database Normalization & Complex SQL Query Optimization",
      studentCollegeId: "24TRRCT001",
      studentName: "Aditya Varma",
      department: "Computer Science & Engineering",
      submissionDate: "2026-11-22T16:45:00.000Z",
      submissionType: "Document & SQL Script",
      fileName: "Aditya_22TR1A0501_DBMS_Assignment1.pdf",
      fileUrl: "/uploads/Aditya_22TR1A0501_DBMS_Assignment1.pdf",
      externalUrl: "https://github.com/trrct-academic/dbms-hospital-management",
      studentNotes: "Completed ER schema normalized to BCNF with benchmark query plans attached.",
      status: "Evaluated",
      marksAwarded: 24,
      maxMarks: 25,
      feedback: "Excellent schema design and meticulous normalization proof. Well-structured SQL indexes.",
      evaluatedBy: "Prof. Sunita Rao",
      evaluatedAt: "2026-11-23T11:20:00.000Z"
    }
  ],

  results: [
    {
      id: "RES001",
      studentCollegeId: "24TRRCT001",
      studentName: "Aditya Varma",
      rollNumber: "22TR1A0501",
      department: "Computer Science & Engineering",
      course: "B.Tech",
      semester: "III Semester (2nd Year)",
      academicYear: "2025-2026",
      examType: "Regular End-Semester Examinations",
      monthYear: "January 2026",
      sgpa: 8.75,
      cgpa: 8.72,
      resultStatus: "PASSED",
      totalCreditsRegistered: 20.0,
      totalCreditsEarned: 20.0,
      subjects: [
        { code: "CS301PC", name: "Data Structures & Algorithms", internalMarks: 24, externalMarks: 68, totalMarks: 92, grade: "A+", gradePoints: 10, credits: 4.0, status: "Pass" },
        { code: "CS302PC", name: "Computer Organization & Architecture", internalMarks: 22, externalMarks: 58, totalMarks: 80, grade: "A", gradePoints: 9, credits: 3.0, status: "Pass" },
        { code: "CS303PC", name: "Object Oriented Programming through Java", internalMarks: 23, externalMarks: 65, totalMarks: 88, grade: "A+", gradePoints: 10, credits: 3.0, status: "Pass" },
        { code: "MA304BS", name: "Discrete Mathematics & Graph Theory", internalMarks: 21, externalMarks: 56, totalMarks: 77, grade: "B+", gradePoints: 8, credits: 3.0, status: "Pass" },
        { code: "CS305PC", name: "Data Structures Lab", internalMarks: 24, externalMarks: 72, totalMarks: 96, grade: "O", gradePoints: 10, credits: 1.5, status: "Pass" },
        { code: "CS306PC", name: "Java Programming Lab", internalMarks: 25, externalMarks: 70, totalMarks: 95, grade: "O", gradePoints: 10, credits: 1.5, status: "Pass" },
        { code: "MC307HS", name: "Constitution of India & Professional Ethics", internalMarks: 22, externalMarks: 60, totalMarks: 82, grade: "A", gradePoints: 9, credits: 4.0, status: "Pass" }
      ],
      publishedDate: "2026-03-05"
    }
  ],

  // CENTRAL DIGITAL LIBRARY (Integrated with Google Drive Cloud Storage)
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
      uploadedBy: "Prof. Sunita Rao (Associate Professor)",
      createdAt: "2026-02-01T10:00:00.000Z"
    },
    {
      id: "LIB002",
      title: "Design & Analysis of Algorithms Complete Lecture Notes & Handouts",
      category: "Lecture Notes",
      department: "Computer Science & Engineering",
      semester: "IV Semester",
      subject: "Design & Analysis of Algorithms",
      authorOrPublisher: "Dr. A. Ramakrishna (Professor & HOD, CSE)",
      fileSize: "14.2 MB",
      format: "PDF",
      driveFolderUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveFileId: "1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveViewUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      gdriveDownloadUrl: "https://drive.google.com/drive/folders/1ZJhiHgZG_hhhdQN1pKJWbdlGPXueJkvK",
      description: "Comprehensive compiled class notes covering Divide & Conquer, Greedy, Dynamic Programming, Backtracking, Branch & Bound, and NP-Completeness.",
      accessRestricted: true,
      downloadsCount: 289,
      uploadedBy: "Dr. A. Ramakrishna (HOD, CSE)",
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
      uploadedBy: "Office of the Principal",
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
      uploadedBy: "Prof. Sunita Rao (Associate Professor)",
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
      uploadedBy: "Office of the Principal",
      createdAt: "2026-02-12T16:00:00.000Z"
    }
  ]
};
