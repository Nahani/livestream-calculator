import React from 'react';
import { Platform } from '../types';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';

interface InputFormProps {
  drawdown: string;
  setDrawdown: (value: string) => void;
  stopLoss: string;
  setStopLoss: (value: string) => void;
  platform: Platform;
  setPlatform: (value: Platform) => void;
}

interface PlatformOption {
  value: Platform['name'];
  label: string;
}

export const InputForm: React.FC<InputFormProps> = ({
  drawdown,
  setDrawdown,
  stopLoss,
  setStopLoss,
  platform,
  setPlatform
}) => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const platformOptions: PlatformOption[] = [
    { value: 'TopStep/APEX', label: 'TopStep / APEX' },
    { value: 'FTMO/WGF', label: 'FTMO / WGF' },
    { value: 'UFUNDED', label: 'UFUNDED' }
  ];

  const divisorOptions = [
    { value: '5', label: '20% (5 SL)' },
    { value: '10', label: '10% (10 SL)' },
    { value: '15', label: '6.66% (15 SL)' }
  ];

  const handlePlatformChange = (value: string) => {
    let newDivisor: 5 | 10 | 15;
    if (value === 'UFUNDED') {
      newDivisor = 15;
    } else if (value === 'TopStep/APEX') {
      newDivisor = 10;
    } else {
      newDivisor = 10;
    }
    setPlatform({
      name: value as Platform['name'],
      drawdownDivisor: newDivisor
    });
  };

  const handleDivisorChange = (value: string) => {
    setPlatform({
      name: platform.name,
      drawdownDivisor: parseInt(value) as 5 | 10 | 15
    });
  };

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 animate-fade-in">
        <NumberInput
          label={t.drawdown.label + ' *'}
          value={drawdown}
          onChange={setDrawdown}
          placeholder={t.drawdown.placeholder}
          prefix="$"
          darkMode={darkMode}
        />
      <NumberInput
        label={t.stopLoss.label}
        value={stopLoss}
        onChange={setStopLoss}
        placeholder={t.stopLoss.placeholder}
        darkMode={darkMode}
      />
      <Select
        label={t.platform.label}
        value={platform.name}
        onChange={handlePlatformChange}
        options={platformOptions}
        darkMode={darkMode}
      />
      <Select
        label={t.drawdownDivisor.label}
        value={platform.drawdownDivisor.toString()}
        onChange={handleDivisorChange}
        options={divisorOptions}
        darkMode={darkMode}
      />
    </div>
    <p className={`text-[0.6rem] sm:text-[0.7rem] italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          * {t.challengeNote.text}
        </p>
    </>
  );
}; 