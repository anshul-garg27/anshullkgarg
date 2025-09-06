import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
}

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only run in production (skip in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return;

    const metrics: PerformanceMetrics = {};

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            metrics.lcp = lastEntry.startTime;
            
            // Log if LCP is poor (> 2.5s)
            if (metrics.lcp && metrics.lcp > 2500) {
              console.warn(`Poor LCP: ${metrics.lcp}ms`);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              metrics.fid = entry.processingStart - entry.startTime;
              
              // Log if FID is poor (> 100ms)
              if (metrics.fid > 100) {
                console.warn(`Poor FID: ${metrics.fid}ms`);
              }
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });

          // Cumulative Layout Shift (CLS)
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            metrics.cls = clsValue;
            
            // Log if CLS is poor (> 0.1)
            if (metrics.cls > 0.1) {
              console.warn(`Poor CLS: ${metrics.cls}`);
            }
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime;
                
                // Log if FCP is poor (> 1.8s)
                if (metrics.fcp && metrics.fcp > 1800) {
                  console.warn(`Poor FCP: ${metrics.fcp}ms`);
                }
              }
            });
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

        } catch (error) {
          console.warn('Performance monitoring failed:', error);
        }
      }

      // Time to First Byte (TTFB)
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0];
          metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
          
          // Log if TTFB is poor (> 600ms)
          if (metrics.ttfb > 600) {
            console.warn(`Poor TTFB: ${metrics.ttfb}ms`);
          }
        }
      }
    };

    // Measure resource loading performance
    const measureResourcePerformance = () => {
      if ('performance' in window) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        // Analyze font loading
        const fontResources = resources.filter(resource => 
          resource.name.includes('fonts.googleapis.com') || 
          resource.name.includes('fonts.gstatic.com')
        );
        
        fontResources.forEach(font => {
          const loadTime = font.responseEnd - font.requestStart;
          if (loadTime > 1000) {
            console.warn(`Slow font loading: ${font.name} took ${loadTime}ms`);
          }
        });

        // Analyze JavaScript bundle sizes
        const jsResources = resources.filter(resource => 
          resource.name.includes('.js') && !resource.name.includes('node_modules')
        );
        
        jsResources.forEach(js => {
          const loadTime = js.responseEnd - js.requestStart;
          if (loadTime > 500) {
            console.warn(`Slow JS loading: ${js.name} took ${loadTime}ms`);
          }
        });
      }
    };

    // Report performance metrics
    const reportMetrics = () => {
      // In a real app, you would send these to your analytics service
      console.group('Performance Metrics');
      console.log('LCP (Largest Contentful Paint):', metrics.lcp ? `${metrics.lcp}ms` : 'Not measured');
      console.log('FID (First Input Delay):', metrics.fid ? `${metrics.fid}ms` : 'Not measured');
      console.log('CLS (Cumulative Layout Shift):', metrics.cls ? metrics.cls.toFixed(3) : 'Not measured');
      console.log('FCP (First Contentful Paint):', metrics.fcp ? `${metrics.fcp}ms` : 'Not measured');
      console.log('TTFB (Time to First Byte):', metrics.ttfb ? `${metrics.ttfb}ms` : 'Not measured');
      console.groupEnd();
    };

    // Initialize performance monitoring
    measureWebVitals();
    
    // Measure resources after page load
    if (document.readyState === 'complete') {
      measureResourcePerformance();
    } else {
      window.addEventListener('load', measureResourcePerformance);
    }

    // Report metrics after 5 seconds
    const reportTimer = setTimeout(reportMetrics, 5000);

    // Cleanup
    return () => {
      clearTimeout(reportTimer);
      window.removeEventListener('load', measureResourcePerformance);
    };
  }, []);

  // Performance optimization utilities
  const preloadResource = (href: string, as: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  };

  const prefetchResource = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  };

  return {
    preloadResource,
    prefetchResource
  };
};
