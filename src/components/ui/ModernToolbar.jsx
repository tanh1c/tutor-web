import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ModernToolbar = ({ currentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const toolbarRef = useRef(null);
  const { logout } = useContext(UserContext);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleToolbar = () => {
    setIsExpanded(!isExpanded);
    // Close other dropdowns when toggling
    setShowNotifications(false);
    setShowProfile(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  return (
    <>
      <div className="modern-toolbar" ref={toolbarRef}>
        {/* Toggle Button */}
        <button
          className={`toolbar-toggle ${isExpanded ? 'active' : ''}`}
          onClick={toggleToolbar}
          data-tooltip={isExpanded ? 'Thu gọn' : 'Mở rộng'}
        >
          {isExpanded ? '✕' : '☰'}
        </button>

        {/* Toolbar Content */}
        <div className={`toolbar-content ${!isExpanded ? 'collapsed' : ''}`}>
          {/* Search */}
          <Link
            to="/search"
            className="toolbar-item"
            data-tooltip="Tìm kiếm"
          >
            🔍
          </Link>

          {/* Quick Actions */}
          <Link
            to="/sessions/new"
            className="toolbar-item"
            data-tooltip="Đặt lịch học mới"
          >
            📅
          </Link>

          <Link
            to="/tutors"
            className="toolbar-item"
            data-tooltip="Tìm gia sư"
          >
            👨‍🏫
          </Link>

          <div className="toolbar-separator"></div>

          {/* Messages */}
          <Link
            to="/messages"
            className="toolbar-item"
            data-tooltip="Tin nhắn"
          >
            💬
            <span className="toolbar-notification-badge">3</span>
          </Link>

          {/* Notifications */}
          <button
            className={`toolbar-item ${showNotifications ? 'active' : ''}`}
            onClick={toggleNotifications}
            data-tooltip="Thông báo"
          >
            🔔
            <span className="toolbar-notification-badge">5</span>
          </button>

          <div className="toolbar-separator"></div>

          {/* Settings */}
          <Link
            to="/settings"
            className="toolbar-item"
            data-tooltip="Cài đặt"
          >
            ⚙️
          </Link>

          {/* Profile */}
          <button
            className={`toolbar-item ${showProfile ? 'active' : ''}`}
            onClick={toggleProfile}
            data-tooltip="Hồ sơ cá nhân"
          >
            {currentUser?.name?.charAt(0) || '👤'}
          </button>
        </div>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-8 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Thông báo</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {/* Sample notifications */}
            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Buổi học mới được đặt lịch</p>
                  <p className="text-xs text-gray-500 mt-1">Môn Toán cao cấp - 2 giờ trước</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Hoàn thành bài kiểm tra</p>
                  <p className="text-xs text-gray-500 mt-1">Điểm số: 8.5/10 - 1 ngày trước</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">Nhắc nhở: Buổi học sắp diễn ra</p>
                  <p className="text-xs text-gray-500 mt-1">Vào lúc 14:00 hôm nay - 30 phút trước</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-100 text-center">
            <Link
              to="/notifications"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => setShowNotifications(false)}
            >
              Xem tất cả thông báo
            </Link>
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className="fixed top-20 right-8 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{currentUser?.name || 'Người dùng'}</p>
                <p className="text-sm text-gray-500 capitalize">{currentUser?.role || 'Học sinh'}</p>
              </div>
            </div>
          </div>
          <div className="py-2">
            <Link
              to="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowProfile(false)}
            >
              👤 Hồ sơ cá nhân
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowProfile(false)}
            >
              ⚙️ Cài đặt
            </Link>
            <Link
              to="/help"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setShowProfile(false)}
            >
              ❓ Trợ giúp
            </Link>
            <hr className="my-2" />
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </>
  );
};

export default ModernToolbar;
