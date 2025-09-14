import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { AIMatchingEngine } from './AIMatchingEngine';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Avatar,
  Grid,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  IconButton,
  Fade,
  Zoom
} from '@mui/material';
import {
  MenuBook as BookOpenIcon,
  PlayArrow as PlayIcon,
  Description as FileTextIcon,
  Code as CodeIcon,
  School as GraduationCapIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Schedule as ClockIcon,
  CheckCircle as CheckCircleIcon,
  OpenInNew as ExternalLinkIcon,
  Download as DownloadIcon,
  Favorite as HeartIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const ContentSuggestions = () => {
  const { user } = useContext(UserContext);
  const [suggestions, setSuggestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const generateSuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1800));
    
    const result = AIMatchingEngine.suggestContent('programming', 'intermediate', ['full-stack', 'react']);
    setSuggestions(result);
    setIsGenerating(false);
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'video': return PlayIcon;
      case 'article': return FileTextIcon;
      case 'practice': return CodeIcon;
      case 'project': return GraduationCapIcon;
      default: return BookOpenIcon;
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'video': return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'article': return { bgcolor: '#dbeafe', color: '#1e40af' };
      case 'practice': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'project': return { bgcolor: '#f3e8ff', color: '#7c3aed' };
      default: return { bgcolor: '#f3f4f6', color: '#374151' };
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'intermediate': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'advanced': return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'mixed': return { bgcolor: '#dbeafe', color: '#1e40af' };
      default: return { bgcolor: '#f3f4f6', color: '#374151' };
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
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                mr: 2,
                width: 48,
                height: 48
              }}
            >
              <BookOpenIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                AI Content Suggestions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Personalized learning materials and resources
              </Typography>
            </Box>
          </Box>
          
          {!suggestions && (
            <Button
              onClick={generateSuggestions}
              disabled={isGenerating}
              variant="contained"
              startIcon={isGenerating ? <CircularProgress size={16} color="inherit" /> : <BookOpenIcon />}
              sx={{
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
                },
                '&:disabled': {
                  opacity: 0.6
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {isGenerating ? 'Analyzing...' : 'Get Suggestions'}
            </Button>
          )}
        </Box>

        {suggestions && (
          <Fade in timeout={500}>
            <Box sx={{ mb: 3 }}>
              {/* Learning Path Overview */}
              <Card
                elevation={1}
                sx={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)',
                  border: '1px solid #c7d2fe',
                  mb: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Your Learning Path
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="caption" color="text.secondary">
                        Current Level
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af' }}>
                        {suggestions.learningPath.currentLevel}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="caption" color="text.secondary">
                        Next Milestone
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#7c3aed' }}>
                        {suggestions.learningPath.nextMilestone}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="caption" color="text.secondary">
                        Progress to Next
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={parseInt(suggestions.learningPath.progressToNext)}
                          sx={{
                            flexGrow: 1,
                            mr: 1,
                            height: 6,
                            borderRadius: 3,
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)'
                            }
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {suggestions.learningPath.progressToNext}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Estimated time to next level: <Box component="span" sx={{ fontWeight: 600 }}>{suggestions.learningPath.estimatedTimeToNext}</Box>
                  </Typography>
                </CardContent>
              </Card>

              {/* Content Recommendations */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                  Recommended Content
                </Typography>
                <Grid container spacing={2}>
                  {suggestions.recommendations.map((content) => {
                    const IconComponent = getContentTypeIcon(content.type);
                    const typeStyle = getContentTypeColor(content.type);
                    const difficultyStyle = getDifficultyColor(content.difficulty);
                    return (
                      <Grid item xs={12} lg={6} key={content.id}>
                        <Card
                          elevation={1}
                          sx={{
                            border: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                          onClick={() => setSelectedContent(content)}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar
                                  sx={{
                                    ...typeStyle,
                                    mr: 2,
                                    width: 40,
                                    height: 40
                                  }}
                                >
                                  <IconComponent sx={{ fontSize: '1.25rem' }} />
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                                    {content.title}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {content.provider}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ textAlign: 'right' }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e40af' }}>
                                  {content.relevanceScore}%
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  relevance
                                </Typography>
                              </Box>
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {content.description}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <ClockIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {content.duration || content.readingTime}
                                  </Typography>
                                </Box>
                                <Chip
                                  label={content.difficulty}
                                  size="small"
                                  sx={{
                                    ...difficultyStyle,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                  }}
                                />
                                <Chip
                                  label={content.type}
                                  size="small"
                                  sx={{
                                    ...typeStyle,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'capitalize'
                                  }}
                                />
                              </Box>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                Prerequisites
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {content.prerequisites.map((prereq, idx) => (
                                  <Chip
                                    key={idx}
                                    label={prereq}
                                    size="small"
                                    sx={{
                                      bgcolor: '#f3f4f6',
                                      color: '#374151',
                                      fontSize: '0.75rem'
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                Est. time: {content.estimatedTime}
                              </Typography>
                              <Button
                                endIcon={<ExternalLinkIcon />}
                                sx={{
                                  color: '#1e40af',
                                  '&:hover': { color: '#1e3a8a' },
                                  fontSize: '0.875rem',
                                  fontWeight: 600
                                }}
                              >
                                View Details
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              {/* Adaptive Adjustments */}
              <Card
                elevation={1}
                sx={{
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
                  border: '1px solid #86efac'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#166534', mb: 2 }}>
                    AI Adaptive Adjustments
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <TrendingUpIcon sx={{ fontSize: '1rem', color: '#059669', mr: 1, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#166534', display: 'inline' }}>
                          Difficulty: 
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#047857', ml: 0.5, display: 'inline' }}>
                          {suggestions.adaptiveAdjustments.difficultyAdjustment}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <ClockIcon sx={{ fontSize: '1rem', color: '#059669', mr: 1, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#166534', display: 'inline' }}>
                          Pace: 
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#047857', ml: 0.5, display: 'inline' }}>
                          {suggestions.adaptiveAdjustments.paceRecommendation}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <StarIcon sx={{ fontSize: '1rem', color: '#059669', mr: 1, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#166534', display: 'inline' }}>
                          Focus Areas: 
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#047857', ml: 0.5, display: 'inline' }}>
                          {suggestions.adaptiveAdjustments.focusAreas.join(', ')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}

        {/* Content Detail Modal */}
        <Dialog
          open={!!selectedContent}
          onClose={() => setSelectedContent(null)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }
          }}
        >
          {selectedContent && (
            <>
              <DialogTitle sx={{ p: 3, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {selectedContent.title}
                  </Typography>
                  <IconButton onClick={() => setSelectedContent(null)} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              
              <DialogContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Chip
                    label={selectedContent.type}
                    size="small"
                    sx={{
                      ...getContentTypeColor(selectedContent.type),
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  />
                  <Chip
                    label={selectedContent.difficulty}
                    size="small"
                    sx={{
                      ...getDifficultyColor(selectedContent.difficulty),
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textTransform: 'capitalize'
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ClockIcon sx={{ fontSize: '1rem', mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {selectedContent.estimatedTime}
                    </Typography>
                  </Box>
                </Box>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {selectedContent.description}
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                      Prerequisites
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {selectedContent.prerequisites.map((prereq, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.5,
                            color: 'text.secondary'
                          }}
                        >
                          <CheckCircleIcon sx={{ color: '#059669', fontSize: '1rem', mr: 1 }} />
                          <Typography variant="body2">{prereq}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                      Learning Outcomes
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {selectedContent.learningOutcomes.map((outcome, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 0.5,
                            color: 'text.secondary'
                          }}
                        >
                          <StarIcon sx={{ color: '#fbbf24', fontSize: '1rem', mr: 1 }} />
                          <Typography variant="body2">{outcome}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
                
                <Card
                  elevation={1}
                  sx={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '1px solid #bfdbfe'
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af' }}>
                        Relevance Score
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e40af' }}>
                        {selectedContent.relevanceScore}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={selectedContent.relevanceScore}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        '& .MuiLinearProgress-bar': {
                          background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </DialogContent>
              
              <DialogActions sx={{ p: 3, pt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<ExternalLinkIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
                        }
                      }}
                    >
                      Access Content
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<HeartIcon />}
                      sx={{
                        borderColor: '#d1d5db',
                        color: '#374151',
                        '&:hover': {
                          borderColor: '#9ca3af',
                          bgcolor: '#f9fafb'
                        }
                      }}
                    >
                      Save for Later
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      sx={{
                        bgcolor: '#059669',
                        '&:hover': {
                          bgcolor: '#047857'
                        }
                      }}
                    >
                      Download
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </>
          )}
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ContentSuggestions;
