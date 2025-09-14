import React from 'react';
import { variants } from '../../styles/theme';

// Enhanced Badge Component
export const Badge = ({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border';
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base'
  };

  const variantClasses = variants.badge[variant] || variants.badge.neutral;

  return (
    <span
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
