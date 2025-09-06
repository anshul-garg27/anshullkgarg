import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, ExternalLink, Download } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Education: React.FC = () => {
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
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReducedMotion ? 0.01 : 0.5, ease: "easeOut" }
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-success-50 dark:from-primary-900/20 dark:to-success-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Education Journey
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Systems-heavy coursework, capstones, and proof-of-work projects that shaped my backend engineering expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white dark:bg-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Professional Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 border border-neutral-200 dark:border-neutral-600"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-success-100 dark:bg-success-900/50 rounded-lg">
                      <Award className="w-5 h-5 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Education;
