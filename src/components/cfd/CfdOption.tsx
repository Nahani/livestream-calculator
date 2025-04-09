import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface CfdOptionProps {
  loss: number;
  maxLoss: number;
  lots: number;
  darkMode: boolean;
  t: { cfd: { lots: string } };
}

export const CfdOption: React.FC<CfdOptionProps> = ({
  loss,
  maxLoss,
  lots,
  darkMode,
  t
}) => {
  const exceedsMaxLoss = loss > maxLoss;
  
  return (
    <div 
      className={`overflow-hidden relative rounded-xl ${
        darkMode 
          ? `bg-gray-800 shadow-lg shadow-gray-900/20 ${exceedsMaxLoss ? 'bg-opacity-90' : ''}` 
          : `bg-white shadow-lg shadow-indigo-100/70 border ${exceedsMaxLoss ? 'border-yellow-600' : 'border-gray-200'}`
      } ${exceedsMaxLoss ? 'scale-95 transform' : ''}`}
      style={{ 
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
        backgroundImage: exceedsMaxLoss ? `repeating-linear-gradient(45deg, ${darkMode ? 'rgba(255,255,0,0.03)' : 'rgba(255,204,0,0.04)'} 0px, ${darkMode ? 'rgba(255,255,0,0)' : 'rgba(255,204,0,0)'} 10px)` : 'none'
      }}
    >
      <div className={`flex items-center justify-between ${exceedsMaxLoss ? 'p-3' : 'p-4'}`}>
        <div className="flex items-center">
          <p className={`font-medium ${exceedsMaxLoss ? 'text-base' : 'text-lg'} transition-colors duration-300 ${
            exceedsMaxLoss 
              ? (darkMode ? 'text-yellow-600' : 'text-yellow-500') 
              : (darkMode ? 'text-blue-300' : 'text-indigo-900')
          }`}>
            ${loss.toFixed(0)}
          </p>
          {exceedsMaxLoss && (
            <AlertTriangle 
              className={`w-4 h-4 ml-2 ${
                darkMode ? 'text-yellow-600' : 'text-yellow-500'
              }`}
              aria-label="Exceeds maximum allowed loss"
            />
          )}
        </div>
        <div className={`relative ${exceedsMaxLoss ? 'opacity-90' : ''}`}>
          <div className={`flex items-center justify-center ${exceedsMaxLoss ? 'h-14 px-3' : 'h-16 px-4'} rounded-lg font-bold ${exceedsMaxLoss ? 'text-2xl' : 'text-3xl'} ${
            darkMode 
              ? `bg-gradient-to-r ${exceedsMaxLoss ? 'from-green-700/80 to-green-600/80' : 'from-green-700 to-green-600'} text-white` 
              : `bg-gradient-to-r ${exceedsMaxLoss ? 'from-green-700/80 to-green-600/80' : 'from-green-700 to-green-600'} text-white`
          }`}>
            {lots}
          </div>
          <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
            darkMode ? 'bg-green-800 text-green-100' : 'bg-green-200 text-green-800'
          }`}>
            {t.cfd.lots}
          </span>
        </div>
      </div>
      <div className={`absolute top-0 bottom-0 w-1 ${exceedsMaxLoss ? 'opacity-100' : ''} ${
        exceedsMaxLoss 
          ? `${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'}`
          : (darkMode ? 'bg-green-600' : 'bg-green-600')
      }`}></div>
    </div>
  );
}; 