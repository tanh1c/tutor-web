import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  Tooltip,
  Fade,
  Slide,
  useTheme,
  alpha,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Rating,
  LinearProgress,
  Stack,
  Badge
} from '@mui/material';

import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assignment as AssignIcon,
  Analytics as AnalyticsIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

import { UserContext } from '../context/UserContext';
import { users as mockUsers, subjects, tutorAnalytics, sessions } from '../data/mockData';
import Header from '../components/layout/Header';

const ManageTutorsPage = () => {
  const theme = useTheme();
  const { user: currentUser } = useContext(UserContext);
  
  // State management
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  
  // Modal states
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isAddTutorModalOpen, setIsAddTutorModalOpen] = useState(false);
  
  // Form states
  const [editForm, setEditForm] = useState({});
  const [newTutorForm, setNewTutorForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 1,
    bio: '',
    specializations: [],
    approvalStatus: 'pending',
    status: 'inactive'
  });
  const [assignedSubjects, setAssignedSubjects] = useState([]);
  
  // Notification states
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  
  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';

  // Initialize data
  useEffect(() => {
    const tutorUsers = mockUsers.filter(user => user.role === 'tutor').map(tutor => {
      const tutorStats = tutorAnalytics.find(stat => stat.tutorId === tutor.id) || {};
      const tutorSessions = sessions.filter(session => session.tutorId === tutor.id);
      
      return {
        ...tutor,
        status: tutor.status || 'active',
        experience: tutor.experience || Math.floor(Math.random() * 5) + 1,
        specializations: tutor.specializations || subjects.slice(0, Math.floor(Math.random() * 3) + 1).map(s => s.name),
        rating: tutorStats.averageRating || (4 + Math.random()).toFixed(1),
        totalSessions: tutorSessions.length,
        completedSessions: tutorSessions.filter(s => s.status === 'completed').length,
        approvalStatus: tutor.approvalStatus || 'approved',
        joinDate: tutor.joinDate || new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: tutor.lastActive || new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        earnings: tutorStats.totalEarnings || Math.floor(Math.random() * 10000000) + 1000000,
        studentCount: tutorStats.studentCount || Math.floor(Math.random() * 50) + 5
      };
    });
    
    setTutors(tutorUsers);
    setFilteredTutors(tutorUsers);
  }, []);

  // Filter tutors based on criteria
  useEffect(() => {
    let filtered = [...tutors];
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tutor =>
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tutor => tutor.status === statusFilter);
    }
    
    // Subject filter
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(tutor => 
        tutor.specializations.includes(subjectFilter)
      );
    }
    
    // Experience filter
    if (experienceFilter !== 'all') {
      const expRange = experienceFilter.split('-');
      filtered = filtered.filter(tutor => {
        if (expRange.length === 2) {
          return tutor.experience >= parseInt(expRange[0]) && tutor.experience <= parseInt(expRange[1]);
        }
        return tutor.experience >= parseInt(experienceFilter);
      });
    }
    
    // Rating filter
    if (ratingFilter !== 'all') {
      filtered = filtered.filter(tutor => parseFloat(tutor.rating) >= parseFloat(ratingFilter));
    }
    
    setFilteredTutors(filtered);
    setPage(0);
  }, [tutors, searchTerm, statusFilter, subjectFilter, experienceFilter, ratingFilter]);

  // Handle tutor status change
  const handleStatusChange = (tutorId, newStatus) => {
    setTutors(prev => prev.map(tutor => 
      tutor.id === tutorId ? { ...tutor, status: newStatus } : tutor
    ));
    
    showNotification(
      `Gia sư đã được ${newStatus === 'active' ? 'kích hoạt' : 'tạm ngưng'}`,
      'success'
    );
  };

  // Handle tutor approval
  const handleApproval = (tutorId, approved) => {
    setTutors(prev => prev.map(tutor => 
      tutor.id === tutorId ? { 
        ...tutor, 
        approvalStatus: approved ? 'approved' : 'rejected',
        status: approved ? 'active' : 'inactive'
      } : tutor
    ));
    
    showNotification(
      `Gia sư đã được ${approved ? 'phê duyệt' : 'từ chối'}`,
      approved ? 'success' : 'warning'
    );
  };

  // Handle edit tutor
  const handleEditTutor = () => {
    setTutors(prev => prev.map(tutor => 
      tutor.id === selectedTutor.id ? { ...tutor, ...editForm } : tutor
    ));
    
    setIsEditModalOpen(false);
    showNotification('Thông tin gia sư đã được cập nhật', 'success');
  };

  // Handle assign subjects
  const handleAssignSubjects = () => {
    setTutors(prev => prev.map(tutor => 
      tutor.id === selectedTutor.id ? { ...tutor, specializations: assignedSubjects } : tutor
    ));
    
    setIsAssignModalOpen(false);
    showNotification('Môn học đã được phân công', 'success');
  };

  // Handle add new tutor
  const handleAddTutor = () => {
    const newId = Math.max(...tutors.map(t => t.id)) + 1;
    const newTutor = {
      ...newTutorForm,
      id: newId,
      role: 'tutor',
      avatar: null,
      rating: '0.0',
      totalSessions: 0,
      completedSessions: 0,
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      earnings: 0,
      studentCount: 0
    };

    setTutors(prev => [...prev, newTutor]);
    setIsAddTutorModalOpen(false);
    setNewTutorForm({
      name: '',
      email: '',
      phone: '',
      experience: 1,
      bio: '',
      specializations: [],
      approvalStatus: 'pending',
      status: 'inactive'
    });
    showNotification('Gia sư mới đã được thêm vào hệ thống', 'success');
  };

  // Show notification
  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'inactive': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  // Get approval status color
  const getApprovalColor = (status) => {
    switch (status) {
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      case 'pending': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  // Tab panels
  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Header />
      
      <Box sx={{ p: 3, maxWidth: '1400px', mx: 'auto' }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: primaryColor,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <SchoolIcon sx={{ fontSize: 40 }} />
            Quản lý Gia sư
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Quản lý và theo dõi tất cả gia sư trong hệ thống
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {tutors.length}
                    </Typography>
                    <Typography variant="body2">Tổng gia sư</Typography>
                  </Box>
                  <PeopleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {tutors.filter(t => t.status === 'active').length}
                    </Typography>
                    <Typography variant="body2">Đang hoạt động</Typography>
                  </Box>
                  <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {tutors.filter(t => t.approvalStatus === 'pending').length}
                    </Typography>
                    <Typography variant="body2">Chờ phê duyệt</Typography>
                  </Box>
                  <ScheduleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
              color: 'white'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {(tutors.reduce((sum, t) => sum + parseFloat(t.rating), 0) / tutors.length).toFixed(1)}
                    </Typography>
                    <Typography variant="body2">Đánh giá TB</Typography>
                  </Box>
                  <StarIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Card sx={{ mb: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Tìm kiếm gia sư..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
                sx={{ minWidth: 300, flexGrow: 1 }}
              />
              
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                onClick={() => setIsFilterDrawerOpen(true)}
                sx={{ 
                  borderColor: primaryColor,
                  color: primaryColor,
                  '&:hover': { borderColor: secondaryColor, backgroundColor: alpha(primaryColor, 0.1) }
                }}
              >
                Bộ lọc
              </Button>
              
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddTutorModalOpen(true)}
                sx={{
                  backgroundColor: primaryColor,
                  '&:hover': { backgroundColor: secondaryColor }
                }}
              >
                Thêm gia sư
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Tutors Table */}
        <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: alpha(primaryColor, 0.1) }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gia sư</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Liên hệ</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Chuyên môn</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Đánh giá</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Sessions</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTutors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tutor) => (
                  <TableRow 
                    key={tutor.id}
                    sx={{ 
                      '&:hover': { backgroundColor: alpha(primaryColor, 0.05) },
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={tutor.avatar}
                          sx={{ 
                            width: 50, 
                            height: 50,
                            backgroundColor: primaryColor
                          }}
                        >
                          {tutor.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {tutor.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {tutor.experience} năm kinh nghiệm
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{tutor.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{tutor.phone || 'Chưa cập nhật'}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {tutor.specializations.slice(0, 2).map((spec, index) => (
                          <Chip
                            key={index}
                            label={spec}
                            size="small"
                            sx={{ 
                              backgroundColor: alpha(primaryColor, 0.1),
                              color: primaryColor,
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                        {tutor.specializations.length > 2 && (
                          <Chip
                            label={`+${tutor.specializations.length - 2}`}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: '0.75rem' }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Chip
                          label={tutor.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(tutor.status),
                            color: 'white',
                            fontWeight: 'medium'
                          }}
                        />
                        <Chip
                          label={
                            tutor.approvalStatus === 'approved' ? 'Đã duyệt' :
                            tutor.approvalStatus === 'pending' ? 'Chờ duyệt' : 'Từ chối'
                          }
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: getApprovalColor(tutor.approvalStatus),
                            color: getApprovalColor(tutor.approvalStatus),
                            fontSize: '0.7rem'
                          }}
                        />
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating
                          value={parseFloat(tutor.rating)}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {tutor.rating}
                        </Typography>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {tutor.completedSessions}/{tutor.totalSessions}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={(tutor.completedSessions / tutor.totalSessions) * 100 || 0}
                          sx={{ mt: 0.5, height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedTutor(tutor);
                              setIsViewModalOpen(true);
                            }}
                            sx={{ color: primaryColor }}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Chỉnh sửa">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedTutor(tutor);
                              setEditForm({...tutor});
                              setIsEditModalOpen(true);
                            }}
                            sx={{ color: '#ff9800' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Phân công môn học">
                          <IconButton
                            size="small"
                            onClick={() => {
                              setSelectedTutor(tutor);
                              setAssignedSubjects([...tutor.specializations]);
                              setIsAssignModalOpen(true);
                            }}
                            sx={{ color: '#9c27b0' }}
                          >
                            <AssignIcon />
                          </IconButton>
                        </Tooltip>
                        
                        <Tooltip title={tutor.status === 'active' ? 'Tạm ngưng' : 'Kích hoạt'}>
                          <IconButton
                            size="small"
                            onClick={() => handleStatusChange(tutor.id, tutor.status === 'active' ? 'inactive' : 'active')}
                            sx={{ color: tutor.status === 'active' ? '#f44336' : '#4caf50' }}
                          >
                            <BlockIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            component="div"
            count={filteredTutors.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="Số dòng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) => `${from}–${to} trong ${count}`}
          />
        </Card>
      </Box>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: primaryColor }}>
            Bộ lọc nâng cao
          </Typography>
          
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Trạng thái"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Tạm ngưng</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Môn học</InputLabel>
              <Select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                label="Môn học"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Kinh nghiệm</InputLabel>
              <Select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                label="Kinh nghiệm"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="1-2">1-2 năm</MenuItem>
                <MenuItem value="3-5">3-5 năm</MenuItem>
                <MenuItem value="5">5+ năm</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Đánh giá tối thiểu</InputLabel>
              <Select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                label="Đánh giá tối thiểu"
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="4.5">4.5+ ⭐</MenuItem>
                <MenuItem value="4.0">4.0+ ⭐</MenuItem>
                <MenuItem value="3.5">3.5+ ⭐</MenuItem>
                <MenuItem value="3.0">3.0+ ⭐</MenuItem>
              </Select>
            </FormControl>
            
            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setStatusFilter('all');
                setSubjectFilter('all');
                setExperienceFilter('all');
                setRatingFilter('all');
              }}
            >
              Xóa bộ lọc
            </Button>
          </Stack>
        </Box>
      </Drawer>

      {/* Add New Tutor Modal */}
      <Dialog
        open={isAddTutorModalOpen}
        onClose={() => setIsAddTutorModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: primaryColor, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Thêm gia sư mới
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsAddTutorModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          pt: 6, 
          pb: 3, 
          px: 3,
          maxHeight: '70vh', 
          overflow: 'auto',
          mt: 2
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Tên gia sư"
                value={newTutorForm.name}
                onChange={(e) => setNewTutorForm(prev => ({ ...prev, name: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                value={newTutorForm.email}
                onChange={(e) => setNewTutorForm(prev => ({ ...prev, email: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={newTutorForm.phone}
                onChange={(e) => setNewTutorForm(prev => ({ ...prev, phone: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Kinh nghiệm (năm)"
                type="number"
                value={newTutorForm.experience}
                onChange={(e) => setNewTutorForm(prev => ({ ...prev, experience: parseInt(e.target.value) || 1 }))}
                variant="outlined"
                InputProps={{ inputProps: { min: 1, max: 50 } }}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                Chọn chuyên môn:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {subjects.map((subject) => (
                  <Chip
                    key={subject.id}
                    label={subject.name}
                    clickable
                    variant={newTutorForm.specializations.includes(subject.name) ? 'filled' : 'outlined'}
                    color={newTutorForm.specializations.includes(subject.name) ? 'primary' : 'default'}
                    onClick={() => {
                      if (newTutorForm.specializations.includes(subject.name)) {
                        setNewTutorForm(prev => ({
                          ...prev, 
                          specializations: prev.specializations.filter(s => s !== subject.name)
                        }));
                      } else {
                        setNewTutorForm(prev => ({
                          ...prev, 
                          specializations: [...prev.specializations, subject.name]
                        }));
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả bản thân"
                multiline
                rows={3}
                value={newTutorForm.bio}
                onChange={(e) => setNewTutorForm(prev => ({ ...prev, bio: e.target.value }))}
                variant="outlined"
                placeholder="Gia sư mô tả về bản thân, kinh nghiệm, phương pháp dạy..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: alpha(primaryColor, 0.05) }}>
          <Button 
            onClick={() => setIsAddTutorModalOpen(false)}
            variant="outlined"
            sx={{ 
              borderColor: primaryColor,
              color: primaryColor,
              '&:hover': { borderColor: secondaryColor, backgroundColor: alpha(primaryColor, 0.1) }
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTutor}
            startIcon={<SaveIcon />}
            disabled={!newTutorForm.name || !newTutorForm.email || newTutorForm.specializations.length === 0}
            sx={{ 
              backgroundColor: primaryColor,
              '&:hover': { backgroundColor: secondaryColor }
            }}
          >
            Thêm gia sư
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Tutor Modal */}
      <Dialog
        open={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: primaryColor, 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h6">Chi tiết gia sư</Typography>
          <IconButton
            onClick={() => setIsViewModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          {selectedTutor && (
            <Box sx={{ pt: 4, pb: 3, px: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Avatar
                      src={selectedTutor.avatar}
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        mx: 'auto', 
                        mb: 2,
                        backgroundColor: primaryColor,
                        fontSize: '2rem'
                      }}
                    >
                      {selectedTutor.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {selectedTutor.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Rating value={parseFloat(selectedTutor.rating)} precision={0.1} readOnly />
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {selectedTutor.rating}
                      </Typography>
                    </Box>
                    <Chip
                      label={selectedTutor.status === 'active' ? 'Hoạt động' : 'Tạm ngưng'}
                      sx={{
                        backgroundColor: getStatusColor(selectedTutor.status),
                        color: 'white',
                        fontWeight: 'medium'
                      }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, backgroundColor: alpha(primaryColor, 0.05) }}>
                        <Typography variant="h6" sx={{ color: primaryColor, mb: 1 }}>
                          Thông tin liên hệ
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{selectedTutor.email}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{selectedTutor.phone || 'Chưa cập nhật'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2">{selectedTutor.location || 'TP.HCM'}</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Paper sx={{ p: 2, backgroundColor: alpha('#4caf50', 0.05) }}>
                        <Typography variant="h6" sx={{ color: '#4caf50', mb: 1 }}>
                          Thống kê
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Tổng sessions:</strong> {selectedTutor.totalSessions}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Hoàn thành:</strong> {selectedTutor.completedSessions}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Học viên:</strong> {selectedTutor.studentCount}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Thu nhập:</strong> {selectedTutor.earnings?.toLocaleString('vi-VN')} VND
                        </Typography>
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, backgroundColor: alpha('#ff9800', 0.05) }}>
                        <Typography variant="h6" sx={{ color: '#ff9800', mb: 2 }}>
                          Chuyên môn
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {selectedTutor.specializations.map((spec, index) => (
                            <Chip
                              key={index}
                              label={spec}
                              sx={{ 
                                backgroundColor: alpha('#ff9800', 0.1),
                                color: '#ff9800'
                              }}
                            />
                          ))}
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: alpha(primaryColor, 0.05) }}>
          <Button
            variant="outlined"
            startIcon={<AnalyticsIcon />}
            onClick={() => {
              setIsViewModalOpen(false);
              setIsAnalyticsModalOpen(true);
            }}
            sx={{ color: primaryColor, borderColor: primaryColor }}
          >
            Xem Analytics
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => {
              setIsViewModalOpen(false);
              setEditForm({...selectedTutor});
              setIsEditModalOpen(true);
            }}
            sx={{ backgroundColor: primaryColor }}
          >
            Chỉnh sửa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Tutor Modal */}
      <Dialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#ff9800', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Chỉnh sửa thông tin gia sư
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsEditModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          pt: 6, 
          pb: 3, 
          px: 3,
          maxHeight: '70vh', 
          overflow: 'auto',
          mt: 2
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tên gia sư"
                value={editForm.name || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={editForm.email || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={editForm.phone || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kinh nghiệm (năm)"
                type="number"
                value={editForm.experience || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                variant="outlined"
                InputProps={{ inputProps: { min: 0, max: 50 } }}
                sx={{ mt: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Trạng thái phê duyệt</InputLabel>
                <Select
                  value={editForm.approvalStatus || 'pending'}
                  onChange={(e) => setEditForm(prev => ({ ...prev, approvalStatus: e.target.value }))}
                  label="Trạng thái phê duyệt"
                >
                  <MenuItem value="pending">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                      Chờ phê duyệt
                    </Box>
                  </MenuItem>
                  <MenuItem value="approved">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                      Đã phê duyệt
                    </Box>
                  </MenuItem>
                  <MenuItem value="rejected">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CancelIcon sx={{ color: '#f44336', fontSize: 20 }} />
                      Từ chối
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Trạng thái hoạt động</InputLabel>
                <Select
                  value={editForm.status || 'active'}
                  onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                  label="Trạng thái hoạt động"
                >
                  <MenuItem value="active">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                      Hoạt động
                    </Box>
                  </MenuItem>
                  <MenuItem value="inactive">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BlockIcon sx={{ color: '#f44336', fontSize: 20 }} />
                      Tạm ngưng
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mô tả bản thân"
                multiline
                rows={3}
                value={editForm.bio || ''}
                onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                variant="outlined"
                placeholder="Gia sư có thể mô tả về bản thân, kinh nghiệm, phương pháp dạy..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: alpha('#ff9800', 0.05) }}>
          <Button 
            onClick={() => setIsEditModalOpen(false)}
            variant="outlined"
            sx={{ 
              borderColor: '#ff9800',
              color: '#ff9800',
              '&:hover': { borderColor: '#f57c00', backgroundColor: alpha('#ff9800', 0.1) }
            }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleEditTutor}
            startIcon={<SaveIcon />}
            sx={{ 
              backgroundColor: '#ff9800',
              '&:hover': { backgroundColor: '#f57c00' }
            }}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Dialog>

      {/* Assign Subjects Modal */}
      <Dialog
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: '#9c27b0', color: 'white' }}>
          <Typography variant="h6">Phân công môn học</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Chọn các môn học mà gia sư có thể dạy:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {subjects.map((subject) => (
              <Chip
                key={subject.id}
                label={subject.name}
                clickable
                variant={assignedSubjects.includes(subject.name) ? 'filled' : 'outlined'}
                color={assignedSubjects.includes(subject.name) ? 'primary' : 'default'}
                onClick={() => {
                  if (assignedSubjects.includes(subject.name)) {
                    setAssignedSubjects(prev => prev.filter(s => s !== subject.name));
                  } else {
                    setAssignedSubjects(prev => [...prev, subject.name]);
                  }
                }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAssignModalOpen(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleAssignSubjects}
            sx={{ backgroundColor: '#9c27b0' }}
          >
            Lưu phân công
          </Button>
        </DialogActions>
      </Dialog>

      {/* Analytics Modal */}
      <Dialog
        open={isAnalyticsModalOpen}
        onClose={() => setIsAnalyticsModalOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: '#9c27b0', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnalyticsIcon />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Analytics - {selectedTutor?.name}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setIsAnalyticsModalOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          pt: 4, 
          pb: 3, 
          px: 3,
          maxHeight: '75vh', 
          overflow: 'auto' 
        }}>
          {selectedTutor && (
            <Grid container spacing={3}>
              {/* Performance Metrics */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: alpha('#4caf50', 0.05) }}>
                  <Typography variant="h6" sx={{ color: '#4caf50', mb: 2, fontWeight: 'bold' }}>
                    📊 Hiệu suất giảng dạy
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Tổng sessions:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                        {selectedTutor.totalSessions}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Hoàn thành:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                        {selectedTutor.completedSessions} ({((selectedTutor.completedSessions / selectedTutor.totalSessions) * 100 || 0).toFixed(1)}%)
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Đánh giá trung bình:</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={parseFloat(selectedTutor.rating)} precision={0.1} size="small" readOnly />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                          {selectedTutor.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Số học viên:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2196f3' }}>
                        {selectedTutor.studentCount}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              {/* Financial Metrics */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: alpha('#ff9800', 0.05) }}>
                  <Typography variant="h6" sx={{ color: '#ff9800', mb: 2, fontWeight: 'bold' }}>
                    💰 Thông tin tài chính
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Tổng thu nhập:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                        {selectedTutor.earnings?.toLocaleString('vi-VN')} VND
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Thu nhập/session:</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                        {selectedTutor.totalSessions > 0 ? Math.round(selectedTutor.earnings / selectedTutor.totalSessions).toLocaleString('vi-VN') : '0'} VND
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Thời gian tham gia:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {new Date(selectedTutor.joinDate).toLocaleDateString('vi-VN')}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body1">Lần hoạt động cuối:</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {new Date(selectedTutor.lastActive).toLocaleDateString('vi-VN')}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              {/* Subjects & Skills */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: alpha('#9c27b0', 0.05) }}>
                  <Typography variant="h6" sx={{ color: '#9c27b0', mb: 2, fontWeight: 'bold' }}>
                    🎓 Chuyên môn & Kỹ năng
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {selectedTutor.specializations.map((spec, index) => (
                      <Chip
                        key={index}
                        label={spec}
                        sx={{ 
                          backgroundColor: alpha('#9c27b0', 0.1),
                          color: '#9c27b0',
                          fontWeight: 'medium'
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Kinh nghiệm: {selectedTutor.experience} năm | 
                    Trạng thái: {selectedTutor.status === 'active' ? 'Đang hoạt động' : 'Tạm ngưng'} | 
                    Phê duyệt: {selectedTutor.approvalStatus === 'approved' ? 'Đã duyệt' : selectedTutor.approvalStatus === 'pending' ? 'Chờ duyệt' : 'Từ chối'}
                  </Typography>
                </Paper>
              </Grid>

              {/* Recent Activity Simulation */}
              <Grid item xs={12}>
                <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: alpha('#2196f3', 0.05) }}>
                  <Typography variant="h6" sx={{ color: '#2196f3', mb: 2, fontWeight: 'bold' }}>
                    📈 Hoạt động gần đây (30 ngày)
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                          {Math.floor(Math.random() * 10) + 5}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Sessions hoàn thành</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                          {Math.floor(Math.random() * 5) + 2}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Học viên mới</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                          {(4.2 + Math.random() * 0.8).toFixed(1)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Đánh giá TB tháng</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'white', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ color: '#f44336', fontWeight: 'bold' }}>
                          {Math.floor(Math.random() * 3)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">Sessions bị hủy</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, backgroundColor: alpha('#9c27b0', 0.05) }}>
          <Button
            variant="outlined"
            onClick={() => setIsAnalyticsModalOpen(false)}
            sx={{ 
              borderColor: '#9c27b0',
              color: '#9c27b0',
              '&:hover': { borderColor: '#7b1fa2', backgroundColor: alpha('#9c27b0', 0.1) }
            }}
          >
            Đóng
          </Button>
          <Button
            variant="contained"
            startIcon={<TrendingUpIcon />}
            sx={{ 
              backgroundColor: '#9c27b0',
              '&:hover': { backgroundColor: '#7b1fa2' }
            }}
            onClick={() => showNotification('Báo cáo chi tiết đã được xuất', 'info')}
          >
            Xuất báo cáo
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
          severity={notification.severity}
          variant="filled"
          sx={{ minWidth: '300px' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageTutorsPage;
