import React, { forwardRef } from 'react';
import { variants } from '../../styles/theme';

// Enhanced Card Component
export const Card = forwardRef(({ 
  children, 
  variant = 'default', 
  className = '',
  padding = 'md',
  ...props 
}, ref) => {
  const baseClasses = 'rounded-lg border';
  const variantClasses = variants.card[variant] || variants.card.default;
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
