import React from 'react';
import { ContractInfo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';
import { useContractCalculation } from '../hooks/useContractCalculation';
import { ContractOption } from './contract/ContractOption';

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

  // Use custom hook for calculations
  const {
    maxMiniContracts,
    maxMicroContracts,
    additionalMicros,
    useMini,
    totalLoss,
    potentialLossWithOneMoreMini,
    potentialLossWithOneMoreMicro,
    potentialLossWithConvertedMini,
    canAddOneMoreMini,
    canAddOneMoreMicro,
    canConvertToMini
  } = useContractCalculation(symbol, contract, stopLossPoints, maxLoss);

  // Render the main display based on contract options
  const renderMainOptions = () => {
    if (useMini && additionalMicros > 0) {
      return (
        <div className="space-y-4">
          {/* Current optimal option */}
          <ContractOption
            loss={totalLoss}
            maxLoss={maxLoss}
            miniCount={maxMiniContracts}
            microCount={additionalMicros}
            darkMode={darkMode}
            t={t}
          />
          
          {/* Additional mini option */}
          {canAddOneMoreMini && (
            <ContractOption
              loss={potentialLossWithOneMoreMini}
              maxLoss={maxLoss}
              miniCount={maxMiniContracts + 1}
              microCount={additionalMicros}
              darkMode={darkMode}
              t={t}
              borderColor={darkMode ? 'bg-blue-600' : 'bg-indigo-600'}
            />
          )}
          
          {/* Additional micro option */}
          {canAddOneMoreMicro && (
            <ContractOption
              loss={potentialLossWithOneMoreMicro}
              maxLoss={maxLoss}
              miniCount={maxMiniContracts}
              microCount={additionalMicros + 1}
              darkMode={darkMode}
              t={t}
              borderColor={darkMode ? 'bg-purple-600' : 'bg-purple-600'}
            />
          )}
          
          {/* Convert micro to mini option */}
          {canConvertToMini && (
            <ContractOption
              loss={potentialLossWithConvertedMini}
              maxLoss={maxLoss}
              miniCount={maxMiniContracts + 1}
              microCount={0}
              darkMode={darkMode}
              t={t}
              borderColor={darkMode ? 'bg-blue-600' : 'bg-indigo-600'}
            />
          )}
        </div>
      );
    } 
    
    if (useMini) {
      return (
        <ContractOption
          loss={maxMiniContracts * stopLossPoints * contract.mini}
          maxLoss={maxLoss}
          miniCount={maxMiniContracts}
          microCount={0}
          darkMode={darkMode}
          t={t}
        />
      );
    }
    
    return (
      <ContractOption
        loss={maxMicroContracts * stopLossPoints * contract.micro}
        maxLoss={maxLoss}
        miniCount={0}
        microCount={maxMicroContracts}
        darkMode={darkMode}
        t={t}
      />
    );
  };

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
      
      {renderMainOptions()}
    </div>
  );
};