import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useScroll, useTransform as useTransformMotion } from 'framer-motion';
import { Camera, MapPin, Calendar, Palette, Eye, Focus, X, ChevronLeft, ChevronRight, Filter, Grid, Search, Play, Pause, Heart, Share2, Download, ZoomIn, RotateCcw, Maximize2, TrendingUp, Users, Clock, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { PhotoAlbum, Photo, PhotoStory } from '@/types/photos';
import { photoAlbums as externalAlbums } from '@/data/photoAlbums';

// Optimized Image Component with CLS prevention and blur-up effect
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  aspectRatio: number;
  width: number;
  height: number;
  placeholder?: string;
  className?: string;
  dominantColor: string;
}> = ({ src, alt, aspectRatio, width, height, placeholder, className = "", dominantColor }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: aspectRatio,
        backgroundColor: dominantColor + '20' // Light tint of dominant color
      } as React.CSSProperties}
    >
      {/* Placeholder with dominant color background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800"
        style={{ backgroundColor: dominantColor + '10' } as React.CSSProperties}
      />

      {/* Low-quality placeholder (blur-up effect) */}
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover blur-sm transition-opacity duration-300 ${isLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          width={width}
          height={height}
        />
      )}

      {/* Main image with lazy loading */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}

      {/* Loading shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      )}
    </div>
  );
};

const PhotosSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [backgroundGradient, setBackgroundGradient] = useState('from-success-50/30 to-primary-50/30 dark:from-success-900/10 dark:to-primary-900/10');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeStory, setActiveStory] = useState<PhotoStory | null>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [currentStoryPhoto, setCurrentStoryPhoto] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [aiMode, setAiMode] = useState<'smart' | 'emotion' | 'color' | 'composition'>('smart');
  const [focusMode, setFocusMode] = useState(false);
  const [immersiveMode, setImmersiveMode] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [gestureMode, setGestureMode] = useState(false);

  // Parallax mouse tracking
  const { scrollY } = useScroll();
  const y1 = useTransformMotion(scrollY, [0, 300], [0, -50]);
  const y2 = useTransformMotion(scrollY, [0, 300], [0, -100]);

  // Sample photo albums with diverse content and innovative features
  // TODO: Move inline data to src/data/photoAlbums.ts to keep this component lean
  const photoAlbums: PhotoAlbum[] = externalAlbums.length ? externalAlbums : [

    {
      id: '4',
      title: 'Golden Hour',
      cover: '/anshullkgarg/images/avatar-optimized.jpg',
      count: 19,
      palette: ['#daa520', '#ffd700', '#ffb347', '#ff8c00'],
      location: 'Rajasthan, India',
      date: '2024-01-25',
      description: 'Desert landscapes at sunset',
      photos: [
        {
          id: '4-1',
          src: '/anshullkgarg/images/avatar-optimized.jpg',
          title: 'Thar Desert',
          location: 'Rajasthan, India',
          date: '2024-01-25',
          dominantColor: '#daa520',
          tags: ['desert', 'sunset', 'dunes'],
          views: 4127,
          likes: 298,
          aspectRatio: 1.6,
          width: 800,
          height: 500,
          placeholder: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        }
      ]
    }
  ];

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Auto-play album rotation
  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentAlbumIndex((prev) => (prev + 1) % photoAlbums.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, prefersReducedMotion, photoAlbums.length]);

  // Story progression
  useEffect(() => {
    if (!activeStory) return;

    const timer = setInterval(() => {
      setStoryProgress((prev) => {
        const newProgress = prev + (100 / (activeStory.duration / 100));
        if (newProgress >= 100) {
          if (currentStoryPhoto < activeStory.photos.length - 1) {
            setCurrentStoryPhoto(currentStoryPhoto + 1);
            return 0;
          } else {
            setActiveStory(null);
            setCurrentStoryPhoto(0);
            return 0;
          }
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [activeStory, currentStoryPhoto]);

  // Dynamic background based on current album
  useEffect(() => {
    const currentAlbum = photoAlbums[currentAlbumIndex];
    const [color1, color2] = currentAlbum.palette;
    setBackgroundGradient(`from-[${color1}]/10 to-[${color2}]/10 dark:from-[${color1}]/5 dark:to-[${color2}]/5`);
  }, [currentAlbumIndex, photoAlbums]);

  const allPhotos = photoAlbums.flatMap(album => album.photos);
  const allColors = Array.from(new Set(photoAlbums.flatMap(album => album.palette)));
  const allTags = Array.from(new Set(allPhotos.flatMap(photo => photo.tags)));

  // AI-Powered Photo Analysis & Organization
  const analyzePhotoEmotion = (photo: Photo) => {
    // Simulated AI emotion analysis based on color and content
    const emotions = ['joy', 'serenity', 'adventure', 'nostalgia', 'wonder'];
    const colorEmotionMap: Record<string, string> = {
      '#0b1e3a': 'serenity',
      '#6ea8c2': 'serenity',
      '#87b68f': 'serenity',
      '#1a2f1a': 'nostalgia',
      '#2c2c2c': 'wonder',
      '#daa520': 'joy'
    };
    return colorEmotionMap[photo.dominantColor] || 'wonder';
  };

  const calculatePhotoScore = (photo: Photo) => {
    // Advanced scoring algorithm considering multiple factors
    const viewScore = (photo.views || 0) / 1000;
    const likeScore = (photo.likes || 0) / 10;
    const recencyScore = (Date.now() - new Date(photo.date).getTime()) / (1000 * 60 * 60 * 24 * 30); // Months
    const diversityScore = photo.tags.length * 0.5;
    return viewScore + likeScore + (10 - recencyScore) + diversityScore;
  };

  const organizePhotosNeurally = (photos: Photo[]) => {
    // Neural network-inspired clustering based on visual similarity
    return photos.sort((a, b) => {
      const aScore = calculatePhotoScore(a);
      const bScore = calculatePhotoScore(b);
      const colorSimilarity = a.dominantColor === b.dominantColor ? 1 : 0;
      const tagSimilarity = a.tags.filter(tag => b.tags.includes(tag)).length;
      return (bScore + colorSimilarity + tagSimilarity) - (aScore + colorSimilarity + tagSimilarity);
    });
  };

  const createPhotoTimeline = (photos: Photo[]) => {
    // Timeline visualization with temporal clustering
    const grouped = photos.reduce((acc, photo) => {
      const month = new Date(photo.date).toISOString().slice(0, 7);
      if (!acc[month]) acc[month] = [];
      acc[month].push(photo);
      return acc;
    }, {} as Record<string, Photo[]>);
    return Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a));
  };

  const clusterPhotosByContent = (photos: Photo[]) => {
    // Content-based clustering using tags and location
    const clusters: Record<string, Photo[]> = {};
    photos.forEach(photo => {
      const primaryTag = photo.tags[0] || 'misc';
      if (!clusters[primaryTag]) clusters[primaryTag] = [];
      clusters[primaryTag].push(photo);
    });
    return Object.entries(clusters).sort(([, a], [, b]) => b.length - a.length);
  };

  // Simplified filtering and sorting
  const filteredPhotos = allPhotos
    .filter(photo => {
      const matchesColor = !filterColor || photo.dominantColor === filterColor;
      const matchesSearch = !searchTerm ||
        photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = !selectedTag || photo.tags.includes(selectedTag);
      return matchesColor && matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return (b.views || 0) - (a.views || 0);
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'date':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Navigation functions
  const openFullGallery = () => {
    setShowFullGallery(true);
  };

  const startPhotoStory = (photo: Photo) => {
    if (photo.story) {
      setActiveStory(photo.story);
      setCurrentStoryPhoto(0);
      setStoryProgress(0);
    }
  };

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

  const albumVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40, rotateX: prefersReducedMotion ? 0 : -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;

    const currentIndex = allPhotos.findIndex((p: Photo) => p.id === selectedPhoto.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
    } else {
      newIndex = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedPhoto(allPhotos[newIndex]);
  };

  return (
    <section
      ref={containerRef}
      id="photos"
      className={`py-24 md:py-32 bg-gradient-to-br ${backgroundGradient} scroll-mt-28 transition-all duration-1000 relative overflow-hidden`}
      aria-labelledby="photos-heading"
    >
      {/* Advanced animated background with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating particles with mouse interaction */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-br from-white/20 to-primary-300/20 rounded-full blur-sm"
            animate={{
              x: [0, 100 + mousePosition.x * 50, 0],
              y: [0, -100 - mousePosition.y * 30, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2
            }}
            style={{
              left: `${5 + i * 12}%`,
              top: `${15 + i * 8}%`,
            } as React.CSSProperties}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-success-400/10 rounded-full blur-3xl"
          style={{ y: y1 }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-success-400/10 to-primary-400/10 rounded-full blur-3xl"
          style={{ y: y2 }}
        />
      </div>

      <div className="max-w-content mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={albumVariants} className="text-center mb-16">
            <h2
              id="photos-heading"
              className="text-h1 md:text-h1-lg font-display font-bold text-neutral-800 dark:text-neutral-100 mb-4"
            >
              Visual Stories
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Capturing moments through my lens — from landscapes to street photography, each frame tells a story.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-success-500 to-primary-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Featured Album Showcase */}
          <motion.div variants={albumVariants} className="mb-16">
            <div className="relative">
              {/* Auto-play controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                >
                  {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAutoPlaying ? 'Pause' : 'Play'} Slideshow
                </button>

                {/* Album indicators */}
                <div className="flex gap-2">
                  {photoAlbums.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAlbumIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentAlbumIndex
                          ? 'bg-primary-500 w-6'
                          : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-300'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* Featured Album Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentAlbumIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }}
                  className="relative max-w-4xl mx-auto"
                >
                  <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/50 dark:border-neutral-700/50">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Album Cover with CLS prevention */}
                      <div className="relative">
                        <OptimizedImage
                          src={photoAlbums[currentAlbumIndex].cover}
                          alt={photoAlbums[currentAlbumIndex].title}
                          aspectRatio={1}
                          width={600}
                          height={600}
                          dominantColor={photoAlbums[currentAlbumIndex].palette[0]}
                          className="rounded-l-3xl md:rounded-l-3xl md:rounded-r-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30" />

                        {/* Photo count badge */}
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {photoAlbums[currentAlbumIndex].count} photos
                        </div>

                        {/* Color palette strip */}
                        <div className="absolute bottom-0 left-0 right-0 h-3 flex">
                          {photoAlbums[currentAlbumIndex].palette.map((color, index) => (
                            <div
                              key={index}
                              className="flex-1 first:rounded-bl-3xl last:rounded-br-3xl"
                              style={{ backgroundColor: color } as React.CSSProperties}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Album Info */}
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                          {photoAlbums[currentAlbumIndex].title}
                        </h3>

                        <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                          {photoAlbums[currentAlbumIndex].description}
                        </p>

                        <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {photoAlbums[currentAlbumIndex].location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(photoAlbums[currentAlbumIndex].date).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Color palette chips */}
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Palette:</span>
                          <div className="flex gap-2">
                            {photoAlbums[currentAlbumIndex].palette.map((color, index) => (
                              <motion.div
                                key={index}
                                className="w-6 h-6 rounded-full border-2 border-white dark:border-neutral-600 shadow-sm cursor-pointer"
                                style={{ backgroundColor: color } as React.CSSProperties}
                                whileHover={prefersReducedMotion ? {} : { scale: 1.2, y: -2 }}
                                whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                                onClick={() => setFilterColor(color)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Innovative Masonry Photo Preview */}
          <motion.div variants={albumVariants} className="mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Recent Captures
            </h3>

            {/* Masonry grid with different sizes */}
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {allPhotos.slice(0, 8).map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="break-inside-avoid group cursor-pointer relative"
                  variants={albumVariants}
                  whileHover={prefersReducedMotion ? {} : {
                    scale: 1.02,
                    rotateZ: index % 2 === 0 ? 1 : -1,
                    y: -4
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => openLightbox(photo)}
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
                  } as React.CSSProperties}
                >
                  <div className="relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50">
                    {/* Photo with CLS prevention */}
                    <div className="relative">
                      <OptimizedImage
                        src={photo.src}
                        alt={photo.title}
                        aspectRatio={photo.aspectRatio}
                        width={photo.width}
                        height={photo.height}
                        placeholder={photo.placeholder}
                        dominantColor={photo.dominantColor}
                        className="group-hover:scale-110 transition-transform duration-500 rounded-t-2xl"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Story indicator */}
                      {photo.story && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startPhotoStory(photo);
                          }}
                          className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Play className="w-3 h-3" />
                          Story
                        </button>
                      )}

                      {/* Photo stats */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {photo.views?.toLocaleString()}
                        </div>
                        <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {photo.likes}
                        </div>
                      </div>

                      {/* Hover actions */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full p-3">
                          <ZoomIn className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                        </div>
                      </div>
                    </div>

                    {/* Photo info */}
                    <div className="p-3">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-1 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {photo.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Album Grid */}
          <motion.div variants={albumVariants} className="mb-12">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Photo Collections
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {photoAlbums.map((album, index) => (
                <motion.div
                  key={album.id}
                  className="group cursor-pointer"
                  variants={albumVariants}
                  whileHover={prefersReducedMotion ? {} : {
                    y: -8,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02
                  }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setCurrentAlbumIndex(index)}
                  onMouseEnter={() => setHoveredAlbum(album.id)}
                  onMouseLeave={() => setHoveredAlbum(null)}
                >
                  <div className="relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-neutral-200/50 dark:border-neutral-700/50">
                    {/* Album cover with CLS prevention */}
                    <div className="relative">
                      <OptimizedImage
                        src={album.cover}
                        alt={album.title}
                        aspectRatio={1}
                        width={400}
                        height={400}
                        dominantColor={album.palette[0]}
                        className="group-hover:scale-110 transition-transform duration-500 rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-full p-3">
                          <Eye className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                        </div>
                      </div>

                      {/* Photo count */}
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {album.count}
                      </div>
                    </div>

                    {/* Album info */}
                    <div className="p-4">
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {album.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                        {album.location}
                      </p>

                      {/* Mini color palette */}
                      <div className="flex gap-1">
                        {album.palette.slice(0, 4).map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-3 h-3 rounded-full border border-neutral-200 dark:border-neutral-600"
                            style={{ backgroundColor: color } as React.CSSProperties}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View All Button */}
          <motion.div variants={albumVariants} className="text-center">
            <motion.button
              onClick={openFullGallery}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-success-600 to-primary-600 hover:from-success-700 hover:to-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Explore Full Gallery
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {allPhotos.length} photos
              </span>
            </motion.button>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-4">
              Discover the complete collection with advanced filters, stories, and interactive features
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Instagram-style Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-60 bg-black flex items-center justify-center"
            onClick={() => setActiveStory(null)}
          >
            <div className="relative max-w-md w-full h-full max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
              {/* Story progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
                {activeStory.photos.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-100"
                      style={{
                        width: index < currentStoryPhoto ? '100%' :
                          index === currentStoryPhoto ? `${storyProgress}%` : '0%'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={() => setActiveStory(null)}
                className="absolute top-4 right-4 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Story content */}
              <div className="relative w-full h-full bg-gradient-to-br from-neutral-900 to-black rounded-2xl overflow-hidden">
                <img
                  src={activeStory.photos[currentStoryPhoto]}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />

                {/* Story info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-xl font-bold mb-2">{activeStory.title}</h3>
                  <p className="text-white/80 text-sm">
                    {currentStoryPhoto + 1} of {activeStory.photos.length}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PhD-Level AI-Powered Gallery Modal */}
      <AnimatePresence>
        {showFullGallery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed inset-0 z-50 transition-all duration-500 ${immersiveMode
                ? 'bg-black'
                : focusMode
                  ? 'bg-neutral-900/98 backdrop-blur-2xl'
                  : 'bg-black/95 backdrop-blur-xl'
              }`}
            onClick={() => !focusMode && setShowFullGallery(false)}
          >
            <div className="h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="min-h-full">
                {/* Revolutionary AI-Powered Header */}
                <motion.div
                  className={`sticky top-0 z-10 transition-all duration-500 ${focusMode
                      ? 'bg-transparent'
                      : 'bg-black/90 backdrop-blur-xl border-b border-white/10'
                    }`}
                  animate={{ y: focusMode ? -100 : 0 }}
                >
                  <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                          animate={{
                            background: [
                              'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
                              'linear-gradient(45deg, #06b6d4, #8b5cf6, #3b82f6)',
                              'linear-gradient(45deg, #3b82f6, #06b6d4, #8b5cf6)'
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <Camera className="w-6 h-6 text-white z-10" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                        <div>
                          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            Neural Gallery
                            <motion.span
                              className="text-xs bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              AI-POWERED
                            </motion.span>
                          </h2>
                          <div className="flex items-center gap-4 text-white/60 text-sm">
                            <motion.span
                              key={filteredPhotos.length}
                              initial={{ scale: 1.2, color: '#00ff88' }}
                              animate={{ scale: 1, color: '#ffffff99' }}
                              transition={{ duration: 0.3 }}
                            >
                              {filteredPhotos.length} photos
                            </motion.span>
                            <span>•</span>
                            <span>{allTags.length} categories</span>
                            <span>•</span>
                            <span>{allPhotos.reduce((sum, photo) => sum + (photo.views || 0), 0).toLocaleString()} total views</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Advanced Mode Controls */}
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => setFocusMode(!focusMode)}
                            className={`p-2 rounded-lg transition-all ${focusMode
                                ? 'bg-purple-500/20 text-purple-300 ring-1 ring-purple-500/50'
                                : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Focus className="w-4 h-4" />
                          </motion.button>

                          <motion.button
                            onClick={() => setImmersiveMode(!immersiveMode)}
                            className={`p-2 rounded-lg transition-all ${immersiveMode
                                ? 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/50'
                                : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Maximize2 className="w-4 h-4" />
                          </motion.button>

                          <motion.button
                            onClick={() => setHeatmapMode(!heatmapMode)}
                            className={`p-2 rounded-lg transition-all ${heatmapMode
                                ? 'bg-orange-500/20 text-orange-300 ring-1 ring-orange-500/50'
                                : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <TrendingUp className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-white/10 rounded-lg p-1">
                          {(['grid', 'masonry'] as const).map((mode) => (
                            <motion.button
                              key={mode}
                              onClick={() => setViewMode(mode)}
                              className={`p-2 rounded-md transition-all text-xs font-medium ${viewMode === mode
                                  ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 text-white ring-1 ring-white/20'
                                  : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {mode === 'grid' ? 'GRID' : 'MASONRY'}
                            </motion.button>
                          ))}
                        </div>

                        <button
                          onClick={() => setShowFullGallery(false)}
                          className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Revolutionary AI Control Panel */}
                <motion.div
                  className={`transition-all duration-500 ${focusMode
                      ? 'opacity-0 h-0 overflow-hidden'
                      : 'bg-gradient-to-r from-black/80 via-purple-900/20 to-black/80 backdrop-blur-sm border-b border-purple-500/20'
                    }`}
                  animate={{ height: focusMode ? 0 : 'auto' }}
                >
                  <div className="max-w-7xl mx-auto px-6 py-6">

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Search */}
                      <div className="lg:col-span-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            placeholder="Search photos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Tags Filter */}
                      <div className="lg:col-span-1">
                        <select
                          value={selectedTag || ''}
                          onChange={(e) => setSelectedTag(e.target.value || null)}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="">All Categories</option>
                          {allTags.map((tag) => (
                            <option key={tag} value={tag} className="bg-black text-white">
                              {tag.charAt(0).toUpperCase() + tag.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Sort By */}
                      <div className="lg:col-span-1">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
                          className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        >
                          <option value="date" className="bg-black text-white">Latest First</option>
                          <option value="views" className="bg-black text-white">Most Viewed</option>
                          <option value="likes" className="bg-black text-white">Most Liked</option>
                        </select>
                      </div>

                      {/* Color Filters */}
                      <div className="lg:col-span-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setFilterColor(null)}
                            className={`px-3 py-1 text-sm rounded-full transition-all ${filterColor === null
                                ? 'bg-white text-black font-medium'
                                : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                          >
                            All
                          </button>
                          {allColors.slice(0, 6).map((color) => (
                            <button
                              key={color}
                              onClick={() => setFilterColor(color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${filterColor === color
                                  ? 'border-white scale-110 shadow-lg'
                                  : 'border-white/30 hover:border-white/60'
                                }`}
                              style={{ backgroundColor: color } as React.CSSProperties}
                              title={`Filter by ${color}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Photos Grid */}
                <div className="max-w-7xl mx-auto p-6">
                  <div className={`${viewMode === 'masonry'
                      ? 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4'
                      : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
                    }`}>
                    {filteredPhotos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        className={`group cursor-pointer relative ${viewMode === 'masonry' ? 'break-inside-avoid' : ''}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.4 }}
                        whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
                        onClick={() => openLightbox(photo)}
                        layout
                      >
                        <div className="relative rounded-2xl overflow-hidden bg-neutral-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                          <OptimizedImage
                            src={photo.src}
                            alt={photo.title}
                            aspectRatio={viewMode === 'masonry' ? photo.aspectRatio : 1}
                            width={photo.width}
                            height={photo.height}
                            placeholder={photo.placeholder}
                            dominantColor={photo.dominantColor}
                            className="group-hover:scale-110 transition-transform duration-500 rounded-2xl"
                          />

                          {/* Enhanced Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Story Badge */}
                          {photo.story && (
                            <motion.div
                              className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                              whileHover={{ scale: 1.1 }}
                            >
                              <Play className="w-3 h-3" />
                              Story
                            </motion.div>
                          )}

                          {/* Enhanced Stats */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-col gap-2">
                              <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" />
                                #{index + 1}
                              </div>
                            </div>
                          </div>

                          {/* Bottom Stats */}
                          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {photo.views?.toLocaleString()}
                                </div>
                                <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                  <Heart className="w-3 h-3" />
                                  {photo.likes}
                                </div>
                              </div>

                              <motion.div
                                className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                                whileHover={{ scale: 1.1 }}
                              >
                                <ZoomIn className="w-4 h-4 text-neutral-700" />
                              </motion.div>
                            </div>

                            {/* Photo Info */}
                            <div className="mt-2">
                              <h3 className="text-white font-medium text-sm mb-1">{photo.title}</h3>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-white/80 text-xs">
                                  <MapPin className="w-3 h-3" />
                                  {photo.location}
                                </div>
                                <div className="text-white/60 text-xs">
                                  {new Date(photo.date).toLocaleDateString()}
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mt-2">
                                {photo.tags.slice(0, 2).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Empty State */}
                  {filteredPhotos.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-20"
                    >
                      <div className="w-24 h-24 bg-gradient-to-br from-primary-500/20 to-success-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Camera className="w-12 h-12 text-white/50" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-3">No photos found</h3>
                      <p className="text-white/60 mb-6 max-w-md mx-auto">
                        Try adjusting your search terms, tags, or color filters to discover more amazing photos.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedTag(null);
                            setFilterColor(null);
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-primary-600 to-success-600 hover:from-primary-700 hover:to-success-700 text-white rounded-full transition-all duration-300 font-medium"
                        >
                          Clear All Filters
                        </button>
                        <button
                          onClick={() => setShowFullGallery(false)}
                          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                        >
                          Back to Gallery
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Navigation buttons */}
              <button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Photo */}
              <motion.img
                key={selectedPhoto.id}
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
              />

              {/* Photo info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-xl font-bold text-white mb-2">{selectedPhoto.title}</h3>
                <div className="flex items-center gap-4 text-white/80 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedPhoto.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedPhoto.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPhoto.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/20 text-white text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotosSection;