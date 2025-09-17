import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { HCMUTLogo } from '../ui/HCMUTBrand';
import {
  AppBar,
  Toolbar,
  Box,
  Tab,
  Tabs,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Chip,
  Paper,
  List,
  ListItem,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Home as HomeIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  Group as GroupIcon,
  SmartToy as AIIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  SupervisorAccount as ManageIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import '../../styles/header-theme.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser, logout } = useContext(UserContext);
  const theme = useTheme();

  const primaryColor = '#1e40af';
  const secondaryColor = '#1e3a8a';

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setProfileAnchorEl(null);
        setNotificationAnchorEl(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = (event) => {
    setProfileAnchorEl(event.currentTarget);
    setNotificationAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    setProfileAnchorEl(null);
  };

  const handleCloseMenus = () => {
    setProfileAnchorEl(null);
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleCloseMenus();
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <HomeIcon /> },
    ...(currentUser?.role === 'student' ? [
      { path: '/tutors', label: 'Tìm gia sư', icon: <SchoolIcon /> },
      { path: '/schedule', label: 'Lịch học', icon: <ScheduleIcon /> },
      { path: '/community', label: 'Cộng đồng', icon: <GroupIcon /> },
      { path: '/ai-features', label: 'AI Assistant', icon: <AIIcon /> },
    ] : currentUser?.role === 'coordinator' ? [
      { path: '/manage-tutors', label: 'Quản lý gia sư', icon: <ManageIcon /> },
      { path: '/schedule', label: 'Lịch dạy', icon: <ScheduleIcon /> },
      { path: '/community', label: 'Cộng đồng', icon: <GroupIcon /> },
      { path: '/ai-features', label: 'AI Assistant', icon: <AIIcon /> },
    ] : currentUser?.role === 'admin' ? [
      { path: '/users', label: 'Quản lý người dùng', icon: <PeopleIcon /> },
      { path: '/manage-tutors', label: 'Quản lý gia sư', icon: <ManageIcon /> },
      { path: '/system-management', label: 'Hệ thống', icon: <SettingsIcon /> },
      { path: '/community', label: 'Cộng đồng', icon: <GroupIcon /> },
    ] : [
      { path: '/schedule', label: 'Lịch dạy', icon: <ScheduleIcon /> },
      { path: '/community', label: 'Cộng đồng', icon: <GroupIcon /> },
    ]),
  ];

  const getCurrentTabValue = () => {
    const currentPath = location.pathname;
    const tabIndex = navigationItems.findIndex(item => item.path === currentPath);
    return tabIndex >= 0 ? tabIndex : false;
  };

  const handleTabChange = (event, newValue) => {
    if (newValue !== false && navigationItems[newValue]) {
      navigate(navigationItems[newValue].path);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-container" ref={headerRef}>
      <div className="header-content">
        {/* Logo */}
        <Link to="/dashboard" className="header-logo">
          <HCMUTLogo 
            size="sm" 
            variant="transparent" 
            showText={true}
            textPosition="right"
            className="header-logo-component"
          />
        </Link>

        {/* Desktop Navigation with Material-UI Tabs */}
        <Box className="nav-desktop" sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
          <Tabs
            value={getCurrentTabValue()}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                color: '#1e3a8a',
                fontWeight: 500,
                fontSize: '0.875rem',
                textTransform: 'none',
                minHeight: 48,
                opacity: 0.8,
                '&:hover': {
                  color: '#1e40af',
                  opacity: 1,
                  backgroundColor: 'rgba(30, 64, 175, 0.1)',
                },
                '&.Mui-selected': {
                  color: '#1e40af',
                  fontWeight: 600,
                  opacity: 1,
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#1e40af',
                height: 3,
                borderRadius: '2px 2px 0 0',
              },
            }}
          >
            {navigationItems.map((item, index) => (
              <Tab
                key={item.path}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Box>
                }
                sx={{ minWidth: 'auto', px: 2 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Right side actions with Material-UI */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Notifications */}
          <IconButton
            onClick={handleNotificationClick}
            sx={{
              color: '#1e3a8a',
              opacity: 0.8,
              '&:hover': {
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                color: '#1e40af',
                opacity: 1,
              },
            }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem' } }}>
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Notification Menu */}
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleCloseMenus}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 320,
                maxWidth: 400,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" color={primaryColor} fontWeight="bold" display="flex" alignItems="center" gap={1}>
                <NotificationsIcon />
                Thông báo
              </Typography>
            </Box>
            <List sx={{ p: 0, maxHeight: 300, overflow: 'auto' }}>
              <ListItem sx={{ py: 1.5, px: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.primary" mb={0.5}>
                    Buổi học mới được đặt
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 phút trước
                  </Typography>
                  <Chip label="Mới" color="primary" size="small" sx={{ ml: 1 }} />
                </Box>
              </ListItem>
              <Divider />
              <ListItem sx={{ py: 1.5, px: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.primary" mb={0.5}>
                    Tin nhắn từ gia sư
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    5 phút trước
                  </Typography>
                </Box>
              </ListItem>
              <Divider />
              <ListItem sx={{ py: 1.5, px: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.primary" mb={0.5}>
                    Đánh giá buổi học hoàn thành
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1 giờ trước
                  </Typography>
                </Box>
              </ListItem>
            </List>
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
              <Typography
                variant="body2"
                component={Link}
                to="/notifications"
                onClick={handleCloseMenus}
                sx={{
                  color: primaryColor,
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Xem tất cả thông báo
              </Typography>
            </Box>
          </Menu>

          {/* User Profile */}
          <IconButton
            onClick={handleProfileClick}
            sx={{
              p: 0.5,
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  backgroundColor: '#1e40af',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                {currentUser?.name?.charAt(0) || 'U'}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" color="#1e3a8a" fontWeight={500} lineHeight={1.2}>
                  {currentUser?.name || 'User'}
                </Typography>
                <Typography variant="caption" color="#64748b" lineHeight={1}>
                  {currentUser?.role || 'Student'}
                </Typography>
              </Box>
            </Box>
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchorEl}
            open={Boolean(profileAnchorEl)}
            onClose={handleCloseMenus}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 280,
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#1e40af',
                    color: '#ffffff',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                  }}
                >
                  {currentUser?.name?.charAt(0) || 'U'}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                    {currentUser?.name || 'User'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser?.email || 'user@hcmut.edu.vn'}
                  </Typography>
                  <Chip
                    label={currentUser?.role || 'Student'}
                    size="small"
                    sx={{
                      mt: 0.5,
                      backgroundColor: alpha(primaryColor, 0.1),
                      color: primaryColor,
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </Box>
            </Box>
            
            <MenuItem
              component={Link}
              to="/profile"
              onClick={handleCloseMenus}
              sx={{ py: 1.5 }}
            >
              <ListItemIcon>
                <PersonIcon sx={{ color: primaryColor }} />
              </ListItemIcon>
              <ListItemText primary="Hồ sơ cá nhân" />
            </MenuItem>
            
            <MenuItem sx={{ py: 1.5 }}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: primaryColor }} />
              </ListItemIcon>
              <ListItemText primary="Cài đặt" />
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: 'error.main' }} />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </MenuItem>
          </Menu>

          {/* Mobile menu button */}
          <IconButton
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            sx={{
              display: { md: 'none' },
              color: '#1e3a8a',
              ml: 1,
              opacity: 0.8,
              '&:hover': {
                backgroundColor: 'rgba(30, 64, 175, 0.1)',
                color: '#1e40af',
                opacity: 1,
              },
            }}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </div>

      {/* Mobile Navigation with Material-UI */}
      {isMenuOpen && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(30, 64, 175, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
          className="mobile-nav"
        >
          <List sx={{ py: 2 }}>
            {navigationItems.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                sx={{
                  color: location.pathname === item.path ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  borderRadius: 1,
                  mx: 2,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  },
                  textDecoration: 'none',
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontWeight: location.pathname === item.path ? 600 : 500,
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </header>
  );
};

export default Header;
