import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as helperLogin, isAuthenticated, getCurrentUser } from '../utils/helpers';
import { users as mockUsers } from '../data/mockData';
import { UserContext } from '../context/UserContext';
import { HCMUTLogo, HCMUTFooter } from '../components/ui/HCMUTBrand';
import { LoadingSpinner } from '../components/ui/Loading';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  useTheme,
  useMediaQuery,
  Chip,
  Select,
  MenuItem,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  School,
  SupervisorAccount,
  AdminPanelSettings,
  CheckCircle,
  TrendingUp,
  Security,
  Groups,
  Translate,
  Help,
  Phone,
  Chat,
  Menu
} from '@mui/icons-material';

const LoginPage = () => {
  const { login: contextLogin, user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [language, setLanguage] = useState('vi'); // 'vi' hoặc 'en'
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);

  // Translations
  const translations = {
    vi: {
      title: 'HCMUT Tutor',
      subtitle: 'Hệ thống hỗ trợ học tập trực tuyến',
      university: 'Trường Đại học Bách Khoa TP.HCM',
      welcomeBack: 'Đăng nhập',
      welcomeMessage: 'Chào mừng bạn đến với hệ thống học tập HCMUT',
      email: 'Email',
      password: 'Mật khẩu',
      remember: 'Ghi nhớ đăng nhập',
      forgotPassword: 'Quên mật khẩu?',
      loginButton: 'Đăng nhập',
      logging: 'Đang đăng nhập...',
      success: 'Thành công!',
      noAccount: 'Chưa có tài khoản?',
      register: 'Đăng ký ngay',
      demoAccounts: 'Tài khoản demo',
      studentAccount: 'Tài khoản Học sinh',
      tutorAccount: 'Tài khoản Gia sư',
      coordinatorAccount: 'Điều phối viên',
      adminAccount: 'Quản trị viên',
      features: 'Tính năng học tập',
      feature1Title: 'Kết nối gia sư chất lượng',
      feature1Desc: 'Gặp gỡ các sinh viên và giảng viên xuất sắc từ HCMUT',
      feature2Title: 'Phương pháp học tập hiệu quả',
      feature2Desc: 'Hỗ trợ học tập cá nhân hóa cho từng học sinh',
      feature3Title: 'Môi trường học tập an toàn',
      feature3Desc: 'Được kiểm duyệt và xác thực bởi nhà trường',
      statistics: 'Thống kê hệ thống',
      tutors: 'Gia sư',
      students: 'Học sinh',
      satisfaction: 'Hài lòng',
      support: 'Hỗ trợ',
      supportTitle: 'Hỗ trợ kỹ thuật',
      supportDesc: 'Cần hỗ trợ? Liên hệ với đội ngũ kỹ thuật của chúng tôi',
      contactSupport: 'Liên hệ hỗ trợ',
      phone: 'Điện thoại',
      email_support: 'Email',
      chat: 'Chat trực tuyến',
      close: 'Đóng',
      loginSuccess: 'Đăng nhập thành công! Đang chuyển hướng...',
      copyright: '© 2024 Trường Đại học Bách Khoa TP.HCM'
    },
    en: {
      title: 'HCMUT Tutor',
      subtitle: 'Online Learning Support System',
      university: 'Ho Chi Minh City University of Technology',
      welcomeBack: 'Login',
      welcomeMessage: 'Welcome to HCMUT Learning System',
      email: 'Email',
      password: 'Password',
      remember: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Login',
      logging: 'Logging in...',
      success: 'Success!',
      noAccount: "Don't have an account?",
      register: 'Register now',
      demoAccounts: 'Demo accounts',
      studentAccount: 'Student Account',
      tutorAccount: 'Tutor Account',
      coordinatorAccount: 'Coordinator',
      adminAccount: 'Administrator',
      features: 'Learning Features',
      feature1Title: 'Connect with Quality Tutors',
      feature1Desc: 'Meet excellent students and lecturers from HCMUT',
      feature2Title: 'Effective Learning Methods',
      feature2Desc: 'Personalized learning support for each student',
      feature3Title: 'Safe Learning Environment',
      feature3Desc: 'Verified and authenticated by the university',
      statistics: 'System Statistics',
      tutors: 'Tutors',
      students: 'Students',
      satisfaction: 'Satisfaction',
      support: 'Support',
      supportTitle: 'Technical Support',
      supportDesc: 'Need help? Contact our technical support team',
      contactSupport: 'Contact Support',
      phone: 'Phone',
      email_support: 'Email',
      chat: 'Live Chat',
      close: 'Close',
      loginSuccess: 'Login successful! Redirecting...',
      copyright: '© 2024 Ho Chi Minh City University of Technology'
    }
  };

  const t = translations[language];

  // Check if user is already authenticated via context
  useEffect(() => {
    console.log('LoginPage - Component mounted, checking authentication');
    if (user) {
      console.log('LoginPage - User already authenticated, redirecting');
      switch (user.role) {
        case 'student':
          navigate('/dashboard', { replace: true });
          break;
        case 'tutor':
          navigate('/tutor-dashboard', { replace: true });
          break;
        case 'coordinator':
          navigate('/coordinator-dashboard', { replace: true });
          break;
        case 'admin':
          navigate('/admin-dashboard', { replace: true });
          break;
        default:
          navigate('/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleDemoLogin = async (email, password) => {
    console.log('Demo login triggered for:', email);
    setFormData({ email, password });
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      console.log('Demo login result:', foundUser);
      
      if (foundUser) {
        // Use context login instead of helper
        contextLogin(foundUser);
        console.log('Context login completed for user:', foundUser.name);
        
        // Show success state briefly
        setSuccess(true);
        
        // Navigate after a brief delay
        setTimeout(() => {
          console.log('Demo login navigating to dashboard for role:', foundUser.role);
          switch (foundUser.role) {
            case 'student':
              navigate('/dashboard', { replace: true });
              break;
            case 'tutor':
              navigate('/tutor-dashboard', { replace: true });
              break;
            case 'coordinator':
              navigate('/coordinator-dashboard', { replace: true });
              break;
            case 'admin':
              navigate('/admin-dashboard', { replace: true });
              break;
            default:
              navigate('/dashboard', { replace: true });
          }
        }, 500); // Increased delay to ensure context update
      } else {
        setError('Demo account không tìm thấy.');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      setError('Đã xảy ra lỗi với tài khoản demo.');
    } finally {
      // Only set loading to false if we're not navigating
      if (!success) {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      console.log('Attempting login with:', formData.email, formData.password);
      
      // Find user in mock data
      const foundUser = mockUsers.find(u => u.email === formData.email && u.password === formData.password);
      console.log('Login result:', foundUser);
      
      if (foundUser) {
        // Use context login instead of helper
        contextLogin(foundUser);
        console.log('Context login completed for user:', foundUser.name);
        
        // Show success state briefly
        setSuccess(true);
        
        // Navigate after successful authentication
        setTimeout(() => {
          console.log('Navigating to dashboard for role:', foundUser.role);
          switch (foundUser.role) {
            case 'student':
              navigate('/dashboard', { replace: true });
              break;
            case 'tutor':
              navigate('/tutor-dashboard', { replace: true });
              break;
            case 'coordinator':
              navigate('/coordinator-dashboard', { replace: true });
              break;
            case 'admin':
              navigate('/admin-dashboard', { replace: true });
              break;
            default:
              navigate('/dashboard', { replace: true });
          }
        }, 500); // Increased delay to ensure context update
      } else {
        setError('Email hoặc mật khẩu không chính xác. Hãy thử sử dụng các tài khoản demo bên dưới.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      // Only set loading to false if we're not navigating
      if (!success) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Educational background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, rgba(219, 234, 254, 0.2) 0%, transparent 50%)
          `,
        }}
      />

      {/* Language Selector - Top Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          display: 'flex',
          gap: 2
        }}
      >
        <FormControl size="small">
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              minWidth: 100,
              '& .MuiSelect-select': {
                py: 1,
                px: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }
            }}
            startAdornment={<Translate sx={{ color: '#1e40af', mr: 1 }} />}
          >
            <MenuItem value="vi">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>🇻🇳</span>
                <span>Tiếng Việt</span>
              </Box>
            </MenuItem>
            <MenuItem value="en">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>🇺🇸</span>
                <span>English</span>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Support FAB - Bottom Right */}
      <Fab
        color="primary"
        onClick={() => setSupportDialogOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
          backgroundColor: '#1e40af',
          '&:hover': {
            backgroundColor: '#1e3a8a',
          }
        }}
      >
        <Help />
      </Fab>

      {/* Support Dialog */}
      <Dialog 
        open={supportDialogOpen} 
        onClose={() => setSupportDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: '#1e40af', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Help />
          {t.supportTitle}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {t.supportDesc}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Phone sx={{ color: '#1e40af' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t.phone}
                secondary="(028) 3865 2307 - Ext: 5555"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email sx={{ color: '#1e40af' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t.email_support}
                secondary="support@hcmut.edu.vn"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Chat sx={{ color: '#1e40af' }} />
              </ListItemIcon>
              <ListItemText 
                primary={t.chat}
                secondary={language === 'vi' ? 'Thứ 2 - Thứ 6: 8:00 - 17:00' : 'Mon - Fri: 8:00 - 17:00'}
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSupportDialogOpen(false)} color="primary">
            {t.close}
          </Button>
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#1e40af' }}
            onClick={() => {
              window.open('mailto:support@hcmut.edu.vn?subject=Login Support Request');
            }}
          >
            {t.contactSupport}
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container sx={{ minHeight: '100vh' }}>
          {/* Left Panel - Educational Branding */}
          <Grid 
            item 
            xs={false} 
            md={6} 
            lg={7}
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              px: { md: 4, lg: 8 },
              color: 'white'
            }}
          >
            <Box>
              {/* University Logo Section */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <HCMUTLogo 
                    size="md"
                    variant="light" 
                    showText={false}
                  />
                </Box>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'white',
                      mb: 1
                    }}
                  >
                    {t.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>
                    {t.subtitle}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 1 }}>
                    {t.university}
                  </Typography>
                </Box>
              </Box>

              {/* Academic Statistics */}
              <Box>
                <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
                  {t.statistics}
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#60a5fa' }}>
                        500+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {t.tutors}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#60a5fa' }}>
                        2000+
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {t.students}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: '#60a5fa' }}>
                        95%
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {t.satisfaction}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Right Panel - Login Form */}
          <Grid 
            item 
            xs={12} 
            md={6} 
            lg={5}
            sx={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
              px: 2
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 440 }}>
              {/* Mobile Logo */}
              <Box 
                sx={{ 
                  display: { xs: 'flex', md: 'none' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 4,
                  color: 'white'
                }}
              >
                <Box sx={{ width: 60, height: 60, mr: 2 }}>
                  <HCMUTLogo 
                    size="md"
                    variant="light" 
                    showText={false}
                  />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {t.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {t.subtitle}
                  </Typography>
                </Box>
              </Box>

              {/* Login Card */}
              <Paper
                elevation={8}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'white',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography 
                    variant="h4" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: '#1e40af'
                    }}
                  >
                    {t.welcomeBack}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t.welcomeMessage}
                  </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                  <Alert 
                    severity="error" 
                    sx={{ mb: 3 }}
                    onClose={() => setError('')}
                  >
                    {error}
                  </Alert>
                )}

                {/* Success Alert */}
                {success && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 3 }}
                    icon={<CheckCircle />}
                  >
                    {t.loginSuccess}
                  </Alert>
                )}

                {/* Login Form */}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label={t.email}
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading || success}
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#1e40af' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1e40af',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e40af',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1e40af',
                      }
                    }}
                  />
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label={t.password}
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading || success}
                    autoComplete="current-password"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#1e40af' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading || success}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ 
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1e40af',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e40af',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#1e40af',
                      }
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          sx={{
                            color: '#1e40af',
                            '&.Mui-checked': {
                              color: '#1e40af',
                            },
                          }}
                          disabled={isLoading || success}
                        />
                      }
                      label={t.remember}
                    />
                    <Button 
                      component={Link}
                      to="/forgot-password"
                      variant="text"
                      disabled={isLoading || success}
                      sx={{ 
                        textTransform: 'none',
                        color: '#1e40af',
                        '&:hover': {
                          backgroundColor: 'rgba(30, 64, 175, 0.04)',
                        }
                      }}
                    >
                      {t.forgotPassword}
                    </Button>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading || success}
                    sx={{
                      mt: 2,
                      mb: 3,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      backgroundColor: '#1e40af',
                      '&:hover': {
                        backgroundColor: '#1e3a8a',
                      },
                      '&:disabled': {
                        backgroundColor: '#e5e7eb',
                      },
                    }}
                  >
                    {isLoading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        <span>{t.logging}</span>
                      </Box>
                    ) : success ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle />
                        <span>{t.success}</span>
                      </Box>
                    ) : (
                      t.loginButton
                    )}
                  </Button>

                  {/* Register Link */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      {t.noAccount}{' '}
                      <Button
                        component={Link}
                        to="/register"
                        variant="text"
                        disabled={isLoading || success}
                        sx={{ 
                          textTransform: 'none',
                          fontWeight: 600,
                          color: '#1e40af',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 64, 175, 0.04)',
                          }
                        }}
                      >
                        {t.register}
                      </Button>
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 3 }}>
                    <Chip 
                      label={t.demoAccounts} 
                      sx={{ 
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        color: '#1e40af',
                        fontWeight: 600,
                        border: '1px solid rgba(30, 64, 175, 0.2)'
                      }}
                    />
                  </Divider>

                  {/* Demo Login Buttons - Educational Style */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('student@hcmut.edu.vn', 'password')}
                        disabled={isLoading || success}
                        startIcon={<Person />}
                        sx={{
                          py: 1.5,
                          textTransform: 'none',
                          borderColor: '#1e40af',
                          color: '#1e40af',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 64, 175, 0.04)',
                            borderColor: '#1e3a8a',
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'left', flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {t.studentAccount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            student@hcmut.edu.vn
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('tutor@hcmut.edu.vn', 'password')}
                        disabled={isLoading || success}
                        startIcon={<School />}
                        sx={{
                          py: 1.5,
                          textTransform: 'none',
                          borderColor: '#1e40af',
                          color: '#1e40af',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 64, 175, 0.04)',
                            borderColor: '#1e3a8a',
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'left', flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {t.tutorAccount}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            tutor@hcmut.edu.vn
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('coordinator@hcmut.edu.vn', 'password')}
                        disabled={isLoading || success}
                        startIcon={<SupervisorAccount />}
                        sx={{
                          py: 1.5,
                          textTransform: 'none',
                          borderColor: '#1e40af',
                          color: '#1e40af',
                          fontSize: '0.85rem',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 64, 175, 0.04)',
                            borderColor: '#1e3a8a',
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.coordinatorAccount}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => handleDemoLogin('admin@hcmut.edu.vn', 'password')}
                        disabled={isLoading || success}
                        startIcon={<AdminPanelSettings />}
                        sx={{
                          py: 1.5,
                          textTransform: 'none',
                          borderColor: '#1e40af',
                          color: '#1e40af',
                          fontSize: '0.85rem',
                          '&:hover': {
                            backgroundColor: 'rgba(30, 64, 175, 0.04)',
                            borderColor: '#1e3a8a',
                          },
                        }}
                      >
                        <Box sx={{ textAlign: 'center', flex: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {t.adminAccount}
                          </Typography>
                        </Box>
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>

              {/* Footer */}
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {t.copyright}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
