import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, User, MapPin, Calendar, FileText, 
  Play, Square, Users, Upload, Download, Video, 
  MessageSquare, CheckCircle, AlertCircle, Settings,
  Link as LinkIcon, BookOpen, Target
} from 'lucide-react';
import { sessions, sessionStatuses, libraryResources, sessionRecordings } from '../../data/mockData';
import { useUser } from '../../context/UserContext';
import SessionNotes from './SessionNotes';
import ResourceSharing from './ResourceSharing';
import ProgressTracker from './ProgressTracker';

const SessionDetails = ({ sessionId, onBack }) => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [sessionStatus, setSessionStatus] = useState('');
  const [attendanceConfirmed, setAttendanceConfirmed] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const session = sessions.find(s => s.id === sessionId);
  
  if (!session) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Session không tồn tại</h3>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800"
        >
          Quay lại
        </button>
      </div>
    );
  }

  useEffect(() => {
    setSessionStatus(session.status);
  }, [session.status]);

  const getStatusColor = (status) => {
    const statusInfo = sessionStatuses.find(s => s.id === status);
    const colorMap = {
      'gray': 'bg-gray-100 text-gray-800',
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'red': 'bg-red-100 text-red-800',
      'yellow': 'bg-yellow-100 text-yellow-800'
    };
    return colorMap[statusInfo?.color] || 'bg-gray-100 text-gray-800';
  };

  const canStartSession = () => {
    const now = new Date();
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    const timeDiff = Math.abs(now - sessionDateTime) / (1000 * 60); // difference in minutes
    
    return sessionStatus === 'confirmed' && timeDiff <= 15; // Can start 15 mins before/after
  };

  const canEndSession = () => {
    return sessionStatus === 'in-progress';
  };

  const handleStartSession = () => {
    setSessionStatus('in-progress');
    console.log('Starting session:', session.id);
  };

  const handleEndSession = () => {
    setSessionStatus('completed');
    console.log('Ending session:', session.id);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    console.log('Toggle recording:', !isRecording);
  };

  const handleConfirmAttendance = () => {
    setAttendanceConfirmed(true);
    console.log('Attendance confirmed for session:', session.id);
  };

  const tabs = [
    { key: 'overview', label: 'Tổng quan', icon: Calendar },
    { key: 'notes', label: 'Ghi chú', icon: FileText },
    { key: 'resources', label: 'Tài liệu', icon: BookOpen },
    { key: 'progress', label: 'Tiến độ', icon: Target },
    { key: 'recording', label: 'Ghi hình', icon: Video }
  ];

  const formatDateTime = (date, time) => {
    const sessionDate = new Date(date);
    return {
      date: sessionDate.toLocaleDateString('vi-VN', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: time
    };
  };

  const dateTime = formatDateTime(session.date, session.time);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{session.subject}</h1>
            <p className="text-gray-600">
              {user?.role === 'tutor' ? session.studentName : session.tutorName}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sessionStatus)}`}>
            {sessionStatuses.find(s => s.id === sessionStatus)?.name}
          </span>
          
          {canStartSession() && (
            <button
              onClick={handleStartSession}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Play className="w-4 h-4" />
              <span>Bắt đầu</span>
            </button>
          )}
          
          {canEndSession() && (
            <button
              onClick={handleEndSession}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Square className="w-4 h-4" />
              <span>Kết thúc</span>
            </button>
          )}
        </div>
      </div>

      {/* Session Info Card */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Ngày học</p>
              <p className="font-medium">{dateTime.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Thời gian</p>
              <p className="font-medium">{dateTime.time} ({session.duration} phút)</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Địa điểm</p>
              <p className="font-medium">{session.location || 'Online'}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Loại session</p>
              <p className="font-medium capitalize">{session.sessionType || 'Academic'}</p>
            </div>
          </div>
        </div>

        {/* Session Notes Preview */}
        {session.notes && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Ghi chú ban đầu:</p>
            <p className="text-sm">{session.notes}</p>
          </div>
        )}

        {/* Live Session Controls */}
        {sessionStatus === 'in-progress' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">Session đang diễn ra</span>
              </div>
              
              <div className="flex items-center space-x-3">
                {!attendanceConfirmed && (
                  <button
                    onClick={handleConfirmAttendance}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Xác nhận có mặt
                  </button>
                )}
                
                <button
                  onClick={handleToggleRecording}
                  className={`flex items-center space-x-2 px-3 py-1 text-sm rounded ${
                    isRecording 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>{isRecording ? 'Dừng ghi' : 'Ghi hình'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin chi tiết</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Mục tiêu buổi học</h4>
                      <p className="text-sm text-gray-600">
                        {session.objectives || 'Chưa có mục tiêu cụ thể'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Nội dung</h4>
                      <p className="text-sm text-gray-600">
                        {session.agenda || 'Chưa có agenda chi tiết'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Chuẩn bị</h4>
                      <p className="text-sm text-gray-600">
                        {session.preparation || 'Không có yêu cầu chuẩn bị đặc biệt'}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Kết quả mong đợi</h4>
                      <p className="text-sm text-gray-600">
                        {session.expectedOutcome || 'Chưa xác định kết quả mong đợi'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {attendanceConfirmed && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Đã xác nhận tham dự</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <SessionNotes sessionId={session.id} sessionType={session.sessionType} />
          )}

          {activeTab === 'resources' && (
            <ResourceSharing sessionId={session.id} subject={session.subject} />
          )}

          {activeTab === 'progress' && (
            <ProgressTracker 
              sessionId={session.id} 
              studentId={user?.role === 'student' ? user.id : session.studentId}
              tutorId={user?.role === 'tutor' ? user.id : session.tutorId}
            />
          )}

          {activeTab === 'recording' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Ghi hình Session</h3>
                
                {sessionStatus === 'in-progress' && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Video className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">
                            {isRecording ? 'Đang ghi hình...' : 'Sẵn sàng ghi hình'}
                          </p>
                          <p className="text-sm text-blue-700">
                            {isRecording 
                              ? 'Session đang được ghi lại. Chất lượng: 1080p' 
                              : 'Nhấn để bắt đầu ghi hình session này'
                            }
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleToggleRecording}
                        className={`px-4 py-2 rounded-lg font-medium ${
                          isRecording
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {isRecording ? 'Dừng ghi' : 'Bắt đầu ghi'}
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Các bản ghi có sẵn</h4>
                  {sessionRecordings.filter(r => r.sessionId === session.id).length > 0 ? (
                    <div className="space-y-3">
                      {sessionRecordings
                        .filter(r => r.sessionId === session.id)
                        .map(recording => (
                          <div key={recording.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <img
                                src={recording.thumbnailUrl}
                                alt={recording.title}
                                className="w-16 h-9 object-cover rounded"
                              />
                              <div>
                                <h5 className="font-medium text-gray-900">{recording.title}</h5>
                                <p className="text-sm text-gray-600">
                                  {recording.duration} • {recording.quality} • {recording.size}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(recording.createdAt).toLocaleDateString('vi-VN')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {recording.hasTranscript && (
                                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                  Transcript
                                </button>
                              )}
                              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Xem
                              </button>
                              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Chưa có bản ghi nào cho session này</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
