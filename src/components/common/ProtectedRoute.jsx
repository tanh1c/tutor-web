import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../../utils/helpers';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    console.log('ProtectedRoute - Component mounting');
    console.log('Current path:', location.pathname);
    console.log('User from context:', user);
    console.log('Loading from context:', loading);
    
    // Wait for UserContext to finish loading
    if (!loading) {
      setIsChecking(false);
    }
  }, [loading, user]);

  // Show loading during check
  if (isChecking || loading) {
    console.log('ProtectedRoute - Still checking...');
    return (
      <div className="min-h-screen flex items-center justify-center tutor-gradient-bg">
        <div className="text-white">Đang kiểm tra xác thực...</div>
      </div>
    );
  }

  // Use context user instead of localStorage directly
  console.log('ProtectedRoute - User check:', user);
  
  if (!user) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log('ProtectedRoute - Role check failed, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('ProtectedRoute - Authentication passed, rendering children');
  return children;
};

export default ProtectedRoute;
