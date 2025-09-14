import { useState } from 'react';
import { 
  Star, MessageCircle, Send, ThumbsUp, ThumbsDown,
  CheckCircle, AlertCircle, User, Target, BookOpen,
  TrendingUp, Clock, Award
} from 'lucide-react';
import { feedbackCategories } from '../../data/mockData';
import { useUser } from '../../context/UserContext';

const FeedbackForm = ({ 
  sessionId, 
  recipientId, 
  recipientName, 
  recipientRole,
  feedbackType = 'student_to_tutor', // 'student_to_tutor', 'tutor_to_student', 'system_survey'
  onSubmit, 
  onCancel 
}) => {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [ratings, setRatings] = useState({});
  const [progressAssessment, setProgressAssessment] = useState({});
  const [formData, setFormData] = useState({
    comment: '',
    improvements: '',
    recommendations: [],
    nextSessionFocus: '',
    wouldRecommend: null,
    isAnonymous: false
  });
  const [hoveredRating, setHoveredRating] = useState({});

  const isStudentFeedback = feedbackType === 'student_to_tutor';
  const isTutorFeedback = feedbackType === 'tutor_to_student';
  const isSystemSurvey = feedbackType === 'system_survey';

  const progressCategories = [
    { id: 'understanding', name: 'Mức độ hiểu bài', icon: BookOpen },
    { id: 'participation', name: 'Tham gia tích cực', icon: User },
    { id: 'homework', name: 'Hoàn thành bài tập', icon: CheckCircle },
    { id: 'improvement', name: 'Tiến bộ tổng thể', icon: TrendingUp }
  ];

  const systemSurveyCategories = [
    { id: 'platform_ease', name: 'Dễ sử dụng platform', icon: CheckCircle },
    { id: 'booking_process', name: 'Quy trình đặt lịch', icon: Clock },
    { id: 'session_quality', name: 'Chất lượng session', icon: Award },
    { id: 'technical_issues', name: 'Vấn đề kỹ thuật (1=nhiều, 5=ít)', icon: AlertCircle },
    { id: 'support_responsiveness', name: 'Hỗ trợ kỹ thuật', icon: User },
    { id: 'overall_satisfaction', name: 'Hài lòng tổng thể', icon: Star }
  ];

  const handleRatingChange = (category, rating) => {
    setRatings(prev => ({ ...prev, [category]: rating }));
  };

  const handleProgressChange = (category, rating) => {
    setProgressAssessment(prev => ({ ...prev, [category]: rating }));
  };

  const handleRecommendationChange = (index, value) => {
    const newRecommendations = [...formData.recommendations];
    newRecommendations[index] = value;
    setFormData(prev => ({ ...prev, recommendations: newRecommendations }));
  };

  const addRecommendation = () => {
    setFormData(prev => ({
      ...prev,
      recommendations: [...prev.recommendations, '']
    }));
  };

  const removeRecommendation = (index) => {
    const newRecommendations = formData.recommendations.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, recommendations: newRecommendations }));
  };

  const isStepValid = () => {
    if (step === 1) {
      if (isStudentFeedback || isSystemSurvey) {
        const requiredCategories = isStudentFeedback ? feedbackCategories : systemSurveyCategories;
        return requiredCategories.every(cat => ratings[cat.id] > 0);
      }
      if (isTutorFeedback) {
        return progressCategories.every(cat => progressAssessment[cat.id] > 0);
      }
    }
    if (step === 2) {
      if (isStudentFeedback) {
        return formData.comment.trim().length > 0;
      }
      if (isTutorFeedback) {
        return formData.comment.trim().length > 0 && formData.nextSessionFocus.trim().length > 0;
      }
      if (isSystemSurvey) {
        return true; // Comments optional for system survey
      }
    }
    return true;
  };

  const handleSubmit = () => {
    const feedbackData = {
      sessionId,
      fromUserId: user?.id,
      fromUserName: user?.name,
      fromUserRole: user?.role,
      toUserId: recipientId,
      toUserName: recipientName,
      toUserRole: recipientRole,
      feedbackType,
      ratings: isStudentFeedback || isSystemSurvey ? ratings : undefined,
      progressAssessment: isTutorFeedback ? progressAssessment : undefined,
      ...formData,
      createdAt: new Date().toISOString()
    };

    onSubmit?.(feedbackData);
  };

  const renderStarRating = (categoryId, currentRating, onChange, isHovered = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(categoryId, star)}
            onMouseEnter={() => setHoveredRating(prev => ({ ...prev, [categoryId]: star }))}
            onMouseLeave={() => setHoveredRating(prev => ({ ...prev, [categoryId]: 0 }))}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hoveredRating[categoryId] || currentRating)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const getFormTitle = () => {
    if (isStudentFeedback) return `Đánh giá ${recipientRole === 'tutor' ? 'Gia sư' : 'Session'}`;
    if (isTutorFeedback) return `Đánh giá học sinh: ${recipientName}`;
    if (isSystemSurvey) return 'Khảo sát hài lòng hệ thống';
    return 'Đánh giá';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{getFormTitle()}</h2>
            {recipientName && (
              <p className="text-sm text-gray-600">
                {isStudentFeedback ? `Gia sư: ${recipientName}` : 
                 isTutorFeedback ? `Học sinh: ${recipientName}` : ''}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 1 ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              {step === 1 ? '1' : '2'}
            </div>
            <div className="w-8 h-1 bg-gray-200 rounded">
              <div className={`h-full bg-blue-600 rounded transition-all duration-300 ${
                step === 2 ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Ratings */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {isStudentFeedback ? 'Đánh giá chi tiết' : 
                 isTutorFeedback ? 'Đánh giá tiến độ học sinh' :
                 'Đánh giá hệ thống'}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Vui lòng đánh giá từng tiêu chí bằng thang điểm 5 sao
              </p>
            </div>

            <div className="grid gap-6">
              {/* Student to Tutor Ratings */}
              {isStudentFeedback && feedbackCategories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                  <div className="ml-4">
                    {renderStarRating(category.id, ratings[category.id] || 0, handleRatingChange)}
                  </div>
                </div>
              ))}

              {/* Tutor to Student Assessment */}
              {isTutorFeedback && progressCategories.map(category => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                      </div>
                    </div>
                    <div className="ml-4">
                      {renderStarRating(category.id, progressAssessment[category.id] || 0, handleProgressChange)}
                    </div>
                  </div>
                );
              })}

              {/* System Survey */}
              {isSystemSurvey && systemSurveyCategories.map(category => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 flex-1">
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                      </div>
                    </div>
                    <div className="ml-4">
                      {renderStarRating(category.id, ratings[category.id] || 0, handleRatingChange)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Comments and Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Chi tiết đánh giá
              </h3>
            </div>

            {/* Student Feedback Form */}
            {isStudentFeedback && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận xét chi tiết *
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chia sẻ trải nghiệm của bạn về session này..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gợi ý cải thiện
                  </label>
                  <textarea
                    value={formData.improvements}
                    onChange={(e) => setFormData(prev => ({ ...prev, improvements: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Những điểm có thể cải thiện trong tương lai..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Bạn có muốn giới thiệu gia sư này cho bạn bè không?
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, wouldRecommend: true }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        formData.wouldRecommend === true
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Có</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, wouldRecommend: false }))}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        formData.wouldRecommend === false
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                      <span>Không</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Gửi đánh giá ẩn danh</span>
                  </label>
                </div>
              </div>
            )}

            {/* Tutor Assessment Form */}
            {isTutorFeedback && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nhận xét về học sinh *
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Đánh giá về thái độ học tập, khả năng tiếp thu..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Khuyến nghị cho học sinh
                  </label>
                  <div className="space-y-2">
                    {formData.recommendations.map((rec, index) => (
                      <div key={index} className="flex space-x-2">
                        <input
                          type="text"
                          value={rec}
                          onChange={(e) => handleRecommendationChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nhập khuyến nghị..."
                        />
                        <button
                          type="button"
                          onClick={() => removeRecommendation(index)}
                          className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRecommendation}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      + Thêm khuyến nghị
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trọng tâm session tiếp theo *
                  </label>
                  <input
                    type="text"
                    value={formData.nextSessionFocus}
                    onChange={(e) => setFormData(prev => ({ ...prev, nextSessionFocus: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nội dung chính cần tập trung trong buổi học tiếp theo..."
                  />
                </div>
              </div>
            )}

            {/* System Survey Form */}
            {isSystemSurvey && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Góp ý thêm về hệ thống
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chia sẻ ý kiến để chúng tôi cải thiện hệ thống..."
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Quay lại
              </button>
            )}
          </div>

          <div className="flex space-x-3">
            {step === 1 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium ${
                  isStepValid()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Tiếp theo</span>
              </button>
            )}
            {step === 2 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-medium ${
                  isStepValid()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Gửi đánh giá</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
