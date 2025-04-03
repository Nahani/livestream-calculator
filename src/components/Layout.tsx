import React, { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-2 md:p-4">
        <div className={`rounded-2xl shadow-2xl backdrop-blur-sm p-4 md:p-6 transition-all duration-300 animate-scale-in ${
          darkMode 
            ? 'bg-gray-800/90 shadow-gray-900/50' 
            : 'bg-white/90 shadow-indigo-100/50'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
}; 