import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-8 h-8 border-4 border-t-4 border-blue-500 dark:border-blue-300 border-solid rounded-full animate-spin"></div>
      <span className="text-blue-500 dark:text-blue-300">Loading...</span>
    </div>
  );
};

export default LoadingAnimation;
