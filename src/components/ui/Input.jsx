import React, { forwardRef } from 'react';

// Enhanced Input Component
export const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  ...props 
}, ref) => {
  const baseClasses = `
    block w-full px-3 py-2 border rounded-lg shadow-sm
    placeholder-neutral-400 
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    transition-colors duration-200
    ${error ? 'border-red-300 text-red-900' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`${baseClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
