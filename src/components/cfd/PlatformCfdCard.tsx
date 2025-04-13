import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../utils/i18n';
import { CfdOption } from './CfdOption';
import { Platform } from '../../types';
import { useCfdCalculation } from '../../hooks/useCfdCalculation';

interface PlatformCfdCardProps {
  maxLoss: number;
  stopLossPoints: number;
  darkMode: boolean;
  platform: 'FTMO' | 'WGF' | Platform;
  showLogo?: boolean;
}

export const PlatformCfdCard: React.FC<PlatformCfdCardProps> = ({
  maxLoss,
  stopLossPoints,
  darkMode,
  platform,
  showLogo = false
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const platformName = typeof platform === 'string' ? platform : platform.name;
  
  const { maxLots, totalLoss, potentialLossWithOneMore, canAddOneMore } = useCfdCalculation(
    maxLoss,
    stopLossPoints
  );

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
      {showLogo && platformName !== 'FTMO/WGF' && (
        <div className="flex items-center justify-between mb-6">
          <img 
            src={
              platformName === 'FTMO' 
                ? (darkMode ? '/ftmo_logo.svg' : '/ftmo_logo_dark.svg')
                : (darkMode ? '/wgf_logo.svg' : '/wgf_logo_dark.svg')
            }
            alt={platformName === 'FTMO' ? 'FTMO Logo' : 'WGF Logo'}
            className="h-8"
          />
        </div>
      )}
      
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
    </div>
  );
}; 