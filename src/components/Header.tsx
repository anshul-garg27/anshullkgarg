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
  const prefersReducedMotion = useReducedMotion();

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-5 h-5" aria-hidden="true" />;
      case 'dark': return <Moon className="w-5 h-5" aria-hidden="true" />;
      case 'system': return <Monitor className="w-5 h-5" aria-hidden="true" />;
      default: return <Sun className="w-5 h-5" aria-hidden="true" />;
    }
  };

  const headerVariants = {
    initial: { y: -100 },
    animate: { 
      y: 0,
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
        className="max-w-7xl mx-auto container-padding py-4"
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
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-3 py-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.1 + index * 0.1, 
                    duration: prefersReducedMotion ? 0.01 : 0.3 
                  }
                }}
              >
                {item.label}
              </motion.a>
            ))}
            
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Current theme: ${theme}. Click to change theme.`}
            >
              {getThemeIcon()}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden mt-4 py-4 px-4 glass-effect rounded-lg shadow-lg"
              role="menu"
            >
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 font-medium px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
