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
  <div className={`p-3 rounded-lg shadow-sm transition-colors duration-200 ${
    darkMode ? 'bg-gray-800' : 'bg-white'
  }`}>
    <p className={`text-sm mb-1 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}>{label}</p>
    <div>
      <p className={`text-xl font-bold ${
        darkMode ? 'text-gray-200' : 'text-gray-900'
      }`}>
        {contracts}
      </p>
      <p className={`text-xs text-gray-500`}>
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
    <div className={`rounded-lg p-4 transition-colors duration-200 ${
      darkMode ? 'bg-gray-700' : 'bg-gray-50'
    }`}>
      <h3 className={`text-lg font-semibold mb-3 ${
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