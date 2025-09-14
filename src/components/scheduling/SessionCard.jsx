import { Clock, MapPin, User, MessageCircle, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const SessionCard = ({ session, viewMode = 'student', onAction }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Không xác định';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const isUpcoming = () => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    return sessionDateTime > new Date() && session.status === 'confirmed';
  };

  const isPast = () => {
    const sessionDateTime = new Date(`${session.date} ${session.time}`);
    return sessionDateTime < new Date();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{session.subject}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(session.date).toLocaleDateString('vi-VN')} lúc {session.time}
              </span>
            </div>
            <span>({session.duration} phút)</span>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(session.status)} flex items-center space-x-1`}>
          {getStatusIcon(session.status)}
          <span>{getStatusText(session.status)}</span>
        </div>
      </div>

      {/* Participant Info */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <User className="w-4 h-4" />
          <span>
            {viewMode === 'student' ? session.tutorName : session.studentName}
          </span>
        </div>
        
        {session.location && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{session.location}</span>
          </div>
        )}
      </div>

      {/* Price */}
      {session.price && (
        <div className="text-sm font-medium text-green-600 mb-3">
          {formatCurrency(session.price)}
        </div>
      )}

      {/* Notes */}
      {session.notes && (
        <div className="text-sm text-gray-600 mb-3 p-2 bg-gray-50 rounded">
          <div className="flex items-start space-x-2">
            <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{session.notes}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-3 border-t border-gray-100">
        {/* View Details button for all sessions */}
        <button
          onClick={() => onAction?.('details', session)}
          className="px-3 py-2 border border-blue-300 text-blue-700 text-sm rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Chi tiết
        </button>

        {session.status === 'pending' && viewMode === 'tutor' && (
          <>
            <button
              onClick={() => onAction?.('confirm', session)}
              className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Xác nhận
            </button>
            <button
              onClick={() => onAction?.('cancel', session)}
              className="flex-1 px-3 py-2 border border-red-300 text-red-700 text-sm rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Từ chối
            </button>
          </>
        )}

        {session.status === 'pending' && viewMode === 'student' && (
          <button
            onClick={() => onAction?.('cancel', session)}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Hủy đặt lịch
          </button>
        )}

        {session.status === 'confirmed' && isUpcoming() && (
          <>
            <button
              onClick={() => onAction?.('reschedule', session)}
              className="px-3 py-2 border border-blue-300 text-blue-700 text-sm rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Đổi lịch
            </button>
            <button
              onClick={() => onAction?.('cancel', session)}
              className="px-3 py-2 border border-red-300 text-red-700 text-sm rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Hủy
            </button>
          </>
        )}

        {session.status === 'completed' && viewMode === 'student' && !session.hasReview && (
          <button
            onClick={() => onAction?.('review', session)}
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Đánh giá
          </button>
        )}

        {isUpcoming() && session.status === 'confirmed' && (
          <button
            onClick={() => onAction?.('join', session)}
            className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {session.sessionType === 'online' ? 'Tham gia' : 'Chi tiết'}
          </button>
        )}
      </div>

      {/* Room booking link */}
      {session.roomId && session.roomBookingUrl && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <a
            href={session.roomBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Xem thông tin phòng học
          </a>
        </div>
      )}

      {/* Upcoming session reminder */}
      {isUpcoming() && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>
              Sắp diễn ra - Hãy chuẩn bị sẵn sàng!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionCard;
