import React, { useState, useEffect } from 'react';
import { HCMUTLogo } from './HCMUTBrand';

const HCMUTSplashScreen = ({ onComplete, duration = 3000 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Khởi tạo hệ thống...",
    "Đang tải dữ liệu...",
    "Chuẩn bị giao diện...",
    "Hoàn tất!"
  ];

  useEffect(() => {
    const stepDuration = duration / steps.length;
    const progressInterval = 50; // Update progress every 50ms
    const progressStep = 100 / (duration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + progressStep, 100);
        return newProgress;
      });
    }, progressInterval);

    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= steps.length) {
          clearInterval(stepTimer);
          clearInterval(progressTimer);
          setTimeout(() => {
            onComplete && onComplete();
          }, 500);
          return prev;
        }
        return nextStep;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
    };
  }, [duration, steps.length, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)'
    }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full" style={{
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full" style={{
          background: 'rgba(255, 255, 255, 0.05)',
          filter: 'blur(40px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12 animate-scale-in">
          <HCMUTLogo 
            size="3xl" 
            variant="glass" 
            showText={true}
            textPosition="bottom"
            className="mb-6"
          />
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Chào mừng đến với
            </h1>
            <div className="text-6xl font-bold text-white mb-2 animate-pulse">
              HCMUT Tutor
            </div>
            <p className="text-blue-100 text-xl">
              Hệ thống học tập thông minh
            </p>
          </div>
        </div>

        {/* Progress section */}
        <div className="w-80 mx-auto">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Current step */}
          <div className="mb-8">
            <p className="text-blue-100 text-lg animate-fade-in">
              {steps[currentStep]}
            </p>
            <p className="text-blue-200 text-sm mt-2">
              {Math.round(progress)}% hoàn thành
            </p>
          </div>

          {/* Loading dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-3 text-blue-200">
            <img 
              src="/HCMUT.svg" 
              alt="HCMUT Logo" 
              className="w-6 h-6 object-contain opacity-70"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-sm">Đại học Bách khoa TP.HCM</span>
          </div>
          <p className="text-blue-300 text-xs mt-2 opacity-75">
            © 2024 HCMUT Tutor System
          </p>
        </div>
      </div>
    </div>
  );
};

export default HCMUTSplashScreen;
