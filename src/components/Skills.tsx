import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skill } from '@/types';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { 
  Code2, 
  Database, 
  Cloud, 
  Settings, 
  Zap, 
  Filter, 
  X, 
  CheckCircle, 
  ExternalLink,
  Search,
  RotateCcw,
  User,
  Trophy,
  Target,
  ArrowLeft,
  ArrowRight,
  Share2
} from 'lucide-react';

interface SkillsProps {
  skills: Skill[];
}

interface SkillEvidence {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'achievement' | 'certification' | 'experience';
  company?: string;
  date?: string;
  metrics?: string[];
  technologies?: string[];
  url?: string;
}

type SkillLevel = 'expert' | 'advanced' | 'intermediate';
type SortOption = 'level' | 'years' | 'name';

interface FilterState {
  levels: Set<SkillLevel>;
  categories: Set<string>;
  search: string;
  sort: SortOption;
}

interface SkillChipProps {
  skill: Skill;
  onOpen: () => void;
  isKeyboardFocused?: boolean;
}

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  evidence: SkillEvidence[];
}

// Evidence data for skills - real examples from user's experience
const skillEvidence: Record<string, SkillEvidence[]> = {
  java: [
    {
      id: 'walmart-java17',
      title: 'Java 17 Migration at Walmart',
      description: 'Led critical system upgrade from Java 8 to Java 17 with Spring Boot 3, resolving security vulnerabilities with zero downtime.',
      type: 'experience',
      company: 'Walmart',
      date: '2024',
      metrics: ['Zero downtime migration', '30% integration overhead reduction', 'Critical vulnerabilities resolved'],
      technologies: ['Java 17', 'Spring Boot 3', 'OpenAPI']
    },
    {
      id: 'microservices-api',
      title: 'Microservices API Development',
      description: 'Built scalable REST APIs handling 10M+ requests daily with comprehensive monitoring and alerting.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['10M+ daily requests', '99.9% uptime', 'Sub-100ms response times'],
      technologies: ['Java', 'Spring Boot', 'Microservices', 'REST APIs']
    }
  ],
  python: [
    {
      id: 'payu-python-services',
      title: 'Python Backend Services at PayU',
      description: 'Developed high-performance payment processing services using Python with Django and FastAPI frameworks.',
      type: 'experience',
      company: 'PayU',
      date: '2022-2023',
      metrics: ['Payment processing optimization', 'API response time improvements', 'System reliability enhancements'],
      technologies: ['Python', 'Django', 'FastAPI', 'PostgreSQL']
    }
  ],
  golang: [
    {
      id: 'golang-microservices',
      title: 'Go Microservices Architecture',
      description: 'Built lightweight, concurrent microservices in Go for high-throughput data processing systems.',
      type: 'project',
      date: '2023',
      metrics: ['High concurrency handling', 'Memory efficiency improvements', 'Fast deployment cycles'],
      technologies: ['Golang', 'gRPC', 'Docker', 'Kubernetes']
    }
  ],
  spring: [
    {
      id: 'spring-boot-migration',
      title: 'Spring Boot 3 Migration',
      description: 'Successfully migrated legacy Spring applications to Spring Boot 3 with improved performance and security.',
      type: 'experience',
      company: 'Walmart',
      date: '2024',
      metrics: ['Legacy system modernization', 'Performance improvements', 'Security enhancements'],
      technologies: ['Spring Boot 3', 'Spring Security', 'Spring Data']
    }
  ],
  postgresql: [
    {
      id: 'database-optimization',
      title: 'PostgreSQL Performance Optimization',
      description: 'Optimized database queries and implemented efficient indexing strategies for large-scale applications.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['Query performance improvements', 'Database optimization', 'Scalability enhancements'],
      technologies: ['PostgreSQL', 'SQL Optimization', 'Indexing']
    }
  ],
  aws: [
    {
      id: 'aws-cloud-migration',
      title: 'AWS Cloud Infrastructure',
      description: 'Designed and implemented cloud-native solutions using various AWS services for scalable applications.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['Cloud migration success', 'Cost optimization', 'Scalability improvements'],
      technologies: ['AWS EC2', 'AWS RDS', 'AWS Lambda', 'CloudFormation']
    }
  ],
  airflow: [
    {
      id: 'airflow-data-pipelines',
      title: 'Apache Airflow Data Pipelines',
      description: 'Built and maintained complex data processing workflows using Apache Airflow for ETL operations.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['Automated data processing', 'Pipeline reliability', 'Workflow optimization'],
      technologies: ['Apache Airflow', 'Python', 'ETL', 'Data Processing']
    }
  ],
  kafka: [
    {
      id: 'kafka-streaming',
      title: 'Apache Kafka Event Streaming',
      description: 'Implemented real-time event streaming solutions using Apache Kafka for distributed systems.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['Real-time data streaming', 'Event-driven architecture', 'System decoupling'],
      technologies: ['Apache Kafka', 'Event Streaming', 'Microservices']
    }
  ],
  docker: [
    {
      id: 'containerization',
      title: 'Docker Containerization',
      description: 'Containerized applications using Docker for consistent deployment across environments.',
      type: 'experience',
      company: 'Walmart',
      date: '2023-2024',
      metrics: ['Deployment consistency', 'Environment standardization', 'DevOps efficiency'],
      technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'CI/CD']
    }
  ]
};

// Semantic color system - Color = Level (not category)
  const levelStyles: Record<SkillLevel, string> = {
    expert: 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200/50 dark:border-primary-700/50',
    advanced: 'bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-300 border border-success-200/50 dark:border-success-700/50', 
    intermediate: 'bg-warning-50 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 border border-warning-200/50 dark:border-warning-700/50'
  };

const levelIcons: Record<SkillLevel, React.ComponentType<{ className?: string }>> = {
  expert: Trophy,
  advanced: Target,
  intermediate: User
};

// Category definitions with neutral styling
const skillCategories = [
  { 
    id: 'languages', 
    label: 'Programming Languages', 
    icon: Code2,
    description: 'Core programming languages for backend development'
  },
  { 
    id: 'backend', 
    label: 'Backend Frameworks', 
    icon: Settings,
    description: 'Server-side frameworks and architectures'
  },
  { 
    id: 'database', 
    label: 'Databases', 
    icon: Database,
    description: 'Data storage and management systems'
  },
  { 
    id: 'cloud', 
    label: 'Cloud & Infrastructure', 
    icon: Cloud,
    description: 'Cloud platforms and infrastructure tools'
  },
  { 
    id: 'tools', 
    label: 'Development Tools', 
    icon: Zap,
    description: 'Development and deployment tools'
  },
];

// URL state management
const useURLState = () => {
  const [urlState, setUrlState] = useState(() => {
    if (typeof window === 'undefined') return { 
      skill: null as string | null, 
      filters: {
        levels: [] as string[],
        categories: [] as string[],
        search: '',
        sort: 'level' as SortOption
      }
    };
    
    const params = new URLSearchParams(window.location.search);
    return {
      skill: params.get('skill'),
      filters: {
        levels: params.get('levels')?.split(',') || [],
        categories: params.get('categories')?.split(',') || [],
        search: params.get('search') || '',
        sort: (params.get('sort') as SortOption) || 'level'
      }
    };
  });

  const updateURL = useCallback((updates: Partial<typeof urlState>) => {
    if (typeof window === 'undefined') return;
    
    const newState = { ...urlState, ...updates };
    const params = new URLSearchParams();
    
    if (newState.skill) params.set('skill', newState.skill);
    if (newState.filters.levels?.length) params.set('levels', newState.filters.levels.join(','));
    if (newState.filters.categories?.length) params.set('categories', newState.filters.categories.join(','));
    if (newState.filters.search) params.set('search', newState.filters.search);
    if (newState.filters.sort && newState.filters.sort !== 'level') params.set('sort', newState.filters.sort);
    
    const url = params.toString() ? `?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', url);
    setUrlState(newState);
  }, [urlState]);

  return { urlState, updateURL };
};

// Skill Chip Component - Fixed height, semantic colors
const SkillChip: React.FC<SkillChipProps> = ({ skill, onOpen, isKeyboardFocused }) => {
  const prefersReducedMotion = useReducedMotion();
  const evidence = skillEvidence[skill.id] || [];
  const hasEvidence = evidence.length > 0;
  
  return (
    <motion.button
      onClick={onOpen}
      className={`
        group relative h-9 sm:h-10 px-2 sm:px-3 md:px-4 inline-flex items-center justify-center gap-1 sm:gap-2 rounded-lg text-center w-full
        ${levelStyles[skill.proficiency as SkillLevel]}
        hover:shadow-sm transition-all duration-200 will-change-transform
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2
        ${isKeyboardFocused ? 'ring-2 ring-blue-300 ring-offset-2' : ''}
        ${hasEvidence ? 'cursor-pointer hover:scale-105' : 'cursor-default opacity-60'}
      `}
      disabled={!hasEvidence}
      whileHover={prefersReducedMotion ? {} : { 
        scale: hasEvidence ? 1.02 : 1,
        rotateZ: hasEvidence ? 0.5 : 0
      }}
      whileTap={prefersReducedMotion ? {} : { scale: hasEvidence ? 0.98 : 1 }}
      role="gridcell"
      aria-label={`${skill.name}, ${skill.proficiency} level${skill.yearsOfExperience ? `, ${skill.yearsOfExperience} years` : ''}${hasEvidence ? '. Click to view evidence.' : ''}`}
    >
      {/* Simple content */}
      <span className="font-medium text-xs sm:text-sm truncate">{skill.name}</span>
    </motion.button>
  );
};

// Enhanced Modal Component with Focus Management
const SkillModal: React.FC<SkillModalProps> = ({ 
  skill, 
  isOpen, 
  onClose, 
  onPrevious, 
  onNext, 
  evidence 
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the modal content
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      if (modal) modal.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (onPrevious) onPrevious();
          break;
        case 'ArrowRight':
          if (onNext) onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  if (!isOpen || !skill) return null;

  const shareUrl = `${window.location.origin}${window.location.pathname}?skill=${skill.id}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Dark scrim backdrop */}
        <div className="absolute inset-0 bg-black/60" />
        
        {/* Modal panel with contrast-safe glass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-modal-title"
          aria-describedby="skill-modal-description"
          tabIndex={-1}
        >
          {/* Solid inner content area for better contrast */}
          <div className="bg-white/95 dark:bg-slate-900/95 h-full overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${levelStyles[skill.proficiency as SkillLevel]}`}>
                    {React.createElement(levelIcons[skill.proficiency as SkillLevel], { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h2 
                      id="skill-modal-title"
                      className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
                    >
                      {skill.name}
                    </h2>
                    <p 
                      id="skill-modal-description"
                      className="text-neutral-600 dark:text-neutral-400 text-sm mt-1"
                    >
                      {skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1)} level
                      {skill.yearsOfExperience && ` • ${skill.yearsOfExperience} years experience`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Share button */}
                  <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Copy link to this skill"
                  >
                    <Share2 className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  </button>

                  {/* Navigation arrows */}
                  {onPrevious && (
                    <button
                      onClick={onPrevious}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Previous skill"
                    >
                      <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>
                  )}
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label="Next skill"
                    >
                      <ArrowRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </button>
                  )}

                  {/* Close button - larger hit area */}
                  <button
                    onClick={onClose}
                    className="p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {evidence.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Experience Evidence
                  </h3>
                  
                  {evidence.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                    >
                      {/* Evidence header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                            {item.company && (
                              <span className="font-medium">{item.company}</span>
                            )}
                            {item.date && (
                              <span>• {item.date}</span>
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'experience' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
                              item.type === 'project' ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300' :
                              item.type === 'achievement' ? 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300' :
                              'bg-neutral-100 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                        </div>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                            aria-label="Open external link"
                          >
                            <ExternalLink className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                          </a>
                        )}
                      </div>
                      
                      {/* Description */}
                      <p className="text-neutral-700 dark:text-neutral-300 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Metrics */}
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Key Achievements
                          </h5>
                          <div className="grid gap-2">
                            {item.metrics.map((metric, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 text-sm"
                              >
                                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                <span className="text-neutral-700 dark:text-neutral-300">{metric}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Technologies */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                            Technologies Used
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-full text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-neutral-500 dark:text-neutral-400 mb-4">
                    No detailed evidence available for this skill yet.
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    This skill is part of my technical toolkit with {skill.yearsOfExperience || 'some'} years of experience.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const prefersReducedMotion = useReducedMotion();
  const { urlState, updateURL } = useURLState();
  
  // Filter and modal state
  const [filters, setFilters] = useState<FilterState>({
    levels: new Set(urlState.filters.levels as SkillLevel[]),
    categories: new Set(urlState.filters.categories || []),
    search: urlState.filters.search || '',
    sort: urlState.filters.sort || 'level'
  });
  
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [keyboardFocusIndex] = useState(-1);

  // Advanced filtering and sorting
  const filteredAndSortedSkills = useMemo(() => {
    let filtered = skills.filter(skill => {
      // Level filter
      if (filters.levels.size > 0 && !filters.levels.has(skill.proficiency as SkillLevel)) {
        return false;
      }
      
      // Category filter
      if (filters.categories.size > 0 && !filters.categories.has(skill.category)) {
        return false;
      }
      
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return skill.name.toLowerCase().includes(searchTerm);
      }
      
      return true;
    });
    
    // Sort skills
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'level': {
          const levelOrder = { expert: 3, advanced: 2, intermediate: 1 };
          const levelDiff = levelOrder[b.proficiency as SkillLevel] - levelOrder[a.proficiency as SkillLevel];
          if (levelDiff !== 0) return levelDiff;
          // Secondary sort by years
          return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
        }
        case 'years':
          return (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [skills, filters]);

  // Filter management
  const updateFilters = (updates: Partial<FilterState>) => {
    const newFilters = { ...filters, ...updates };
    setFilters(newFilters);
    updateURL({ 
      filters: {
        levels: Array.from(newFilters.levels),
        categories: Array.from(newFilters.categories),
        search: newFilters.search,
        sort: newFilters.sort
      }
    });
  };

  const resetFilters = () => {
    const emptyFilters: FilterState = {
      levels: new Set(),
      categories: new Set(),
      search: '',
      sort: 'level'
    };
    setFilters(emptyFilters);
    updateURL({ filters: { levels: [], categories: [], search: '', sort: 'level' } });
  };

  const getActiveFilterCount = () => {
    return filters.levels.size + filters.categories.size + (filters.search ? 1 : 0);
  };

  // Modal management
  const openSkillModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowModal(true);
    updateURL({ skill: skill.id });
  };

  const closeSkillModal = () => {
    setSelectedSkill(null);
    setShowModal(false);
    updateURL({ skill: null });
  };

  // Navigation between skills in modal
  const navigateSkill = (direction: 'prev' | 'next') => {
    if (!selectedSkill) return;
    
    const currentIndex = filteredAndSortedSkills.findIndex(s => s.id === selectedSkill.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredAndSortedSkills.length - 1;
    } else {
      newIndex = currentIndex < filteredAndSortedSkills.length - 1 ? currentIndex + 1 : 0;
    }
    
    const newSkill = filteredAndSortedSkills[newIndex];
    setSelectedSkill(newSkill);
    updateURL({ skill: newSkill.id });
  };

  // Initialize from URL
  useEffect(() => {
    if (urlState.skill) {
      const skill = skills.find(s => s.id === urlState.skill);
      if (skill) {
        setSelectedSkill(skill);
        setShowModal(true);
      }
    }
  }, [urlState.skill, skills]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.2
      }
    }
  };

  const itemVariants = {
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
    <>
      <section 
        id="skills" 
        className="py-24 md:py-32 scroll-mt-28"
        aria-labelledby="skills-heading"
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
                id="skills-heading"
                className="text-display font-bold text-neutral-900 dark:text-neutral-100 mb-6"
              >
                Skills & Expertise
              </h2>
              <p className="text-body-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                Backend engineering expertise with proven experience in scalable systems, 
                microservices architecture, and high-performance applications.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
            </motion.div>

            {/* Enhanced Filter Toolbar */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-4">
                {/* Row A: Level filters + Reset */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => updateFilters({ 
                      levels: new Set(), 
                      categories: new Set(), 
                      search: '' 
                    })}
                    className={`h-9 sm:h-10 px-3 sm:px-4 rounded-full border transition-all duration-200 text-sm ${
                      getActiveFilterCount() === 0
                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                        : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-300/60 dark:border-neutral-700/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <Filter className="w-4 h-4 inline mr-2" />
                    All Skills
                  </button>

                  {/* Level segment controls */}
                  {(['expert', 'advanced', 'intermediate'] as SkillLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        const newLevels = new Set(filters.levels);
                        if (newLevels.has(level)) {
                          newLevels.delete(level);
                        } else {
                          newLevels.add(level);
                        }
                        updateFilters({ levels: newLevels });
                      }}
                      className={`h-9 sm:h-10 px-3 sm:px-4 rounded-full border transition-all duration-300 ease-out hover:scale-105 hover:shadow-md text-sm ${
                        filters.levels.has(level)
                          ? `bg-gradient-to-r ${levelStyles[level]} text-white border-transparent shadow-md hover:shadow-lg`
                          : 'bg-white/70 dark:bg-neutral-900/60 border-neutral-300/60 dark:border-neutral-700/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                      aria-pressed={filters.levels.has(level)}
                    >
                      {React.createElement(levelIcons[level], { className: "w-4 h-4 inline mr-2" })}
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}

                  {getActiveFilterCount() > 0 && (
                    <button
                      onClick={resetFilters}
                      className="h-10 px-3 rounded-full text-sm bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 inline mr-1" />
                      Reset ({getActiveFilterCount()})
                    </button>
                  )}
                </div>

                {/* Row B: Categories + Search + Sort */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {skillCategories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        const newCategories = new Set(filters.categories);
                        if (newCategories.has(category.id)) {
                          newCategories.delete(category.id);
                        } else {
                          newCategories.add(category.id);
                        }
                        updateFilters({ categories: newCategories });
                      }}
                      className={`h-9 sm:h-10 px-3 sm:px-4 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-md text-sm ${
                        filters.categories.has(category.id)
                          ? 'bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900 shadow-md hover:shadow-lg'
                          : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 hover:border-primary-300 dark:hover:border-primary-600'
                      }`}
                      aria-pressed={filters.categories.has(category.id)}
                    >
                      <category.icon className="w-4 h-4 inline mr-2" />
                      {category.label}
                    </button>
                  ))}

                  <div className="flex items-center gap-2 ml-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="text"
                        placeholder="Search skills..."
                        value={filters.search}
                        onChange={(e) => updateFilters({ search: e.target.value })}
                        className="h-9 sm:h-10 w-40 sm:w-56 pl-9 sm:pl-10 pr-3 sm:pr-4 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border-0 outline-none focus:ring-2 focus:ring-teal-300 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-600 dark:placeholder-neutral-400 transition-all"
                      />
                    </div>

                    <select
                      value={filters.sort}
                      onChange={(e) => updateFilters({ sort: e.target.value as SortOption })}
                      className="h-9 sm:h-10 px-2 sm:px-3 rounded-full bg-neutral-100 dark:bg-neutral-800/60 border-0 outline-none focus:ring-2 focus:ring-teal-300 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100"
                    >
                      <option value="level">Sort by Level</option>
                      <option value="years">Sort by Years</option>
                      <option value="name">Sort by Name</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Skills Grid - Semantic Color System */}
            <motion.div variants={itemVariants} className="mb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${Array.from(filters.levels).join('-')}-${Array.from(filters.categories).join('-')}-${filters.search}-${filters.sort}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
                  role="grid"
                  aria-label="Skills grid"
                >
                  {filteredAndSortedSkills.length > 0 ? (
                    filteredAndSortedSkills.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0.01 : 0.2,
                          delay: prefersReducedMotion ? 0 : index * 0.03
                        }}
                        role="gridcell"
                      >
                        <SkillChip
                          skill={skill}
                          onOpen={() => openSkillModal(skill)}
                          isKeyboardFocused={keyboardFocusIndex === index}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="text-neutral-500 dark:text-neutral-400 text-body-lg">
                        No skills match your current filters.
                      </div>
                      <button
                        onClick={resetFilters}
                        className="mt-4 text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Skills Summary */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="card-bg rounded-card p-8 max-w-4xl mx-auto">
                <h3 className="text-h2 font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Technical Proficiency Overview
                </h3>
                <p className="text-body text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                  Specialized in backend engineering with deep expertise in Java, Python, and Golang. 
                  Proven track record in building scalable microservices, optimizing system performance, 
                  and leading critical infrastructure migrations.
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-h2 font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      {skills.filter(s => s.proficiency === 'expert').length}
                    </div>
                    <div className="text-small text-neutral-600 dark:text-neutral-400">Expert Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-h2 font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                      {skills.filter(s => s.proficiency === 'advanced').length}
                    </div>
                    <div className="text-small text-neutral-600 dark:text-neutral-400">Advanced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-h2 font-bold text-violet-600 dark:text-violet-400 mb-1">
                      {Math.round(skills.reduce((sum, s) => sum + (s.yearsOfExperience || 0), 0) / skills.length)}
                    </div>
                    <div className="text-small text-neutral-600 dark:text-neutral-400">Avg Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-h2 font-bold text-primary-600 dark:text-primary-400 mb-1">
                      {skills.length}
                    </div>
                    <div className="text-small text-neutral-600 dark:text-neutral-400">Total Skills</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Skill Proof Modal */}
      <SkillModal
        skill={selectedSkill}
        isOpen={showModal}
        onClose={closeSkillModal}
        onPrevious={() => navigateSkill('prev')}
        onNext={() => navigateSkill('next')}
        evidence={selectedSkill ? (skillEvidence[selectedSkill.id] || []) : []}
      />
    </>
  );
};

export default Skills;
