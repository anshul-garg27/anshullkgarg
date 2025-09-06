import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Calendar, Clock, Tag, User, ArrowLeft, Share2, BookOpen, TrendingUp } from 'lucide-react';
import { BlogPost as BlogPostType } from '@/utils/blogLoader';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for code blocks

interface BlogPostProps {
  post: BlogPostType;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasNavigation?: {
    prev: boolean;
    next: boolean;
  };
}

const BlogPost: React.FC<BlogPostProps> = ({ 
  post, 
  onClose, 
  onNavigate, 
  hasNavigation = { prev: false, next: false } 
}) => {
  // Load Prism.js for syntax highlighting
  useEffect(() => {
    const loadPrism = async () => {
      try {
        const Prism = await import('prismjs');
        
        // Load additional languages (with proper error handling)
        const languages = [
          'prismjs/components/prism-typescript',
          'prismjs/components/prism-javascript', 
          'prismjs/components/prism-python',
          'prismjs/components/prism-java',
          'prismjs/components/prism-sql',
          'prismjs/components/prism-yaml',
          'prismjs/components/prism-bash'
        ];
        
        await Promise.allSettled(
          languages.map(lang => import(lang).catch(() => {}))
        );
        
        // Re-highlight after loading
        Prism.highlightAll();
      } catch (error) {
        console.warn('Failed to load Prism.js:', error);
      }
    };
    
    loadPrism();
  }, [post.content]);

  // Estimate reading progress
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const estimatedReadingTime = Math.ceil(wordCount / wordsPerMinute);

  // Custom components for ReactMarkdown
  const components = {
    // Enhanced headings with anchors
    h1: ({ children, ...props }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight border-b border-white/20 pb-4" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-12 mb-6 leading-tight" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4 leading-tight" {...props}>
        {children}
      </h3>
    ),
    h4: ({ children, ...props }: any) => (
      <h4 className="text-lg md:text-xl font-semibold text-white mt-6 mb-3 leading-tight" {...props}>
        {children}
      </h4>
    ),
    
    // Enhanced paragraphs
    p: ({ children, ...props }: any) => (
      <p className="text-white/90 leading-relaxed mb-6 text-lg" {...props}>
        {children}
      </p>
    ),
    
    // Enhanced lists
    ul: ({ children, ...props }: any) => (
      <ul className="text-white/90 mb-6 space-y-2 pl-6" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="text-white/90 mb-6 space-y-2 pl-6 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="relative pl-2" {...props}>
        <span className="absolute -left-4 top-2 w-2 h-2 bg-primary-400 rounded-full"></span>
        {children}
      </li>
    ),
    
    // Enhanced code blocks
    pre: ({ children, ...props }: any) => (
      <div className="relative mb-8 group">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/60 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <pre className="bg-neutral-900 border border-white/10 rounded-xl p-6 overflow-x-auto text-sm leading-relaxed" {...props}>
          {children}
        </pre>
      </div>
    ),
    
    // Inline code
    code: ({ children, className, ...props }: any) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-white/10 text-primary-300 px-2 py-1 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }
      return <code className={className} {...props}>{children}</code>;
    },
    
    // Enhanced blockquotes
    blockquote: ({ children, ...props }: any) => (
      <blockquote className="border-l-4 border-primary-500 bg-primary-500/10 pl-6 py-4 my-8 italic text-white/90" {...props}>
        {children}
      </blockquote>
    ),
    
    // Enhanced tables
    table: ({ children, ...props }: any) => (
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-white/20 rounded-lg overflow-hidden" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }: any) => (
      <th className="bg-white/10 text-white font-semibold p-4 text-left border-b border-white/20" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }: any) => (
      <td className="text-white/90 p-4 border-b border-white/10" {...props}>
        {children}
      </td>
    ),
    
    // Enhanced links
    a: ({ children, href, ...props }: any) => (
      <a 
        href={href} 
        className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    
    // Enhanced horizontal rules
    hr: ({ ...props }: any) => (
      <hr className="border-white/20 my-12" {...props} />
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-gradient-to-br from-black via-neutral-900 to-black"
      onClick={onClose}
    >
      <div className="h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header */}
          <motion.div 
            className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={onClose}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </motion.button>
                  
                  <div>
                    <h1 className="text-xl font-bold text-white line-clamp-1">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{estimatedReadingTime} min read</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Navigation buttons */}
                  {hasNavigation.prev && (
                    <motion.button
                      onClick={() => onNavigate?.('prev')}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Previous article"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </motion.button>
                  )}
                  
                  {hasNavigation.next && (
                    <motion.button
                      onClick={() => onNavigate?.('next')}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Next article"
                    >
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </motion.button>
                  )}
                  
                  <motion.button
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Share article"
                  >
                    <Share2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.article 
            className="px-6 py-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Article Meta */}
            <div className="mb-12 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl border border-white/10">
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
                {post.featured && (
                  <div className="flex items-center gap-2 text-warning-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Featured</span>
                  </div>
                )}
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-500/20 to-warning-500/20 text-primary-300 text-sm rounded-full border border-primary-500/30"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="flex items-center justify-between">
                <div className="text-white/60">
                  <p>Published on {new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-sm mt-1">Last updated: {new Date(post.date).toLocaleDateString()}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <motion.button
                    className="px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Share Article
                  </motion.button>
                  <motion.button
                    onClick={onClose}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Blog
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
