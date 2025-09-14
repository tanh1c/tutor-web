import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sessions as mockSessions, users as mockUsers } from '../../data/mockData';
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
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Fade,
  useTheme,
  useMediaQuery
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
  NotificationsActive,
  Search,
  CalendarToday,
  ManageAccounts,
  Chat,
  MenuBook,
  Star,
  ChevronRight
} from '@mui/icons-material';

const StudentDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user: currentUser } = useUser();
  
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
  
  // Mock data for dashboard with proper tutor names and error handling
  const upcomingSessions = mockSessions?.length > 0 
    ? mockSessions.slice(0, 3).map(session => {
        const tutor = mockUsers.find(user => user.id === session.tutorId);
        return {
          ...session,
          tutor: tutor ? tutor.name : 'Không rõ',
          tutorName: tutor ? tutor.name : 'Không rõ',
          subject: session.title || 'Môn học',
          time: session.startTime || 'Chưa xác định',
          date: session.date || 'Chưa xác định'
        };
      })
    : [];
  
  const recentActivities = [
    { id: 1, type: 'session', title: 'Hoàn thành buổi học Toán', time: '2 giờ trước', icon: '📚' },
    { id: 2, type: 'message', title: 'Tin nhắn từ thầy Nguyễn', time: '1 ngày trước', icon: '💬' },
    { id: 3, type: 'achievement', title: 'Đạt mục tiêu tuần này', time: '2 ngày trước', icon: '🏆' },
    { id: 4, type: 'reminder', title: 'Sắp đến hạn nộp bài tập', time: '3 ngày trước', icon: '⏰' },
  ];

  const stats = {
    totalSessions: 24,
    completedSessions: 22,
    avgRating: 4.8,
    hoursLearned: 48
  };

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
                {currentUser?.name?.charAt(0) || 'S'}
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
                  Xin chào, {currentUser?.name || 'Học sinh'}! 👋
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Hôm nay là ngày tuyệt vời để học hỏi điều mới
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dashboard Học sinh - {new Date().toLocaleDateString('vi-VN', { 
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
              { label: 'Tổng buổi học', value: stats.totalSessions, icon: <MenuBook />, color: '#1e40af' },
              { label: 'Hoàn thành', value: stats.completedSessions, icon: <EmojiEvents />, color: '#059669' },
              { label: 'Đánh giá TB', value: `${stats.avgRating}⭐`, icon: <Star />, color: '#d97706' },
              { label: 'Thời gian học', value: `${stats.hoursLearned}h`, icon: <Schedule />, color: '#7c3aed' }
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
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
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
          {/* Upcoming Sessions */}
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
                      Buổi học sắp tới
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

                  {upcomingSessions.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {upcomingSessions.map((session, index) => (
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
                                  👨‍🏫 Giảng viên: {session.tutorName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  🕐 Thời gian: {session.time}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Chip 
                              label="Sắp diễn ra" 
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                color: '#1e40af',
                                fontWeight: 600
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 6 }}>
                      <CalendarToday sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Bạn chưa có buổi học nào được lên lịch
                      </Typography>
                      <Button
                        component={Link}
                        to="/tutors"
                        variant="contained"
                        sx={{
                          backgroundColor: '#1e40af',
                          '&:hover': { backgroundColor: '#1e3a8a' }
                        }}
                      >
                        Tìm gia sư
                      </Button>
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

        {/* Quick Actions */}
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
                Hành động nhanh
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { icon: <Search />, label: 'Tìm gia sư', to: '/tutors' },
                  { icon: <CalendarToday />, label: 'Đặt lịch học mới', to: '/sessions/new' },
                  { icon: <ManageAccounts />, label: 'Quản lý lịch học', to: '/sessions' },
                  { icon: <Chat />, label: 'Tin nhắn', to: '/messages' }
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

export default StudentDashboard;
