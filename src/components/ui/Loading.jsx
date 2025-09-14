import React from 'react';

// Simple Loading Spinner - Fixed version
export const LoadingSpinner = ({ size = 'md', color = 'white' }) => {
  const sizeClasses = {
    xs: 'w-3 h-3 border',
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-6 h-6 border-2',
    xl: 'w-8 h-8 border-2'
  };

  const borderColor = color === 'white' 
    ? 'border-white/30 border-t-white' 
    : 'border-blue-200 border-t-blue-500';

  return (
    <div 
      className={`${sizeClasses[size]} ${borderColor} rounded-full animate-spin inline-block`}
    />
  );
};

// Elegant Dots Loading
export const LoadingDots = ({ color = 'white', size = 'sm' }) => {
  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5', 
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((i) => (
        <div 
          key={i}
          className={`${dotSizes[size]} rounded-full animate-pulse`}
          style={{ 
            backgroundColor: color,
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );
};

// Pulse Ring Loading
export const LoadingPulse = ({ color = 'white', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <div 
        className={`absolute ${sizeClasses[size]} rounded-full animate-ping opacity-75`}
        style={{ backgroundColor: color }}
      />
      <div 
        className="relative w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

// Smooth bars loading
export const LoadingBars = ({ color = 'white' }) => {
  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1 h-4 rounded-full animate-pulse"
          style={{
            backgroundColor: color,
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
};

// Page Loading Overlay
export const PageLoadingOverlay = ({ message = 'Đang tải...', show = true }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-white font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

// Button Loading with text
export const ButtonLoading = ({ text = 'Loading...', variant = 'spinner', size = 'sm' }) => {
  const LoadingComponent = {
    spinner: LoadingSpinner,
    dots: LoadingDots,
    pulse: LoadingPulse,
    bars: LoadingBars
  }[variant];

  return (
    <div className="flex items-center justify-center space-x-2">
      <LoadingComponent size={size} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default { LoadingSpinner, LoadingDots, LoadingPulse, LoadingBars, ButtonLoading, PageLoadingOverlay };
