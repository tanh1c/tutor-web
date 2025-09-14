import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  Fade,
  Zoom,
  Stack,
  Rating,
  Tooltip,
  Tab,
  Tabs,
  Badge,
  Alert
} from '@mui/material';
import {
  Star as StarIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarTodayIcon,
  Message as MessageIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  School as SchoolIcon,
  EmojiEvents as EmojiEventsIcon,
  Language as LanguageIcon,
  MenuBook as MenuBookIcon,
  ArrowBack as ArrowBackIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import Layout from '../components/layout/Layout';
import WeeklyCalendar from '../components/scheduling/WeeklyCalendar';
import { users as mockUsers, subjects, reviews } from '../data/mockData';

const TutorProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
  const tutor = mockUsers.find(user => user.id === parseInt(id) && user.role === 'tutor');
  const tutorReviews = reviews.filter(review => review.tutorId === parseInt(id));

  if (!tutor) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutor không tồn tại</h1>
            <Link 
              to="/tutors" 
              className="text-hcmut-blue hover:text-blue-700"
            >
              Quay lại trang tìm kiếm
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const renderStars = (rating) => {
    return (
      <Rating
        value={rating}
        precision={0.1}
        readOnly
        size="small"
        sx={{ color: '#ffc107' }}
      />
    );
  };

  const getAvailabilitySchedule = () => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    
    return days.map((day, index) => ({
      day: dayNames[index],
      slots: tutor.availability?.[day] || []
    })).filter(item => item.slots.length > 0);
  };

  const getAvailableTimeSlotsForDate = (date) => {
    const dayIndex = date.day();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayKey = days[dayIndex];
    return tutor.availability?.[dayKey] || [];
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleBookSession = () => {
    if (selectedDate && selectedTimeSlot) {
      alert(`Đặt lịch thành công cho ${selectedDate.format('DD/MM/YYYY')} lúc ${selectedTimeSlot}`);
    }
  };

  const tabs = [
    { key: 'overview', label: 'Tổng quan', icon: <MenuBookIcon /> },
    { key: 'schedule', label: 'Lịch học', icon: <ScheduleIcon /> },
    { key: 'reviews', label: 'Đánh giá', icon: <StarIcon /> },
    { key: 'contact', label: 'Liên hệ', icon: <EmailIcon /> }
  ];

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          py: 4
        }}
      >
        <Container maxWidth="lg">
          {/* Back Button */}
          <Fade in={true} timeout={800}>
            <Box sx={{ mb: 3 }}>
              <Button
                component={Link}
                to="/tutors"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateX(-4px)'
                  },
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                Quay lại tìm kiếm
              </Button>
            </Box>
          </Fade>

          {/* Profile Header */}
          <Fade in={true} timeout={1000}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                mb: 4,
                overflow: 'visible',
                position: 'relative'
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Grid container spacing={4} alignItems="flex-start">
                  {/* Avatar and Basic Info */}
                  <Grid item xs={12} lg={3}>
                    <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                      <Zoom in={true} timeout={1200}>
                        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                          <Avatar
                            src={tutor.avatar}
                            alt={tutor.name}
                            sx={{
                              width: 140,
                              height: 140,
                              border: '4px solid white',
                              boxShadow: '0 8px 32px rgba(30, 64, 175, 0.3)',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 12px 40px rgba(30, 64, 175, 0.4)'
                              }
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              right: 0,
                              width: 24,
                              height: 24,
                              backgroundColor: '#059669',
                              borderRadius: '50%',
                              border: '3px solid white',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                            }}
                          />
                        </Box>
                      </Zoom>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', lg: 'flex-start' }, gap: 1, mb: 1 }}>
                        {renderStars(tutor.rating)}
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                          {tutor.rating} ({tutor.reviewCount} đánh giá)
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Main Info */}
                  <Grid item xs={12} lg={6}>
                    <Box>
                      <Typography variant="h3" fontWeight={800} color="#1e40af" gutterBottom>
                        {tutor.name}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {tutor.faculty}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {tutor.major} - Năm {tutor.year} | GPA: {tutor.gpa}
                      </Typography>
                      
                      {/* Quick Stats */}
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {[
                          { label: 'Kinh nghiệm', value: tutor.experience, icon: <EmojiEventsIcon /> },
                          { label: 'Giá/giờ', value: formatPrice(tutor.hourlyRate), icon: <AttachMoneyIcon /> },
                          { label: 'Học sinh', value: tutor.reviewCount, icon: <SchoolIcon /> },
                          { label: 'Chuyên môn', value: tutor.specialties?.length || 0, icon: <MenuBookIcon /> }
                        ].map((stat, index) => (
                          <Grid item xs={6} sm={3} key={index}>
                            <Paper
                              elevation={2}
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(30, 64, 175, 0.1) 100%)',
                                border: '1px solid rgba(30, 64, 175, 0.1)',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: '0 8px 25px rgba(30, 64, 175, 0.15)'
                                }
                              }}
                            >
                              <Box sx={{ color: '#1e40af', mb: 1 }}>
                                {stat.icon}
                              </Box>
                              <Typography variant="h6" fontWeight={700} color="#1e40af">
                                {stat.value}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {stat.label}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>

                  {/* Action Buttons */}
                  <Grid item xs={12} lg={3}>
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CalendarTodayIcon />}
                        sx={{
                          backgroundColor: '#1e40af',
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
                          '&:hover': {
                            backgroundColor: '#1e3a8a',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 25px rgba(30, 64, 175, 0.4)'
                          },
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        Đặt lịch học
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<MessageIcon />}
                        sx={{
                          borderColor: '#1e40af',
                          color: '#1e40af',
                          borderRadius: 3,
                          py: 1.5,
                          fontWeight: 600,
                          textTransform: 'none',
                          borderWidth: 2,
                          '&:hover': {
                            borderColor: '#1e40af',
                            backgroundColor: 'rgba(30, 64, 175, 0.05)',
                            transform: 'translateY(-2px)',
                            borderWidth: 2
                          },
                          transition: 'all 0.3s ease-in-out'
                        }}
                      >
                        Nhắn tin
                      </Button>
                      
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Tooltip title={isFavorite ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}>
                          <IconButton
                            onClick={() => setIsFavorite(!isFavorite)}
                            sx={{
                              backgroundColor: isFavorite ? 'rgba(244, 63, 94, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                              color: isFavorite ? '#f43f5e' : '#6b7280',
                              border: '2px solid',
                              borderColor: isFavorite ? '#f43f5e' : '#d1d5db',
                              '&:hover': {
                                backgroundColor: isFavorite ? 'rgba(244, 63, 94, 0.2)' : 'rgba(244, 63, 94, 0.1)',
                                color: '#f43f5e',
                                borderColor: '#f43f5e',
                                transform: 'scale(1.05)'
                              },
                              transition: 'all 0.3s ease-in-out'
                            }}
                          >
                            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Chia sẻ">
                          <IconButton
                            sx={{
                              backgroundColor: 'rgba(156, 163, 175, 0.1)',
                              color: '#6b7280',
                              border: '2px solid #d1d5db',
                              '&:hover': {
                                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                color: '#1e40af',
                                borderColor: '#1e40af',
                                transform: 'scale(1.05)'
                              },
                              transition: 'all 0.3s ease-in-out'
                            }}
                          >
                            <ShareIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>

                {/* Bio */}
                <Divider sx={{ my: 4, borderColor: 'rgba(30, 64, 175, 0.1)' }} />
                <Box>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      fontStyle: 'italic'
                    }}
                  >
                    {tutor.bio}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>

          {/* Tabs and Content */}
          <Fade in={true} timeout={1200}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                overflow: 'hidden'
              }}
            >
              {/* Tab Navigation */}
              <Box sx={{ borderBottom: 1, borderColor: 'rgba(30, 64, 175, 0.1)' }}>
                <Tabs
                  value={tabs.findIndex(tab => tab.key === activeTab)}
                  onChange={(e, newValue) => setActiveTab(tabs[newValue].key)}
                  variant="fullWidth"
                  sx={{
                    '& .MuiTab-root': {
                      color: '#6b7280',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      py: 3,
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        color: '#1e40af',
                        backgroundColor: 'rgba(30, 64, 175, 0.05)'
                      }
                    },
                    '& .Mui-selected': {
                      color: '#059669 !important',
                      fontWeight: 700,
                      backgroundColor: 'rgba(5, 150, 105, 0.1)'
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: '#059669',
                      height: 3,
                      borderRadius: '3px 3px 0 0'
                    }
                  }}
                >
                  {tabs.map((tab, index) => (
                    <Tab
                      key={tab.key}
                      label={tab.label}
                      icon={tab.icon}
                      iconPosition="start"
                    />
                  ))}
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ p: 4 }}>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <Stack spacing={4}>
                    {/* Specialties */}
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MenuBookIcon />
                        Chuyên môn
                      </Typography>
                      <Grid container spacing={2}>
                        {tutor.specialties?.map((specialty, index) => (
                          <Grid item key={index}>
                            <Chip
                              label={specialty}
                              sx={{
                                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                color: '#1e40af',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                py: 2,
                                px: 1,
                                '&:hover': {
                                  backgroundColor: 'rgba(30, 64, 175, 0.2)',
                                  transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease-in-out'
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>

                    {/* Languages */}
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LanguageIcon />
                        Ngôn ngữ
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {tutor.languages?.map((language, index) => (
                          <Chip
                            key={index}
                            label={language}
                            variant="outlined"
                            sx={{
                              borderColor: '#d1d5db',
                              color: '#374151',
                              fontWeight: 500,
                              '&:hover': {
                                borderColor: '#1e40af',
                                color: '#1e40af',
                                backgroundColor: 'rgba(30, 64, 175, 0.05)'
                              },
                              transition: 'all 0.3s ease-in-out'
                            }}
                          />
                        ))}
                      </Stack>
                    </Box>

                    {/* Academic Info */}
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SchoolIcon />
                        Thông tin học tập
                      </Typography>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 3,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%)',
                          border: '1px solid rgba(30, 64, 175, 0.1)'
                        }}
                      >
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                Khoa
                              </Typography>
                              <Typography variant="body1" fontWeight={600} color="#1f2937">
                                {tutor.faculty}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                Chuyên ngành
                              </Typography>
                              <Typography variant="body1" fontWeight={600} color="#1f2937">
                                {tutor.major}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                Năm học
                              </Typography>
                              <Typography variant="body1" fontWeight={600} color="#1f2937">
                                Năm {tutor.year}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary" gutterBottom fontWeight={600}>
                                GPA
                              </Typography>
                              <Typography variant="body1" fontWeight={600} color="#1e40af">
                                {tutor.gpa}/4.0
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Box>
                  </Stack>
                )}

                {/* Schedule Tab */}
                {activeTab === 'schedule' && (
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
                    <Box>
                      <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
                        <ScheduleIcon />
                        Lịch trống & Đặt lịch
                      </Typography>
                      
                      <Grid container spacing={4}>
                        {/* Calendar Section */}
                        <Grid item xs={12} md={6}>
                          <Paper
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
                                boxShadow: '0 16px 40px rgba(30, 64, 175, 0.2)'
                              }
                            }}
                          >
                            <Box sx={{ 
                              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                              p: 3,
                              color: 'white'
                            }}>
                              <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CalendarTodayIcon />
                                Chọn ngày học
                              </Typography>
                            </Box>
                            
                            <Box sx={{ p: 3 }}>
                              <DateCalendar
                                value={selectedDate}
                                onChange={handleDateChange}
                                disablePast
                                sx={{
                                  width: '100%',
                                  '& .MuiPickersCalendarHeader-root': {
                                    color: '#1e40af',
                                    '& .MuiPickersArrowSwitcher-button': {
                                      color: '#1e40af',
                                      '&:hover': {
                                        backgroundColor: 'rgba(30, 64, 175, 0.1)'
                                      }
                                    }
                                  },
                                  '& .MuiDayCalendar-weekDayLabel': {
                                    color: '#6b7280',
                                    fontWeight: 600
                                  },
                                  '& .MuiPickersDay-root': {
                                    color: '#374151',
                                    fontWeight: 500,
                                    '&:hover': {
                                      backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                      color: '#1e40af'
                                    },
                                    '&.Mui-selected': {
                                      backgroundColor: '#1e40af !important',
                                      color: 'white',
                                      fontWeight: 700,
                                      '&:hover': {
                                        backgroundColor: '#1e3a8a !important'
                                      }
                                    },
                                    '&.MuiPickersDay-today': {
                                      border: '2px solid #1e40af',
                                      fontWeight: 600
                                    }
                                  }
                                }}
                              />
                            </Box>
                          </Paper>
                        </Grid>

                        {/* Time Slots Section */}
                        <Grid item xs={12} md={6}>
                          <Paper
                            elevation={8}
                            sx={{
                              borderRadius: 4,
                              overflow: 'hidden',
                              background: 'rgba(255, 255, 255, 0.95)',
                              backdropFilter: 'blur(20px)',
                              border: '1px solid rgba(30, 64, 175, 0.1)',
                              height: 'fit-content',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 16px 40px rgba(30, 64, 175, 0.2)'
                              }
                            }}
                          >
                            <Box sx={{ 
                              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                              p: 3,
                              color: 'white'
                            }}>
                              <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTimeIcon />
                                Khung giờ trống
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                                {selectedDate.format('dddd, DD/MM/YYYY')}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ p: 3 }}>
                              {(() => {
                                const availableSlots = getAvailableTimeSlotsForDate(selectedDate);
                                return availableSlots.length > 0 ? (
                                  <Grid container spacing={2}>
                                    {availableSlots.map((slot, index) => (
                                      <Grid item xs={6} key={index}>
                                        <Button
                                          variant={selectedTimeSlot === slot ? "contained" : "outlined"}
                                          fullWidth
                                          onClick={() => handleTimeSlotSelect(slot)}
                                          sx={{
                                            borderRadius: 3,
                                            py: 1.5,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            transition: 'all 0.3s ease-in-out',
                                            ...(selectedTimeSlot === slot ? {
                                              backgroundColor: '#1e40af',
                                              boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
                                              '&:hover': {
                                                backgroundColor: '#1e3a8a',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 25px rgba(30, 64, 175, 0.4)'
                                              }
                                            } : {
                                              borderColor: '#1e40af',
                                              color: '#1e40af',
                                              borderWidth: 2,
                                              '&:hover': {
                                                borderColor: '#1e40af',
                                                backgroundColor: 'rgba(30, 64, 175, 0.05)',
                                                transform: 'translateY(-2px)',
                                                borderWidth: 2
                                              }
                                            })
                                          }}
                                        >
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AccessTimeIcon fontSize="small" />
                                            {slot}
                                          </Box>
                                        </Button>
                                      </Grid>
                                    ))}
                                  </Grid>
                                ) : (
                                  <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <EventIcon sx={{ fontSize: 48, color: '#d1d5db', mb: 2 }} />
                                    <Typography variant="body1" color="text.secondary">
                                      Không có lịch trống cho ngày này
                                    </Typography>
                                  </Box>
                                );
                              })()}
                              
                              {selectedTimeSlot && (
                                <Box sx={{ mt: 3 }}>
                                  <Alert 
                                    icon={<CheckCircleIcon />}
                                    severity="success"
                                    sx={{ 
                                      borderRadius: 3,
                                      backgroundColor: 'rgba(5, 150, 105, 0.1)',
                                      border: '1px solid rgba(5, 150, 105, 0.2)',
                                      '& .MuiAlert-icon': {
                                        color: '#059669'
                                      }
                                    }}
                                  >
                                    <Typography variant="body2" fontWeight={600}>
                                      Đã chọn: {selectedDate.format('DD/MM/YYYY')} lúc {selectedTimeSlot}
                                    </Typography>
                                  </Alert>
                                  
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={handleBookSession}
                                    startIcon={<CalendarTodayIcon />}
                                    sx={{
                                      mt: 2,
                                      borderRadius: 3,
                                      py: 1.5,
                                      fontWeight: 700,
                                      textTransform: 'none',
                                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                      boxShadow: '0 4px 20px rgba(5, 150, 105, 0.3)',
                                      '&:hover': {
                                        background: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
                                        transform: 'translateY(-2px)',
                                        boxShadow: '0 6px 25px rgba(5, 150, 105, 0.4)'
                                      },
                                      transition: 'all 0.3s ease-in-out'
                                    }}
                                  >
                                    Xác nhận đặt lịch
                                  </Button>
                                </Box>
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                      
                      {/* Weekly Schedule Overview */}
                      <Box sx={{ mt: 6 }}>
                        <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <EventIcon />
                          Lịch trống hàng tuần
                        </Typography>
                        <Grid container spacing={3}>
                          {getAvailabilitySchedule().map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                              <Paper
                                elevation={6}
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
                                <Box sx={{ 
                                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                  p: 2,
                                  color: 'white'
                                }}>
                                  <Typography variant="h6" fontWeight={700} textAlign="center">
                                    {item.day}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ p: 3 }}>
                                  <Stack spacing={1.5}>
                                    {item.slots.map((slot, slotIndex) => (
                                      <Chip
                                        key={slotIndex}
                                        label={slot}
                                        icon={<AccessTimeIcon />}
                                        sx={{
                                          backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                          color: '#1e40af',
                                          fontWeight: 600,
                                          borderRadius: 2,
                                          py: 2,
                                          '&:hover': {
                                            backgroundColor: 'rgba(30, 64, 175, 0.2)',
                                            transform: 'scale(1.02)'
                                          },
                                          transition: 'all 0.3s ease-in-out'
                                        }}
                                      />
                                    ))}
                                  </Stack>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                        
                        {getAvailabilitySchedule().length === 0 && (
                          <Paper
                            elevation={4}
                            sx={{
                              p: 6,
                              textAlign: 'center',
                              borderRadius: 4,
                              background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.05) 0%, rgba(156, 163, 175, 0.1) 100%)',
                              border: '1px solid rgba(156, 163, 175, 0.2)'
                            }}
                          >
                            <EventIcon sx={{ fontSize: 64, color: '#d1d5db', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" fontWeight={600}>
                              Tutor chưa cập nhật lịch trống
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Vui lòng liên hệ trực tiếp để biết thêm thông tin về lịch học
                            </Typography>
                          </Paper>
                        )}
                      </Box>
                    </Box>
                  </LocalizationProvider>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <StarIcon />
                      Đánh giá từ học sinh
                    </Typography>
                    <Stack spacing={3}>
                      {tutorReviews.map((review) => {
                        const subject = subjects.find(s => s.id === review.subjectId);
                        return (
                          <Paper
                            key={review.id}
                            elevation={3}
                            sx={{
                              p: 4,
                              borderRadius: 3,
                              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%)',
                              border: '1px solid rgba(30, 64, 175, 0.1)',
                              transition: 'all 0.3s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 25px rgba(30, 64, 175, 0.15)'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                              <Avatar
                                sx={{
                                  backgroundColor: '#1e40af',
                                  color: 'white',
                                  width: 48,
                                  height: 48,
                                  fontWeight: 600,
                                  fontSize: '1.1rem'
                                }}
                              >
                                {review.studentId}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                  {renderStars(review.rating)}
                                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                    {review.rating}/5.0
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  {subject?.name} • {new Date(review.date).toLocaleDateString('vi-VN')}
                                </Typography>
                              </Box>
                            </Box>
                            <Typography variant="body1" color="#374151" sx={{ lineHeight: 1.7, fontStyle: 'italic' }}>
                              "{review.comment}"
                            </Typography>
                          </Paper>
                        );
                      })}
                      {tutorReviews.length === 0 && (
                        <Paper
                          elevation={1}
                          sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 3,
                            backgroundColor: '#f9fafb'
                          }}
                        >
                          <Typography variant="body1" color="text.secondary">
                            Chưa có đánh giá nào
                          </Typography>
                        </Paper>
                      )}
                    </Stack>
                  </Box>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <EmailIcon />
                      Thông tin liên hệ
                    </Typography>
                    <Paper
                      elevation={3}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%)',
                        border: '1px solid rgba(30, 64, 175, 0.1)'
                      }}
                    >
                      <Stack spacing={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: 'rgba(30, 64, 175, 0.1)',
                              color: '#1e40af',
                              p: 1.5,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <EmailIcon />
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Email
                            </Typography>
                            <Typography variant="body1" fontWeight={600} color="#1f2937">
                              {tutor.email}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: 'rgba(30, 64, 175, 0.1)',
                              color: '#1e40af',
                              p: 1.5,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <PhoneIcon />
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Số điện thoại
                            </Typography>
                            <Typography variant="body1" fontWeight={600} color="#1f2937">
                              {tutor.phone}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: 'rgba(30, 64, 175, 0.1)',
                              color: '#1e40af',
                              p: 1.5,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <LocationOnIcon />
                          </Box>
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                              Khoa
                            </Typography>
                            <Typography variant="body1" fontWeight={600} color="#1f2937">
                              {tutor.faculty}
                            </Typography>
                          </Box>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>
                )}
              </Box>
            </Card>
          </Fade>
        </Container>
      </Box>
    </Layout>
  );
};

export default TutorProfilePage;
