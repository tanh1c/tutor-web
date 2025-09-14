// Authentication utilities
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const login = (email, password, users) => {
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return user !== null;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};

export const switchRole = (newRole, users) => {
  // For demo purposes - allow role switching
  const newUser = users.find(u => u.role === newRole);
  if (newUser) {
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  return null;
};

// Date and time utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

export const formatTime = (timeString) => {
  return timeString;
};

export const formatDateTime = (dateString, timeString) => {
  return `${formatDate(dateString)} lúc ${formatTime(timeString)}`;
};

// Session utilities
export const getSessionsByUser = (sessions, userId, role) => {
  if (role === 'student') {
    return sessions.filter(session => session.studentId === userId);
  } else if (role === 'tutor') {
    return sessions.filter(session => session.tutorId === userId);
  }
  return sessions;
};

export const getSessionStatus = (status) => {
  const statusMap = {
    'pending': { text: 'Chờ xác nhận', color: 'yellow' },
    'confirmed': { text: 'Đã xác nhận', color: 'blue' },
    'completed': { text: 'Hoàn thành', color: 'green' },
    'cancelled': { text: 'Đã hủy', color: 'red' }
  };
  return statusMap[status] || { text: status, color: 'gray' };
};

// Form validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

// User utilities
export const getUsersByRole = (users, role) => {
  return users.filter(user => user.role === role);
};

export const getTutorRating = (sessions, tutorId) => {
  const tutorSessions = sessions.filter(s => s.tutorId === tutorId && s.rating);
  if (tutorSessions.length === 0) return 0;
  const totalRating = tutorSessions.reduce((sum, session) => sum + session.rating, 0);
  return totalRating / tutorSessions.length;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};
