import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';
import { PersonalInfo } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ProfessionalAvatar } from './Avatar';

interface AboutProps {
  personalInfo: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personalInfo }) => {
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: "easeOut" }
    }
  };

  return (
    <section 
      id="about" 
      className="py-24 md:py-32 bg-neutral-50/50 dark:bg-neutral-900/50 scroll-mt-28"
      aria-labelledby="about-heading"
    >
      <div className="max-w-content mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 
              id="about-heading"
              className="text-h1 md:text-h1-lg font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-success-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* About Text */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-neutral-600 dark:text-neutral-300 text-lg font-body mb-6">
                  {personalInfo.summary}
                </p>
                
                <p className="text-neutral-600 dark:text-neutral-300 text-base font-body mb-6">
                  I'm passionate about creating digital experiences that are not only beautiful and functional, 
                  but also accessible and inclusive. My approach combines technical expertise with design thinking 
                  to solve complex problems and deliver exceptional user experiences.
                </p>
                
                <p className="text-neutral-600 dark:text-neutral-300 text-base font-body">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing knowledge through technical writing and mentoring.
                </p>
              </div>
            </motion.div>

            {/* Professional Photo & Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Professional Headshot */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-card border border-neutral-200/50 dark:border-neutral-700/50">
                <ProfessionalAvatar 
                  name={personalInfo.name}
                  title="Backend Engineer"
                  size="xl"
                  src={`${import.meta.env.BASE_URL || '/'}images/avatar-optimized.jpg`}
                />
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 text-center mt-6">
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">3+</div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">Years Experience</div>
                  </div>
                  <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-success-600 dark:text-success-400">15+</div>
                    <div className="text-xs text-neutral-600 dark:text-neutral-400">Projects Delivered</div>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-2xl p-8 sticky top-8">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Location</p>
                      <p className="text-slate-700 dark:text-slate-300 font-medium">{personalInfo.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                      <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                      <a 
                        href={`mailto:${personalInfo.email}`}
                        className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                      <a 
                        href={`tel:${personalInfo.phone}`}
                        className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                      >
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>

                  {personalInfo.website && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
                        <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Website</p>
                        <a 
                          href={personalInfo.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 dark:text-slate-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
                        >
                          {personalInfo.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Download Resume Button */}
                <motion.button
                  className="w-full mt-8 bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  onClick={() => {
                    // In a real app, this would trigger a PDF download
                    console.log('Download resume clicked');
                  }}
                >
                  Download Resume
                </motion.button>
              </div>
            </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
