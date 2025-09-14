import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../../utils/helpers';
import { useState, useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log('ProtectedRoute - Component mounting');
    console.log('Current path:', location.pathname);
    console.log('localStorage at mount:', localStorage.getItem('currentUser'));
    
    // Give a brief moment for localStorage to be available
    const timer = setTimeout(() => {
      console.log('ProtectedRoute - Checking completed');
      console.log('localStorage after delay:', localStorage.getItem('currentUser'));
      setIsChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show loading during check
  if (isChecking) {
    console.log('ProtectedRoute - Still checking...');
    return (
      <div className="min-h-screen flex items-center justify-center tutor-gradient-bg">
        <div className="text-white">Đang kiểm tra xác thực...</div>
      </div>
    );
  }

  const isAuth = isAuthenticated();
  console.log('ProtectedRoute - isAuthenticated result:', isAuth);
  
  if (!isAuth) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    console.log('ProtectedRoute - Role check failed, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('ProtectedRoute - Authentication passed, rendering children');
  return children;
};

export default ProtectedRoute;
