import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Schedule as ClockIcon,
  Person as UserIcon,
  LocationOn as MapPinIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { sessions, timeSlots } from '../../data/mockData';
import BookingModal from './BookingModal';

const WeeklyCalendar = ({ tutorId = null, viewMode = 'tutor' }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const theme = useTheme();

  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';
  const accentColor = '#1e293b';

  // Get start of current week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  // Filter sessions for current week and tutor (if specified)
  const weekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const isInWeek = sessionDate >= weekStart && 
                     sessionDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    return isInWeek && (tutorId ? session.tutorId === tutorId : true);
  });

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const getSessionsForDay = (day) => {
    return weekSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.toDateString() === day.toDateString();
    });
  };

  const handleTimeSlotClick = (day, timeSlot) => {
    setSelectedTimeSlot({
      date: day,
      time: timeSlot,
      tutorId: tutorId
    });
    setIsBookingModalOpen(true);
  };

  const getTimeSlotStatus = (day, timeSlot) => {
    const daySessions = getSessionsForDay(day);
    const session = daySessions.find(s => s.time === timeSlot);
    
    if (session) {
      switch (session.status) {
        case 'confirmed': 
          return {
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            borderColor: theme.palette.success.main,
            color: theme.palette.success.dark,
            cursor: 'pointer'
          };
        case 'pending': 
          return {
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            borderColor: theme.palette.warning.main,
            color: theme.palette.warning.dark,
            cursor: 'pointer'
          };
        case 'cancelled': 
          return {
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            borderColor: theme.palette.error.main,
            color: theme.palette.error.dark,
            cursor: 'default'
          };
        default: 
          return {
            backgroundColor: alpha(theme.palette.grey[400], 0.1),
            borderColor: theme.palette.grey[400],
            color: theme.palette.grey[700],
            cursor: 'default'
          };
      }
    }
    
    // Check if time slot is available for booking
    const now = new Date();
    const slotDateTime = new Date(day);
    const [hours, minutes] = timeSlot.split(':');
    slotDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    if (slotDateTime < now) {
      return {
        backgroundColor: alpha(theme.palette.grey[300], 0.3),
        borderColor: theme.palette.grey[300],
        color: theme.palette.grey[500],
        cursor: 'not-allowed'
      };
    }
    
    return {
      backgroundColor: '#ffffff',
      borderColor: theme.palette.grey[300],
      color: theme.palette.text.primary,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: alpha(primaryColor, 0.05),
        borderColor: primaryColor,
      }
    };
  };

  return (
    <Paper 
      sx={{ 
        borderRadius: 3, 
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <Box sx={{ p: 3 }}>
        {/* Calendar Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5" fontWeight="bold" color={primaryColor}>
              {viewMode === 'tutor' ? '📅 Lịch Dạy' : '📚 Lịch Học'}
            </Typography>
            <Chip
              label={`${weekStart.toLocaleDateString('vi-VN')} - ${
                new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')
              }`}
              sx={{
                backgroundColor: alpha(primaryColor, 0.1),
                color: primaryColor,
                fontWeight: 500,
              }}
            />
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              onClick={() => navigateWeek(-1)}
              sx={{
                backgroundColor: alpha(primaryColor, 0.1),
                color: primaryColor,
                '&:hover': { backgroundColor: alpha(primaryColor, 0.2) },
              }}
            >
              <ChevronLeft />
            </IconButton>
            
            <Button
              onClick={() => setCurrentWeek(new Date())}
              variant="contained"
              startIcon={<TodayIcon />}
              sx={{
                backgroundColor: primaryColor,
                '&:hover': { backgroundColor: secondaryColor },
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              Hôm nay
            </Button>
            
            <IconButton
              onClick={() => navigateWeek(1)}
              sx={{
                backgroundColor: alpha(primaryColor, 0.1),
                color: primaryColor,
                '&:hover': { backgroundColor: alpha(primaryColor, 0.2) },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        {/* Calendar Grid */}
        <Paper sx={{ overflow: 'hidden', border: 1, borderColor: 'divider' }}>
          <Grid container>
            {/* Time column header */}
            <Grid item xs={1.5}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: alpha(primaryColor, 0.05),
                  borderBottom: 1,
                  borderColor: 'divider',
                  textAlign: 'center',
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold" color={primaryColor}>
                  Giờ
                </Typography>
              </Box>
            </Grid>
            
            {/* Day headers */}
            {weekDays.map((day, index) => (
              <Grid item xs={1.5} key={day.toISOString()}>
                <Box
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderBottom: 1,
                    borderLeft: 1,
                    borderColor: 'divider',
                    backgroundColor: alpha(primaryColor, 0.05),
                  }}
                >
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {dayNames[index]}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color={primaryColor}>
                    {day.getDate()}
                  </Typography>
                </Box>
              </Grid>
            ))}

            {/* Time slots */}
            {timeSlots.map(timeSlot => (
              <Grid container key={timeSlot}>
                {/* Time label */}
                <Grid item xs={1.5}>
                  <Box
                    sx={{
                      p: 1.5,
                      textAlign: 'center',
                      borderBottom: 1,
                      borderColor: 'divider',
                      backgroundColor: alpha(theme.palette.grey[50], 0.5),
                      minHeight: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                      {timeSlot}
                    </Typography>
                  </Box>
                </Grid>
                
                {/* Day cells */}
                {weekDays.map(day => {
                  const daySessions = getSessionsForDay(day);
                  const session = daySessions.find(s => s.time === timeSlot);
                  const slotStyle = getTimeSlotStatus(day, timeSlot);
                  
                  return (
                    <Grid item xs={1.5} key={`${day.toISOString()}-${timeSlot}`}>
                      <Box
                        sx={{
                          p: 1,
                          minHeight: 80,
                          borderLeft: 1,
                          borderBottom: 1,
                          borderColor: 'divider',
                          cursor: slotStyle.cursor,
                          ...slotStyle,
                          '&:hover': slotStyle['&:hover'],
                        }}
                        onClick={() => !session && slotStyle.cursor === 'pointer' && handleTimeSlotClick(day, timeSlot)}
                      >
                        {session && (
                          <Card
                            sx={{
                              backgroundColor: 'transparent',
                              boxShadow: 'none',
                              height: '100%',
                            }}
                          >
                            <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                              <Typography
                                variant="caption"
                                fontWeight="bold"
                                sx={{
                                  display: 'block',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  mb: 0.5,
                                }}
                              >
                                {viewMode === 'tutor' ? session.studentName : session.subject}
                              </Typography>
                              
                              <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
                                <ClockIcon sx={{ fontSize: 12 }} />
                                <Typography variant="caption">
                                  {session.duration}p
                                </Typography>
                              </Box>
                              
                              {session.location && (
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <MapPinIcon sx={{ fontSize: 12 }} />
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                    }}
                                  >
                                    {session.location}
                                  </Typography>
                                </Box>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Legend */}
        <Box mt={3} display="flex" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: alpha(theme.palette.success.main, 0.2),
                border: 1,
                borderColor: theme.palette.success.main,
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Đã xác nhận</Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: alpha(theme.palette.warning.main, 0.2),
                border: 1,
                borderColor: theme.palette.warning.main,
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Chờ xác nhận</Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: alpha(theme.palette.error.main, 0.2),
                border: 1,
                borderColor: theme.palette.error.main,
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Đã hủy</Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: '#ffffff',
                border: 1,
                borderColor: theme.palette.grey[300],
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Có thể đặt</Typography>
          </Box>
          
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 16,
                height: 16,
                backgroundColor: alpha(theme.palette.grey[300], 0.3),
                border: 1,
                borderColor: theme.palette.grey[300],
                borderRadius: 1,
              }}
            />
            <Typography variant="body2">Đã qua</Typography>
          </Box>
        </Box>
      </Box>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          timeSlot={selectedTimeSlot}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={(bookingData) => {
            // Handle booking confirmation
            console.log('Booking confirmed:', bookingData);
            setIsBookingModalOpen(false);
          }}
        />
      )}
    </Paper>
  );
};

export default WeeklyCalendar;
