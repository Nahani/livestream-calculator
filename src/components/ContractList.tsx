import React from 'react';
import { ContractCard } from './ContractCard';
import { CONTRACTS } from '../constants/contracts';

interface ContractListProps {
  stopLossPoints: number;
  maxLoss: number;
  darkMode: boolean;
}

export const ContractList: React.FC<ContractListProps> = ({ 
  stopLossPoints, 
  maxLoss, 
  darkMode 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(CONTRACTS).map(([symbol, contract], index) => (
        <div 
          key={symbol} 
          className="animate-fade-in" 
          style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
        >
          <ContractCard
            symbol={symbol}
            contract={contract}
            stopLossPoints={stopLossPoints}
            maxLoss={maxLoss}
            darkMode={darkMode}
          />
        </div>
      ))}
    </div>
  );
}; 