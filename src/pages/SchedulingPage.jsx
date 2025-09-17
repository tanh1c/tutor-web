import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  useTheme,
  alpha,
  Stack,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { sessions } from '../data/mockData';
import { useUser } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import WeeklyCalendar from '../components/scheduling/WeeklyCalendar';
import SessionCard from '../components/scheduling/SessionCard';

const SchedulingPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('upcoming');
  const [currentTab, setCurrentTab] = useState(0);

  // Theme colors matching login/dashboard
  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';
  const accentColor = '#1e293b';

  // Filter sessions based on user role and current filters
  const filteredSessions = sessions.filter(session => {
    // Filter by user role
    let roleFilter = true;
    if (user?.role === 'student') {
      roleFilter = session.studentEmail === user.email;
    } else if (user?.role === 'tutor') {
      roleFilter = session.tutorId === user.id;
    }

    // Filter by status
    let statusFilter = true;
    if (filterStatus !== 'all') {
      statusFilter = session.status === filterStatus;
    }

    // Filter by time period
    let periodFilter = true;
    const sessionDate = new Date(session.date);
    const now = new Date();
    
    if (selectedPeriod === 'upcoming') {
      periodFilter = sessionDate >= now;
    } else if (selectedPeriod === 'past') {
      periodFilter = sessionDate < now;
    } else if (selectedPeriod === 'today') {
      const today = new Date();
      periodFilter = sessionDate.toDateString() === today.toDateString();
    } else if (selectedPeriod === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      periodFilter = sessionDate >= now && sessionDate <= weekFromNow;
    }

    return roleFilter && statusFilter && periodFilter;
  });

  const handleSessionAction = (action, session) => {
    switch (action) {
      case 'confirm':
        console.log('Confirming session:', session);
        // Handle session confirmation
        break;
      case 'cancel':
        console.log('Cancelling session:', session);
        // Handle session cancellation
        break;
      case 'reschedule':
        console.log('Rescheduling session:', session);
        // Handle session rescheduling
        break;
      case 'review':
        console.log('Reviewing session:', session);
        // Handle session review
        break;
      case 'join':
        console.log('Joining session:', session);
        // Handle joining session
        break;
      default:
        break;
    }
  };

  const getPageTitle = () => {
    if (user?.role === 'tutor') {
      return '📚 Quản lý lịch dạy';
    } else if (user?.role === 'student') {
      return '📖 Lịch học của tôi';
    }
    return '📅 Quản lý lịch';
  };

  const getEmptyStateMessage = () => {
    if (user?.role === 'tutor') {
      return 'Chưa có lịch dạy nào. Hãy chờ học sinh đặt lịch với bạn!';
    } else if (user?.role === 'student') {
      return 'Chưa có lịch học nào. Hãy tìm và đặt lịch với gia sư phù hợp!';
    }
    return 'Chưa có lịch nào.';
  };

  const StatCard = ({ icon, title, value, color, subtitle }) => (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
        color: 'white',
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px ${alpha(color, 0.3)}`,
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" mb={0.5}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }} mb={1}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: alpha('#fff', 0.2),
              borderRadius: '50%',
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <Box
        sx={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 50%, ${accentColor} 100%)`,
          minHeight: '100vh',
          pb: 4,
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 3 }}>
          {/* Header */}
          <Box mb={4}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  mb={1}
                  sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {getPageTitle()}
                </Typography>
                <Typography variant="body1" sx={{ color: alpha('#fff', 0.9) }}>
                  {user?.role === 'tutor' 
                    ? 'Quản lý và theo dõi các buổi dạy của bạn'
                    : 'Theo dõi lịch học và quản lý các buổi học'
                  }
                </Typography>
              </Box>
              
              {user?.role === 'student' && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => window.location.href = '/tutors'}
                  sx={{
                    backgroundColor: alpha('#fff', 0.2),
                    color: 'white',
                    '&:hover': {
                      backgroundColor: alpha('#fff', 0.3),
                    },
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Đặt lịch mới
                </Button>
              )}
            </Box>
          </Box>

          {/* Statistics Cards for Tutors */}
          {user?.role === 'tutor' && filteredSessions.length > 0 && (
            <Grid container spacing={3} mb={4}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<AccessTimeIcon />}
                  title="Chờ xác nhận"
                  value={filteredSessions.filter(s => s.status === 'pending').length}
                  color={theme.palette.warning.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<CheckCircleIcon />}
                  title="Đã xác nhận"
                  value={filteredSessions.filter(s => s.status === 'confirmed').length}
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<AssignmentIcon />}
                  title="Hoàn thành"
                  value={filteredSessions.filter(s => s.status === 'completed').length}
                  color={primaryColor}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={<TrendingUpIcon />}
                  title="Tổng thu nhập"
                  value={`${filteredSessions
                    .filter(s => s.status === 'completed')
                    .reduce((total, s) => total + (s.price || 0), 0)
                    .toLocaleString('vi-VN')}₫`}
                  color={theme.palette.info.main}
                />
              </Grid>
            </Grid>
          )}

          {/* Main Content Card */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* View Mode Toggle and Filters */}
            <Box sx={{ p: 3, backgroundColor: alpha('#fff', 0.98) }}>
              <Grid container spacing={3} alignItems="center">
                {/* View Mode Toggle */}
                <Grid item xs={12} md={4}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newMode) => newMode && setViewMode(newMode)}
                    sx={{
                      '& .MuiToggleButton-root': {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                        '&.Mui-selected': {
                          backgroundColor: primaryColor,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: secondaryColor,
                          },
                        },
                      },
                    }}
                  >
                    <ToggleButton value="calendar">
                      <CalendarIcon sx={{ mr: 1 }} />
                      Lịch
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ViewListIcon sx={{ mr: 1 }} />
                      Danh sách
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                {/* Period Filter */}
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Thời gian</InputLabel>
                    <Select
                      value={selectedPeriod}
                      label="Thời gian"
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      startAdornment={<ScheduleIcon sx={{ mr: 1, color: 'action.active' }} />}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: primaryColor,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: primaryColor,
                          },
                        },
                      }}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="today">Hôm nay</MenuItem>
                      <MenuItem value="week">Tuần này</MenuItem>
                      <MenuItem value="upcoming">Sắp tới</MenuItem>
                      <MenuItem value="past">Đã qua</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Status Filter */}
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Trạng thái</InputLabel>
                    <Select
                      value={filterStatus}
                      label="Trạng thái"
                      onChange={(e) => setFilterStatus(e.target.value)}
                      startAdornment={<FilterListIcon sx={{ mr: 1, color: 'action.active' }} />}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: primaryColor,
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: primaryColor,
                          },
                        },
                      }}
                    >
                      <MenuItem value="all">Tất cả trạng thái</MenuItem>
                      <MenuItem value="pending">Chờ xác nhận</MenuItem>
                      <MenuItem value="confirmed">Đã xác nhận</MenuItem>
                      <MenuItem value="completed">Hoàn thành</MenuItem>
                      <MenuItem value="cancelled">Đã hủy</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Content Area */}
            <Box sx={{ minHeight: 400 }}>
              {viewMode === 'calendar' ? (
                <Box sx={{ p: 3 }}>
                  <WeeklyCalendar 
                    tutorId={user?.role === 'tutor' ? user.id : null}
                    viewMode={user?.role || 'student'}
                  />
                </Box>
              ) : (
                <Box>
                  {filteredSessions.length > 0 ? (
                    <Box sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        {filteredSessions.map(session => (
                          <SessionCard
                            key={session.id}
                            session={session}
                            viewMode={user?.role || 'student'}
                            onAction={handleSessionAction}
                          />
                        ))}
                      </Stack>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      py={8}
                    >
                      <CalendarIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" mb={1}>
                        Không có lịch nào
                      </Typography>
                      <Typography variant="body2" color="text.disabled" mb={3} textAlign="center">
                        {getEmptyStateMessage()}
                      </Typography>
                      {user?.role === 'student' && (
                        <Button
                          variant="contained"
                          onClick={() => window.location.href = '/tutors'}
                          sx={{
                            backgroundColor: primaryColor,
                            '&:hover': { backgroundColor: secondaryColor }
                          }}
                        >
                          Tìm gia sư ngay
                        </Button>
                      )}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Container>

        {/* Floating Action Button */}
        {user?.role === 'student' && (
          <Fab
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              backgroundColor: primaryColor,
              '&:hover': {
                backgroundColor: secondaryColor,
              },
            }}
            onClick={() => window.location.href = '/tutors'}
          >
            <AddIcon />
          </Fab>
        )}
      </Box>
    </Layout>
  );
};

export default SchedulingPage;
