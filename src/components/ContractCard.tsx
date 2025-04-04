import React from 'react';
import { ContractInfo } from '../types';
import { calculateMaxContracts, calculateAdditionalMicroContracts } from '../utils/calculatorUtils';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';

interface ContractCardProps {
  symbol: string;
  contract: ContractInfo;
  stopLossPoints: number;
  maxLoss: number;
  darkMode: boolean;
}

export const ContractCard: React.FC<ContractCardProps> = ({
  symbol,
  contract,
  stopLossPoints,
  maxLoss,
  darkMode
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Using utility functions
  const maxMiniContracts = calculateMaxContracts(
    stopLossPoints,
    contract.mini,
    maxLoss
  );

  const maxMicroContracts = calculateMaxContracts(
    stopLossPoints,
    contract.micro,
    maxLoss
  );
  
  // Additional micro contracts to use with mini contracts
  const additionalMicros = calculateAdditionalMicroContracts(
    maxLoss,
    maxMiniContracts,
    stopLossPoints,
    contract.mini,
    contract.micro
  );
  
  // Determine if we should use mini contracts
  const useMini = maxMiniContracts > 0;
  
  // Calculate the total potential loss
  const totalLoss = (maxMiniContracts * stopLossPoints * contract.mini) + 
                    (additionalMicros * stopLossPoints * contract.micro);

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
        {contract.name} ({symbol})
      </h3>
      
      {useMini && additionalMicros > 0 ? (
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
              <p className={`font-medium transition-colors duration-300 ${
                darkMode ? 'text-blue-300' : 'text-indigo-900'
              }`}>
                ${totalLoss.toFixed(0)}
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <div className={`flex items-center justify-center h-16 px-4 rounded-l-lg font-bold text-3xl ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white'
                }`}>
                  {maxMiniContracts}
                </div>
                <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                  darkMode ? 'bg-blue-800 text-blue-100' : 'bg-indigo-200 text-indigo-800'
                }`}>
                  {t.contracts.mini}
                </span>
              </div>
              <div className={`flex items-center justify-center h-16 px-3 font-bold text-2xl ${
                darkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                +
              </div>
              <div className="relative">
                <div className={`flex items-center justify-center h-16 px-4 rounded-r-lg font-bold text-3xl ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white' 
                    : 'bg-gradient-to-r from-purple-700 to-purple-600 text-white'
                }`}>
                  {additionalMicros}
                </div>
                <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                  darkMode ? 'bg-purple-800 text-purple-100' : 'bg-purple-200 text-purple-800'
                }`}>
                  {t.contracts.micro}
                </span>
              </div>
            </div>
          </div>
          <div className={`absolute top-0 bottom-0 w-1 ${
            darkMode ? 'bg-gradient-to-b from-blue-600 to-purple-600' : 'bg-gradient-to-b from-indigo-600 to-purple-600'
          }`}></div>
        </div>
      ) : (
        <div>
          {useMini && (
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
                  <p className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-blue-300' : 'text-indigo-900'
                  }`}>
                    ${(maxMiniContracts * stopLossPoints * contract.mini).toFixed(0)}
                  </p>
                </div>
                <div className="relative">
                  <div className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-3xl ${
                    darkMode 
                      ? 'bg-gradient-to-r from-blue-700 to-blue-600 text-white' 
                      : 'bg-gradient-to-r from-indigo-700 to-indigo-600 text-white'
                  }`}>
                    {maxMiniContracts}
                  </div>
                  <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                    darkMode ? 'bg-blue-800 text-blue-100' : 'bg-indigo-200 text-indigo-800'
                  }`}>
                    {t.contracts.mini}
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 bottom-0 w-1 ${
                darkMode ? 'bg-blue-600' : 'bg-indigo-600'
              }`}></div>
            </div>
          )}
          
          {!useMini && (
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
                  <p className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-blue-300' : 'text-indigo-900'
                  }`}>
                    ${(maxMicroContracts * stopLossPoints * contract.micro).toFixed(0)}
                  </p>
                </div>
                <div className="relative">
                  <div className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-3xl ${
                    darkMode 
                      ? 'bg-gradient-to-r from-purple-700 to-purple-600 text-white' 
                      : 'bg-gradient-to-r from-purple-700 to-purple-600 text-white'
                  }`}>
                    {maxMicroContracts}
                  </div>
                  <span className={`absolute -top-2 -left-1 rounded-full text-xs px-2 py-1 font-semibold ${
                    darkMode ? 'bg-purple-800 text-purple-100' : 'bg-purple-200 text-purple-800'
                  }`}>
                    {t.contracts.micro}
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 bottom-0 w-1 ${
                darkMode ? 'bg-purple-600' : 'bg-purple-600'
              }`}></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};