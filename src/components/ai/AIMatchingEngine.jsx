import React, { useState, useEffect } from 'react';
import { users, sessions, subjects } from '../../data/mockData';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Autocomplete,
  CircularProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  AutoAwesome as AutoAwesomeIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon,
  MenuBook as MenuBookIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Speed as SpeedIcon,
  School as SchoolIcon,
  Lightbulb as LightbulbIcon,
  Assessment as AssessmentIcon,
  FlashOn as FlashOnIcon
} from '@mui/icons-material';

// Mock AI Matching Algorithm
export const AIMatchingEngine = {
  // Smart Tutor-Student Matching
  findBestTutorMatches: (studentId, subjectPreferences = [], learningStyle = 'visual') => {
    console.log('🤖 AI Matching Engine: Analyzing student profile...');
    
    const student = users.find(u => u.id === studentId);
    const tutors = users.filter(u => u.role === 'tutor');
    
    return tutors.map(tutor => {
      // Simulate AI scoring algorithm
      let matchScore = 0;
      let reasoning = [];
      
      // Subject expertise matching (40% weight)
      const subjectMatch = tutor.specialties?.some(specialty => 
        subjectPreferences.some(pref => 
          specialty.toLowerCase().includes(pref.toLowerCase())
        )
      );
      if (subjectMatch) {
        matchScore += 40;
        reasoning.push('Subject expertise alignment');
      }
      
      // Rating and experience (25% weight)
      if (tutor.rating >= 4.5) {
        matchScore += 25;
        reasoning.push('High performance rating');
      } else if (tutor.rating >= 4.0) {
        matchScore += 20;
        reasoning.push('Good performance rating');
      }
      
      // Learning style compatibility (20% weight)
      const teachingStyles = ['visual', 'auditory', 'kinesthetic', 'reading'];
      const compatibleStyle = teachingStyles[Math.floor(Math.random() * teachingStyles.length)];
      if (compatibleStyle === learningStyle) {
        matchScore += 20;
        reasoning.push('Teaching style compatibility');
      }
      
      // Availability matching (15% weight)
      if (tutor.availability) {
        matchScore += 15;
        reasoning.push('Schedule availability');
      }
      
      // Add some randomness for diversity
      matchScore += Math.random() * 10;
      
      return {
        ...tutor,
        matchScore: Math.min(Math.round(matchScore), 100),
        reasoning,
        compatibility: {
          subjectExpertise: subjectMatch ? 'high' : 'medium',
          teachingStyle: compatibleStyle,
          scheduleFlexibility: 'high',
          communicationStyle: ['friendly', 'professional', 'patient'][Math.floor(Math.random() * 3)]
        },
        estimatedSuccessRate: Math.round(matchScore * 0.8 + Math.random() * 20)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  },

  // Personalized Learning Recommendations
  generateLearningRecommendations: (studentId, performanceData = []) => {
    console.log('🤖 AI Engine: Generating personalized recommendations...');
    
    const recommendations = [
      {
        id: 1,
        type: 'study_method',
        title: 'Interactive Coding Practice',
        description: 'Based on your learning pattern, hands-on coding exercises will improve retention by 40%',
        priority: 'high',
        confidence: 92,
        estimatedImpact: 'High',
        timeToComplete: '2-3 hours/week',
        resources: ['LeetCode', 'HackerRank', 'CodePen'],
        reasoning: 'Your performance improves 35% faster with practical exercises vs. theory'
      },
      {
        id: 2,
        type: 'schedule',
        title: 'Morning Study Sessions',
        description: 'Schedule complex topics between 9-11 AM when your focus peaks',
        priority: 'medium',
        confidence: 87,
        estimatedImpact: 'Medium',
        timeToComplete: 'Ongoing',
        resources: ['Calendar optimization', 'Focus tracking'],
        reasoning: 'Your quiz scores are 23% higher during morning sessions'
      },
      {
        id: 3,
        type: 'content',
        title: 'Visual Learning Materials',
        description: 'Incorporate more diagrams and flowcharts in your study materials',
        priority: 'medium',
        confidence: 78,
        estimatedImpact: 'Medium',
        timeToComplete: '1 hour setup',
        resources: ['Miro', 'Draw.io', 'Concept maps'],
        reasoning: 'Visual learners show 28% better comprehension with diagrams'
      },
      {
        id: 4,
        type: 'tutor_interaction',
        title: 'Increase Q&A Sessions',
        description: 'Schedule 15-minute Q&A after each lesson to reinforce learning',
        priority: 'low',
        confidence: 85,
        estimatedImpact: 'Medium',
        timeToComplete: '15 min/session',
        resources: ['Question templates', 'Review notes'],
        reasoning: 'Students with regular Q&A show 31% better retention'
      }
    ];

    return recommendations;
  },

  // Automated Schedule Optimization
  optimizeSchedule: (userId, currentSessions = [], preferences = {}) => {
    console.log('🤖 AI Engine: Optimizing schedule...');
    
    const optimization = {
      suggestions: [
        {
          type: 'consolidation',
          title: 'Consolidate Related Subjects',
          description: 'Group Programming and Database sessions on the same day for better knowledge transfer',
          potentialBenefit: 'Save 2 hours/week commute time',
          confidence: 94
        },
        {
          type: 'timing',
          title: 'Optimize Session Timing',
          description: 'Move difficult subjects to your peak performance hours (9-11 AM)',
          potentialBenefit: 'Improve learning efficiency by 25%',
          confidence: 89
        },
        {
          type: 'spacing',
          title: 'Implement Spaced Learning',
          description: 'Add 30-minute review sessions 2 days after each main lesson',
          potentialBenefit: 'Increase retention by 40%',
          confidence: 92
        }
      ],
      optimizedSchedule: {
        monday: [
          { time: '09:00-10:30', subject: 'Advanced Programming', type: 'main' },
          { time: '11:00-11:30', subject: 'Programming Review', type: 'review' }
        ],
        wednesday: [
          { time: '09:00-10:30', subject: 'Database Design', type: 'main' },
          { time: '14:00-14:30', subject: 'Programming Practice', type: 'practice' }
        ],
        friday: [
          { time: '09:00-10:30', subject: 'Algorithms', type: 'main' },
          { time: '11:00-11:30', subject: 'Database Review', type: 'review' }
        ]
      },
      metrics: {
        timesSaved: '3 hours/week',
        efficiencyGain: '28%',
        stressReduction: '35%',
        costOptimization: '15%'
      }
    };

    return optimization;
  },

  // Intelligent Content Suggestions
  suggestContent: (subjectId, currentLevel = 'intermediate', learningGoals = []) => {
    console.log('🤖 AI Engine: Suggesting intelligent content...');
    
    const contentSuggestions = [
      {
        id: 1,
        type: 'video',
        title: 'Advanced React Hooks Patterns',
        description: 'Deep dive into custom hooks and advanced patterns',
        provider: 'YouTube - Academind',
        duration: '45 minutes',
        difficulty: 'Advanced',
        relevanceScore: 96,
        estimatedTime: '2 hours with practice',
        prerequisites: ['React Basics', 'JavaScript ES6'],
        learningOutcomes: ['Custom hooks', 'Performance optimization', 'Advanced patterns']
      },
      {
        id: 2,
        type: 'article',
        title: 'Database Indexing Strategies',
        description: 'Comprehensive guide to database performance optimization',
        provider: 'HCMUT Digital Library',
        readingTime: '20 minutes',
        difficulty: 'Intermediate',
        relevanceScore: 89,
        estimatedTime: '1 hour with exercises',
        prerequisites: ['SQL Basics', 'Database Design'],
        learningOutcomes: ['Index optimization', 'Query performance', 'Database tuning']
      },
      {
        id: 3,
        type: 'practice',
        title: 'Algorithm Challenge Set',
        description: 'Curated problems matching your current skill level',
        provider: 'LeetCode Premium',
        duration: '2-3 hours',
        difficulty: 'Mixed',
        relevanceScore: 94,
        estimatedTime: '3 hours',
        prerequisites: ['Data Structures', 'Basic Algorithms'],
        learningOutcomes: ['Problem solving', 'Code optimization', 'Time complexity']
      },
      {
        id: 4,
        type: 'project',
        title: 'Full-Stack E-commerce App',
        description: 'Build a complete application integrating your learned skills',
        provider: 'HCMUT Project Lab',
        duration: '2 weeks',
        difficulty: 'Advanced',
        relevanceScore: 87,
        estimatedTime: '20 hours',
        prerequisites: ['React', 'Node.js', 'Database Design'],
        learningOutcomes: ['Full-stack development', 'System design', 'Deployment']
      }
    ];

    return {
      recommendations: contentSuggestions,
      learningPath: {
        currentLevel: currentLevel,
        nextMilestone: 'Advanced Developer',
        progressToNext: '68%',
        estimatedTimeToNext: '4-6 weeks',
        recommendedSequence: contentSuggestions.map(c => c.id)
      },
      adaptiveAdjustments: {
        difficultyAdjustment: 'Slightly increase based on recent performance',
        paceRecommendation: 'Current pace is optimal, maintain consistency',
        focusAreas: ['Practical application', 'System design thinking']
      }
    };
  }
};

// AI Matching Component
export const AIMatchingComponent = ({ studentId, onMatchFound }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matches, setMatches] = useState([]);
  const [analysisStage, setAnalysisStage] = useState('');

  const runMatching = async () => {
    setIsAnalyzing(true);
    setMatches([]);
    
    // Simulate AI processing stages
    const stages = [
      'Analyzing student profile...',
      'Processing learning preferences...',
      'Evaluating tutor compatibility...',
      'Calculating match scores...',
      'Optimizing recommendations...'
    ];

    for (let i = 0; i < stages.length; i++) {
      setAnalysisStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const results = AIMatchingEngine.findBestTutorMatches(
      studentId, 
      ['Programming', 'Database'], 
      'visual'
    );
    
    setMatches(results.slice(0, 3));
    setIsAnalyzing(false);
    onMatchFound?.(results);
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
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              mr: 2,
              width: 48,
              height: 48
            }}
          >
            <PsychologyIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
              AI Tutor Matching
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Powered by machine learning algorithms
            </Typography>
          </Box>
        </Box>

      {!isAnalyzing && matches.length === 0 && (
        <Button
          onClick={runMatching}
          variant="contained"
          fullWidth
          startIcon={<FlashOnIcon />}
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
          Find Perfect Tutor Match
        </Button>
      )}

      {isAnalyzing && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <CircularProgress 
              size={24} 
              sx={{ mr: 2, color: '#1e40af' }}
            />
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 500,
                color: '#1e40af'
              }}
            >
              {analysisStage}
            </Typography>
          </Box>
        </Box>
      )}

      {matches.length > 0 && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e293b' }}>
            Top AI Recommendations
          </Typography>
          <Grid container spacing={2}>
            {matches.map((match, index) => (
              <Grid item xs={12} key={match.id}>
                <Card
                  elevation={1}
                  sx={{
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: '#1e40af',
                            mr: 2,
                            width: 40,
                            height: 40,
                            fontSize: '0.875rem',
                            fontWeight: 600
                          }}
                        >
                          #{index + 1}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {match.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ color: '#fbbf24', fontSize: '1rem', mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              {match.rating}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              • {match.reviewCount} reviews
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#059669' }}>
                          {match.matchScore}%
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          match score
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Success Rate
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b' }}>
                          {match.estimatedSuccessRate}%
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Teaching Style
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', textTransform: 'capitalize' }}>
                          {match.compatibility.teachingStyle}
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        AI Reasoning
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {match.reasoning.map((reason, idx) => (
                          <Chip
                            key={idx}
                            label={reason}
                            size="small"
                            sx={{
                              bgcolor: '#eff6ff',
                              color: '#1e40af',
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)',
                        }
                      }}
                    >
                      Connect with {match.name}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      </CardContent>
    </Card>
  );
};

export default AIMatchingComponent;
