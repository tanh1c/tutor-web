import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Slider,
  Chip,
  Box,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Stack,
  Divider,
  Collapse,
  Rating,
  Tooltip
} from '@mui/material';
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  Star as StarIcon,
  AttachMoney as AttachMoneyIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  Subject as SubjectIcon,
  Language as LanguageIcon,
  Today as TodayIcon
} from '@mui/icons-material';

const FilterSidebar = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onClose,
  subjects,
  faculties,
  isHorizontal = false
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = filters[key] || [];
    if (checked) {
      handleFilterChange(key, [...currentArray, value]);
    } else {
      handleFilterChange(key, currentArray.filter(item => item !== value));
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Thứ 2' },
    { key: 'tuesday', label: 'Thứ 3' },
    { key: 'wednesday', label: 'Thứ 4' },
    { key: 'thursday', label: 'Thứ 5' },
    { key: 'friday', label: 'Thứ 6' },
    { key: 'saturday', label: 'Thứ 7' },
    { key: 'sunday', label: 'Chủ nhật' }
  ];

  const languages = ['Tiếng Việt', 'English', '中文', '日本語', 'Français'];

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.subjects?.length > 0) count++;
    if (filters.faculties?.length > 0) count++;
    if (filters.minRating > 0) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 200000) count++;
    if (filters.availability?.length > 0) count++;
    if (filters.minExperience > 0) count++;
    if (filters.languages?.length > 0) count++;
    return count;
  };

  if (!isOpen) return null;

  // Horizontal Layout
  if (isHorizontal) {
    return (
      <Card
        elevation={8}
        sx={{
          borderRadius: 4,
          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 50%, #1e293b 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterListIcon sx={{ color: 'white' }} />
              <Typography variant="h6" fontWeight={700} color="white">
                Bộ lọc
              </Typography>
              {getActiveFiltersCount() > 0 && (
                <Chip
                  label={getActiveFiltersCount()}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                />
              )}
            </Box>
            <Stack direction="row" spacing={2}>
              {getActiveFiltersCount() > 0 && (
                <Button
                  onClick={clearAllFilters}
                  startIcon={<ClearIcon />}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Xóa tất cả
                </Button>
              )}
              <IconButton
                onClick={onClose}
                size="small"
                sx={{
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>

          {/* Horizontal Filter Grid */}
          <Grid container spacing={3}>
            {/* Subjects */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SubjectIcon sx={{ color: '#1e40af' }} />
                    <Typography variant="subtitle2" fontWeight={600} color="#1e40af">
                      Môn học
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: 120, overflowY: 'auto' }}>
                    <Stack spacing={0.5}>
                      {subjects.slice(0, 4).map((subject) => (
                        <FormControlLabel
                          key={subject.id}
                          control={
                            <Checkbox
                              checked={filters.subjects?.includes(subject.id)}
                              onChange={(e) => handleArrayFilterChange('subjects', subject.id, e.target.checked)}
                              size="small"
                              sx={{
                                color: '#1e40af',
                                '&.Mui-checked': { color: '#1e40af' }
                              }}
                            />
                          }
                          label={
                            <Typography variant="caption" fontWeight={500}>
                              {subject.name}
                            </Typography>
                          }
                          sx={{ margin: 0 }}
                        />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Rating */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <StarIcon sx={{ color: '#1e40af' }} />
                    <Typography variant="subtitle2" fontWeight={600} color="#1e40af">
                      Đánh giá
                    </Typography>
                  </Box>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={filters.minRating || 0}
                      onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    >
                      {[0, 4, 4.5].map((rating) => (
                        <FormControlLabel
                          key={rating}
                          value={rating}
                          control={
                            <Radio
                              size="small"
                              sx={{
                                color: '#1e40af',
                                '&.Mui-checked': { color: '#1e40af' }
                              }}
                            />
                          }
                          label={
                            rating === 0 ? (
                              <Typography variant="caption" fontWeight={500}>
                                Tất cả
                              </Typography>
                            ) : (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Rating
                                  value={rating}
                                  precision={0.5}
                                  readOnly
                                  size="small"
                                  sx={{ fontSize: '0.8rem' }}
                                />
                                <Typography variant="caption" fontWeight={500}>
                                  {rating}+
                                </Typography>
                              </Box>
                            )
                          }
                          sx={{ margin: 0 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Paper>
            </Grid>

            {/* Price Range */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AttachMoneyIcon sx={{ color: '#1e40af' }} />
                    <Typography variant="subtitle2" fontWeight={600} color="#1e40af">
                      Mức giá (VNĐ/giờ)
                    </Typography>
                  </Box>
                  <Box sx={{ px: 1 }}>
                    <Slider
                      value={[filters.minPrice || 0, filters.maxPrice || 200000]}
                      onChange={(e, newValue) => {
                        handleFilterChange('minPrice', newValue[0]);
                        handleFilterChange('maxPrice', newValue[1]);
                      }}
                      valueLabelDisplay="auto"
                      min={0}
                      max={200000}
                      step={10000}
                      valueLabelFormat={(value) => formatPrice(value)}
                      size="small"
                      sx={{
                        color: '#1e40af',
                        '& .MuiSlider-thumb': { backgroundColor: '#1e40af' },
                        '& .MuiSlider-track': { backgroundColor: '#1e40af' },
                        '& .MuiSlider-rail': { backgroundColor: 'rgba(30, 64, 175, 0.2)' }
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {formatPrice(filters.minPrice || 0)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatPrice(filters.maxPrice || 200000)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Experience & Languages */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <ScheduleIcon sx={{ color: '#1e40af' }} />
                    <Typography variant="subtitle2" fontWeight={600} color="#1e40af">
                      Kinh nghiệm
                    </Typography>
                  </Box>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={filters.minExperience || 0}
                      onChange={(e) => handleFilterChange('minExperience', parseInt(e.target.value))}
                    >
                      {[
                        { value: 0, label: 'Tất cả' },
                        { value: 1, label: '1+ năm' },
                        { value: 2, label: '2+ năm' }
                      ].map((option) => (
                        <FormControlLabel
                          key={option.value}
                          value={option.value}
                          control={
                            <Radio
                              size="small"
                              sx={{
                                color: '#1e40af',
                                '&.Mui-checked': { color: '#1e40af' }
                              }}
                            />
                          }
                          label={
                            <Typography variant="caption" fontWeight={500}>
                              {option.label}
                            </Typography>
                          }
                          sx={{ margin: 0 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  // Vertical Layout (original)
  return (
    <Card
      elevation={12}
      sx={{
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(30, 64, 175, 0.1)',
        overflow: 'hidden',
        height: 'fit-content',
        position: 'sticky',
        top: 20
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          p: 3,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon />
          <Typography variant="h6" fontWeight={700}>
            Bộ lọc
          </Typography>
          {getActiveFiltersCount() > 0 && (
            <Chip
              label={getActiveFiltersCount()}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600
              }}
            />
          )}
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 0 }}>
        {/* Clear All Button */}
        {getActiveFiltersCount() > 0 && (
          <Box sx={{ p: 3, pb: 0 }}>
            <Button
              onClick={clearAllFilters}
              startIcon={<ClearIcon />}
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: 3,
                borderColor: '#f87171',
                color: '#f87171',
                borderWidth: 2,
                '&:hover': {
                  borderColor: '#ef4444',
                  backgroundColor: 'rgba(248, 113, 113, 0.05)',
                  borderWidth: 2
                }
              }}
            >
              Xóa tất cả
            </Button>
          </Box>
        )}

        {/* Filter Sections */}
        <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
          {/* Subject Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <SubjectIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Môn học
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <Stack spacing={1} sx={{ maxHeight: 200, overflowY: 'auto' }}>
                {subjects.slice(0, 8).map((subject) => (
                  <FormControlLabel
                    key={subject.id}
                    control={
                      <Checkbox
                        checked={filters.subjects?.includes(subject.id)}
                        onChange={(e) => handleArrayFilterChange('subjects', subject.id, e.target.checked)}
                        sx={{
                          color: '#1e40af',
                          '&.Mui-checked': {
                            color: '#1e40af'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {subject.name}
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Faculty Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <SchoolIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Khoa
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <Stack spacing={1}>
                {faculties.map((faculty) => (
                  <FormControlLabel
                    key={faculty}
                    control={
                      <Checkbox
                        checked={filters.faculties?.includes(faculty)}
                        onChange={(e) => handleArrayFilterChange('faculties', faculty, e.target.checked)}
                        sx={{
                          color: '#1e40af',
                          '&.Mui-checked': {
                            color: '#1e40af'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {faculty}
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Rating Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <StarIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Đánh giá
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                >
                  {[0, 3, 4, 4.5].map((rating) => (
                    <FormControlLabel
                      key={rating}
                      value={rating}
                      control={
                        <Radio
                          sx={{
                            color: '#1e40af',
                            '&.Mui-checked': {
                              color: '#1e40af'
                            }
                          }}
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {rating === 0 ? (
                            <Typography variant="body2" fontWeight={500}>
                              Tất cả
                            </Typography>
                          ) : (
                            <>
                              <Rating
                                value={rating}
                                precision={0.5}
                                readOnly
                                size="small"
                                sx={{ color: '#ffc107' }}
                              />
                              <Typography variant="body2" fontWeight={500}>
                                {rating}+ sao
                              </Typography>
                            </>
                          )}
                        </Box>
                      }
                      sx={{ margin: 0 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Price Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <AttachMoneyIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Mức giá (VNĐ/giờ)
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={[filters.minPrice || 0, filters.maxPrice || 200000]}
                  onChange={(e, newValue) => {
                    handleFilterChange('minPrice', newValue[0]);
                    handleFilterChange('maxPrice', newValue[1]);
                  }}
                  valueLabelDisplay="auto"
                  min={0}
                  max={200000}
                  step={10000}
                  valueLabelFormat={(value) => formatPrice(value)}
                  sx={{
                    color: '#1e40af',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#1e40af'
                    },
                    '& .MuiSlider-track': {
                      backgroundColor: '#1e40af'
                    },
                    '& .MuiSlider-rail': {
                      backgroundColor: 'rgba(30, 64, 175, 0.2)'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formatPrice(filters.minPrice || 0)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatPrice(filters.maxPrice || 200000)}
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Availability Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <TodayIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Ngày có lịch
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <Stack spacing={1}>
                {daysOfWeek.map((day) => (
                  <FormControlLabel
                    key={day.key}
                    control={
                      <Checkbox
                        checked={filters.availability?.includes(day.key)}
                        onChange={(e) => handleArrayFilterChange('availability', day.key, e.target.checked)}
                        sx={{
                          color: '#1e40af',
                          '&.Mui-checked': {
                            color: '#1e40af'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {day.label}
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Experience Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <ScheduleIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Kinh nghiệm
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  value={filters.minExperience || 0}
                  onChange={(e) => handleFilterChange('minExperience', parseInt(e.target.value))}
                >
                  {[
                    { value: 0, label: 'Tất cả' },
                    { value: 1, label: '1 năm trở lên' },
                    { value: 2, label: '2 năm trở lên' },
                    { value: 3, label: '3 năm trở lên' }
                  ].map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={
                        <Radio
                          sx={{
                            color: '#1e40af',
                            '&.Mui-checked': {
                              color: '#1e40af'
                            }
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" fontWeight={500}>
                          {option.label}
                        </Typography>
                      }
                      sx={{ margin: 0 }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>

          <Divider sx={{ mx: 3 }} />

          {/* Language Filter */}
          <Accordion defaultExpanded disableGutters elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#1e40af' }} />}
              sx={{
                px: 3,
                py: 2,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <LanguageIcon sx={{ color: '#1e40af' }} />
              <Typography variant="subtitle1" fontWeight={600} color="#1e40af">
                Ngôn ngữ
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pt: 0, pb: 3 }}>
              <Stack spacing={1}>
                {languages.map((language) => (
                  <FormControlLabel
                    key={language}
                    control={
                      <Checkbox
                        checked={filters.languages?.includes(language)}
                        onChange={(e) => handleArrayFilterChange('languages', language, e.target.checked)}
                        sx={{
                          color: '#1e40af',
                          '&.Mui-checked': {
                            color: '#1e40af'
                          }
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {language}
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
