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
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Schedule as ClockIcon,
  GpsFixed as TargetIcon,
  TrendingUp as TrendingUpIcon,
  FlashOn as ZapIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowRightIcon,
  BarChart as BarChart3Icon,
  Timer as TimerIcon
} from '@mui/icons-material';

const ScheduleOptimizer = () => {
  const { user } = useContext(UserContext);
  const [optimization, setOptimization] = useState(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState([
    { day: 'Monday', time: '14:00-15:30', subject: 'Programming', tutor: 'Dr. Minh' },
    { day: 'Wednesday', time: '16:00-17:30', subject: 'Database', tutor: 'Dr. Lan' },
    { day: 'Friday', time: '10:00-11:30', subject: 'Algorithms', tutor: 'Dr. Hoang' }
  ]);

  const optimizeSchedule = async () => {
    setIsOptimizing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = AIMatchingEngine.optimizeSchedule(user.id, currentSchedule);
    setOptimization(result);
    setIsOptimizing(false);
  };

  const applyOptimization = () => {
    // Convert optimization to current schedule format
    const newSchedule = [];
    Object.entries(optimization.optimizedSchedule).forEach(([day, sessions]) => {
      sessions.forEach(session => {
        newSchedule.push({
          day: day.charAt(0).toUpperCase() + day.slice(1),
          time: session.time,
          subject: session.subject,
          type: session.type
        });
      });
    });
    setCurrentSchedule(newSchedule);
    setOptimization(null);
  };

  const getScheduleTypeColor = (type) => {
    switch (type) {
      case 'main': return { bgcolor: '#eff6ff', color: '#1e40af' };
      case 'review': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'practice': return { bgcolor: '#f3e8ff', color: '#7c3aed' };
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
                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                mr: 2,
                width: 48,
                height: 48
              }}
            >
              <CalendarIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                AI Schedule Optimizer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Optimize your learning schedule for maximum efficiency
              </Typography>
            </Box>
          </Box>
          
          <Button
            onClick={optimizeSchedule}
            disabled={isOptimizing}
            variant="contained"
            startIcon={isOptimizing ? <CircularProgress size={16} color="inherit" /> : <ZapIcon />}
            sx={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
              },
              '&:disabled': {
                opacity: 0.6
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize Schedule'}
          </Button>
        </Box>

        {/* Current Schedule */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
            Current Schedule
          </Typography>
          <Grid container spacing={1}>
            {currentSchedule.map((session, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: '#f9fafb',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <ClockIcon sx={{ color: '#6b7280', fontSize: '1rem' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {session.day}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {session.time}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {session.subject}
                        </Typography>
                        {session.type && (
                          <Chip
                            label={session.type}
                            size="small"
                            sx={{
                              ...getScheduleTypeColor(session.type),
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textTransform: 'capitalize'
                            }}
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {session.tutor}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Optimization Results */}
        {optimization && (
          <Fade in timeout={500}>
            <Box sx={{ mb: 3 }}>
              <Card
                elevation={1}
                sx={{
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  border: '1px solid #bfdbfe',
                  mb: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e40af', mb: 2 }}>
                    Optimization Results
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} lg={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e40af' }}>
                          {optimization.metrics.timesSaved}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1e40af' }}>
                          Time Saved
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#059669' }}>
                          {optimization.metrics.efficiencyGain}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#059669' }}>
                          Efficiency Gain
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#7c3aed' }}>
                          {optimization.metrics.stressReduction}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#7c3aed' }}>
                          Stress Reduction
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} lg={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#ea580c' }}>
                          {optimization.metrics.costOptimization}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#ea580c' }}>
                          Cost Optimization
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                  AI Suggestions
                </Typography>
                <Grid container spacing={2}>
                  {optimization.suggestions.map((suggestion, index) => (
                    <Grid item xs={12} key={index}>
                      <Card
                        elevation={1}
                        sx={{
                          border: '1px solid #e2e8f0',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                                {suggestion.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {suggestion.description}
                              </Typography>
                            </Box>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e40af' }}>
                                {suggestion.confidence}%
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                confidence
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TrendingUpIcon sx={{ color: '#059669', fontSize: '1rem', mr: 1 }} />
                            <Typography variant="body2" sx={{ color: '#059669' }}>
                              {suggestion.potentialBenefit}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Optimized Schedule Preview */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                  Optimized Schedule
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(optimization.optimizedSchedule).map(([day, sessions]) => (
                    <Grid item xs={12} key={day}>
                      <Card
                        elevation={1}
                        sx={{
                          border: '1px solid #e2e8f0'
                        }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textTransform: 'capitalize' }}>
                            {day}
                          </Typography>
                          <Grid container spacing={1}>
                            {sessions.map((session, index) => (
                              <Grid item xs={12} key={index}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <TimerIcon sx={{ color: '#6b7280', fontSize: '1rem' }} />
                                  <Typography variant="body2" sx={{ color: '#1e293b' }}>
                                    {session.time}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {session.subject}
                                  </Typography>
                                  <Chip
                                    label={session.type}
                                    size="small"
                                    sx={{
                                      ...getScheduleTypeColor(session.type),
                                      fontSize: '0.75rem',
                                      fontWeight: 600,
                                      textTransform: 'capitalize'
                                    }}
                                  />
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Action Buttons */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    onClick={applyOptimization}
                    variant="contained"
                    fullWidth
                    startIcon={<CheckCircleIcon />}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
                      },
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    Apply Optimization
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => setOptimization(null)}
                    variant="outlined"
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af',
                        bgcolor: '#f9fafb'
                      }
                    }}
                  >
                    Keep Current Schedule
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        )}

        {/* Performance Insights */}
        <Card
          elevation={0}
          sx={{
            bgcolor: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
              Performance Insights
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <BarChart3Icon sx={{ fontSize: '2rem', color: '#1e40af', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Peak Learning Hours
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    9:00 AM - 11:00 AM
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <TrendingUpIcon sx={{ fontSize: '2rem', color: '#059669', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Productivity Score
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    87% this week
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <ClockIcon sx={{ fontSize: '2rem', color: '#7c3aed', mb: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                    Optimal Session Length
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    90 minutes
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ScheduleOptimizer;
