import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface TranslationContract {
  mini: string;
  micro: string;
}

interface ContractOptionProps {
  loss: number;
  maxLoss: number;
  miniCount: number;
  microCount: number;
  darkMode: boolean;
  t: { contracts: TranslationContract };
  borderColor?: string;
}

export const ContractOption: React.FC<ContractOptionProps> = ({
  loss,
  maxLoss,
  miniCount,
  microCount,
  darkMode,
  t,
  borderColor
}) => {
  const showMini = miniCount > 0;
  const showMicro = microCount > 0;
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
        <div className="flex items-center">
          {showMini && (
            <div className="relative">
              <div className={`flex items-center justify-center ${exceedsMaxLoss ? 'h-14 px-3' : 'h-16 px-4'} ${!showMicro ? 'rounded-lg' : 'rounded-l-lg'} font-bold ${exceedsMaxLoss ? 'text-2xl' : 'text-3xl'} ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white' 
                  : 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white'
              }`}>
                {miniCount}
              </div>
              <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                darkMode ? 'bg-blue-800 text-blue-100' : 'bg-indigo-200 text-indigo-800'
              }`}>
                {t.contracts.mini}
              </span>
            </div>
          )}
          
          {showMini && showMicro && (
            <div className={`flex items-center justify-center ${exceedsMaxLoss ? 'h-14 px-2' : 'h-16 px-3'} font-bold ${exceedsMaxLoss ? 'text-xl' : 'text-2xl'} ${
              darkMode 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}>
              +
            </div>
          )}
          
          {showMicro && (
            <div className="relative">
              <div className={`flex items-center justify-center ${exceedsMaxLoss ? 'h-14 px-3' : 'h-16 px-4'} ${!showMini ? 'rounded-lg' : 'rounded-r-lg'} font-bold ${exceedsMaxLoss ? 'text-2xl' : 'text-3xl'} ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white' 
                  : 'bg-gradient-to-r from-purple-700 to-purple-600 text-white'
              }`}>
                {microCount}
              </div>
              <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                darkMode ? 'bg-purple-800 text-purple-100' : 'bg-purple-200 text-purple-800'
              }`}>
                {t.contracts.micro}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={`absolute top-0 bottom-0 w-1 ${
        exceedsMaxLoss 
          ? `${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'} ${exceedsMaxLoss ? '' : ''}`
          : (borderColor || (
              showMini && showMicro 
                ? darkMode ? 'bg-gradient-to-b from-blue-600 to-purple-600' : 'bg-gradient-to-b from-indigo-600 to-purple-600'
                : showMini 
                  ? darkMode ? 'bg-blue-600' : 'bg-indigo-600'
                  : darkMode ? 'bg-purple-600' : 'bg-purple-600'
            )
          )
      }`}></div>
    </div>
  );
}; 