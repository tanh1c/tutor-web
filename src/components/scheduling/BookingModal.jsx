import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Avatar,
  Alert,
  FormHelperText,
  alpha,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  Schedule as ClockIcon,
  LocationOn as MapPinIcon,
  Person as UserIcon,
  AttachMoney as DollarSignIcon,
  School as BookOpenIcon
} from '@mui/icons-material';
import { users, rooms } from '../../data/mockData';

const BookingModal = ({ timeSlot, onClose, onConfirm }) => {
  const theme = useTheme();
  const primaryColor = '#1e3a8a';
  
  const [bookingData, setBookingData] = useState({
    subject: '',
    duration: 60,
    location: '',
    notes: '',
    sessionType: 'online',
    roomId: ''
  });

  const [errors, setErrors] = useState({});

  // Get tutor info
  const tutor = users.find(t => t.id === timeSlot?.tutorId && t.role === 'tutor');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!bookingData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập môn học';
    }
    if (!bookingData.duration || bookingData.duration < 30) {
      newErrors.duration = 'Thời lượng tối thiểu 30 phút';
    }
    if (bookingData.sessionType === 'offline' && !bookingData.location.trim() && !bookingData.roomId) {
      newErrors.location = 'Vui lòng chọn địa điểm học';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate price
    const pricePerHour = tutor?.hourlyRate || 150000;
    const totalPrice = (pricePerHour * bookingData.duration) / 60;

    const finalBookingData = {
      ...bookingData,
      date: timeSlot.date,
      time: timeSlot.time,
      tutorId: timeSlot.tutorId,
      tutorName: tutor?.name,
      totalPrice,
      status: 'pending'
    };

    onConfirm(finalBookingData);
  };

  const durationOptions = [
    { value: 30, label: '30 phút' },
    { value: 60, label: '1 giờ' },
    { value: 90, label: '1.5 giờ' },
    { value: 120, label: '2 giờ' },
    { value: 150, label: '2.5 giờ' },
    { value: 180, label: '3 giờ' }
  ];

  const calculatePrice = () => {
    const pricePerHour = tutor?.hourlyRate || 150000;
    return (pricePerHour * bookingData.duration) / 60;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (!timeSlot) return null;

  return (
    <Dialog
      open={!!timeSlot}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ 
        p: 3, 
        borderBottom: 1, 
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" fontWeight="bold" color={primaryColor}>
          Đặt lịch học
        </Typography>
        <Button
          onClick={onClose}
          sx={{ 
            minWidth: 'auto',
            p: 1,
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: alpha(theme.palette.grey[500], 0.1),
            }
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Tutor Info */}
          {tutor && (
            <Card sx={{ 
              backgroundColor: alpha(primaryColor, 0.05),
              borderRadius: 2,
              border: `1px solid ${alpha(primaryColor, 0.1)}`
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src={tutor.avatar}
                    alt={tutor.name}
                    sx={{ width: 56, height: 56 }}
                  />
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                      {tutor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {tutor.department}
                    </Typography>
                    <Chip
                      label={`${formatCurrency(tutor.hourlyRate)}/giờ`}
                      size="small"
                      sx={{
                        backgroundColor: primaryColor,
                        color: 'white',
                        fontWeight: 500,
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Time Info */}
          <Paper sx={{ 
            p: 3, 
            backgroundColor: alpha(theme.palette.grey[50], 0.5),
            borderRadius: 2
          }}>
            <Box display="flex" alignItems="center" gap={1} color="text.secondary">
              <ClockIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2">
                {timeSlot.date.toLocaleDateString('vi-VN', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} lúc {timeSlot.time}
              </Typography>
            </Box>
          </Paper>

          {/* Subject */}
          <TextField
            fullWidth
            label="Môn học *"
            value={bookingData.subject}
            onChange={(e) => setBookingData({...bookingData, subject: e.target.value})}
            error={!!errors.subject}
            helperText={errors.subject}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: primaryColor,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: primaryColor,
              },
            }}
          />

          {/* Duration */}
          <FormControl 
            fullWidth 
            error={!!errors.duration}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: primaryColor,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: primaryColor,
              },
            }}
          >
            <InputLabel>Thời lượng *</InputLabel>
            <Select
              value={bookingData.duration}
              onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
              label="Thời lượng *"
            >
              {durationOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {errors.duration && (
              <FormHelperText>{errors.duration}</FormHelperText>
            )}
          </FormControl>

          {/* Session Type */}
          <FormControl fullWidth>
            <InputLabel>Hình thức học</InputLabel>
            <Select
              value={bookingData.sessionType}
              onChange={(e) => setBookingData({...bookingData, sessionType: e.target.value})}
              label="Hình thức học"
            >
              <MenuItem value="online">Online</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
            </Select>
          </FormControl>

          {/* Location (if offline) */}
          {bookingData.sessionType === 'offline' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium" color="text.primary">
                Địa điểm học *
              </Typography>
              
              {/* Room Selection */}
              <FormControl fullWidth>
                <InputLabel>Chọn phòng có sẵn</InputLabel>
                <Select
                  value={bookingData.roomId}
                  onChange={(e) => setBookingData({...bookingData, roomId: e.target.value, location: ''})}
                  label="Chọn phòng có sẵn"
                >
                  <MenuItem value="">-- Chọn phòng --</MenuItem>
                  {rooms.map(room => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name} - {room.location} (Sức chứa: {room.capacity})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', my: 1 }}>
                hoặc
              </Typography>

              {/* Custom Location */}
              <TextField
                fullWidth
                label="Địa điểm tùy chỉnh"
                value={bookingData.location}
                onChange={(e) => setBookingData({...bookingData, location: e.target.value, roomId: ''})}
                error={!!errors.location}
                helperText={errors.location}
                placeholder="VD: Thư viện tầng 2, Quán cà phê ABC..."
              />
            </Box>
          )}

          {/* Notes */}
          <TextField
            fullWidth
            label="Ghi chú"
            value={bookingData.notes}
            onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
            multiline
            rows={3}
            placeholder="Ghi chú thêm về buổi học..."
          />

          {/* Price Summary */}
          <Card sx={{ 
            backgroundColor: alpha(theme.palette.success.main, 0.05),
            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
            borderRadius: 2
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" justifyContent="between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                  <DollarSignIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                  <Typography variant="subtitle2" fontWeight="medium">
                    Tổng chi phí:
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color={theme.palette.success.dark}>
                  {formatCurrency(calculatePrice())}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {bookingData.duration} phút × {formatCurrency(tutor?.hourlyRate || 150000)}/giờ
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider', gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: 'text.secondary',
            color: 'text.secondary',
            '&:hover': {
              borderColor: 'text.primary',
              backgroundColor: alpha(theme.palette.grey[500], 0.05),
            }
          }}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: primaryColor,
            color: 'white',
            fontWeight: 600,
            px: 4,
            '&:hover': {
              backgroundColor: '#1e293b',
            }
          }}
        >
          Xác nhận đặt lịch
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingModal;
