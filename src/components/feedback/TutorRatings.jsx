import { useState, useMemo } from 'react';
import { 
  Star, Trophy, TrendingUp, TrendingDown, Users, Calendar,
  Award, Target, MessageCircle, ChevronRight, Filter,
  Download, Search, BarChart3, User, Clock, CheckCircle
} from 'lucide-react';
import { tutorAnalytics, users as mockUsers, feedbackData, feedbackCategories } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const TutorRatings = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, sessions, students, improvement
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterRating, setFilterRating] = useState('all'); // all, 4+, 3-4, <3
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [timeRange, setTimeRange] = useState('semester'); // week, month, semester, year

  // Filter and sort tutors
  const filteredTutors = useMemo(() => {
    let tutorList = [...mockUsers.filter(user => user.role === 'tutor')];

    // Apply role-based filtering
    if (user?.role === 'tutor') {
      tutorList = tutorList.filter(t => t.id === user.id);
    }

    // Apply search filter
    if (searchTerm) {
      tutorList = tutorList.filter(tutor => 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        tutor.specialties?.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply subject filter
    if (filterSubject !== 'all') {
      tutorList = tutorList.filter(tutor => 
        tutor.specialties?.includes(filterSubject)
      );
    }

    // Apply rating filter
    if (filterRating !== 'all') {
      tutorList = tutorList.filter(tutor => {
        const rating = tutor.rating;
        switch (filterRating) {
          case '4+':
            return rating >= 4.0;
          case '3-4':
            return rating >= 3.0 && rating < 4.0;
          case '<3':
            return rating < 3.0;
          default:
            return true;
        }
      });
    }

    // Sort tutors
    tutorList.sort((a, b) => {
      const analyticsA = tutorAnalytics.find(ta => ta.tutorId === a.id);
      const analyticsB = tutorAnalytics.find(ta => ta.tutorId === b.id);

      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'sessions':
          return (analyticsB?.sessionsCompleted || 0) - (analyticsA?.sessionsCompleted || 0);
        case 'students':
          return (analyticsB?.totalStudents || 0) - (analyticsA?.totalStudents || 0);
        case 'improvement':
          return (analyticsB?.averageImprovement || 0) - (analyticsA?.averageImprovement || 0);
        default:
          return 0;
      }
    });

    return tutorList;
  }, [mockUsers, searchTerm, sortBy, filterSubject, filterRating, user]);

  // Get all unique subjects
  const allSubjects = useMemo(() => {
    const subjects = new Set();
    mockUsers.filter(user => user.role === 'tutor').forEach(tutor => {
      tutor.specialties?.forEach(specialty => subjects.add(specialty));
    });
    return Array.from(subjects);
  }, [mockUsers]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalTutors = filteredTutors.length;
    const avgRating = filteredTutors.reduce((sum, tutor) => sum + tutor.rating, 0) / totalTutors;
    
    const totalSessions = filteredTutors.reduce((sum, tutor) => {
      const analytics = tutorAnalytics.find(ta => ta.tutorId === tutor.id);
      return sum + (analytics?.sessionsCompleted || 0);
    }, 0);

    const totalStudents = filteredTutors.reduce((sum, tutor) => {
      const analytics = tutorAnalytics.find(ta => ta.tutorId === tutor.id);
      return sum + (analytics?.totalStudents || 0);
    }, 0);

    const topPerformers = filteredTutors
      .filter(tutor => tutor.rating >= 4.5)
      .length;

    return {
      totalTutors,
      avgRating: avgRating || 0,
      totalSessions,
      totalStudents,
      topPerformers
    };
  }, [filteredTutors, tutorAnalytics]);

  const renderStars = (rating, size = 'w-4 h-4') => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingBadge = (rating) => {
    if (rating >= 4.5) return { label: 'Xuất sắc', color: 'bg-green-100 text-green-800' };
    if (rating >= 4.0) return { label: 'Tốt', color: 'bg-blue-100 text-blue-800' };
    if (rating >= 3.0) return { label: 'Khá', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Cần cải thiện', color: 'bg-red-100 text-red-800' };
  };

  const renderTutorCard = (tutor) => {
    const analytics = tutorAnalytics.find(ta => ta.tutorId === tutor.id);
    const badge = getRatingBadge(tutor.rating);

    return (
      <div 
        key={tutor.id}
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setSelectedTutor(tutor)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
              <p className="text-sm text-gray-600">{tutor.specialties?.join(', ') || tutor.major}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {renderStars(tutor.rating)}
            <span className={`font-bold ${getRatingColor(tutor.rating)}`}>
              {tutor.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({analytics?.totalReviews || 0} đánh giá)
            </span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
            {badge.label}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{analytics?.sessionsCompleted || 0}</p>
            <p className="text-xs text-gray-600">Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{analytics?.totalStudents || 0}</p>
            <p className="text-xs text-gray-600">Học sinh</p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold ${
              (analytics?.averageImprovement || 0) > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {analytics?.averageImprovement > 0 ? '+' : ''}{analytics?.averageImprovement?.toFixed(1) || '0'}%
            </p>
            <p className="text-xs text-gray-600">Cải thiện</p>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tỷ lệ hoàn thành</span>
            <span className="font-medium">{analytics?.completionRate || 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${analytics?.completionRate || 0}%` }}
            ></div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tutor.specialties?.slice(0, 2).map((specialty, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {specialty}
            </span>
          ))}
          {tutor.specialties?.length > 2 && (
            <span className="text-xs text-gray-500">
              +{tutor.specialties.length - 2} khác
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderTutorDetail = (tutor) => {
    const analytics = tutorAnalytics.find(ta => ta.tutorId === tutor.id);
    const tutorFeedback = feedbackData.filter(f => f.toUserId === tutor.id);

    // Calculate category ratings
    const categoryRatings = {};
    feedbackCategories.forEach(category => {
      const ratings = tutorFeedback
        .filter(f => f.ratings && f.ratings[category.id])
        .map(f => f.ratings[category.id]);
      
      if (ratings.length > 0) {
        categoryRatings[category.id] = {
          average: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length,
          count: ratings.length,
          name: category.name
        };
      }
    });

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{tutor.name}</h2>
            <p className="text-gray-600">Chi tiết đánh giá và thống kê</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedTutor(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Quay lại
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đánh giá tổng</p>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${getRatingColor(tutor.rating)}`}>
                    {tutor.rating.toFixed(1)}
                  </p>
                  {renderStars(tutor.rating, 'w-5 h-5')}
                </div>
                <p className="text-sm text-gray-500">{analytics?.totalReviews || 0} đánh giá</p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{analytics?.sessionsCompleted || 0}</p>
                <p className="text-sm text-gray-500">{analytics?.completionRate || 0}% hoàn thành</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Học sinh</p>
                <p className="text-2xl font-bold text-gray-900">{analytics?.totalStudents || 0}</p>
                <p className="text-sm text-gray-500">{analytics?.activeStudents || 0} đang học</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cải thiện TB</p>
                <p className={`text-2xl font-bold ${
                  (analytics?.averageImprovement || 0) > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {analytics?.averageImprovement > 0 ? '+' : ''}{analytics?.averageImprovement?.toFixed(1) || '0'}%
                </p>
                <p className="text-sm text-gray-500">vs điểm ban đầu</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Category Ratings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá theo tiêu chí</h3>
          <div className="space-y-4">
            {Object.entries(categoryRatings).map(([categoryId, data]) => (
              <div key={categoryId} className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="font-medium text-gray-900">{data.name}</span>
                  <p className="text-sm text-gray-600">{data.count} đánh giá</p>
                </div>
                <div className="flex items-center space-x-3">
                  {renderStars(Math.round(data.average))}
                  <span className={`font-bold text-lg ${getRatingColor(data.average)}`}>
                    {data.average.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê hiệu suất</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tỷ lệ hoàn thành session</span>
                <span className="font-medium">{analytics?.completionRate || 0}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Tỷ lệ tái đăng ký</span>
                <span className="font-medium">{analytics?.retentionRate || 0}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Thời gian phản hồi TB</span>
                <span className="font-medium">{analytics?.responseTime || 0} phút</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Độ hài lòng TB</span>
                <span className="font-medium">{analytics?.satisfactionScore || 0}/5</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chuyên môn & Kinh nghiệm</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Môn học</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties?.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Chuyên ngành</p>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties?.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">Kinh nghiệm</p>
                <p className="text-gray-600">{tutor.experience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá gần đây</h3>
          <div className="space-y-4">
            {tutorFeedback.slice(0, 5).map((feedback, index) => {
              const avgRating = feedback.ratings 
                ? Object.values(feedback.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(feedback.ratings).length
                : 0;

              return (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {renderStars(Math.round(avgRating))}
                      <span className="font-medium">{avgRating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{feedback.comment}</p>
                  {feedback.wouldRecommend && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Sẽ giới thiệu
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (selectedTutor) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        {renderTutorDetail(selectedTutor)}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Xếp hạng Gia sư</h1>
        <p className="text-gray-600">Đánh giá và thống kê hiệu suất gia sư</p>
      </div>

      {/* Summary Statistics */}
      {user?.role !== 'tutor' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng gia sư</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalTutors}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Đánh giá TB</p>
                <p className={`text-2xl font-bold ${getRatingColor(summaryStats.avgRating)}`}>
                  {summaryStats.avgRating.toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sessions</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalSessions}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Học sinh</p>
                <p className="text-2xl font-bold text-gray-900">{summaryStats.totalStudents}</p>
              </div>
              <Target className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Xuất sắc</p>
                <p className="text-2xl font-bold text-green-600">{summaryStats.topPerformers}</p>
                <p className="text-sm text-gray-500">≥4.5 sao</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm gia sư..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">Sắp xếp: Đánh giá</option>
              <option value="sessions">Sắp xếp: Sessions</option>
              <option value="students">Sắp xếp: Học sinh</option>
              <option value="improvement">Sắp xếp: Cải thiện</option>
            </select>

            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả môn học</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả rating</option>
              <option value="4+">4+ sao</option>
              <option value="3-4">3-4 sao</option>
              <option value="<3">&lt;3 sao</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tutor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy gia sư nào</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc để xem thêm gia sư.</p>
          </div>
        ) : (
          filteredTutors.map(renderTutorCard)
        )}
      </div>
    </div>
  );
};

export default TutorRatings;
