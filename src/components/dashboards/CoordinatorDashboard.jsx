import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sessions as mockSessions, users as mockUsers, tutorAnalytics as mockTutorAnalytics } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

// Material-UI Components
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fade,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';

// Material-UI Icons
import {
  School,
  Schedule,
  Person,
  TrendingUp,
  Assignment,
  Message,
  EmojiEvents,
  SupervisorAccount,
  Star,
  CalendarToday,
  ManageAccounts,
  Chat,
  MenuBook,
  ChevronRight,
  Group,
  Analytics,
  Warning,
  CheckCircle,
  PendingActions
} from '@mui/icons-material';

const CoordinatorDashboard = () => {
  const { user: currentUser } = useUser();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // If no user, return error state
  if (!currentUser) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Fade in={true}>
            <Card
              elevation={8}
              sx={{
                p: 6,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                textAlign: 'center'
              }}
            >
              <Person sx={{ fontSize: 64, color: '#dc2626', mb: 2 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#dc2626', mb: 2 }}>
                Lỗi xác thực
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Không thể tải thông tin người dùng. Vui lòng đăng nhập lại.
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#1e40af',
                  '&:hover': { backgroundColor: '#1e3a8a' }
                }}
              >
                Đăng nhập lại
              </Button>
            </Card>
          </Fade>
        </Container>
      </Box>
    );
  }

  // Get coordinator's department data (Computer Science example)
  const departmentTutors = mockUsers.filter(u => u.role === 'tutor' && u.department === 'Computer Science');
  const departmentStudents = mockUsers.filter(u => u.role === 'student' && u.department === 'Computer Science');
  const departmentSessions = mockSessions.filter(session => {
    const tutor = mockUsers.find(u => u.id === session.tutorId);
    return tutor && tutor.department === 'Computer Science';
  });

  const activeSessions = departmentSessions.filter(session => session.status === 'scheduled');
  const completedSessions = departmentSessions.filter(session => session.status === 'completed');
  const pendingRequests = departmentSessions.filter(session => session.status === 'pending');

  // Calculate metrics
  const matchingEfficiency = completedSessions.length > 0 
    ? (completedSessions.length / (completedSessions.length + pendingRequests.length)) * 100 
    : 0;
  const averageRating = completedSessions.length > 0 
    ? completedSessions.reduce((sum, session) => sum + (session.rating || 4.5), 0) / completedSessions.length 
    : 0;

  // Recent activities for coordinator
  const recentActivities = [
    { id: 1, title: 'Phê duyệt gia sư mới', time: '1 giờ trước', icon: <Person /> },
    { id: 2, title: 'Xem xét khiếu nại', time: '3 giờ trước', icon: <Warning /> },
    { id: 3, title: 'Phê duyệt buổi học', time: '5 giờ trước', icon: <CheckCircle /> },
    { id: 4, title: 'Cập nhật báo cáo tháng', time: '1 ngày trước', icon: <Analytics /> }
  ];

  // Stats for dashboard
  const stats = {
    totalTutors: departmentTutors.length,
    totalStudents: departmentStudents.length,
    activeSessions: activeSessions.length,
    matchingEfficiency: matchingEfficiency.toFixed(1)
  };

  // Tutor performance data
  const tutorPerformance = departmentTutors.slice(0, 5).map(tutor => {
    const tutorSessions = departmentSessions.filter(s => s.tutorId === tutor.id);
    const completed = tutorSessions.filter(s => s.status === 'completed');
    const avgRating = completed.length > 0 
      ? completed.reduce((sum, s) => sum + (s.rating || 4.5), 0) / completed.length 
      : 0;
    
    return {
      id: tutor.id,
      name: tutor.name,
      subject: tutor.subject || 'Toán học',
      totalSessions: tutorSessions.length,
      completedSessions: completed.length,
      rating: avgRating.toFixed(1),
      efficiency: completed.length > 0 ? ((completed.length / tutorSessions.length) * 100).toFixed(1) : 0
    };
  });

  // Mock data for charts
  const sessionTrendsData = [
    { date: '2024-01-01', sessions: 45, completed: 42 },
    { date: '2024-01-08', sessions: 52, completed: 48 },
    { date: '2024-01-15', sessions: 38, completed: 35 },
    { date: '2024-01-22', sessions: 61, completed: 58 },
    { date: '2024-01-29', sessions: 55, completed: 52 }
  ];

  const userGrowthData = [
    { month: 'Sep', students: 120, tutors: 25, total: 145 },
    { month: 'Oct', students: 135, tutors: 28, total: 163 },
    { month: 'Nov', students: 148, tutors: 32, total: 180 },
    { month: 'Dec', students: 162, tutors: 35, total: 197 },
    { month: 'Jan', students: 178, tutors: 38, total: 216 }
  ];

  const subjectDistribution = [
    { name: 'Programming', value: 35 },
    { name: 'Data Structures', value: 25 },
    { name: 'Algorithms', value: 20 },
    { name: 'Database', value: 12 },
    { name: 'Networks', value: 8 }
  ];

  const tutorPerformanceData = [
    { name: 'Excellent (4.5+)', rating: 4.8, completion: 96, satisfaction: 94, count: 12 },
    { name: 'Good (4.0-4.5)', rating: 4.2, completion: 89, satisfaction: 87, count: 18 },
    { name: 'Average (3.5-4.0)', rating: 3.7, completion: 82, satisfaction: 80, count: 6 },
    { name: 'Below Average (<3.5)', rating: 3.2, completion: 75, satisfaction: 72, count: 2 }
  ];

  // Table data for tutor management
  const tutorManagementColumns = [
    { key: 'name', header: 'Tutor Name' },
    { key: 'subjects', header: 'Subjects', render: (value) => value.join(', ') },
    { key: 'activeStudents', header: 'Active Students' },
    { key: 'rating', header: 'Rating', render: (value) => (
      <div className="flex items-center space-x-1">
        <span className={`${value >= 4.5 ? 'text-green-600' : value >= 4.0 ? 'text-blue-600' : 'text-yellow-600'}`}>
          {value}
        </span>
      </div>
    )},
    { key: 'status', header: 'Status', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' ? 'bg-green-100 text-green-800' :
        value === 'busy' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'actions', header: 'Actions', render: (value, row) => (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
        <button className="text-green-600 hover:text-green-800 text-sm">Message</button>
      </div>
    )}
  ];

  const tutorManagementData = departmentTutors.map(tutor => ({
    ...tutor,
    subjects: ['Programming', 'Data Structures'].slice(0, Math.floor(Math.random() * 2) + 1),
    activeStudents: Math.floor(Math.random() * 10) + 3,
    status: ['active', 'busy', 'inactive'][Math.floor(Math.random() * 3)]
  }));

  // Student-Tutor matching data
  const matchingColumns = [
    { key: 'studentName', header: 'Student' },
    { key: 'subject', header: 'Subject' },
    { key: 'requestDate', header: 'Request Date', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'matchedTutor', header: 'Matched Tutor' },
    { key: 'matchScore', header: 'Match Score', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value >= 90 ? 'bg-green-100 text-green-800' :
        value >= 80 ? 'bg-blue-100 text-blue-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {value}%
      </span>
    )},
    { key: 'status', header: 'Status', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'matched' ? 'bg-green-100 text-green-800' :
        value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {value}
      </span>
    )}
  ];

  const matchingData = [
    { studentName: 'Nguyễn Văn A', subject: 'Programming', requestDate: '2024-01-20', matchedTutor: 'Dr. Phạm Minh', matchScore: 95, status: 'matched' },
    { studentName: 'Trần Thị B', subject: 'Algorithms', requestDate: '2024-01-21', matchedTutor: 'Dr. Lê Hoàng', matchScore: 88, status: 'pending' },
    { studentName: 'Lê Văn C', subject: 'Database', requestDate: '2024-01-19', matchedTutor: 'Dr. Nguyễn Lan', matchScore: 92, status: 'matched' },
    { studentName: 'Phạm Thị D', subject: 'Networks', requestDate: '2024-01-22', matchedTutor: 'TBD', matchScore: 0, status: 'pending' }
  ];

  // Performance comparison data
  const performanceComparison = [
    ['Metric', 'This Month', 'Last Month', 'Change'],
    ['Total Sessions', '251', '223', '+12.6%'],
    ['Completion Rate', '94.2%', '91.8%', '+2.4%'],
    ['Average Rating', '4.6', '4.4', '+0.2'],
    ['Response Time', '2.3h', '3.1h', '-0.8h'],
    ['Student Satisfaction', '92%', '89%', '+3%']
  ];

  const departmentMetrics = [
    { label: 'Active Tutors', value: departmentTutors.length, change: 8 },
    { label: 'Enrolled Students', value: departmentStudents.length, change: 15 },
    { label: 'Completion Rate', value: '94%', change: 2 },
    { label: 'Avg Response Time', value: '2.3h', change: -12 }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative'
      }}
    >
      {/* Educational background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(30, 64, 175, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(30, 64, 175, 0.3) 0%, transparent 50%)
          `,
        }}
      />
      
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* Header */}
        <Fade in={true}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: 'white',
              border: '1px solid rgba(30, 64, 175, 0.1)'
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Avatar
                sx={{
                  width: { xs: 80, md: 100 },
                  height: { xs: 80, md: 100 },
                  backgroundColor: '#1e40af',
                  fontSize: '2rem',
                  fontWeight: 700
                }}
              >
                {currentUser?.name?.charAt(0) || 'C'}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#1e40af',
                    mb: 1,
                    fontSize: { xs: '1.75rem', md: '2.125rem' }
                  }}
                >
                  Xin chào, {currentUser?.name || 'Điều phối viên'}! 👩‍💼
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Khoa Công nghệ Thông tin - Quản lý {stats.totalTutors} giảng viên
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dashboard Điều phối viên - {new Date().toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </Box>
              
              {/* Time Range Selector */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['Tuần', 'Tháng', 'Năm'].map((range, index) => (
                  <Button
                    key={range}
                    variant={selectedTimeRange === ['week', 'month', 'year'][index] ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setSelectedTimeRange(['week', 'month', 'year'][index])}
                    sx={{
                      backgroundColor: selectedTimeRange === ['week', 'month', 'year'][index] ? '#1e40af' : 'transparent',
                      borderColor: '#1e40af',
                      color: selectedTimeRange === ['week', 'month', 'year'][index] ? 'white' : '#1e40af',
                      '&:hover': {
                        backgroundColor: selectedTimeRange === ['week', 'month', 'year'][index] ? '#1e3a8a' : 'rgba(30, 64, 175, 0.04)',
                      }
                    }}
                  >
                    {range}
                  </Button>
                ))}
              </Box>
            </Box>
          </Paper>
        </Fade>

        {/* Stats Grid */}
        <Fade in={true} timeout={800}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { label: 'Tổng Giảng viên', value: stats.totalTutors, icon: <SupervisorAccount />, color: '#1e40af' },
              { label: 'Tổng Học sinh', value: stats.totalStudents, icon: <Group />, color: '#059669' },
              { label: 'Buổi học đang diễn ra', value: stats.activeSessions, icon: <Schedule />, color: '#7c3aed' },
              { label: 'Hiệu quả ghép đôi', value: `${stats.matchingEfficiency}%`, icon: <TrendingUp />, color: '#d97706' }
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: 'white',
                    border: '1px solid rgba(30, 64, 175, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        backgroundColor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: stat.color
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, fontSize: '1.5rem' }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fade>

        {/* Pending Requests Alert */}
        {pendingRequests.length > 0 && (
          <Fade in={true} timeout={1000}>
            <Card
              elevation={2}
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                border: '1px solid #f59e0b'
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Warning sx={{ color: '#f59e0b', fontSize: 32 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#92400e' }}>
                      Yêu cầu cần xử lý
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#92400e' }}>
                      Bạn có {pendingRequests.length} yêu cầu ghép đôi đang chờ phê duyệt
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 'auto' }}>
                    <Button
                      variant="contained"
                      component={Link}
                      to="/pending-requests"
                      sx={{
                        backgroundColor: '#f59e0b',
                        '&:hover': { backgroundColor: '#d97706' }
                      }}
                    >
                      Xem chi tiết
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Tutor Performance */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={1200}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: 'white',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  height: 'fit-content'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af' }}>
                      Hiệu suất Giảng viên
                    </Typography>
                    <Button
                      component={Link}
                      to="/tutors"
                      size="small"
                      endIcon={<ChevronRight />}
                      sx={{ color: '#1e40af' }}
                    >
                      Xem tất cả
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Giảng viên</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Môn học</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Buổi học</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Đánh giá</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Hiệu quả</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tutorPerformance.map((tutor) => (
                          <TableRow key={tutor.id} sx={{ '&:hover': { backgroundColor: 'rgba(30, 64, 175, 0.02)' } }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ backgroundColor: '#1e40af', width: 32, height: 32 }}>
                                  {tutor.name.charAt(0)}
                                </Avatar>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {tutor.name}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{tutor.subject}</TableCell>
                            <TableCell>{tutor.completedSessions}/{tutor.totalSessions}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Star sx={{ fontSize: 16, color: '#f59e0b' }} />
                                <Typography variant="body2">{tutor.rating}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={`${tutor.efficiency}%`}
                                size="small"
                                sx={{
                                  backgroundColor: tutor.efficiency >= 90 ? '#dcfce7' : tutor.efficiency >= 80 ? '#fef3c7' : '#fee2e2',
                                  color: tutor.efficiency >= 90 ? '#059669' : tutor.efficiency >= 80 ? '#d97706' : '#dc2626'
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} lg={4}>
            <Fade in={true} timeout={1400}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  background: 'white',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  height: 'fit-content'
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af', mb: 3 }}>
                    Hoạt động gần đây
                  </Typography>
                  
                  <List sx={{ p: 0 }}>
                    {recentActivities.map((activity, index) => (
                      <ListItem key={activity.id} sx={{ p: 1, mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar sx={{ backgroundColor: 'rgba(30, 64, 175, 0.1)', color: '#1e40af' }}>
                            {activity.icon}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {activity.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(30, 64, 175, 0.1)' }}>
                    <Button
                      component={Link}
                      to="/activity"
                      size="small"
                      endIcon={<ChevronRight />}
                      sx={{ color: '#1e40af' }}
                    >
                      Xem tất cả hoạt động
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Subject Analytics */}
        <Fade in={true} timeout={1600}>
          <Card
            elevation={2}
            sx={{
              mt: 4,
              borderRadius: 3,
              background: 'white',
              border: '1px solid rgba(30, 64, 175, 0.1)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af', mb: 3 }}>
                Phân tích theo môn học
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { subject: 'Toán học', sessions: 45, completion: 96, rating: 4.8 },
                  { subject: 'Vật lý', sessions: 38, completion: 92, rating: 4.6 },
                  { subject: 'Hóa học', sessions: 32, completion: 98, rating: 4.9 },
                  { subject: 'Tiếng Anh', sessions: 28, completion: 89, rating: 4.5 }
                ].map((subject, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card 
                      sx={{ 
                        p: 3, 
                        backgroundColor: 'rgba(30, 64, 175, 0.02)',
                        border: '1px solid rgba(30, 64, 175, 0.1)'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1e40af' }}>
                        {subject.subject}
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary">
                          Buổi học: {subject.sessions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Đánh giá: {subject.rating}⭐
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Tỷ lệ hoàn thành: {subject.completion}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={subject.completion} 
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(30, 64, 175, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#1e40af'
                            }
                          }}
                        />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>

        {/* Quick Actions */}
        <Fade in={true} timeout={1800}>
          <Card
            elevation={2}
            sx={{
              mt: 4,
              borderRadius: 3,
              background: 'white',
              border: '1px solid rgba(30, 64, 175, 0.1)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af', mb: 3 }}>
                Hành động nhanh
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { icon: <PendingActions />, label: 'Xử lý yêu cầu', to: '/pending' },
                  { icon: <Person />, label: 'Phê duyệt giảng viên', to: '/approve-tutors' },
                  { icon: <Analytics />, label: 'Báo cáo tháng', to: '/reports' },
                  { icon: <Chat />, label: 'Liên hệ hỗ trợ', to: '/support' }
                ].map((action, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Button
                      component={Link}
                      to={action.to}
                      variant="outlined"
                      fullWidth
                      size="large"
                      startIcon={action.icon}
                      sx={{
                        py: 2,
                        borderColor: '#1e40af',
                        color: '#1e40af',
                        '&:hover': {
                          backgroundColor: 'rgba(30, 64, 175, 0.04)',
                          borderColor: '#1e3a8a',
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default CoordinatorDashboard;
