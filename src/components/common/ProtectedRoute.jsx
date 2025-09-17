import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  console.log('ProtectedRoute - Current state:', {
    pathname: location.pathname,
    user: user?.name,
    role: user?.role,
    loading,
    requiredRole
  });

  // Show loading only during initial load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center tutor-gradient-bg">
        <div className="text-white">Đang kiểm tra xác thực...</div>
      </div>
    );
  }

  // Check authentication using context user
  if (!user) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role authorization
  if (requiredRole && user.role !== requiredRole) {
    // Admin can access all pages
    if (user.role === 'admin') {
      // Admin has full access, continue
    } else {
      console.log('ProtectedRoute - Role check failed, redirecting to dashboard');
      return <Navigate to="/dashboard" replace />;
    }
  }

  console.log('ProtectedRoute - Authentication passed, rendering children');
  return children;
};

export default ProtectedRoute;
