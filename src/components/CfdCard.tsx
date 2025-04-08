import React from 'react';
import { calculateCfdLots } from '../utils/calculatorUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';

interface CfdCardProps {
  maxLoss: number;
  stopLossPoints: number;
  darkMode: boolean;
}

export const CfdCard: React.FC<CfdCardProps> = ({
  maxLoss,
  stopLossPoints,
  darkMode
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Calculate maximum lots for CFD platforms
  const maxLots = calculateCfdLots(maxLoss, stopLossPoints);
  
  // Calculate the total potential loss
  const totalLoss = stopLossPoints ? maxLots * stopLossPoints : 0;
  
  return (
    <div 
      className={`rounded-2xl p-6 ${
        darkMode 
          ? 'bg-gray-700/50 hover:bg-gray-700/70' 
          : 'bg-gray-100 hover:bg-gray-50'
      }`}
      style={{ 
        transition: 'background-color 0.3s ease',
        outline: 'none',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      <h3 className={`text-xl font-semibold mb-6 ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}
        style={{ transition: 'color 0.3s ease' }}
      >
        {t.cfd.title}
      </h3>
      
      <div 
        className={`overflow-hidden relative rounded-xl ${
          darkMode 
            ? 'bg-gray-800 shadow-lg shadow-gray-900/20' 
            : 'bg-white shadow-lg shadow-indigo-100/70 border border-gray-200'
        }`}
        style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
      >
        <div className="flex items-center justify-between p-4">
          <div>
            <p className={`font-medium text-lg transition-colors duration-300 ${
              darkMode ? 'text-blue-300' : 'text-indigo-900'
            }`}>
              ${totalLoss.toFixed(0)}
            </p>
          </div>
          <div className="relative">
            <div className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-green-700 to-green-600 text-white' 
                : 'bg-gradient-to-r from-green-700 to-green-600 text-white'
            }`}>
              {maxLots}
            </div>
            <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
              darkMode ? 'bg-green-800 text-green-100' : 'bg-green-200 text-green-800'
            }`}>
              {t.cfd.lots}
            </span>
          </div>
        </div>
        <div className={`absolute top-0 bottom-0 w-1 ${
          darkMode ? 'bg-green-600' : 'bg-green-600'
        }`}></div>
        
      </div>
      <p className={`mt-2 text-sm text-center ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t.cfd.spreadNote}
        </p>
    </div>
  );
}; 