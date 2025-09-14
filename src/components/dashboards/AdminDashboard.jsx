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
  TableRow,
  Alert,
  AlertTitle
} from '@mui/material';

// Material-UI Icons
import {
  AdminPanelSettings,
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
  PendingActions,
  Security,
  Storage,
  Settings,
  AttachMoney
} from '@mui/icons-material';

const AdminDashboard = () => {
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

  // System-wide metrics
  const totalUsers = mockUsers.length;
  const totalTutors = mockUsers.filter(u => u.role === 'tutor').length;
  const totalStudents = mockUsers.filter(u => u.role === 'student').length;
  const totalCoordinators = mockUsers.filter(u => u.role === 'coordinator').length;
  const totalSessions = mockSessions.length;
  const completedSessions = mockSessions.filter(s => s.status === 'completed').length;
  const activeSessions = mockSessions.filter(s => s.status === 'scheduled').length;

  // Calculate platform metrics
  const systemRevenue = completedSessions * 300000; // Average session fee
  const averageRating = completedSessions > 0 
    ? mockSessions.filter(s => s.status === 'completed').reduce((sum, session) => sum + (session.rating || 4.5), 0) / completedSessions
    : 0;
  const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

  // Recent activities for admin
  const recentActivities = [
    { id: 1, title: 'Backup hệ thống hoàn tất', time: '30 phút trước', icon: <Storage /> },
    { id: 2, title: 'Cập nhật bảo mật hệ thống', time: '2 giờ trước', icon: <Security /> },
    { id: 3, title: 'Xử lý báo cáo vi phạm', time: '4 giờ trước', icon: <Warning /> },
    { id: 4, title: 'Phê duyệt 5 tài khoản mới', time: '6 giờ trước', icon: <Person /> }
  ];

  // Stats for dashboard
  const stats = {
    totalUsers,
    totalSessions,
    systemRevenue: (systemRevenue / 1000000).toFixed(1),
    completionRate: completionRate.toFixed(1)
  };

  // System status data
  const systemStatus = [
    { service: 'Database', status: 'online', uptime: '99.9%', responseTime: '45ms' },
    { service: 'API Server', status: 'online', uptime: '99.8%', responseTime: '120ms' },
    { service: 'File Storage', status: 'online', uptime: '99.7%', responseTime: '80ms' },
    { service: 'Email Service', status: 'maintenance', uptime: '98.5%', responseTime: '200ms' }
  ];

  // Mock data for charts
  const userGrowthData = [
    { month: 'Aug', students: 850, tutors: 180, total: 1030 },
    { month: 'Sep', students: 920, tutors: 195, total: 1115 },
    { month: 'Oct', students: 1050, tutors: 210, total: 1260 },
    { month: 'Nov', students: 1180, tutors: 228, total: 1408 },
    { month: 'Dec', students: 1320, tutors: 245, total: 1565 },
    { month: 'Jan', students: 1450, tutors: 262, total: 1712 }
  ];

  const sessionTrendsData = [
    { date: '2024-01-01', sessions: 180, completed: 165 },
    { date: '2024-01-08', sessions: 205, completed: 190 },
    { date: '2024-01-15', sessions: 165, completed: 152 },
    { date: '2024-01-22', sessions: 235, completed: 220 },
    { date: '2024-01-29', sessions: 220, completed: 205 }
  ];

  const satisfactionData = [
    { date: '2024-01-01', studentSatisfaction: 4.2, tutorSatisfaction: 4.3, systemSatisfaction: 4.1 },
    { date: '2024-01-08', studentSatisfaction: 4.4, tutorSatisfaction: 4.5, systemSatisfaction: 4.2 },
    { date: '2024-01-15', studentSatisfaction: 4.3, tutorSatisfaction: 4.4, systemSatisfaction: 4.3 },
    { date: '2024-01-22', studentSatisfaction: 4.6, tutorSatisfaction: 4.7, systemSatisfaction: 4.4 },
    { date: '2024-01-29', studentSatisfaction: 4.5, tutorSatisfaction: 4.6, systemSatisfaction: 4.5 }
  ];

  const platformDistribution = [
    { name: 'Computer Science', value: 35 },
    { name: 'Mathematics', value: 25 },
    { name: 'Physics', value: 20 },
    { name: 'Chemistry', value: 12 },
    { name: 'English', value: 8 }
  ];

  // System status data
  const systemServices = [
    { name: 'Authentication Service', status: 'operational' },
    { name: 'Session Management', status: 'operational' },
    { name: 'Payment Processing', status: 'degraded' },
    { name: 'Notification System', status: 'operational' },
    { name: 'File Storage', status: 'operational' },
    { name: 'Video Conferencing', status: 'operational' }
  ];

  // Department performance comparison
  const departmentPerformance = [
    ['Department', 'Users', 'Sessions', 'Rating', 'Revenue (M VND)'],
    ['Computer Science', '485', '892', '4.6', '267.6'],
    ['Mathematics', '325', '654', '4.5', '196.2'],
    ['Physics', '280', '445', '4.4', '133.5'],
    ['Chemistry', '185', '287', '4.3', '86.1'],
    ['English', '120', '198', '4.2', '59.4']
  ];

  // User management table
  const userManagementColumns = [
    { key: 'name', header: 'User Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'admin' ? 'bg-purple-100 text-purple-800' :
        value === 'coordinator' ? 'bg-blue-100 text-blue-800' :
        value === 'tutor' ? 'bg-green-100 text-green-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'department', header: 'Department' },
    { key: 'lastActive', header: 'Last Active', render: (value) => new Date(value).toLocaleDateString() },
    { key: 'status', header: 'Status', render: (value) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        value === 'active' ? 'bg-green-100 text-green-800' :
        value === 'inactive' ? 'bg-red-100 text-red-800' :
        'bg-yellow-100 text-yellow-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'actions', header: 'Actions', render: () => (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
        <button className="text-red-600 hover:text-red-800 text-sm">Suspend</button>
      </div>
    )}
  ];

  const userManagementData = mockUsers.slice(0, 10).map(user => ({
    ...user,
    lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: ['active', 'inactive', 'suspended'][Math.floor(Math.random() * 3)]
  }));

  // Platform usage metrics
  const platformMetrics = [
    { label: 'Daily Active Users', value: '1.2K', change: 8 },
    { label: 'Session Success Rate', value: '94.2%', change: 2 },
    { label: 'Avg Response Time', value: '1.8s', change: -15 },
    { label: 'Uptime', value: '99.9%', change: 0 }
  ];

  // Integration status
  const integrationData = [
    { service: 'HCMUT SSO', status: 'Connected', lastSync: '2024-01-29 14:30', health: 'good' },
    { service: 'Payment Gateway', status: 'Connected', lastSync: '2024-01-29 15:45', health: 'warning' },
    { service: 'Email Service', status: 'Connected', lastSync: '2024-01-29 16:00', health: 'good' },
    { service: 'Video Platform', status: 'Connected', lastSync: '2024-01-29 15:30', health: 'good' },
    { service: 'File Storage', status: 'Connected', lastSync: '2024-01-29 16:15', health: 'good' }
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
                {currentUser?.name?.charAt(0) || 'A'}
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
                  Xin chào, Quản trị viên {currentUser?.name || 'Admin'}! 👨‍💻
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Hệ thống HCMUT Tutor - Quản lý {stats.totalUsers} người dùng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dashboard Quản trị viên - {new Date().toLocaleDateString('vi-VN', { 
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

        {/* System Status Alert */}
        <Fade in={true} timeout={600}>
          <Card
            elevation={2}
            sx={{
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
              border: '1px solid #10b981'
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CheckCircle sx={{ color: '#10b981', fontSize: 32 }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#065f46' }}>
                    Trạng thái hệ thống
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#065f46' }}>
                    Tất cả các dịch vụ đang hoạt động bình thường. Thời gian phản hồi: 99.2%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Stats Grid */}
        <Fade in={true} timeout={800}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { label: 'Tổng người dùng', value: stats.totalUsers, icon: <Group />, color: '#1e40af' },
              { label: 'Tổng buổi học', value: stats.totalSessions, icon: <Schedule />, color: '#059669' },
              { label: 'Doanh thu hệ thống', value: `${stats.systemRevenue}M VND`, icon: <AttachMoney />, color: '#7c3aed' },
              { label: 'Tỷ lệ hoàn thành', value: `${stats.completionRate}%`, icon: <TrendingUp />, color: '#d97706' }
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
          {/* System Status */}
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
                      Trạng thái hệ thống
                    </Typography>
                    <Button
                      component={Link}
                      to="/system"
                      size="small"
                      endIcon={<ChevronRight />}
                      sx={{ color: '#1e40af' }}
                    >
                      Chi tiết
                    </Button>
                  </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Dịch vụ</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Uptime</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Thời gian phản hồi</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {systemStatus.map((service, index) => (
                          <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(30, 64, 175, 0.02)' } }}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Storage sx={{ color: '#1e40af', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {service.service}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={service.status}
                                size="small"
                                sx={{
                                  backgroundColor: service.status === 'online' ? '#dcfce7' : '#fef3c7',
                                  color: service.status === 'online' ? '#059669' : '#d97706',
                                  textTransform: 'capitalize'
                                }}
                              />
                            </TableCell>
                            <TableCell>{service.uptime}</TableCell>
                            <TableCell>{service.responseTime}</TableCell>
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
                    Hoạt động hệ thống
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
                      to="/system-logs"
                      size="small"
                      endIcon={<ChevronRight />}
                      sx={{ color: '#1e40af' }}
                    >
                      Xem tất cả log
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Platform Analytics */}
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
                Phân tích nền tảng
              </Typography>
              
              <Grid container spacing={3}>
                {[
                  { 
                    title: 'Người dùng mới', 
                    value: '+156', 
                    subtitle: 'Tháng này',
                    progress: 78,
                    color: '#1e40af'
                  },
                  { 
                    title: 'Buổi học hoàn thành', 
                    value: '2,847', 
                    subtitle: 'Tháng này',
                    progress: 92,
                    color: '#059669'
                  },
                  { 
                    title: 'Đánh giá trung bình', 
                    value: '4.7⭐', 
                    subtitle: 'Tháng này',
                    progress: 94,
                    color: '#d97706'
                  },
                  { 
                    title: 'Tỷ lệ hài lòng', 
                    value: '96%', 
                    subtitle: 'Tháng này',
                    progress: 96,
                    color: '#7c3aed'
                  }
                ].map((metric, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card 
                      sx={{ 
                        p: 3, 
                        backgroundColor: 'rgba(30, 64, 175, 0.02)',
                        border: '1px solid rgba(30, 64, 175, 0.1)'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: metric.color }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {metric.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                        {metric.subtitle}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={metric.progress} 
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(30, 64, 175, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: metric.color
                          }
                        }}
                      />
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
                  { icon: <Settings />, label: 'Cài đặt hệ thống', to: '/settings' },
                  { icon: <Analytics />, label: 'Báo cáo chi tiết', to: '/analytics' },
                  { icon: <Security />, label: 'Bảo mật', to: '/security' },
                  { icon: <Storage />, label: 'Quản lý dữ liệu', to: '/database' }
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

export default AdminDashboard;
