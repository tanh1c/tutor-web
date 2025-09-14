import { useState, useMemo } from 'react';
import { 
  Star, Filter, Search, Calendar, Download, TrendingUp, 
  TrendingDown, Users, Award, MessageCircle, Target,
  BarChart3, PieChart, Eye, UserCheck, Clock, Book
} from 'lucide-react';
import { feedbackData, feedbackCategories } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const EvaluationDashboard = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all'); // all, student, tutor
  const [filterRating, setFilterRating] = useState('all'); // all, 1-5
  const [filterPeriod, setFilterPeriod] = useState('all'); // all, week, month, semester
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // list, analytics

  // Filter feedback data based on user role and filters
  const filteredFeedback = useMemo(() => {
    let feedback = [...feedbackData];

    // Filter by user role - what they can see
    if (user?.role === 'student') {
      feedback = feedback.filter(f => 
        f.fromUserId === user.id || 
        (f.toUserId === user.id && f.feedbackType === 'tutor_to_student')
      );
    } else if (user?.role === 'tutor') {
      feedback = feedback.filter(f => 
        f.fromUserId === user.id || 
        (f.toUserId === user.id && f.feedbackType === 'student_to_tutor')
      );
    }

    // Apply filters
    if (searchTerm) {
      feedback = feedback.filter(f => 
        f.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.fromUserName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.toUserName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'all') {
      feedback = feedback.filter(f => f.fromUserRole === filterRole);
    }

    if (filterRating !== 'all') {
      const targetRating = parseInt(filterRating);
      feedback = feedback.filter(f => {
        if (f.ratings) {
          const avgRating = Object.values(f.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(f.ratings).length;
          return Math.round(avgRating) === targetRating;
        }
        return false;
      });
    }

    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filterPeriod) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'semester':
          filterDate.setMonth(now.getMonth() - 4);
          break;
      }
      
      feedback = feedback.filter(f => new Date(f.createdAt) >= filterDate);
    }

    return feedback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [feedbackData, user, searchTerm, filterRole, filterRating, filterPeriod]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalFeedback = filteredFeedback.length;
    
    // Average ratings
    const ratingsData = filteredFeedback.filter(f => f.ratings);
    const avgRatings = {};
    
    if (ratingsData.length > 0) {
      feedbackCategories.forEach(category => {
        const ratings = ratingsData
          .map(f => f.ratings?.[category.id])
          .filter(rating => rating !== undefined);
        
        if (ratings.length > 0) {
          avgRatings[category.id] = {
            average: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length,
            count: ratings.length,
            name: category.name
          };
        }
      });
    }

    // Rating distribution
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingsData.forEach(feedback => {
      if (feedback.ratings) {
        const overallRating = Math.round(
          Object.values(feedback.ratings).reduce((sum, rating) => sum + rating, 0) / 
          Object.values(feedback.ratings).length
        );
        if (overallRating >= 1 && overallRating <= 5) {
          ratingDistribution[overallRating]++;
        }
      }
    });

    // Recent trends
    const thisMonth = filteredFeedback.filter(f => {
      const date = new Date(f.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });

    const lastMonth = filteredFeedback.filter(f => {
      const date = new Date(f.createdAt);
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      return date.getMonth() === lastMonthDate.getMonth() && date.getFullYear() === lastMonthDate.getFullYear();
    });

    return {
      totalFeedback,
      avgRatings,
      ratingDistribution,
      thisMonthCount: thisMonth.length,
      lastMonthCount: lastMonth.length,
      trend: thisMonth.length > lastMonth.length ? 'up' : 
             thisMonth.length < lastMonth.length ? 'down' : 'stable'
    };
  }, [filteredFeedback]);

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderFeedbackCard = (feedback) => {
    const isFromUser = feedback.fromUserId === user?.id;
    const displayName = isFromUser ? feedback.toUserName : feedback.fromUserName;
    const displayRole = isFromUser ? feedback.toUserRole : feedback.fromUserRole;
    
    let avgRating = 0;
    if (feedback.ratings) {
      avgRating = Object.values(feedback.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(feedback.ratings).length;
    }

    return (
      <div key={feedback.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              {displayRole === 'tutor' ? <UserCheck className="w-5 h-5 text-blue-600" /> : <Users className="w-5 h-5 text-blue-600" />}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">
                {isFromUser ? `Đánh giá cho ${displayName}` : `Đánh giá từ ${displayName}`}
              </h3>
              <p className="text-sm text-gray-600">
                {displayRole === 'tutor' ? 'Gia sư' : 'Học sinh'} • {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
          
          {avgRating > 0 && (
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(avgRating))}
              <span className="text-sm font-medium text-gray-700">{avgRating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {feedback.comment && (
          <div className="mb-4">
            <p className="text-gray-700 line-clamp-3">{feedback.comment}</p>
          </div>
        )}

        {feedback.feedbackType === 'student_to_tutor' && feedback.wouldRecommend !== null && (
          <div className="mb-4">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              feedback.wouldRecommend 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {feedback.wouldRecommend ? 'Sẽ giới thiệu' : 'Không giới thiệu'}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{feedback.feedbackType === 'student_to_tutor' ? 'Đánh giá gia sư' : 
                     feedback.feedbackType === 'tutor_to_student' ? 'Đánh giá học sinh' : 'Khảo sát hệ thống'}</span>
            </span>
            {feedback.isAnonymous && (
              <span className="text-orange-600">Ẩn danh</span>
            )}
          </div>
          
          <button
            onClick={() => setSelectedFeedback(feedback)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
          >
            <Eye className="w-4 h-4" />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đánh giá</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalFeedback}</p>
            </div>
            <MessageCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đánh giá trung bình</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(analytics.avgRatings).length > 0 
                    ? (Object.values(analytics.avgRatings).reduce((sum, cat) => sum + cat.average, 0) / Object.keys(analytics.avgRatings).length).toFixed(1)
                    : '0.0'
                  }
                </p>
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
            </div>
            <Award className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tháng này</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold text-gray-900">{analytics.thisMonthCount}</p>
                {analytics.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {analytics.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
              </div>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tăng trưởng</p>
              <p className={`text-2xl font-bold ${
                analytics.trend === 'up' ? 'text-green-600' : 
                analytics.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {analytics.lastMonthCount > 0 
                  ? `${Math.round(((analytics.thisMonthCount - analytics.lastMonthCount) / analytics.lastMonthCount) * 100)}%`
                  : analytics.thisMonthCount > 0 ? '100%' : '0%'
                }
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Rating Categories Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá theo tiêu chí</h3>
          <div className="space-y-4">
            {Object.entries(analytics.avgRatings).map(([categoryId, data]) => (
              <div key={categoryId} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{data.name}</span>
                <div className="flex items-center space-x-2">
                  {renderStars(Math.round(data.average))}
                  <span className="text-sm text-gray-600 w-12 text-right">{data.average.toFixed(1)}</span>
                  <span className="text-xs text-gray-500">({data.count})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phân bố đánh giá</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map(rating => {
              const count = analytics.ratingDistribution[rating];
              const percentage = analytics.totalFeedback > 0 ? (count / analytics.totalFeedback) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Đánh giá</h1>
        <p className="text-gray-600">Quản lý và theo dõi các đánh giá trong hệ thống</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Danh sách
            </button>
            <button
              onClick={() => setViewMode('analytics')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'analytics' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Phân tích
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="student">Học sinh</option>
              <option value="tutor">Gia sư</option>
            </select>

            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả đánh giá</option>
              <option value="5">5 sao</option>
              <option value="4">4 sao</option>
              <option value="3">3 sao</option>
              <option value="2">2 sao</option>
              <option value="1">1 sao</option>
            </select>

            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả thời gian</option>
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
              <option value="semester">Học kỳ này</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'analytics' ? (
        renderAnalytics()
      ) : (
        <div className="space-y-4">
          {filteredFeedback.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không có đánh giá nào</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc để xem thêm đánh giá.</p>
            </div>
          ) : (
            filteredFeedback.map(renderFeedbackCard)
          )}
        </div>
      )}

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Chi tiết đánh giá</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Thông tin cơ bản</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Từ:</span> {selectedFeedback.fromUserName} ({selectedFeedback.fromUserRole === 'tutor' ? 'Gia sư' : 'Học sinh'})</p>
                    <p><span className="font-medium">Đến:</span> {selectedFeedback.toUserName} ({selectedFeedback.toUserRole === 'tutor' ? 'Gia sư' : 'Học sinh'})</p>
                    <p><span className="font-medium">Ngày:</span> {new Date(selectedFeedback.createdAt).toLocaleString('vi-VN')}</p>
                    <p><span className="font-medium">Loại:</span> {
                      selectedFeedback.feedbackType === 'student_to_tutor' ? 'Đánh giá gia sư' :
                      selectedFeedback.feedbackType === 'tutor_to_student' ? 'Đánh giá học sinh' : 'Khảo sát hệ thống'
                    }</p>
                  </div>
                </div>

                {/* Ratings */}
                {selectedFeedback.ratings && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Đánh giá chi tiết</h3>
                    <div className="space-y-3">
                      {Object.entries(selectedFeedback.ratings).map(([categoryId, rating]) => {
                        const category = feedbackCategories.find(c => c.id === categoryId);
                        return (
                          <div key={categoryId} className="flex items-center justify-between">
                            <span className="text-gray-700">{category?.name || categoryId}</span>
                            <div className="flex items-center space-x-2">
                              {renderStars(rating)}
                              <span className="font-medium">{rating}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Comments */}
                {selectedFeedback.comment && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Nhận xét</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedFeedback.comment}</p>
                    </div>
                  </div>
                )}

                {/* Additional Info */}
                {selectedFeedback.feedbackType === 'student_to_tutor' && (
                  <div className="space-y-4">
                    {selectedFeedback.improvements && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Gợi ý cải thiện</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">{selectedFeedback.improvements}</p>
                        </div>
                      </div>
                    )}
                    
                    {selectedFeedback.wouldRecommend !== null && (
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Giới thiệu</h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          selectedFeedback.wouldRecommend 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedFeedback.wouldRecommend ? 'Sẽ giới thiệu cho bạn bè' : 'Không giới thiệu'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationDashboard;
