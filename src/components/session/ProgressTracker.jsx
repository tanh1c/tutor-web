import { useState, useEffect } from 'react';
import { 
  TrendingUp, Target, BookOpen, Award, Star,
  BarChart3, PieChart, Calendar, CheckCircle,
  AlertTriangle, ThumbsUp, ThumbsDown, Plus
} from 'lucide-react';
import { progressData } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const ProgressTracker = ({ sessionId, studentId, tutorId }) => {
  const { user } = useUser();
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'detailed', 'goals'
  const [progress, setProgress] = useState(null);
  const [sessionProgress, setSessionProgress] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    // Load progress data for this student-tutor pair
    const studentProgress = progressData.find(p => 
      p.studentId === studentId && p.tutorId === tutorId
    );
    setProgress(studentProgress);

    // Load session-specific progress
    const savedSessionProgress = localStorage.getItem(`session-progress-${sessionId}`);
    if (savedSessionProgress) {
      setSessionProgress(JSON.parse(savedSessionProgress));
    }

    // Load learning goals
    const savedGoals = localStorage.getItem(`learning-goals-${studentId}-${tutorId}`);
    if (savedGoals) {
      setLearningGoals(JSON.parse(savedGoals));
    } else {
      // Default goals
      setLearningGoals([
        {
          id: 1,
          title: 'Nắm vững khái niệm đạo hàm',
          description: 'Hiểu rõ định nghĩa và ý nghĩa của đạo hàm',
          status: 'completed',
          priority: 'high',
          dueDate: '2025-09-15',
          progress: 100
        },
        {
          id: 2,
          title: 'Giải thành thạo bài tập tích phân',
          description: 'Có thể giải các dạng bài tập tích phân cơ bản đến nâng cao',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2025-09-30',
          progress: 65
        },
        {
          id: 3,
          title: 'Cải thiện kỹ năng thuyết trình',
          description: 'Tự tin trình bày bài giải trước lớp',
          status: 'not-started',
          priority: 'medium',
          dueDate: '2025-10-15',
          progress: 0
        }
      ]);
    }
  }, [sessionId, studentId, tutorId]);

  const saveSessionProgress = (newProgress) => {
    localStorage.setItem(`session-progress-${sessionId}`, JSON.stringify(newProgress));
    setSessionProgress(newProgress);
  };

  const saveLearningGoals = (goals) => {
    localStorage.setItem(`learning-goals-${studentId}-${tutorId}`, JSON.stringify(goals));
    setLearningGoals(goals);
  };

  const addLearningGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: Date.now(),
        title: newGoal.trim(),
        description: '',
        status: 'not-started',
        priority: 'medium',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0,
        createdAt: new Date().toISOString()
      };
      const updatedGoals = [...learningGoals, goal];
      saveLearningGoals(updatedGoals);
      setNewGoal('');
    }
  };

  const updateGoalProgress = (goalId, newProgress) => {
    const updatedGoals = learningGoals.map(goal => {
      if (goal.id === goalId) {
        let status = 'not-started';
        if (newProgress > 0 && newProgress < 100) status = 'in-progress';
        if (newProgress >= 100) status = 'completed';
        
        return { ...goal, progress: newProgress, status };
      }
      return goal;
    });
    saveLearningGoals(updatedGoals);
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'not-started': 'bg-gray-100 text-gray-800',
      'overdue': 'bg-red-100 text-red-800'
    };
    return colors[status] || colors['not-started'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'border-l-red-500',
      'medium': 'border-l-yellow-500',
      'low': 'border-l-green-500'
    };
    return colors[priority] || colors['medium'];
  };

  const calculateOverallProgress = () => {
    if (learningGoals.length === 0) return 0;
    const totalProgress = learningGoals.reduce((sum, goal) => sum + goal.progress, 0);
    return Math.round(totalProgress / learningGoals.length);
  };

  const getProgressStats = () => {
    const completed = learningGoals.filter(g => g.status === 'completed').length;
    const inProgress = learningGoals.filter(g => g.status === 'in-progress').length;
    const notStarted = learningGoals.filter(g => g.status === 'not-started').length;
    
    return { completed, inProgress, notStarted, total: learningGoals.length };
  };

  const stats = getProgressStats();
  const overallProgress = calculateOverallProgress();

  if (!progress) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Chưa có dữ liệu tiến độ
        </h3>
        <p className="text-gray-600">
          Dữ liệu tiến độ sẽ được cập nhật sau các session học
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Theo dõi tiến độ học tập</h3>
          <p className="text-sm text-gray-600">
            Môn: {progress.subject} • Tiến độ tổng thể: {overallProgress}%
          </p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => setActiveView('detailed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'detailed' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chi tiết
          </button>
          <button
            onClick={() => setActiveView('goals')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'goals' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mục tiêu
          </button>
        </div>
      </div>

      {/* Overview */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Tiến độ tổng thể
              </h4>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiến độ học tập</span>
                  <span>{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${overallProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                  <div className="text-sm text-gray-600">Hoàn thành</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
                  <div className="text-sm text-gray-600">Đang học</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{stats.notStarted}</div>
                  <div className="text-sm text-gray-600">Chưa bắt đầu</div>
                </div>
              </div>

              {/* Recent Sessions Progress */}
              <div>
                <h5 className="font-medium text-gray-900 mb-3">Tiến độ các session gần đây</h5>
                <div className="space-y-3">
                  {progress.sessions.slice(-3).map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Session {session.sessionId}</p>
                        <p className="text-sm text-gray-600">{session.date}</p>
                        <p className="text-xs text-gray-500">{session.topics.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{session.score}/100</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2 text-green-600" />
                Điểm mạnh
              </h4>
              <ul className="space-y-2">
                {progress.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Cần cải thiện
              </h4>
              <ul className="space-y-2">
                {progress.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Khuyến nghị
              </h4>
              <ul className="space-y-2">
                {progress.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Detailed View */}
      {activeView === 'detailed' && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-md font-medium text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Chi tiết tiến độ theo session
          </h4>
          
          <div className="space-y-4">
            {progress.sessions.map((session, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">Session {session.sessionId}</h5>
                    <p className="text-sm text-gray-600">{session.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-lg font-bold text-gray-900">{session.score}</span>
                    <span className="text-sm text-gray-600">/100</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Nội dung đã học:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic, topicIndex) => (
                      <span key={topicIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                {session.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Ghi chú:</p>
                    <p className="text-sm text-gray-600">{session.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals View */}
      {activeView === 'goals' && (
        <div className="space-y-6">
          {/* Add New Goal */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Thêm mục tiêu học tập</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Nhập mục tiêu mới..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addLearningGoal()}
              />
              <button
                onClick={addLearningGoal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Goals List */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-md font-medium text-gray-900 mb-6 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-600" />
              Mục tiêu học tập ({learningGoals.length})
            </h4>
            
            <div className="space-y-4">
              {learningGoals.map(goal => (
                <div key={goal.id} className={`border-l-4 ${getPriorityColor(goal.priority)} bg-gray-50 p-4 rounded-r-lg`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900">{goal.title}</h5>
                      {goal.description && (
                        <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                      {goal.status === 'completed' ? 'Hoàn thành' :
                       goal.status === 'in-progress' ? 'Đang thực hiện' : 'Chưa bắt đầu'}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Tiến độ</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Hạn: {new Date(goal.dueDate).toLocaleDateString('vi-VN')}
                    </div>
                    
                    {user?.role === 'tutor' && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={goal.progress}
                          onChange={(e) => updateGoalProgress(goal.id, parseInt(e.target.value))}
                          className="w-20"
                        />
                        <span className="text-sm font-medium w-12">{goal.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
