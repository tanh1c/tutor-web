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
  Lightbulb as LightbulbIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ClockIcon,
  GpsFixed as TargetIcon,
  MenuBook as BookOpenIcon,
  PlayArrow as PlayIcon,
  Description as FileTextIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowRightIcon,
  AutoAwesome as SparklesIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const PersonalizedRecommendations = () => {
  const { user } = useContext(UserContext);
  const [recommendations, setRecommendations] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedRec, setSelectedRec] = useState(null);

  const generateRecommendations = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recs = AIMatchingEngine.generateLearningRecommendations(user.id);
    setRecommendations(recs);
    setIsGenerating(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { bgcolor: '#fee2e2', color: '#991b1b' };
      case 'medium': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'low': return { bgcolor: '#dcfce7', color: '#166534' };
      default: return { bgcolor: '#f3f4f6', color: '#374151' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'study_method': return BookOpenIcon;
      case 'schedule': return ClockIcon;
      case 'content': return FileTextIcon;
      case 'tutor_interaction': return TargetIcon;
      default: return LightbulbIcon;
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
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                mr: 2,
                width: 48,
                height: 48
              }}
            >
              <SparklesIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                AI Learning Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Personalized insights based on your learning patterns
              </Typography>
            </Box>
          </Box>
          
          {recommendations.length === 0 && (
            <Button
              onClick={generateRecommendations}
              disabled={isGenerating}
              variant="contained"
              startIcon={isGenerating ? <CircularProgress size={16} color="inherit" /> : <LightbulbIcon />}
              sx={{
                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                },
                '&:disabled': {
                  opacity: 0.6
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {isGenerating ? 'Analyzing...' : 'Get Recommendations'}
            </Button>
          )}
        </Box>

        {recommendations.length > 0 && (
          <Grid container spacing={2}>
            {recommendations.map((rec) => {
              const IconComponent = getTypeIcon(rec.type);
              const priorityStyle = getPriorityColor(rec.priority);
              return (
                <Grid item xs={12} key={rec.id}>
                  <Fade in timeout={300}>
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
                      onClick={() => setSelectedRec(rec)}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                bgcolor: '#eff6ff',
                                mr: 2,
                                width: 40,
                                height: 40
                              }}
                            >
                              <IconComponent sx={{ color: '#1e40af', fontSize: '1.25rem' }} />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                                {rec.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {rec.description}
                              </Typography>
                            </Box>
                          </Box>
                          <Chip
                            label={rec.priority}
                            size="small"
                            sx={{
                              ...priorityStyle,
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">
                              Confidence
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <LinearProgress
                                variant="determinate"
                                value={rec.confidence}
                                sx={{
                                  flexGrow: 1,
                                  mr: 1,
                                  height: 6,
                                  borderRadius: 3,
                                  '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
                                  }
                                }}
                              />
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                                {rec.confidence}%
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">
                              Impact
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                              {rec.estimatedImpact}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="caption" color="text.secondary">
                              Time Required
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                              {rec.timeToComplete}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {rec.resources.slice(0, 3).map((resource, idx) => (
                              <Chip
                                key={idx}
                                label={resource}
                                size="small"
                                sx={{
                                  bgcolor: '#f3f4f6',
                                  color: '#374151',
                                  fontSize: '0.75rem'
                                }}
                              />
                            ))}
                          </Box>
                          <ArrowRightIcon sx={{ color: '#9ca3af' }} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Detail Modal */}
        <Dialog
          open={!!selectedRec}
          onClose={() => setSelectedRec(null)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
            }
          }}
        >
          {selectedRec && (
            <>
              <DialogTitle sx={{ p: 3, pb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {selectedRec.title}
                  </Typography>
                  <IconButton onClick={() => setSelectedRec(null)} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              
              <DialogContent sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    {selectedRec.description}
                  </Typography>
                </Box>
                
                <Card
                  elevation={1}
                  sx={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '1px solid #bfdbfe',
                    mb: 3
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af', mb: 1 }}>
                      AI Reasoning
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e40af' }}>
                      {selectedRec.reasoning}
                    </Typography>
                  </CardContent>
                </Card>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                      Recommended Resources
                    </Typography>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {selectedRec.resources.map((resource, idx) => (
                        <Box
                          component="li"
                          key={idx}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: 'text.secondary'
                          }}
                        >
                          <CheckCircleIcon sx={{ color: '#059669', fontSize: '1rem', mr: 1 }} />
                          <Typography variant="body2">{resource}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                      Expected Outcomes
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Confidence Level:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {selectedRec.confidence}%
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Estimated Impact:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {selectedRec.estimatedImpact}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Time Investment:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {selectedRec.timeToComplete}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              
              <DialogActions sx={{ p: 3, pt: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)'
                        }
                      }}
                    >
                      Accept Recommendation
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderColor: '#d1d5db',
                        color: '#374151',
                        '&:hover': {
                          borderColor: '#9ca3af',
                          bgcolor: '#f9fafb'
                        }
                      }}
                    >
                      Maybe Later
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

export default PersonalizedRecommendations;
