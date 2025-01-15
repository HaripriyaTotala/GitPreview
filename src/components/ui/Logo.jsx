import React, { useState, useEffect } from 'react';
import { Github } from 'lucide-react';

const Logo = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2600); // Wait for typewriter animation to complete

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center mb-8 animate-fadeIn">
      <div className="flex items-center space-x-2 mb-2">
        <Github className="h-12 w-12 text-gray-900 dark:text-indigo-600" />
        <div className="relative">
          <h1 className={`text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-indigo-600 dark:to-blue-500 text-transparent bg-clip-text
                       ${animationComplete ? '' : 'animate-type overflow-hidden whitespace-nowrap'}`}>
            GitPreview
            <span className={`${animationComplete ? 'hidden' : 'animate-cursor text-gray-900 dark:text-blue-500'}`}>|</span>
          </h1>
        </div>
      </div>
      <p className="text-gray-900 dark:text-gray-400 text-center animate-fadeIn delay-[1.5s] opacity-0">
        Explore, analyze, and preview GitHub repositories with ease
      </p>
    </div>
  );
};

export default Logo; 