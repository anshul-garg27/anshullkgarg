import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Clock, Tag, Calendar, Code2, Database, Zap, TrendingUp, X, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { BlogPost, getAllBlogPosts, getFeaturedBlogPosts, getAllTags } from '@/utils/blogLoader';
import BlogPostComponent from './BlogPost';

const BlogSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [typewriterText, setTypewriterText] = useState('');
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dynamic blog loading state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Navigation functions
  const navigateToPrevPost = () => {
    if (!selectedPost) return;
    const currentIndex = blogPosts.findIndex(post => post.id === selectedPost.id);
    if (currentIndex > 0) {
      setSelectedPost(blogPosts[currentIndex - 1]);
    }
  };

  const navigateToNextPost = () => {
    if (!selectedPost) return;
    const currentIndex = blogPosts.findIndex(post => post.id === selectedPost.id);
    if (currentIndex < blogPosts.length - 1) {
      setSelectedPost(blogPosts[currentIndex + 1]);
    }
  };

  const getNavigationState = () => {
    if (!selectedPost) return { prev: false, next: false };
    const currentIndex = blogPosts.findIndex(post => post.id === selectedPost.id);
    return {
      prev: currentIndex > 0,
      next: currentIndex < blogPosts.length - 1
    };
  };

  // Load blog posts on component mount
  useEffect(() => {
    const loadBlogData = async () => {
      try {
        setLoading(true);
        const [posts, featured, tags] = await Promise.all([
          getAllBlogPosts(),
          getFeaturedBlogPosts(),
          getAllTags()
        ]);
        
        setBlogPosts(posts);
        setFeaturedPosts(featured);
        setAllTags(tags);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  // Typewriter effect for featured preview
  useEffect(() => {
    if (prefersReducedMotion || featuredPosts.length === 0) return;

    const featuredTitles = featuredPosts.map(post => post.title);
    const currentTitle = featuredTitles[currentTopicIndex];
    
    if (!currentTitle) return;
    
    let i = 0;
    
    const timer = setInterval(() => {
      setTypewriterText(currentTitle.slice(0, i));
      i++;
      
      if (i > currentTitle.length + 20) {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentTopicIndex((prev) => (prev + 1) % featuredTitles.length);
          setTypewriterText('');
        }, 2000);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [currentTopicIndex, prefersReducedMotion, featuredPosts]);
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTag && matchesSearch;
  });

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
      id="blog" 
      className="py-24 md:py-32 bg-gradient-to-br from-warning-50/30 to-primary-50/30 dark:from-warning-900/10 dark:to-primary-900/10 scroll-mt-28"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-content mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Enhanced Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-500/10 to-warning-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-20 right-1/4 w-24 h-24 bg-gradient-to-br from-warning-500/10 to-primary-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
            </div>

            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/10 to-warning-500/10 backdrop-blur-sm border border-primary-500/20 rounded-full px-6 py-3 mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Edit3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                Technical Blog
              </span>
            </motion.div>

            <motion.h2
              id="blog-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-neutral-800 via-primary-600 to-warning-600 dark:from-neutral-100 dark:via-primary-400 dark:to-warning-400 bg-clip-text text-transparent">
                Engineering
              </span>
              <br />
              <span className="text-neutral-800 dark:text-neutral-100">
                Insights
              </span>
            </motion.h2>

            <motion.p 
              className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Deep dives into <span className="text-primary-600 dark:text-primary-400 font-semibold">backend architecture</span>, 
              <span className="text-warning-600 dark:text-warning-400 font-semibold"> performance optimization</span>, and 
              <span className="text-primary-600 dark:text-primary-400 font-semibold"> distributed systems</span> from the trenches.
            </motion.p>

            <motion.div 
              className="flex items-center justify-center gap-4 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-medium">{blogPosts.length} Articles</span>
              </div>
              <div className="w-1 h-1 bg-neutral-400 rounded-full" />
              <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-medium">
                  {blogPosts.reduce((total, post) => total + post.readingTime, 0)} min total
                </span>
              </div>
            </motion.div>

            {/* Animated underline */}
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-primary-500 to-warning-500 mx-auto rounded-full mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </motion.div>

          {/* Typewriter Preview */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-card border border-neutral-200/50 dark:border-neutral-700/50 max-w-2xl mx-auto">
              <div className="bg-neutral-900 dark:bg-neutral-100 rounded-xl p-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-neutral-500 dark:text-neutral-600 text-xs ml-2">latest-article.md</span>
                </div>
                
                <div className="text-green-400 dark:text-green-600">
                  <span className="text-neutral-500 dark:text-neutral-600"># </span>
                  {loading ? (
                    <span className="animate-pulse">Loading articles...</span>
                  ) : (
                    typewriterText || (featuredPosts[currentTopicIndex]?.title || 'No featured articles')
                  )}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-white dark:text-neutral-900"
                  >
                    |
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Featured Articles */}
          <motion.div variants={itemVariants} className="mb-12">
            <motion.div 
              className="text-center mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                Featured Articles
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Hand-picked deep dives into the most impactful engineering challenges and solutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                // Loading skeleton
                [...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 animate-pulse">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="h-20 bg-neutral-200 dark:bg-neutral-700 rounded mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                      <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                    </div>
                  </div>
                ))
              ) : (
                featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="group cursor-pointer"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={prefersReducedMotion ? {} : { y: -8 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="relative bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50 transition-all duration-500 overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-warning-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500/10 to-warning-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full border border-primary-500/20">
                        <Code2 className="w-3 h-3" />
                        {post.category}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="w-1 h-1 bg-neutral-400 rounded-full" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readingTime} min read
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h4>
                    
                    {/* Excerpt */}
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gradient-to-r from-warning-100 to-primary-100 dark:from-warning-900/30 dark:to-primary-900/30 text-warning-700 dark:text-warning-300 text-xs font-medium rounded-full border border-warning-200/50 dark:border-warning-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Read more */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium">
                        <span>Read article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                      
                      {/* Reading progress indicator */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                              i < Math.ceil(post.readingTime / 2)
                                ? 'bg-primary-500'
                                : 'bg-neutral-300 dark:bg-neutral-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-2xl transition-colors duration-300" />
                  </div>
                </motion.article>
                ))
              )}
            </div>
          </motion.div>

          {/* Enhanced View All Button */}
          <motion.div 
            variants={itemVariants} 
            className="text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <motion.button
              onClick={() => setShowFullBlog(true)}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-warning-600 via-primary-600 to-warning-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 shadow-xl hover:shadow-2xl overflow-hidden"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              style={{
                backgroundSize: '200% 100%',
                backgroundPosition: '0% 0%'
              } as React.CSSProperties}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-warning-600/20 via-primary-600/20 to-warning-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <Edit3 className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10">
                Explore All Articles
              </span>
              <div className="flex items-center gap-1 relative z-10">
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {blogPosts.length}
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            {/* Floating elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary-400/30 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-warning-400/30 rounded-full animate-ping delay-1000" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Blog Modal */}
      <AnimatePresence>
        {showFullBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/95 via-neutral-900/95 to-black/95 backdrop-blur-xl"
            onClick={() => setShowFullBlog(false)}
          >
            <div className="h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="min-h-full">
                {/* Enhanced Modal Header */}
                <motion.div 
                  className="sticky top-0 z-10 bg-gradient-to-r from-black/80 via-neutral-900/80 to-black/80 backdrop-blur-xl border-b border-white/10"
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-primary-500 to-warning-500 rounded-xl flex items-center justify-center"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <Edit3 className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-3xl font-bold text-white">Engineering Articles</h3>
                          <p className="text-white/60">
                            {filteredPosts.length} articles • {filteredPosts.reduce((total, post) => total + post.readingTime, 0)} min total reading
                          </p>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={() => setShowFullBlog(false)}
                        className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Filters */}
                <motion.div 
                  className="max-w-7xl mx-auto px-6 py-8 space-y-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="lg:col-span-2">
                      <label className="block text-white font-medium mb-3">Search Articles</label>
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          placeholder="Search by title, content, or technology..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-gradient-to-r from-primary-500/10 to-warning-500/10 rounded-xl p-4 border border-primary-500/20">
                      <h4 className="text-white font-medium mb-2">Collection Stats</h4>
                      <div className="space-y-1 text-sm text-white/80">
                        <div className="flex justify-between">
                          <span>Total Articles:</span>
                          <span className="text-primary-400">{blogPosts.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Showing:</span>
                          <span className="text-warning-400">{filteredPosts.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Reading Time:</span>
                          <span className="text-primary-400">{filteredPosts.reduce((total, post) => total + post.readingTime, 0)}m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tag filters */}
                  <div>
                    <label className="block text-white font-medium mb-3">Filter by Technology</label>
                    <div className="flex flex-wrap gap-3">
                      <motion.button
                        onClick={() => setSelectedTag(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedTag === null
                            ? 'bg-gradient-to-r from-primary-500 to-warning-500 text-white shadow-lg'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        All Topics ({blogPosts.length})
                      </motion.button>
                      {allTags.map((tag) => {
                        const count = blogPosts.filter(post => post.tags.includes(tag)).length;
                        return (
                          <motion.button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                              selectedTag === tag
                                ? 'bg-gradient-to-r from-primary-500 to-warning-500 text-white shadow-lg'
                                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {tag} ({count})
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Articles List */}
                <div className="max-w-7xl mx-auto px-6 pb-12">
                  {filteredPosts.length === 0 ? (
                    <motion.div 
                      className="text-center py-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-white/60" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">No articles found</h4>
                      <p className="text-white/60 mb-6">Try adjusting your search or filter criteria</p>
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedTag(null);
                        }}
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
                      >
                        Clear Filters
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid gap-6">
                      {filteredPosts.map((post, index) => (
                        <motion.article
                          key={post.id}
                          className="group bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer hover:from-white/10 hover:to-white/15 transition-all duration-500 border border-white/10 hover:border-primary-500/30"
                          onClick={() => setSelectedPost(post)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: -4 }}
                          layout
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            {/* Article Content */}
                            <div className="flex-1">
                              {/* Meta info */}
                              <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(post.date).toLocaleDateString('en-US', { 
                                    month: 'long', 
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                                <div className="w-1 h-1 bg-white/40 rounded-full" />
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {post.readingTime} min read
                                </div>
                                <div className="w-1 h-1 bg-white/40 rounded-full" />
                                <div className="flex items-center gap-1">
                                  <Tag className="w-4 h-4" />
                                  {post.category}
                                </div>
                              </div>
                              
                              {/* Title */}
                              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-400 transition-colors duration-300 leading-tight">
                                {post.title}
                              </h4>
                              
                              {/* Excerpt */}
                              <p className="text-white/80 mb-6 leading-relaxed text-lg">
                                {post.excerpt}
                              </p>
                              
                              {/* Tags */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-warning-500/20 text-white text-sm rounded-full border border-primary-500/30 hover:border-primary-500/50 transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Action Area */}
                            <div className="flex flex-col items-end gap-4 lg:w-48">
                              {/* Featured badge */}
                              {post.featured && (
                                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-warning-500/20 to-primary-500/20 text-warning-400 text-xs font-medium rounded-full border border-warning-500/30">
                                  <TrendingUp className="w-3 h-3" />
                                  Featured
                                </div>
                              )}

                              {/* Read button */}
                              <motion.div 
                                className="flex items-center gap-2 text-primary-400 font-medium group-hover:text-primary-300 transition-colors"
                                whileHover={{ x: 4 }}
                              >
                                <span>Read Article</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </motion.div>

                              {/* Reading progress */}
                              <div className="flex flex-col items-end gap-2">
                                <span className="text-xs text-white/40">Estimated read</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                        i < Math.ceil(post.readingTime / 3)
                                          ? 'bg-primary-500'
                                          : 'bg-white/20'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Hover effect */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/20 rounded-2xl transition-colors duration-300 pointer-events-none" />
                        </motion.article>
                      ))}
                    </div>
                  )}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <Edit3 className="w-16 h-16 text-white/50 mx-auto mb-4" />
                    <p className="text-white/70">No articles match your filters</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogPostComponent
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onNavigate={(direction) => {
              if (direction === 'prev') {
                navigateToPrevPost();
              } else {
                navigateToNextPost();
              }
            }}
            hasNavigation={getNavigationState()}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BlogSection;