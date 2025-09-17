import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  TextField,
  Divider,
  Alert,
  Chip,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Storage as DatabaseIcon,
  Security as SecurityIcon,
  CloudSync as BackupIcon,
  Analytics as AnalyticsIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  Update as UpdateIcon,
  AdminPanelSettings as AdminIcon,
  Assessment as ReportIcon,
  Schedule as ScheduleIcon,
  Group as UsersIcon,
  School as SchoolIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { UserContext } from '../context/UserContext';
import Header from '../components/layout/Header';

const SystemManagementPage = () => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    maintenance: false,
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    autoBackup: true,
    debugMode: false,
    maxUsersPerSession: 50,
    sessionTimeout: 30,
    maxFileSize: 10,
  });

  const theme = {
    primary: '#1e40af',
    secondary: '#1e3a8a', 
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    info: '#0284c7'
  };

  const systemStats = [
    { label: 'Tổng người dùng', value: '1,234', change: '+12%', color: theme.primary, icon: <UsersIcon /> },
    { label: 'Sessions hoạt động', value: '56', change: '+3%', color: theme.success, icon: <ScheduleIcon /> },
    { label: 'Dung lượng đã dùng', value: '78%', change: '+5%', color: theme.warning, icon: <DatabaseIcon /> },
    { label: 'Uptime hệ thống', value: '99.9%', change: '0%', color: theme.success, icon: <CheckCircleIcon /> },
  ];

  const systemModules = [
    {
      title: 'Quản lý Người dùng',
      description: 'Cấu hình và quản lý tài khoản người dùng',
      icon: <UsersIcon sx={{ fontSize: 32, color: theme.primary }} />,
      status: 'active',
      actions: ['Xem chi tiết', 'Cấu hình', 'Báo cáo']
    },
    {
      title: 'Hệ thống Email',
      description: 'Cấu hình gửi email và thông báo',
      icon: <EmailIcon sx={{ fontSize: 32, color: theme.info }} />,
      status: 'active',
      actions: ['Kiểm tra', 'Cấu hình', 'Lịch sử']
    },
    {
      title: 'Bảo mật',
      description: 'Cài đặt bảo mật và xác thực',
      icon: <SecurityIcon sx={{ fontSize: 32, color: theme.error }} />,
      status: 'warning',
      actions: ['Kiểm tra', 'Cấu hình', 'Logs']
    },
    {
      title: 'Cơ sở dữ liệu',
      description: 'Quản lý và sao lưu dữ liệu',
      icon: <DatabaseIcon sx={{ fontSize: 32, color: theme.success }} />,
      status: 'active',
      actions: ['Sao lưu', 'Khôi phục', 'Tối ưu']
    },
    {
      title: 'Analytics',
      description: 'Thống kê và báo cáo hệ thống',
      icon: <AnalyticsIcon sx={{ fontSize: 32, color: theme.warning }} />,
      status: 'active',
      actions: ['Xem báo cáo', 'Xuất dữ liệu', 'Cấu hình']
    },
    {
      title: 'Cập nhật hệ thống',
      description: 'Quản lý phiên bản và cập nhật',
      icon: <UpdateIcon sx={{ fontSize: 32, color: theme.info }} />,
      status: 'update-available',
      actions: ['Kiểm tra', 'Cập nhật', 'Lịch sử']
    }
  ];

  const recentActivities = [
    { time: '10:30', action: 'Người dùng mới đăng ký', user: 'Nguyễn Văn A', type: 'info' },
    { time: '09:15', action: 'Sao lưu dữ liệu thành công', user: 'System', type: 'success' },
    { time: '08:45', action: 'Cảnh báo dung lượng cao', user: 'System', type: 'warning' },
    { time: '08:30', action: 'Đăng nhập admin', user: 'Admin User', type: 'info' },
    { time: '07:20', action: 'Gửi email thông báo', user: 'System', type: 'success' },
  ];

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSettingChange = (setting, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    showSnackbar(`Đã cập nhật cài đặt ${setting}`, 'success');
  };

  const handleModuleAction = (module, action) => {
    setSelectedFeature({ module, action });
    setOpenDialog(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.success;
      case 'warning': return theme.warning;
      case 'error': return theme.error;
      case 'update-available': return theme.info;
      default: return theme.primary;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'warning': return 'Cảnh báo';
      case 'error': return 'Lỗi';
      case 'update-available': return 'Có cập nhật';
      default: return 'Không rõ';
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc', pt: 3 }}>
        <Box sx={{ maxWidth: 1400, mx: 'auto', p: 3 }}>
          {/* Header */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                🔧 Quản lý Hệ thống
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Quản lý và cấu hình toàn bộ hệ thống tutor support
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={() => showSnackbar('Đã làm mới dữ liệu', 'success')}
                sx={{ backgroundColor: theme.primary }}
              >
                Làm mới
              </Button>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={() => showSnackbar('Đã lưu cấu hình', 'success')}
              >
                Lưu cấu hình
              </Button>
            </Box>
          </Box>

          {/* System Stats */}
          <Grid container spacing={3} mb={4}>
            {systemStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%',
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                  border: `1px solid ${stat.color}20`,
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        backgroundColor: `${stat.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {React.cloneElement(stat.icon, { sx: { fontSize: 24, color: stat.color } })}
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight="bold" color={stat.color}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                        <Typography variant="caption" color={stat.change.includes('+') ? theme.success : theme.error}>
                          {stat.change}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* System Settings */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, height: 'fit-content' }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  ⚙️ Cài đặt Hệ thống
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Chế độ bảo trì" secondary="Tạm khóa hệ thống" />
                    <Switch
                      checked={systemSettings.maintenance}
                      onChange={(e) => handleSettingChange('maintenance', e.target.checked)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Cho phép đăng ký" secondary="Người dùng mới có thể đăng ký" />
                    <Switch
                      checked={systemSettings.allowRegistration}
                      onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Thông báo Email" secondary="Gửi email tự động" />
                    <Switch
                      checked={systemSettings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Sao lưu tự động" secondary="Sao lưu dữ liệu hàng ngày" />
                    <Switch
                      checked={systemSettings.autoBackup}
                      onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Debug Mode" secondary="Hiển thị thông tin debug" />
                    <Switch
                      checked={systemSettings.debugMode}
                      onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                    />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                  Cấu hình hiệu suất
                </Typography>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Số người dùng tối đa/session"
                    type="number"
                    size="small"
                    value={systemSettings.maxUsersPerSession}
                    onChange={(e) => handleSettingChange('maxUsersPerSession', parseInt(e.target.value))}
                  />
                </Box>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    label="Timeout session (phút)"
                    type="number"
                    size="small"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </Box>
                <TextField
                  fullWidth
                  label="Kích thước file tối đa (MB)"
                  type="number"
                  size="small"
                  value={systemSettings.maxFileSize}
                  onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
                />
              </Paper>
            </Grid>

            {/* System Modules */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  🔧 Modules Hệ thống
                </Typography>
                <Grid container spacing={2}>
                  {systemModules.map((module, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card sx={{ 
                        height: '100%',
                        border: `1px solid ${getStatusColor(module.status)}20`,
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3
                        }
                      }}>
                        <CardContent>
                          <Box display="flex" alignItems="center" gap={2} mb={2}>
                            {module.icon}
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {module.title}
                              </Typography>
                              <Chip
                                label={getStatusLabel(module.status)}
                                size="small"
                                sx={{
                                  backgroundColor: `${getStatusColor(module.status)}15`,
                                  color: getStatusColor(module.status),
                                  fontWeight: 600
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary" mb={2}>
                            {module.description}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {module.actions.map((action, idx) => (
                              <Button
                                key={idx}
                                size="small"
                                variant="outlined"
                                onClick={() => handleModuleAction(module, action)}
                                sx={{ 
                                  fontSize: '0.75rem',
                                  borderColor: getStatusColor(module.status),
                                  color: getStatusColor(module.status),
                                  '&:hover': {
                                    backgroundColor: `${getStatusColor(module.status)}10`
                                  }
                                }}
                              >
                                {action}
                              </Button>
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Recent Activities */}
              <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
                <Typography variant="h6" fontWeight="600" gutterBottom>
                  📊 Hoạt động Gần đây
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Hoạt động</TableCell>
                        <TableCell>Người dùng</TableCell>
                        <TableCell>Loại</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentActivities.map((activity, index) => (
                        <TableRow key={index}>
                          <TableCell>{activity.time}</TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>{activity.user}</TableCell>
                          <TableCell>
                            <Chip
                              label={activity.type}
                              size="small"
                              sx={{
                                backgroundColor: activity.type === 'success' ? `${theme.success}15` :
                                               activity.type === 'warning' ? `${theme.warning}15` :
                                               `${theme.info}15`,
                                color: activity.type === 'success' ? theme.success :
                                       activity.type === 'warning' ? theme.warning :
                                       theme.info
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Module Action Dialog */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {selectedFeature?.action} - {selectedFeature?.module?.title}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" paragraph>
              Chức năng {selectedFeature?.action} cho module {selectedFeature?.module?.title} đang được phát triển.
            </Typography>
            <Alert severity="info">
              Tính năng này sẽ được triển khai trong phiên bản tiếp theo.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default SystemManagementPage;