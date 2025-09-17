import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { users as mockUsers } from '../data/mockData';
import Layout from '../components/layout/Layout';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  IconButton,
  Paper,
  Fade,
  Zoom,
  CircularProgress,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Rating
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  CalendarToday as CalendarTodayIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  CameraAlt as CameraAltIcon,
  Assessment as AssessmentIcon,
  Badge as BadgeIcon,
  SupervisorAccount as SupervisorAccountIcon,
  AdminPanelSettings as AdminPanelSettingsIcon
} from '@mui/icons-material';

const UserProfile = () => {
  const { user: currentUser, updateUser } = useContext(UserContext);
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Determine if viewing own profile or someone else's
  const isOwnProfile = !userId || userId === currentUser?.id?.toString();
  const canEdit = isOwnProfile || ['admin', 'coordinator'].includes(currentUser?.role);

  useEffect(() => {
    const loadProfile = async () => {
      setProfileLoading(true);
      try {
        if (isOwnProfile) {
          setProfileUser(currentUser);
          setEditData({ ...currentUser });
        } else {
          // Load other user's profile
          const targetUser = mockUsers.find(u => u.id === parseInt(userId));
          if (targetUser) {
            setProfileUser(targetUser);
            setEditData({ ...targetUser });
          } else {
            console.error('User not found');
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [userId, currentUser, isOwnProfile]);

  if (profileLoading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        </Container>
      </Layout>
    );
  }

  if (!profileUser) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error">Không tìm thấy thông tin người dùng</Alert>
        </Container>
      </Layout>
    );
  }

  const handleEdit = () => {
    if (!canEdit) return;
    setIsEditing(true);
    setEditData({ ...profileUser });
  };

  const handleSave = async () => {
    if (!canEdit) return;
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isOwnProfile) {
        updateUser(editData);
      } else {
        // Handle updating other user's profile (admin/coordinator action)
        console.log('Admin updating user data:', editData);
        setProfileUser(editData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...currentUser });
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'student': 'Sinh viên',
      'tutor': 'Tutor',
      'coordinator': 'Coordinator',
      'admin': 'Quản trị viên'
    };
    return roleMap[role] || role;
  };

  const renderStudentInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            MSSV
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editData.studentId || ''}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" fontWeight={500}>
              {profileUser.studentId}
            </Typography>
          )}
        </Box>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Năm học
          </Typography>
          {isEditing ? (
            <FormControl fullWidth size="small">
              <Select
                value={editData.year || ''}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
              >
                <MenuItem value={1}>Năm 1</MenuItem>
                <MenuItem value={2}>Năm 2</MenuItem>
                <MenuItem value={3}>Năm 3</MenuItem>
                <MenuItem value={4}>Năm 4</MenuItem>
                <MenuItem value={5}>Năm 5</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Typography variant="body1" fontWeight={500}>
              Năm {profileUser.year}
            </Typography>
          )}
        </Box>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Chuyên ngành
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editData.major || ''}
              onChange={(e) => handleInputChange('major', e.target.value)}
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" fontWeight={500}>
              {profileUser.major}
            </Typography>
          )}
        </Box>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            GPA
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              type="number"
              inputProps={{ step: 0.01, min: 0, max: 4.0 }}
              value={editData.gpa || ''}
              onChange={(e) => handleInputChange('gpa', parseFloat(e.target.value))}
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" fontWeight={500}>
              {profileUser.gpa}/4.0
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );

  const renderTutorInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Tutor ID
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {profileUser.studentId}
          </Typography>
        </Box>
      </Grid>
      
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Học phí
          </Typography>
          <Typography variant="body1" fontWeight={500} color="#1e40af">
            {profileUser.hourlyRate?.toLocaleString()} VNĐ/giờ
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Đánh giá
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating
              value={profileUser.rating || 0}
              precision={0.1}
              readOnly
              size="small"
              sx={{ color: '#ffc107' }}
            />
            <Typography variant="body1" fontWeight={500}>
              {profileUser.rating}/5.0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ({profileUser.reviewCount || 0} đánh giá)
            </Typography>
          </Box>
        </Box>
      </Grid>

      {profileUser.specialties && (
        <Grid item xs={12}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Chuyên môn
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {profileUser.specialties.map((specialty, index) => (
                <Chip
                  key={index}
                  label={specialty}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    color: '#1e40af',
                    fontWeight: 500
                  }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );

  const renderCoordinatorInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Staff ID
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {profileUser.employeeId}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Phòng ban
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {profileUser.department}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  const renderAdminInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Admin ID
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {profileUser.employeeId}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Phòng ban
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {profileUser.department}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );

  if (!currentUser) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Fade in={true}>
            <Card 
              elevation={8}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                background: 'white',
                border: '1px solid rgba(30, 64, 175, 0.1)'
              }}
            >
              <CircularProgress size={60} sx={{ color: '#1e40af', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Đang tải thông tin người dùng...
              </Typography>
            </Card>
          </Fade>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        sx={{
          minHeight: 'calc(100vh - 80px)',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          <Fade in={true} timeout={800}>
            <Grid container spacing={4}>
              {/* Profile Header Card - Left Side */}
              <Grid item xs={12} lg={4}>
                <Zoom in={true} timeout={600}>
                  <Card
                    elevation={12}
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(30, 64, 175, 0.1)',
                      overflow: 'visible',
                      position: 'relative',
                      height: 'fit-content',
                      minHeight: '600px', // Đảm bảo chiều cao tương đương 2 cards
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Avatar Section */}
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                          <Avatar
                            sx={{
                              width: 120,
                              height: 120,
                              fontSize: '3rem',
                              fontWeight: 700,
                              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                              border: '4px solid white',
                              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.3)',
                              mx: 'auto',
                              mb: 2
                            }}
                            src={profileUser.avatar}
                          >
                            {!profileUser.avatar && (profileUser.name?.charAt(0) || 'U')}
                          </Avatar>
                          <Tooltip title="Thay đổi ảnh đại diện">
                            <IconButton
                              sx={{
                                position: 'absolute',
                                bottom: 8,
                                right: 8,
                                backgroundColor: '#1e40af',
                                color: 'white',
                                width: 40,
                                height: 40,
                                '&:hover': {
                                  backgroundColor: '#1e3a8a',
                                  transform: 'scale(1.1)'
                                },
                                transition: 'all 0.2s ease-in-out'
                              }}
                              size="small"
                            >
                              <CameraAltIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        
                        <Typography 
                          variant="h5" 
                          fontWeight={700}
                          sx={{ 
                            color: '#1e40af',
                            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 1
                          }}
                        >
                          {profileUser.name}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 2 }}>
                          {profileUser.email}
                        </Typography>
                        
                        <Chip
                          label={getRoleDisplayName(profileUser.role)}
                          icon={
                            profileUser.role === 'student' ? <PersonIcon /> :
                            profileUser.role === 'tutor' ? <SchoolIcon /> :
                            profileUser.role === 'coordinator' ? <SupervisorAccountIcon /> :
                            <AdminPanelSettingsIcon />
                          }
                          sx={{
                            backgroundColor: '#1e40af',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            height: 36,
                            '& .MuiChip-icon': {
                              color: 'white'
                            }
                          }}
                        />
                      </Box>

                      <Divider sx={{ my: 3 }} />

                      {/* Quick Stats Section */}
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} color="#1e40af" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                          <AssessmentIcon sx={{ mr: 1 }} />
                          Thống kê nhanh
                        </Typography>
                        <Grid container spacing={2}>
                          {profileUser.role === 'student' && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    {profileUser.totalSessions || 0}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Buổi học
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    {profileUser.year || 1}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Năm học
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}
                          
                          {profileUser.role === 'tutor' && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    {profileUser.rating || 0}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Đánh giá
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    {profileUser.reviewCount || 0}
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Đánh giá
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}

                          {(profileUser.role === 'coordinator' || profileUser.role === 'admin') && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    50+
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Quản lý
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h5" fontWeight={700}>
                                    5+
                                  </Typography>
                                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                    Năm KN
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </Box>

                      <Divider sx={{ my: 3 }} />

                      {/* Quick Actions */}
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight={700} color="#1e40af" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                          <StarIcon sx={{ mr: 1 }} />
                          Hành động nhanh
                        </Typography>
                        <Stack spacing={2}>
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<EmailIcon />}
                            sx={{
                              borderColor: '#1e40af',
                              color: '#1e40af',
                              '&:hover': {
                                borderColor: '#1e3a8a',
                                backgroundColor: 'rgba(30, 64, 175, 0.04)'
                              }
                            }}
                          >
                            Gửi tin nhắn
                          </Button>
                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<CalendarTodayIcon />}
                            sx={{
                              borderColor: '#059669',
                              color: '#059669',
                              '&:hover': {
                                borderColor: '#047857',
                                backgroundColor: 'rgba(5, 150, 105, 0.04)'
                              }
                            }}
                          >
                            Xem lịch
                          </Button>
                        </Stack>
                      </Box>

                      {/* Spacer to push action buttons to bottom */}
                      <Box sx={{ flexGrow: 1 }} />

                      {/* Action Buttons */}
                      <Box sx={{ mt: 'auto' }}>
                        {!isEditing ? (
                          <Button
                            variant="contained"
                            fullWidth
                            startIcon={<EditIcon />}
                            onClick={handleEdit}
                            sx={{
                              backgroundColor: '#1e40af',
                              borderRadius: 2,
                              py: 1.5,
                              fontWeight: 600,
                              textTransform: 'none',
                              boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                              '&:hover': {
                                backgroundColor: '#1e3a8a',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(30, 64, 175, 0.4)'
                              },
                              transition: 'all 0.2s ease-in-out'
                            }}
                          >
                            Chỉnh sửa hồ sơ
                          </Button>
                        ) : (
                          <Stack spacing={1}>
                            <Button
                              variant="contained"
                              fullWidth
                              startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                              onClick={handleSave}
                              disabled={loading}
                              sx={{
                                backgroundColor: '#059669',
                                borderRadius: 2,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': {
                                  backgroundColor: '#047857'
                                }
                              }}
                            >
                              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                            <Button
                              variant="outlined"
                              fullWidth
                              startIcon={<CloseIcon />}
                              onClick={handleCancel}
                              disabled={loading}
                              sx={{
                                borderColor: '#dc2626',
                                color: '#dc2626',
                                borderRadius: 2,
                                py: 1.5,
                                fontWeight: 600,
                                textTransform: 'none',
                                '&:hover': {
                                  borderColor: '#b91c1c',
                                  backgroundColor: 'rgba(220, 38, 38, 0.04)'
                                }
                              }}
                            >
                              Hủy bỏ
                            </Button>
                          </Stack>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Zoom>
              </Grid>
              {/* Main Content Grid - Right Side */}
              <Grid item xs={12} lg={8}>
                <Stack spacing={3}>
                  {/* Contact Information Card */}
                  <Fade in={true} timeout={1000}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <EmailIcon sx={{ color: '#1e40af', mr: 2, fontSize: 28 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e40af">
                            Thông tin liên hệ
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Email
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  type="email"
                                  size="small"
                                  value={editData.email || ''}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: <EmailIcon sx={{ color: '#1e40af', mr: 1 }} />
                                  }}
                                />
                              ) : (
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.email}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Số điện thoại
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  type="tel"
                                  size="small"
                                  value={editData.phone || ''}
                                  onChange={(e) => handleInputChange('phone', e.target.value)}
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: <PhoneIcon sx={{ color: '#1e40af', mr: 1 }} />
                                  }}
                                />
                              ) : (
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.phone || 'Chưa cập nhật'}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Địa chỉ
                              </Typography>
                              {isEditing ? (
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={2}
                                  size="small"
                                  value={editData.address || ''}
                                  onChange={(e) => handleInputChange('address', e.target.value)}
                                  variant="outlined"
                                  InputProps={{
                                    startAdornment: <LocationOnIcon sx={{ color: '#1e40af', mr: 1, alignSelf: 'flex-start', mt: 0.5 }} />
                                  }}
                                />
                              ) : (
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.address || 'Chưa cập nhật'}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Fade>

                  {/* Role-specific Information Card */}
                  <Fade in={true} timeout={1200}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <SchoolIcon sx={{ color: '#1e40af', mr: 2, fontSize: 28 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e40af">
                            Thông tin chuyên môn
                          </Typography>
                        </Box>
                        
                        {profileUser.role === 'student' && renderStudentInfo()}
                        {profileUser.role === 'tutor' && renderTutorInfo()}
                        {profileUser.role === 'coordinator' && renderCoordinatorInfo()}
                        {profileUser.role === 'admin' && renderAdminInfo()}
                      </CardContent>
                    </Card>
                  </Fade>

                  {/* Additional Info Card */}
                  <Fade in={true} timeout={1400}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <MenuBookIcon sx={{ color: '#1e40af', mr: 2, fontSize: 28 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e40af">
                            Thông tin bổ sung
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Khoa
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {profileUser.faculty}
                              </Typography>
                            </Box>
                          </Grid>
                          
                          {profileUser.role === 'student' && (
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  MSSV
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.studentId}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          {profileUser.role === 'tutor' && (
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  Học phí
                                </Typography>
                                <Typography variant="body1" fontWeight={500} color="#1e40af">
                                  {profileUser.hourlyRate?.toLocaleString()} VNĐ/giờ
                                </Typography>
                              </Box>
                            </Grid>
                          )}

                          {(profileUser.role === 'coordinator' || profileUser.role === 'admin') && (
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                  ID nhân viên
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.employeeId}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Tham gia
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                Tháng 9, 2024
                              </Typography>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Trạng thái
                              </Typography>
                              <Chip
                                label="Hoạt động"
                                size="small"
                                sx={{
                                  backgroundColor: '#059669',
                                  color: 'white',
                                  fontWeight: 500
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Fade>
                </Stack>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  {/* Stats Card */}
                  <Fade in={true} timeout={1400}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <AssessmentIcon sx={{ color: '#1e40af', mr: 2, fontSize: 28 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e40af">
                            Thống kê
                          </Typography>
                        </Box>
                        
                        <Grid container spacing={2}>
                          {profileUser.role === 'student' && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    {profileUser.totalSessions || 0}
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Buổi học
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    {profileUser.year || 1}
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Năm học
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}
                          
                          {profileUser.role === 'tutor' && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    {profileUser.rating || 0}
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Đánh giá
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    {profileUser.reviewCount || 0}
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Đánh giá
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}

                          {(profileUser.role === 'coordinator' || profileUser.role === 'admin') && (
                            <>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    50+
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Quản lý
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper
                                  elevation={2}
                                  sx={{
                                    p: 2,
                                    textAlign: 'center',
                                    borderRadius: 2,
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    color: 'white'
                                  }}
                                >
                                  <Typography variant="h4" fontWeight={700}>
                                    5+
                                  </Typography>
                                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    Năm kinh nghiệm
                                  </Typography>
                                </Paper>
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Fade>

                  {/* Quick Info Card */}
                  <Fade in={true} timeout={1600}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(30, 64, 175, 0.15)'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <MenuBookIcon sx={{ color: '#1e40af', mr: 2, fontSize: 28 }} />
                          <Typography variant="h6" fontWeight={700} color="#1e40af">
                            Thông tin nhanh
                          </Typography>
                        </Box>
                        
                        <List sx={{ p: 0 }}>
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon>
                              <SchoolIcon sx={{ color: '#1e40af' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" color="text.secondary">
                                  Khoa
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body1" fontWeight={500}>
                                  {profileUser.faculty}
                                </Typography>
                              }
                            />
                          </ListItem>
                          
                          {profileUser.role === 'student' && (
                            <ListItem sx={{ px: 0, py: 1 }}>
                              <ListItemIcon>
                                <BadgeIcon sx={{ color: '#1e40af' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" color="text.secondary">
                                    MSSV
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body1" fontWeight={500}>
                                    {profileUser.studentId}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          )}
                          
                          {profileUser.role === 'tutor' && (
                            <ListItem sx={{ px: 0, py: 1 }}>
                              <ListItemIcon>
                                <EmojiEventsIcon sx={{ color: '#f59e0b' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" color="text.secondary">
                                    Học phí
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body1" fontWeight={500} color="#1e40af">
                                    {profileUser.hourlyRate?.toLocaleString()} VNĐ/giờ
                                  </Typography>
                                }
                              />
                            </ListItem>
                          )}

                          {(profileUser.role === 'coordinator' || profileUser.role === 'admin') && (
                            <ListItem sx={{ px: 0, py: 1 }}>
                              <ListItemIcon>
                                <BadgeIcon sx={{ color: '#1e40af' }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" color="text.secondary">
                                    ID nhân viên
                                  </Typography>
                                }
                                secondary={
                                  <Typography variant="body1" fontWeight={500}>
                                    {profileUser.employeeId}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          )}
                          
                          <ListItem sx={{ px: 0, py: 1 }}>
                            <ListItemIcon>
                              <CalendarTodayIcon sx={{ color: '#1e40af' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle2" color="text.secondary">
                                  Tham gia
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body1" fontWeight={500}>
                                  Tháng 9, 2024
                                </Typography>
                              }
                            />
                          </ListItem>
                        </List>
                      </CardContent>
                    </Card>
                  </Fade>
                </Stack>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>
    </Layout>
  );
};

export default UserProfile;
