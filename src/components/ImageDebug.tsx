import React from 'react';

interface ImageDebugProps {
  src: string;
  name: string;
}

export const ImageDebug: React.FC<ImageDebugProps> = ({ src, name }) => {
  const [status, setStatus] = React.useState<'loading' | 'loaded' | 'error'>('loading');
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    setStatus('loading');
    setError('');
    
    const img = new Image();
    img.onload = () => {
      console.log(`✅ Image loaded successfully: ${src}`);
      console.log(`   Dimensions: ${img.naturalWidth}x${img.naturalHeight}`);
      setStatus('loaded');
    };
    img.onerror = (e) => {
      console.error(`❌ Image failed to load: ${src}`, e);
      setError(`Failed to load image: ${src}`);
      setStatus('error');
    };
    img.src = src;
  }, [src]);

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border z-50 max-w-sm">
      <h3 className="font-semibold text-sm mb-2">Image Debug: {name}</h3>
      <div className="space-y-2 text-xs">
        <div>
          <strong>Path:</strong> {src}
        </div>
        <div>
          <strong>Status:</strong> 
          <span className={`ml-1 px-2 py-1 rounded text-xs ${
            status === 'loaded' ? 'bg-green-100 text-green-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
        {error && (
          <div className="text-red-600">
            <strong>Error:</strong> {error}
          </div>
        )}
        <div className="mt-2">
          <strong>Test Image:</strong>
          <img 
            src={src} 
            alt="Debug test" 
            className="w-16 h-16 object-cover rounded mt-1 border"
            onLoad={() => console.log('Debug img loaded')}
            onError={() => console.log('Debug img failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageDebug;
