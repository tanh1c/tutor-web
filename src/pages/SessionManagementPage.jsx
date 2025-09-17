import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
  Divider,
  Button,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Badge,
  Fab,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  VideoCall as VideoCallIcon,
  Message as MessageIcon,
  Assignment as AssignmentIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { useUser } from '../context/UserContext';
import { sessions, sessionStatuses, subjects } from '../data/mockData';

const SessionManagementPage = () => {
  const { user } = useUser();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSessionDialogOpen, setNewSessionDialogOpen] = useState(false);

  // Primary colors matching login page theme
  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';
  const accentColor = '#1e293b';
  const red1 = '#cb1c1c';
  const red2 = '#c01414ff';

  // Filter sessions based on user role and current filters
  const filteredSessions = sessions.filter(session => {
    // Role-based filtering
    let roleMatch = true;
    if (user?.role === 'student') {
      roleMatch = session.studentEmail === user.email;
    } else if (user?.role === 'tutor') {
      roleMatch = session.tutorId === user.id;
    }

    // Search filtering
    let searchMatch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      searchMatch = 
        session.subject.toLowerCase().includes(searchLower) ||
        session.tutorName?.toLowerCase().includes(searchLower) ||
        session.studentName?.toLowerCase().includes(searchLower);
    }

    // Status filtering
    let statusMatch = true;
    if (selectedStatus !== 'all') {
      statusMatch = session.status === selectedStatus;
    }

    // Tab filtering
    if (currentTab === 1) { // Active sessions
      statusMatch = session.status === 'in-progress' || session.status === 'confirmed';
    } else if (currentTab === 2) { // History
      statusMatch = session.status === 'completed' || session.status === 'cancelled';
    }

    return roleMatch && searchMatch && statusMatch;
  });

  // Get statistics
  const getSessionStats = () => {
    const userSessions = sessions.filter(session => {
      if (user?.role === 'student') {
        return session.studentEmail === user.email;
      } else if (user?.role === 'tutor') {
        return session.tutorId === user.id;
      }
      return true;
    });

    return {
      total: userSessions.length,
      completed: userSessions.filter(s => s.status === 'completed').length,
      upcoming: userSessions.filter(s => s.status === 'confirmed' && new Date(s.date) >= new Date()).length,
      inProgress: userSessions.filter(s => s.status === 'in-progress').length,
      totalHours: Math.round(userSessions.reduce((total, s) => total + (s.duration || 60), 0) / 60)
    };
  };

  const stats = getSessionStats();

  const getStatusColor = (status) => {
    const colors = {
      'pending': theme.palette.warning.main,
      'confirmed': theme.palette.info.main,
      'in-progress': theme.palette.success.main,
      'completed': theme.palette.success.dark,
      'cancelled': theme.palette.error.main,
    };
    return colors[status] || theme.palette.grey[500];
  };

  const getStatusLabel = (status) => {
    const labels = {
      'pending': 'Chờ xác nhận',
      'confirmed': 'Đã xác nhận',
      'in-progress': 'Đang diễn ra',
      'completed': 'Hoàn thành',
      'cancelled': 'Đã hủy',
    };
    return labels[status] || status;
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

  const SessionCard = ({ session }) => (
    <Card
      sx={{
        mb: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 25px ${alpha(primaryColor, 0.15)}`,
        },
        borderLeft: `4px solid ${getStatusColor(session.status)}`,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight="bold" color={primaryColor}>
                {session.subject}
              </Typography>
              <Chip
                size="small"
                label={getStatusLabel(session.status)}
                sx={{
                  backgroundColor: alpha(getStatusColor(session.status), 0.1),
                  color: getStatusColor(session.status),
                  fontWeight: 'bold',
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {user?.role === 'student' ? `Giảng viên: ${session.tutorName}` : `Học viên: ${session.studentName}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📍 {session.location || 'Online'}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => handleSessionDetails(session)}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2">{session.date}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2">{session.time}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1}>
              <SchoolIcon fontSize="small" color="action" />
              <Typography variant="body2">{session.sessionType || 'Học tập'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {session.status === 'in-progress' && (
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<VideoCallIcon />}
                  sx={{ 
                    backgroundColor: primaryColor,
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                  onClick={() => handleJoinSession(session)}
                >
                  Tham gia
                </Button>
              )}
              {session.status === 'confirmed' && (
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<MessageIcon />}
                  sx={{ 
                    borderColor: primaryColor, 
                    color: primaryColor,
                    minWidth: { xs: '100%', sm: 'auto' }
                  }}
                  onClick={() => handleMessage(session)}
                >
                  Nhắn tin
                </Button>
              )}
              {session.status === 'completed' && session.rating && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Typography variant="body2" color="warning.main">★</Typography>
                  <Typography variant="body2">{session.rating}/5</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Session action handlers
  const handleSessionDetails = (session) => {
    setSelectedSessionId(session.id);
    setDialogOpen(true);
  };

  const handleJoinSession = (session) => {
    console.log('Joining session:', session);
    // Implementation for joining session
  };

  const handleMessage = (session) => {
    console.log('Opening message for session:', session);
    // Implementation for messaging
  };

  const SessionDetailsDialog = () => {
    const session = sessions.find(s => s.id === selectedSessionId);
    if (!session) return null;

    return (
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <SchoolIcon sx={{ color: primaryColor }} />
            <Box>
              <Typography variant="h6" fontWeight="bold">
                Chi tiết Session
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {session.subject}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Session Info */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2} color={primaryColor}>
                  📋 Thông tin Session
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Môn học" 
                      secondary={session.subject}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Ngày & Giờ" 
                      secondary={`${session.date} lúc ${session.time}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Thời lượng" 
                      secondary={`${session.duration || 60} phút`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Địa điểm" 
                      secondary={session.location || 'Online'}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Trạng thái" 
                      secondary={
                        <Chip
                          size="small"
                          label={getStatusLabel(session.status)}
                          sx={{
                            backgroundColor: alpha(getStatusColor(session.status), 0.1),
                            color: getStatusColor(session.status),
                          }}
                        />
                      }
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>

            {/* Participants */}
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2} color={primaryColor}>
                  👥 Thành viên
                </Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: primaryColor }}>
                        {session.tutorName?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={session.tutorName}
                      secondary="Giảng viên"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                        {session.studentName?.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={session.studentName}
                      secondary="Học viên"
                    />
                  </ListItem>
                </List>
              </Card>
            </Grid>

            {/* Session Notes */}
            {session.notes && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2} color={primaryColor}>
                    📝 Ghi chú
                  </Typography>
                  <Typography variant="body2">{session.notes}</Typography>
                </Card>
              </Grid>
            )}

            {/* Rating & Feedback */}
            {session.status === 'completed' && session.rating && (
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2} color={primaryColor}>
                    ⭐ Đánh giá & Phản hồi
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Typography variant="h6">{session.rating}/5</Typography>
                    <Box display="flex">
                      {[...Array(5)].map((_, i) => (
                        <Typography
                          key={i}
                          sx={{ color: i < session.rating ? 'warning.main' : 'grey.300' }}
                        >
                          ★
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                  {session.feedback && (
                    <Typography variant="body2" color="text.secondary">
                      "{session.feedback}"
                    </Typography>
                  )}
                </Card>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>
            Đóng
          </Button>
          {session.status === 'in-progress' && (
            <Button 
              variant="contained" 
              startIcon={<VideoCallIcon />}
              sx={{ backgroundColor: primaryColor }}
              onClick={() => handleJoinSession(session)}
            >
              Tham gia Session
            </Button>
          )}
          {session.status === 'confirmed' && (
            <Button 
              variant="contained" 
              startIcon={<MessageIcon />}
              sx={{ backgroundColor: primaryColor }}
              onClick={() => handleMessage(session)}
            >
              Nhắn tin
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

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
            <Typography
              variant="h4"
              fontWeight="bold"
              color="white"
              mb={1}
              sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              📚 Quản lý Sessions
            </Typography>
            <Typography variant="body1" sx={{ color: alpha('#fff', 0.9) }}>
              Tổng quan và quản lý tất cả sessions học tập của bạn
            </Typography>
          </Box>

          {/* Statistics Cards */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<AssignmentIcon />}
                title="Tổng Sessions"
                value={stats.total}
                color={red1}
                subtitle="Tất cả sessions"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<CheckCircleIcon />}
                title="Hoàn thành"
                value={stats.completed}
                color={theme.palette.success.main}
                subtitle={`${Math.round((stats.completed / stats.total) * 100) || 0}% tổng số`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<ScheduleIcon />}
                title="Sắp diễn ra"
                value={stats.upcoming}
                color={theme.palette.warning.main}
                subtitle="Tuần này"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                icon={<TrendingUpIcon />}
                title="Tổng giờ học"
                value={stats.totalHours}
                color={theme.palette.info.main}
                subtitle="Giờ học tích lũy"
              />
            </Grid>
          </Grid>

          {/* Main Content */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* Search and Filter Bar */}
            <Box sx={{ p: 3, backgroundColor: alpha('#fff', 0.98) }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
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
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Trạng thái"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    SelectProps={{ native: true }}
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
                    <option value="all">Tất cả</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="in-progress">Đang diễn ra</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    sx={{
                      borderColor: primaryColor,
                      color: primaryColor,
                      '&:hover': {
                        borderColor: secondaryColor,
                        backgroundColor: alpha(primaryColor, 0.04),
                      },
                    }}
                  >
                    Làm mới
                  </Button>
                </Grid>
                <Grid item xs={12} md={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FilterIcon color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {filteredSessions.length} kết quả
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Tabs */}
            <Tabs
              value={currentTab}
              onChange={(e, newValue) => setCurrentTab(newValue)}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  '&.Mui-selected': {
                    color: primaryColor,
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: primaryColor,
                },
              }}
            >
              <Tab label="Tổng quan" />
              <Tab label="Đang hoạt động" />
              <Tab label="Lịch sử" />
            </Tabs>

            {/* Sessions List */}
            <Box sx={{ p: 3 }}>
              {filteredSessions.length > 0 ? (
                <Box>
                  {filteredSessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={8}
                >
                  <SchoolIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" mb={1}>
                    Không tìm thấy session nào
                  </Typography>
                  <Typography variant="body2" color="text.disabled">
                    Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>

        {/* Floating Action Button */}
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
          onClick={() => setNewSessionDialogOpen(true)}
        >
          <AddIcon />
        </Fab>

        {/* Session Details Dialog */}
        <SessionDetailsDialog />

        {/* New Session Dialog */}
        <Dialog 
          open={newSessionDialogOpen} 
          onClose={() => setNewSessionDialogOpen(false)}
          maxWidth="sm" 
          fullWidth
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" gap={2}>
              <AddIcon sx={{ color: primaryColor }} />
              <Typography variant="h6" fontWeight="bold">
                Đặt lịch Session mới
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <SchoolIcon sx={{ fontSize: 64, color: primaryColor, mb: 2 }} />
              <Typography variant="h6" mb={2}>Tính năng đang phát triển</Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Chức năng đặt lịch session mới sẽ được cập nhật trong phiên bản tiếp theo.
                Hiện tại bạn có thể liên hệ coordinator để đặt lịch.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNewSessionDialogOpen(false)}>
              Đóng
            </Button>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: primaryColor }}
              onClick={() => setNewSessionDialogOpen(false)}
            >
              Liên hệ Coordinator
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default SessionManagementPage;
