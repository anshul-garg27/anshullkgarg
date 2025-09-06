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
        // Primary body font: Inter - optimal for UI/UX, excellent readability
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
        
        // Alternative body font: Manrope - geometric, friendly, professional
        body: [
          'Manrope',
          'Inter',
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'system-ui',
          'sans-serif'
        ],
        
        // Code & metrics: JetBrains Mono - designed for developers
        mono: [
          'JetBrains Mono', 
          'SF Mono', 
          'Monaco', 
          'Cascadia Code', 
          'Roboto Mono', 
          'Courier New', 
          'monospace'
        ],
        
        // Alternative code font: IBM Plex Mono - clean, technical
        code: [
          'IBM Plex Mono',
          'JetBrains Mono',
          'SF Mono', 
          'Monaco', 
          'Consolas',
          'monospace'
        ],
        
        // Display font for headings: Inter with tighter spacing
        display: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
      colors: {
        // Primary: Indigo (Professional, Trustworthy, Technical)
        // Lower saturation in light mode for better contrast
        primary: {
          50: '#eef2ff',    // Very subtle backgrounds for chips/badges
          100: '#e0e7ff',   // Light backgrounds
          200: '#c7d2fe',   // Hover states
          300: '#a5b4fc',   // Subtle accents
          400: '#818cf8',   // Interactive elements
          500: '#6366f1',   // Main brand color
          600: '#4f46e5',   // Primary buttons (light mode)
          700: '#4338ca',   // Links, emphasis (light mode)
          800: '#3730a3',   // Strong emphasis
          900: '#312e81',   // Dark backgrounds
          950: '#1e1b4b',   // Deepest shade
        },
        
        // Success/accent color for achievements and positive metrics
        success: {
          50: '#f0fdf4',    // Success backgrounds
          100: '#dcfce7',   // Light success states
          200: '#bbf7d0',   // Achievement highlights
          300: '#86efac',   // Interactive hover
          400: '#4ade80',   // Active states
          500: '#22c55e',   // Main success color
          600: '#16a34a',   // Success buttons
          700: '#15803d',   // Success emphasis
          800: '#166534',   // Strong success
          900: '#14532d',   // Deep success
          950: '#052e16',   // Deepest success
        },
        
        // Neutral grays with proper contrast on white backgrounds
        // Using slate scale for professional appearance
        neutral: {
          50: '#f8fafc',    // Light mode background (slate-50)
          100: '#f1f5f9',   // Card backgrounds
          200: '#e2e8f0',   // Borders, dividers
          300: '#cbd5e1',   // Disabled states
          400: '#94a3b8',   // Placeholders - 4.5:1 contrast
          500: '#64748b',   // Secondary text - 7.4:1 contrast
          600: '#475569',   // Subtext (slate-600) - 10.4:1 contrast
          700: '#334155',   // Primary text (slate-700) - 13.2:1 contrast  
          800: '#1e293b',   // Dark mode cards
          900: '#0f172a',   // Primary text on dark (slate-900)
          950: '#020617',   // Deepest dark
        },
        
        // Modern accent colors for visual interest
        accent: {
          50: '#fdf4ff',    // Ultra light purple
          100: '#fae8ff',   // Light purple backgrounds
          200: '#f5d0fe',   // Soft purple
          300: '#f0abfc',   // Medium purple
          400: '#e879f9',   // Bright purple
          500: '#d946ef',   // Main accent color
          600: '#c026d3',   // Strong accent
          700: '#a21caf',   // Dark accent
          800: '#86198f',   // Deeper accent
          900: '#701a75',   // Deep purple
          950: '#4a044e',   // Deepest purple
        },
        
        // Warning/Orange for metrics and highlights
        warning: {
          50: '#fffbeb',    // Subtle warning backgrounds
          100: '#fef3c7',   // Light warning states
          200: '#fde68a',   // Warning highlights
          300: '#fcd34d',   // Interactive warning
          400: '#fbbf24',   // Active warning
          500: '#f59e0b',   // Main warning color
          600: '#d97706',   // Warning buttons
          700: '#b45309',   // Warning emphasis
          800: '#92400e',   // Strong warning
          900: '#78350f',   // Deep warning
          950: '#451a03',   // Deepest warning
        },
        
        // Modern blue for information and links
        info: {
          50: '#eff6ff',    // Light info backgrounds
          100: '#dbeafe',   // Soft blue
          200: '#bfdbfe',   // Medium blue
          300: '#93c5fd',   // Bright blue
          400: '#60a5fa',   // Active blue
          500: '#3b82f6',   // Main info color
          600: '#2563eb',   // Strong blue
          700: '#1d4ed8',   // Dark blue
          800: '#1e40af',   // Deeper blue
          900: '#1e3a8a',   // Deep blue
          950: '#172554',   // Deepest blue
        },
        
        // Error/Red for validation and alerts
        error: {
          50: '#fef2f2',    // Subtle error backgrounds
          100: '#fee2e2',   // Light error states
          200: '#fecaca',   // Error highlights
          300: '#fca5a5',   // Interactive error
          400: '#f87171',   // Active error
          500: '#ef4444',   // Main error color
          600: '#dc2626',   // Error buttons
          700: '#b91c1c',   // Error emphasis
          800: '#991b1b',   // Strong error
          900: '#7f1d1d',   // Deep error
          950: '#450a0a',   // Deepest error
        }
      },
      
      // Enhanced spacing system for better mobile-first design
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
        '54': '13.5rem',  // 216px
        '58': '14.5rem',  // 232px
        '62': '15.5rem',  // 248px
        '66': '16.5rem',  // 264px
        '70': '17.5rem',  // 280px
        '74': '18.5rem',  // 296px
        '78': '19.5rem',  // 312px
        '82': '20.5rem',  // 328px
        '86': '21.5rem',  // 344px
        '90': '22.5rem',  // 360px
        '94': '23.5rem',  // 376px
        '98': '24.5rem',  // 392px
      },
      
      // Enhanced breakpoints for better responsive design
      screens: {
        'xs': '475px',    // Extra small devices
        'sm': '640px',    // Small devices (landscape phones)
        'md': '768px',    // Medium devices (tablets)
        'lg': '1024px',   // Large devices (desktops)
        'xl': '1280px',   // Extra large devices
        '2xl': '1536px',  // 2X large devices
        '3xl': '1920px',  // Ultra wide screens
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
        // Typography hierarchy: Inter/Manrope (body) + JetBrains Mono/IBM Plex Mono (code)
        // Clear hierarchy with tighter line-heights and consistent letter-spacing
        
        // Small text and UI elements
        '2xs': ['0.625rem', { lineHeight: '0.875rem', letterSpacing: '0.025em' }],
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],
        
        // Body text: 16-18px with tight line-height (1.4-1.6)
        'base': ['1rem', { lineHeight: '1.4rem', letterSpacing: '0' }],        // 16px
        'lg': ['1.125rem', { lineHeight: '1.6rem', letterSpacing: '-0.01em' }], // 18px
        
        // Monospace: 14-15px for code and metrics
        'mono-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em', fontFamily: 'JetBrains Mono, monospace' }], // 14px
        'mono-base': ['0.9375rem', { lineHeight: '1.35rem', letterSpacing: '0.025em', fontFamily: 'JetBrains Mono, monospace' }], // 15px
        
        // Headings with consistent letter-spacing
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.02em' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],     // 24px
        
        // H2: 28-32px
        'h2': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }],  // 28px
        'h2-lg': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],    // 32px
        
        // H1: 36-44px  
        'h1': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.03em' }],   // 36px
        'h1-lg': ['2.75rem', { lineHeight: '3.25rem', letterSpacing: '-0.035em' }], // 44px
        // Large display sizes
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],    // 36px (H1 base)
        '5xl': ['3rem', { lineHeight: '3.25rem', letterSpacing: '-0.035em' }],     // 48px
        '6xl': ['3.75rem', { lineHeight: '4rem', letterSpacing: '-0.04em' }],      // 60px
        '7xl': ['4.5rem', { lineHeight: '4.75rem', letterSpacing: '-0.04em' }],    // 72px
        
        // Responsive display typography
        'display': ['clamp(2.25rem, 6vw, 2.75rem)', { 
          lineHeight: '1.1', 
          letterSpacing: '-0.03em',
          fontFeatureSettings: '"ss01", "cv02", "cv11"'
        }], // H1 responsive: 36-44px
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
