import React from 'react';
import { motion } from 'framer-motion';

interface AvatarProps {
  src?: string;
  alt?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-20 h-20', 
  lg: 'w-32 h-32 md:w-40 md:h-40',
  xl: 'w-48 h-48'
};

const iconSizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16 md:w-20 md:h-20', 
  xl: 'w-24 h-24'
};

const textSizes = {
  sm: 'text-xs',
  md: 'text-lg',
  lg: 'text-2xl md:text-3xl',
  xl: 'text-4xl'
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  showStatus = false,
  className = ''
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState(src);

  // Reset error state when src changes and try fallback paths
  React.useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
    
    if (src) {
      // Try multiple possible paths
      const possiblePaths = [
        src, // Original path
        src.startsWith('/') ? src : `/${src}`, // Ensure leading slash
        `/modern-resume${src.startsWith('/') ? src : `/${src}`}`, // With base path
        `${window.location.pathname}${src.replace(/^\//, '')}`, // Relative to current path
      ];
      
      // Remove duplicates
      const uniquePaths = [...new Set(possiblePaths)];
      setCurrentSrc(uniquePaths[0]);
      
      console.log('Trying image paths:', uniquePaths);
    }
  }, [src]);

  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Generate a consistent color based on name
  const getAvatarColor = (fullName: string) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-purple-400 to-purple-600', 
      'from-green-400 to-green-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-pink-400 to-pink-600',
      'from-teal-400 to-teal-600'
    ];
    
    const hash = fullName.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const gradientColor = getAvatarColor(name);
  const shouldShowImage = currentSrc && !imageError;

  const tryNextPath = () => {
    if (src) {
      const possiblePaths = [
        src,
        src.startsWith('/') ? src : `/${src}`,
        `/modern-resume${src.startsWith('/') ? src : `/${src}`}`,
        `${window.location.pathname}${src.replace(/^\//, '')}`,
      ];
      const uniquePaths = [...new Set(possiblePaths)];
      const currentIndex = uniquePaths.indexOf(currentSrc);
      
      if (currentIndex < uniquePaths.length - 1) {
        const nextPath = uniquePaths[currentIndex + 1];
        console.log(`Trying fallback path: ${nextPath}`);
        setCurrentSrc(nextPath);
        setImageError(false);
        setImageLoaded(false);
      } else {
        console.log('All image paths failed, showing initials');
        setImageError(true);
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-800 shadow-lg bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800`}>
        {shouldShowImage ? (
          <>
            <img 
              src={currentSrc}
              alt={alt || `${name} - Professional Photo`}
              className="w-full h-full object-cover"
              onLoad={() => {
                console.log(`✅ Image loaded successfully: ${currentSrc}`);
                setImageLoaded(true);
              }}
              onError={() => {
                console.log(`❌ Image failed to load: ${currentSrc}`);
                tryNextPath();
              }}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
            {!imageLoaded && (
              <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
                <span className={`${textSizes[size]} font-bold text-white`}>
                  {initials}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
            <span className={`${textSizes[size]} font-bold text-white`}>
              {initials}
            </span>
          </div>
        )}
      </div>
      
      {showStatus && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full border-3 border-white dark:border-neutral-900 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </motion.div>
      )}
    </div>
  );
};

// Professional Avatar with enhanced styling for portfolio use
export const ProfessionalAvatar: React.FC<{
  src?: string;
  name: string;
  title: string;
  size?: 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}> = ({ src, name, title, size = 'lg', showBadge = true }) => {
  return (
    <div className="text-center">
      <div className="relative inline-block mb-4">
        <Avatar 
          src={src}
          name={name}
          size={size}
          showStatus={true}
        />
        
        {showBadge && (
          <div className="absolute -bottom-2 -right-2 bg-primary-600 text-white rounded-full p-2 shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
        {name}
      </h3>
      <p className="text-primary-600 dark:text-primary-400 font-medium">
        {title}
      </p>
    </div>
  );
};

export default Avatar;
