// Static imports for blog posts
import clickhouseMigrationRaw from '../content/blogs/clickhouse-migration.md?raw';
import springBootOptimizationRaw from '../content/blogs/spring-boot-optimization.md?raw';
import kafkaScalingRaw from '../content/blogs/kafka-scaling.md?raw';
import dockerOptimizationRaw from '../content/blogs/docker-optimization.md?raw';
import postgresqlIndexingRaw from '../content/blogs/postgresql-indexing.md?raw';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  category: string;
  author: string;
  slug: string;
}

interface BlogFrontmatter {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
  category: string;
  author: string;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: BlogFrontmatter; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }

  const [, frontmatterStr, markdownContent] = match;
  const frontmatter: any = {};
  
  // Parse YAML-like frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      
      // Handle different data types
      if (key.trim() === 'tags' || key.trim() === 'categories') {
        // Parse array format: ["item1", "item2"]
        frontmatter[key.trim()] = JSON.parse(value);
      } else if (key.trim() === 'featured') {
        frontmatter[key.trim()] = value === 'true';
      } else if (key.trim() === 'readingTime') {
        frontmatter[key.trim()] = parseInt(value);
      } else {
        // Remove quotes if present
        frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    }
  });

  return {
    frontmatter: frontmatter as BlogFrontmatter,
    content: markdownContent.trim()
  };
}

// Generate slug from filename
function generateSlug(filename: string): string {
  return filename.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

// Blog post mapping
const blogPostsRaw: Record<string, string> = {
  'clickhouse-migration.md': clickhouseMigrationRaw,
  'spring-boot-optimization.md': springBootOptimizationRaw,
  'kafka-scaling.md': kafkaScalingRaw,
  'docker-optimization.md': dockerOptimizationRaw,
  'postgresql-indexing.md': postgresqlIndexingRaw,
};

// Process blog post from raw content
function processBlogPost(filename: string, rawContent: string): BlogPost {
  const { frontmatter, content } = parseFrontmatter(rawContent);
  const slug = generateSlug(filename);
  
  return {
    ...frontmatter,
    content,
    slug
  };
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = Object.entries(blogPostsRaw).map(([filename, rawContent]) => 
      processBlogPost(filename, rawContent)
    );
    
    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Get blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.featured);
}

// Get blog posts by category
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const allTags = posts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const allCategories = posts.map(post => post.category);
  return Array.from(new Set(allCategories)).sort();
}
