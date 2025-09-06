import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsVisible(true);
          setHasTriggered(true);
        } else if (!triggerOnce && !isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isVisible,
    hasTriggered
  };
};

// Variants for common scroll animations
export const scrollAnimationVariants = {
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 30,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  },
  fadeInLeft: {
    hidden: { 
      opacity: 0, 
      x: -30,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  },
  fadeInRight: {
    hidden: { 
      opacity: 0, 
      x: 30,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  },
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.3 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  }
};

export default useScrollAnimation;
