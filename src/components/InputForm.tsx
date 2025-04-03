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

  const platformOptions = [
    { value: 'TopStep', label: 'TopStep' },
    { value: 'FTMO', label: 'FTMO' },
    { value: 'WGF', label: 'WGF' },
    { value: 'UFUNDED', label: 'UFUNDED' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
      <NumberInput
        label={t.drawdown.label}
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
        value={platform}
        onChange={(value) => setPlatform(value as Platform)}
        options={platformOptions}
        darkMode={darkMode}
      />
    </div>
  );
}; 