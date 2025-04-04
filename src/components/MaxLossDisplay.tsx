import React from 'react';
import { Platform } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';
interface MaxLossDisplayProps {
  maxLoss: number;
  platform: Platform;
}

export const MaxLossDisplay: React.FC<MaxLossDisplayProps> = ({ maxLoss, platform }) => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  
  const title = t.maxLoss.title;
    
  const explanation = t.maxLoss.calculatedWith(platform);

  return (
    <div className={`mb-6 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
      darkMode 
        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
        : 'bg-gradient-to-r from-indigo-50 to-purple-50'
    }`}>
      <h2 className={`text-base font-medium mb-1 transition-colors duration-300 ${
        darkMode ? 'text-gray-300' : 'text-indigo-900'
      }`}>
        {title}
      </h2>
      <p className={`text-2xl font-bold transition-colors duration-300 ${
        darkMode ? 'text-blue-400' : 'text-indigo-600'
      }`}>
        ${maxLoss.toFixed(2)}
      </p>
      <p className={`text-sm transition-colors duration-300 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {explanation}
      </p>
    </div>
  );
}; 