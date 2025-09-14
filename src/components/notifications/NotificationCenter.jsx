import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Chip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextField,
  Divider,
  Fade
} from '@mui/material';
import {
  Notifications as BellIcon,
  Email as MailIcon,
  Message as MessageSquareIcon,
  CalendarToday as CalendarIcon,
  PersonAdd as UserPlusIcon,
  MenuBook as BookOpenIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as XCircleIcon,
  Schedule as ClockIcon,
  Star as StarIcon,
  Warning as AlertCircleIcon,
  Info as InfoIcon,
  CardGiftcard as GiftIcon,
  FlashOn as ZapIcon,
  Settings as SettingsIcon,
  FilterList as FilterIcon,
  Close as CloseIcon
} from '@mui/icons-material';

// Mock notification data
const NOTIFICATIONS = [
  {
    id: 1,
    type: 'session_reminder',
    title: 'Upcoming Tutoring Session',
    message: 'Your session with Dr. Nguyễn Hoàng starts in 30 minutes',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    read: false,
    priority: 'high',
    actionRequired: true,
    icon: CalendarIcon,
    color: { bgcolor: '#fee2e2', color: '#991b1b' }
  },
  {
    id: 2,
    type: 'new_message',
    title: 'New Message from Tutor',
    message: 'Dr. Lê Minh has sent you study materials for tomorrow\'s session',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    read: false,
    priority: 'medium',
    actionRequired: true,
    icon: MessageSquareIcon,
    color: { bgcolor: '#dbeafe', color: '#1e40af' }
  },
  {
    id: 3,
    type: 'assignment_graded',
    title: 'Assignment Graded',
    message: 'Your React.js assignment has been graded. Score: 95/100',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    read: true,
    priority: 'medium',
    actionRequired: false,
    icon: StarIcon,
    color: { bgcolor: '#dcfce7', color: '#166534' }
  },
  {
    id: 4,
    type: 'payment_reminder',
    title: 'Payment Due',
    message: 'Your tutoring package payment is due in 3 days',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    read: false,
    priority: 'high',
    actionRequired: true,
    icon: AlertCircleIcon,
    color: { bgcolor: '#fef3c7', color: '#92400e' }
  },
  {
    id: 5,
    type: 'achievement',
    title: 'Achievement Unlocked!',
    message: 'Congratulations! You\'ve completed 10 tutoring sessions',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    read: true,
    priority: 'low',
    actionRequired: false,
    icon: GiftIcon,
    color: { bgcolor: '#f3e8ff', color: '#7c3aed' }
  },
  {
    id: 6,
    type: 'system_update',
    title: 'System Maintenance',
    message: 'Scheduled maintenance tonight from 11 PM to 1 AM',
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    read: true,
    priority: 'low',
    actionRequired: false,
    icon: InfoIcon,
    color: { bgcolor: '#f3f4f6', color: '#374151' }
  },
  {
    id: 7,
    type: 'recommendation',
    title: 'New Learning Path Suggested',
    message: 'AI recommends "Advanced React Patterns" based on your progress',
    timestamp: new Date(Date.now() - 43200000), // 12 hours ago
    read: false,
    priority: 'medium',
    actionRequired: false,
    icon: TrendingUpIcon,
    color: { bgcolor: '#e0e7ff', color: '#4338ca' }
  },
  {
    id: 8,
    type: 'session_completed',
    title: 'Session Completed',
    message: 'Please rate your session with Dr. Phạm Văn Hoàng',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    read: true,
    priority: 'medium',
    actionRequired: true,
    icon: CheckCircleIcon,
    color: { bgcolor: '#dcfce7', color: '#166534' }
  }
];

// Email notification templates
const EMAIL_TEMPLATES = {
  session_reminder: {
    subject: 'Upcoming Tutoring Session Reminder',
    preview: 'Your session starts in 30 minutes',
    template: `
      <h2>Session Reminder</h2>
      <p>Hi {{studentName}},</p>
      <p>This is a friendly reminder that your tutoring session with {{tutorName}} is scheduled to start in 30 minutes.</p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <strong>Session Details:</strong><br>
        Subject: {{subject}}<br>
        Time: {{sessionTime}}<br>
        Duration: {{duration}}<br>
        Location: {{location}}
      </div>
      <p>Please make sure you have all necessary materials ready.</p>
      <a href="{{sessionLink}}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Join Session</a>
    `
  },
  assignment_graded: {
    subject: 'Assignment Graded - {{assignmentName}}',
    preview: 'Your assignment has been graded',
    template: `
      <h2>Assignment Graded</h2>
      <p>Hi {{studentName}},</p>
      <p>Your assignment "{{assignmentName}}" has been graded by {{tutorName}}.</p>
      <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <strong>Results:</strong><br>
        Score: {{score}}/{{maxScore}}<br>
        Grade: {{letterGrade}}<br>
        Feedback: {{feedback}}
      </div>
      <a href="{{assignmentLink}}" style="background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Details</a>
    `
  }
};

// SMS templates
const SMS_TEMPLATES = {
  session_reminder: 'HCMUT Tutor: Your session with {{tutorName}} starts in 30 minutes. Location: {{location}}. Join: {{link}}',
  payment_due: 'HCMUT Tutor: Payment of {{amount}} VND is due in {{days}} days. Pay now: {{paymentLink}}',
  session_cancelled: 'HCMUT Tutor: Your session on {{date}} has been cancelled by {{tutorName}}. Reason: {{reason}}'
};

const NotificationCenter = () => {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // all, unread, high_priority
  const [showSettings, setShowSettings] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'high_priority':
        return notification.priority === 'high';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getPriorityBorderColor = (priority, read) => {
    if (read) return '#e5e7eb';
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  top: 8,
                  right: 8
                }
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  mr: 2,
                  width: 48,
                  height: 48
                }}
              >
                <BellIcon />
              </Avatar>
            </Badge>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                Notification Center
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {unreadCount} unread notifications
                {highPriorityCount > 0 && `, ${highPriorityCount} high priority`}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              onClick={() => setShowTemplates(true)}
              variant="outlined"
              size="small"
              sx={{
                borderColor: '#d1d5db',
                color: '#374151',
                '&:hover': {
                  borderColor: '#9ca3af',
                  bgcolor: '#f9fafb'
                }
              }}
            >
              Templates
            </Button>
            <IconButton
              onClick={() => setShowSettings(true)}
              sx={{ color: '#6b7280', '&:hover': { color: '#374151' } }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Filter and Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon sx={{ color: '#6b7280', fontSize: '1rem' }} />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d1d5db'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#9ca3af'
                  }
                }}
              >
                <MenuItem value="all">All Notifications</MenuItem>
                <MenuItem value="unread">Unread Only</MenuItem>
                <MenuItem value="high_priority">High Priority</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          {unreadCount > 0 && (
            <Button
              onClick={markAllAsRead}
              variant="text"
              sx={{
                color: '#1e40af',
                '&:hover': { color: '#1e3a8a' },
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Mark all as read
            </Button>
          )}
        </Box>

        {/* Notifications List */}
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Grid container spacing={1}>
            {filteredNotifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <Grid item xs={12} key={notification.id}>
                  <Fade in timeout={300}>
                    <Card
                      elevation={notification.read ? 0 : 1}
                      sx={{
                        borderLeft: `4px solid ${getPriorityBorderColor(notification.priority, notification.read)}`,
                        bgcolor: notification.read ? '#f9fafb' : '#ffffff',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexGrow: 1 }}>
                            <Avatar
                              sx={{
                                ...notification.color,
                                mr: 2,
                                width: 32,
                                height: 32
                              }}
                            >
                              <IconComponent sx={{ fontSize: '1rem' }} />
                            </Avatar>
                            
                            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  sx={{ 
                                    fontWeight: notification.read ? 500 : 600,
                                    color: notification.read ? '#6b7280' : '#1e293b'
                                  }}
                                >
                                  {notification.title}
                                </Typography>
                                {notification.priority === 'high' && !notification.read && (
                                  <Chip
                                    label="High Priority"
                                    size="small"
                                    sx={{
                                      bgcolor: '#fee2e2',
                                      color: '#991b1b',
                                      fontSize: '0.6875rem',
                                      height: 18
                                    }}
                                  />
                                )}
                                {notification.actionRequired && (
                                  <Chip
                                    label="Action Required"
                                    size="small"
                                    sx={{
                                      bgcolor: '#fed7aa',
                                      color: '#9a3412',
                                      fontSize: '0.6875rem',
                                      height: 18
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: notification.read ? '#9ca3af' : '#6b7280',
                                  mb: 1
                                }}
                              >
                                {notification.message}
                              </Typography>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <ClockIcon sx={{ fontSize: '0.75rem', mr: 0.5, color: '#9ca3af' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {formatTimeAgo(notification.timestamp)}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  {!notification.read && (
                                    <Button
                                      onClick={() => markAsRead(notification.id)}
                                      size="small"
                                      sx={{
                                        color: '#1e40af',
                                        '&:hover': { color: '#1e3a8a' },
                                        fontSize: '0.75rem',
                                        minWidth: 'auto',
                                        p: 0.5
                                      }}
                                    >
                                      Mark as read
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() => deleteNotification(notification.id)}
                                    size="small"
                                    sx={{
                                      color: '#dc2626',
                                      '&:hover': { color: '#b91c1c' },
                                      fontSize: '0.75rem',
                                      minWidth: 'auto',
                                      p: 0.5
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        {filteredNotifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <BellIcon sx={{ fontSize: '3rem', color: '#d1d5db', mb: 2 }} />
            <Typography color="text.secondary">No notifications found.</Typography>
          </Box>
        )}

        {/* Notification Settings Modal */}
        <Dialog
          open={showSettings}
          onClose={() => setShowSettings(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }
          }}
        >
          <DialogTitle sx={{ p: 3, pb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                Notification Settings
              </Typography>
              <IconButton onClick={() => setShowSettings(false)} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          
          <DialogContent sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Email Notifications"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="SMS Alerts"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Push Notifications"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Session Reminders"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Payment Alerts"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Achievement Notifications"
                  sx={{ '& .MuiFormControlLabel-label': { fontWeight: 500, color: '#374151' } }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="contained"
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
                    }
                  }}
                >
                  Save Settings
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => setShowSettings(false)}
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      bgcolor: '#f9fafb'
                    }
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>

      {/* Templates Modal */}
      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            minHeight: '500px'
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
              Notification Templates
            </Typography>
            <IconButton onClick={() => setShowTemplates(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Email Templates */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <MailIcon sx={{ mr: 1, color: '#3b82f6' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      Email Templates
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: '350px', overflowY: 'auto', pr: 1 }}>
                    {Object.entries(EMAIL_TEMPLATES).map(([key, template]) => (
                      <Card 
                        key={key}
                        sx={{ 
                          mb: 2,
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0',
                          '&:hover': {
                            bgcolor: '#f8fafc',
                            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setSelectedTemplate({ type: 'email', key, template })}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}
                          >
                            {template.subject}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ color: '#64748b', fontSize: '0.75rem' }}
                          >
                            {template.preview}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            {/* SMS Templates */}
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                border: '1px solid #e2e8f0',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <MessageSquareIcon sx={{ mr: 1, color: '#10b981' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                      SMS Templates
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: '350px', overflowY: 'auto', pr: 1 }}>
                    {Object.entries(SMS_TEMPLATES).map(([key, template]) => (
                      <Card 
                        key={key}
                        sx={{ 
                          mb: 2,
                          cursor: 'pointer',
                          border: '1px solid #e2e8f0',
                          '&:hover': {
                            bgcolor: '#f8fafc',
                            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)',
                            transform: 'translateY(-1px)'
                          },
                          transition: 'all 0.2s ease'
                        }}
                        onClick={() => setSelectedTemplate({ type: 'sms', key, template })}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textTransform: 'capitalize' }}
                          >
                            {key.replace('_', ' ')}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ color: '#64748b', fontSize: '0.75rem' }}
                          >
                            {template.substring(0, 100)}...
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Template Detail Modal */}
      <Dialog
        open={!!selectedTemplate}
        onClose={() => setSelectedTemplate(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
          }
        }}
      >
        <DialogTitle sx={{ p: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
              {selectedTemplate?.type === 'email' ? 'Email' : 'SMS'} Template
            </Typography>
            <IconButton onClick={() => setSelectedTemplate(null)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Template Name"
                value={selectedTemplate?.key.replace('_', ' ').toUpperCase() || ''}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: '#f8fafc'
                  }
                }}
              />
            </Grid>
            
            {selectedTemplate?.type === 'email' && (
              <Grid item xs={12}>
                <TextField
                  label="Subject"
                  value={selectedTemplate?.template?.subject || ''}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': { borderColor: '#3b82f6' },
                      '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                    }
                  }}
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <TextField
                label="Content"
                multiline
                rows={selectedTemplate?.type === 'email' ? 8 : 4}
                value={selectedTemplate?.type === 'email' ? selectedTemplate?.template?.template : selectedTemplate?.template || ''}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    '&:hover fieldset': { borderColor: '#3b82f6' },
                    '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                border: '1px solid #93c5fd'
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af', mb: 2 }}>
                    Available Variables:
                  </Typography>
                  <Grid container spacing={1}>
                    {[
                      { var: '{{studentName}}', desc: "Student's name" },
                      { var: '{{tutorName}}', desc: "Tutor's name" },
                      { var: '{{sessionTime}}', desc: "Session time" },
                      { var: '{{subject}}', desc: "Subject/topic" },
                      { var: '{{location}}', desc: "Session location" }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', py: 0.5 }}>
                          <Chip 
                            label={item.var}
                            size="small"
                            sx={{ 
                              fontFamily: 'monospace',
                              bgcolor: '#3b82f6',
                              color: 'white',
                              mr: 1,
                              minWidth: '120px'
                            }}
                          />
                          <Typography variant="body2" sx={{ color: '#1e40af', fontSize: '0.875rem' }}>
                            {item.desc}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                onClick={() => setSelectedTemplate(null)}
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
                  }
                }}
              >
                Save Template
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => setSelectedTemplate(null)}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#d1d5db',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#9ca3af',
                    bgcolor: '#f9fafb'
                  }
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
