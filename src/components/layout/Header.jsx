import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { HCMUTLogo } from '../ui/HCMUTBrand';
import '../../styles/header-theme.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser, logout } = useContext(UserContext);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle functions with mutual exclusivity
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
    setIsNotificationOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false);
    setIsNotificationOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    ...(currentUser?.role === 'student' ? [
      { path: '/tutors', label: 'Tìm gia sư', icon: '👨‍🏫' },
      { path: '/schedule', label: 'Lịch học', icon: '📅' },
      { path: '/community', label: 'Cộng đồng', icon: '👥' },
      { path: '/ai-features', label: 'AI Assistant', icon: '🤖' },
    ] : [
      { path: '/schedule', label: 'Lịch dạy', icon: '📅' },
      { path: '/community', label: 'Cộng đồng', icon: '👥' },
    ]),
  ];

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

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : 'inactive'}`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="header-actions">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={toggleNotifications}
              className={`notification-btn ${isNotificationOpen ? 'active' : ''}`}
              aria-label="Thông báo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zm-8-3a3 3 0 01-3-3V8a3 3 0 016 0v3a3 3 0 01-3 3z" />
              </svg>
              <span className="notification-badge"></span>
            </button>

            <div className={`dropdown-overlay notification-dropdown ${isNotificationOpen ? 'open' : ''}`}>
              <div className="notification-header">
                <h3 className="notification-title">Thông báo</h3>
              </div>
              <div className="notification-content">
                <div className="notification-list">
                  <div className="notification-item unread">
                    <p className="notification-text">Buổi học mới được đặt</p>
                    <p className="notification-time">2 phút trước</p>
                  </div>
                  <div className="notification-item read">
                    <p className="notification-text">Tin nhắn từ gia sư</p>
                    <p className="notification-time">5 phút trước</p>
                  </div>
                  <div className="notification-item read">
                    <p className="notification-text">Đánh giá buổi học hoàn thành</p>
                    <p className="notification-time">1 giờ trước</p>
                  </div>
                </div>
              </div>
              <div className="notification-footer">
                <Link to="/notifications">Xem tất cả thông báo</Link>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className={`profile-btn ${isProfileOpen ? 'active' : ''}`}
              aria-label="Hồ sơ người dùng"
            >
              <div className="profile-avatar">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div className="profile-info">
                <p className="profile-name">{currentUser?.name || 'User'}</p>
                <p className="profile-role">{currentUser?.role || 'Student'}</p>
              </div>
              <svg className="w-4 h-4 text-neutral-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`dropdown-overlay profile-dropdown ${isProfileOpen ? 'open' : ''}`}>
              <div className="profile-dropdown-header">
                <div className="flex items-center">
                  <div className="profile-dropdown-avatar">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="profile-dropdown-info">
                    <p className="profile-dropdown-name">{currentUser?.name || 'User'}</p>
                    <p className="profile-dropdown-email">{currentUser?.email || 'user@hcmut.edu.vn'}</p>
                    <span className="profile-role-badge">
                      {currentUser?.role || 'Student'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="profile-dropdown-menu">
                <Link 
                  to="/profile" 
                  className="profile-menu-item"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Hồ sơ cá nhân</span>
                </Link>
                
                <button className="profile-menu-item">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Cài đặt</span>
                </button>
              </div>
              
              <div className="profile-dropdown-footer">
                <button 
                  onClick={handleLogout}
                  className="profile-menu-item logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            aria-label="Menu di động"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <nav className="mobile-nav-list">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`mobile-nav-item ${isActive(item.path) ? 'active' : 'inactive'}`}
              >
                <span className="mobile-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
