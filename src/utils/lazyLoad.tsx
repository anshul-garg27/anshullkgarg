import React, { Suspense, ComponentType } from 'react';
import { motion } from 'framer-motion';

// Loading component for lazy-loaded sections
const SectionLoader: React.FC<{ height?: string }> = ({ height = '400px' }) => (
  <div 
    className="flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 rounded-lg"
    style={{ height }}
  >
    <div className="flex flex-col items-center gap-4">
      {/* Animated loading spinner */}
      <motion.div
        className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Loading text */}
      <motion.p
        className="text-neutral-600 dark:text-neutral-400 text-sm"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading section...
      </motion.p>
      
      {/* Skeleton content */}
      <div className="w-full max-w-md space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse w-1/2" />
      </div>
    </div>
  </div>
);

// Error boundary for lazy-loaded components
class LazyLoadErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 bg-semantic-error-50 dark:bg-semantic-error-900/20 rounded-lg border border-semantic-error-200 dark:border-semantic-error-800">
          <div className="text-center">
            <div className="text-semantic-error-600 dark:text-semantic-error-400 mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-semantic-error-800 dark:text-semantic-error-200 font-medium">
              Failed to load section
            </p>
            <p className="text-semantic-error-600 dark:text-semantic-error-400 text-sm mt-1">
              Please refresh the page to try again
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with performance optimization
export const withLazyLoading = <P extends object>(
  Component: ComponentType<P>,
  loaderHeight?: string,
  fallback?: React.ReactNode
) => {
  const LazyComponent = React.forwardRef<any, P>((props, ref) => (
    <LazyLoadErrorBoundary fallback={fallback}>
      <Suspense fallback={<SectionLoader height={loaderHeight} />}>
        <Component {...(props as P)} ref={ref} />
      </Suspense>
    </LazyLoadErrorBoundary>
  ));

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return LazyComponent;
};

// Utility for creating lazy-loaded route components
export const createLazyComponent = <P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  loaderHeight?: string,
  fallback?: React.ReactNode
) => {
  const LazyComponent = React.lazy(importFn);
  return withLazyLoading(LazyComponent, loaderHeight, fallback);
};

// Preload utility for better UX
export const preloadComponent = (importFn: () => Promise<any>) => {
  // Preload on hover or focus
  const preload = () => {
    importFn().catch(err => console.warn('Preload failed:', err));
  };

  return { preload };
};

// Intersection observer hook for lazy loading sections
export const useLazySection = (threshold = 0.1, rootMargin = '50px') => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

export default SectionLoader;
