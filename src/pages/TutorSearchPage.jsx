import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Chip,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  Zoom,
  Stack,
  Badge,
  Tooltip,
  Collapse,
  Alert,
  List,
  ListItem,
  Avatar,
  Divider,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  Tune as TuneIcon,
  GridView as GridViewIcon,
  ViewList as ViewListIcon,
  LocationOn as LocationOnIcon,
  AutoAwesome as AutoAwesomeIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  ViewModule as ViewModuleIcon,
  ViewAgenda as ViewAgendaIcon,
  Timeline as TimelineIcon,
  Layers as LayersIcon
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import TutorCard from '../components/tutor/TutorCard';
import FilterSidebar from '../components/tutor/FilterSidebar';
import MatchingSuggestions from '../components/tutor/MatchingSuggestions';
import { users as mockUsers, subjects, facultySubjects } from '../data/mockData';
import { getCurrentUser } from '../utils/helpers';

const TutorSearchPage = () => {
  const currentUser = getCurrentUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('masonry'); // 'grid', 'list', 'timeline', 'masonry'
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'rating', 'price-low', 'price-high'
  
  const [filters, setFilters] = useState({
    searchQuery: '',
    subjects: [],
    faculties: [],
    minRating: 0,
    maxPrice: 200000,
    minPrice: 0,
    availability: [],
    minExperience: 0,
    languages: []
  });

  const tutors = mockUsers.filter(user => user.role === 'tutor');
  const faculties = [...new Set(tutors.map(tutor => tutor.faculty))];

  // Update search query in filters when searchQuery changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  // Filter and sort tutors
  const filteredTutors = useMemo(() => {
    let result = tutors.filter(tutor => {
      // Search query filter
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch = !query || 
        tutor.name.toLowerCase().includes(query) ||
        tutor.bio?.toLowerCase().includes(query) ||
        tutor.specialties?.some(s => s.toLowerCase().includes(query)) ||
        tutor.faculty.toLowerCase().includes(query) ||
        tutor.major.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      // Subject filter
      if (filters.subjects.length > 0) {
        const tutorSubjects = tutor.specialties || [];
        const hasSubjectMatch = filters.subjects.some(subjectId => {
          const subject = subjects.find(s => s.id === subjectId);
          return subject && tutorSubjects.some(specialty =>
            specialty.toLowerCase().includes(subject.name.toLowerCase()) ||
            subject.name.toLowerCase().includes(specialty.toLowerCase())
          );
        });
        if (!hasSubjectMatch) return false;
      }

      // Faculty filter
      if (filters.faculties.length > 0 && !filters.faculties.includes(tutor.faculty)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && tutor.rating < filters.minRating) {
        return false;
      }

      // Price filter
      if (tutor.hourlyRate < filters.minPrice || tutor.hourlyRate > filters.maxPrice) {
        return false;
      }

      // Availability filter
      if (filters.availability.length > 0) {
        const tutorAvailability = Object.keys(tutor.availability || {});
        const hasAvailabilityMatch = filters.availability.some(day =>
          tutorAvailability.includes(day)
        );
        if (!hasAvailabilityMatch) return false;
      }

      // Experience filter
      if (filters.minExperience > 0) {
        const experienceYears = parseFloat(tutor.experience);
        if (experienceYears < filters.minExperience) return false;
      }

      // Language filter
      if (filters.languages.length > 0) {
        const tutorLanguages = tutor.languages || [];
        const hasLanguageMatch = filters.languages.some(lang =>
          tutorLanguages.includes(lang)
        );
        if (!hasLanguageMatch) return false;
      }

      return true;
    });

    // Sort results
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        result.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case 'price-high':
        result.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case 'relevance':
      default:
        // Sort by a combination of rating and review count for relevance
        result.sort((a, b) => {
          const aScore = a.rating * 0.7 + (a.reviewCount / 100) * 0.3;
          const bScore = b.rating * 0.7 + (b.reviewCount / 100) * 0.3;
          return bScore - aScore;
        });
        break;
    }

    return result;
  }, [tutors, filters, sortBy]);

  const handleBookSession = (tutor) => {
    console.log('Book session with tutor:', tutor);
    // TODO: Implement booking logic
  };

  const handleTutorSelect = (tutorOrAction) => {
    if (tutorOrAction === 'view-all') {
      setShowSuggestions(false);
    } else {
      handleBookSession(tutorOrAction);
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.subjects.length > 0) count++;
    if (filters.faculties.length > 0) count++;
    if (filters.minRating > 0) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 200000) count++;
    if (filters.availability.length > 0) count++;
    if (filters.minExperience > 0) count++;
    if (filters.languages.length > 0) count++;
    return count;
  };

  return (
    <Layout>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Page Header */}
          <Fade in={true} timeout={800}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                fontWeight={800} 
                color="white" 
                gutterBottom
                sx={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  mb: 2
                }}
              >
                Tìm kiếm Tutor
              </Typography>
              <Typography 
                variant="h6" 
                color="rgba(255, 255, 255, 0.9)"
                sx={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  fontWeight: 500
                }}
              >
                Khám phá {tutors.length} tutor xuất sắc tại HCMUT
              </Typography>
            </Box>
          </Fade>

          {/* Search Section */}
          <Fade in={true} timeout={1000}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                mb: 4,
                overflow: 'visible'
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Search Bar */}
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    placeholder="Tìm kiếm theo tên, môn học, chuyên ngành..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: '#1e40af' }} />
                        </InputAdornment>
                      ),
                      endAdornment: searchQuery && (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setSearchQuery('')}
                            size="small"
                            sx={{ color: '#6b7280' }}
                          >
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        fontSize: '1.1rem',
                        '& fieldset': {
                          borderColor: 'rgba(30, 64, 175, 0.2)',
                          borderWidth: 2
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(30, 64, 175, 0.4)'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#1e40af',
                          borderWidth: 2
                        }
                      }
                    }}
                  />
                </Box>

                {/* Controls */}
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} lg={6}>
                    <Stack direction="row" spacing={2} flexWrap="wrap">
                      {/* Filter Toggle */}
                      <Button
                        onClick={() => setShowFilters(!showFilters)}
                        startIcon={<TuneIcon />}
                        variant={showFilters ? "contained" : "outlined"}
                        sx={{
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 3,
                          py: 1.5,
                          ...(showFilters ? {
                            backgroundColor: '#1e40af',
                            boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
                            '&:hover': {
                              backgroundColor: '#1e3a8a'
                            }
                          } : {
                            borderColor: '#1e40af',
                            color: '#1e40af',
                            borderWidth: 2,
                            '&:hover': {
                              borderColor: '#1e40af',
                              backgroundColor: 'rgba(30, 64, 175, 0.05)',
                              borderWidth: 2
                            }
                          })
                        }}
                      >
                        Bộ lọc
                        {getActiveFiltersCount() > 0 && (
                          <Badge
                            badgeContent={getActiveFiltersCount()}
                            color="error"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Button>

                      {/* Suggestions Toggle */}
                      <Button
                        onClick={() => setShowSuggestions(!showSuggestions)}
                        startIcon={<AutoAwesomeIcon />}
                        variant={showSuggestions ? "contained" : "outlined"}
                        sx={{
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          px: 3,
                          py: 1.5,
                          ...(showSuggestions ? {
                            backgroundColor: '#059669',
                            boxShadow: '0 4px 20px rgba(5, 150, 105, 0.3)',
                            '&:hover': {
                              backgroundColor: '#047857'
                            }
                          } : {
                            borderColor: '#059669',
                            color: '#059669',
                            borderWidth: 2,
                            '&:hover': {
                              borderColor: '#059669',
                              backgroundColor: 'rgba(5, 150, 105, 0.05)',
                              borderWidth: 2
                            }
                          })
                        }}
                      >
                        Gợi ý AI
                      </Button>
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', lg: 'flex-end' }}>
                      {/* Sort Dropdown */}
                      <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel sx={{ color: '#1e40af', fontWeight: 600 }}>
                          <SortIcon sx={{ mr: 1, fontSize: '1rem' }} />
                          Sắp xếp
                        </InputLabel>
                        <Select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          label="Sắp xếp"
                          sx={{
                            borderRadius: 2,
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(30, 64, 175, 0.3)',
                              borderWidth: 2
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'rgba(30, 64, 175, 0.5)'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#1e40af'
                            }
                          }}
                        >
                          <MenuItem value="relevance">Phù hợp nhất</MenuItem>
                          <MenuItem value="rating">Đánh giá cao nhất</MenuItem>
                          <MenuItem value="price-low">Giá thấp nhất</MenuItem>
                          <MenuItem value="price-high">Giá cao nhất</MenuItem>
                        </Select>
                      </FormControl>

                      {/* View Mode Toggle */}
                      <Paper
                        elevation={2}
                        sx={{
                          display: 'flex',
                          borderRadius: 2,
                          overflow: 'hidden',
                          border: '2px solid rgba(30, 64, 175, 0.1)'
                        }}
                      >
                        <Tooltip title="Lưới">
                          <IconButton
                            onClick={() => setViewMode('grid')}
                            sx={{
                              borderRadius: 0,
                              px: 2,
                              py: 1,
                              backgroundColor: viewMode === 'grid' ? '#1e40af' : 'transparent',
                              color: viewMode === 'grid' ? 'white' : '#1e40af',
                              '&:hover': {
                                backgroundColor: viewMode === 'grid' ? '#1e3a8a' : 'rgba(30, 64, 175, 0.1)'
                              }
                            }}
                          >
                            <GridViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Danh sách">
                          <IconButton
                            onClick={() => setViewMode('list')}
                            sx={{
                              borderRadius: 0,
                              px: 2,
                              py: 1,
                              backgroundColor: viewMode === 'list' ? '#1e40af' : 'transparent',
                              color: viewMode === 'list' ? 'white' : '#1e40af',
                              '&:hover': {
                                backgroundColor: viewMode === 'list' ? '#1e3a8a' : 'rgba(30, 64, 175, 0.1)'
                              }
                            }}
                          >
                            <ViewListIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Timeline">
                          <IconButton
                            onClick={() => setViewMode('timeline')}
                            sx={{
                              borderRadius: 0,
                              px: 2,
                              py: 1,
                              backgroundColor: viewMode === 'timeline' ? '#1e40af' : 'transparent',
                              color: viewMode === 'timeline' ? 'white' : '#1e40af',
                              '&:hover': {
                                backgroundColor: viewMode === 'timeline' ? '#1e3a8a' : 'rgba(30, 64, 175, 0.1)'
                              }
                            }}
                          >
                            <TimelineIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Masonry">
                          <IconButton
                            onClick={() => setViewMode('masonry')}
                            sx={{
                              borderRadius: 0,
                              px: 2,
                              py: 1,
                              backgroundColor: viewMode === 'masonry' ? '#1e40af' : 'transparent',
                              color: viewMode === 'masonry' ? 'white' : '#1e40af',
                              '&:hover': {
                                backgroundColor: viewMode === 'masonry' ? '#1e3a8a' : 'rgba(30, 64, 175, 0.1)'
                              }
                            }}
                          >
                            <LayersIcon />
                          </IconButton>
                        </Tooltip>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>

          <Grid container spacing={3}>
            {/* Horizontal Filter Bar */}
            <Grid item xs={12}>
              <Collapse in={showFilters} timeout={500}>
                <FilterSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                  subjects={subjects}
                  faculties={faculties}
                  isHorizontal={true}
                />
              </Collapse>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12}>
              <Fade in={true} timeout={1200}>
                <Box>
                  {/* AI Suggestions */}
                  <Collapse in={showSuggestions} timeout={500}>
                    <Card
                      elevation={8}
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(5, 150, 105, 0.2)',
                        mb: 4,
                        overflow: 'hidden'
                      }}
                    >
                      <Box sx={{ 
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        p: 2,
                        color: 'white'
                      }}>
                        <Typography variant="h6" fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AutoAwesomeIcon />
                          Gợi ý AI cho bạn
                        </Typography>
                      </Box>
                      <CardContent sx={{ p: 3 }}>
                        <MatchingSuggestions
                          currentUser={currentUser}
                          tutors={mockUsers}
                          onTutorSelect={handleTutorSelect}
                        />
                      </CardContent>
                    </Card>
                  </Collapse>

                  {/* Results Header */}
                  <Card
                    elevation={6}
                    sx={{
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(30, 64, 175, 0.1)',
                      mb: 3
                    }}
                  >
                    <CardContent sx={{ py: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                          <Typography variant="h5" fontWeight={700} color="#1e40af" gutterBottom>
                            {searchQuery || getActiveFiltersCount() > 0 ? 'Kết quả tìm kiếm' : 'Tất cả tutor'}
                          </Typography>
                          {searchQuery && (
                            <Typography variant="body2" color="text.secondary">
                              Kết quả cho "<strong>{searchQuery}</strong>"
                            </Typography>
                          )}
                        </Box>
                        <Chip
                          label={`${filteredTutors.length} tutor`}
                          sx={{
                            backgroundColor: 'rgba(30, 64, 175, 0.1)',
                            color: '#1e40af',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            px: 1
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Results */}
                  <Zoom in={true} timeout={800}>
                    <Box>
                      {filteredTutors.length > 0 ? (
                        <>
                          {/* Grid Layout */}
                          {viewMode === 'grid' && (
                            <Grid container spacing={3}>
                              {filteredTutors.map((tutor, index) => (
                                <Grid item xs={12} sm={6} lg={4} key={tutor.id}>
                                  <Fade in={true} timeout={1000 + index * 100}>
                                    <Box sx={{ width: '100%' }}>
                                      <TutorCard tutor={tutor} onBookSession={handleBookSession} />
                                    </Box>
                                  </Fade>
                                </Grid>
                              ))}
                            </Grid>
                          )}

                          {/* List Layout */}
                          {viewMode === 'list' && (
                            <Stack spacing={3}>
                              {filteredTutors.map((tutor, index) => (
                                <Fade key={tutor.id} in={true} timeout={600 + index * 50}>
                                  <Card
                                    elevation={6}
                                    sx={{
                                      borderRadius: 4,
                                      overflow: 'hidden',
                                      background: 'rgba(255, 255, 255, 0.95)',
                                      backdropFilter: 'blur(20px)',
                                      border: '1px solid rgba(30, 64, 175, 0.1)',
                                      transition: 'all 0.3s ease-in-out',
                                      '&:hover': {
                                        transform: 'translateX(8px)',
                                        boxShadow: '0 12px 28px rgba(30, 64, 175, 0.15)'
                                      }
                                    }}
                                  >
                                    <CardContent sx={{ p: 4 }}>
                                      <Stack direction="row" spacing={3} alignItems="center">
                                        <Avatar
                                          src={tutor.avatar}
                                          alt={tutor.name}
                                          sx={{
                                            width: 80,
                                            height: 80,
                                            border: '3px solid white',
                                            boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
                                          }}
                                        />
                                        <Box sx={{ flex: 1 }}>
                                          <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom>
                                            {tutor.name}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {tutor.faculty} • {tutor.major} • Năm {tutor.year}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                              fontStyle: 'italic',
                                              display: '-webkit-box',
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: 'vertical',
                                              overflow: 'hidden'
                                            }}
                                          >
                                            {tutor.bio}
                                          </Typography>
                                        </Box>
                                        <Stack spacing={2} alignItems="center">
                                          <Chip
                                            label={`${new Intl.NumberFormat('vi-VN', {
                                              style: 'currency',
                                              currency: 'VND'
                                            }).format(tutor.hourlyRate)}/giờ`}
                                            sx={{
                                              backgroundColor: '#1e40af',
                                              color: 'white',
                                              fontWeight: 600
                                            }}
                                          />
                                          <Stack direction="row" spacing={1}>
                                            <Button
                                              variant="contained"
                                              size="small"
                                              sx={{
                                                backgroundColor: '#1e40af',
                                                '&:hover': { backgroundColor: '#1e3a8a' }
                                              }}
                                            >
                                              Xem Profile
                                            </Button>
                                            <Button
                                              variant="outlined"
                                              size="small"
                                              sx={{
                                                borderColor: '#1e40af',
                                                color: '#1e40af'
                                              }}
                                            >
                                              Đặt lịch
                                            </Button>
                                          </Stack>
                                        </Stack>
                                      </Stack>
                                    </CardContent>
                                  </Card>
                                </Fade>
                              ))}
                            </Stack>
                          )}

                          {/* Timeline Layout */}
                          {viewMode === 'timeline' && (
                            <Box sx={{ maxWidth: 800, mx: 'auto', position: 'relative' }}>
                              {/* Central Timeline Line */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  left: '50%',
                                  top: 0,
                                  bottom: 0,
                                  width: 4,
                                  backgroundColor: '#1e40af',
                                  borderRadius: 2,
                                  transform: 'translateX(-50%)',
                                  zIndex: 1
                                }}
                              />
                              
                              {filteredTutors.map((tutor, index) => (
                                <Fade key={tutor.id} in={true} timeout={800 + index * 100}>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                                      mb: 4,
                                      position: 'relative'
                                    }}
                                  >
                                    {/* Timeline Dot */}
                                    <Box
                                      sx={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: 30,
                                        transform: 'translateX(-50%)',
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        backgroundColor: '#1e40af',
                                        border: '4px solid white',
                                        boxShadow: '0 0 0 4px rgba(30, 64, 175, 0.2)',
                                        zIndex: 2
                                      }}
                                    />
                                    
                                    <Card
                                      elevation={8}
                                      sx={{
                                        width: '45%',
                                        borderRadius: 4,
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(30, 64, 175, 0.1)',
                                        position: 'relative',
                                        transition: 'all 0.4s ease-in-out',
                                        '&:hover': {
                                          transform: 'scale(1.02)',
                                          boxShadow: '0 20px 40px rgba(30, 64, 175, 0.2)'
                                        },
                                        '&:before': {
                                          content: '""',
                                          position: 'absolute',
                                          top: 30,
                                          [index % 2 === 0 ? 'right' : 'left']: -12,
                                          width: 0,
                                          height: 0,
                                          borderTop: '12px solid transparent',
                                          borderBottom: '12px solid transparent',
                                          [index % 2 === 0 ? 'borderLeft' : 'borderRight']: '12px solid rgba(255, 255, 255, 0.95)'
                                        }
                                      }}
                                    >
                                      <CardContent sx={{ p: 4 }}>
                                        <Stack direction="row" spacing={3}>
                                          <Avatar
                                            src={tutor.avatar}
                                            alt={tutor.name}
                                            sx={{
                                              width: 60,
                                              height: 60,
                                              border: '3px solid #1e40af'
                                            }}
                                          />
                                          <Box sx={{ flex: 1 }}>
                                            <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom>
                                              {tutor.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                              {tutor.faculty} • {tutor.experience} kinh nghiệm
                                            </Typography>
                                            <Typography
                                              variant="body2"
                                              color="text.secondary"
                                              sx={{ 
                                                fontStyle: 'italic', 
                                                mb: 2,
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                              }}
                                            >
                                              {tutor.bio}
                                            </Typography>
                                            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                                              {tutor.specialties?.slice(0, 3).map((specialty, idx) => (
                                                <Chip
                                                  key={idx}
                                                  label={specialty}
                                                  size="small"
                                                  sx={{
                                                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                                    color: '#1e40af',
                                                    fontSize: '0.7rem'
                                                  }}
                                                />
                                              ))}
                                            </Stack>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                              <Chip
                                                label={`${new Intl.NumberFormat('vi-VN', {
                                                  style: 'currency',
                                                  currency: 'VND'
                                                }).format(tutor.hourlyRate)}/giờ`}
                                                sx={{
                                                  backgroundColor: '#1e40af',
                                                  color: 'white',
                                                  fontWeight: 600,
                                                  fontSize: '0.75rem'
                                                }}
                                              />
                                              <Button
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                  borderColor: '#1e40af',
                                                  color: '#1e40af',
                                                  fontSize: '0.75rem',
                                                  px: 2
                                                }}
                                              >
                                                Xem chi tiết
                                              </Button>
                                            </Stack>
                                          </Box>
                                        </Stack>
                                      </CardContent>
                                    </Card>
                                  </Box>
                                </Fade>
                              ))}
                            </Box>
                          )}

                          {/* Masonry Layout */}
                          {viewMode === 'masonry' && (
                            <Box
                              sx={{
                                columns: { xs: 1, sm: 2, md: 3 },
                                columnGap: 3,
                                '& > *': {
                                  breakInside: 'avoid',
                                  mb: 3
                                }
                              }}
                            >
                              {filteredTutors.map((tutor, index) => (
                                <Zoom key={tutor.id} in={true} timeout={600 + index * 50}>
                                  <Card
                                    elevation={6}
                                    sx={{
                                      borderRadius: 4,
                                      overflow: 'hidden',
                                      background: `linear-gradient(135deg, ${
                                        index % 3 === 0
                                          ? '#ffffff'
                                          : index % 3 === 1
                                          ? '#f8fafc'
                                          : '#f1f5f9'
                                      } 0%, ${
                                        index % 3 === 0
                                          ? '#fefeff'
                                          : index % 3 === 1
                                          ? '#ffffff'
                                          : '#f8fafc'
                                      } 100%)`,
                                      border: `2px solid ${
                                        index % 3 === 0
                                          ? '#1e40af'
                                          : index % 3 === 1
                                          ? '#3b82f6'
                                          : '#60a5fa'
                                      }`,
                                      transition: 'all 0.3s ease-in-out',
                                      '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: `0 20px 40px ${
                                          index % 3 === 0
                                            ? 'rgba(30, 64, 175, 0.25)'
                                            : index % 3 === 1
                                            ? 'rgba(59, 130, 246, 0.25)'
                                            : 'rgba(96, 165, 250, 0.25)'
                                        }`
                                      }
                                    }}
                                  >
                                    <CardContent sx={{ p: 3 }}>
                                      <Stack alignItems="center" spacing={2} mb={2}>
                                        <Avatar
                                          src={tutor.avatar}
                                          alt={tutor.name}
                                          sx={{
                                            width: 70,
                                            height: 70,
                                            border: '3px solid white',
                                            boxShadow: '0 4px 20px rgba(30, 64, 175, 0.2)'
                                          }}
                                        />
                                        <Typography
                                          variant="h6"
                                          fontWeight={700}
                                          color="#1e40af"
                                          textAlign="center"
                                        >
                                          {tutor.name}
                                        </Typography>
                                      </Stack>
                                      
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        textAlign="center"
                                        gutterBottom
                                      >
                                        {tutor.faculty}
                                      </Typography>
                                      
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                          fontStyle: 'italic',
                                          textAlign: 'center',
                                          mb: 2,
                                          minHeight: '40px'
                                        }}
                                      >
                                        {tutor.bio}
                                      </Typography>
                                      
                                      <Stack spacing={1} mb={2}>
                                        {tutor.specialties?.slice(0, 2).map((specialty, idx) => (
                                          <Chip
                                            key={idx}
                                            label={specialty}
                                            size="small"
                                            sx={{
                                              backgroundColor: 'rgba(30, 64, 175, 0.1)',
                                              color: '#1e40af',
                                              fontSize: '0.75rem'
                                            }}
                                          />
                                        ))}
                                      </Stack>
                                      
                                      <Chip
                                        label={`${new Intl.NumberFormat('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND'
                                        }).format(tutor.hourlyRate)}/giờ`}
                                        sx={{
                                          backgroundColor: '#1e40af',
                                          color: 'white',
                                          fontWeight: 600,
                                          width: '100%',
                                          mb: 2
                                        }}
                                      />
                                      
                                      <Button
                                        variant="contained"
                                        fullWidth
                                        sx={{
                                          backgroundColor: '#1e40af',
                                          '&:hover': { backgroundColor: '#1e3a8a' },
                                          borderRadius: 3
                                        }}
                                      >
                                        Xem Profile
                                      </Button>
                                    </CardContent>
                                  </Card>
                                </Zoom>
                              ))}
                            </Box>
                          )}
                        </>
                      ) : (
                        <Card
                          elevation={4}
                          sx={{
                            borderRadius: 4,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(156, 163, 175, 0.2)',
                            py: 8
                          }}
                        >
                          <CardContent>
                            <Box sx={{ textAlign: 'center' }}>
                              <LocationOnIcon sx={{ fontSize: 80, color: '#d1d5db', mb: 3 }} />
                              <Typography variant="h5" fontWeight={600} color="#374151" gutterBottom>
                                Không tìm thấy tutor nào
                              </Typography>
                              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                                Hãy thử điều chỉnh bộ lọc hoặc tìm kiếm với từ khóa khác để tìm thấy tutor phù hợp.
                              </Typography>
                              <Button
                                onClick={() => {
                                  setSearchQuery('');
                                  setFilters({
                                    searchQuery: '',
                                    subjects: [],
                                    faculties: [],
                                    minRating: 0,
                                    maxPrice: 200000,
                                    minPrice: 0,
                                    availability: [],
                                    minExperience: 0,
                                    languages: []
                                  });
                                }}
                                variant="contained"
                                startIcon={<ClearIcon />}
                                sx={{
                                  borderRadius: 3,
                                  px: 4,
                                  py: 1.5,
                                  fontWeight: 600,
                                  textTransform: 'none',
                                  backgroundColor: '#1e40af',
                                  boxShadow: '0 4px 20px rgba(30, 64, 175, 0.3)',
                                  '&:hover': {
                                    backgroundColor: '#1e3a8a',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 25px rgba(30, 64, 175, 0.4)'
                                  },
                                  transition: 'all 0.3s ease-in-out'
                                }}
                              >
                                Xóa tất cả bộ lọc
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Box>
                  </Zoom>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
};

export default TutorSearchPage;
