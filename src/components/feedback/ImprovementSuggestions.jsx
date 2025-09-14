import { useState, useMemo } from 'react';
import { 
  Lightbulb, TrendingUp, Target, Users, BookOpen, Clock,
  Star, AlertCircle, CheckCircle, ArrowRight, Filter,
  Brain, BarChart3, Award, MessageCircle, Download,
  Zap, Sparkles, TrendingDown, Eye, EyeOff
} from 'lucide-react';
import { improvementSuggestions, tutorAnalytics, progressReports } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const ImprovementSuggestions = () => {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, student, tutor, system
  const [selectedPriority, setSelectedPriority] = useState('all'); // all, high, medium, low
  const [selectedConfidence, setSelectedConfidence] = useState('all'); // all, high, medium, low
  const [viewImplemented, setViewImplemented] = useState(false);
  const [expandedSuggestion, setExpandedSuggestion] = useState(null);

  // Filter suggestions based on user role and current filters
  const filteredSuggestions = useMemo(() => {
    let suggestions = [...improvementSuggestions];

    // Role-based filtering
    if (user?.role === 'student') {
      suggestions = suggestions.filter(s => 
        s.targetAudience.includes('student') || s.targetAudience.includes('all')
      );
    } else if (user?.role === 'tutor') {
      suggestions = suggestions.filter(s => 
        s.targetAudience.includes('tutor') || s.targetAudience.includes('all')
      );
    }

    // Apply filters
    if (selectedCategory !== 'all') {
      suggestions = suggestions.filter(s => s.category === selectedCategory);
    }

    if (selectedPriority !== 'all') {
      suggestions = suggestions.filter(s => s.priority === selectedPriority);
    }

    if (selectedConfidence !== 'all') {
      suggestions = suggestions.filter(s => {
        const confidence = s.confidenceScore;
        switch (selectedConfidence) {
          case 'high':
            return confidence >= 0.8;
          case 'medium':
            return confidence >= 0.6 && confidence < 0.8;
          case 'low':
            return confidence < 0.6;
          default:
            return true;
        }
      });
    }

    // Filter by implementation status
    suggestions = suggestions.filter(s => s.isImplemented === viewImplemented);

    // Sort by priority and confidence
    suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return b.confidenceScore - a.confidenceScore;
    });

    return suggestions;
  }, [improvementSuggestions, user, selectedCategory, selectedPriority, selectedConfidence, viewImplemented]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalSuggestions = improvementSuggestions.length;
    const implementedCount = improvementSuggestions.filter(s => s.isImplemented).length;
    const highPriorityCount = improvementSuggestions.filter(s => s.priority === 'high').length;
    const highConfidenceCount = improvementSuggestions.filter(s => s.confidenceScore >= 0.8).length;

    const categories = {};
    improvementSuggestions.forEach(suggestion => {
      categories[suggestion.category] = (categories[suggestion.category] || 0) + 1;
    });

    return {
      totalSuggestions,
      implementedCount,
      highPriorityCount,
      highConfidenceCount,
      implementationRate: totalSuggestions > 0 ? (implementedCount / totalSuggestions) * 100 : 0,
      categories
    };
  }, [improvementSuggestions]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'student_performance':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'tutor_effectiveness':
        return <Users className="w-5 h-5 text-green-600" />;
      case 'system_optimization':
        return <BarChart3 className="w-5 h-5 text-purple-600" />;
      case 'engagement':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'retention':
        return <Target className="w-5 h-5 text-red-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderSuggestionCard = (suggestion) => {
    const isExpanded = expandedSuggestion === suggestion.id;
    const priorityStyles = getPriorityColor(suggestion.priority);
    const PriorityIcon = () => getPriorityIcon(suggestion.priority);
    const CategoryIcon = () => getCategoryIcon(suggestion.category);

    return (
      <div key={suggestion.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <CategoryIcon />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {suggestion.title}
                </h3>
                <p className="text-gray-600 mb-3">{suggestion.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${priorityStyles}`}>
                    <PriorityIcon />
                    <span className="capitalize">{suggestion.priority}</span>
                  </span>
                  
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getConfidenceColor(suggestion.confidenceScore)
                  } bg-opacity-10`}>
                    <Brain className="w-3 h-3 mr-1" />
                    {Math.round(suggestion.confidenceScore * 100)}% tin cậy
                  </span>

                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {suggestion.category.replace('_', ' ')}
                  </span>

                  {suggestion.isImplemented && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Đã triển khai
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setExpandedSuggestion(isExpanded ? null : suggestion.id)}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Expected Impact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Tác động:</span>
              <span className="text-sm font-medium text-gray-900">{suggestion.expectedImpact}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Thời gian:</span>
              <span className="text-sm font-medium text-gray-900">{suggestion.implementationTime}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-gray-600">Độ khó:</span>
              <span className="text-sm font-medium text-gray-900">{suggestion.difficulty}</span>
            </div>
          </div>

          {/* AI Reasoning Preview */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">AI Phân tích</p>
                <p className="text-sm text-blue-800">
                  {suggestion.reasoning.substring(0, 120)}...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="space-y-6">
              {/* Full Reasoning */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Brain className="w-4 h-4 text-purple-600 mr-2" />
                  Phân tích chi tiết
                </h4>
                <p className="text-gray-700 leading-relaxed">{suggestion.reasoning}</p>
              </div>

              {/* Data Sources */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 text-green-600 mr-2" />
                  Nguồn dữ liệu
                </h4>
                <div className="flex flex-wrap gap-2">
                  {suggestion.dataSources.map((source, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              {/* Implementation Steps */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Target className="w-4 h-4 text-blue-600 mr-2" />
                  Các bước triển khai
                </h4>
                <div className="space-y-2">
                  {suggestion.implementationSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Award className="w-4 h-4 text-yellow-600 mr-2" />
                  Chỉ số đánh giá thành công
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestion.successMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  {!suggestion.isImplemented && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Zap className="w-4 h-4" />
                      <span>Triển khai</span>
                    </button>
                  )}
                  
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    <MessageCircle className="w-4 h-4" />
                    <span>Thảo luận</span>
                  </button>
                </div>

                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Xuất báo cáo</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span>Gợi ý Cải thiện AI</span>
        </h1>
        <p className="text-gray-600">Phân tích dữ liệu và đưa ra khuyến nghị cải thiện hiệu quả hệ thống</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng gợi ý</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.totalSuggestions}</p>
            </div>
            <Lightbulb className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ưu tiên cao</p>
              <p className="text-2xl font-bold text-red-600">{summaryStats.highPriorityCount}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tin cậy cao</p>
              <p className="text-2xl font-bold text-green-600">{summaryStats.highConfidenceCount}</p>
            </div>
            <Brain className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đã triển khai</p>
              <p className="text-2xl font-bold text-blue-600">{summaryStats.implementedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tỷ lệ triển khai</p>
              <p className="text-2xl font-bold text-purple-600">{summaryStats.implementationRate.toFixed(0)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewImplemented(false)}
              className={`px-4 py-2 rounded-lg font-medium ${
                !viewImplemented 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Chưa triển khai ({summaryStats.totalSuggestions - summaryStats.implementedCount})
            </button>
            <button
              onClick={() => setViewImplemented(true)}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewImplemented 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Đã triển khai ({summaryStats.implementedCount})
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="student_performance">Hiệu suất học sinh</option>
              <option value="tutor_effectiveness">Hiệu quả gia sư</option>
              <option value="system_optimization">Tối ưu hệ thống</option>
              <option value="engagement">Tương tác</option>
              <option value="retention">Giữ chân</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="high">Ưu tiên cao</option>
              <option value="medium">Ưu tiên trung bình</option>
              <option value="low">Ưu tiên thấp</option>
            </select>

            <select
              value={selectedConfidence}
              onChange={(e) => setSelectedConfidence(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả độ tin cậy</option>
              <option value="high">Cao (≥80%)</option>
              <option value="medium">Trung bình (60-80%)</option>
              <option value="low">Thấp (&lt;60%)</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Xuất tất cả</span>
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-6">
        {filteredSuggestions.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {viewImplemented ? 'Chưa có gợi ý nào được triển khai' : 'Không có gợi ý nào'}
            </h3>
            <p className="text-gray-600">
              {viewImplemented 
                ? 'Các gợi ý đã triển khai sẽ xuất hiện ở đây.' 
                : 'Thử thay đổi bộ lọc để xem thêm gợi ý.'
              }
            </p>
          </div>
        ) : (
          filteredSuggestions.map(renderSuggestionCard)
        )}
      </div>

      {/* AI Insights Footer */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <div className="flex items-start space-x-3">
          <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Insights</h3>
            <p className="text-gray-700 mb-3">
              Hệ thống AI đã phân tích {summaryStats.totalSuggestions} điểm cải thiện từ dữ liệu 
              phiên học, đánh giá, và xu hướng hiệu suất. Các gợi ý được xếp hạng theo mức độ 
              ưu tiên và độ tin cậy để tối ưu hiệu quả triển khai.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <BarChart3 className="w-4 h-4" />
                <span>Phân tích {Object.keys(summaryStats.categories).length} danh mục</span>
              </span>
              <span className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Cập nhật liên tục</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovementSuggestions;
