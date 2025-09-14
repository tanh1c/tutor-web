import { useState, useEffect } from 'react';
import { 
  BellIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  AlertTriangleIcon,
  InfoIcon,
  XIcon
} from 'lucide-react';

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Individual Notification Component
export const NotificationItem = ({ 
  id,
  type, 
  title, 
  message, 
  timestamp,
  onDismiss,
  autoHide = true,
  hideDelay = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onDismiss && onDismiss(id), 300);
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay, id, onDismiss]);

  const getIcon = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case NOTIFICATION_TYPES.ERROR:
        return <XCircleIcon className="h-5 w-5 text-red-400" />;
      case NOTIFICATION_TYPES.WARNING:
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case NOTIFICATION_TYPES.INFO:
      default:
        return <InfoIcon className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return 'bg-green-50 border-green-200';
      case NOTIFICATION_TYPES.ERROR:
        return 'bg-red-50 border-red-200';
      case NOTIFICATION_TYPES.WARNING:
        return 'bg-yellow-50 border-yellow-200';
      case NOTIFICATION_TYPES.INFO:
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`
      ${getBgColor()} border rounded-lg p-4 mb-3 transition-all duration-300 transform
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {message && (
            <p className="mt-1 text-sm text-gray-600">{message}</p>
          )}
          {timestamp && (
            <p className="mt-2 text-xs text-gray-500">
              {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onDismiss && onDismiss(id), 300);
            }}
            className="inline-flex text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Notifications Container
export const NotificationContainer = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-96 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
};

// Alert Component
export const Alert = ({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = '' 
}) => {
  const getAlertClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case 'info':
      default:
        return <InfoIcon className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div className={`rounded-md border p-4 ${getAlertClasses()} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className={`${title ? 'mt-2' : ''} text-sm`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={onClose}
                className="inline-flex rounded-md p-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Notification Badge Component
export const NotificationBadge = ({ count, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-600 hover:text-gray-900 ${className}`}
    >
      <BellIcon className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

// System Status Component
export const SystemStatus = ({ 
  status = 'operational', 
  lastUpdated,
  services = [] 
}) => {
  const getStatusColor = (serviceStatus) => {
    switch (serviceStatus) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'outage':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (serviceStatus) => {
    switch (serviceStatus) {
      case 'operational':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangleIcon className="h-4 w-4 text-yellow-500" />;
      case 'outage':
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      default:
        return <InfoIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="space-y-3">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(service.status)}
              <span className="text-sm font-medium text-gray-900">{service.name}</span>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(service.status)}`}>
              {service.status}
            </span>
          </div>
        ))}
      </div>

      {lastUpdated && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

// Custom Hook for Managing Notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };
};
