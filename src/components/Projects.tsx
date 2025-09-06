import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, AlertCircle, Target, TrendingUp, Code2 } from 'lucide-react';
import { Project } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  // const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'backend', label: 'Backend Systems' },
    { id: 'system', label: 'System Programming' },
  ];

  // Case study data for each project
  const getCaseStudyData = (projectId: string) => {
    const caseStudies: Record<string, {
      problem: string;
      approach: string;
      impact: string;
      architecture: string[];
    }> = {
      'sportease': {
        problem: 'Manual sports equipment management causing delays and resource conflicts in college sports departments',
        approach: 'Built 3-tier web application with automated CI/CD pipeline using Jenkins and Docker containerization',
        impact: 'Reduced equipment booking conflicts by 80% and streamlined event management workflows',
        architecture: ['Web UI', 'Spring Boot API', 'PostgreSQL', 'Docker', 'Jenkins CI/CD']
      },
      'expense-tracker': {
        problem: 'Complex expense splitting and settlement calculations causing disputes among groups',
        approach: 'Developed Django-based platform with automated expense categorization and settlement optimization',
        impact: 'Simplified group expense management for 500+ users with 95% settlement accuracy',
        architecture: ['Django Web App', 'SQLite Database', 'REST API', 'Algorithm Engine']
      },
      'cube-column-store': {
        problem: 'Traditional row-based storage causing slow OLAP query performance on large datasets',
        approach: 'Implemented columnar storage with optimized data structures for analytical workloads',
        impact: '3x faster query performance and 50% reduced storage footprint for OLAP operations',
        architecture: ['Java Core', 'Columnar Storage', 'Query Engine', 'OLAP Interface']
      },
      'banking-management': {
        problem: 'Need for secure, concurrent transaction processing with data consistency guarantees',
        approach: 'Built multi-threaded system using socket programming and file locking mechanisms',
        impact: 'Achieved 100% transaction consistency with support for concurrent operations',
        architecture: ['C Socket Server', 'File System', 'Lock Manager', 'Client Interface']
      },
      'better-reads': {
        problem: 'Book discovery and reading habit tracking across large, distributed datasets',
        approach: 'Leveraged Cassandra for scalable data storage with Spring Boot microservices architecture',
        impact: 'Handled 1M+ book records with sub-100ms query response times',
        architecture: ['Spring Boot', 'Cassandra DB', 'REST API', 'Recommendation Engine']
      }
    };
    return caseStudies[projectId] || {
      problem: 'Complex technical challenge requiring innovative solution',
      approach: 'Systematic engineering approach with modern technologies',
      impact: 'Measurable improvement in performance and user experience',
      architecture: ['Frontend', 'Backend', 'Database', 'Infrastructure']
    };
  };

  const filteredProjects = selectedCategory === 'all' 
    ? projects.slice(0, 5) // Limit to 5 projects for case studies
    : projects.filter(project => project.category === selectedCategory).slice(0, 5);


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
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
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
              Project Case Studies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-pill" />
            <p className="text-base text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
              Problem → Approach → Impact → Architecture. Real solutions with measurable outcomes.
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

          {/* Case Studies Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
            >
              {filteredProjects.map((project) => {
                const caseStudy = getCaseStudyData(project.id);
                
                return (
                  <motion.article
                    key={project.id}
                    variants={itemVariants}
                    layout
                    className="bg-white/80 dark:bg-neutral-800/60 backdrop-blur-sm rounded-card-lg overflow-hidden shadow-card dark:shadow-card-dark border border-neutral-200/50 dark:border-neutral-700/50 group"
                    whileHover={prefersReducedMotion ? {} : { 
                      y: -6, 
                      scale: 1.02,
                      rotateX: 1,
                    }}
                    whileTap={prefersReducedMotion ? {} : { 
                      scale: 0.98,
                      transition: { duration: 0.1 }
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.3
                    }}
                  >
                    {/* Project Header */}
                    <div className="p-6 pb-4 border-b border-neutral-200/50 dark:border-neutral-700/50">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-h3 font-display font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-240 ease-hover">
                          {project.name}
                        </h3>
                        <span className={`px-3 py-1 rounded-pill text-2xs font-medium ${
                          project.category === 'fullstack' 
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-200'
                            : project.category === 'backend'
                            ? 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-200'
                            : 'bg-innovation-100 text-innovation-800 dark:bg-innovation-900/30 dark:text-innovation-200'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                      
                      {/* Architecture Sketch */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                          <span className="text-small font-medium text-neutral-600 dark:text-neutral-400">Architecture</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.architecture.map((component, idx) => (
                            <div key={component} className="flex items-center">
                              <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-2xs font-medium">
                                {component}
                              </span>
                              {idx < caseStudy.architecture.length - 1 && (
                                <span className="mx-2 text-neutral-400 dark:text-neutral-500">→</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Case Study Content */}
                    <div className="p-6 space-y-5">
                      {/* Problem */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-error-600" />
                          <span className="text-small font-semibold text-error-700 dark:text-error-400">Problem</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed pl-6">
                          {caseStudy.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary-600" />
                          <span className="text-small font-semibold text-primary-700 dark:text-primary-400">Approach</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed pl-6">
                          {caseStudy.approach}
                        </p>
                      </div>

                      {/* Impact */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success-600" />
                          <span className="text-small font-semibold text-success-700 dark:text-success-400">Impact</span>
                        </div>
                        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed pl-6">
                          {caseStudy.impact}
                        </p>
                      </div>

                      {/* Stack */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-warning-600" />
                          <span className="text-small font-semibold text-warning-700 dark:text-warning-400">Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pl-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 rounded-lg text-xs font-medium border border-neutral-200 dark:border-neutral-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-3 pt-2">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-card font-medium transition-all duration-240 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 shadow-card hover:shadow-card-hover"
                            aria-label={`View source code of ${project.name} on GitHub`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" aria-hidden="true" />
                            Code
                          </motion.a>
                        )}
                        
                        {project.demoUrl && (
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 border border-neutral-300/70 dark:border-neutral-600/70 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-card font-medium transition-all duration-240 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2"
                            aria-label={`View live demo of ${project.name}`}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            Demo
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
              <p className="text-neutral-500 dark:text-neutral-400 text-base-lg">
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
