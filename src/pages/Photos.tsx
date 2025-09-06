import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Calendar, Palette, Grid, List } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const Photos: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'grid' | 'color'>('color');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Mock photo data - in real implementation, this would come from YAML/JSON
  const photoAlbums = [
    {
      slug: '2025-ladakh',
      title: 'Ladakh on a Phone',
      cover: '/anshullkgarg/images/avatar-optimized.jpg', // Using existing image as placeholder
      count: 42,
      palette: ['#0b1e3a', '#6ea8c2', '#c8dbe6', '#87b68f'],
      location: 'Ladakh, India',
      date: '2025-05-10'
    },
    {
      slug: '2024-monsoon',
      title: 'Monsoon Walks',
      cover: '/anshullkgarg/images/avatar-optimized.jpg',
      count: 18,
      palette: ['#1a2f1a', '#87b68f', '#cedec9', '#4a5d4a'],
      location: 'Bangalore, India',
      date: '2024-07-15'
    },
    {
      slug: '2024-architecture',
      title: 'Urban Architecture',
      cover: '/anshullkgarg/images/avatar-optimized.jpg',
      count: 24,
      palette: ['#2c2c2c', '#8b8b8b', '#d4d4d4', '#f0f0f0'],
      location: 'Mumbai, India',
      date: '2024-03-20'
    }
  ];

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

  const filteredAlbums = selectedColor 
    ? photoAlbums.filter(album => album.palette.includes(selectedColor))
    : photoAlbums;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Header */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-success-50 to-primary-50 dark:from-success-900/20 dark:to-primary-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Photos I shoot on my phone — color-sorted, map-aware gallery of moments and places.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* View mode toggle */}
            <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('color')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'color'
                    ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4" />
                Color Map
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-600 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
                Grid
              </button>
            </div>

            {/* Color filter */}
            {viewMode === 'color' && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600 dark:text-neutral-400">Filter by color:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedColor(null)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedColor === null
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
                    }`}
                  >
                    All
                  </button>
                  {Array.from(new Set(photoAlbums.flatMap(album => album.palette))).map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                        selectedColor === color ? 'border-white shadow-lg scale-110' : 'border-neutral-300 dark:border-neutral-600'
                      }`}
                      style={{ backgroundColor: color }}
                      title={`Filter by ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAlbums.map((album) => (
              <motion.div
                key={album.slug}
                variants={itemVariants}
                className="group cursor-pointer"
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow border border-neutral-200/50 dark:border-neutral-700/50">
                  {/* Album cover */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Photo count */}
                    <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                      {album.count} photos
                    </div>
                    
                    {/* Color palette */}
                    <div className="absolute bottom-4 left-4 flex gap-1">
                      {album.palette.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-white/50"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Album info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {album.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {album.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(album.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coming soon message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-card border border-neutral-200/50 dark:border-neutral-700/50 max-w-md mx-auto">
              <Camera className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                Gallery Coming Soon
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                I'm currently curating and organizing my photo collection. Check back soon for the full interactive gallery experience!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Photos;
