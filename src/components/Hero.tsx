import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Download } from 'lucide-react';
import { PersonalInfo } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Avatar } from './Avatar';
// import { ImageDebug } from './ImageDebug';

interface HeroProps {
  personalInfo: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ personalInfo }) => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        staggerChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }
    }
  };

  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ 
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden scroll-mt-28"
      aria-label="Hero section"
    >
      {/* Hero Ambient Background */}
      <div 
        className="absolute inset-0 -top-1/5 -left-1/10 -right-1/10 h-[60vh] z-0 opacity-60"
        style={{
          background: `
            radial-gradient(64rem 32rem at 50% 10%, rgba(20,184,166,.12), transparent 60%),
            conic-gradient(from var(--tw-rotate, 0deg), rgba(34,211,238,.12), rgba(16,185,129,.12), rgba(34,211,238,.12))
          `,
          filter: 'blur(24px) saturate(1.1)',
          animation: prefersReducedMotion ? 'none' : 'rotate-slow 55s linear infinite',
        }}
        aria-hidden="true"
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 bg-noise opacity-25 mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Animated background blobs with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/30 dark:bg-primary-800/30 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200/30 dark:bg-accent-800/30 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : {
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Professional Avatar */}
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <motion.div
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar 
                name={personalInfo.name}
                size="lg"
                showStatus={true}
                src="/anshullkgarg/images/avatar-optimized.jpg"
              />
            </motion.div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-neutral-600 dark:text-neutral-400 mb-4 font-medium"
          >
            Hello, I'm
          </motion.p>

          {/* Name with shimmer effect */}
          <motion.h1
            variants={itemVariants}
            className="text-display font-display font-bold mb-6 relative"
            style={{
              background: 'linear-gradient(90deg, #0f172a, #06b6d4, #10b981, #0f172a)',
              backgroundSize: '300% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: prefersReducedMotion ? 'none' : 'name-shimmer 15s ease-in-out infinite',
            }}
          >
            {personalInfo.name}
          </motion.h1>

          {/* One-line description */}
          <motion.h2
            variants={itemVariants}
            className="text-h2-lg font-body font-medium text-neutral-700 dark:text-neutral-300 mb-12 max-w-4xl mx-auto"
          >
            {personalInfo.title}
          </motion.h2>

          {/* Skills chips with proper contrast */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="px-3 py-2 bg-primary-50 text-primary-700 rounded-lg text-sm font-semibold border border-primary-200/50">
              Performance
            </span>
            <span className="px-3 py-2 bg-success-50 text-success-700 rounded-lg text-sm font-semibold border border-success-200/50">
              Data Pipelines
            </span>
            <span className="px-3 py-2 bg-warning-50 text-warning-700 rounded-lg text-sm font-semibold border border-warning-200/50">
              Migrations
            </span>
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="text-body text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {personalInfo.summary}
          </motion.p>

          {/* Social proof mini-stats - new addition */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-12 text-small text-neutral-500 dark:text-neutral-400"
          >
            <span>3 yrs exp</span>
            <span>•</span>
            <span>26 tech</span>
            <span>•</span>
            <span>7 expert areas</span>
          </motion.div>

          {/* CTA Buttons - Enhanced with 3rd CTA */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-2 sm:px-0"
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ 
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start'
                });
              }}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-card font-semibold transition-all duration-240 ease-hover hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-card hover:shadow-card-hover w-full sm:w-auto"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              Get In Touch
            </motion.a>
            
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ 
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start'
                });
              }}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-neutral-900 px-6 sm:px-8 py-3 sm:py-4 rounded-card font-semibold transition-all duration-240 ease-hover hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full sm:w-auto"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <ExternalLink className="w-5 h-5" aria-hidden="true" />
              View My Work
            </motion.a>

            {/* 3rd CTA - Download Resume */}
            <motion.a
              href="/resume.pdf"
              download="Anshul_Garg_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 px-6 sm:px-8 py-3 sm:py-4 rounded-card font-semibold transition-all duration-240 ease-hover hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 w-full sm:w-auto"
              whileHover={prefersReducedMotion ? {} : { y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            >
              <Download className="w-5 h-5" aria-hidden="true" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Social Links - 40px ghost buttons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 mb-16"
            role="list"
            aria-label="Social media links"
          >
            {personalInfo.github && (
              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 flex items-center justify-center"
                aria-label="Visit my GitHub profile"
                role="listitem"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Github className="w-5 h-5" aria-hidden="true" />
              </motion.a>
            )}
            
            {personalInfo.linkedin && (
              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 flex items-center justify-center"
                aria-label="Visit my LinkedIn profile"
                role="listitem"
                whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </motion.a>
            )}
            
            <motion.a
              href={`mailto:${personalInfo.email}`}
              className="w-10 h-10 rounded-full bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 flex items-center justify-center"
              aria-label="Send me an email"
              role="listitem"
              whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.button
            variants={itemVariants}
            onClick={scrollToNext}
            className="inline-flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg p-2"
            aria-label="Scroll to about section"
            animate={prefersReducedMotion ? {} : {
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm font-medium">Scroll down</span>
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Temporary Debug Component */}
      {/* <ImageDebug src={`${import.meta.env.BASE_URL}images/avatar-optimized.jpg`} name="Avatar Optimized" /> */}
    </section>
  );
};

export default Hero;
