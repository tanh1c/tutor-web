# 🎓 HCMUT Tutor Platform

> **A comprehensive tutoring platform for Ho Chi Minh City University of Technology (HCMUT) students and tutors**

[![Deploy Status](https://img.shields.io/badge/deploy-ready-brightgreen.svg)](https://yourusername.github.io/tutor-platform)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-7.3.2-blue.svg)](https://mui.com/)
[![Vite](https://img.shields.io/badge/Vite-Latest-yellow.svg)](https://vitejs.dev/)

## 🌟 Features

### 👨‍🎓 For Students
- **🔍 Find Tutors**: Advanced search and filtering system
- **📅 Schedule Sessions**: Easy booking and calendar management  
- **🤖 AI Assistant**: Personalized learning recommendations
- **💬 Community**: Connect with peers and study groups
- **⭐ Reviews & Ratings**: Rate tutors and view feedback

### 👨‍🏫 For Tutors  
- **📚 Teaching Schedule**: Manage teaching sessions and availability
- **👥 Student Management**: Track student progress and sessions
- **💰 Earnings Dashboard**: Monitor income and payment history
- **📊 Analytics**: Performance metrics and statistics

### ✨ Advanced Features
- **🎯 Role-based Access Control**: Student, Tutor, Coordinator, Admin
- **🔔 Real-time Notifications**: Session reminders and updates
- **📱 Responsive Design**: Mobile-first approach
- **🌙 Modern UI**: Material-UI components with custom theming
- **🚀 Performance Optimized**: Code splitting and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React.js 19.1.1 + Vite
- **UI Library**: Material-UI (MUI) 7.3.2
- **Styling**: Material-UI System + Custom CSS
- **Routing**: React Router DOM 7.8.2
- **Icons**: Material-UI Icons + Lucide React
- **Charts**: Recharts 3.2.0
- **Date Handling**: Day.js 1.11.18
- **State Management**: React Context API

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Navigation header
│   │   └── Layout.jsx          # Main layout wrapper
│   └── common/
│       └── ProtectedRoute.jsx  # Route protection
├── pages/
│   ├── LoginPage.jsx           # Authentication
│   └── DashboardPage.jsx       # Main dashboard
├── data/
│   └── mockData.js             # Mock data for demo
└── utils/
    └── helpers.js              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone and navigate to project:
```bash
cd "C:\Users\LG\Desktop\Study Material\SE\Tutor"
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Demo Accounts

Use these test accounts to explore different user roles:

| Role | Email | Password |
|------|--------|----------|
| Student | student@hcmut.edu.vn | password123 |
| Tutor | tutor@hcmut.edu.vn | password123 |
| Coordinator | coordinator@hcmut.edu.vn | password123 |
| Admin | admin@hcmut.edu.vn | password123 |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 MVP Scope

This is a demo MVP focusing on:
- ✅ User authentication with role-based access
- ✅ Dashboard with role-specific views
- ✅ Basic project structure and routing
- ✅ Responsive UI with Tailwind CSS
- ✅ Mock data for demonstration

### Future Development
- Session booking system
- Tutor search and filtering
- Calendar integration
- Real-time notifications
- Database integration
- File upload for profiles
- Advanced reporting

## 🏫 HCMUT Context

Designed specifically for Ho Chi Minh City University of Technology:
- Vietnamese language interface
- HCMUT branding colors
- Faculty and course structure
- Student ID integration
- Academic calendar alignment

## 📄 License

This project is for educational purposes as part of Software Engineering coursework at HCMUT.

---

**Developed for**: Software Engineering Course - ĐH Bách Khoa TPHCM  
**Team**: [Your Team Name]  
**Semester**: [Current Semester]
