import React, { useState, useRef, useEffect } from 'react';

const DashboardToolbar = ({ selectedTimeRange, onTimeRangeChange }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const toolbarRef = useRef(null);

  // Time range options
  const timeRangeOptions = [
    { value: 'today', label: 'Hôm nay', icon: '📅' },
    { value: 'week', label: 'Tuần này', icon: '📆' },
    { value: 'month', label: 'Tháng này', icon: '🗓️' },
    { value: 'quarter', label: 'Quý này', icon: '📊' },
    { value: 'year', label: 'Năm này', icon: '📈' }
  ];

  // View options
  const viewOptions = [
    { value: 'grid', label: 'Lưới', icon: '⚏' },
    { value: 'list', label: 'Danh sách', icon: '☰' },
    { value: 'calendar', label: 'Lịch', icon: '📅' },
    { value: 'kanban', label: 'Kanban', icon: '📋' }
  ];

  // Quick actions
  const quickActions = [
    { id: 'search', icon: '🔍', tooltip: 'Tìm kiếm' },
    { id: 'filter', icon: '🎯', tooltip: 'Bộ lọc' },
    { id: 'sort', icon: '⚡', tooltip: 'Sắp xếp' },
    { id: 'export', icon: '📤', tooltip: 'Xuất dữ liệu' },
    { id: 'refresh', icon: '🔄', tooltip: 'Làm mới' },
    { id: 'settings', icon: '⚙️', tooltip: 'Cài đặt' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setShowFilterPanel(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
    setShowFilterPanel(false);
  };

  // Handle quick action click
  const handleQuickAction = (actionId) => {
    // Close all other actions when one is selected
    if (activeQuickAction === actionId) {
      setActiveQuickAction(null);
      setShowFilterPanel(false);
    } else {
      setActiveQuickAction(actionId);
      setActiveDropdown(null);
      
      // Special handling for filter action
      if (actionId === 'filter') {
        setShowFilterPanel(!showFilterPanel);
      } else {
        setShowFilterPanel(false);
      }
    }
  };

  // Get current time range option
  const currentTimeRange = timeRangeOptions.find(opt => opt.value === selectedTimeRange);

  return (
    <div className="dashboard-toolbar" ref={toolbarRef}>
      {/* Time Range Dropdown */}
      <div className="toolbar-item toolbar-dropdown">
        <button
          className={`toolbar-button ${activeDropdown === 'timeRange' ? 'active' : ''}`}
          onClick={() => toggleDropdown('timeRange')}
        >
          <span className="icon">{currentTimeRange?.icon || '📅'}</span>
          <span>{currentTimeRange?.label || 'Chọn thời gian'}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${activeDropdown === 'timeRange' ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`toolbar-dropdown-menu ${activeDropdown === 'timeRange' ? 'open' : ''}`}>
          {timeRangeOptions.map((option) => (
            <div
              key={option.value}
              className={`toolbar-dropdown-item ${selectedTimeRange === option.value ? 'selected' : ''}`}
              onClick={() => {
                onTimeRangeChange(option.value);
                setActiveDropdown(null);
              }}
            >
              <span className="icon">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="toolbar-separator"></div>

      {/* View Options */}
      <div className="toolbar-item toolbar-dropdown">
        <button
          className={`toolbar-button ${activeDropdown === 'view' ? 'active' : ''}`}
          onClick={() => toggleDropdown('view')}
        >
          <span className="icon">⚏</span>
          <span>Hiển thị</span>
          <svg 
            className={`w-4 h-4 transition-transform ${activeDropdown === 'view' ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`toolbar-dropdown-menu ${activeDropdown === 'view' ? 'open' : ''}`}>
          {viewOptions.map((option) => (
            <div
              key={option.value}
              className="toolbar-dropdown-item"
              onClick={() => {
                console.log('View changed to:', option.value);
                setActiveDropdown(null);
              }}
            >
              <span className="icon">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <div className="toolbar-separator"></div>

      {/* Quick Actions */}
      <div className="quick-actions-toolbar">
        {quickActions.map((action) => (
          <button
            key={action.id}
            className={`quick-action-btn ${activeQuickAction === action.id ? 'active' : ''}`}
            onClick={() => handleQuickAction(action.id)}
            data-tooltip={action.tooltip}
          >
            <span className="icon">{action.icon}</span>
          </button>
        ))}
      </div>

      {/* Filter Panel */}
      {showFilterPanel && (
        <div className={`filter-panel ${showFilterPanel ? 'open' : ''}`}>
          <div className="filter-panel-header">
            <h3 className="filter-panel-title">Bộ lọc nâng cao</h3>
            <button 
              onClick={() => setShowFilterPanel(false)}
              className="text-neutral-400 hover:text-neutral-600"
            >
              ✕
            </button>
          </div>
          
          <div className="filter-panel-content">
            <div className="filter-group">
              <label className="filter-group-label">Trạng thái</label>
              <div className="filter-options">
                <div className="filter-option">Tất cả</div>
                <div className="filter-option selected">Hoạt động</div>
                <div className="filter-option">Hoàn thành</div>
                <div className="filter-option">Đã hủy</div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-group-label">Môn học</label>
              <div className="filter-options">
                <div className="filter-option selected">Toán</div>
                <div className="filter-option">Lý</div>
                <div className="filter-option">Hóa</div>
                <div className="filter-option">Anh văn</div>
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-group-label">Độ ưu tiên</label>
              <div className="filter-options">
                <div className="filter-option">Cao</div>
                <div className="filter-option selected">Trung bình</div>
                <div className="filter-option">Thấp</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardToolbar;
