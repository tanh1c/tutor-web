import React from 'react';

// HCMUT Brand Logo Component
export const HCMUTLogo = ({ 
  size = 'md', 
  variant = 'default', 
  className = '',
  showText = true,
  textPosition = 'right'
}) => {
  const sizeClasses = {
    xxs: 'w-4 h-4',
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20',
    '3xl': 'w-24 h-24'
  };

  const containerClasses = {
    default: 'rounded-xl p-1',
    circle: 'rounded-full p-2',
    square: 'rounded-lg p-1',
    none: ''
  };

  const bgStyles = {
    default: {
    },
    white: {
      background: 'rgba(255, 255, 255, 0.95)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    transparent: {
      background: 'transparent'
    }
  };

  const logoFilter = variant === 'default' || variant === 'glass' 
    ? { filter: 'none' }
    : variant === 'white'
    ? { filter: 'none' }
    : { filter: 'none' };

  const LogoImage = () => (
    <img 
      src="/HCMUT.svg" 
      alt="HCMUT Logo" 
      className="w-full h-full object-contain"
      style={logoFilter}
    />
  );

  const BrandText = () => (
    <div className={textPosition === 'bottom' ? 'text-center' : ''}>
      <h1 className={`font-bold text-gradient ${
        size === 'xs' || size === 'sm' ? 'text-sm' :
        size === 'md' ? 'text-lg' :
        size === 'lg' ? 'text-xl' :
        size === 'xl' ? 'text-2xl' :
        size === '2xl' ? 'text-3xl' :
        'text-4xl'
      }`}>
        HCMUT Tutor
      </h1>
      {(size === 'lg' || size === 'xl' || size === '2xl' || size === '3xl') && (
        <p className={`text-neutral-500 ${
          size === 'lg' ? 'text-xs' :
          size === 'xl' ? 'text-sm' :
          'text-base'
        } -mt-1`}>
          Hệ thống học tập thông minh
        </p>
      )}
    </div>
  );

  if (!showText) {
    return (
      <div 
        className={`${sizeClasses[size]} ${containerClasses[variant]} flex items-center justify-center transition-all duration-200 hover:scale-110 ${className}`}
        style={bgStyles[variant] || bgStyles.default}
      >
        <LogoImage />
      </div>
    );
  }

  if (textPosition === 'bottom') {
    return (
      <div className={`flex flex-col items-center space-y-3 ${className}`}>
        <div 
          className={`${sizeClasses[size]} ${containerClasses[variant]} flex items-center justify-center transition-all duration-200 hover:scale-110`}
          style={bgStyles[variant] || bgStyles.default}
        >
          <LogoImage />
        </div>
        <BrandText />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${textPosition === 'left' ? 'flex-row-reverse' : ''} space-x-3 ${className}`}>
      <div 
        className={`${sizeClasses[size]} ${containerClasses[variant]} flex items-center justify-center transition-all duration-200 hover:scale-110`}
        style={bgStyles[variant] || bgStyles.default}
      >
        <LogoImage />
      </div>
      <BrandText />
    </div>
  );
};

// Footer brand component
export const HCMUTFooter = ({ theme = 'light', className = '' }) => {
  const styles = {
    light: {
      logoFilter: 'none',
      textColor: 'text-neutral-600',
      dividerColor: 'bg-neutral-300'
    },
    dark: {
      logoFilter: 'none',
      textColor: 'text-blue-200',
      dividerColor: 'bg-blue-300 opacity-50'
    }
  };

  const currentStyle = styles[theme];

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center space-x-3 mb-4">
        <img 
          src="/HCMUT.svg" 
          alt="HCMUT Logo" 
          className="w-8 h-8 object-contain"
          style={{ filter: currentStyle.logoFilter }}
        />
        <div className={`h-6 w-px ${currentStyle.dividerColor}`}></div>
        <p className={`${currentStyle.textColor} text-sm`}>
          Đại học Bách khoa TP.HCM
        </p>
      </div>
      <p className={`${currentStyle.textColor} text-xs opacity-75`}>
        © 2024 HCMUT Tutor System. All rights reserved.
      </p>
    </div>
  );
};

// Loading spinner with HCMUT logo
export const HCMUTLoader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-primary-200 animate-spin border-t-primary-500"></div>
        <div className="absolute inset-2 rounded-xl flex items-center justify-center p-1" style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)'
        }}>
          <img 
            src="/HCMUT.svg" 
            alt="HCMUT Logo" 
            className="w-full h-full object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>
      <p className="text-neutral-600 text-sm animate-pulse">Đang tải...</p>
    </div>
  );
};

export default HCMUTLogo;
