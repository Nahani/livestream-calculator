import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { darkMode } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center justify-center px-3 py-1 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium ${
        darkMode 
          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
      }`}
    >
      {language === 'en' ? 'FR' : 'EN'}
    </button>
  );
}; 