import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
  Stack,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  Videocam as VideoIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Event as EventIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VideoCall as VideoCallIcon,
  Message as MessageIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
  Star as StarIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { UserContext } from '../context/UserContext';
import { getCurrentUser } from '../utils/helpers';

const SchedulePage = () => {
  const { user: currentUser } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [viewMode, setViewMode] = useState(0); // 0: Table View, 1: Calendar View

  // Create schedule grid data
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00'
  ];
  
  const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  // Generate current week dates
  const getCurrentWeek = () => {
    const today = new Date();
    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    return Array.from({length: 7}, (_, i) => {
      const date = new Date(firstDay);
      date.setDate(firstDay.getDate() + i);
      return date;
    });
  };

  const currentWeek = getCurrentWeek();

  // Mock data for student sessions
  const mockStudentSessions = [
    {
      id: 1,
      tutorName: 'Lê Thị Hương',
      tutorAvatar: '/api/placeholder/50/50',
      subject: 'Hóa đại cương',
      date: new Date(2025, 8, 15), // Monday
      time: '14:00 - 15:30',
      timeSlot: '14:00',
      dayOfWeek: 1, // Monday = 1
      type: 'online',
      status: 'confirmed',
      price: 180000,
      location: 'Google Meet',
      notes: 'Ôn tập chương phản ứng hóa học'
    },
    {
      id: 2,
      tutorName: 'Nguyễn Văn Đức',
      tutorAvatar: '/api/placeholder/50/50',
      subject: 'Machine Learning',
      date: new Date(2025, 8, 16), // Tuesday
      time: '16:00 - 17:30',
      timeSlot: '16:00',
      dayOfWeek: 2, // Tuesday = 2
      type: 'offline',
      status: 'pending',
      price: 175000,
      location: 'Thư viện Tạ Quang Bửu',
      notes: 'Học thuật toán Decision Tree'
    },
    {
      id: 3,
      tutorName: 'Demo Gia Sư',
      tutorAvatar: '/api/placeholder/50/50',
      subject: 'Lập trình Web',
      date: new Date(2025, 8, 18), // Thursday
      time: '10:00 - 11:30',
      timeSlot: '10:00',
      dayOfWeek: 4, // Thursday = 4
      type: 'online',
      status: 'completed',
      price: 200000,
      location: 'Zoom Meeting',
      notes: 'Học ReactJS hooks'
    },
    {
      id: 4,
      tutorName: 'Trần Thị Mai',
      tutorAvatar: '/api/placeholder/50/50',
      subject: 'Toán cao cấp',
      date: new Date(2025, 8, 19), // Friday
      time: '09:00 - 10:30',
      timeSlot: '09:00',
      dayOfWeek: 5, // Friday = 5
      type: 'offline',
      status: 'confirmed',
      price: 160000,
      location: 'Phòng học B1-101',
      notes: 'Giới hạn và đạo hàm'
    }
  ];

  // Mock data for tutor sessions (teaching schedule)
  const mockTutorSessions = [
    {
      id: 1,
      studentName: 'Nguyễn Văn An',
      studentAvatar: '/api/placeholder/50/50',
      subject: 'React.js',
      date: new Date(2025, 8, 15), // Monday
      time: '14:00 - 15:30',
      timeSlot: '14:00',
      dayOfWeek: 1, // Monday = 1
      type: 'online',
      status: 'confirmed',
      price: 200000,
      location: 'Google Meet',
      notes: 'Dạy về React hooks và state management'
    },
    {
      id: 2,
      studentName: 'Trần Thị Lan',
      studentAvatar: '/api/placeholder/50/50',
      subject: 'JavaScript ES6+',
      date: new Date(2025, 8, 16), // Tuesday
      time: '16:00 - 17:30',
      timeSlot: '16:00',
      dayOfWeek: 2, // Tuesday = 2
      type: 'offline',
      status: 'pending',
      price: 180000,
      location: 'Phòng B1-205',
      notes: 'Async/await và Promise'
    },
    {
      id: 3,
      studentName: 'Lê Hoàng Nam',
      studentAvatar: '/api/placeholder/50/50',
      subject: 'Node.js',
      date: new Date(2025, 8, 18), // Thursday
      time: '10:00 - 11:30',
      timeSlot: '10:00',
      dayOfWeek: 4, // Thursday = 4
      type: 'online',
      status: 'completed',
      price: 220000,
      location: 'Zoom Meeting',
      notes: 'Express.js và RESTful API'
    },
    {
      id: 4,
      studentName: 'Phạm Thị Thu',
      studentAvatar: '/api/placeholder/50/50',
      subject: 'Database Design',
      date: new Date(2025, 8, 19), // Friday
      time: '09:00 - 10:30',
      timeSlot: '09:00',
      dayOfWeek: 5, // Friday = 5
      type: 'offline',
      status: 'confirmed',
      price: 190000,
      location: 'Phòng thực hành máy tính',
      notes: 'Thiết kế cơ sở dữ liệu quan hệ'
    }
  ];

  // Select sessions based on user role
  const mockSessions = currentUser?.role === 'tutor' ? mockTutorSessions : mockStudentSessions;

  // Helper function to get session for specific time and day
  const getSessionForSlot = (timeSlot, dayIndex) => {
    return mockSessions.find(session => 
      session.timeSlot === timeSlot && session.dayOfWeek === dayIndex + 1
    );
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setSessions(mockSessions);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'completed': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Đã xác nhận';
      case 'pending': return 'Chờ xác nhận';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircleIcon />;
      case 'pending': return <PendingIcon />;
      case 'completed': return <StarIcon />;
      case 'cancelled': return <CancelIcon />;
      default: return <ScheduleIcon />;
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Fade in={true} timeout={800}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                mb: 4,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  p: 4,
                  color: 'white'
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarIcon sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h4" fontWeight={700} gutterBottom>
                        {currentUser?.role === 'tutor' ? 'Lịch dạy của bạn' : 'Lịch học của bạn'}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {currentUser?.role === 'tutor' 
                          ? 'Quản lý và theo dõi các buổi dạy với học viên' 
                          : 'Quản lý và theo dõi các buổi học với gia sư'
                        }
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      borderRadius: 3,
                      px: 3,
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {currentUser?.role === 'tutor' ? 'Thêm lịch dạy' : 'Đặt lịch mới'}
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Fade>

          <Grid container spacing={4}>
            {/* Quick Stats */}
            <Grid item xs={12}>
              <Zoom in={true} timeout={1000}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(76, 175, 80, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(76, 175, 80, 0.2)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50', mb: 2 }} />
                        <Typography variant="h4" fontWeight={700} color="#4caf50" gutterBottom>
                          {sessions.filter(s => s.status === 'confirmed').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Buổi học đã xác nhận
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 152, 0, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(255, 152, 0, 0.2)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <PendingIcon sx={{ fontSize: 48, color: '#ff9800', mb: 2 }} />
                        <Typography variant="h4" fontWeight={700} color="#ff9800" gutterBottom>
                          {sessions.filter(s => s.status === 'pending').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Chờ xác nhận
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(33, 150, 243, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(33, 150, 243, 0.2)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <StarIcon sx={{ fontSize: 48, color: '#2196f3', mb: 2 }} />
                        <Typography variant="h4" fontWeight={700} color="#2196f3" gutterBottom>
                          {sessions.filter(s => s.status === 'completed').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Đã hoàn thành
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(30, 64, 175, 0.2)'
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center', p: 3 }}>
                        <CalendarIcon sx={{ fontSize: 48, color: '#1e40af', mb: 2 }} />
                        <Typography variant="h4" fontWeight={700} color="#1e40af" gutterBottom>
                          {sessions.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Tổng buổi học
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Zoom>
            </Grid>

            {/* Schedule Table */}
            <Grid item xs={12}>
              <Fade in={true} timeout={1200}>
                <Card
                  elevation={12}
                  sx={{
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    sx={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                      p: 3,
                      color: 'white'
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="h5" fontWeight={700}>
                        Thời khóa biểu tuần này
                      </Typography>
                      <Tabs 
                        value={viewMode} 
                        onChange={(e, newValue) => setViewMode(newValue)}
                        sx={{
                          '& .MuiTab-root': { 
                            color: 'rgba(255,255,255,0.7)',
                            minHeight: 40,
                            fontWeight: 600
                          },
                          '& .Mui-selected': { color: 'white' },
                          '& .MuiTabs-indicator': { backgroundColor: 'white' }
                        }}
                      >
                        <Tab label="Bảng thời khóa" />
                        <Tab label="Danh sách" />
                      </Tabs>
                    </Stack>
                  </Box>
                  
                  <CardContent sx={{ p: 0 }}>
                    {viewMode === 0 ? (
                      // Schedule Table View
                      <TableContainer sx={{ maxHeight: 600 }}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell 
                                sx={{ 
                                  backgroundColor: '#f8fafc', 
                                  fontWeight: 700,
                                  borderRight: '1px solid #e2e8f0',
                                  minWidth: 80
                                }}
                              >
                                Giờ
                              </TableCell>
                              {weekDays.map((day, index) => (
                                <TableCell 
                                  key={day} 
                                  align="center"
                                  sx={{ 
                                    backgroundColor: '#f8fafc', 
                                    fontWeight: 700,
                                    borderRight: index < 6 ? '1px solid #e2e8f0' : 'none',
                                    minWidth: 140
                                  }}
                                >
                                  <Stack alignItems="center">
                                    <Typography variant="body2" fontWeight={700}>
                                      {day}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {currentWeek[index]?.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })}
                                    </Typography>
                                  </Stack>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {timeSlots.map((timeSlot) => (
                              <TableRow key={timeSlot} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#fafafa' } }}>
                                <TableCell 
                                  sx={{ 
                                    fontWeight: 600,
                                    backgroundColor: '#f8fafc',
                                    borderRight: '1px solid #e2e8f0'
                                  }}
                                >
                                  {timeSlot}
                                </TableCell>
                                {weekDays.map((day, dayIndex) => {
                                  const session = getSessionForSlot(timeSlot, dayIndex);
                                  return (
                                    <TableCell 
                                      key={`${timeSlot}-${dayIndex}`}
                                      sx={{ 
                                        borderRight: dayIndex < 6 ? '1px solid #e2e8f0' : 'none',
                                        p: 1,
                                        height: 80
                                      }}
                                    >
                                      {session ? (
                                        <Card
                                          elevation={2}
                                          sx={{
                                            height: '100%',
                                            background: session.status === 'confirmed' 
                                              ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
                                              : session.status === 'pending'
                                              ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                                              : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                                            border: `2px solid ${getStatusColor(session.status)}`,
                                            borderRadius: 2,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                              transform: 'scale(1.02)',
                                              boxShadow: `0 4px 12px ${getStatusColor(session.status)}40`
                                            }
                                          }}
                                          onClick={() => setSelectedSession(session)}
                                        >
                                          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                                            <Typography 
                                              variant="caption" 
                                              fontWeight={700}
                                              sx={{ 
                                                display: 'block',
                                                color: getStatusColor(session.status),
                                                lineHeight: 1.2
                                              }}
                                            >
                                              {session.subject}
                                            </Typography>
                                            <Typography 
                                              variant="caption" 
                                              sx={{ 
                                                display: 'block',
                                                color: '#374151',
                                                fontSize: '0.65rem',
                                                mt: 0.5
                                              }}
                                            >
                                              {currentUser?.role === 'tutor' ? session.studentName : session.tutorName}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                              {session.type === 'online' ? (
                                                <VideoIcon sx={{ fontSize: 10, color: getStatusColor(session.status) }} />
                                              ) : (
                                                <LocationIcon sx={{ fontSize: 10, color: getStatusColor(session.status) }} />
                                              )}
                                              <Typography 
                                                variant="caption" 
                                                sx={{ fontSize: '0.6rem', color: '#6b7280' }}
                                              >
                                                {session.time.split(' - ')[1]}
                                              </Typography>
                                            </Box>
                                          </CardContent>
                                        </Card>
                                      ) : null}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    ) : (
                      // List View (existing sessions list)
                      loading ? (
                        <Stack spacing={2} sx={{ p: 3 }}>
                          {[1, 2, 3].map((i) => (
                            <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
                          ))}
                        </Stack>
                      ) : sessions.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                          <CalendarIcon sx={{ fontSize: 80, color: '#d1d5db', mb: 3 }} />
                          <Typography variant="h6" fontWeight={600} color="#374151" gutterBottom>
                            {currentUser?.role === 'tutor' ? 'Chưa có buổi dạy nào' : 'Chưa có buổi học nào'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" mb={3}>
                            {currentUser?.role === 'tutor' 
                              ? 'Hãy tạo lịch dạy để bắt đầu giảng dạy cho học viên'
                              : 'Hãy đặt lịch học với gia sư để bắt đầu hành trình học tập của bạn'
                            }
                          </Typography>
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialog(true)}
                            sx={{
                              backgroundColor: '#1e40af',
                              '&:hover': { backgroundColor: '#1e3a8a' },
                              borderRadius: 3,
                              px: 4,
                              py: 1.5
                            }}
                          >
                            {currentUser?.role === 'tutor' ? 'Tạo lịch dạy' : 'Đặt lịch ngay'}
                          </Button>
                        </Box>
                      ) : (
                        <List sx={{ p: 2 }}>
                          {mockSessions.map((session, index) => (
                            <Fade key={session.id} in={true} timeout={800 + index * 100}>
                              <Card
                                elevation={4}
                                sx={{
                                  mb: 2,
                                  borderRadius: 3,
                                  border: `2px solid ${getStatusColor(session.status)}20`,
                                  transition: 'all 0.3s ease-in-out',
                                  '&:hover': {
                                    transform: 'translateX(8px)',
                                    boxShadow: `0 8px 32px ${getStatusColor(session.status)}30`
                                  }
                                }}
                              >
                                <CardContent sx={{ p: 3 }}>
                                  <Grid container spacing={3} alignItems="center">
                                    <Grid item xs={12} sm={6} md={3}>
                                      <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                          src={currentUser?.role === 'tutor' ? session.studentAvatar : session.tutorAvatar}
                                          alt={currentUser?.role === 'tutor' ? session.studentName : session.tutorName}
                                          sx={{
                                            width: 60,
                                            height: 60,
                                            border: `3px solid ${getStatusColor(session.status)}`
                                          }}
                                        />
                                        <Box>
                                          <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom>
                                            {currentUser?.role === 'tutor' ? session.studentName : session.tutorName}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                            {session.subject}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3}>
                                      <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <CalendarIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                                          <Typography variant="body2" fontWeight={600}>
                                            {formatDate(session.date)}
                                          </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          <TimeIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                                          <Typography variant="body2">
                                            {session.time}
                                          </Typography>
                                        </Box>
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2}>
                                      <Stack spacing={1} alignItems="center">
                                        <Chip
                                          icon={getStatusIcon(session.status)}
                                          label={getStatusText(session.status)}
                                          sx={{
                                            backgroundColor: getStatusColor(session.status),
                                            color: 'white',
                                            fontWeight: 600,
                                            fontSize: '0.75rem'
                                          }}
                                        />
                                        <Typography variant="h6" fontWeight={700} color="#1e40af">
                                          {formatPrice(session.price)}
                                        </Typography>
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2}>
                                      <Stack spacing={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                          {session.type === 'online' ? (
                                            <VideoIcon sx={{ fontSize: 16, color: '#4caf50' }} />
                                          ) : (
                                            <LocationIcon sx={{ fontSize: 16, color: '#ff9800' }} />
                                          )}
                                          <Typography variant="caption" fontWeight={600}>
                                            {session.type === 'online' ? 'Online' : 'Offline'}
                                          </Typography>
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                          {session.location}
                                        </Typography>
                                      </Stack>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={2}>
                                      <Stack direction="row" spacing={1}>
                                        <Tooltip title="Chỉnh sửa">
                                          <IconButton
                                            size="small"
                                            sx={{
                                              backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                              color: '#1e40af',
                                              '&:hover': {
                                                backgroundColor: 'rgba(30, 64, 175, 0.2)',
                                                transform: 'scale(1.1)'
                                              }
                                            }}
                                          >
                                            <EditIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                        {session.type === 'online' && session.status === 'confirmed' && (
                                          <Tooltip title="Tham gia">
                                            <IconButton
                                              size="small"
                                              sx={{
                                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                                color: '#4caf50',
                                                '&:hover': {
                                                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                                  transform: 'scale(1.1)'
                                                }
                                              }}
                                            >
                                              <VideoCallIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        )}
                                        <Tooltip title="Nhắn tin">
                                          <IconButton
                                            size="small"
                                            sx={{
                                              backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                              color: '#2196f3',
                                              '&:hover': {
                                                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                                                transform: 'scale(1.1)'
                                              }
                                            }}
                                          >
                                            <MessageIcon fontSize="small" />
                                          </IconButton>
                                        </Tooltip>
                                      </Stack>
                                    </Grid>
                                  </Grid>
                                  {session.notes && (
                                    <>
                                      <Divider sx={{ my: 2 }} />
                                      <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                        <strong>Ghi chú:</strong> {session.notes}
                                      </Typography>
                                    </>
                                  )}
                                </CardContent>
                              </Card>
                            </Fade>
                          ))}
                        </List>
                      )
                    )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default SchedulePage;