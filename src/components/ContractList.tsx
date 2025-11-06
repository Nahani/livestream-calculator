import React from 'react';
import { ContractCard } from './ContractCard';
import { CONTRACTS } from '../constants/contracts';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';

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
  const { language } = useLanguage();
  const t = translations[language];

  // Group contracts by category
  const indices = ['NQ', 'ES', 'YM'];
  const commodities = ['GC', 'CL'];
  const currencies = ['6E'];

  const indicesContracts = Object.entries(CONTRACTS).filter(([symbol]) =>
    indices.includes(symbol)
  );

  const commoditiesContracts = Object.entries(CONTRACTS).filter(([symbol]) =>
    commodities.includes(symbol)
  );

  const currenciesContracts = Object.entries(CONTRACTS).filter(([symbol]) =>
    currencies.includes(symbol)
  );

  const renderContractGroup = (
    contracts: [string, typeof CONTRACTS[string]][],
    startIndex: number
  ) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contracts.map(([symbol, contract], index) => (
        <div
          key={symbol}
          className="animate-fade-in"
          style={{
            animationDelay: `${(startIndex + index) * 150}ms`,
            animationFillMode: 'both'
          }}
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

  return (
    <div className="space-y-8">
      {/* Indices Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400/50 to-transparent'}`} />
          <h2 className={`px-6 text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {t.sections.indices}
          </h2>
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-blue-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-400/50 to-transparent'}`} />
        </div>
        {renderContractGroup(indicesContracts, 0)}
      </div>

      {/* Commodities Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent'}`} />
          <h2 className={`px-6 text-lg font-semibold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
            {t.sections.commodities}
          </h2>
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-amber-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-amber-400/50 to-transparent'}`} />
        </div>
        {renderContractGroup(commoditiesContracts, indicesContracts.length)}
      </div>

      {/* Currencies Section */}
      <div>
        <div className="flex items-center mb-6">
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent'}`} />
          <h2 className={`px-6 text-lg font-semibold ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            {t.sections.currencies}
          </h2>
          <div className={`flex-grow h-px ${darkMode ? 'bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent' : 'bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent'}`} />
        </div>
        {renderContractGroup(currenciesContracts, indicesContracts.length + commoditiesContracts.length)}
      </div>
    </div>
  );
}; 