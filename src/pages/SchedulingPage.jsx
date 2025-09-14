import { useState } from 'react';
import { Calendar, Clock, User, Filter, Plus } from 'lucide-react';
import { sessions } from '../data/mockData';
import { useUser } from '../context/UserContext';
import Layout from '../components/layout/Layout';
import WeeklyCalendar from '../components/scheduling/WeeklyCalendar';
import SessionCard from '../components/scheduling/SessionCard';

const SchedulingPage = () => {
  const { user } = useUser();
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' or 'list'
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('upcoming');

  // Filter sessions based on user role and current filters
  const filteredSessions = sessions.filter(session => {
    // Filter by user role
    let roleFilter = true;
    if (user?.role === 'student') {
      roleFilter = session.studentEmail === user.email;
    } else if (user?.role === 'tutor') {
      roleFilter = session.tutorId === user.id;
    }

    // Filter by status
    let statusFilter = true;
    if (filterStatus !== 'all') {
      statusFilter = session.status === filterStatus;
    }

    // Filter by time period
    let periodFilter = true;
    const sessionDate = new Date(session.date);
    const now = new Date();
    
    if (selectedPeriod === 'upcoming') {
      periodFilter = sessionDate >= now;
    } else if (selectedPeriod === 'past') {
      periodFilter = sessionDate < now;
    } else if (selectedPeriod === 'today') {
      const today = new Date();
      periodFilter = sessionDate.toDateString() === today.toDateString();
    } else if (selectedPeriod === 'week') {
      const weekFromNow = new Date();
      weekFromNow.setDate(now.getDate() + 7);
      periodFilter = sessionDate >= now && sessionDate <= weekFromNow;
    }

    return roleFilter && statusFilter && periodFilter;
  });

  const handleSessionAction = (action, session) => {
    switch (action) {
      case 'confirm':
        console.log('Confirming session:', session);
        // Handle session confirmation
        break;
      case 'cancel':
        console.log('Cancelling session:', session);
        // Handle session cancellation
        break;
      case 'reschedule':
        console.log('Rescheduling session:', session);
        // Handle session rescheduling
        break;
      case 'review':
        console.log('Reviewing session:', session);
        // Handle session review
        break;
      case 'join':
        console.log('Joining session:', session);
        // Handle joining session
        break;
      default:
        break;
    }
  };

  const getPageTitle = () => {
    if (user?.role === 'tutor') {
      return 'Quản lý lịch dạy';
    } else if (user?.role === 'student') {
      return 'Lịch học của tôi';
    }
    return 'Quản lý lịch';
  };

  const getEmptyStateMessage = () => {
    if (user?.role === 'tutor') {
      return 'Chưa có lịch dạy nào. Hãy chờ học sinh đặt lịch với bạn!';
    } else if (user?.role === 'student') {
      return 'Chưa có lịch học nào. Hãy tìm và đặt lịch với gia sư phù hợp!';
    }
    return 'Chưa có lịch nào.';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
              <p className="text-gray-600 mt-2">
                {user?.role === 'tutor' 
                  ? 'Quản lý và theo dõi các buổi dạy của bạn'
                  : 'Theo dõi lịch học và quản lý các buổi học'
                }
              </p>
            </div>
            
            {user?.role === 'student' && (
              <button
                onClick={() => window.location.href = '/tutors'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Plus className="w-5 h-5" />
                <span>Đặt lịch mới</span>
              </button>
            )}
          </div>
        </div>

        {/* View Toggle and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'calendar'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Lịch
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <User className="w-4 h-4 inline mr-2" />
                  Danh sách
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center space-x-4">
              {/* Period Filter */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả</option>
                  <option value="today">Hôm nay</option>
                  <option value="week">Tuần này</option>
                  <option value="upcoming">Sắp tới</option>
                  <option value="past">Đã qua</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {viewMode === 'calendar' ? (
          <WeeklyCalendar 
            tutorId={user?.role === 'tutor' ? user.id : null}
            viewMode={user?.role || 'student'}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            {filteredSessions.length > 0 ? (
              <div className="p-6">
                <div className="grid gap-4">
                  {filteredSessions.map(session => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      viewMode={user?.role || 'student'}
                      onAction={handleSessionAction}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Không có lịch nào
                </h3>
                <p className="text-gray-600 mb-6">{getEmptyStateMessage()}</p>
                {user?.role === 'student' && (
                  <button
                    onClick={() => window.location.href = '/tutors'}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Tìm gia sư ngay
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Statistics for tutors */}
        {user?.role === 'tutor' && filteredSessions.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {filteredSessions.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Chờ xác nhận</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {filteredSessions.filter(s => s.status === 'confirmed').length}
              </div>
              <div className="text-sm text-gray-600">Đã xác nhận</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {filteredSessions.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Hoàn thành</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {filteredSessions
                  .filter(s => s.status === 'completed')
                  .reduce((total, s) => total + (s.price || 0), 0)
                  .toLocaleString('vi-VN')}₫
              </div>
              <div className="text-sm text-gray-600">Tổng thu nhập</div>
            </div>
          </div>
        )}
        </div>
      </div>
    </Layout>
  );
};

export default SchedulingPage;
