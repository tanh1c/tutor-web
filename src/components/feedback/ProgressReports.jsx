import { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, Target, Award, BookOpen, Clock,
  Calendar, Download, Filter, BarChart3, LineChart, PieChart,
  User, Star, CheckCircle, AlertCircle, ArrowUp, ArrowDown
} from 'lucide-react';
import { progressReports, tutorAnalytics, sessions, users as mockUsers } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const ProgressReports = () => {
  const { user } = useUser();
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [timePeriod, setTimePeriod] = useState('semester'); // week, month, semester, year
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, trends

  // Filter progress reports based on user role and selections
  const filteredReports = useMemo(() => {
    let reports = [...progressReports];

    // Filter by user role
    if (user?.role === 'student') {
      reports = reports.filter(r => r.studentId === user.id);
    } else if (user?.role === 'tutor') {
      const tutorSessions = sessions.filter(s => s.tutorId === user.id);
      const studentIds = [...new Set(tutorSessions.map(s => s.studentId))];
      reports = reports.filter(r => studentIds.includes(r.studentId));
    }

    // Apply filters
    if (selectedStudent !== 'all') {
      reports = reports.filter(r => r.studentId === selectedStudent);
    }

    if (selectedSubject !== 'all') {
      reports = reports.filter(r => r.subject === selectedSubject);
    }

    // Filter by time period
    const now = new Date();
    const filterDate = new Date();
    
    switch (timePeriod) {
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'semester':
        filterDate.setMonth(now.getMonth() - 4);
        break;
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    reports = reports.filter(r => new Date(r.reportDate) >= filterDate);

    return reports.sort((a, b) => new Date(b.reportDate) - new Date(a.reportDate));
  }, [progressReports, user, selectedStudent, selectedSubject, timePeriod]);

  // Get unique students and subjects for filters
  const students = useMemo(() => {
    const allReports = user?.role === 'tutor' 
      ? progressReports.filter(r => {
          const tutorSessions = sessions.filter(s => s.tutorId === user.id);
          const studentIds = [...new Set(tutorSessions.map(s => s.studentId))];
          return studentIds.includes(r.studentId);
        })
      : progressReports;
    
    const uniqueStudents = [...new Set(allReports.map(r => r.studentId))]
      .map(id => {
        const report = allReports.find(r => r.studentId === id);
        return { id, name: report?.studentName };
      });
    
    return uniqueStudents;
  }, [progressReports, user, sessions]);

  const subjects = useMemo(() => {
    return [...new Set(filteredReports.map(r => r.subject))];
  }, [filteredReports]);

  // Calculate analytics
  const analytics = useMemo(() => {
    if (filteredReports.length === 0) return null;

    const totalReports = filteredReports.length;
    const averageOverallScore = filteredReports.reduce((sum, r) => sum + r.overallScore, 0) / totalReports;
    
    // Performance trends
    const recentReports = filteredReports.slice(0, 5);
    const olderReports = filteredReports.slice(5, 10);
    
    const recentAvg = recentReports.length > 0 
      ? recentReports.reduce((sum, r) => sum + r.overallScore, 0) / recentReports.length 
      : 0;
    const olderAvg = olderReports.length > 0 
      ? olderReports.reduce((sum, r) => sum + r.overallScore, 0) / olderReports.length 
      : 0;
    
    const trend = recentAvg > olderAvg ? 'improving' : recentAvg < olderAvg ? 'declining' : 'stable';
    const trendPercentage = olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;

    // Subject performance
    const subjectPerformance = {};
    subjects.forEach(subject => {
      const subjectReports = filteredReports.filter(r => r.subject === subject);
      if (subjectReports.length > 0) {
        subjectPerformance[subject] = {
          averageScore: subjectReports.reduce((sum, r) => sum + r.overallScore, 0) / subjectReports.length,
          totalReports: subjectReports.length,
          latestScore: subjectReports[0]?.overallScore || 0
        };
      }
    });

    // Strengths and weaknesses analysis
    const strengthsCount = {};
    const weaknessesCount = {};
    
    filteredReports.forEach(report => {
      report.strengths?.forEach(strength => {
        strengthsCount[strength] = (strengthsCount[strength] || 0) + 1;
      });
      report.weaknesses?.forEach(weakness => {
        weaknessesCount[weakness] = (weaknessesCount[weakness] || 0) + 1;
      });
    });

    const topStrengths = Object.entries(strengthsCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
    
    const topWeaknesses = Object.entries(weaknessesCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    return {
      totalReports,
      averageOverallScore,
      trend,
      trendPercentage,
      subjectPerformance,
      topStrengths,
      topWeaknesses
    };
  }, [filteredReports, subjects]);

  const getScoreColor = (score) => {
    if (score >= 8.5) return 'text-green-600';
    if (score >= 7.0) return 'text-blue-600';
    if (score >= 5.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 8.5) return { label: 'Xuất sắc', color: 'bg-green-100 text-green-800' };
    if (score >= 7.0) return { label: 'Tốt', color: 'bg-blue-100 text-blue-800' };
    if (score >= 5.5) return { label: 'Trung bình', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Cần cải thiện', color: 'bg-red-100 text-red-800' };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng báo cáo</p>
              <p className="text-2xl font-bold text-gray-900">{analytics?.totalReports || 0}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
              <p className={`text-2xl font-bold ${getScoreColor(analytics?.averageOverallScore || 0)}`}>
                {analytics?.averageOverallScore?.toFixed(1) || '0.0'}
              </p>
            </div>
            <Target className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Xu hướng</p>
              <div className="flex items-center space-x-2">
                <p className={`text-lg font-bold ${
                  analytics?.trend === 'improving' ? 'text-green-600' :
                  analytics?.trend === 'declining' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {analytics?.trend === 'improving' ? 'Cải thiện' :
                   analytics?.trend === 'declining' ? 'Giảm sút' : 'Ổn định'}
                </p>
                {analytics?.trend === 'improving' && <TrendingUp className="w-5 h-5 text-green-600" />}
                {analytics?.trend === 'declining' && <TrendingDown className="w-5 h-5 text-red-600" />}
              </div>
            </div>
            <LineChart className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Thay đổi</p>
              <p className={`text-2xl font-bold ${
                (analytics?.trendPercentage || 0) > 0 ? 'text-green-600' :
                (analytics?.trendPercentage || 0) < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {analytics?.trendPercentage ? 
                  `${analytics.trendPercentage > 0 ? '+' : ''}${analytics.trendPercentage.toFixed(1)}%` : 
                  '0%'
                }
              </p>
            </div>
            {(analytics?.trendPercentage || 0) > 0 ? 
              <ArrowUp className="w-8 h-8 text-green-600" /> :
              (analytics?.trendPercentage || 0) < 0 ?
              <ArrowDown className="w-8 h-8 text-red-600" /> :
              <div className="w-8 h-8" />
            }
          </div>
        </div>
      </div>

      {/* Subject Performance & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết quả theo môn học</h3>
          <div className="space-y-4">
            {Object.entries(analytics?.subjectPerformance || {}).map(([subject, data]) => (
              <div key={subject} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{subject}</p>
                  <p className="text-sm text-gray-600">{data.totalReports} báo cáo</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getScoreColor(data.averageScore)}`}>
                    {data.averageScore.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Gần nhất: {data.latestScore.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Strengths */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Điểm mạnh hàng đầu</h3>
          <div className="space-y-3">
            {analytics?.topStrengths?.map(([strength, count], index) => (
              <div key={strength} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-900">{strength}</span>
                </div>
                <span className="text-sm text-gray-600">{count} lần</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Weaknesses */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Điểm cần cải thiện</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics?.topWeaknesses?.map(([weakness, count], index) => (
            <div key={weakness} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-gray-900">{weakness}</span>
              </div>
              <span className="text-sm text-red-600 font-medium">{count} lần</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDetailedReports = () => (
    <div className="space-y-6">
      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không có báo cáo nào</h3>
          <p className="text-gray-600">Thử thay đổi bộ lọc để xem thêm báo cáo.</p>
        </div>
      ) : (
        filteredReports.map(report => {
          const scoreBadge = getScoreBadge(report.overallScore);
          
          return (
            <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.studentName}</h3>
                  <p className="text-gray-600">{report.subject} • {new Date(report.reportDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-2xl font-bold ${getScoreColor(report.overallScore)}`}>
                      {report.overallScore.toFixed(1)}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${scoreBadge.color}`}>
                    {scoreBadge.label}
                  </span>
                </div>
              </div>

              {/* Detailed Scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Hiểu bài</span>
                  </div>
                  <p className={`text-xl font-bold ${getScoreColor(report.detailedScores.understanding)}`}>
                    {report.detailedScores.understanding.toFixed(1)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Tham gia</span>
                  </div>
                  <p className={`text-xl font-bold ${getScoreColor(report.detailedScores.participation)}`}>
                    {report.detailedScores.participation.toFixed(1)}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Hoàn thành BT</span>
                  </div>
                  <p className={`text-xl font-bold ${getScoreColor(report.detailedScores.homework)}`}>
                    {report.detailedScores.homework.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Award className="w-4 h-4 text-green-600 mr-2" />
                    Điểm mạnh
                  </h4>
                  <div className="space-y-2">
                    {report.strengths?.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                    Cần cải thiện
                  </h4>
                  <div className="space-y-2">
                    {report.weaknesses?.map((weakness, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-gray-700">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Goals and Recommendations */}
              {(report.goals || report.recommendations) && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {report.goals && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Target className="w-4 h-4 text-blue-600 mr-2" />
                          Mục tiêu tiếp theo
                        </h4>
                        <div className="space-y-1">
                          {report.goals.map((goal, index) => (
                            <p key={index} className="text-sm text-gray-700">• {goal}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {report.recommendations && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Khuyến nghị</h4>
                        <div className="space-y-1">
                          {report.recommendations.map((rec, index) => (
                            <p key={index} className="text-sm text-gray-700">• {rec}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Báo cáo Tiến độ</h1>
        <p className="text-gray-600">Theo dõi và phân tích tiến độ học tập</p>
      </div>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'overview' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg font-medium ${
                viewMode === 'detailed' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Chi tiết
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {user?.role !== 'student' && (
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả học sinh</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>{student.name}</option>
                ))}
              </select>
            )}

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả môn học</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">7 ngày qua</option>
              <option value="month">30 ngày qua</option>
              <option value="semester">Học kỳ này</option>
              <option value="year">Năm học này</option>
            </select>

            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Xuất báo cáo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'overview' ? renderOverview() : renderDetailedReports()}
    </div>
  );
};

export default ProgressReports;
