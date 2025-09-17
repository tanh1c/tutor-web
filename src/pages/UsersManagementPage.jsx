import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  Alert,
  Snackbar,
  FormControlLabel,
  Switch,
  Rating,
  Tooltip,
  Badge,
  Divider,
  Stack,
  Menu,
  MenuItem as MenuItemComponent,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  MoreVert as MoreVertIcon,
  FileDownload as FileDownloadIcon,
  Refresh as RefreshIcon,
  VerifiedUser as VerifiedIcon,
  Schedule as ScheduleIcon,
  Assessment as AssessmentIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as CoordinatorIcon,
  PersonOutline as StudentIcon,
  ExpandMore as ExpandMoreIcon,
  Security as SecurityIcon,
  Block as BlockIcon,
  Lock as LockIcon,
  History as HistoryIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { UserContext } from '../context/UserContext';
import { users as mockUsers, subjects, facultySubjects, sessions, tutorAnalytics } from '../data/mockData';
import Header from '../components/layout/Header';

// Custom theme colors
const theme = {
  primary: '#1e40af',
  secondary: '#1e3a8a',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  background: '#f8fafc',
  surface: '#ffffff'
};

const UsersManagementPage = () => {
  const { user: currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // State management
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [currentTab, setCurrentTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Dialog states
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'student',
    department: '',
    status: 'active',
    verified: false,
    subjects: [],
    bio: '',
    education: ''
  });
  
  // Notification states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Initialize data
  useEffect(() => {
    const loadUsers = () => {
      setLoading(true);
      try {
        // Enhance users with additional data
        const enhancedUsers = mockUsers.map(user => {
          const userSessions = sessions.filter(s => 
            s.tutorId === user.id || s.studentId === user.id
          );
          
          return {
            ...user,
            totalSessions: userSessions.length,
            lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
            verified: user.verified || Math.random() > 0.3,
            status: user.status || (Math.random() > 0.05 ? 'active' : Math.random() > 0.5 ? 'inactive' : 'suspended'),
            createdAt: user.createdAt || new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
            loginCount: Math.floor(Math.random() * 100) + 1
          };
        });
        
        setUsers(enhancedUsers);
        setFilteredUsers(enhancedUsers);
      } catch (error) {
        showSnackbar('Lỗi khi tải dữ liệu người dùng', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Role filter
    if (filterRole !== 'all') {
      filtered = filtered.filter(user => user.role === filterRole);
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    // Department filter
    if (filterDepartment !== 'all') {
      filtered = filtered.filter(user => user.department === filterDepartment);
    }

    setFilteredUsers(filtered);
    setPage(0);
  }, [users, searchTerm, filterRole, filterStatus, filterDepartment]);

  // Utility functions
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'student',
      department: '',
      status: 'active',
      verified: false,
      subjects: [],
      bio: '',
      education: ''
    });
  };

  // CRUD operations
  const handleAddUser = () => {
    try {
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        totalSessions: 0,
        loginCount: 0
      };

      setUsers([...users, newUser]);
      setOpenAddDialog(false);
      resetForm();
      showSnackbar('Thêm người dùng thành công!');
    } catch (error) {
      showSnackbar('Lỗi khi thêm người dùng', 'error');
    }
  };

  const handleEditUser = () => {
    try {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      );
      
      setUsers(updatedUsers);
      setOpenEditDialog(false);
      setSelectedUser(null);
      resetForm();
      showSnackbar('Cập nhật thông tin người dùng thành công!');
    } catch (error) {
      showSnackbar('Lỗi khi cập nhật thông tin', 'error');
    }
  };

  const handleDeleteUser = (userId) => {
    try {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      showSnackbar('Xóa người dùng thành công!');
    } catch (error) {
      showSnackbar('Lỗi khi xóa người dùng', 'error');
    }
  };

  const handleToggleStatus = (userId, newStatus) => {
    try {
      const updatedUsers = users.map(user =>
        user.id === userId
          ? { ...user, status: newStatus }
          : user
      );
      
      setUsers(updatedUsers);
      showSnackbar(
        `${getStatusActionLabel(newStatus)} người dùng thành công!`
      );
    } catch (error) {
      showSnackbar('Lỗi khi thay đổi trạng thái', 'error');
    }
  };

  const handleVerifyUser = (userId, verified) => {
    try {
      const updatedUsers = users.map(user =>
        user.id === userId
          ? { ...user, verified }
          : user
      );
      
      setUsers(updatedUsers);
      showSnackbar(
        `${verified ? 'Xác thực' : 'Hủy xác thực'} người dùng thành công!`
      );
    } catch (error) {
      showSnackbar('Lỗi khi thay đổi trạng thái xác thực', 'error');
    }
  };

  // Dialog handlers
  const openAddUserDialog = () => {
    resetForm();
    setOpenAddDialog(true);
  };

  const openEditUserDialog = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      department: user.department || '',
      status: user.status,
      verified: user.verified,
      subjects: user.subjects || [],
      bio: user.bio || '',
      education: user.education || ''
    });
    setOpenEditDialog(true);
  };

  const openViewUserDialog = (user) => {
    console.log('Navigating to user profile:', user);
    navigate(`/profile/${user.id}`);
  };

  // Menu handlers
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  // Export functionality
  const handleExportData = () => {
    try {
      const exportData = filteredUsers.map(user => ({
        'ID': user.id,
        'Tên': user.name,
        'Email': user.email,
        'Vai trò': getRoleLabel(user.role),
        'Khoa': user.department,
        'Trạng thái': getStatusLabel(user.status),
        'Xác thực': user.verified ? 'Có' : 'Không',
        'Ngày tạo': new Date(user.createdAt).toLocaleDateString('vi-VN'),
        'Lần đăng nhập cuối': new Date(user.lastLogin).toLocaleDateString('vi-VN'),
        'Tổng sessions': user.totalSessions
      }));

      const csvContent = "data:text/csv;charset=utf-8," + 
        Object.keys(exportData[0]).join(",") + "\n" +
        exportData.map(row => Object.values(row).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "users_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showSnackbar('Xuất dữ liệu thành công!');
    } catch (error) {
      showSnackbar('Lỗi khi xuất dữ liệu', 'error');
    }
  };

  // Get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <AdminIcon />;
      case 'coordinator': return <CoordinatorIcon />;
      case 'tutor': return <SchoolIcon />;
      case 'student': return <StudentIcon />;
      default: return <PersonIcon />;
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return '#dc2626';
      case 'coordinator': return '#7c3aed';
      case 'tutor': return '#059669';
      case 'student': return '#1e40af';
      default: return '#64748b';
    }
  };

  // Get role label
  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Quản trị viên';
      case 'coordinator': return 'Điều phối viên';
      case 'tutor': return 'Gia sư';
      case 'student': return 'Học viên';
      default: return 'Không xác định';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.success;
      case 'inactive': return theme.warning;
      case 'suspended': return theme.error;
      default: return theme.primary;
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Không hoạt động';
      case 'suspended': return 'Bị khóa';
      default: return 'Không xác định';
    }
  };

  // Get status action label
  const getStatusActionLabel = (status) => {
    switch (status) {
      case 'active': return 'Kích hoạt';
      case 'inactive': return 'Vô hiệu hóa';
      case 'suspended': return 'Khóa';
      default: return 'Thay đổi';
    }
  };

  // Statistics by role
  const statsByRole = {
    admin: users.filter(u => u.role === 'admin').length,
    coordinator: users.filter(u => u.role === 'coordinator').length,
    tutor: users.filter(u => u.role === 'tutor').length,
    student: users.filter(u => u.role === 'student').length
  };

  // Statistics by status
  const statsByStatus = {
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  // Get unique departments
  const departments = [...new Set(users.map(u => u.department).filter(Boolean))];

  return (
    <>
      <Header />
      <Box sx={{ p: 3, backgroundColor: theme.background, minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color={theme.primary} gutterBottom>
          👥 Quản lý Người dùng
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý toàn bộ người dùng trong hệ thống
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`, color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{users.length}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Tổng người dùng</Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: `linear-gradient(135deg, ${theme.success} 0%, #047857 100%)`, color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{statsByStatus.active}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Đang hoạt động</Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: `linear-gradient(135deg, ${theme.warning} 0%, #c2410c 100%)`, color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{statsByStatus.inactive}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Không hoạt động</Typography>
                </Box>
                <CancelIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: `linear-gradient(135deg, ${theme.error} 0%, #b91c1c 100%)`, color: 'white' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">{statsByStatus.suspended}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>Bị khóa</Typography>
                </Box>
                <BlockIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Role Statistics */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          📊 Phân bố theo vai trò
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Box textAlign="center" sx={{ p: 2, borderRadius: 2, backgroundColor: '#fef2f2' }}>
              <AdminIcon sx={{ fontSize: 40, color: '#dc2626', mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="#dc2626">
                {statsByRole.admin}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quản trị viên
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box textAlign="center" sx={{ p: 2, borderRadius: 2, backgroundColor: '#faf5ff' }}>
              <CoordinatorIcon sx={{ fontSize: 40, color: '#7c3aed', mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="#7c3aed">
                {statsByRole.coordinator}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Điều phối viên
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box textAlign="center" sx={{ p: 2, borderRadius: 2, backgroundColor: '#f0fdf4' }}>
              <SchoolIcon sx={{ fontSize: 40, color: '#059669', mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="#059669">
                {statsByRole.tutor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gia sư
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box textAlign="center" sx={{ p: 2, borderRadius: 2, backgroundColor: '#eff6ff' }}>
              <StudentIcon sx={{ fontSize: 40, color: '#1e40af', mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" color="#1e40af">
                {statsByRole.student}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Học viên
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Controls */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="600">
            Danh sách người dùng
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => window.location.reload()}
              sx={{ borderColor: theme.primary, color: theme.primary }}
            >
              Làm mới
            </Button>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportData}
              sx={{ borderColor: theme.success, color: theme.success }}
            >
              Xuất dữ liệu
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={openAddUserDialog}
              sx={{ 
                backgroundColor: theme.primary,
                '&:hover': { backgroundColor: theme.secondary }
              }}
            >
              Thêm người dùng
            </Button>
          </Box>
        </Box>

        {/* Search and Filters */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Tìm kiếm theo tên, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Vai trò</InputLabel>
              <Select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="admin">Quản trị viên</MenuItem>
                <MenuItem value="coordinator">Điều phối viên</MenuItem>
                <MenuItem value="tutor">Gia sư</MenuItem>
                <MenuItem value="student">Học viên</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="active">Hoạt động</MenuItem>
                <MenuItem value="inactive">Không hoạt động</MenuItem>
                <MenuItem value="suspended">Bị khóa</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Khoa</InputLabel>
              <Select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">Tất cả khoa</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Results summary */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Hiển thị {filteredUsers.length} trong số {users.length} người dùng
        </Typography>

        {/* Users Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                <TableCell sx={{ fontWeight: 600 }}>Người dùng</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Vai trò</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Liên hệ</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Khoa</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Hoạt động</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            user.verified ? (
                              <VerifiedIcon sx={{ fontSize: 16, color: theme.success }} />
                            ) : null
                          }
                        >
                          <Avatar
                            sx={{
                              width: 48,
                              height: 48,
                              backgroundColor: getRoleColor(user.role),
                              fontWeight: 'bold'
                            }}
                          >
                            {user.name.charAt(0)}
                          </Avatar>
                        </Badge>
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        icon={getRoleIcon(user.role)}
                        label={getRoleLabel(user.role)}
                        size="small"
                        sx={{
                          backgroundColor: `${getRoleColor(user.role)}15`,
                          color: getRoleColor(user.role),
                          fontWeight: 600,
                          '& .MuiChip-icon': {
                            color: getRoleColor(user.role)
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant="body2" display="flex" alignItems="center" gap={1}>
                          <EmailIcon sx={{ fontSize: 16 }} />
                          {user.email}
                        </Typography>
                        {user.phone && (
                          <Typography variant="body2" display="flex" alignItems="center" gap={1} color="text.secondary">
                            <PhoneIcon sx={{ fontSize: 16 }} />
                            {user.phone}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {user.department || 'Chưa xác định'}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {user.loginCount} lần đăng nhập
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Cuối: {new Date(user.lastLogin).toLocaleDateString('vi-VN')}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={getStatusLabel(user.status)}
                        size="small"
                        sx={{
                          backgroundColor: `${getStatusColor(user.status)}15`,
                          color: getStatusColor(user.status),
                          fontWeight: 600
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, user)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Số dòng mỗi trang:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`
          }
        />
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { boxShadow: '0 8px 32px rgba(0,0,0,0.15)', borderRadius: 2 }
        }}
      >
        <MenuItemComponent onClick={() => {
          openViewUserDialog(selectedUser);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Xem chi tiết</ListItemText>
        </MenuItemComponent>

        <MenuItemComponent onClick={() => {
          openEditUserDialog(selectedUser);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Chỉnh sửa</ListItemText>
        </MenuItemComponent>

        <MenuItemComponent onClick={() => {
          handleToggleStatus(
            selectedUser.id, 
            selectedUser.status === 'active' ? 'inactive' : 'active'
          );
          handleMenuClose();
        }}>
          <ListItemIcon>
            {selectedUser?.status === 'active' ? 
              <CancelIcon fontSize="small" /> : 
              <CheckCircleIcon fontSize="small" />
            }
          </ListItemIcon>
          <ListItemText>
            {selectedUser?.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'}
          </ListItemText>
        </MenuItemComponent>

        <MenuItemComponent onClick={() => {
          handleToggleStatus(selectedUser.id, 'suspended');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Khóa tài khoản</ListItemText>
        </MenuItemComponent>

        <MenuItemComponent onClick={() => {
          handleVerifyUser(selectedUser.id, !selectedUser.verified);
          handleMenuClose();
        }}>
          <ListItemIcon>
            <VerifiedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {selectedUser?.verified ? 'Hủy xác thực' : 'Xác thực'}
          </ListItemText>
        </MenuItemComponent>

        <Divider />

        <MenuItemComponent 
          onClick={() => {
            handleDeleteUser(selectedUser.id);
            handleMenuClose();
          }}
          sx={{ color: theme.error }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: theme.error }} />
          </ListItemIcon>
          <ListItemText>Xóa người dùng</ListItemText>
        </MenuItemComponent>
      </Menu>

      {/* Add User Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={() => setOpenAddDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            ➕ Thêm người dùng mới
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <MenuItem value="student">Học viên</MenuItem>
                  <MenuItem value="tutor">Gia sư</MenuItem>
                  <MenuItem value="coordinator">Điều phối viên</MenuItem>
                  <MenuItem value="admin">Quản trị viên</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Khoa"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <MenuItem value="active">Hoạt động</MenuItem>
                  <MenuItem value="inactive">Không hoạt động</MenuItem>
                  <MenuItem value="suspended">Bị khóa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {(formData.role === 'tutor') && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Môn học</InputLabel>
                  <Select
                    multiple
                    value={formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Học vấn"
                multiline
                rows={2}
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giới thiệu"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.verified}
                    onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                  />
                }
                label="Xác thực người dùng"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenAddDialog(false)}
            sx={{ mr: 1 }}
          >
            Hủy
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddUser}
            sx={{ 
              backgroundColor: theme.primary,
              '&:hover': { backgroundColor: theme.secondary }
            }}
          >
            Thêm người dùng
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            ✏️ Chỉnh sửa thông tin người dùng
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Họ và tên"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Vai trò</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <MenuItem value="student">Học viên</MenuItem>
                  <MenuItem value="tutor">Gia sư</MenuItem>
                  <MenuItem value="coordinator">Điều phối viên</MenuItem>
                  <MenuItem value="admin">Quản trị viên</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Khoa"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <MenuItem value="active">Hoạt động</MenuItem>
                  <MenuItem value="inactive">Không hoạt động</MenuItem>
                  <MenuItem value="suspended">Bị khóa</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {(formData.role === 'tutor') && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Môn học</InputLabel>
                  <Select
                    multiple
                    value={formData.subjects}
                    onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Học vấn"
                multiline
                rows={2}
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Giới thiệu"
                multiline
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.verified}
                    onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                  />
                }
                label="Xác thực người dùng"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setOpenEditDialog(false)}
            sx={{ mr: 1 }}
          >
            Hủy
          </Button>
          <Button 
            variant="contained" 
            onClick={handleEditUser}
            sx={{ 
              backgroundColor: theme.primary,
              '&:hover': { backgroundColor: theme.secondary }
            }}
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      </Box>
    </>
  );
};

export default UsersManagementPage;