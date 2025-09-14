import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import AIMatchingEngine from '../components/ai/AIMatchingEngine';
import PersonalizedRecommendations from '../components/ai/PersonalizedRecommendations';
import ScheduleOptimizer from '../components/ai/ScheduleOptimizer';
import ContentSuggestions from '../components/ai/ContentSuggestions';
import IntegrationStatus from '../components/integrations/IntegrationStatus';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Fade,
  Zoom,
  LinearProgress,
  Chip,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Stack,
  Divider
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  AutoAwesome as AutoAwesomeIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  Settings as SettingsIcon,
  SmartToy as SmartToyIcon,
  Speed as SpeedIcon,
  Star as StarIcon,
  Lightbulb as LightbulbIcon,
  Analytics as AnalyticsIcon,
  Insights as InsightsIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const AI_FEATURES = [
  {
    id: 'matching',
    title: 'Smart Tutor Matching',
    description: 'AI-powered algorithm to find the perfect tutor based on your learning style and goals',
    icon: SmartToyIcon,
    color: '#1e40af',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
    component: 'matching'
  },
  {
    id: 'recommendations',
    title: 'Personalized Learning',
    description: 'Get personalized study recommendations based on your progress and performance',
    icon: LightbulbIcon,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    component: 'recommendations'
  },
  {
    id: 'scheduling',
    title: 'Schedule Optimization',
    description: 'Automatically optimize your study schedule for maximum efficiency',
    icon: ScheduleIcon,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    component: 'scheduling'
  },
  {
    id: 'content',
    title: 'Content Suggestions',
    description: 'Intelligent content recommendations tailored to your learning path',
    icon: MenuBookIcon,
    color: '#ea580c',
    gradient: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
    component: 'content'
  }
];

const AIFeatures = () => {
  const { user } = useContext(UserContext);
  const [activeFeature, setActiveFeature] = useState('matching');
  const [showIntegrations, setShowIntegrations] = useState(false);

  const renderActiveComponent = () => {
    switch (activeFeature) {
      case 'matching':
        return <AIMatchingEngine />;
      case 'recommendations':
        return <PersonalizedRecommendations />;
      case 'scheduling':
        return <ScheduleOptimizer />;
      case 'content':
        return <ContentSuggestions />;
      default:
        return <AIMatchingEngine />;
    }
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
        <Container maxWidth="lg">
          {/* Header Section */}
          <Fade in={true} timeout={1000}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                mb: 4,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  p: 4,
                  color: 'white'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar
                    sx={{
                      background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 100%)',
                      color: '#1e40af',
                      width: 64,
                      height: 64
                    }}
                  >
                    <PsychologyIcon sx={{ fontSize: 36 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" fontWeight={800} gutterBottom>
                      AI-Powered Features
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                      Harness the power of artificial intelligence to enhance your learning experience
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  {[
                    { icon: <AutoAwesomeIcon />, title: 'Smart Algorithms', desc: 'Advanced machine learning models' },
                    { icon: <StarIcon />, title: 'Personalized Experience', desc: 'Tailored to your unique needs' },
                    { icon: <TrendingUpIcon />, title: 'Continuous Learning', desc: 'Improves with every interaction' }
                  ].map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                      <Paper
                        elevation={8}
                        sx={{
                          p: 3,
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: 3,
                          color: 'white',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            background: 'rgba(255, 255, 255, 0.25)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          {item.icon}
                          <Typography variant="h6" fontWeight={700}>
                            {item.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {item.desc}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Card>
          </Fade>

          {/* AI Features Grid */}
          <Fade in={true} timeout={1200}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                mb: 4,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                p: 4, 
                borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="h5" fontWeight={700} color="#1e40af">
                  AI Features Dashboard
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<SettingsIcon />}
                  onClick={() => setShowIntegrations(!showIntegrations)}
                  sx={{
                    borderColor: '#1e40af',
                    color: '#1e40af',
                    borderRadius: 3,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: '#1e40af',
                      backgroundColor: 'rgba(30, 64, 175, 0.05)'
                    }
                  }}
                >
                  Integrations
                </Button>
              </Box>

              <Box sx={{ p: 4 }}>
                <Grid container spacing={3}>
                  {AI_FEATURES.map((feature, index) => {
                    const IconComponent = feature.icon;
                    const isActive = activeFeature === feature.id;
                    
                    return (
                      <Grid item xs={12} sm={6} md={3} key={feature.id}>
                        <Zoom in={true} timeout={800 + index * 200}>
                          <Card
                            elevation={isActive ? 16 : 8}
                            sx={{
                              cursor: 'pointer',
                              borderRadius: 4,
                              overflow: 'hidden',
                              transition: 'all 0.3s ease-in-out',
                              border: isActive ? '2px solid #1e40af' : '2px solid transparent',
                              background: isActive 
                                ? 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(30, 64, 175, 0.1) 100%)'
                                : 'white',
                              '&:hover': {
                                transform: 'translateY(-8px)',
                                boxShadow: '0 16px 40px rgba(30, 64, 175, 0.2)',
                                border: '2px solid #1e40af'
                              }
                            }}
                            onClick={() => setActiveFeature(feature.id)}
                          >
                            <Box
                              sx={{
                                background: feature.gradient,
                                p: 3,
                                display: 'flex',
                                justifyContent: 'center'
                              }}
                            >
                              <Avatar
                                sx={{
                                  background: 'rgba(255, 255, 255, 0.9)',
                                  color: feature.color,
                                  width: 56,
                                  height: 56
                                }}
                              >
                                <IconComponent sx={{ fontSize: 28 }} />
                              </Avatar>
                            </Box>
                            
                            <CardContent sx={{ p: 3 }}>
                              <Typography variant="h6" fontWeight={700} color="#1f2937" gutterBottom>
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {feature.description}
                              </Typography>
                              
                              {isActive && (
                                <Chip
                                  label="Active"
                                  icon={<CheckCircleIcon />}
                                  sx={{
                                    mt: 2,
                                    backgroundColor: '#1e40af',
                                    color: 'white',
                                    fontWeight: 600
                                  }}
                                />
                              )}
                            </CardContent>
                          </Card>
                        </Zoom>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            </Card>
          </Fade>

          {/* Integration Status */}
          {showIntegrations && (
            <Fade in={true} timeout={800}>
              <Card
                elevation={12}
                sx={{
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(30, 64, 175, 0.1)',
                  mb: 4
                }}
              >
                <IntegrationStatus />
              </Card>
            </Fade>
          )}

          {/* Active Feature Component */}
          <Fade in={true} timeout={1400}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                mb: 4
              }}
            >
              {renderActiveComponent()}
            </Card>
          </Fade>

          {/* AI Performance Metrics */}
          <Fade in={true} timeout={1600}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { 
                  title: 'AI Accuracy', 
                  value: '94.7%', 
                  progress: 94.7, 
                  color: '#10b981',
                  icon: <AnalyticsIcon />,
                  desc: 'Based on user feedback and success rates'
                },
                { 
                  title: 'Recommendations Used', 
                  value: '1,247', 
                  progress: 75, 
                  color: '#3b82f6',
                  icon: <InsightsIcon />,
                  desc: 'Total AI recommendations implemented',
                  trend: '↑ 23% from last month'
                },
                { 
                  title: 'Learning Improvement', 
                  value: '+31%', 
                  progress: 85, 
                  color: '#7c3aed',
                  icon: <SchoolIcon />,
                  desc: 'Students using AI features show better progress'
                }
              ].map((metric, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    elevation={8}
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(30, 64, 175, 0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(30, 64, 175, 0.2)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Avatar
                          sx={{
                            background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}aa 100%)`,
                            color: 'white'
                          }}
                        >
                          {metric.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={700} color="#1f2937">
                            {metric.title}
                          </Typography>
                          <Typography variant="h4" fontWeight={800} color={metric.color}>
                            {metric.value}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <LinearProgress
                        variant="determinate"
                        value={metric.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'rgba(156, 163, 175, 0.2)',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 4,
                            background: `linear-gradient(135deg, ${metric.color} 0%, ${metric.color}aa 100%)`
                          }
                        }}
                      />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {metric.desc}
                      </Typography>
                      
                      {metric.trend && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <TrendingUpIcon sx={{ fontSize: 16, color: '#10b981' }} />
                          <Typography variant="body2" color="#10b981" fontWeight={600}>
                            {metric.trend}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>

          {/* Feature Comparison */}
          <Fade in={true} timeout={1800}>
            <Card
              elevation={12}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(30, 64, 175, 0.1)'
              }}
            >
              <CardContent sx={{ p: 5 }}>
                <Typography variant="h5" fontWeight={700} color="#1e40af" gutterBottom sx={{ mb: 4 }}>
                  Traditional vs AI-Enhanced Learning
                </Typography>
                
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper
                      elevation={4}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.05) 0%, rgba(156, 163, 175, 0.1) 100%)',
                        border: '1px solid rgba(156, 163, 175, 0.2)'
                      }}
                    >
                      <Typography variant="h6" fontWeight={700} color="#6b7280" gutterBottom sx={{ mb: 3 }}>
                        Traditional Approach
                      </Typography>
                      <Stack spacing={2}>
                        {[
                          'Manual tutor selection based on basic criteria',
                          'Generic study schedules and recommendations',
                          'Limited personalization options',
                          'Reactive feedback and adjustments',
                          'Standard content delivery methods'
                        ].map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: '#9ca3af',
                                mt: 1,
                                flexShrink: 0
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper
                      elevation={4}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.05) 0%, rgba(30, 64, 175, 0.1) 100%)',
                        border: '1px solid rgba(30, 64, 175, 0.2)'
                      }}
                    >
                      <Typography variant="h6" fontWeight={700} color="#1e40af" gutterBottom sx={{ mb: 3 }}>
                        AI-Enhanced Approach
                      </Typography>
                      <Stack spacing={2}>
                        {[
                          'Smart matching based on learning style and compatibility',
                          'Personalized recommendations using machine learning',
                          'Adaptive learning paths that evolve with progress',
                          'Proactive optimization and real-time adjustments',
                          'Intelligent content suggestions and resource curation'
                        ].map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                            <CheckCircleIcon
                              sx={{
                                fontSize: 18,
                                color: '#10b981',
                                mt: 0.2,
                                flexShrink: 0
                              }}
                            />
                            <Typography variant="body2" color="#1f2937" fontWeight={500}>
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </Layout>
  );
};

export default AIFeatures;
