import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3 animate-slide-in">
        <div className={`p-2 rounded-xl transition-colors duration-300 ${
          darkMode ? 'bg-blue-500/10' : 'bg-indigo-500/10'
        }`}>
          <svg 
            width="24"
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors duration-300 ${
              darkMode ? 'text-blue-400' : 'text-indigo-600'
            }`}
          >
            <path d="M5 7H7V17H5V7ZM1 10H3V14H1V10ZM9 2H11V20H9V2ZM13 4H15V22H13V4ZM17 7H19V17H17V7ZM21 10H23V14H21V10Z" fill="currentColor"></path>
          </svg>
        </div>
        <h1 className={`text-2xl md:text-3xl font-extrabold tracking-wider transition-colors duration-300 ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg' 
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm'
        }`}>
          LIVESTREAM CALCULATOR
        </h1>
      </div>
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
  );
}; 