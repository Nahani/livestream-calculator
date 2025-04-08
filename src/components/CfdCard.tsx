import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';
import { useCfdCalculation } from '../hooks/useCfdCalculation';
import { CfdOption } from './cfd/CfdOption';

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

  // Use custom hook for calculations
  const {
    maxLots,
    totalLoss,
    potentialLossWithOneMore,
    canAddOneMore
  } = useCfdCalculation(maxLoss, stopLossPoints);

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
      
      <div className="space-y-4">
        {/* Current optimal option */}
        <CfdOption
          loss={totalLoss}
          maxLoss={maxLoss}
          lots={maxLots}
          darkMode={darkMode}
          t={t}
        />
        
        {/* Option with one more lot */}
        {canAddOneMore && (
          <CfdOption
            loss={potentialLossWithOneMore}
            maxLoss={maxLoss}
            lots={maxLots + 1}
            darkMode={darkMode}
            t={t}
          />
        )}
      </div>

      <p className={`mt-2 text-sm text-center italic ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t.cfd.spreadNote}
        </p>
    </div>
  );
}; 