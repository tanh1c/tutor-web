import React from 'react';
import { HCMUTLoader, HCMUTLogo } from './HCMUTBrand';

const HCMUTLoadingScreen = ({ message = "Đang tải...", fullscreen = true }) => {
  const containerClass = fullscreen 
    ? "fixed inset-0 bg-gradient-to-br from-primary-900 via-primary-600 to-primary-400 flex items-center justify-center z-50"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClass}>
      <div className="text-center animate-fade-in">
        <HCMUTLoader size="lg" className="mb-8" />
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            HCMUT Tutor System
          </h1>
          <p className="text-blue-100 text-lg">
            {message}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full animate-pulse" style={{
              animation: 'loading-progress 2s ease-in-out infinite'
            }}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-blue-200 text-sm opacity-75">
            Đại học Bách khoa TP.HCM
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HCMUTLoadingScreen;
