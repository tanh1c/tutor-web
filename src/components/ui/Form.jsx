import React from 'react';
import { Eye, EyeOff, AlertCircle, Check, Search, X } from 'lucide-react';

// Enhanced Input Component
export const FormInput = ({ 
  label,
  error,
  success,
  hint,
  required = false,
  leftIcon,
  rightIcon,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  ...props 
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const inputClasses = [
    'w-full px-4 py-3 rounded-lg border transition-all duration-200',
    'placeholder-gray-400 focus:outline-none focus:ring-2',
    leftIcon ? 'pl-11' : '',
    rightIcon || type === 'password' ? 'pr-11' : '',
    error 
      ? 'border-red-300 focus:border-red-400 focus:ring-red-200' 
      : success
      ? 'border-green-300 focus:border-green-400 focus:ring-green-200'
      : 'border-gray-300 focus:border-indigo-400 focus:ring-indigo-200',
    disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={inputClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
        
        {rightIcon && type !== 'password' && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
        
        {success && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <Check className="h-5 w-5" />
          </div>
        )}
      </div>
      
      {(error || hint || success) && (
        <div className="space-y-1">
          {error && (
            <p className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
          {success && (
            <p className="flex items-center text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" />
              {success}
            </p>
          )}
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">{hint}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Enhanced Textarea
export const FormTextarea = ({
  label,
  error,
  success,
  hint,
  required = false,
  placeholder,
  value,
  onChange,
  rows = 4,
  maxLength,
  disabled = false,
  className = '',
  ...props
}) => {
  const [characterCount, setCharacterCount] = React.useState(value?.length || 0);

  const handleChange = (e) => {
    setCharacterCount(e.target.value.length);
    onChange?.(e);
  };

  const textareaClasses = [
    'w-full px-4 py-3 rounded-lg border transition-all duration-200',
    'placeholder-gray-400 focus:outline-none focus:ring-2 resize-vertical',
    error 
      ? 'border-red-300 focus:border-red-400 focus:ring-red-200' 
      : success
      ? 'border-green-300 focus:border-green-400 focus:ring-green-200'
      : 'border-gray-300 focus:border-indigo-400 focus:ring-indigo-200',
    disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        maxLength={maxLength}
        className={textareaClasses}
        {...props}
      />
      
      <div className="flex justify-between items-start">
        <div className="space-y-1 flex-1">
          {error && (
            <p className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
          {success && (
            <p className="flex items-center text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" />
              {success}
            </p>
          )}
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">{hint}</p>
          )}
        </div>
        
        {maxLength && (
          <p className={`text-sm ml-4 ${
            characterCount > maxLength * 0.9 ? 'text-red-500' : 'text-gray-400'
          }`}>
            {characterCount}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
};

// Enhanced Select
export const FormSelect = ({
  label,
  error,
  success,
  hint,
  required = false,
  placeholder = "Choose an option",
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
  ...props
}) => {
  const selectClasses = [
    'w-full px-4 py-3 rounded-lg border transition-all duration-200',
    'focus:outline-none focus:ring-2 appearance-none bg-white',
    error 
      ? 'border-red-300 focus:border-red-400 focus:ring-red-200' 
      : success
      ? 'border-green-300 focus:border-green-400 focus:ring-green-200'
      : 'border-gray-300 focus:border-indigo-400 focus:ring-indigo-200',
    disabled ? 'bg-gray-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={selectClasses}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 8l4 4 4-4" />
          </svg>
        </div>
      </div>
      
      {(error || hint || success) && (
        <div className="space-y-1">
          {error && (
            <p className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
          {success && (
            <p className="flex items-center text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" />
              {success}
            </p>
          )}
          {hint && !error && !success && (
            <p className="text-sm text-gray-500">{hint}</p>
          )}
        </div>
      )}
    </div>
  );
};

// Checkbox Component
export const FormCheckbox = ({
  label,
  error,
  required = false,
  checked,
  onChange,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={`mt-1 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${className}`}
          {...props}
        />
        {label && (
          <label className={`ml-3 text-sm text-gray-700 ${
            disabled ? 'opacity-50' : 'cursor-pointer'
          }`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
      </div>
      
      {error && (
        <p className="flex items-center text-sm text-red-600 ml-7">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

// Radio Group Component
export const FormRadioGroup = ({
  label,
  error,
  required = false,
  value,
  onChange,
  options = [],
  disabled = false,
  direction = 'vertical'
}) => {
  const containerClasses = direction === 'horizontal' 
    ? 'flex flex-wrap gap-6' 
    : 'space-y-3';

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={containerClasses}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className={`h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            />
            <label className={`ml-3 text-sm text-gray-700 ${
              disabled ? 'opacity-50' : 'cursor-pointer'
            }`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="flex items-center text-sm text-red-600">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormRadioGroup
};
