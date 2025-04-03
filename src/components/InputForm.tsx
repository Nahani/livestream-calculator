import React from 'react';
import { Platform } from '../types';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { useTheme } from '../contexts/ThemeContext';

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

  const platformOptions = [
    { value: 'TopStep', label: 'TopStep' },
    { value: 'FTMO', label: 'FTMO' },
    { value: 'WGF', label: 'WGF' },
    { value: 'UFUNDED', label: 'UFUNDED' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 animate-fade-in">
      <NumberInput
        label="Drawdown Restant ($)"
        value={drawdown}
        onChange={setDrawdown}
        placeholder="Entrez le drawdown restant"
        prefix="$"
        darkMode={darkMode}
      />
      <NumberInput
        label="Stop Loss (points)"
        value={stopLoss}
        onChange={setStopLoss}
        placeholder="Entrez votre stop loss"
        darkMode={darkMode}
      />
      <Select
        label="Plateforme"
        value={platform}
        onChange={(value) => setPlatform(value as Platform)}
        options={platformOptions}
        darkMode={darkMode}
      />
    </div>
  );
}; 