import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Clock, Tag, Calendar, ArrowRight, Search } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Blog: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock blog data - in real implementation, this would come from MDX files
  const blogPosts = [
    {
      slug: 'clickhouse-migration',
      title: 'Why I moved logs to ClickHouse',
      summary: 'Thread pool sizing, connection reuse, GZIP tradeoffs, and caching strategies that cut p99 latency.',
      date: '2025-01-15',
      readingTime: 7,
      tags: ['ClickHouse', 'Performance', 'Migration'],
      featured: true,
      cover: '/anshullkgarg/images/avatar-optimized.jpg'
    },
    {
      slug: 'spring-boot-performance',
      title: 'Cutting p99 from 380ms → 190ms in Spring Boot',
      summary: 'Deep dive into JVM tuning, connection pooling, and monitoring that halved our API latency.',
      date: '2024-12-20',
      readingTime: 9,
      tags: ['Spring Boot', 'Performance', 'JVM'],
      featured: true,
      cover: '/anshullkgarg/images/avatar-optimized.jpg'
    },
    {
      slug: 'kafka-consumer-optimization',
      title: 'Scaling Kafka Consumers for 10M+ Events/Day',
      summary: 'Partition strategies, consumer group management, and backpressure handling at scale.',
      date: '2024-11-10',
      readingTime: 6,
      tags: ['Kafka', 'Scaling', 'Event Streaming'],
      featured: true,
      cover: '/anshullkgarg/images/avatar-optimized.jpg'
    },
    {
      slug: 'docker-optimization',
      title: 'Docker Images: From 2GB to 200MB',
      summary: 'Multi-stage builds, Alpine Linux, and layer optimization techniques for production deployments.',
      date: '2024-10-05',
      readingTime: 5,
      tags: ['Docker', 'DevOps', 'Optimization'],
      featured: false
    },
    {
      slug: 'postgresql-indexing',
      title: 'PostgreSQL Indexing Strategies That Actually Work',
      summary: 'Composite indexes, partial indexes, and query planning for high-traffic applications.',
      date: '2024-09-15',
      readingTime: 8,
      tags: ['PostgreSQL', 'Database', 'Performance'],
      featured: false
    },
    {
      slug: 'microservices-monitoring',
      title: 'Observability in Microservices: Beyond Basic Metrics',
      summary: 'Distributed tracing, correlation IDs, and alerting strategies for complex systems.',
      date: '2024-08-20',
      readingTime: 10,
      tags: ['Microservices', 'Observability', 'Monitoring'],
      featured: false
    }
  ];

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const recentPosts = filteredPosts.filter(post => !post.featured);

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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-warning-50 to-primary-50 dark:from-warning-900/20 dark:to-primary-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Technical Writing
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Short, practical posts on backend engineering, performance optimization, and distributed systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-100 dark:bg-neutral-700 border-0 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Tag filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-primary-500 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                }`}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                Featured Articles
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                In-depth technical deep dives and case studies
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  className="group cursor-pointer"
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border border-neutral-200/50 dark:border-neutral-700/50 h-full">
                    {/* Cover image */}
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Reading time */}
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} min
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-neutral-400" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium">
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-neutral-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                Recent Posts
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Latest thoughts and technical insights
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {recentPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  className="group cursor-pointer"
                >
                  <div className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-6 hover:bg-neutral-100 dark:hover:bg-neutral-600 transition-colors border border-neutral-200 dark:border-neutral-600">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} min read
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                          {post.summary}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-neutral-200 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Coming soon message */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card border border-neutral-200/50 dark:border-neutral-700/50 max-w-md mx-auto">
              <Edit3 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Blog Coming Soon
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                I'm currently working on technical articles about backend engineering, performance optimization, and distributed systems. Stay tuned!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
