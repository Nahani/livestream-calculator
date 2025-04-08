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
          ? 'bg-gray-800 shadow-lg shadow-gray-900/20' 
          : 'bg-white shadow-lg shadow-indigo-100/70 border border-gray-200'
      }`}
      style={{ transition: 'background-color 0.3s ease, box-shadow 0.3s ease' }}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <p className={`font-medium text-lg transition-colors duration-300 ${
            darkMode ? 'text-blue-300' : 'text-indigo-900'
          }`}>
            ${loss.toFixed(0)}
          </p>
          {exceedsMaxLoss && (
            <AlertTriangle 
              className={`w-4 h-4 ml-2 ${
                darkMode ? 'text-yellow-400' : 'text-yellow-500'
              }`}
              aria-label="Exceeds maximum allowed loss"
            />
          )}
        </div>
        <div className="relative">
          <div className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-3xl ${
            darkMode 
              ? 'bg-gradient-to-r from-green-700 to-green-600 text-white' 
              : 'bg-gradient-to-r from-green-700 to-green-600 text-white'
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
      <div className={`absolute top-0 bottom-0 w-1 ${
        darkMode ? 'bg-green-600' : 'bg-green-600'
      }`}></div>
    </div>
  );
}; 