import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, TrendingUp } from 'lucide-react';
import { Project } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'backend', label: 'Backend Systems' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  // Project metrics and demo notes
  const getProjectMetrics = (projectId: string) => {
    const metricsMap: Record<string, { metric: string; value: string }> = {
      'e-commerce-platform': { metric: '↓ Load time', value: '40%' },
      'ai-chatbot': { metric: '↑ Accuracy', value: '95%' },
      'task-manager': { metric: '↓ Queries', value: '60%' },
      'weather-app': { metric: '↑ Performance', value: '3x' },
      'blog-platform': { metric: '↓ Bundle size', value: '50%' },
    };
    return metricsMap[projectId] || { metric: '↑ Performance', value: '2x' };
  };

  const getDemoNotes = (projectId: string) => {
    const notesMap: Record<string, string> = {
      'e-commerce-platform': 'Try adding items to cart',
      'ai-chatbot': 'Ask about weather or news',
      'task-manager': 'Create and organize tasks',
      'weather-app': 'Search any city worldwide',
      'blog-platform': 'Browse articles and comments',
    };
    return notesMap[projectId] || 'Click to explore features';
  };

  // Generate cover thumbnail gradient
  const getCoverGradient = (index: number) => {
    const gradients = [
      'from-primary-600 via-accent-600 to-innovation-600',
      'from-accent-600 via-innovation-600 to-primary-600',
      'from-innovation-600 via-primary-600 to-accent-600',
      'from-primary-600 via-accent-600 to-emerald-600',
      'from-accent-600 via-emerald-600 to-primary-600',
    ];
    return gradients[index % gradients.length];
  };

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
      id="projects" 
      className="py-24 md:py-32 bg-neutral-50/50 dark:bg-neutral-900/50 scroll-mt-28"
      aria-labelledby="projects-heading"
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
              id="projects-heading"
              className="text-h2 font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-pill" />
            <p className="text-body text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
              Showcasing scalable solutions with measurable impact and modern technology stacks
            </p>
          </motion.div>

          {/* Enhanced Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-pill font-medium transition-all duration-240 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white shadow-card border-transparent'
                    : 'bg-white/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 border border-neutral-200/70 dark:border-neutral-700/60'
                }`}
                aria-pressed={selectedCategory === category.id}
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => {
                const metrics = getProjectMetrics(project.id);
                const demoNotes = getDemoNotes(project.id);
                const isHovered = hoveredProject === project.id;
                
                return (
                  <motion.article
                    key={project.id}
                    variants={itemVariants}
                    layout
                    className="bg-white/80 dark:bg-neutral-800/60 backdrop-blur-sm rounded-card-lg overflow-hidden shadow-card dark:shadow-card-dark border border-neutral-200/50 dark:border-neutral-700/50 group"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={prefersReducedMotion ? {} : { 
                      y: -8, 
                      scale: 1.02,
                      rotateY: 2,
                      rotateX: 1,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  >
                    {/* Enhanced Cover Thumbnail */}
                    <div className={`h-48 bg-gradient-to-br ${getCoverGradient(index)} relative overflow-hidden`}>
                      {/* Subtle grid pattern */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                          `,
                          backgroundSize: '20px 20px'
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50 transition-all duration-320 ease-hover" />
                      
                      {/* Project Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="w-20 h-20 bg-white/20 dark:bg-white/10 rounded-card flex items-center justify-center backdrop-blur-sm border border-white/30"
                          animate={isHovered && !prefersReducedMotion ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-3xl font-bold text-white font-display">
                            {project.name.charAt(0)}
                          </span>
                        </motion.div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-pill text-2xs font-medium backdrop-blur-sm ${
                          project.status === 'completed' 
                            ? 'bg-success-100/90 text-success-800 dark:bg-success-900/90 dark:text-success-200'
                            : project.status === 'in-progress'
                            ? 'bg-warning-100/90 text-warning-800 dark:bg-warning-900/90 dark:text-warning-200'
                            : 'bg-info-100/90 text-info-800 dark:bg-info-900/90 dark:text-info-200'
                        }`}>
                          {project.status === 'in-progress' ? 'In Progress' : project.status}
                        </span>
                      </div>

                      {/* Hover Buttons */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                            className="absolute top-4 left-4 flex gap-2"
                          >
                            {project.demoUrl && (
                              <motion.a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-card backdrop-blur-sm transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                                aria-label={`View live demo of ${project.name}`}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-card backdrop-blur-sm transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-white/50"
                                whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                                aria-label={`View source code of ${project.name} on GitHub`}
                              >
                                <Github className="w-4 h-4" />
                              </motion.a>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bottom Metric */}
                      <div className="absolute bottom-4 right-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/20 dark:bg-black/20 rounded-pill backdrop-blur-sm">
                          <TrendingUp className="w-3 h-3 text-white" />
                          <span className="text-white text-2xs font-medium">
                            {metrics.metric} {metrics.value}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Project Title */}
                      <h3 className="text-h3 font-display font-bold text-neutral-800 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-240 ease-hover">
                        {project.name}
                      </h3>

                      {/* Project Description */}
                      <p className="text-neutral-600 dark:text-neutral-300 mb-4 leading-relaxed text-body">
                        {project.description}
                      </p>

                      {/* Demo Notes - NEW */}
                      <div className="flex items-center gap-2 mb-4 p-3 bg-primary-50/50 dark:bg-primary-900/20 rounded-card border border-primary-200/30 dark:border-primary-700/30">
                        <Play className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <span className="text-small text-primary-700 dark:text-primary-300 font-medium">
                          {demoNotes}
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-100 rounded-pill text-2xs font-medium border border-neutral-200/50 dark:border-neutral-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 text-neutral-500 dark:text-neutral-400 text-2xs font-medium">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Project Links - Enhanced */}
                      <div className="flex gap-3">
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-card font-medium transition-all duration-240 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 shadow-card hover:shadow-card-hover"
                            aria-label={`View live demo of ${project.name}`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            Demo
                          </motion.a>
                        )}
                        
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-neutral-300/70 dark:border-neutral-600/70 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-card font-medium transition-all duration-240 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2"
                            aria-label={`View source code of ${project.name} on GitHub`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" aria-hidden="true" />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-500 dark:text-neutral-400 text-body-lg">
                No projects found in this category.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
