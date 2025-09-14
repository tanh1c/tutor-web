import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Divider,
  Stack,
  Alert,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Storage as StorageIcon,
  Storage as DatabaseIcon,
  Email as EmailIcon,
  Smartphone as SmartphoneIcon,
  MenuBook as MenuBookIcon,
  VerifiedUser as VerifiedUserIcon,
  Wifi as WifiIcon,
  Security as SecurityIcon,
  Close as CloseIcon,
  Settings as SettingsIcon,
  Assessment as AssessmentIcon,
  CloudSync as CloudSyncIcon
} from '@mui/icons-material';

// Mock Integration Services
const INTEGRATION_SERVICES = {
  HCMUT_SSO: {
    name: 'HCMUT SSO',
    description: 'Single Sign-On Authentication',
    icon: SecurityIcon,
    status: 'connected',
    lastSync: new Date(Date.now() - 300000), // 5 minutes ago
    version: '2.1.4',
    uptime: '99.2%',
    responseTime: '150ms',
    users: 15847,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    features: ['User Authentication', 'Role Management', 'Session Management']
  },
  HCMUT_DATACORE: {
    name: 'HCMUT DataCore',
    description: 'Student & Staff Data Synchronization',
    icon: DatabaseIcon,
    status: 'connected',
    lastSync: new Date(Date.now() - 120000), // 2 minutes ago
    version: '3.0.1',
    uptime: '98.8%',
    responseTime: '320ms',
    records: 48203,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    features: ['Student Records', 'Staff Directory', 'Academic Data', 'Real-time Sync']
  },
  HCMUT_LIBRARY: {
    name: 'HCMUT Digital Library',
    description: 'Resource Sharing & Document Access',
    icon: MenuBookIcon,
    status: 'connected',
    lastSync: new Date(Date.now() - 600000), // 10 minutes ago
    version: '1.8.7',
    uptime: '99.7%',
    responseTime: '280ms',
    resources: 125406,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
    features: ['Document Access', 'Research Papers', 'E-books', 'Citation Tools']
  },
  EMAIL_SERVICE: {
    name: 'Email Notification System',
    description: 'Automated Email Communications',
    icon: EmailIcon,
    status: 'warning',
    lastSync: new Date(Date.now() - 900000), // 15 minutes ago
    version: '2.3.2',
    uptime: '96.5%',
    responseTime: '1.2s',
    emailsSent: 8947,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    features: ['Welcome Emails', 'Session Reminders', 'Notifications', 'Newsletters']
  },
  MOBILE_APP: {
    name: 'Mobile App API',
    description: 'Native Mobile Application Backend',
    icon: SmartphoneIcon,
    status: 'connected',
    lastSync: new Date(Date.now() - 60000), // 1 minute ago
    version: '1.2.0',
    uptime: '99.1%',
    responseTime: '180ms',
    activeUsers: 3241,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    features: ['Push Notifications', 'Offline Sync', 'Real-time Chat', 'Schedule Management']
  },
  VIDEO_PLATFORM: {
    name: 'Video Conferencing',
    description: 'Integrated Video Session Platform',
    icon: WifiIcon,
    status: 'error',
    lastSync: new Date(Date.now() - 1800000), // 30 minutes ago
    version: '4.1.8',
    uptime: '94.3%',
    responseTime: '2.1s',
    activeSessions: 0,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    features: ['HD Video Calls', 'Screen Sharing', 'Recording', 'Whiteboard']
  }
};

const IntegrationStatus = () => {
  const [services, setServices] = useState(INTEGRATION_SERVICES);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServices(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          // Randomly update last sync time for connected services
          if (updated[key].status === 'connected') {
            updated[key].lastSync = new Date();
          }
          
          // Simulate occasional status changes
          if (Math.random() < 0.1) {
            const statuses = ['connected', 'warning', 'error'];
            const currentIndex = statuses.indexOf(updated[key].status);
            // Bias towards 'connected' status
            const newStatus = Math.random() < 0.8 ? 'connected' : statuses[(currentIndex + 1) % statuses.length];
            updated[key].status = newStatus;
          }
        });
        return updated;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return <CheckCircleIcon sx={{ color: '#10b981' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: '#f59e0b' }} />;
      case 'error':
        return <CancelIcon sx={{ color: '#ef4444' }} />;
      default:
        return <CancelIcon sx={{ color: '#9ca3af' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return { backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'warning':
        return { backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'error':
        return { backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' };
      default:
        return { backgroundColor: 'rgba(156, 163, 175, 0.1)', color: '#9ca3af' };
    }
  };

  const refreshAllServices = async () => {
    setIsRefreshing(true);
    
    // Simulate API calls to check service status
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setServices(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        updated[key].lastSync = new Date();
        // Simulate successful refresh (90% success rate)
        if (Math.random() < 0.9) {
          updated[key].status = 'connected';
        }
      });
      return updated;
    });
    
    setIsRefreshing(false);
  };

  const testConnection = async (serviceKey) => {
    setServices(prev => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey],
        status: 'testing'
      }
    }));

    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 1500));

    setServices(prev => ({
      ...prev,
      [serviceKey]: {
        ...prev[serviceKey],
        status: Math.random() < 0.8 ? 'connected' : 'error',
        lastSync: new Date()
      }
    }));
  };

  const connectedCount = Object.values(services).filter(s => s.status === 'connected').length;
  const warningCount = Object.values(services).filter(s => s.status === 'warning').length;
  const errorCount = Object.values(services).filter(s => s.status === 'error').length;

  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              color: 'white',
              width: 56,
              height: 56
            }}
          >
            <StorageIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} color="#1e40af">
              Integration Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              HCMUT System Integrations & External Services
            </Typography>
          </Box>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<RefreshIcon className={isRefreshing ? 'animate-spin' : ''} />}
          onClick={refreshAllServices}
          disabled={isRefreshing}
          sx={{
            borderRadius: 3,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 25px rgba(30, 64, 175, 0.4)'
            },
            '&:disabled': {
              opacity: 0.7
            },
            transition: 'all 0.3s ease-in-out'
          }}
        >
          Refresh All
        </Button>
      </Box>

      {/* Status Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { 
            label: 'Connected', 
            count: connectedCount, 
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            icon: <CheckCircleIcon />
          },
          { 
            label: 'Warnings', 
            count: warningCount, 
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            icon: <WarningIcon />
          },
          { 
            label: 'Errors', 
            count: errorCount, 
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            icon: <CancelIcon />
          }
        ].map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Fade in={true} timeout={800 + index * 200}>
              <Card
                elevation={8}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(30, 64, 175, 0.2)'
                  }
                }}
              >
                <Box
                  sx={{
                    background: item.gradient,
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      color: item.color,
                      width: 48,
                      height: 48
                    }}
                  >
                    {item.icon}
                  </Avatar>
                </Box>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Typography variant="h3" fontWeight={800} color={item.color}>
                    {item.count}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" fontWeight={600}>
                    {item.label}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Services List */}
      <Grid container spacing={3}>
        {Object.entries(services).map(([key, service], index) => {
          const IconComponent = service.icon;
          return (
            <Grid item xs={12} md={6} lg={4} key={key}>
              <Zoom in={true} timeout={1000 + index * 150}>
                <Card
                  elevation={8}
                  sx={{
                    borderRadius: 4,
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(30, 64, 175, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 16px 40px rgba(30, 64, 175, 0.2)'
                    }
                  }}
                  onClick={() => setSelectedService({ key, ...service })}
                >
                  <Box
                    sx={{
                      background: service.gradient,
                      p: 3,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Avatar
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: service.color,
                        width: 48,
                        height: 48
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(service.status)}
                      <Chip
                        label={service.status === 'testing' ? 'Testing...' : service.status}
                        sx={{
                          ...getStatusColor(service.status),
                          fontWeight: 600,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight={700} color="#1f2937" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {service.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Last sync
                        </Typography>
                        <Typography variant="body2" fontWeight={600} color="#1f2937">
                          {service.lastSync.toLocaleTimeString()}
                        </Typography>
                      </Box>
                      <Chip
                        label={`v${service.version}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(30, 64, 175, 0.1)',
                          color: '#1e40af',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={(e) => {
                        e.stopPropagation();
                        testConnection(key);
                      }}
                      sx={{
                        borderColor: service.color,
                        color: service.color,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: service.color,
                          backgroundColor: `${service.color}15`
                        }
                      }}
                    >
                      Test Connection
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          );
        })}
      </Grid>

      {/* Service Detail Modal */}
      <Dialog
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            maxHeight: '80vh'
          }
        }}
      >
        {selectedService && (
          <>
            <DialogTitle sx={{ p: 4, pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      background: selectedService.gradient,
                      color: 'white',
                      width: 56,
                      height: 56
                    }}
                  >
                    <selectedService.icon />
                  </Avatar>
                  <Box>
                    <Typography variant="h5" fontWeight={700} color="#1f2937">
                      {selectedService.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedService.description}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => setSelectedService(null)}
                  sx={{
                    backgroundColor: 'rgba(156, 163, 175, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(156, 163, 175, 0.2)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            
            <DialogContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                {/* Status Overview */}
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(30, 64, 175, 0.1) 100%)',
                        border: '1px solid rgba(30, 64, 175, 0.1)'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        {getStatusIcon(selectedService.status)}
                        <Typography variant="subtitle1" fontWeight={600}>
                          Status
                        </Typography>
                      </Box>
                      <Chip
                        label={selectedService.status}
                        sx={{
                          ...getStatusColor(selectedService.status),
                          fontWeight: 600
                        }}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(30, 64, 175, 0.1) 100%)',
                        border: '1px solid rgba(30, 64, 175, 0.1)'
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} color="#1f2937" gutterBottom>
                        Version
                      </Typography>
                      <Typography variant="h6" color="#1e40af" fontWeight={700}>
                        {selectedService.version}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Performance Metrics */}
                <Grid container spacing={3}>
                  {[
                    { label: 'Uptime', value: selectedService.uptime, color: '#10b981' },
                    { label: 'Response Time', value: selectedService.responseTime, color: '#3b82f6' },
                    { 
                      label: selectedService.users ? 'Users' : 
                              selectedService.records ? 'Records' : 
                              selectedService.resources ? 'Resources' : 
                              selectedService.emailsSent ? 'Emails Sent' : 
                              selectedService.activeUsers ? 'Active Users' : 
                              selectedService.activeSessions !== undefined ? 'Active Sessions' : 'Metric',
                      value: selectedService.users || selectedService.records || selectedService.resources || 
                             selectedService.emailsSent || selectedService.activeUsers || 
                             selectedService.activeSessions || 'N/A',
                      color: '#7c3aed'
                    }
                  ].map((metric, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" fontWeight={800} color={metric.color}>
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                          {metric.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Features */}
                <Box>
                  <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ mb: 2 }}>
                    Available Features
                  </Typography>
                  <Grid container spacing={1}>
                    {selectedService.features.map((feature, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                          <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                          <Typography variant="body2" color="#1f2937" fontWeight={500}>
                            {feature}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                {/* Last Sync Info */}
                <Alert
                  icon={<CloudSyncIcon />}
                  severity="info"
                  sx={{
                    borderRadius: 3,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    '& .MuiAlert-icon': {
                      color: '#3b82f6'
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Last successful sync: {selectedService.lastSync.toLocaleString()}
                  </Typography>
                </Alert>
              </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 4, pt: 0 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => testConnection(selectedService.key)}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
                    }}
                  >
                    Test Connection
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<AssessmentIcon />}
                    sx={{
                      borderColor: '#6b7280',
                      color: '#6b7280',
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    View Logs
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SettingsIcon />}
                    sx={{
                      borderRadius: 3,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                    }}
                  >
                    Configure
                  </Button>
                </Grid>
              </Grid>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default IntegrationStatus;
