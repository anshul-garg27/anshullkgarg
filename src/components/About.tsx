import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, Download, Github, Linkedin, Twitter } from 'lucide-react';
import { PersonalInfo } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ProfessionalAvatar } from './Avatar';

interface AboutProps {
  personalInfo: PersonalInfo;
}

const About: React.FC<AboutProps> = ({ personalInfo }) => {
  const prefersReducedMotion = useReducedMotion();
  const [showContactModal, setShowContactModal] = useState(false);

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

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/anshullkgarg', color: 'hover:text-gray-900 dark:hover:text-white' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/in/anshullkgarg', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/anshullkgarg', color: 'hover:text-blue-400' },
  ];

  return (
    <section 
      id="about" 
      className="py-16 md:py-20 bg-neutral-50/50 dark:bg-neutral-900/50 scroll-mt-28"
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
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 
              id="about-heading"
              className="text-h1 md:text-h1-lg font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-success-500 mx-auto rounded-full" />
          </motion.div>

          {/* Profile Card */}
          <motion.div 
            variants={itemVariants} 
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 md:p-8 shadow-card border border-neutral-200/50 dark:border-neutral-700/50">
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Avatar & Quick Info */}
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <ProfessionalAvatar 
                      name={personalInfo.name}
                      title="Backend Engineer"
                      size="lg"
                      src="/anshullkgarg/images/avatar-optimized.jpg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-neutral-800 flex items-center justify-center">
                      <span className="text-white text-xs">✨</span>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center gap-3 mb-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-600 dark:text-neutral-400 ${social.color} transition-all duration-300 hover:scale-110`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => setShowContactModal(true)}
                      className="w-full bg-gradient-to-r from-primary-600 to-warning-600 hover:from-primary-700 hover:to-warning-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Mail className="w-3 h-3 inline mr-1" />
                      Get in Touch
                    </motion.button>
                    
                    <motion.button
                      className="w-full bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        console.log('Download resume clicked');
                      }}
                    >
                      <Download className="w-3 h-3 inline mr-1" />
                      Download Resume
                    </motion.button>
                  </div>
                </div>

                {/* About Text */}
                <div className="lg:col-span-2">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                      Background & Experience
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                      <strong>M.Tech in Computer Science</strong> from IIIT Bangalore and <strong>B.Tech from SKIT Jaipur</strong>. 
                      Specialized in distributed systems, microservices architecture, and high-performance backend development.
                    </p>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
                      Led critical <strong>zero-downtime migrations</strong> at Walmart, architected systems processing 
                      <strong>10M+ events daily</strong>, and improved system performance by <strong>25-50%</strong> across multiple projects.
                    </p>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      <strong>Core expertise:</strong> Java, Golang, Python, PostgreSQL, Kubernetes, Kafka, ClickHouse. 
                      Active in <strong>open-source</strong> contributions and <strong>technical mentoring</strong>.
                    </p>
                  </div>

                  {/* Professional Metrics */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">50%</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">Performance Gain</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600 dark:text-green-400">Zero</div>
                      <div className="text-xs text-green-700 dark:text-green-300 font-medium">Downtime</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                      <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">Mentees</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
                Professional Contact
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                  <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Business Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-neutral-700 dark:text-neutral-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Based in</p>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl">
                  <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Availability</p>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">
                      Open to opportunities
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-4 py-3 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
                >
                  Close
                </button>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-warning-600 text-white rounded-xl font-medium text-center hover:from-primary-700 hover:to-warning-700 transition-colors"
                >
                  Send Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;