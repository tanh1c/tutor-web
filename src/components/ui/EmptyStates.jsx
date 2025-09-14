import React from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import { Button } from './index';

const EmptyState = ({ 
  icon: Icon = AlertTriangle,
  title = "No data found",
  description = "There's nothing here yet.",
  action,
  actionText = "Try again",
  illustration,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      
      {action && (
        <Button onClick={action} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};

const ErrorState = ({ 
  title = "Something went wrong",
  description = "We encountered an error. Please try again.",
  onRetry,
  onGoHome,
  showHomeButton = false,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      
      <div className="flex space-x-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
        {showHomeButton && onGoHome && (
          <Button onClick={onGoHome} variant="secondary">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
};

const LoadingState = ({ 
  title = "Loading...",
  description = "Please wait while we fetch your data.",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-12 h-12 mb-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-sm">{description}</p>
    </div>
  );
};

const NotFoundState = ({ 
  title = "Page Not Found",
  description = "The page you're looking for doesn't exist.",
  onGoBack,
  onGoHome,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      
      <div className="flex space-x-3">
        {onGoBack && (
          <Button onClick={onGoBack} variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}
        {onGoHome && (
          <Button onClick={onGoHome} variant="primary">
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
};

// Common empty state configurations
const EmptyStates = {
  noTutors: {
    title: "No tutors found",
    description: "We couldn't find any tutors matching your criteria. Try adjusting your search filters.",
    icon: AlertTriangle
  },
  noSessions: {
    title: "No sessions scheduled",
    description: "You don't have any sessions scheduled yet. Book a session to get started.",
    icon: AlertTriangle
  },
  noNotifications: {
    title: "No notifications",
    description: "You're all caught up! No new notifications at this time.",
    icon: AlertTriangle
  },
  noMessages: {
    title: "No messages",
    description: "Your conversation will appear here once you start chatting.",
    icon: AlertTriangle
  },
  noReports: {
    title: "No reports available",
    description: "Reports will appear here once you have completed sessions.",
    icon: AlertTriangle
  }
};

export {
  EmptyState,
  ErrorState,
  LoadingState,
  NotFoundState,
  EmptyStates
};

export default EmptyState;
