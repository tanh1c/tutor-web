import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import TutorDashboard from '../components/dashboards/TutorDashboard';
import CoordinatorDashboard from '../components/dashboards/CoordinatorDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import { Container } from '../components/ui/Layout';
import { LoadingState, ErrorState } from '../components/ui/EmptyStates';
import { FadeIn } from '../components/ui/Animations';
import { Alert } from '../components/analytics/NotificationComponents';

// Material-UI Components
import {
  Box,
  Container as MuiContainer,
  Paper,
  Typography,
  CircularProgress,
  Alert as MuiAlert,
  Button,
  Card,
  CardContent,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';

// Material-UI Icons
import {
  Dashboard,
  ErrorOutline,
  Refresh,
  Home,
  School,
  Person,
  SupervisorAccount,
  AdminPanelSettings
} from '@mui/icons-material';

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Role icon mapping
  const roleIcons = {
    student: <Person sx={{ fontSize: 48, color: '#1e40af' }} />,
    tutor: <School sx={{ fontSize: 48, color: '#1e40af' }} />,
    coordinator: <SupervisorAccount sx={{ fontSize: 48, color: '#1e40af' }} />,
    admin: <AdminPanelSettings sx={{ fontSize: 48, color: '#1e40af' }} />
  };

  // Role labels
  const roleLabels = {
    student: 'Học sinh',
    tutor: 'Gia sư', 
    coordinator: 'Điều phối viên',
    admin: 'Quản trị viên'
  };

  useEffect(() => {
    // Simulate loading time for dashboard data
    const timer = setTimeout(() => {
      if (user) {
        setIsLoading(false);
      } else {
        setError('Authentication required');
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
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
        
        <MuiContainer maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
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
              <Box sx={{ mb: 4 }}>
                <Dashboard sx={{ fontSize: 64, color: '#1e40af', mb: 2 }} />
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#1e40af',
                    mb: 2
                  }}
                >
                  Đang tải Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Vui lòng đợi trong khi chúng tôi chuẩn bị dashboard cá nhân hóa cho bạn
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <CircularProgress 
                    size={48} 
                    sx={{ color: '#1e40af' }}
                  />
                </Box>
                
                {user && (
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 2,
                    p: 2,
                    backgroundColor: 'rgba(30, 64, 175, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(30, 64, 175, 0.1)'
                  }}>
                    {roleIcons[user.role]}
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" color="text.secondary">
                        Đang tải cho
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af' }}>
                        {roleLabels[user.role]}: {user.name}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Card>
          </Fade>
        </MuiContainer>
      </Box>
    );
  }

  if (error || !user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
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
        
        <MuiContainer maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
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
              <Box sx={{ mb: 4 }}>
                <ErrorOutline sx={{ fontSize: 64, color: '#dc2626', mb: 2 }} />
                <Typography 
                  variant="h4" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#dc2626',
                    mb: 2
                  }}
                >
                  Yêu cầu xác thực
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Vui lòng đăng nhập để truy cập dashboard
                </Typography>
                
                <MuiAlert 
                  severity="warning" 
                  sx={{ 
                    mb: 4,
                    '& .MuiAlert-message': {
                      width: '100%',
                      textAlign: 'left'
                    }
                  }}
                >
                  Phiên đăng nhập của bạn có thể đã hết hạn. Vui lòng đăng nhập lại.
                </MuiAlert>
                
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Refresh />}
                    onClick={() => window.location.reload()}
                    sx={{
                      backgroundColor: '#1e40af',
                      '&:hover': {
                        backgroundColor: '#1e3a8a',
                      },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Tải lại
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Home />}
                    onClick={() => window.location.href = '/login'}
                    sx={{
                      borderColor: '#1e40af',
                      color: '#1e40af',
                      '&:hover': {
                        backgroundColor: 'rgba(30, 64, 175, 0.04)',
                        borderColor: '#1e3a8a',
                      },
                      px: 4,
                      py: 1.5
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Box>
              </Box>
            </Card>
          </Fade>
        </MuiContainer>
      </Box>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'tutor':
        return <TutorDashboard />;
      case 'coordinator':
        return <CoordinatorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <MuiContainer maxWidth="sm" sx={{ py: 8 }}>
            <Fade in={true}>
              <Card
                elevation={8}
                sx={{
                  p: 6,
                  borderRadius: 3,
                  background: 'white',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  textAlign: 'center'
                }}
              >
                <ErrorOutline sx={{ fontSize: 64, color: '#dc2626', mb: 2 }} />
                <Typography 
                  variant="h5" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 700, 
                    color: '#dc2626',
                    mb: 2
                  }}
                >
                  Vai trò người dùng không hợp lệ
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Vai trò của bạn không được nhận diện. Vui lòng liên hệ bộ phận hỗ trợ.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Refresh />}
                    onClick={() => window.location.reload()}
                    sx={{
                      backgroundColor: '#1e40af',
                      '&:hover': {
                        backgroundColor: '#1e3a8a',
                      }
                    }}
                  >
                    Tải lại
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Person />}
                    onClick={() => window.location.href = '/profile'}
                    sx={{
                      borderColor: '#1e40af',
                      color: '#1e40af',
                      '&:hover': {
                        backgroundColor: 'rgba(30, 64, 175, 0.04)',
                      }
                    }}
                  >
                    Hồ sơ
                  </Button>
                </Box>
              </Card>
            </Fade>
          </MuiContainer>
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
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
      
      <Layout>
        <MuiContainer maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 2, sm: 4 } }}>
          {/* Dashboard Header */}
          <Fade in={true}>
            <Paper
              elevation={2}
              sx={{
                p: { xs: 3, md: 4 },
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
                <Box
                  sx={{
                    width: { xs: 80, md: 100 },
                    height: { xs: 80, md: 100 },
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.1) 0%, rgba(30, 64, 175, 0.05) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid rgba(30, 64, 175, 0.1)'
                  }}
                >
                  {roleIcons[user.role]}
                </Box>
                
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
                    Dashboard {roleLabels[user.role]}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.secondary',
                      mb: 1,
                      fontSize: { xs: '1rem', md: '1.25rem' }
                    }}
                  >
                    Chào mừng, {user.name}!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hệ thống hỗ trợ học tập HCMUT - {new Date().toLocaleDateString('vi-VN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Fade>

          {/* Dashboard Content */}
          <Fade in={true} timeout={800}>
            <Box
              sx={{
                '& > *': {
                  borderRadius: 3,
                  overflow: 'hidden'
                }
              }}
            >
              {renderDashboard()}
            </Box>
          </Fade>
        </MuiContainer>
      </Layout>
    </Box>
  );
};

export default DashboardPage;
