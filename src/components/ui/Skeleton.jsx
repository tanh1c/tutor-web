import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', animation = 'pulse', children, ...props }) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
    avatar: 'rounded-full w-10 h-10'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-bounce',
    none: ''
  };

  const classes = [
    baseClasses,
    variantClasses[variant] || variantClasses.rectangular,
    animationClasses[animation] || animationClasses.pulse,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Common skeleton patterns
const SkeletonCard = ({ className = '' }) => (
  <div className={`border border-gray-200 rounded-lg p-4 space-y-3 ${className}`}>
    <Skeleton className="h-4 w-3/4" variant="text" />
    <Skeleton className="h-3 w-1/2" variant="text" />
    <Skeleton className="h-20 w-full" />
    <div className="flex space-x-2">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
);

const SkeletonTable = ({ rows = 5, columns = 4 }) => (
  <div className="space-y-3">
    {/* Header */}
    <div className="grid grid-cols-4 gap-4 p-4 border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4" variant="text" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-3" variant="text" />
        ))}
      </div>
    ))}
  </div>
);

const SkeletonList = ({ items = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center space-x-3 p-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" variant="text" />
          <Skeleton className="h-3 w-1/2" variant="text" />
        </div>
      </div>
    ))}
  </div>
);

const SkeletonDashboard = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" variant="text" />
      <Skeleton className="h-10 w-32" />
    </div>
    
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <Skeleton className="h-12 w-12" variant="circular" />
            <Skeleton className="h-6 w-16" variant="text" />
          </div>
          <Skeleton className="h-8 w-20 mt-4" variant="text" />
          <Skeleton className="h-4 w-32 mt-2" variant="text" />
        </div>
      ))}
    </div>
    
    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  </div>
);

export {
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  SkeletonList,
  SkeletonDashboard
};

export default Skeleton;
