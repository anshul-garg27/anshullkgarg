import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Brain, Zap, Target, Code, Database, Server, Globe, Trophy, Star, Rocket, Lightbulb, Cpu, TrendingUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const EducationSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeView, setActiveView] = useState<'campus' | 'neural' | 'evolution' | 'achievements'>('campus');
  const [selectedDegree, setSelectedDegree] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        mouseX.set(x * 50);
        mouseY.set(y * 50);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        staggerChildren: prefersReducedMotion ? 0 : 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30, rotateX: prefersReducedMotion ? 0 : -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100
      }
    }
  };

  const milestones = [
    {
      title: "M.Tech in Computer Science and Engineering (AI/ML)",
      institution: "IIIT Bangalore",
      location: "Bangalore, India",
      period: "2020 - 2022",
      cgpa: "3.22/4.0",
      summary: "Focus on systems, distributed computing, and backend engineering with AI/ML specialization.",
      coursework: [
        "Machine Learning",
        "Functional Programming", 
        "Design and Analysis of Algorithms",
        "Artificial Intelligence",
        "Software Production Engineering"
      ],
      projects: [
        {
          name: "Better Reads Platform",
          role: "Full Stack Developer",
          impact: "Built scalable book discovery platform with Cassandra for fast query processing",
          tech: ["Java", "Spring Boot", "Cassandra", "React"],
          links: {
            repo: "https://github.com/anshul-garg27/better-reads"
          }
        }
      ],
      achievements: [
        "Teaching Assistant for CS-816 Software Production Engineering",
        "Event Manager, Infinite Cultural Fest",
        "Core Member, Gender Cell"
      ]
    },
    {
      title: "B.Tech in Computer Science and Engineering",
      institution: "SKIT Jaipur",
      location: "Jaipur, India", 
      period: "2015 - 2019",
      cgpa: "7.43/10.0",
      summary: "Strong foundation in computer science fundamentals and system design.",
      coursework: [
        "Data Structures and Algorithms",
        "Object Oriented Programming",
        "Operating Systems",
        "Theory of Computation",
        "Databases",
        "Computer Networks"
      ],
      projects: [
        {
          name: "Banking Management System",
          role: "Backend Developer",
          impact: "Implemented secure banking system with socket programming and file locking",
          tech: ["C", "Linux", "Socket Programming"],
          links: {}
        }
      ],
      achievements: [
        "GATE 2020: AIR 1343 with score of 659"
      ]
    }
  ];

  const certifications = [
    {
      title: "Red Hat Certified Specialist in Ansible Automation",
      issuer: "Red Hat",
      year: "2023"
    },
    {
      title: "Red Hat Certified System Administrator",
      issuer: "Red Hat", 
      year: "2022"
    }
  ];

  return (
    <section 
      id="education" 
      className="py-24 md:py-32 bg-gradient-to-br from-primary-50/30 to-success-50/30 dark:from-primary-900/10 dark:to-success-900/10 scroll-mt-28"
      aria-labelledby="education-heading"
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
              id="education-heading"
              className="text-h1 md:text-h1-lg font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              Education Journey
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Systems-heavy coursework, capstones, and proof-of-work projects that shaped my backend engineering expertise.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-success-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-success-500 transform md:-translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-center mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg transform md:-translate-x-1/2 z-10" />

                {/* Content card */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card border border-neutral-200/50 dark:border-neutral-700/50">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-xl">
                        <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                          {milestone.title}
                        </h3>
                        <div className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                          {milestone.institution}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-sm">
                          {milestone.location} • {milestone.period} • CGPA: {milestone.cgpa}
                        </div>
                      </div>
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      {milestone.summary}
                    </p>

                    {/* Coursework */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Key Coursework
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone.coursework.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm rounded-full"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                        Notable Projects
                      </h4>
                      {milestone.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-neutral-50 dark:bg-neutral-700/50 rounded-lg p-4 mb-3 last:mb-0">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-neutral-900 dark:text-white">
                              {project.name}
                            </h5>
                            {'repo' in project.links && project.links.repo && (
                              <a
                                href={'repo' in project.links ? project.links.repo : ''}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                            {project.impact}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Achievements
                      </h4>
                      <ul className="space-y-2">
                        {milestone.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="text-neutral-600 dark:text-neutral-400 text-sm flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-success-500 rounded-full mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            variants={itemVariants}
            className="mt-20"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Professional Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-card border border-neutral-200/50 dark:border-neutral-700/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-success-100 dark:bg-success-900/50 rounded-lg">
                      <Award className="w-5 h-5 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
