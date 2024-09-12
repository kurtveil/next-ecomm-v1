// components/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
    </div>
  );
};

export default LoadingSpinner;
