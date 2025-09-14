import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Users, BookOpen, Target, Briefcase, 
  TrendingUp, Filter, Search, Play, FileText, BarChart3,
  ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';
import { sessions, sessionTypes, sessionStatuses, progressData } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import SessionCard from '../scheduling/SessionCard';

const SessionDashboard = ({ onSelectSession }) => {
  const { user } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // 'overview', 'active', 'history'

  // Filter sessions based on user role and filters
  const filteredSessions = sessions.filter(session => {
    // Role-based filtering
    let roleMatch = true;
    if (user?.role === 'student') {
      roleMatch = session.studentEmail === user.email;
    } else if (user?.role === 'tutor') {
      roleMatch = session.tutorId === user.id;
    }

    // Status filtering
    let statusMatch = true;
    if (activeFilter !== 'all') {
      statusMatch = session.status === activeFilter;
    }

    // Type filtering
    let typeMatch = true;
    if (selectedType !== 'all') {
      typeMatch = session.sessionType === selectedType;
    }

    // Search filtering
    let searchMatch = true;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      searchMatch = 
        session.subject.toLowerCase().includes(searchLower) ||
        session.tutorName?.toLowerCase().includes(searchLower) ||
        session.studentName?.toLowerCase().includes(searchLower);
    }

    return roleMatch && statusMatch && typeMatch && searchMatch;
  });

  // Get session statistics
  const getSessionStats = () => {
    const userSessions = sessions.filter(session => {
      if (user?.role === 'student') {
        return session.studentEmail === user.email;
      } else if (user?.role === 'tutor') {
        return session.tutorId === user.id;
      }
      return true;
    });

    return {
      total: userSessions.length,
      completed: userSessions.filter(s => s.status === 'completed').length,
      upcoming: userSessions.filter(s => s.status === 'confirmed' && new Date(s.date) >= new Date()).length,
      inProgress: userSessions.filter(s => s.status === 'in-progress').length,
      totalHours: userSessions.reduce((total, s) => total + (s.duration || 60), 0) / 60
    };
  };

  const stats = getSessionStats();

  // Get upcoming sessions (next 7 days)
  const getUpcomingSessions = () => {
    const now = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(now.getDate() + 7);

    return filteredSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= now && sessionDate <= nextWeek && session.status === 'confirmed';
    }).slice(0, 3);
  };

  // Get active sessions
  const getActiveSessions = () => {
    return filteredSessions.filter(session => session.status === 'in-progress');
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      'academic': BookOpen,
      'skills': Target,
      'career': Briefcase,
      'group': Users
    };
    return iconMap[type] || BookOpen;
  };

  const getStatusColor = (status) => {
    const statusInfo = sessionStatuses.find(s => s.id === status);
    return statusInfo ? statusInfo.color : 'gray';
  };

  const handleSessionAction = (action, session) => {
    if (action === 'view' || action === 'details') {
      onSelectSession?.(session.id);
      return;
    }
    
    console.log(`${action} session:`, session);
    // Handle other session actions (start, join, end, etc.)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'tutor' ? 'Quản lý Sessions' : 'Dashboard Sessions'}
          </h1>
          <p className="text-gray-600 mt-1">
            Tổng quan và quản lý tất cả sessions học tập
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setViewMode('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'active' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đang hoạt động
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'history' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lịch sử
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sắp diễn ra</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcoming}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giờ học</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHours.toFixed(1)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions Alert */}
      {getActiveSessions().length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Play className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-green-800">
                Sessions đang diễn ra ({getActiveSessions().length})
              </h3>
              <p className="text-sm text-green-700 mt-1">
                Có {getActiveSessions().length} session đang được tiến hành
              </p>
            </div>
            <button
              onClick={() => setViewMode('active')}
              className="text-sm font-medium text-green-600 hover:text-green-800"
            >
              Xem chi tiết <ChevronRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm session theo môn học, người dạy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center space-x-4">
            {/* Status Filter */}
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              {sessionStatuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại</option>
              {sessionTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Sessions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Sessions sắp tới
                </h2>
              </div>
              <div className="p-6">
                {getUpcomingSessions().length > 0 ? (
                  <div className="space-y-4">
                    {getUpcomingSessions().map(session => (
                      <SessionCard
                        key={session.id}
                        session={session}
                        viewMode={user?.role || 'student'}
                        onAction={handleSessionAction}
                        compact={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Không có session nào sắp tới</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Session Types */}
          <div className="space-y-6">
            {/* Session Types Overview */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Loại Sessions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                {sessionTypes.map(type => {
                  const Icon = getTypeIcon(type.id);
                  const typeCount = filteredSessions.filter(s => s.sessionType === type.id).length;
                  
                  return (
                    <div key={type.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-${type.color}-100 rounded-lg`}>
                          <Icon className={`w-4 h-4 text-${type.color}-600`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{type.name}</p>
                          <p className="text-xs text-gray-600">{typeCount} sessions</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Thống kê nhanh
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
                  <span className="text-sm font-medium">
                    {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Giờ học trung bình/tuần</span>
                  <span className="text-sm font-medium">
                    {(stats.totalHours / 4).toFixed(1)}h
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Session gần nhất</span>
                  <span className="text-sm font-medium">
                    {getUpcomingSessions().length > 0 ? 'Hôm nay' : 'Chưa có'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Sessions View */}
      {viewMode === 'active' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Play className="w-5 h-5 mr-2 text-green-600" />
              Sessions đang hoạt động
            </h2>
          </div>
          <div className="p-6">
            {getActiveSessions().length > 0 ? (
              <div className="space-y-4">
                {getActiveSessions().map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    viewMode={user?.role || 'student'}
                    onAction={handleSessionAction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có session nào đang hoạt động
                </h3>
                <p className="text-gray-600">
                  Các session đang hoạt động sẽ hiển thị ở đây
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* History View */}
      {viewMode === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Lịch sử Sessions
            </h2>
          </div>
          <div className="p-6">
            {filteredSessions.length > 0 ? (
              <div className="space-y-4">
                {filteredSessions.map(session => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    viewMode={user?.role || 'student'}
                    onAction={handleSessionAction}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không tìm thấy session nào
                </h3>
                <p className="text-gray-600">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDashboard;
