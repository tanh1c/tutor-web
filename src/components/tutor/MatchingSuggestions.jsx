import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  Tabs,
  Tab,
  Stack,
  Alert,
  Paper,
  Avatar,
  Fade,
  Zoom
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  ChevronRight as ChevronRightIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as EmojiEventsIcon
} from '@mui/icons-material';
import TutorCard from './TutorCard';

const MatchingSuggestions = ({ currentUser, tutors, onTutorSelect }) => {
  const [activeTab, setActiveTab] = useState('recommended');

  // Mock matching algorithm
  const calculateCompatibilityScore = (tutor, student) => {
    let score = 0;
    
    // Faculty match (30 points)
    if (tutor.faculty === student.faculty) {
      score += 30;
    }
    
    // Subject expertise match (25 points)
    const studentSubjects = student.preferences?.subjects || [];
    const tutorSpecialties = tutor.specialties || [];
    const subjectMatch = studentSubjects.some(subject => 
      tutorSpecialties.some(specialty => 
        specialty.toLowerCase().includes(subject.toLowerCase()) ||
        subject.toLowerCase().includes(specialty.toLowerCase())
      )
    );
    if (subjectMatch) score += 25;
    
    // Rating bonus (20 points)
    if (tutor.rating >= 4.5) score += 20;
    else if (tutor.rating >= 4.0) score += 15;
    else if (tutor.rating >= 3.5) score += 10;
    
    // Experience bonus (15 points)
    const experienceYears = parseFloat(tutor.experience);
    if (experienceYears >= 2) score += 15;
    else if (experienceYears >= 1) score += 10;
    else score += 5;
    
    // Availability match (10 points)
    const studentTimeSlots = student.preferences?.timeSlots || [];
    const tutorAvailability = tutor.availability || {};
    const hasTimeMatch = Object.values(tutorAvailability).some(slots =>
      slots.some(slot => {
        const [start] = slot.split('-');
        return studentTimeSlots.includes(start);
      })
    );
    if (hasTimeMatch) score += 10;
    
    return Math.min(score, 100); // Cap at 100%
  };

  const getRecommendedTutors = () => {
    return tutors
      .filter(tutor => tutor.role === 'tutor')
      .map(tutor => ({
        ...tutor,
        compatibilityScore: calculateCompatibilityScore(tutor, currentUser)
      }))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 6);
  };

  const getTopRatedTutors = () => {
    return tutors
      .filter(tutor => tutor.role === 'tutor')
      .sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating;
        return b.reviewCount - a.reviewCount;
      })
      .slice(0, 6);
  };

  const getRecentlyActiveTutors = () => {
    // Mock recent activity based on review count and rating
    return tutors
      .filter(tutor => tutor.role === 'tutor')
      .sort((a, b) => {
        const aActivity = a.reviewCount * 0.7 + a.rating * 0.3;
        const bActivity = b.reviewCount * 0.7 + b.rating * 0.3;
        return bActivity - aActivity;
      })
      .slice(0, 6);
  };

  const tabs = {
    recommended: {
      key: 'recommended',
      label: 'Gợi ý cho bạn',
      icon: <AutoAwesomeIcon />,
      description: 'Dựa trên chuyên ngành và sở thích học tập của bạn',
      tutors: getRecommendedTutors()
    },
    'top-rated': {
      key: 'top-rated', 
      label: 'Đánh giá cao',
      icon: <StarIcon />,
      description: 'Những tutor có đánh giá và phản hồi tốt nhất',
      tutors: getTopRatedTutors()
    },
    active: {
      key: 'active',
      label: 'Hoạt động gần đây',
      icon: <TrendingUpIcon />,
      description: 'Tutor được tìm kiếm và đặt lịch nhiều gần đây',
      tutors: getRecentlyActiveTutors()
    }
  };

  const tabKeys = Object.keys(tabs);
  const activeTabData = tabs[activeTab];

  return (
    <Box>
      {/* Tabs Navigation */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          mb: 3,
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.02) 0%, rgba(30, 64, 175, 0.05) 100%)',
          border: '1px solid rgba(30, 64, 175, 0.1)'
        }}
      >
        <Tabs
          value={tabKeys.indexOf(activeTab)}
          onChange={(e, newValue) => setActiveTab(tabKeys[newValue])}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              color: '#6b7280',
              fontWeight: 600,
              fontSize: '0.9rem',
              textTransform: 'none',
              py: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                color: '#1e40af',
                backgroundColor: 'rgba(30, 64, 175, 0.05)'
              }
            },
            '& .Mui-selected': {
              color: '#1e40af !important',
              fontWeight: 700
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1e40af',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          {Object.values(tabs).map((tab, index) => (
            <Tab
              key={tab.key}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{
                '& .MuiTab-iconWrapper': {
                  color: 'inherit'
                }
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Content */}
      <Box>
        <Fade in={true} timeout={600}>
          <Alert
            icon={<PsychologyIcon />}
            severity="info"
            sx={{
              mb: 3,
              borderRadius: 3,
              backgroundColor: 'rgba(30, 64, 175, 0.05)',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              '& .MuiAlert-icon': {
                color: '#1e40af'
              }
            }}
          >
            <Typography variant="body2" fontWeight={500}>
              {activeTabData.description}
            </Typography>
          </Alert>
        </Fade>

        {activeTabData.tutors.length > 0 ? (
          <Grid container spacing={3}>
            {activeTabData.tutors.map((tutor, index) => (
              <Grid 
                item 
                xs={12} 
                md={6} 
                lg={4} 
                key={tutor.id}
              >
                <Fade in={true} timeout={800 + index * 100}>
                  <Box>
                    <TutorCard
                      tutor={tutor}
                      compatibilityScore={activeTab === 'recommended' ? tutor.compatibilityScore : null}
                      onBookSession={onTutorSelect}
                    />
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(156, 163, 175, 0.2)',
              py: 8
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <ScheduleIcon sx={{ fontSize: 80, color: '#d1d5db', mb: 3 }} />
              <Typography variant="h6" fontWeight={600} color="#374151" gutterBottom>
                Chưa có tutor nào
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác.
              </Typography>
            </Box>
          </Paper>
        )}

        {/* View All Button */}
        {activeTabData.tutors.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              onClick={() => onTutorSelect('view-all')}
              variant="outlined"
              endIcon={<ChevronRightIcon />}
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                borderColor: '#1e40af',
                color: '#1e40af',
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
              Xem tất cả tutor
            </Button>
          </Box>
        )}
      </Box>

      {/* AI Algorithm Info */}
      <Paper
        elevation={6}
        sx={{
          mt: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.05) 0%, rgba(255, 152, 0, 0.05) 100%)',
          border: '1px solid rgba(255, 193, 7, 0.2)',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ p: 3 }}>
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              sx={{
                backgroundColor: '#ff9800',
                color: 'white',
                width: 48,
                height: 48
              }}
            >
              <ScienceIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight={700} color="#e65100" gutterBottom>
                Thuật toán gợi ý thông minh
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Hệ thống AI phân tích chuyên ngành <strong>({currentUser?.faculty})</strong>, 
                môn học quan tâm, thời gian rảnh và đánh giá để tìm tutor phù hợp nhất với bạn.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Chip
                  label="Chuyên ngành"
                  size="small"
                  icon={<EmojiEventsIcon />}
                  sx={{
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    color: '#e65100',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip
                  label="Lịch học"
                  size="small"
                  icon={<ScheduleIcon />}
                  sx={{
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    color: '#e65100',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip
                  label="Đánh giá"
                  size="small"
                  icon={<StarIcon />}
                  sx={{
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    color: '#e65100',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default MatchingSuggestions;
