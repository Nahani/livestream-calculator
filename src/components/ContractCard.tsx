import React from 'react';
import { ContractInfo } from '../types';

interface ContractCardProps {
  symbol: string;
  contract: ContractInfo;
  stopLossPoints: number;
  maxLoss: number;
  darkMode: boolean;
}

interface PositionSizeDisplayProps {
  label: string;
  contracts: number;
  maxLossAmount: number;
  darkMode: boolean;
}

const PositionSizeDisplay: React.FC<PositionSizeDisplayProps> = ({
  label,
  contracts,
  maxLossAmount,
  darkMode
}) => (
  <div className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
    darkMode 
      ? 'bg-gray-800/50 shadow-lg shadow-gray-900/20' 
      : 'bg-white shadow-lg shadow-indigo-100/30'
  }`}>
    <p className={`text-sm font-medium mb-2 transition-colors duration-300 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>{label}</p>
    <div>
      <p className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
        darkMode ? 'text-gray-200' : 'text-gray-900'
      }`}>
        {contracts}
      </p>
      <p className={`text-sm transition-colors duration-300 ${
        darkMode ? 'text-gray-500' : 'text-gray-500'
      }`}>
        Perte max: ${maxLossAmount.toFixed(2)}
      </p>
    </div>
  </div>
);

export const ContractCard: React.FC<ContractCardProps> = ({
  symbol,
  contract,
  stopLossPoints,
  maxLoss,
  darkMode
}) => {
  const calculatePositionSize = (tickValue: number) => {
    if (!stopLossPoints) return 0;
    const lossPerContract = stopLossPoints * tickValue;
    const maxContracts = Math.floor(maxLoss / lossPerContract);
    return Math.max(0, maxContracts);
  };

  const miniContracts = calculatePositionSize(contract.mini);
  const microContracts = calculatePositionSize(contract.micro);

  return (
    <div className={`rounded-2xl p-6 transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-700/50 hover:bg-gray-700/70' 
        : 'bg-gray-50/80 hover:bg-gray-50'
    }`}>
      <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
        darkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {contract.name} ({symbol})
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <PositionSizeDisplay
          label="Mini Contrats"
          contracts={miniContracts}
          maxLossAmount={miniContracts * stopLossPoints * contract.mini}
          darkMode={darkMode}
        />
        <PositionSizeDisplay
          label="Micro Contrats"
          contracts={microContracts}
          maxLossAmount={microContracts * stopLossPoints * contract.micro}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};