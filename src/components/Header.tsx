import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex flex-col md:flex-row items-center gap-3 animate-slide-in">
        <div className={`p-2 rounded-xl transition-colors duration-300 ${
          darkMode ? 'bg-blue-500/10' : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
        }`}>
          <img 
            src="/logo.png" 
            alt="Livestream Calculator Logo"
            className="w-32 h-10 md:w-50 md:h-15"
          />
        </div>
        <h1 className={`text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wider transition-colors duration-300 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm'
        }`}>
           CALCULATOR
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <LanguageSwitcher /> */}
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}; 