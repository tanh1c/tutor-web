import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Avatar,
  Divider,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as ClockIcon,
  Groups as UsersIcon,
  MenuBook as BookOpenIcon,
  Target as TargetIcon,
  Work as BriefcaseIcon,
  TrendingUp,
  Search as SearchIcon,
  PlayArrow as PlayIcon,
  Description as FileTextIcon,
  BarChart as BarChart3Icon,
  ChevronRight,
  Warning as AlertCircleIcon,
  CheckCircle,
  PlayArrow,
  History as HistoryIcon,
  ViewList,
  ViewModule,
  TuneSharp as FilterIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';
import { sessions, sessionTypes, sessionStatuses, progressData } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import SessionCard from '../scheduling/SessionCard';

const SessionDashboard = ({ onSelectSession }) => {
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'active', 'history'
  const theme = useTheme();

  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';
  const accentColor = '#1e293b';

  // Filter sessions based on user role and filters
  const filteredSessions = sessions.filter(session => {
    // Role-based filtering
    let roleMatch = true;
    if (user?.role === 'student') {
      roleMatch = session.studentEmail === user.email;
    } else if (user?.role === 'tutor') {
      roleMatch = session.tutorId === user.id;
    }

    // Status filtering
    let statusMatch = true;
    if (activeFilter !== 'all') {
      statusMatch = session.status === activeFilter;
    }

    // Type filtering
    let typeMatch = true;
    if (selectedType !== 'all') {
      typeMatch = session.sessionType === selectedType;
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

    return roleMatch && statusMatch && typeMatch && searchMatch;
  });

  // Get session statistics
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
      totalHours: userSessions.reduce((total, s) => total + (s.duration || 60), 0) / 60
    };
  };

  const stats = getSessionStats();

  // Get upcoming sessions (next 7 days)
  const getUpcomingSessions = () => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    return filteredSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= now && sessionDate <= nextWeek && session.status === 'confirmed';
    }).slice(0, 3);
  };

  // Get active sessions
  const getActiveSessions = () => {
    return filteredSessions.filter(session => session.status === 'in-progress');
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'academic': BookOpenIcon,
      'skills': TargetIcon,
      'career': BriefcaseIcon,
      'group': UsersIcon
    };
    return iconMap[type] || BookOpenIcon;
  };

  const getStatusColor = (status) => {
    const statusInfo = sessionStatuses.find(s => s.id === status);
    return statusInfo ? statusInfo.color : 'gray';
  };

  const handleSessionAction = (action, session) => {
    if (action === 'view' || action === 'details') {
      onSelectSession?.(session.id);
      return;
    }
    
    console.log(`${action} session:`, session);
    // Handle other session actions (start, join, end, etc.)
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={1}>
            {user?.role === 'tutor' ? '📚 Quản lý Sessions' : '🎯 Dashboard Sessions'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tổng quan và quản lý tất cả sessions học tập
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          sx={{
            '& .MuiToggleButton-root': {
              border: 1,
              borderColor: primaryColor,
              color: primaryColor,
              '&.Mui-selected': {
                backgroundColor: primaryColor,
                color: 'white',
                '&:hover': {
                  backgroundColor: secondaryColor,
                },
              },
              '&:hover': {
                backgroundColor: alpha(primaryColor, 0.04),
              },
            },
          }}
        >
          <ToggleButton value="overview" size="small">
            Tổng quan
          </ToggleButton>
          <ToggleButton value="active" size="small">
            Đang hoạt động
          </ToggleButton>
          <ToggleButton value="history" size="small">
            Lịch sử
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Tổng Sessions
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {stats.total}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: alpha(primaryColor, 0.1),
                    color: primaryColor,
                    width: 56,
                    height: 56,
                  }}
                >
                  <CalendarIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Hoàn thành
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {stats.completed}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main,
                    width: 56,
                    height: 56,
                  }}
                >
                  <CheckCircle />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Sắp diễn ra
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {stats.upcoming}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    width: 56,
                    height: 56,
                  }}
                >
                  <ClockIcon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={1}>
                    Tổng giờ học
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" color="text.primary">
                    {stats.totalHours.toFixed(1)}
                  </Typography>
                </Box>
                <Avatar
                  sx={{
                    backgroundColor: alpha(theme.palette.info.main, 0.1),
                    color: theme.palette.info.main,
                    width: 56,
                    height: 56,
                  }}
                >
                  <BarChart3Icon />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Active Sessions Alert */}
      {getActiveSessions().length > 0 && (
        <Alert
          severity="success"
          icon={<PlayIcon />}
          action={
            <Button
              size="small"
              onClick={() => setViewMode('active')}
              sx={{ color: 'inherit' }}
              endIcon={<ChevronRight />}
            >
              Xem chi tiết
            </Button>
          }
          sx={{
            mb: 3,
            '& .MuiAlert-message': {
              width: '100%',
            },
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            Sessions đang diễn ra ({getActiveSessions().length})
          </Typography>
          <Typography variant="body2">
            Có {getActiveSessions().length} session đang được tiến hành
          </Typography>
        </Alert>
      )}

      {/* Filters and Search */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Search */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Tìm session theo môn học, người dạy..."
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

          {/* Status Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={activeFilter}
                label="Trạng thái"
                onChange={(e) => setActiveFilter(e.target.value)}
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
                {sessionStatuses.map(status => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Type Filter */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Loại session</InputLabel>
              <Select
                value={selectedType}
                label="Loại session"
                onChange={(e) => setSelectedType(e.target.value)}
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
                <MenuItem value="all">Tất cả loại</MenuItem>
                {sessionTypes.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Content */}
      {viewMode === 'overview' && (
        <Grid container spacing={4}>
          {/* Upcoming Sessions */}
          <Grid item xs={12} lg={8}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="bold" color={primaryColor} display="flex" alignItems="center" gap={1}>
                  <CalendarIcon />
                  Sessions sắp tới
                </Typography>
              </Box>
              <CardContent sx={{ p: 3 }}>
                {getUpcomingSessions().length > 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {getUpcomingSessions().map(session => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        viewMode={user?.role || 'student'}
                        onAction={handleSessionAction}
                        compact={true}
                      />
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <CalendarIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Không có session nào sắp tới
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions & Session Types */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Session Types Overview */}
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight="bold" color={primaryColor}>
                    Loại Sessions
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {sessionTypes.map(type => {
                      const Icon = getTypeIcon(type.id);
                      const typeCount = filteredSessions.filter(s => s.sessionType === type.id).length;
                      
                      return (
                        <Paper
                          key={type.id}
                          sx={{
                            p: 2,
                            backgroundColor: alpha(theme.palette.grey[50], 0.5),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: alpha(primaryColor, 0.05),
                            },
                          }}
                        >
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                              sx={{
                                backgroundColor: alpha(theme.palette.info.main, 0.1),
                                color: theme.palette.info.main,
                                width: 40,
                                height: 40,
                              }}
                            >
                              <Icon sx={{ fontSize: 20 }} />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {type.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {typeCount} sessions
                              </Typography>
                            </Box>
                          </Box>
                          <ChevronRight sx={{ color: 'text.secondary' }} />
                        </Paper>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight="bold" color={primaryColor}>
                    Thống kê nhanh
                  </Typography>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Tỷ lệ hoàn thành
                      </Typography>
                      <Chip
                        label={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                          color: theme.palette.success.dark,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Giờ học trung bình/tuần
                      </Typography>
                      <Chip
                        label={`${(stats.totalHours / 4).toFixed(1)}h`}
                        size="small"
                        sx={{
                          backgroundColor: alpha(primaryColor, 0.1),
                          color: primaryColor,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Session gần nhất
                      </Typography>
                      <Chip
                        label={getUpcomingSessions().length > 0 ? 'Hôm nay' : 'Chưa có'}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.dark,
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Active Sessions View */}
      {viewMode === 'active' && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold" color={primaryColor} display="flex" alignItems="center" gap={1}>
              <PlayArrow />
              Sessions đang hoạt động
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            {getActiveSessions().length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {getActiveSessions().map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    viewMode={user?.role || 'student'}
                    onAction={handleSessionAction}
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <PlayArrow sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
                  Không có session nào đang hoạt động
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Các session đang hoạt động sẽ hiển thị ở đây
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* History View */}
      {viewMode === 'history' && (
        <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight="bold" color={primaryColor} display="flex" alignItems="center" gap={1}>
              <HistoryIcon />
              Lịch sử Sessions
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            {filteredSessions.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredSessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    viewMode={user?.role || 'student'}
                    onAction={handleSessionAction}
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <HistoryIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" fontWeight="medium" color="text.primary" sx={{ mb: 1 }}>
                  Không tìm thấy session nào
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default SessionDashboard;
