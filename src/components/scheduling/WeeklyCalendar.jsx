import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, MapPin } from 'lucide-react';
import { sessions, timeSlots } from '../../data/mockData';
import BookingModal from './BookingModal';

const WeeklyCalendar = ({ tutorId = null, viewMode = 'tutor' }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Get start of current week (Monday)
  const getWeekStart = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentWeek);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    return day;
  });

  const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];

  // Filter sessions for current week and tutor (if specified)
  const weekSessions = sessions.filter(session => {
    const sessionDate = new Date(session.date);
    const isInWeek = sessionDate >= weekStart && 
                     sessionDate < new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    return isInWeek && (tutorId ? session.tutorId === tutorId : true);
  });

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const getSessionsForDay = (day) => {
    return weekSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.toDateString() === day.toDateString();
    });
  };

  const handleTimeSlotClick = (day, timeSlot) => {
    setSelectedTimeSlot({
      date: day,
      time: timeSlot,
      tutorId: tutorId
    });
    setIsBookingModalOpen(true);
  };

  const getTimeSlotStatus = (day, timeSlot) => {
    const daySessions = getSessionsForDay(day);
    const session = daySessions.find(s => s.time === timeSlot);
    
    if (session) {
      switch (session.status) {
        case 'confirmed': return 'bg-green-100 border-green-300 text-green-800';
        case 'pending': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
        case 'cancelled': return 'bg-red-100 border-red-300 text-red-800';
        default: return 'bg-gray-100 border-gray-300 text-gray-600';
      }
    }
    
    // Check if time slot is available for booking
    const now = new Date();
    const slotDateTime = new Date(day);
    const [hours, minutes] = timeSlot.split(':');
    slotDateTime.setHours(parseInt(hours), parseInt(minutes));
    
    if (slotDateTime < now) {
      return 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed';
    }
    
    return 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {viewMode === 'tutor' ? 'Lịch Dạy' : 'Lịch Học'}
          </h2>
          <div className="text-sm text-gray-600">
            {weekStart.toLocaleDateString('vi-VN')} - {
              new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')
            }
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Hôm nay
          </button>
          <button
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-1">
        {/* Time column header */}
        <div className="p-2 text-sm font-medium text-gray-600 text-center border-b">
          Giờ
        </div>
        
        {/* Day headers */}
        {weekDays.map((day, index) => (
          <div key={day.toISOString()} className="p-2 text-center border-b">
            <div className="text-sm font-medium text-gray-600">{dayNames[index]}</div>
            <div className="text-lg font-semibold text-gray-900">{day.getDate()}</div>
          </div>
        ))}

        {/* Time slots */}
        {timeSlots.map(timeSlot => (
          <div key={timeSlot} className="contents">
            {/* Time label */}
            <div className="p-2 text-sm text-gray-600 text-center border-r bg-gray-50">
              {timeSlot}
            </div>
            
            {/* Day cells */}
            {weekDays.map(day => {
              const daySessions = getSessionsForDay(day);
              const session = daySessions.find(s => s.time === timeSlot);
              const statusClass = getTimeSlotStatus(day, timeSlot);
              
              return (
                <div
                  key={`${day.toISOString()}-${timeSlot}`}
                  className={`p-1 border-r border-b min-h-[60px] ${statusClass}`}
                  onClick={() => !session && !statusClass.includes('cursor-not-allowed') && handleTimeSlotClick(day, timeSlot)}
                >
                  {session && (
                    <div className="text-xs p-1 rounded">
                      <div className="font-medium truncate">
                        {viewMode === 'tutor' ? session.studentName : session.subject}
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.duration}p</span>
                      </div>
                      {session.location && (
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{session.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Đã xác nhận</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
          <span>Chờ xác nhận</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Đã hủy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
          <span>Có thể đặt</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-50 border border-gray-200 rounded"></div>
          <span>Đã qua</span>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          timeSlot={selectedTimeSlot}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={(bookingData) => {
            // Handle booking confirmation
            console.log('Booking confirmed:', bookingData);
            setIsBookingModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default WeeklyCalendar;
