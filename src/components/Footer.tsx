import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  };

  const socialLinks = [
    {
      href: 'https://github.com/anshul-garg27',
      icon: Github,
      label: 'GitHub'
    },
    {
      href: 'https://linkedin.com/in/anshullkgarg',
      icon: Linkedin,
      label: 'LinkedIn'
    },
    {
      href: 'mailto:anshulgarg.garg509@gmail.com',
      icon: Mail,
      label: 'Email'
    }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 no-print">
      <div className="max-w-6xl mx-auto container-padding py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left: Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Anshul</h3>
            <p className="text-slate-400">
              Full-Stack Developer & AI Enthusiast
            </p>
          </div>

          {/* Center: Social Links */}
          <div className="flex justify-center">
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={link.label}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Right: Back to top */}
          <div className="flex justify-end">
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Back to top"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">Back to top</span>
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>© {new Date().getFullYear()} Anshul. Made with</span>
              <motion.div
                animate={prefersReducedMotion ? {} : {
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" aria-hidden="true" />
              </motion.div>
              <span>and lots of coffee.</span>
            </div>

            {/* Tech Stack */}
            <div className="text-slate-400 text-sm">
              <span>Built with React, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
