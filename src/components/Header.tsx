import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Theme } from '@/hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const prefersReducedMotion = useReducedMotion();

  const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#education', label: 'Education', id: 'education' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#skills', label: 'Skills', id: 'skills' },
    { href: '#photos', label: 'Photos', id: 'photos' },
    { href: '#blog', label: 'Blog', id: 'blog' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
    
    setIsMenuOpen(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" aria-hidden="true" />;
      case 'dark':
        return <Moon className="w-5 h-5" aria-hidden="true" />;
      case 'system':
        return <Monitor className="w-5 h-5" aria-hidden="true" />;
      default:
        return <Sun className="w-5 h-5" aria-hidden="true" />;
    }
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.2 }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-effect shadow-lg backdrop-blur-md' 
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav 
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.1, duration: prefersReducedMotion ? 0.01 : 0.3 }
            }}
          >
            <a 
              href="#"
              className="text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Anshul's portfolio homepage"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ 
                  top: 0, 
                  behavior: prefersReducedMotion ? 'auto' : 'smooth' 
                });
              }}
            >
              Anshul
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 hover:scale-105 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-sm'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 hover:shadow-md'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.1 + index * 0.1, 
                      duration: prefersReducedMotion ? 0.01 : 0.3 
                    }
                  }}
                  whileHover={prefersReducedMotion ? {} : { 
                    y: -2,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  whileTap={prefersReducedMotion ? {} : { 
                    scale: 0.95,
                    transition: { duration: 0.1 }
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary-600 dark:bg-primary-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      style={{ x: '-50%' }}
                    />
                  )}
                </motion.a>
              );
            })}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Current theme: ${theme}. Click to change theme.`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.6, duration: prefersReducedMotion ? 0.01 : 0.3 }
              }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
              {getThemeIcon()}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Current theme: ${theme}. Click to change theme.`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.4, duration: prefersReducedMotion ? 0.01 : 0.3 }
              }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
              {getThemeIcon()}
            </motion.button>

            {/* Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.5, duration: prefersReducedMotion ? 0.01 : 0.3 }
              }}
              whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: prefersReducedMotion ? 1 : 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                  >
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
            >
              <div className="py-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`block px-6 py-3 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 ${
                        isActive
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { 
                          delay: index * 0.05, 
                          duration: prefersReducedMotion ? 0.01 : 0.2 
                        }
                      }}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;