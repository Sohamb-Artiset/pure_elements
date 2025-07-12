import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img 
          src="https://jvirnmqoonkauanvslun.supabase.co/storage/v1/object/public/logo//logo-for-loader.jpg"
          alt="Pure Elements Logo"
          className="w-100 h-100 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default LoadingScreen; 