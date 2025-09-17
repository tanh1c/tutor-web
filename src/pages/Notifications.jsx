import { useState, useContext } from 'react';
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
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  useTheme,
  alpha,
  Stack,
  LinearProgress,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Analytics as AnalyticsIcon,
  NotificationImportant as ImportantIcon,
  VolumeOff as VolumeOffIcon,
  Group as GroupIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { UserContext } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import NotificationCenter from '../components/notifications/NotificationCenter';

// Mock notification analytics
const NOTIFICATION_ANALYTICS = {
  totalSent: 15847,
  delivered: 15234,
  opened: 12456,
  clicked: 8923,
  deliveryRate: 96.1,
  openRate: 81.8,
  clickRate: 71.7
};

// Mock recent activity
const RECENT_ACTIVITY = [
  {
    id: 1,
    type: 'session_reminder',
    message: 'Session reminder sent to 45 students',
    timestamp: new Date(Date.now() - 300000),
    status: 'delivered'
  },
  {
    id: 2,
    type: 'payment_alert',
    message: 'Payment due reminders sent to 12 students',
    timestamp: new Date(Date.now() - 1800000),
    status: 'delivered'
  },
  {
    id: 3,
    type: 'system_update',
    message: 'Maintenance notification sent to all users',
    timestamp: new Date(Date.now() - 3600000),
    status: 'delivered'
  }
];

const Notifications = () => {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    enableAll: true,
    doNotDisturb: false,
    smartGrouping: true,
    emailNotifications: true,
    smsAlerts: true,
    pushNotifications: true,
    sessionReminderTime: 30,
    quietHours: '22-08',
  });

  // Theme colors matching login/dashboard
  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';
  const accentColor = '#1e293b';

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return 'Vừa xong';
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings(prev => ({
      ...prev,
      [setting]: event.target.checked !== undefined ? event.target.checked : event.target.value
    }));
  };

  const StatCard = ({ icon, title, value, color, subtitle, progress }) => (
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
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={0.5}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
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
        {subtitle && (
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
            {subtitle}
          </Typography>
        )}
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: alpha('#fff', 0.2),
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#fff',
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );

  const QuickStatCard = ({ icon, title, description, color }) => (
    <Card
      sx={{
        p: 2,
        height: '100%',
        border: `2px solid ${alpha(color, 0.2)}`,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: color,
          transform: 'translateY(-2px)',
          boxShadow: `0 4px 20px ${alpha(color, 0.2)}`,
        },
      }}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Box
          sx={{
            backgroundColor: alpha(color, 0.1),
            borderRadius: '50%',
            p: 1,
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography variant="subtitle2" fontWeight="bold" color={color}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
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
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                sx={{
                  backgroundColor: alpha('#fff', 0.2),
                  mr: 2,
                  width: 56,
                  height: 56,
                }}
              >
                <NotificationsIcon sx={{ fontSize: 32, color: 'white' }} />
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="white"
                  mb={0.5}
                  sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
                >
                  🔔 Quản lý Thông báo
                </Typography>
                <Typography variant="body1" sx={{ color: alpha('#fff', 0.9) }}>
                  Quản lý thông báo và tùy chọn giao tiếp của bạn
                </Typography>
              </Box>
            </Box>

            {/* Quick Stats Cards */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <QuickStatCard
                  icon={<EmailIcon sx={{ color: primaryColor }} />}
                  title="Email Notifications"
                  description="Bật cho tất cả loại"
                  color={primaryColor}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickStatCard
                  icon={<SmsIcon sx={{ color: theme.palette.success.main }} />}
                  title="SMS Alerts"
                  description="Chỉ ưu tiên cao"
                  color={theme.palette.success.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickStatCard
                  icon={<CalendarIcon sx={{ color: theme.palette.warning.main }} />}
                  title="Nhắc nhở Session"
                  description="Trước 30 phút"
                  color={theme.palette.warning.main}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <QuickStatCard
                  icon={<CheckCircleIcon sx={{ color: theme.palette.info.main }} />}
                  title="Phản hồi tự động"
                  description="Templates đang hoạt động"
                  color={theme.palette.info.main}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Main Content */}
          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
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
              <Tab 
                icon={<NotificationsIcon />} 
                label="Notification Center" 
                iconPosition="start"
              />
              <Tab 
                icon={<AnalyticsIcon />} 
                label="Analytics" 
                iconPosition="start"
              />
              <Tab 
                icon={<SettingsIcon />} 
                label="Settings" 
                iconPosition="start"
              />
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
              {/* Notification Center Tab */}
              {activeTab === 0 && (
                <Box>
                  <Typography variant="h6" mb={3} color={primaryColor}>
                    📬 Trung tâm Thông báo
                  </Typography>
                  <NotificationCenter />
                </Box>
              )}

              {/* Analytics Tab */}
              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" mb={3} color={primaryColor}>
                    📊 Phân tích Thông báo
                  </Typography>
                  
                  {/* Analytics Overview */}
                  <Grid container spacing={3} mb={4}>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatCard
                        icon={<EmailIcon />}
                        title="Tổng đã gửi"
                        value={NOTIFICATION_ANALYTICS.totalSent.toLocaleString()}
                        color={primaryColor}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatCard
                        icon={<CheckCircleIcon />}
                        title="Đã giao"
                        value={NOTIFICATION_ANALYTICS.delivered.toLocaleString()}
                        color={theme.palette.success.main}
                        subtitle={`${NOTIFICATION_ANALYTICS.deliveryRate}% tỷ lệ giao`}
                        progress={NOTIFICATION_ANALYTICS.deliveryRate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatCard
                        icon={<TrendingUpIcon />}
                        title="Đã mở"
                        value={NOTIFICATION_ANALYTICS.opened.toLocaleString()}
                        color={theme.palette.warning.main}
                        subtitle={`${NOTIFICATION_ANALYTICS.openRate}% tỷ lệ mở`}
                        progress={NOTIFICATION_ANALYTICS.openRate}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <StatCard
                        icon={<ImportantIcon />}
                        title="Đã click"
                        value={NOTIFICATION_ANALYTICS.clicked.toLocaleString()}
                        color={theme.palette.info.main}
                        subtitle={`${NOTIFICATION_ANALYTICS.clickRate}% tỷ lệ click`}
                        progress={NOTIFICATION_ANALYTICS.clickRate}
                      />
                    </Grid>
                  </Grid>

                  {/* Recent Activity */}
                  <Card sx={{ mb: 4 }}>
                    <CardContent>
                      <Typography variant="h6" mb={2} color={primaryColor}>
                        🕒 Hoạt động gần đây
                      </Typography>
                      <List>
                        {RECENT_ACTIVITY.map((activity, index) => (
                          <Box key={activity.id}>
                            <ListItem>
                              <ListItemIcon>
                                <Avatar
                                  sx={{
                                    backgroundColor: alpha(primaryColor, 0.1),
                                    width: 40,
                                    height: 40,
                                  }}
                                >
                                  <NotificationsIcon sx={{ color: primaryColor }} />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary={activity.message}
                                secondary={
                                  <Box display="flex" alignItems="center" gap={0.5}>
                                    <ScheduleIcon sx={{ fontSize: 14 }} />
                                    {formatTimeAgo(activity.timestamp)}
                                  </Box>
                                }
                              />
                              <ListItemSecondaryAction>
                                <Chip
                                  label={activity.status}
                                  color="success"
                                  size="small"
                                  sx={{ textTransform: 'capitalize' }}
                                />
                              </ListItemSecondaryAction>
                            </ListItem>
                            {index < RECENT_ACTIVITY.length - 1 && <Divider />}
                          </Box>
                        ))}
                      </List>
                    </CardContent>
                  </Card>

                  {/* Performance Chart Placeholder */}
                  <Card>
                    <CardContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        py={6}
                      >
                        <TrendingUpIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" mb={1}>
                          📈 Xu hướng hiệu suất thông báo
                        </Typography>
                        <Typography variant="body2" color="text.disabled" textAlign="center">
                          Biểu đồ hiệu suất sẽ được hiển thị tại đây
                        </Typography>
                        <Typography variant="body2" color="text.disabled" textAlign="center">
                          Cần tích hợp với dịch vụ phân tích
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Settings Tab */}
              {activeTab === 2 && (
                <Box>
                  <Typography variant="h6" mb={3} color={primaryColor}>
                    ⚙️ Tùy chọn Thông báo
                  </Typography>
                  
                  <Grid container spacing={4}>
                    {/* General Settings */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" mb={3} color={primaryColor}>
                            🔧 Cài đặt chung
                          </Typography>
                          <Stack spacing={2}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={settings.enableAll}
                                  onChange={handleSettingChange('enableAll')}
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: primaryColor,
                                      '& + .MuiSwitch-track': {
                                        backgroundColor: primaryColor,
                                      },
                                    },
                                  }}
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="subtitle2">Bật tất cả thông báo</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Nút chính cho tất cả loại thông báo
                                  </Typography>
                                </Box>
                              }
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={settings.doNotDisturb}
                                  onChange={handleSettingChange('doNotDisturb')}
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: primaryColor,
                                      '& + .MuiSwitch-track': {
                                        backgroundColor: primaryColor,
                                      },
                                    },
                                  }}
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="subtitle2">Chế độ Không làm phiền</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Tạm dừng thông báo không khẩn cấp trong giờ học
                                  </Typography>
                                </Box>
                              }
                            />
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={settings.smartGrouping}
                                  onChange={handleSettingChange('smartGrouping')}
                                  sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                      color: primaryColor,
                                      '& + .MuiSwitch-track': {
                                        backgroundColor: primaryColor,
                                      },
                                    },
                                  }}
                                />
                              }
                              label={
                                <Box>
                                  <Typography variant="subtitle2">Nhóm thông minh</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Nhóm các thông báo tương tự để giảm lộn xộn
                                  </Typography>
                                </Box>
                              }
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Channel Settings */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" mb={3} color={primaryColor}>
                            📢 Kênh thông báo
                          </Typography>
                          <Stack spacing={2}>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Box display="flex" alignItems="center">
                                <EmailIcon sx={{ color: theme.palette.info.main, mr: 2 }} />
                                <Box>
                                  <Typography variant="subtitle2">Email Notifications</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Nhận thông báo qua email
                                  </Typography>
                                </Box>
                              </Box>
                              <Switch
                                checked={settings.emailNotifications}
                                onChange={handleSettingChange('emailNotifications')}
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: primaryColor,
                                    '& + .MuiSwitch-track': {
                                      backgroundColor: primaryColor,
                                    },
                                  },
                                }}
                              />
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Box display="flex" alignItems="center">
                                <SmsIcon sx={{ color: theme.palette.success.main, mr: 2 }} />
                                <Box>
                                  <Typography variant="subtitle2">SMS Alerts</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Nhận thông báo khẩn cấp qua SMS
                                  </Typography>
                                </Box>
                              </Box>
                              <Switch
                                checked={settings.smsAlerts}
                                onChange={handleSettingChange('smsAlerts')}
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: primaryColor,
                                    '& + .MuiSwitch-track': {
                                      backgroundColor: primaryColor,
                                    },
                                  },
                                }}
                              />
                            </Box>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                              <Box display="flex" alignItems="center">
                                <NotificationsIcon sx={{ color: theme.palette.warning.main, mr: 2 }} />
                                <Box>
                                  <Typography variant="subtitle2">Push Notifications</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    Thông báo đẩy trình duyệt và mobile
                                  </Typography>
                                </Box>
                              </Box>
                              <Switch
                                checked={settings.pushNotifications}
                                onChange={handleSettingChange('pushNotifications')}
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: primaryColor,
                                    '& + .MuiSwitch-track': {
                                      backgroundColor: primaryColor,
                                    },
                                  },
                                }}
                              />
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Timing Settings */}
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6" mb={3} color={primaryColor}>
                            ⏰ Tùy chọn thời gian
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel>Thời gian nhắc nhở Session</InputLabel>
                                <Select
                                  value={settings.sessionReminderTime}
                                  label="Thời gian nhắc nhở Session"
                                  onChange={handleSettingChange('sessionReminderTime')}
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
                                  <MenuItem value={15}>15 phút trước</MenuItem>
                                  <MenuItem value={30}>30 phút trước</MenuItem>
                                  <MenuItem value={60}>1 giờ trước</MenuItem>
                                  <MenuItem value={120}>2 giờ trước</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel>Giờ yên tĩnh</InputLabel>
                                <Select
                                  value={settings.quietHours}
                                  label="Giờ yên tĩnh"
                                  onChange={handleSettingChange('quietHours')}
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
                                  <MenuItem value="none">Không có giờ yên tĩnh</MenuItem>
                                  <MenuItem value="22-08">10 PM - 8 AM</MenuItem>
                                  <MenuItem value="23-07">11 PM - 7 AM</MenuItem>
                                  <MenuItem value="00-06">12 AM - 6 AM</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Actions */}
                    <Grid item xs={12}>
                      <Box display="flex" gap={2} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          sx={{
                            borderColor: primaryColor,
                            color: primaryColor,
                            '&:hover': {
                              borderColor: secondaryColor,
                              backgroundColor: alpha(primaryColor, 0.04),
                            },
                          }}
                        >
                          Đặt lại mặc định
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: primaryColor,
                            '&:hover': { backgroundColor: secondaryColor },
                          }}
                        >
                          Lưu tùy chọn
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </Layout>
  );
};

export default Notifications;
