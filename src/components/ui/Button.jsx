import React, { forwardRef } from 'react';
import { variants, cssUtils } from '../../styles/theme';
import { LoaderIcon } from 'lucide-react';

// Enhanced Button Component
export const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  ...props 
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    border transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${cssUtils.transition}
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  const variantClasses = variants.button[variant] || variants.button.primary;
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${widthClass} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
