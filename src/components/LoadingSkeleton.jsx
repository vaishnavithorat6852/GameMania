import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden relative shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="flex space-x-2">
            <div className="h-4 w-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-4 w-6 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        <div className="flex justify-between items-center mt-4 pt-2">
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
