import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Camera, 
  Edit3, 
  MapPin, 
  Calendar,
  BookOpen,
  Palette,
  Code2,
  ArrowRight,
  Focus,
  FileText
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const TeaserCards: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [colorAccent, setColorAccent] = useState('#4F46E5');

  // Typewriter effect for blog teaser
  const blogTitle = "Why I moved logs to ClickHouse";
  useEffect(() => {
    if (hoveredCard === 'blog' && !prefersReducedMotion) {
      let i = 0;
      const timer = setInterval(() => {
        setTypewriterText(blogTitle.slice(0, i));
        i++;
        if (i > blogTitle.length) {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    } else {
      setTypewriterText('');
    }
  }, [hoveredCard, prefersReducedMotion]);

  // Color palette for photos teaser
  const photoColors = [
    '#0b1e3a', '#6ea8c2', '#c8dbe6', '#1a2f1a', 
    '#87b68f', '#cedec9', '#8b4513', '#daa520'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        staggerChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Education Teaser - Timeline Pin */}
          <motion.div variants={cardVariants}>
            <Link
              to="/education"
              className="group block relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onMouseEnter={() => setHoveredCard('education')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Timeline visualization */}
              <div className="relative mb-6">
                <div className="h-1 bg-gradient-to-r from-primary-200 to-success-200 dark:from-primary-800 dark:to-success-800 rounded-full">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: hoveredCard === 'education' ? "100%" : "60%" }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, ease: "easeOut" }}
                  />
                </div>
                
                {/* Timeline dots */}
                <div className="absolute inset-0 flex justify-between items-center">
                  {[2015, 2019, 2022].map((year, index) => (
                    <motion.div
                      key={year}
                      className="relative"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.2 }}
                    >
                      <div className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white dark:border-neutral-800 shadow-sm" />
                      <AnimatePresence>
                        {hoveredCard === 'education' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -8, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2, delay: index * 0.1 }}
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
                          >
                            <div className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-2 py-1 rounded whitespace-nowrap">
                              {year}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    Education
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    Systems-heavy coursework, capstones, and proof-of-work projects
                  </p>
                  <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium">
                    <span>Explore timeline</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Photos Teaser - Color Swatch Strip */}
          <motion.div variants={cardVariants}>
            <Link
              to="/photos"
              className="group block relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onMouseEnter={() => setHoveredCard('photos')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Color swatch strip */}
              <div className="mb-6">
                <div className="flex gap-1 mb-4">
                  {photoColors.map((color, index) => (
                    <motion.div
                      key={index}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-200 dark:border-neutral-700"
                      style={{ backgroundColor: color }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
                      onHoverStart={() => setColorAccent(color)}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </div>
                
                {/* Viewfinder frame */}
                <div className="relative w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-4 border-2 border-dashed border-neutral-400 dark:border-neutral-500 rounded">
                    <AnimatePresence>
                      {hoveredCard === 'photos' && (
                        <>
                          {/* Focus brackets */}
                          {[
                            { top: '10px', left: '10px', rotate: '0deg' },
                            { top: '10px', right: '10px', rotate: '90deg' },
                            { bottom: '10px', right: '10px', rotate: '180deg' },
                            { bottom: '10px', left: '10px', rotate: '270deg' }
                          ].map((pos, index) => (
                            <motion.div
                              key={index}
                              className="absolute w-4 h-4 border-l-2 border-t-2 border-white"
                              style={{ 
                                ...pos,
                                transform: `rotate(${pos.rotate})`,
                                borderColor: colorAccent
                              }}
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.5 }}
                              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, delay: index * 0.1 }}
                            />
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Camera icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        scale: hoveredCard === 'photos' ? 1.1 : 1,
                        rotate: hoveredCard === 'photos' ? 5 : 0
                      }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                    >
                      <Focus className="w-8 h-8 text-neutral-500 dark:text-neutral-400" style={{ color: colorAccent }} />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-success-100 dark:bg-success-900/50 rounded-xl group-hover:bg-success-200 dark:group-hover:bg-success-800/50 transition-colors">
                  <Camera className="w-6 h-6 text-success-600 dark:text-success-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-success-600 dark:group-hover:text-success-400 transition-colors">
                    Photos
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    Photos I shoot on my phone — color-sorted, map-aware gallery
                  </p>
                  <div className="flex items-center gap-2 text-success-600 dark:text-success-400 text-sm font-medium">
                    <span>Browse gallery</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Blog Teaser - Typewriter */}
          <motion.div variants={cardVariants}>
            <Link
              to="/blog"
              className="group block relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card hover:shadow-card-hover border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onMouseEnter={() => setHoveredCard('blog')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Typewriter effect */}
              <div className="mb-6">
                <div className="bg-neutral-900 dark:bg-neutral-100 rounded-lg p-4 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-500 dark:text-neutral-600 text-xs ml-2">blog.md</span>
                  </div>
                  <div className="text-green-400 dark:text-green-600">
                    <span className="text-neutral-500 dark:text-neutral-600">+ </span>
                    {hoveredCard === 'blog' ? typewriterText : "Why I moved logs to ClickHouse"}
                    <motion.span
                      animate={{ opacity: hoveredCard === 'blog' ? [1, 0, 1] : 1 }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-white dark:text-neutral-900"
                    >
                      |
                    </motion.span>
                  </div>
                  <div className="text-red-400 dark:text-red-600 mt-1">
                    <span className="text-neutral-500 dark:text-neutral-600">- </span>
                    ELK stack performance issues
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {['#SpringBoot', '#ClickHouse', '#Performance'].map((tag, index) => (
                    <motion.span
                      key={tag}
                      className="px-2 py-1 bg-warning-100 dark:bg-warning-900/50 text-warning-700 dark:text-warning-300 text-xs rounded-full"
                      animate={{ 
                        y: hoveredCard === 'blog' ? [0, -2, 0] : 0 
                      }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.6, 
                        delay: index * 0.1,
                        repeat: hoveredCard === 'blog' ? Infinity : 0,
                        repeatDelay: 2
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-warning-100 dark:bg-warning-900/50 rounded-xl group-hover:bg-warning-200 dark:group-hover:bg-warning-800/50 transition-colors">
                  <Edit3 className="w-6 h-6 text-warning-600 dark:text-warning-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-warning-600 dark:group-hover:text-warning-400 transition-colors">
                    Writing
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                    Short, practical posts on backend, performance, and data
                  </p>
                  <div className="flex items-center gap-2 text-warning-600 dark:text-warning-400 text-sm font-medium">
                    <span>Read articles</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeaserCards;
