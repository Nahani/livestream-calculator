import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { trackYoutubeClick } from '../utils/analytics';

export const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  const handleYoutubeClick = () => {
    trackYoutubeClick();
  };

  return (
    <footer className={`py-1 md:py-2 text-[10px] md:text-xs ${
      darkMode ? 'text-gray-400 bg-gray-900/80' : 'text-gray-600 bg-white/95'
    } backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-2 md:px-4 flex justify-between items-center">
        <div className="text-left md:text-center flex-1">
          <p>Copyright © 2025 LiveStreamTRADERS™</p>
          <p>Ashengen FZCO , DSO-IFZA, Dubai Silicon Oasis - Dubai - UAE</p>
          <p>License No : 5224</p>
        </div>
        <div className="flex-1 flex justify-end">
          <a 
            href="https://www.youtube.com/@romainbailleul" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleYoutubeClick}
            className={`hover:opacity-80 transition-opacity flex items-center space-x-1 md:space-x-2 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}
            title="Visiter la chaîne YouTube de Romain Bailleul"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 md:h-8 md:w-8" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span className="text-[10px] md:text-sm">Romain Bailleul</span>
          </a>
        </div>
      </div>
    </footer>
  );
}; 