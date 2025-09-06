import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { resumeData } from '@/data/resume';

// Lazy load non-critical components for better performance
const About = React.lazy(() => import('@/components/About'));
const Experience = React.lazy(() => import('@/components/Experience'));
const Projects = React.lazy(() => import('@/components/Projects'));
const Skills = React.lazy(() => import('@/components/Skills'));
const Contact = React.lazy(() => import('@/components/Contact'));

// Import the new sections as components (not pages)
const EducationSection = React.lazy(() => import('@/components/EducationSection'));
const PhotosSection = React.lazy(() => import('@/components/PhotosSection'));
const BlogSection = React.lazy(() => import('@/components/BlogSection'));

// Loading component for lazy sections
const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-24">
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="text-neutral-600 dark:text-neutral-400 text-sm"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        Loading section...
      </motion.p>
    </div>
  </div>
);

function App() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  
  // Initialize performance monitoring
  usePerformanceMonitoring();

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
      <Header 
        theme={theme}
        resolvedTheme={resolvedTheme}
        onToggleTheme={toggleTheme}
      />

      <main id="main-content" role="main">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <Hero personalInfo={resumeData.personalInfo} />
        </motion.div>

        {/* About Section */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <About personalInfo={resumeData.personalInfo} />
          </motion.div>
        </Suspense>

        {/* Education Section - NEW */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <EducationSection />
          </motion.div>
        </Suspense>

        {/* Experience Section */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <Experience experiences={resumeData.experience} />
          </motion.div>
        </Suspense>

        {/* Projects Section */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <Projects projects={resumeData.projects} />
          </motion.div>
        </Suspense>

        {/* Skills Section */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <Skills skills={resumeData.skills} />
          </motion.div>
        </Suspense>

        {/* Photos Section - NEW (Coming Soon) */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <PhotosSection />
          </motion.div>
        </Suspense>

        {/* Blog Section - NEW (Coming Soon) */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <BlogSection />
          </motion.div>
        </Suspense>

        {/* Contact Section */}
        <Suspense fallback={<SectionLoader />}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInVariants}
          >
            <Contact />
          </motion.div>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;