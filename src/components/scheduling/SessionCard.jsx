import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Divider,
  Stack,
  Alert,
  Link,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Schedule as ClockIcon,
  LocationOn as MapPinIcon,
  Person as UserIcon,
  Message as MessageCircleIcon,
  CheckCircle,
  Cancel as XCircleIcon,
  Warning as AlertCircleIcon,
} from '@mui/icons-material';

const SessionCard = ({ session, viewMode = 'student', onAction }) => {
  const theme = useTheme();
  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          backgroundColor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.dark,
          borderColor: theme.palette.success.main,
        };
      case 'pending':
        return {
          backgroundColor: alpha(theme.palette.warning.main, 0.1),
          color: theme.palette.warning.dark,
          borderColor: theme.palette.warning.main,
        };
      case 'cancelled':
        return {
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          color: theme.palette.error.dark,
          borderColor: theme.palette.error.main,
        };
      case 'completed':
        return {
          backgroundColor: alpha(theme.palette.info.main, 0.1),
          color: theme.palette.info.dark,
          borderColor: theme.palette.info.main,
        };
      default:
        return {
          backgroundColor: alpha(theme.palette.grey[400], 0.1),
          color: theme.palette.grey[700],
          borderColor: theme.palette.grey[400],
        };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      case 'pending':
        return <AlertCircleIcon sx={{ fontSize: 16 }} />;
      case 'cancelled':
        return <XCircleIcon sx={{ fontSize: 16 }} />;
      case 'completed':
        return <CheckCircle sx={{ fontSize: 16 }} />;
      default:
        return <AlertCircleIcon sx={{ fontSize: 16 }} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Không xác định';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isUpcoming = () => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    return sessionDateTime > new Date() && session.status === 'confirmed';
  };

  const isPast = () => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    return sessionDateTime < new Date();
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: 1,
        borderColor: 'divider',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Box flex={1}>
            <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1}>
              {session.subject}
            </Typography>
            <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
              <Box display="flex" alignItems="center" gap={0.5}>
                <ClockIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(session.date).toLocaleDateString('vi-VN')} lúc {session.time}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                ({session.duration} phút)
              </Typography>
            </Box>
          </Box>
          
          <Chip
            icon={getStatusIcon(session.status)}
            label={getStatusText(session.status)}
            size="small"
            sx={{
              ...getStatusColor(session.status),
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        </Box>

        {/* Participant Info */}
        <Box display="flex" alignItems="center" gap={2} mb={2} flexWrap="wrap">
          <Box display="flex" alignItems="center" gap={1}>
            <UserIcon sx={{ fontSize: 16, color: primaryColor }} />
            <Typography variant="body2" color="text.secondary">
              {viewMode === 'student' ? session.tutorName : session.studentName}
            </Typography>
          </Box>
          
          {session.location && (
            <Box display="flex" alignItems="center" gap={1}>
              <MapPinIcon sx={{ fontSize: 16, color: primaryColor }} />
              <Typography variant="body2" color="text.secondary">
                {session.location}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Price */}
        {session.price && (
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color={theme.palette.success.dark}
            mb={2}
          >
            {formatCurrency(session.price)}
          </Typography>
        )}

        {/* Notes */}
        {session.notes && (
          <Alert
            severity="info"
            icon={<MessageCircleIcon />}
            sx={{
              mb: 2,
              backgroundColor: alpha(theme.palette.info.main, 0.05),
              '& .MuiAlert-icon': {
                color: theme.palette.info.main,
              },
            }}
          >
            <Typography variant="body2">
              {session.notes}
            </Typography>
          </Alert>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {/* View Details button for all sessions */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => onAction?.('details', session)}
            sx={{
              borderColor: primaryColor,
              color: primaryColor,
              '&:hover': {
                borderColor: secondaryColor,
                backgroundColor: alpha(primaryColor, 0.04),
              },
            }}
          >
            Chi tiết
          </Button>

          {session.status === 'pending' && viewMode === 'tutor' && (
            <>
              <Button
                variant="contained"
                size="small"
                onClick={() => onAction?.('confirm', session)}
                sx={{
                  backgroundColor: theme.palette.success.main,
                  '&:hover': { backgroundColor: theme.palette.success.dark },
                }}
              >
                Xác nhận
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onAction?.('cancel', session)}
                color="error"
              >
                Từ chối
              </Button>
            </>
          )}

          {session.status === 'pending' && viewMode === 'student' && (
            <Button
              variant="outlined"
              size="small"
              onClick={() => onAction?.('cancel', session)}
              color="error"
            >
              Hủy đặt lịch
            </Button>
          )}

          {session.status === 'confirmed' && isUpcoming() && (
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onAction?.('reschedule', session)}
                sx={{
                  borderColor: primaryColor,
                  color: primaryColor,
                  '&:hover': {
                    borderColor: secondaryColor,
                    backgroundColor: alpha(primaryColor, 0.04),
                  },
                }}
              >
                Đổi lịch
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onAction?.('cancel', session)}
                color="error"
              >
                Hủy
              </Button>
            </>
          )}

          {session.status === 'completed' && viewMode === 'student' && !session.hasReview && (
            <Button
              variant="contained"
              size="small"
              onClick={() => onAction?.('review', session)}
              sx={{
                backgroundColor: primaryColor,
                '&:hover': { backgroundColor: secondaryColor },
              }}
            >
              Đánh giá
            </Button>
          )}

          {isUpcoming() && session.status === 'confirmed' && (
            <Button
              variant="contained"
              size="small"
              onClick={() => onAction?.('join', session)}
              sx={{
                backgroundColor: theme.palette.success.main,
                '&:hover': { backgroundColor: theme.palette.success.dark },
              }}
            >
              {session.sessionType === 'online' ? 'Tham gia' : 'Chi tiết'}
            </Button>
          )}
        </Stack>

        {/* Room booking link */}
        {session.roomId && session.roomBookingUrl && (
          <Box mt={2} pt={2} borderTop={1} borderColor="divider">
            <Link
              href={session.roomBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: primaryColor,
                textDecoration: 'none',
                fontSize: '0.75rem',
                '&:hover': {
                  textDecoration: 'underline',
                  color: secondaryColor,
                },
              }}
            >
              📍 Xem thông tin phòng học
            </Link>
          </Box>
        )}

        {/* Upcoming session reminder */}
        {isUpcoming() && (
          <Box mt={2} pt={2} borderTop={1} borderColor="divider">
            <Alert
              severity="warning"
              icon={<AlertCircleIcon />}
              sx={{
                backgroundColor: alpha(theme.palette.warning.main, 0.1),
                '& .MuiAlert-icon': {
                  color: theme.palette.warning.main,
                },
              }}
            >
              <Typography variant="caption">
                ⏰ Sắp diễn ra - Hãy chuẩn bị sẵn sàng!
              </Typography>
            </Alert>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionCard;
