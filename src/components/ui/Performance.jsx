import React from 'react';

// Lazy Loading Component
export const LazyImage = ({ 
  src, 
  alt, 
  placeholder = null,
  className = '',
  ...props 
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const imgRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {placeholder && !loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          {placeholder}
        </div>
      )}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

// Virtual List Component for large datasets
export const VirtualList = ({ 
  items, 
  itemHeight, 
  containerHeight,
  renderItem,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const containerRef = React.useRef();

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => 
            renderItem(item, visibleStart + index)
          )}
        </div>
      </div>
    </div>
  );
};

// Debounced Input Component
export const DebouncedInput = ({ 
  value, 
  onChange, 
  delay = 300,
  ...props 
}) => {
  const [localValue, setLocalValue] = React.useState(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, delay, onChange]);

  return (
    <input
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      {...props}
    />
  );
};

// Memoized component wrapper
export const Memo = React.memo;

// Code Splitting Component
export const LazyLoad = (importFunc) => {
  return React.lazy(importFunc);
};

// Error Boundary Component
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || 
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            An error occurred while rendering this component.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance Monitor Hook
export const usePerformance = (name) => {
  React.useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`${name} render time: ${duration.toFixed(2)}ms`);
    };
  });
};

// Bundle Size Optimizer Component
export const ConditionalRender = ({ 
  condition, 
  children, 
  fallback = null 
}) => {
  return condition ? children : fallback;
};

// Image Preloader Hook
export const useImagePreloader = (imageSrcs) => {
  const [loadedImages, setLoadedImages] = React.useState({});

  React.useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = imageSrcs.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [src]: true }));
            resolve();
          };
          img.onerror = resolve;
          img.src = src;
        });
      });

      await Promise.all(loadPromises);
    };

    if (imageSrcs.length > 0) {
      preloadImages();
    }
  }, [imageSrcs]);

  return loadedImages;
};

// Memory Usage Monitor
export const useMemoryUsage = () => {
  const [memoryInfo, setMemoryInfo] = React.useState(null);

  React.useEffect(() => {
    const updateMemoryInfo = () => {
      if ('memory' in performance) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        });
      }
    };

    updateMemoryInfo();
    const interval = setInterval(updateMemoryInfo, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

// Resource Preloader Component
export const ResourcePreloader = ({ resources = [] }) => {
  React.useEffect(() => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as || 'fetch';
      if (resource.type) link.type = resource.type;
      document.head.appendChild(link);
    });
  }, [resources]);

  return null;
};

// Intersection Observer Hook
export const useIntersectionObserver = (
  elementRef,
  options = { threshold: 0.1 }
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
};

// Optimized List Component
export const OptimizedList = ({ 
  items, 
  keyExtractor,
  renderItem,
  windowSize = 10,
  className = ''
}) => {
  const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: windowSize });
  const containerRef = React.useRef();

  const handleScroll = React.useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const itemHeight = container.scrollHeight / items.length;
    const containerHeight = container.clientHeight;

    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + windowSize,
      items.length
    );

    setVisibleRange({ start, end });
  }, [items.length, windowSize]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const visibleItems = items.slice(visibleRange.start, visibleRange.end);

  return (
    <div 
      ref={containerRef}
      className={`overflow-auto ${className}`}
    >
      {visibleItems.map((item, index) => 
        renderItem(item, visibleRange.start + index, keyExtractor(item))
      )}
    </div>
  );
};

export default {
  LazyImage,
  VirtualList,
  DebouncedInput,
  Memo,
  LazyLoad,
  ErrorBoundary,
  usePerformance,
  ConditionalRender,
  useImagePreloader,
  useMemoryUsage,
  ResourcePreloader,
  useIntersectionObserver,
  OptimizedList
};
