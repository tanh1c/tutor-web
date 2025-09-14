import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  IconButton,
  Rating,
  Tooltip,
  Stack,
  Divider,
  Paper,
  Zoom,
  Fade
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon,
  Person as PersonIcon,
  Message as MessageIcon,
  Visibility as VisibilityIcon,
  CalendarToday as CalendarTodayIcon,
  Star as StarIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const TutorCard = ({ tutor, compatibilityScore, onBookSession }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getAvailabilityText = () => {
    const days = Object.keys(tutor.availability || {});
    if (days.length === 0) return "Không có lịch";
    if (days.length <= 2) return days.join(", ");
    return `${days.length} ngày trong tuần`;
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

  return (
    <Zoom in={true} timeout={600}>
      <Card
        elevation={8}
        sx={{
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(30, 64, 175, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.4s ease-in-out',
          height: 520, // Fixed height for consistent card sizes
          width: '100%', // Full width within grid item
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(30, 64, 175, 0.2)',
            '& .avatar': {
              transform: 'scale(1.05)'
            },
            '& .price-chip': {
              backgroundColor: '#1e40af',
              color: 'white'
            }
          }
        }}
      >
        {/* Compatibility Score Badge */}
        {compatibilityScore && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2
            }}
          >
            <Chip
              icon={<EmojiEventsIcon />}
              label={`${compatibilityScore}% phù hợp`}
              size="small"
              sx={{
                backgroundColor: '#059669',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.75rem',
                '& .MuiChip-icon': {
                  color: 'white'
                }
              }}
            />
          </Box>
        )}

        <CardContent 
          sx={{ 
            p: 4, 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            height: '100%'
          }}
        >
          {/* Main content wrapper with flex: 1 */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header with avatar and basic info */}
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={3} alignItems="flex-start">
              <Avatar
                src={tutor.avatar}
                alt={tutor.name}
                className="avatar"
                sx={{
                  width: 80,
                  height: 80,
                  border: '3px solid white',
                  boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color="#1e40af"
                  gutterBottom
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tutor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {tutor.faculty}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {tutor.major} • Năm {tutor.year}
                </Typography>
                
                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  {renderStars(tutor.rating)}
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {tutor.rating} ({tutor.reviewCount})
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Bio */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.5,
              height: '3em', // Fixed height for 2 lines
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontStyle: 'italic'
            }}
          >
            {tutor.bio}
          </Typography>

          {/* Specialties */}
          <Box sx={{ mb: 3, minHeight: '32px' }}>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {tutor.specialties?.slice(0, 3).map((specialty, index) => (
                <Chip
                  key={index}
                  label={specialty}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    color: '#1e40af',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    '&:hover': {
                      backgroundColor: 'rgba(30, 64, 175, 0.2)',
                      transform: 'scale(1.02)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                />
              ))}
              {tutor.specialties?.length > 3 && (
                <Chip
                  label={`+${tutor.specialties.length - 3}`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(156, 163, 175, 0.1)',
                    color: '#6b7280',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              )}
            </Stack>
          </Box>

          {/* Quick Info Grid */}
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%)',
              border: '1px solid rgba(30, 64, 175, 0.1)'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AttachMoneyIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Học phí
                    </Typography>
                    <Chip
                      label={`${formatPrice(tutor.hourlyRate)}/h`}
                      className="price-chip"
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(30, 64, 175, 0.1)',
                        color: '#1e40af',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        transition: 'all 0.3s ease-in-out'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Kinh nghiệm
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="#1f2937">
                      {tutor.experience}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Lịch trống
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="#1f2937">
                      {getAvailabilityText()}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon sx={{ fontSize: 16, color: '#1e40af' }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Ngôn ngữ
                    </Typography>
                    <Typography 
                      variant="caption" 
                      fontWeight={600} 
                      color="#1f2937"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        display: 'block',
                        maxWidth: '100px'
                      }}
                    >
                      {tutor.languages?.join(", ")}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
          </Box>

          {/* Actions - Always at bottom */}
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              component={Link}
              to={`/tutors/${tutor.id}`}
              variant="contained"
              startIcon={<VisibilityIcon />}
              fullWidth
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                backgroundColor: '#1e40af',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
                '&:hover': {
                  backgroundColor: '#1e3a8a',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(30, 64, 175, 0.4)'
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Xem Profile
            </Button>
            <Button
              onClick={() => onBookSession && onBookSession(tutor)}
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              fullWidth
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                borderColor: '#1e40af',
                color: '#1e40af',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#1e40af',
                  backgroundColor: 'rgba(30, 64, 175, 0.05)',
                  transform: 'translateY(-1px)',
                  borderWidth: 2
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Đặt lịch
            </Button>
            <Tooltip title="Nhắn tin">
              <IconButton
                sx={{
                  backgroundColor: 'rgba(156, 163, 175, 0.1)',
                  color: '#6b7280',
                  border: '2px solid #d1d5db',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    color: '#1e40af',
                    borderColor: '#1e40af',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <MessageIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
      </Card>
    </Zoom>
  );
};

export default TutorCard;
