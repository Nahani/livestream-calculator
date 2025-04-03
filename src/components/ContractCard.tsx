import React from 'react';
import { ContractInfo } from '../types';
import { calculateMaxContracts, calculateAdditionalMicroContracts } from '../utils/calculatorUtils';

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
  // Utilisation des fonctions utilitaires
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
  
  // Micro contrats additionnels à utiliser avec les mini contrats
  const additionalMicros = calculateAdditionalMicroContracts(
    maxLoss,
    maxMiniContracts,
    stopLossPoints,
    contract.mini,
    contract.micro
  );
  
  // Déterminer s'il faut utiliser des mini contrats
  const useMini = maxMiniContracts > 0;
  
  // Calculer la perte totale potentielle
  const totalLoss = (maxMiniContracts * stopLossPoints * contract.mini) + 
                    (additionalMicros * stopLossPoints * contract.micro);

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-700/50 hover:bg-gray-700/70' 
        : 'bg-gray-50/80 hover:bg-gray-50'
    }`}>
      <h3 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {contract.name} ({symbol})
      </h3>
      
      {useMini && additionalMicros > 0 ? (
        <div className={`overflow-hidden relative rounded-xl transition-all duration-300 ${
          darkMode 
            ? 'bg-gradient-to-r from-gray-800 to-gray-800/70 shadow-lg shadow-gray-900/20' 
            : 'bg-gradient-to-r from-white to-gray-50 shadow-lg shadow-indigo-100/30'
        }`}>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className={`font-medium transition-colors duration-300 ${
                darkMode ? 'text-blue-300' : 'text-indigo-900'
              }`}>
                ${totalLoss.toFixed(2)}
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
                  MINI
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
                  MICRO
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
            <div className={`overflow-hidden relative rounded-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-800 to-gray-800/70 shadow-lg shadow-gray-900/20' 
                : 'bg-gradient-to-r from-white to-gray-50 shadow-lg shadow-indigo-100/30'
            }`}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-blue-300' : 'text-indigo-900'
                  }`}>
                    ${(maxMiniContracts * stopLossPoints * contract.mini).toFixed(2)}
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
                    MINI
                  </span>
                </div>
              </div>
              <div className={`absolute top-0 bottom-0 w-1 ${
                darkMode ? 'bg-blue-600' : 'bg-indigo-600'
              }`}></div>
            </div>
          )}
          
          {!useMini && (
            <div className={`overflow-hidden relative rounded-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-gray-800 to-gray-800/70 shadow-lg shadow-gray-900/20' 
                : 'bg-gradient-to-r from-white to-gray-50 shadow-lg shadow-indigo-100/30'
            }`}>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className={`font-medium transition-colors duration-300 ${
                    darkMode ? 'text-blue-300' : 'text-indigo-900'
                  }`}>
                    ${(maxMicroContracts * stopLossPoints * contract.micro).toFixed(2)}
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
                    MICRO
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