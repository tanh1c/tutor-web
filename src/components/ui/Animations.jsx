import React from 'react';

// Fade Animation Component
export const FadeIn = ({ 
  children, 
  duration = 300, 
  delay = 0,
  direction = 'up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const directionClasses = {
    up: 'translate-y-4',
    down: '-translate-y-4',
    left: 'translate-x-4',
    right: '-translate-x-4',
    none: ''
  };

  const transform = isVisible 
    ? 'translate-x-0 translate-y-0' 
    : directionClasses[direction];

  return (
    <div
      ref={ref}
      className={`transition-all duration-${duration} ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${transform} ${className}`}
    >
      {children}
    </div>
  );
};

// Slide Animation Component
export const SlideIn = ({ 
  children, 
  direction = 'left',
  duration = 300,
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const directionClasses = {
    left: isVisible ? 'translate-x-0' : '-translate-x-full',
    right: isVisible ? 'translate-x-0' : 'translate-x-full',
    up: isVisible ? 'translate-y-0' : 'translate-y-full',
    down: isVisible ? 'translate-y-0' : '-translate-y-full'
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-${duration} ${directionClasses[direction]} ${className}`}
    >
      {children}
    </div>
  );
};

// Scale Animation Component
export const ScaleIn = ({ 
  children, 
  duration = 300,
  delay = 0,
  fromScale = 0.8,
  className = ''
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const scaleClass = isVisible ? 'scale-100' : `scale-${Math.round(fromScale * 100)}`;
  const opacityClass = isVisible ? 'opacity-100' : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-${duration} ${scaleClass} ${opacityClass} ${className}`}
    >
      {children}
    </div>
  );
};

// Stagger Animation Component (for lists)
export const StaggerChildren = ({ 
  children, 
  staggerDelay = 100,
  className = ''
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <FadeIn key={index} delay={index * staggerDelay} direction="up">
          {child}
        </FadeIn>
      ))}
    </div>
  );
};

// Hover Animation Component
export const HoverScale = ({ 
  children, 
  scale = 1.05,
  duration = 200,
  className = ''
}) => {
  return (
    <div className={`transition-transform duration-${duration} hover:scale-${Math.round(scale * 100)} ${className}`}>
      {children}
    </div>
  );
};

// Pulse Animation Component
export const Pulse = ({ 
  children, 
  color = 'indigo',
  className = ''
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {children}
    </div>
  );
};

// Bounce Animation Component
export const Bounce = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`animate-bounce ${className}`}>
      {children}
    </div>
  );
};

// Spin Animation Component
export const Spin = ({ 
  children, 
  speed = 'normal',
  className = ''
}) => {
  const speedClasses = {
    slow: 'animate-spin-slow',
    normal: 'animate-spin',
    fast: 'animate-spin-fast'
  };

  return (
    <div className={`${speedClasses[speed] || speedClasses.normal} ${className}`}>
      {children}
    </div>
  );
};

// Floating Animation Component
export const Float = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`animate-float ${className}`}>
      {children}
    </div>
  );
};

// Progressive reveal animation
export const ProgressiveReveal = ({ 
  children, 
  delay = 200,
  className = ''
}) => {
  const [revealedCount, setRevealedCount] = React.useState(0);
  const childrenArray = React.Children.toArray(children);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setRevealedCount(prev => {
        if (prev < childrenArray.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, delay);

    return () => clearInterval(timer);
  }, [childrenArray.length, delay]);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ${
            index < revealedCount 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Animation wrapper with multiple effects
export const AnimatedWrapper = ({ 
  children,
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  direction = 'up',
  scale = 0.8,
  className = '',
  ...props
}) => {
  const animations = {
    fadeIn: FadeIn,
    slideIn: SlideIn,
    scaleIn: ScaleIn
  };

  const AnimationComponent = animations[animation] || FadeIn;

  return (
    <AnimationComponent
      duration={duration}
      delay={delay}
      direction={direction}
      fromScale={scale}
      className={className}
      {...props}
    >
      {children}
    </AnimationComponent>
  );
};

export default {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerChildren,
  HoverScale,
  Pulse,
  Bounce,
  Spin,
  Float,
  ProgressiveReveal,
  AnimatedWrapper
};
