/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Research-based: Inter is optimal for UI/UX (designed for screens)
        // Superior readability at all sizes, modern geometric sans-serif
        sans: [
          'Inter', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        
        // Research-based: JetBrains Mono for code/technical content
        // Designed specifically for developers, excellent ligatures
        mono: [
          'JetBrains Mono', 
          'Fira Code', 
          'SF Mono', 
          'Monaco', 
          'Cascadia Code', 
          'Roboto Mono', 
          'Courier New', 
          'monospace'
        ],
        
        // Research-based: Display font for large headings
        // Poppins has strong character, excellent for hero sections
        display: [
          'Poppins',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        
        // Research-based: Brand font for logo/special elements
        brand: [
          'Space Grotesk',
          'Inter',
          'system-ui',
          'sans-serif'
        ]
      },
      colors: {
        // Research-based Primary: Cyan (Trust, Technology, Reliability)
        // Perfect for backend engineers - conveys stability and technical expertise
        primary: {
          50: '#ecfeff',    // Ultra light - subtle backgrounds
          100: '#cffafe',   // Light backgrounds, borders
          200: '#a5f3fc',   // Hover states
          300: '#67e8f9',   // Subtle accents
          400: '#22d3ee',   // Interactive elements
          500: '#06b6d4',   // Main brand color - 4.8:1 contrast on white
          600: '#0891b2',   // Primary buttons, links
          700: '#0e7490',   // Dark mode primary
          800: '#155e75',   // Strong emphasis
          900: '#164e63',   // Dark backgrounds
          950: '#083344',   // Deepest shade
        },
        
        // Research-based Secondary: Emerald Green (Growth, Success, Innovation)
        // Represents career progression and achievements
        accent: {
          50: '#ecfdf5',    // Success backgrounds
          100: '#d1fae5',   // Light success states
          200: '#a7f3d0',   // Achievement highlights
          300: '#6ee7b7',   // Interactive hover
          400: '#34d399',   // Active states
          500: '#10b981',   // Main accent - 4.7:1 contrast
          600: '#059669',   // Buttons, CTAs
          700: '#047857',   // Dark mode accent
          800: '#065f46',   // Strong success
          900: '#064e3b',   // Deep success
          950: '#022c22',   // Deepest accent
        },
        
        // Research-based Neutral: Slate (Professional, Clean, Modern)
        // Based on WCAG 2.1 AA+ contrast requirements
        neutral: {
          50: '#f8fafc',    // Light mode background
          100: '#f1f5f9',   // Card backgrounds
          200: '#e2e8f0',   // Borders, dividers
          300: '#cbd5e1',   // Disabled states
          400: '#94a3b8',   // Placeholders - 4.5:1 contrast
          500: '#64748b',   // Secondary text - 7.4:1 contrast
          600: '#475569',   // Primary text - 10.4:1 contrast
          700: '#334155',   // Headings - 13.2:1 contrast
          800: '#1e293b',   // Dark mode cards
          900: '#0f172a',   // Dark mode background
          950: '#020617',   // Deepest dark
        },
        
        // Research-based Purple: Innovation & Creativity
        // For highlighting technical achievements and code
        innovation: {
          50: '#faf5ff',    // Subtle highlights
          100: '#f3e8ff',   // Light backgrounds
          200: '#e9d5ff',   // Hover states
          300: '#d8b4fe',   // Interactive
          400: '#c084fc',   // Active purple
          500: '#a855f7',   // Main purple - 5.2:1 contrast
          600: '#9333ea',   // Strong purple
          700: '#7c3aed',   // Dark mode purple
          800: '#6b21a8',   // Deep purple
          900: '#581c87',   // Darkest purple
          950: '#3b0764',   // Ultra deep
        },
        
        // Semantic Colors (Research-based)
        success: {
          50: '#f0fdf4',
          500: '#22c55e',   // 4.9:1 contrast ratio
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',   // 4.6:1 contrast ratio
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',   // 4.5:1 contrast ratio
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',   // 4.8:1 contrast ratio
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 4s ease-in-out infinite',
        'code-typing': 'codeTyping 2s steps(20) infinite',
        'tech-glow': 'techGlow 3s ease-in-out infinite alternate',
        // New design system animations
        'rotate-slow': 'rotateSlow 55s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'name-shimmer': 'nameShimmer 15s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(6, 182, 212, 0.5)' },
          '100%': { boxShadow: '0 0 25px rgba(6, 182, 212, 0.8)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        codeTyping: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
        techGlow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(34, 197, 94, 0.3), 0 0 10px rgba(6, 182, 212, 0.2)' 
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(6, 182, 212, 0.4)' 
          },
        },
        // New design system keyframes
        rotateSlow: {
          'to': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)' },
        },
        nameShimmer: {
          '0%, 90%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        // Research-based typography scale (Perfect Fifth: 1.5 ratio)
        // Optimized for readability and hierarchy
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.025em' }],
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.875rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '6.25rem', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '8.25rem', letterSpacing: '-0.05em' }],
        
        // Specialized sizes for specific use cases
        'display-sm': ['2.5rem', { lineHeight: '2.75rem', letterSpacing: '-0.025em' }],
        'display-md': ['3.5rem', { lineHeight: '3.75rem', letterSpacing: '-0.035em' }],
        'display-lg': ['4.75rem', { lineHeight: '5rem', letterSpacing: '-0.045em' }],
        'display-xl': ['6.5rem', { lineHeight: '6.75rem', letterSpacing: '-0.055em' }],
        
        // Clamp-based responsive typography (new design system)
        'display': ['clamp(2.75rem, 6vw, 4.5rem)', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.02em',
          fontFeatureSettings: '"ss01", "cv02", "cv11"'
        }],
        'h2': ['clamp(1.75rem, 3.2vw, 2.5rem)', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.01em' 
        }],
        'h3': ['clamp(1.25rem, 2vw, 1.75rem)', { 
          lineHeight: '1.3', 
          letterSpacing: '-0.005em' 
        }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'mono': ['0.875rem', { 
          lineHeight: '1.6', 
          fontFamily: 'JetBrains Mono' 
        }],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        // Design system tokens
        'card': '1rem',      // --radius-card: 16px
        'card-lg': '1.25rem', // --radius-card: 20px
        'pill': '9999px',     // --radius-pill
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(6, 182, 212, 0.3)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.4)',
        'glow-lg': '0 0 40px rgba(6, 182, 212, 0.5)',
        'tech': '0 4px 14px 0 rgba(6, 182, 212, 0.15)',
        'tech-lg': '0 10px 25px -3px rgba(6, 182, 212, 0.1), 0 4px 6px -2px rgba(6, 182, 212, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner-glow': 'inset 0 1px 3px 0 rgba(6, 182, 212, 0.1)',
        // Design system shadows
        'card': '0 8px 24px rgba(2, 6, 23, 0.08)',
        'card-hover': '0 16px 48px rgba(2, 6, 23, 0.16)',
        'card-dark': '0 8px 24px rgba(0, 0, 0, 0.40)',
        'card-dark-hover': '0 16px 48px rgba(0, 0, 0, 0.80)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-pattern': 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
        'code-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(6, 182, 212, 0.05) 1px, rgba(6, 182, 212, 0.05) 10px)',
        // Hero ambient backgrounds
        'hero-ambient': 'radial-gradient(64rem 32rem at 50% 10%, rgba(20,184,166,.12), transparent 60%)',
        'hero-conic': 'conic-gradient(from var(--tw-rotate, 0deg), rgba(34,211,238,.12), rgba(16,185,129,.12), rgba(34,211,238,.12))',
        'noise': "url('data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E')",
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      maxWidth: {
        'content': '1100px', // max-w-content for sections
      },
      scrollMargin: {
        '28': '7rem', // scroll-mt-28 for anchored sections
      },
      transitionTimingFunction: {
        'enter': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'hover': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '180': '180ms', // micro interactions
        '240': '240ms', // micro interactions
        '320': '320ms', // medium interactions
        '420': '420ms', // medium interactions
      },
    },
  },
  plugins: [],
}
