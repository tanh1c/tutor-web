// Mock data for the Tutor Support System

export const users = [
  // Demo Users for Quick Login
  {
    id: 9999,
    email: "student@hcmut.edu.vn",
    password: "password",
    role: "student",
    name: "Demo Học Sinh",
    studentId: "2012999",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    year: 3,
    avatar: "https://i.pravatar.cc/150?u=demo-student"
  },
  {
    id: 9998,
    email: "tutor@hcmut.edu.vn",
    password: "password",
    role: "tutor",
    name: "Demo Gia Sư",
    studentId: "1912999",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    year: 4,
    gpa: 3.89,
    phone: "0912345678",
    avatar: "https://i.pravatar.cc/150?u=demo-tutor",
    bio: "Demo gia sư cho hệ thống",
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: 150000,
    specialties: ["Lập trình Web", "Cơ sở dữ liệu", "Java", "Python"],
    availability: {
      monday: ["13:00-17:00"],
      tuesday: ["13:00-17:00"],
      wednesday: ["13:00-17:00"],
      thursday: ["13:00-17:00"],
      friday: ["13:00-17:00"],
      saturday: ["09:00-17:00"],
      sunday: ["09:00-17:00"]
    }
  },
  {
    id: 9997,
    email: "coordinator@hcmut.edu.vn",
    password: "password",
    role: "coordinator",
    name: "Demo Coordinator",
    employeeId: "NV999",
    department: "Phòng Đào tạo",
    phone: "0912345679",
    avatar: "https://i.pravatar.cc/150?u=demo-coordinator"
  },
  {
    id: 9996,
    email: "admin@hcmut.edu.vn",
    password: "password",
    role: "admin",
    name: "Demo Admin",
    employeeId: "AD999",
    department: "Phòng CNTT",
    phone: "0912345680",
    avatar: "https://i.pravatar.cc/150?u=demo-admin"
  },

  // Students
  {
    id: 1,
    email: "student1@hcmut.edu.vn",
    password: "password123",
    role: "student",
    name: "Nguyễn Văn An",
    studentId: "2012001",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    year: 3,
    avatar: "https://i.pravatar.cc/150?u=student1"
  },
  {
    id: 2,
    email: "student2@hcmut.edu.vn", 
    password: "password123",
    role: "student",
    name: "Trần Thị Bình",
    studentId: "2012002",
    faculty: "Khoa Cơ khí",
    major: "Cơ khí Chế tạo máy",
    year: 2,
    avatar: "https://i.pravatar.cc/150?u=student2"
  },

  // Tutors
  {
    id: 3,
    email: "tutor1@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Lê Minh Cường",
    studentId: "1912001",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    year: 4,
    gpa: 3.89,
    phone: "0912345678",
    avatar: "https://i.pravatar.cc/150?u=tutor1",
    bio: "Sinh viên năm 4 có kinh nghiệm dạy kèm 2 năm. Chuyên về lập trình và cơ sở dữ liệu.",
    rating: 4.8,
    reviewCount: 156,
    hourlyRate: 150000,
    specialties: ["Lập trình Web", "Cơ sở dữ liệu", "Java", "Python", "JavaScript"],
    availability: {
      monday: ["13:00-17:00"],
      tuesday: ["13:00-17:00"], 
      wednesday: ["13:00-17:00"],
      thursday: ["13:00-17:00"],
      friday: ["13:00-16:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2 năm"
  },
  {
    id: 4,
    email: "tutor2@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Phạm Quốc Đạt",
    studentId: "1912002",
    faculty: "Khoa Toán - Tin học",
    major: "Toán học Ứng dụng",
    year: 4,
    gpa: 3.92,
    phone: "0912345679",
    avatar: "https://i.pravatar.cc/150?u=tutor2",
    bio: "Sinh viên năm 4 ngành Toán ứng dụng, có thế mạnh về Toán cao cấp và Xác suất thống kê.",
    rating: 4.7,
    reviewCount: 134,
    hourlyRate: 140000,
    specialties: ["Toán cao cấp 1", "Toán cao cấp 2", "Xác suất thống kê", "Đại số tuyến tính"],
    availability: {
      monday: ["08:00-12:00", "14:00-17:00"],
      tuesday: ["08:00-12:00", "14:00-17:00"],
      wednesday: ["08:00-12:00"],
      thursday: ["08:00-12:00", "14:00-17:00"],
      friday: ["08:00-12:00", "14:00-16:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2.5 năm"
  },
  {
    id: 5,
    email: "tutor3@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Nguyễn Thị Mai",
    studentId: "1911001",
    faculty: "Khoa Cơ khí",
    major: "Cơ khí Chế tạo máy",
    year: 4,
    gpa: 3.85,
    phone: "0912345680",
    avatar: "https://i.pravatar.cc/150?u=tutor3",
    bio: "Sinh viên xuất sắc ngành Cơ khí với kinh nghiệm dạy kèm Vật lý và Cơ học.",
    rating: 4.6,
    reviewCount: 98,
    hourlyRate: 130000,
    specialties: ["Vật lý đại cương", "Cơ học kỹ thuật", "Sức bền vật liệu", "Vẽ kỹ thuật"],
    availability: {
      monday: ["15:00-18:00"],
      tuesday: ["15:00-18:00"],
      wednesday: ["15:00-18:00"],
      thursday: ["15:00-18:00"],
      saturday: ["08:00-12:00"]
    },
    languages: ["Tiếng Việt"],
    experience: "1.5 năm"
  },
  {
    id: 6,
    email: "tutor4@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Trần Văn Hùng",
    studentId: "1911002",
    faculty: "Khoa Xây dựng",
    major: "Kỹ thuật Xây dựng",
    year: 4,
    gpa: 3.78,
    phone: "0912345681",
    avatar: "https://i.pravatar.cc/150?u=tutor4",
    bio: "Chuyên gia về Kết cấu công trình và Vật liệu xây dựng với nhiều dự án thực tế.",
    rating: 4.5,
    reviewCount: 87,
    hourlyRate: 135000,
    specialties: ["Kết cấu bê tông", "Vật liệu xây dựng", "Cơ học đất", "AutoCAD"],
    availability: {
      monday: ["14:00-17:00"],
      wednesday: ["14:00-17:00"],
      friday: ["14:00-17:00"],
      saturday: ["09:00-12:00"],
      sunday: ["09:00-12:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2 năm"
  },
  {
    id: 7,
    email: "tutor5@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Lê Thị Hương",
    studentId: "1910001",
    faculty: "Khoa Hóa học",
    major: "Hóa học Ứng dụng",
    year: 4,
    gpa: 3.95,
    phone: "0912345682",
    avatar: "https://i.pravatar.cc/150?u=tutor5",
    bio: "Sinh viên xuất sắc ngành Hóa học với đam mê nghiên cứu và giảng dạy.",
    rating: 4.9,
    reviewCount: 201,
    hourlyRate: 160000,
    specialties: ["Hóa đại cương", "Hóa hữu cơ", "Hóa phân tích", "Hóa lý"],
    availability: {
      tuesday: ["13:00-17:00"],
      thursday: ["13:00-17:00"],
      friday: ["13:00-17:00"],
      saturday: ["08:00-16:00"]
    },
    languages: ["Tiếng Việt", "English", "Français"],
    experience: "3 năm"
  },
  {
    id: 8,
    email: "tutor6@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Phạm Minh Tuấn",
    studentId: "1913001",
    faculty: "Khoa Điện - Điện tử",
    major: "Kỹ thuật Điện tử - Viễn thông",
    year: 3,
    gpa: 3.82,
    phone: "0912345683",
    avatar: "https://i.pravatar.cc/150?u=tutor6",
    bio: "Sinh viên năm 3 đam mê công nghệ với kinh nghiệm lập trình embedded systems.",
    rating: 4.4,
    reviewCount: 76,
    hourlyRate: 125000,
    specialties: ["Mạch điện", "Vi điều khiển", "Lập trình C/C++", "Arduino", "Điện tử số"],
    availability: {
      monday: ["18:00-21:00"],
      tuesday: ["18:00-21:00"],
      wednesday: ["18:00-21:00"],
      thursday: ["18:00-21:00"],
      sunday: ["14:00-18:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "1 năm"
  },
  {
    id: 9,
    email: "tutor7@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Nguyễn Văn Đức",
    studentId: "1912003",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Kỹ thuật Máy tính",
    year: 4,
    gpa: 3.91,
    phone: "0912345684",
    avatar: "https://i.pravatar.cc/150?u=tutor7",
    bio: "Chuyên gia về AI và Machine Learning với nhiều project thực tế.",
    rating: 4.8,
    reviewCount: 189,
    hourlyRate: 170000,
    specialties: ["Machine Learning", "AI", "Python", "Data Science", "Deep Learning"],
    availability: {
      monday: ["13:00-16:00"],
      wednesday: ["13:00-16:00"],
      friday: ["13:00-16:00"],
      saturday: ["10:00-16:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2.5 năm"
  },
  {
    id: 10,
    email: "tutor8@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Trần Thị Lan",
    studentId: "1911003",
    faculty: "Khoa Quản lý Công nghiệp",
    major: "Quản lý Công nghiệp",
    year: 4,
    gpa: 3.88,
    phone: "0912345685",
    avatar: "https://i.pravatar.cc/150?u=tutor8",
    bio: "Sinh viên giỏi về kinh tế và quản lý với kỹ năng thuyết trình xuất sắc.",
    rating: 4.6,
    reviewCount: 112,
    hourlyRate: 145000,
    specialties: ["Kinh tế học", "Quản trị học", "Thống kê kinh tế", "Excel", "Presentation"],
    availability: {
      tuesday: ["16:00-19:00"],
      thursday: ["16:00-19:00"],
      saturday: ["09:00-15:00"],
      sunday: ["09:00-15:00"]
    },
    languages: ["Tiếng Việt", "English", "中文"],
    experience: "2 năm"
  },

  // More tutors for diverse expertise
  {
    id: 11,
    email: "tutor9@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Võ Minh Khoa",
    studentId: "1912004",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "An toàn thông tin",
    year: 4,
    gpa: 3.93,
    phone: "0912345686",
    avatar: "https://i.pravatar.cc/150?u=tutor9",
    bio: "Chuyên gia bảo mật với kinh nghiệm về ethical hacking và cryptography.",
    rating: 4.7,
    reviewCount: 143,
    hourlyRate: 165000,
    specialties: ["Network Security", "Cryptography", "Ethical Hacking", "Linux", "Cybersecurity"],
    availability: {
      monday: ["19:00-22:00"],
      tuesday: ["19:00-22:00"],
      wednesday: ["19:00-22:00"],
      saturday: ["13:00-17:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2 năm"
  },
  {
    id: 12,
    email: "tutor10@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Đặng Thị Thu",
    studentId: "1910002",
    faculty: "Khoa Môi trường và Tài nguyên",
    major: "Kỹ thuật Môi trường",
    year: 4,
    gpa: 3.86,
    phone: "0912345687",
    avatar: "https://i.pravatar.cc/150?u=tutor10",
    bio: "Chuyên về môi trường và bền vững với nhiều nghiên cứu khoa học.",
    rating: 4.5,
    reviewCount: 92,
    hourlyRate: 138000,
    specialties: ["Môi trường học", "Hóa môi trường", "Sinh thái học", "GIS", "Quản lý chất thải"],
    availability: {
      tuesday: ["14:00-17:00"],
      thursday: ["14:00-17:00"],
      friday: ["14:00-17:00"],
      sunday: ["10:00-14:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "1.5 năm"
  },
  {
    id: 13,
    email: "tutor11@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Nguyễn Hoàng Nam",
    studentId: "1911004",
    faculty: "Khoa Kỹ thuật Hàng không - Vũ trụ",
    major: "Kỹ thuật Hàng không",
    year: 4,
    gpa: 3.89,
    phone: "0912345688",
    avatar: "https://i.pravatar.cc/150?u=tutor11",
    bio: "Đam mê hàng không vũ trụ với kiến thức sâu về khí động học và điều khiển.",
    rating: 4.6,
    reviewCount: 78,
    hourlyRate: 155000,
    specialties: ["Khí động học", "Điều khiển tự động", "MATLAB", "Simulink", "Cơ học bay"],
    availability: {
      monday: ["16:00-19:00"],
      wednesday: ["16:00-19:00"],
      friday: ["16:00-19:00"],
      saturday: ["14:00-18:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2 năm"
  },
  {
    id: 14,
    email: "tutor12@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Trần Minh Anh",
    studentId: "1912005",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    major: "Khoa học Máy tính",
    year: 3,
    gpa: 3.81,
    phone: "0912345689",
    avatar: "https://i.pravatar.cc/150?u=tutor12",
    bio: "Full-stack developer với passion về mobile app development và UI/UX.",
    rating: 4.4,
    reviewCount: 85,
    hourlyRate: 140000,
    specialties: ["React Native", "Flutter", "UI/UX Design", "Mobile Development", "Node.js"],
    availability: {
      tuesday: ["17:00-20:00"],
      thursday: ["17:00-20:00"],
      friday: ["17:00-20:00"],
      sunday: ["15:00-19:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "1.5 năm"
  },
  {
    id: 15,
    email: "tutor13@hcmut.edu.vn",
    password: "password123",
    role: "tutor",
    name: "Lê Văn Phong",
    studentId: "1910003",
    faculty: "Khoa Kỹ thuật Địa chất và Dầu khí",
    major: "Kỹ thuật Dầu khí",
    year: 4,
    gpa: 3.87,
    phone: "0912345690",
    avatar: "https://i.pravatar.cc/150?u=tutor13",
    bio: "Chuyên gia địa chất với kinh nghiệm thực tế tại các công ty dầu khí.",
    rating: 4.7,
    reviewCount: 104,
    hourlyRate: 150000,
    specialties: ["Địa chất", "Kỹ thuật khoan", "Reservoir Engineering", "Petrel", "Eclipse"],
    availability: {
      monday: ["13:00-16:00"],
      tuesday: ["13:00-16:00"],
      wednesday: ["13:00-16:00"],
      saturday: ["08:00-14:00"]
    },
    languages: ["Tiếng Việt", "English"],
    experience: "2.5 năm"
  },

  // Coordinators
  {
    id: 50,
    email: "coordinator1@hcmut.edu.vn",
    password: "password123",
    role: "coordinator",
    name: "PGS.TS. Lê Văn Cường",
    employeeId: "GV001",
    faculty: "Khoa Khoa học và Kỹ thuật Máy tính",
    avatar: "https://i.pravatar.cc/150?u=coordinator1"
  },

  // Admins
  {
    id: 60,
    email: "admin1@hcmut.edu.vn",
    password: "password123",
    role: "admin",
    name: "Ing. Phạm Minh Tuấn",
    employeeId: "AD001",
    avatar: "https://i.pravatar.cc/150?u=admin1"
  }
];

export const subjects = [
  { id: 1, code: "CO1027", name: "Lập trình Web", faculty: "Khoa Khoa học và Kỹ thuật Máy tính" },
  { id: 2, code: "CO2003", name: "Cơ sở dữ liệu", faculty: "Khoa Khoa học và Kỹ thuật Máy tính" },
  { id: 3, code: "MT1003", name: "Toán cao cấp 1", faculty: "Khoa Toán - Tin học" },
  { id: 4, code: "MT1004", name: "Toán cao cấp 2", faculty: "Khoa Toán - Tin học" },
  { id: 5, code: "PH1003", name: "Vật lý đại cương", faculty: "Khoa Vật lý Ứng dụng" },
  { id: 6, code: "CH1003", name: "Hóa đại cương", faculty: "Khoa Hóa học" },
  { id: 7, code: "ME2012", name: "Cơ học kỹ thuật", faculty: "Khoa Cơ khí" },
  { id: 8, code: "CE2001", name: "Kết cấu bê tông", faculty: "Khoa Xây dựng" },
  { id: 9, code: "EE2011", name: "Mạch điện", faculty: "Khoa Điện - Điện tử" },
  { id: 10, code: "CS3012", name: "Machine Learning", faculty: "Khoa Khoa học và Kỹ thuật Máy tính" }
];

export const sessions = [
  {
    id: 1,
    studentId: 1,
    tutorId: 3,
    subjectId: 1,
    title: "Ôn tập HTML và CSS cơ bản",
    description: "Giúp sinh viên nắm vững các khái niệm HTML và CSS để làm bài tập lớn",
    date: "2025-09-15",
    startTime: "14:00",
    endTime: "15:30",
    duration: 90,
    type: "individual", // individual, group
    mode: "in-person", // in-person, online
    location: "Phòng H1-101",
    meetingUrl: null,
    status: "scheduled", // scheduled, confirmed, in-progress, completed, cancelled
    notes: "Mang theo laptop và prepare basic HTML knowledge",
    price: 150000,
    createdAt: "2025-09-10T10:00:00Z",
    confirmedAt: null,
    reminderSent: false
  },
  {
    id: 2,
    studentId: 2,
    tutorId: 4,
    subjectId: 3,
    title: "Giải thích đạo hàm và ứng dụng",
    description: "Hướng dẫn các bài tập về đạo hàm và ứng dụng trong thực tế",
    date: "2025-09-16",
    startTime: "15:00",
    endTime: "16:00",
    duration: 60,
    type: "individual",
    mode: "in-person",
    location: "Thư viện Tạ Quang Bửu - Tầng 2",
    meetingUrl: null,
    status: "confirmed",
    notes: "Sinh viên cần mang theo bài tập về nhà",
    price: 140000,
    createdAt: "2025-09-11T09:00:00Z",
    confirmedAt: "2025-09-11T09:30:00Z",
    reminderSent: false
  },
  {
    id: 3,
    studentId: 1,
    tutorId: 3,
    subjectId: 2,
    title: "Thiết kế ERD và chuẩn hóa CSDL",
    description: "Hướng dẫn thiết kế sơ đồ thực thể kết hợp và chuẩn hóa cơ sở dữ liệu",
    date: "2025-09-10",
    startTime: "16:00",
    endTime: "18:00",
    duration: 120,
    type: "individual",
    mode: "in-person",
    location: "Phòng H1-202",
    meetingUrl: null,
    status: "completed",
    notes: "Sinh viên đã nắm được cách thiết kế ERD cơ bản",
    price: 300000,
    createdAt: "2025-09-08T14:00:00Z",
    confirmedAt: "2025-09-08T14:15:00Z",
    reminderSent: true,
    feedback: "Tutor hướng dẫn rất chi tiết và dễ hiểu. Rất hữu ích!",
    rating: 5
  },
  {
    id: 4,
    studentId: 1,
    tutorId: 9,
    subjectId: 10,
    title: "Introduction to Machine Learning",
    description: "Basic concepts of ML algorithms and practical implementation",
    date: "2025-09-18",
    startTime: "13:00",
    endTime: "15:00",
    duration: 120,
    type: "individual",
    mode: "online",
    location: null,
    meetingUrl: "https://zoom.us/j/123456789",
    status: "scheduled",
    notes: "Python environment setup required",
    price: 340000,
    createdAt: "2025-09-12T16:00:00Z",
    confirmedAt: null,
    reminderSent: false
  },
  {
    id: 5,
    studentId: 2,
    tutorId: 5,
    subjectId: 5,
    title: "Cơ học vật lý - Group Study",
    description: "Ôn tập cơ học Newton và bài tập liên quan",
    date: "2025-09-17",
    startTime: "15:00",
    endTime: "17:00",
    duration: 120,
    type: "group",
    mode: "in-person",
    location: "Phòng H2-101",
    meetingUrl: null,
    status: "confirmed",
    notes: "Group session với 3 students, bring calculators",
    price: 195000, // 130k base rate * 1.5 for group
    createdAt: "2025-09-13T11:00:00Z",
    confirmedAt: "2025-09-13T11:30:00Z",
    reminderSent: false,
    groupSize: 3,
    maxGroupSize: 4
  }
];

// Expanded availability data for calendar
export const availability = [
  {
    id: 1,
    tutorId: 3,
    dayOfWeek: 1, // Monday
    startTime: "13:00",
    endTime: "17:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: ["2025-09-16", "2025-11-25"] // dates when not available
  },
  {
    id: 2,
    tutorId: 3,
    dayOfWeek: 2, // Tuesday
    startTime: "13:00",
    endTime: "17:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: []
  },
  {
    id: 3,
    tutorId: 3,
    dayOfWeek: 3, // Wednesday
    startTime: "13:00",
    endTime: "17:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: []
  },
  {
    id: 4,
    tutorId: 4,
    dayOfWeek: 1, // Monday
    startTime: "08:00",
    endTime: "12:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: []
  },
  {
    id: 5,
    tutorId: 4,
    dayOfWeek: 1, // Monday
    startTime: "14:00",
    endTime: "17:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: []
  },
  {
    id: 6,
    tutorId: 9,
    dayOfWeek: 6, // Saturday
    startTime: "10:00",
    endTime: "16:00",
    isRecurring: true,
    effectiveFrom: "2025-09-01",
    effectiveUntil: "2025-12-31",
    exceptions: []
  }
];

// Room booking integration (mock HCMUT rooms)
export const rooms = [
  {
    id: 1,
    name: "Phòng H1-101",
    building: "H1",
    capacity: 30,
    facilities: ["Projector", "Whiteboard", "Air Conditioning"],
    bookingUrl: "https://rooms.hcmut.edu.vn/book/h1-101"
  },
  {
    id: 2,
    name: "Phòng H1-102",
    building: "H1", 
    capacity: 25,
    facilities: ["Projector", "Whiteboard", "Air Conditioning"],
    bookingUrl: "https://rooms.hcmut.edu.vn/book/h1-102"
  },
  {
    id: 3,
    name: "Phòng H2-101",
    building: "H2",
    capacity: 40,
    facilities: ["Projector", "Whiteboard", "Sound System", "Air Conditioning"],
    bookingUrl: "https://rooms.hcmut.edu.vn/book/h2-101"
  },
  {
    id: 4,
    name: "Thư viện Tạ Quang Bửu - Tầng 2",
    building: "Library",
    capacity: 20,
    facilities: ["Study Area", "Computers", "WiFi"],
    bookingUrl: "https://library.hcmut.edu.vn/book/floor2"
  },
  {
    id: 5,
    name: "Khu vực học nhóm A",
    building: "Study Area",
    capacity: 8,
    facilities: ["Whiteboard", "WiFi"],
    bookingUrl: "https://study.hcmut.edu.vn/book/group-a"
  }
];

// Session Types
export const sessionTypes = [
  {
    id: 'academic',
    name: 'Academic Tutoring',
    description: 'Hỗ trợ học tập các môn học cụ thể',
    icon: 'BookOpen',
    color: 'blue',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Programming', 'English']
  },
  {
    id: 'skills',
    name: 'Skills Coaching',
    description: 'Coaching kỹ năng thuyết trình, kỹ thuật học tập',
    icon: 'Target',
    color: 'green',
    subjects: ['Presentation Skills', 'Study Techniques', 'Time Management', 'Communication']
  },
  {
    id: 'career',
    name: 'Career Guidance',
    description: 'Tư vấn định hướng nghề nghiệp',
    icon: 'Briefcase',
    color: 'purple',
    subjects: ['Career Planning', 'Interview Skills', 'Resume Writing', 'Industry Insights']
  },
  {
    id: 'group',
    name: 'Group Study',
    description: 'Học nhóm, thảo luận và làm bài tập',
    icon: 'Users',
    color: 'orange',
    subjects: ['Group Projects', 'Exam Preparation', 'Problem Solving', 'Peer Learning']
  }
];

// Session Status Lifecycle
export const sessionStatuses = [
  { id: 'scheduled', name: 'Đã lên lịch', color: 'gray', description: 'Session được tạo và chờ xác nhận' },
  { id: 'confirmed', name: 'Đã xác nhận', color: 'blue', description: 'Cả hai bên đã xác nhận tham gia' },
  { id: 'in-progress', name: 'Đang diễn ra', color: 'green', description: 'Session đang được tiến hành' },
  { id: 'completed', name: 'Hoàn thành', color: 'purple', description: 'Session đã kết thúc thành công' },
  { id: 'reviewed', name: 'Đã đánh giá', color: 'indigo', description: 'Đã có feedback và đánh giá' },
  { id: 'cancelled', name: 'Đã hủy', color: 'red', description: 'Session bị hủy bỏ' },
  { id: 'no-show', name: 'Vắng mặt', color: 'yellow', description: 'Một bên không tham gia' }
];

// Mock HCMUT Library Resources
export const libraryResources = [
  {
    id: 1,
    title: "Toán Cao Cấp 1 - Giáo trình",
    type: "pdf",
    subject: "Mathematics",
    author: "TS. Nguyễn Văn A",
    size: "2.5 MB",
    url: "https://library.hcmut.edu.vn/resources/toan-cao-cap-1.pdf",
    thumbnail: "/api/placeholder/100/140",
    downloads: 1250,
    rating: 4.8
  },
  {
    id: 2,
    title: "Lập Trình C++ Cơ Bản",
    type: "pdf",
    subject: "Programming",
    author: "ThS. Trần Thị B",
    size: "5.2 MB",
    url: "https://library.hcmut.edu.vn/resources/cpp-co-ban.pdf",
    thumbnail: "/api/placeholder/100/140",
    downloads: 890,
    rating: 4.6
  },
  {
    id: 3,
    title: "Physics Formula Reference",
    type: "doc",
    subject: "Physics",
    author: "Prof. John Smith",
    size: "1.8 MB",
    url: "https://library.hcmut.edu.vn/resources/physics-formulas.doc",
    thumbnail: "/api/placeholder/100/140",
    downloads: 567,
    rating: 4.9
  },
  {
    id: 4,
    title: "Presentation Skills Video Tutorial",
    type: "video",
    subject: "Presentation Skills",
    author: "HCMUT Skills Center",
    size: "145 MB",
    url: "https://library.hcmut.edu.vn/videos/presentation-skills.mp4",
    thumbnail: "/api/placeholder/100/140",
    downloads: 234,
    rating: 4.7
  }
];

// Session Notes Templates
export const sessionNoteTemplates = [
  {
    id: 'academic',
    name: 'Academic Session',
    sections: [
      { id: 'objectives', title: 'Mục tiêu buổi học', placeholder: 'Những gì cần đạt được...' },
      { id: 'topics', title: 'Nội dung đã học', placeholder: 'Các chủ đề, khái niệm đã thảo luận...' },
      { id: 'exercises', title: 'Bài tập đã làm', placeholder: 'Các bài tập, ví dụ đã thực hành...' },
      { id: 'homework', title: 'Bài tập về nhà', placeholder: 'Những gì học sinh cần làm ở nhà...' },
      { id: 'next_session', title: 'Chuẩn bị buổi sau', placeholder: 'Nội dung cần chuẩn bị cho lần tới...' }
    ]
  },
  {
    id: 'skills',
    name: 'Skills Coaching',
    sections: [
      { id: 'current_level', title: 'Trình độ hiện tại', placeholder: 'Đánh giá khả năng hiện tại...' },
      { id: 'practiced', title: 'Kỹ năng đã luyện tập', placeholder: 'Những kỹ năng đã thực hành...' },
      { id: 'improvements', title: 'Điểm cần cải thiện', placeholder: 'Những khía cạnh cần phát triển thêm...' },
      { id: 'action_plan', title: 'Kế hoạch hành động', placeholder: 'Các bước cụ thể để cải thiện...' },
      { id: 'resources', title: 'Tài liệu tham khảo', placeholder: 'Sách, video, khóa học khuyến nghị...' }
    ]
  }
];

// Progress Tracking Data
export const progressData = [
  {
    studentId: 2,
    tutorId: 1,
    subject: 'Toán Cao Cấp 1',
    overallProgress: 75,
    sessions: [
      {
        sessionId: 1,
        date: '2025-09-01',
        topics: ['Đạo hàm cơ bản', 'Quy tắc tính đạo hàm'],
        score: 80,
        notes: 'Học sinh hiểu khái niệm cơ bản, cần luyện tập thêm'
      },
      {
        sessionId: 2,
        date: '2025-09-05',
        topics: ['Ứng dụng đạo hàm', 'Khảo sát hàm số'],
        score: 85,
        notes: 'Tiến bộ rõ rệt, có thể áp dụng được lý thuyết'
      }
    ],
    strengths: ['Tư duy logic tốt', 'Chăm chỉ làm bài tập'],
    weaknesses: ['Tính toán chưa nhanh', 'Hay quên công thức'],
    recommendations: ['Luyện tập tính toán nhiều hơn', 'Tạo bảng công thức để học thuộc']
  }
];

// Session Recordings (Mock)
export const sessionRecordings = [
  {
    id: 1,
    sessionId: 1,
    title: "Toán Cao Cấp 1 - Đạo hàm cơ bản",
    duration: "01:45:30",
    size: "890 MB",
    recordingUrl: "https://recordings.hcmut.edu.vn/session-1.mp4",
    thumbnailUrl: "/api/placeholder/320/180",
    createdAt: "2025-09-01T14:00:00Z",
    quality: "1080p",
    hasTranscript: true,
    isProcessing: false
  },
  {
    id: 2,
    sessionId: 2,
    title: "Programming C++ - Functions and Arrays",
    duration: "02:15:45",
    size: "1.2 GB",
    recordingUrl: "https://recordings.hcmut.edu.vn/session-2.mp4",
    thumbnailUrl: "/api/placeholder/320/180",
    createdAt: "2025-09-03T10:30:00Z",
    quality: "1080p",
    hasTranscript: true,
    isProcessing: false
  }
];

// Feedback & Rating System Data
export const feedbackCategories = [
  {
    id: 'knowledge',
    name: 'Kiến thức chuyên môn',
    description: 'Độ hiểu biết và nắm vững chủ đề giảng dạy',
    weight: 0.25
  },
  {
    id: 'communication',
    name: 'Kỹ năng giao tiếp',
    description: 'Khả năng truyền đạt rõ ràng và dễ hiểu',
    weight: 0.25
  },
  {
    id: 'punctuality',
    name: 'Tính đúng giờ',
    description: 'Đúng giờ và tuân thủ lịch trình',
    weight: 0.15
  },
  {
    id: 'helpfulness',
    name: 'Sự hỗ trợ',
    description: 'Mức độ nhiệt tình và sẵn sàng hỗ trợ',
    weight: 0.2
  },
  {
    id: 'overall',
    name: 'Đánh giá tổng thể',
    description: 'Cảm nhận chung về session',
    weight: 0.15
  }
];

export const feedbackData = [
  {
    id: 1,
    sessionId: 1,
    fromUserId: 2,
    fromUserName: "Nguyễn Văn Student",
    fromUserRole: "student",
    toUserId: 1,
    toUserName: "Nguyễn Văn Tutor",
    toUserRole: "tutor",
    ratings: {
      knowledge: 5,
      communication: 4,
      punctuality: 5,
      helpfulness: 5,
      overall: 5
    },
    comment: "Thầy giảng rất dễ hiểu và nhiệt tình. Em đã hiểu được phần đạo hàm mà trước đây rất khó hiểu.",
    improvements: "Có thể cung cấp thêm bài tập thực hành",
    wouldRecommend: true,
    createdAt: "2025-09-01T16:00:00Z",
    isAnonymous: false
  },
  {
    id: 2,
    sessionId: 1,
    fromUserId: 1,
    fromUserName: "Nguyễn Văn Tutor",
    fromUserRole: "tutor",
    toUserId: 2,
    toUserName: "Nguyễn Văn Student",
    toUserRole: "student",
    progressAssessment: {
      understanding: 4,
      participation: 5,
      homework: 3,
      improvement: 4
    },
    comment: "Học sinh rất chăm chỉ và tích cực tham gia. Cần luyện tập thêm để củng cố kiến thức.",
    recommendations: [
      "Làm thêm bài tập về nhà",
      "Ôn lại lý thuyết cơ bản",
      "Chuẩn bị câu hỏi cho buổi sau"
    ],
    nextSessionFocus: "Ứng dụng đạo hàm vào bài toán thực tế",
    createdAt: "2025-09-01T16:30:00Z"
  },
  {
    id: 3,
    sessionId: 2,
    fromUserId: 3,
    fromUserName: "Trần Thị B",
    fromUserRole: "student",
    toUserId: 4,
    toUserName: "Lê Văn Tutor C++",
    toUserRole: "tutor",
    ratings: {
      knowledge: 5,
      communication: 5,
      punctuality: 4,
      helpfulness: 5,
      overall: 5
    },
    comment: "Giảng viên rất chuyên nghiệp, code demo rất chi tiết và dễ theo dõi.",
    improvements: "Tốc độ code có thể chậm hơn một chút",
    wouldRecommend: true,
    createdAt: "2025-09-03T12:30:00Z",
    isAnonymous: false
  }
];

// System Satisfaction Surveys
export const satisfactionSurveys = [
  {
    id: 1,
    userId: 2,
    userRole: "student",
    surveyType: "post_session",
    responses: {
      platform_ease: 5,
      booking_process: 4,
      session_quality: 5,
      technical_issues: 1,
      support_responsiveness: 4,
      overall_satisfaction: 5
    },
    suggestions: "Giao diện rất dễ sử dụng, tuy nhiên có thể cải thiện tốc độ tải trang",
    createdAt: "2025-09-01T17:00:00Z"
  },
  {
    id: 2,
    userId: 1,
    userRole: "tutor",
    surveyType: "monthly",
    responses: {
      platform_ease: 4,
      student_quality: 5,
      payment_system: 4,
      scheduling_flexibility: 5,
      platform_features: 4,
      overall_satisfaction: 4
    },
    suggestions: "Hệ thống thanh toán có thể được cải thiện",
    createdAt: "2025-09-05T10:00:00Z"
  }
];

// Progress Reports Data
export const progressReports = [
  {
    id: 1,
    studentId: 2,
    tutorId: 1,
    subject: "Toán Cao Cấp 1",
    reportPeriod: {
      start: "2025-08-01",
      end: "2025-09-01"
    },
    metrics: {
      sessionsCompleted: 8,
      averageScore: 82,
      improvementRate: 15,
      attendanceRate: 100,
      homeworkCompletion: 90
    },
    topicProgress: [
      { topic: "Giới hạn", progress: 95, difficulty: "easy" },
      { topic: "Đạo hàm", progress: 85, difficulty: "medium" },
      { topic: "Tích phân", progress: 60, difficulty: "hard" },
      { topic: "Chuỗi số", progress: 30, difficulty: "hard" }
    ],
    strengths: [
      "Tư duy logic tốt",
      "Chăm chỉ làm bài tập",
      "Tích cực đặt câu hỏi"
    ],
    improvements: [
      "Cần luyện tập tính toán nhiều hơn",
      "Ôn lại kiến thức cơ bản",
      "Quản lý thời gian làm bài"
    ],
    nextGoals: [
      "Hoàn thành chủ đề tích phân",
      "Đạt điểm 8+ trong kiểm tra giữa kỳ",
      "Cải thiện tốc độ giải bài"
    ],
    tutorNotes: "Học sinh có tiến bộ đáng kể, cần tiếp tục duy trì động lực học tập",
    createdAt: "2025-09-01T15:00:00Z"
  }
];

// Tutor Performance Analytics
export const tutorAnalytics = [
  {
    tutorId: 1,
    name: "Nguyễn Văn Tutor",
    period: "2025-09",
    overallRating: 4.8,
    totalSessions: 45,
    totalStudents: 12,
    subjects: ["Toán Cao Cấp 1", "Toán Cao Cấp 2"],
    categoryRatings: {
      knowledge: 4.9,
      communication: 4.7,
      punctuality: 4.8,
      helpfulness: 4.9,
      overall: 4.8
    },
    studentSatisfaction: 96,
    completionRate: 98,
    responseTime: "< 2 hours",
    improvementTrend: "increasing",
    strengths: [
      "Kiến thức chuyên môn xuất sắc",
      "Giải thích rõ ràng, dễ hiểu",
      "Nhiệt tình hỗ trợ học sinh"
    ],
    areasForImprovement: [
      "Có thể cung cấp thêm bài tập thực hành",
      "Tăng cường tương tác trong session"
    ],
    achievements: [
      "Top 5% tutors theo rating",
      "100% students recommend",
      "Đạt 98% completion rate"
    ]
  },
  {
    tutorId: 4,
    name: "Lê Văn Tutor C++",
    period: "2025-09",
    overallRating: 4.6,
    totalSessions: 32,
    totalStudents: 8,
    subjects: ["Programming C++", "Data Structures"],
    categoryRatings: {
      knowledge: 4.8,
      communication: 4.5,
      punctuality: 4.4,
      helpfulness: 4.7,
      overall: 4.6
    },
    studentSatisfaction: 92,
    completionRate: 95,
    responseTime: "< 4 hours",
    improvementTrend: "stable",
    strengths: [
      "Code demo rất chi tiết",
      "Kiến thức lập trình sâu rộng",
      "Sẵn sàng hỗ trợ ngoài giờ"
    ],
    areasForImprovement: [
      "Cải thiện tính đúng giờ",
      "Giảm tốc độ giảng để dễ theo kịp"
    ]
  }
];

// Department Analytics
export const departmentAnalytics = {
  "Computer Science": {
    totalTutors: 25,
    totalStudents: 180,
    averageRating: 4.6,
    sessionCompletionRate: 94,
    studentSatisfaction: 89,
    topSubjects: [
      { name: "Programming C++", sessions: 120, rating: 4.7 },
      { name: "Data Structures", sessions: 95, rating: 4.5 },
      { name: "Database Systems", sessions: 87, rating: 4.6 }
    ],
    trends: {
      ratingTrend: "increasing",
      sessionTrend: "increasing",
      satisfactionTrend: "stable"
    }
  },
  "Mathematics": {
    totalTutors: 18,
    totalStudents: 210,
    averageRating: 4.7,
    sessionCompletionRate: 96,
    studentSatisfaction: 92,
    topSubjects: [
      { name: "Toán Cao Cấp 1", sessions: 150, rating: 4.8 },
      { name: "Toán Cao Cấp 2", sessions: 130, rating: 4.6 },
      { name: "Xác suất thống kê", sessions: 98, rating: 4.7 }
    ],
    trends: {
      ratingTrend: "stable",
      sessionTrend: "increasing",
      satisfactionTrend: "increasing"
    }
  }
};

// AI Improvement Suggestions (Mock)
export const improvementSuggestions = [
  {
    id: 1,
    targetType: "student",
    targetId: 2,
    category: "learning_efficiency",
    priority: "high",
    suggestion: "Dựa trên tiến độ học tập, bạn nên tăng cường luyện tập tính toán cơ bản để cải thiện tốc độ giải bài",
    actionItems: [
      "Dành 30 phút/ngày luyện tập tính toán",
      "Sử dụng ứng dụng practice math",
      "Đặt lịch thêm 1 session/tuần cho phần này"
    ],
    expectedImprovement: "25% tăng tốc độ giải bài",
    timeframe: "2-3 tuần",
    basedOn: "Session performance data + AI analysis",
    confidence: 0.85
  },
  {
    id: 2,
    targetType: "tutor",
    targetId: 1,
    category: "teaching_method",
    priority: "medium",
    suggestion: "Học sinh phản hồi tích cực về phương pháp demo thực hành. Hãy tăng cường interactive exercises",
    actionItems: [
      "Chuẩn bị thêm 2-3 bài tập interactive mỗi session",
      "Sử dụng whiteboard tools nhiều hơn",
      "Khuyến khích học sinh giải bài trực tiếp"
    ],
    expectedImprovement: "15% tăng student engagement",
    timeframe: "1-2 tuần",
    basedOn: "Student feedback analysis",
    confidence: 0.78
  },
  {
    id: 3,
    targetType: "system",
    targetId: null,
    category: "platform_optimization",
    priority: "high",
    suggestion: "Phân tích cho thấy 23% sessions có technical issues. Cần optimize platform performance",
    actionItems: [
      "Upgrade server infrastructure",
      "Implement better error handling",
      "Add backup communication channels"
    ],
    expectedImprovement: "80% reduction in technical issues",
    timeframe: "4-6 tuần",
    basedOn: "System logs + user feedback",
    confidence: 0.92
  }
];

// Time slot utilities
export const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30"
];

export const locations = [
  "Phòng H1-101", "Phòng H1-102", "Phòng H1-201", "Phòng H1-202",
  "Phòng H2-101", "Phòng H2-102", "Phòng H2-201", "Phòng H2-202", 
  "Thư viện Tạ Quang Bửu - Tầng 2", "Thư viện Tạ Quang Bửu - Tầng 3",
  "Thư viện Tạ Quang Bửu - Tầng 4", "Khu vực học nhóm A", "Khu vực học nhóm B"
];

// Reviews data for tutors
export const reviews = [
  {
    id: 1,
    tutorId: 3,
    studentId: 1,
    rating: 5,
    comment: "Anh Cường dạy rất chi tiết và dễ hiểu. Code example rất thực tế!",
    date: "2024-12-15",
    subjectId: 1
  },
  {
    id: 2,
    tutorId: 4,
    studentId: 2,
    rating: 5,
    comment: "Giải thích toán rất logic, giúp em hiểu bản chất vấn đề.",
    date: "2024-12-10",
    subjectId: 3
  },
  {
    id: 3,
    tutorId: 7,
    studentId: 1,
    rating: 5,
    comment: "Chị Hương rất kiên nhẫn và có phương pháp dạy hay.",
    date: "2024-12-08",
    subjectId: 6
  },
  {
    id: 4,
    tutorId: 9,
    studentId: 2,
    rating: 5,
    comment: "Anh Đức explain AI concepts rất clear, có nhiều real-world examples.",
    date: "2024-12-05",
    subjectId: 10
  }
];

// Matching algorithm helper data
export const facultySubjects = {
  "Khoa Khoa học và Kỹ thuật Máy tính": [1, 2, 10],
  "Khoa Toán - Tin học": [3, 4],
  "Khoa Cơ khí": [5, 7],
  "Khoa Xây dựng": [8],
  "Khoa Điện - Điện tử": [9],
  "Khoa Hóa học": [6]
};
