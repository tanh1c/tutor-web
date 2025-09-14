import { useState } from 'react';
import { X, Clock, MapPin, User, DollarSign } from 'lucide-react';
import { users, rooms } from '../../data/mockData';

const BookingModal = ({ timeSlot, onClose, onConfirm }) => {
  const [bookingData, setBookingData] = useState({
    subject: '',
    duration: 60,
    location: '',
    notes: '',
    sessionType: 'online',
    roomId: ''
  });

  const [errors, setErrors] = useState({});

  // Get tutor info
  const tutor = users.find(t => t.id === timeSlot?.tutorId && t.role === 'tutor');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!bookingData.subject.trim()) {
      newErrors.subject = 'Vui lòng nhập môn học';
    }
    if (!bookingData.duration || bookingData.duration < 30) {
      newErrors.duration = 'Thời lượng tối thiểu 30 phút';
    }
    if (bookingData.sessionType === 'offline' && !bookingData.location.trim() && !bookingData.roomId) {
      newErrors.location = 'Vui lòng chọn địa điểm học';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Calculate price
    const pricePerHour = tutor?.hourlyRate || 150000;
    const totalPrice = (pricePerHour * bookingData.duration) / 60;

    const finalBookingData = {
      ...bookingData,
      date: timeSlot.date,
      time: timeSlot.time,
      tutorId: timeSlot.tutorId,
      tutorName: tutor?.name,
      totalPrice,
      status: 'pending'
    };

    onConfirm(finalBookingData);
  };

  const durationOptions = [
    { value: 30, label: '30 phút' },
    { value: 60, label: '1 giờ' },
    { value: 90, label: '1.5 giờ' },
    { value: 120, label: '2 giờ' },
    { value: 150, label: '2.5 giờ' },
    { value: 180, label: '3 giờ' }
  ];

  const calculatePrice = () => {
    const pricePerHour = tutor?.hourlyRate || 150000;
    return (pricePerHour * bookingData.duration) / 60;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (!timeSlot) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            Đặt lịch học
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Tutor Info */}
          {tutor && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{tutor.name}</h4>
                  <p className="text-sm text-gray-600">{tutor.department}</p>
                  <p className="text-sm font-medium text-blue-600">
                    {formatCurrency(tutor.hourlyRate)}/giờ
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Time Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {timeSlot.date.toLocaleDateString('vi-VN', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} lúc {timeSlot.time}
              </span>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Môn học *
            </label>
            <input
              type="text"
              value={bookingData.subject}
              onChange={(e) => setBookingData({ ...bookingData, subject: e.target.value })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.subject ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="VD: Toán Cao Cấp 1, Lập Trình C++"
            />
            {errors.subject && (
              <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thời lượng *
            </label>
            <select
              value={bookingData.duration}
              onChange={(e) => setBookingData({ ...bookingData, duration: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.duration && (
              <p className="text-sm text-red-600 mt-1">{errors.duration}</p>
            )}
          </div>

          {/* Session Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hình thức học
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="online"
                  checked={bookingData.sessionType === 'online'}
                  onChange={(e) => setBookingData({ ...bookingData, sessionType: e.target.value })}
                  className="mr-2"
                />
                Online
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="offline"
                  checked={bookingData.sessionType === 'offline'}
                  onChange={(e) => setBookingData({ ...bookingData, sessionType: e.target.value })}
                  className="mr-2"
                />
                Trực tiếp
              </label>
            </div>
          </div>

          {/* Location (if offline) */}
          {bookingData.sessionType === 'offline' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa điểm học *
              </label>
              
              {/* Room Selection */}
              <div className="mb-2">
                <label className="block text-xs text-gray-600 mb-1">
                  Chọn phòng có sẵn:
                </label>
                <select
                  value={bookingData.roomId}
                  onChange={(e) => {
                    const room = rooms.find(r => r.id === parseInt(e.target.value));
                    setBookingData({ 
                      ...bookingData, 
                      roomId: e.target.value,
                      location: room ? room.name : bookingData.location
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Chọn phòng --</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.building}) - {room.capacity} chỗ
                    </option>
                  ))}
                </select>
              </div>

              {/* Or custom location */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Hoặc nhập địa điểm khác:
                </label>
                <input
                  type="text"
                  value={bookingData.location}
                  onChange={(e) => setBookingData({ ...bookingData, location: e.target.value, roomId: '' })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="VD: Café, Thư viện, ..."
                />
              </div>
              
              {errors.location && (
                <p className="text-sm text-red-600 mt-1">{errors.location}</p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ghi chú
            </label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nội dung cần hỗ trợ, yêu cầu đặc biệt..."
            />
          </div>

          {/* Price Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tổng chi phí:</span>
              <span className="text-lg font-semibold text-green-600">
                {formatCurrency(calculatePrice())}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {bookingData.duration} phút × {formatCurrency(tutor?.hourlyRate || 150000)}/giờ
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Đặt lịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
