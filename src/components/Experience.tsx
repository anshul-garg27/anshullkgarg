import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Copy, Check, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Experience as ExperienceType } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ExperienceProps {
  experiences: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences }) => {
  const prefersReducedMotion = useReducedMotion();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

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
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: "easeOut" }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const copyExperienceCard = async (experience: ExperienceType) => {
    const text = `${experience.position} at ${experience.company}\n${formatDate(experience.startDate)} - ${experience.endDate ? formatDate(experience.endDate) : 'Present'}\n\n${experience.description.join('\n• ')}\n\nTechnologies: ${experience.technologies.join(', ')}`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(experience.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  // Tech tooltip data
  const techTooltips: Record<string, string> = {
    'Spring Boot 3': 'Virtual threads → improved concurrency',
    'OpenAPI': 'Contract-first → auto SDKs',
    'Java 17': 'Modern JVM → better performance',
    'ClickHouse': 'Columnar DB → 2.5x faster queries',
    'RabbitMQ': 'Message broker → async processing',
    'Apache Airflow': 'Workflow orchestration → ETL automation',
    'Python': 'Data processing → ML pipelines',
    'Golang': 'High performance → microservices',
    'PostgreSQL': 'ACID compliance → data integrity',
    'Redis': 'In-memory cache → sub-ms latency',
    'Docker': 'Containerization → consistent deployments',
    'Kubernetes': 'Orchestration → auto-scaling',
    'AWS': 'Cloud platform → global infrastructure',
    'Kafka': 'Event streaming → real-time data',
  };

  // Experience metrics data
  const getExperienceMetrics = (experience: ExperienceType) => {
    const metricsMap: Record<string, any> = {
      'walmart-nrt': {
        services: '12+',
        peakRps: '50K',
        p95Target: '<100ms',
        downtime: '0%'
      },
      'good-creator-co': {
        services: '8+',
        peakRps: '25K',
        p95Target: '<200ms',
        downtime: '0.01%'
      },
      'payu-lending': {
        services: '6+',
        peakRps: '15K',
        p95Target: '<500ms',
        downtime: '0.05%'
      }
    };
    
    return metricsMap[experience.id] || {
      services: 'N/A',
      peakRps: 'N/A',
      p95Target: 'N/A',
      downtime: 'N/A'
    };
  };

  return (
    <section 
      id="experience" 
      className="py-24 md:py-32 scroll-mt-28"
      aria-labelledby="experience-heading"
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
              id="experience-heading"
              className="text-h2 font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-pill" />
            <p className="text-body text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
              Building scalable systems and optimizing performance across fintech, data platforms, and SaaS applications
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Enhanced Timeline line with glow */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-innovation-500 hidden md:block shadow-glow" aria-hidden="true" />

            <div className="space-y-12">
              {experiences.map((experience, index) => {
                const metrics = getExperienceMetrics(experience);
                const isExpanded = expandedCards.has(experience.id);
                const isCopied = copiedId === experience.id;
                
                return (
                  <motion.article
                    key={experience.id}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Enhanced Timeline dot with pulse */}
                    <motion.div 
                      className="absolute left-6 top-8 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-neutral-900 hidden md:block shadow-glow-lg"
                      aria-hidden="true"
                      animate={prefersReducedMotion ? {} : {
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 20px rgba(20, 184, 166, 0.3)',
                          '0 0 40px rgba(20, 184, 166, 0.6)',
                          '0 0 20px rgba(20, 184, 166, 0.3)'
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />

                    {/* Enhanced Experience Card */}
                    <motion.div 
                      className="md:ml-20 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-sm rounded-card-lg p-8 shadow-card dark:shadow-card-dark border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-320 ease-hover"
                      whileHover={prefersReducedMotion ? {} : { 
                        y: -4, 
                        scale: 1.015,
                        boxShadow: '0 16px 48px rgba(2, 6, 23, 0.16)'
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    >
                      {/* Header with Copy Button */}
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-h3 font-display font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                            {experience.position}
                          </h3>
                          <p className="text-body-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                            {experience.company}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-neutral-600 dark:text-neutral-400 text-small">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" aria-hidden="true" />
                              <span>{experience.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" aria-hidden="true" />
                              <span>
                                {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : 'Present'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Copy Button */}
                        <motion.button
                          onClick={() => copyExperienceCard(experience)}
                          className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-card text-small font-medium transition-all duration-180 ease-hover hover:bg-neutral-200 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          aria-label="Copy experience details"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4 text-accent-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </motion.button>
                      </div>

                      {/* Metrics Row - NEW */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-neutral-50/50 dark:bg-neutral-900/30 rounded-card border border-neutral-200/30 dark:border-neutral-700/30">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {metrics.services}
                          </div>
                          <div className="text-2xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            Services
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-accent-600 dark:text-accent-400">
                            {metrics.peakRps}
                          </div>
                          <div className="text-2xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            Peak RPS
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-innovation-600 dark:text-innovation-400">
                            {metrics.p95Target}
                          </div>
                          <div className="text-2xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            P95 Target
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-success-600 dark:text-success-400">
                            {metrics.downtime}
                          </div>
                          <div className="text-2xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            Downtime
                          </div>
                        </div>
                      </div>

                      {/* Description with Show Details */}
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-small font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wide">
                            Key Responsibilities
                          </h4>
                          <motion.button
                            onClick={() => toggleExpanded(experience.id)}
                            className="flex items-center gap-2 px-3 py-1 text-small text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-card transition-all duration-180 ease-hover focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="w-4 h-4" />
                                Show Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-4 h-4" />
                                Show Details
                              </>
                            )}
                          </motion.button>
                        </div>
                        
                        <ul className="space-y-3">
                          {experience.description.slice(0, isExpanded ? undefined : 3).map((item, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-start gap-3"
                              initial={isExpanded && idx >= 3 ? { opacity: 0, height: 0 } : {}}
                              animate={isExpanded || idx < 3 ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                              transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, ease: "easeOut" }}
                            >
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-body">{item}</p>
                            </motion.li>
                          ))}
                        </ul>
                        
                        {!isExpanded && experience.description.length > 3 && (
                          <motion.p 
                            className="text-small text-neutral-500 dark:text-neutral-400 mt-3 italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            +{experience.description.length - 3} more responsibilities...
                          </motion.p>
                        )}
                      </div>

                      {/* Technologies with Tooltips */}
                      <div className="mb-6">
                        <h4 className="text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">
                          Technologies Used
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech) => (
                            <div key={tech} className="relative">
                              <motion.button
                                className="px-4 py-2 bg-neutral-100/80 dark:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300 rounded-pill text-small font-medium border border-neutral-200/70 dark:border-neutral-700/60 transition-all duration-180 ease-hover hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-400/60"
                                onMouseEnter={() => setHoveredTech(tech)}
                                onMouseLeave={() => setHoveredTech(null)}
                                whileHover={prefersReducedMotion ? {} : { y: -2 }}
                                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                              >
                                {tech}
                                {techTooltips[tech] && (
                                  <Info className="w-3 h-3 ml-1 inline opacity-60" />
                                )}
                              </motion.button>
                              
                              {/* Tooltip */}
                              <AnimatePresence>
                                {hoveredTech === tech && techTooltips[tech] && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-2xs rounded-card shadow-lg z-10 whitespace-nowrap"
                                  >
                                    {techTooltips[tech]}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      {experience.achievements && experience.achievements.length > 0 && (
                        <div>
                          <h4 className="text-small font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2.5 flex-shrink-0" aria-hidden="true" />
                                <p className="text-neutral-600 dark:text-neutral-300 text-small leading-relaxed">{achievement}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
