import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';
import { Platform } from '../types';
import { PlatformCfdCard } from './cfd/PlatformCfdCard';

interface CfdCardProps {
  maxLoss: number;
  stopLossPoints: number;
  darkMode: boolean;
  platform: Platform;
}

export const CfdCard: React.FC<CfdCardProps> = ({
  maxLoss,
  stopLossPoints,
  darkMode,
  platform
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  // For CFD platform, show separate cards for FTMO and WGF
  if (platform.name === 'CFD') {
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlatformCfdCard
            maxLoss={maxLoss}
            stopLossPoints={stopLossPoints}
            darkMode={darkMode}
            platform="FTMO"
            showLogo={true}
          />
          <PlatformCfdCard
            maxLoss={maxLoss}
            stopLossPoints={stopLossPoints}
            darkMode={darkMode}
            platform="WGF"
            showLogo={true}
          />
        </div>
        <p className={`mt-2 text-sm text-center italic ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {t.cfd.spreadNote}
        </p>
      </>
    );
  }

  // For other platforms, use PlatformCfdCard without logo
  return (
    <>
      <PlatformCfdCard
        maxLoss={maxLoss}
        stopLossPoints={stopLossPoints}
        darkMode={darkMode}
        platform={platform}
      />
      <p className={`mt-2 text-sm text-center italic ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {t.cfd.spreadNote}
      </p>
    </>
  );
}; 