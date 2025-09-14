import { useState } from 'react';
import { 
  MessageCircle, BarChart3, TrendingUp, Users, Star,
  Brain, Award, Target, FileText, Plus, Filter
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import FeedbackForm from './FeedbackForm';
import EvaluationDashboard from './EvaluationDashboard';
import ProgressReports from './ProgressReports';
import TutorRatings from './TutorRatings';
import ImprovementSuggestions from './ImprovementSuggestions';

const FeedbackPage = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackFormType, setFeedbackFormType] = useState('student_to_tutor');

  const tabs = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: BarChart3,
      description: 'Tổng quan đánh giá',
      component: EvaluationDashboard,
      roles: ['admin', 'tutor', 'student']
    },
    {
      id: 'progress',
      name: 'Báo cáo Tiến độ',
      icon: TrendingUp,
      description: 'Theo dõi tiến bộ học tập',
      component: ProgressReports,
      roles: ['admin', 'tutor', 'student']
    },
    {
      id: 'ratings',
      name: 'Xếp hạng Gia sư',
      icon: Users,
      description: 'Hiệu suất và đánh giá gia sư',
      component: TutorRatings,
      roles: ['admin', 'tutor', 'student']
    },
    {
      id: 'suggestions',
      name: 'Gợi ý AI',
      icon: Brain,
      description: 'Khuyến nghị cải thiện từ AI',
      component: ImprovementSuggestions,
      roles: ['admin', 'tutor']
    }
  ];

  // Filter tabs based on user role
  const availableTabs = tabs.filter(tab => 
    tab.roles.includes(user?.role || 'student')
  );

  const getCurrentComponent = () => {
    const activeTabData = availableTabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return null;
    
    const Component = activeTabData.component;
    return <Component />;
  };

  const handleCreateFeedback = (type) => {
    setFeedbackFormType(type);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    // Here you would typically save to backend
    setShowFeedbackForm(false);
    // Could show success message or refresh data
  };

  // Quick stats for dashboard overview
  const quickStats = [
    {
      label: 'Đánh giá tháng này',
      value: '124',
      change: '+15%',
      changeType: 'positive',
      icon: MessageCircle,
      color: 'blue'
    },
    {
      label: 'Điểm trung bình',
      value: '4.2',
      change: '+0.3',
      changeType: 'positive',
      icon: Star,
      color: 'yellow'
    },
    {
      label: 'Gia sư xuất sắc',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: Award,
      color: 'green'
    },
    {
      label: 'Gợi ý AI mới',
      value: '12',
      change: '+5',
      changeType: 'positive',
      icon: Brain,
      color: 'purple'
    }
  ];

  if (showFeedbackForm) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <FeedbackForm
          feedbackType={feedbackFormType}
          onSubmit={handleFeedbackSubmit}
          onCancel={() => setShowFeedbackForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <span>Hệ thống Đánh giá & Phản hồi</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Quản lý đánh giá, theo dõi tiến độ và nhận gợi ý cải thiện
            </p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            {user?.role === 'student' && (
              <button
                onClick={() => handleCreateFeedback('student_to_tutor')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Đánh giá Gia sư</span>
              </button>
            )}
            
            {user?.role === 'tutor' && (
              <button
                onClick={() => handleCreateFeedback('tutor_to_student')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                <span>Đánh giá Học sinh</span>
              </button>
            )}
            
            <button
              onClick={() => handleCreateFeedback('system_survey')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <FileText className="w-4 h-4" />
              <span>Khảo sát Hệ thống</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'text-blue-600 bg-blue-100',
            yellow: 'text-yellow-600 bg-yellow-100',
            green: 'text-green-600 bg-green-100',
            purple: 'text-purple-600 bg-purple-100'
          };
          
          return (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  colorClasses[stat.color]
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {availableTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-2 ${
                    activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Description */}
        <div className="mt-4">
          {availableTabs.map((tab) => (
            activeTab === tab.id && (
              <p key={tab.id} className="text-gray-600 text-sm">
                {tab.description}
              </p>
            )
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {getCurrentComponent()}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Target className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn Sử dụng</h3>
            <div className="text-blue-800 text-sm space-y-1">
              <p>• <strong>Dashboard:</strong> Xem tổng quan tất cả đánh giá và phân tích xu hướng</p>
              <p>• <strong>Báo cáo Tiến độ:</strong> Theo dõi tiến bộ học tập của từng học sinh</p>
              <p>• <strong>Xếp hạng Gia sư:</strong> So sánh hiệu suất và đánh giá của các gia sư</p>
              {user?.role !== 'student' && (
                <p>• <strong>Gợi ý AI:</strong> Nhận khuyến nghị cải thiện dựa trên phân tích dữ liệu</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
