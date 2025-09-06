import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/anshullkgarg/', // GitHub Pages repository name
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large dependencies
          vendor: ['react', 'react-dom'],
          // Animation libraries
          motion: ['framer-motion'],
          // Icon library
          icons: ['lucide-react'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize build size
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dev server
  server: {
    port: 3000,
  },
  // Enable CSS preprocessing optimizations
  css: {
    devSourcemap: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
  },
})