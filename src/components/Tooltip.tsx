import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="hidden sm:block">
          <div
            className={`absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-full -top-2 left-1/2 transition-all duration-200 whitespace-nowrap ${
              darkMode
                ? 'bg-gray-800 text-gray-100 shadow-gray-900/50'
                : 'bg-white text-gray-800 shadow-gray-200/50'
            }`}
          >
            <div className="relative">
              {text}
              <div
                className={`absolute w-2 h-2 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2 ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 