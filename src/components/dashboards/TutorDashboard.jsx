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
  LinearProgress
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
  AttachMoney,
  Star,
  CalendarToday,
  ManageAccounts,
  Chat,
  MenuBook,
  ChevronRight,
  Group,
  Analytics
} from '@mui/icons-material';

const TutorDashboard = () => {
  const { user: currentUser } = useUser();
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
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

  // Get tutor's data
  const tutorSessions = mockSessions.filter(session => session.tutorId === currentUser.id);
  const todaySessions = tutorSessions.filter(session => {
    const sessionDate = new Date(session.date);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString() && session.status === 'scheduled';
  });
  
  const completedSessions = tutorSessions.filter(session => session.status === 'completed');
  const students = mockUsers.filter(u => u.role === 'student');

  // Calculate metrics
  const totalEarnings = completedSessions.reduce((total, session) => total + (session.payment || 300000), 0);
  const totalHours = completedSessions.reduce((total, session) => total + session.duration, 0);
  const averageRating = completedSessions.length > 0 
    ? completedSessions.reduce((sum, session) => sum + (session.rating || 4.5), 0) / completedSessions.length 
    : 0;
  const activeStudents = [...new Set(completedSessions.map(session => session.studentId))].length;

  // Recent activities for tutor
  const recentActivities = [
    { id: 1, title: 'Hoàn thành buổi học Toán', time: '2 giờ trước', icon: <School /> },
    { id: 2, title: 'Học sinh mới đặt lịch', time: '4 giờ trước', icon: <CalendarToday /> },
    { id: 3, title: 'Nhận đánh giá 5 sao', time: '1 ngày trước', icon: <Star /> },
    { id: 4, title: 'Cập nhật thông tin cá nhân', time: '2 ngày trước', icon: <Person /> }
  ];

  // Stats for dashboard
  const stats = {
    totalEarnings: totalEarnings.toLocaleString('vi-VN'),
    totalHours,
    avgRating: averageRating.toFixed(1),
    activeStudents
  };

  // Mock data for charts
  const earningsData = [
    { week: 'W1', earnings: 1200000 },
    { week: 'W2', earnings: 1500000 },
    { week: 'W3', earnings: 1800000 },
    { week: 'W4', earnings: 2100000 },
    { week: 'W5', earnings: 1900000 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', sessions: 3, hours: 6 },
    { day: 'Tue', sessions: 4, hours: 8 },
    { day: 'Wed', sessions: 2, hours: 4 },
    { day: 'Thu', sessions: 5, hours: 10 },
    { day: 'Fri', sessions: 3, hours: 6 },
    { day: 'Sat', sessions: 2, hours: 4 },
    { day: 'Sun', sessions: 1, hours: 2 }
  ];

  const performanceBySubject = [
    { name: 'Toán', rating: 4.8, completion: 96, satisfaction: 94 },
    { name: 'Vật lý', rating: 4.6, completion: 92, satisfaction: 90 },
    { name: 'Hóa học', rating: 4.9, completion: 98, satisfaction: 96 },
    { name: 'Tiếng Anh', rating: 4.5, completion: 89, satisfaction: 87 }
  ];

  // Table data for today's sessions
  const todaySessionsColumns = [
    { key: 'time', header: 'Time', render: (value, row) => new Date(row.date).toLocaleTimeString() },
    { key: 'subject', header: 'Subject' },
    { key: 'studentName', header: 'Student' },
    { key: 'duration', header: 'Duration (hours)' },
    { key: 'type', header: 'Type', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'actions', header: 'Actions', render: () => (
      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
        Join Session
      </button>
    )}
  ];

  const todaySessionsData = todaySessions.map(session => ({
    ...session,
    studentName: students.find(s => s.id === session.studentId)?.name || 'Unknown',
    type: Math.random() > 0.5 ? 'online' : 'in-person'
  }));

  // Student progress data
  const studentProgressColumns = [
    { key: 'studentName', header: 'Student' },
    { key: 'subject', header: 'Subject' },
    { key: 'sessionsCompleted', header: 'Sessions' },
    { key: 'progress', header: 'Progress', render: (value) => (
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">{value}%</span>
      </div>
    )},
    { key: 'lastSession', header: 'Last Session', render: (value) => new Date(value).toLocaleDateString() }
  ];

  const studentProgressData = [
    { studentName: 'Nguyễn Văn A', subject: 'Toán', sessionsCompleted: 8, progress: 75, lastSession: '2024-01-20' },
    { studentName: 'Trần Thị B', subject: 'Vật lý', sessionsCompleted: 6, progress: 60, lastSession: '2024-01-19' },
    { studentName: 'Lê Văn C', subject: 'Hóa học', sessionsCompleted: 10, progress: 85, lastSession: '2024-01-21' },
    { studentName: 'Phạm Thị D', subject: 'Tiếng Anh', sessionsCompleted: 4, progress: 40, lastSession: '2024-01-18' }
  ];

  const earningsMetrics = [
    { label: 'This Month', value: `${(totalEarnings/1000000).toFixed(1)}M VND`, change: 25 },
    { label: 'Average/Session', value: `${(totalEarnings/completedSessions.length/1000).toFixed(0)}K VND`, change: 5 },
    { label: 'Hours This Week', value: '32h', change: 12 },
    { label: 'Student Rating', value: averageRating.toFixed(1), change: 3 }
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
                {currentUser?.name?.charAt(0) || 'T'}
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
                  Chào mừng, Thầy {currentUser?.name || 'Giảng viên'}! 👨‍🏫
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Hôm nay bạn có {todaySessions.length} buổi học được lên lịch
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dashboard Giảng viên - {new Date().toLocaleDateString('vi-VN', { 
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
              { label: 'Tổng thu nhập', value: `${stats.totalEarnings} VND`, icon: <AttachMoney />, color: '#059669' },
              { label: 'Tổng giờ dạy', value: `${stats.totalHours}h`, icon: <Schedule />, color: '#7c3aed' },
              { label: 'Đánh giá TB', value: `${stats.avgRating}⭐`, icon: <Star />, color: '#d97706' },
              { label: 'Học sinh hoạt động', value: stats.activeStudents, icon: <Group />, color: '#1e40af' }
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

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Today's Sessions */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={1000}>
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
                      Buổi học hôm nay
                    </Typography>
                    <Button
                      component={Link}
                      to="/sessions"
                      size="small"
                      endIcon={<ChevronRight />}
                      sx={{ color: '#1e40af' }}
                    >
                      Xem tất cả
                    </Button>
                  </Box>

                  {todaySessions.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {todaySessions.map((session, index) => {
                        const student = students.find(s => s.id === session.studentId);
                        return (
                          <ListItem
                            key={session.id}
                            sx={{
                              p: 2,
                              mb: 2,
                              borderRadius: 2,
                              backgroundColor: 'rgba(30, 64, 175, 0.02)',
                              border: '1px solid rgba(30, 64, 175, 0.1)',
                              '&:hover': {
                                backgroundColor: 'rgba(30, 64, 175, 0.04)',
                              }
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ backgroundColor: '#1e40af' }}>
                                <School />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {session.subject}
                                </Typography>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    👨‍🎓 Học sinh: {student?.name || 'Không xác định'}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    🕐 Thời gian: {new Date(session.date).toLocaleTimeString('vi-VN')}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    ⏱️ Thời lượng: {session.duration} giờ
                                  </Typography>
                                </Box>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Button
                                variant="contained"
                                size="small"
                                sx={{ 
                                  backgroundColor: '#1e40af',
                                  '&:hover': { backgroundColor: '#1e3a8a' }
                                }}
                              >
                                Tham gia
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <CalendarToday sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Bạn không có buổi học nào hôm nay
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Hãy thư giãn và chuẩn bị cho những buổi học sắp tới!
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} lg={4}>
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

        {/* Performance Analytics */}
        <Fade in={true} timeout={1400}>
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
                Phân tích hiệu suất
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { subject: 'Toán học', students: 15, avgRating: 4.8, completion: 96 },
                  { subject: 'Vật lý', students: 12, avgRating: 4.6, completion: 92 },
                  { subject: 'Hóa học', students: 8, avgRating: 4.9, completion: 98 },
                  { subject: 'Tiếng Anh', students: 10, avgRating: 4.5, completion: 89 }
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
                          Học sinh: {subject.students}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Đánh giá: {subject.avgRating}⭐
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
                Hành động nhanh
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { icon: <CalendarToday />, label: 'Lên lịch nghỉ', to: '/schedule' },
                  { icon: <Chat />, label: 'Nhắn tin học sinh', to: '/messages' },
                  { icon: <Assignment />, label: 'Thêm tài liệu', to: '/resources' },
                  { icon: <ManageAccounts />, label: 'Cập nhật hồ sơ', to: '/profile' }
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

export default TutorDashboard;
