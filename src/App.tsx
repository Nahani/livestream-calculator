import React, { useState } from 'react';
import { Calculator, Moon, Sun } from 'lucide-react';
import { CONTRACTS } from './constants/contracts';
import { NumberInput } from './components/NumberInput';
import { ContractCard } from './components/ContractCard';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const {
    drawdown,
    setDrawdown,
    stopLoss,
    setStopLoss,
    maxLoss,
    stopLossPoints
  } = useCalculator();
  
  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900'
    }`}>
      <div className="max-w-3xl mx-auto p-4 md:p-8">
        <div className={`rounded-2xl shadow-xl p-6 md:p-8 transition-colors duration-200 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Calculator className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-indigo-600'}`} />
              <h1 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                LIVESTREAM TRADER
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
          </div>

          {drawdown && stopLoss && (
            <>
              <div className={`mb-8 p-4 rounded-lg transition-colors duration-200 ${
                darkMode ? 'bg-gray-700' : 'bg-indigo-50'
              }`}>
                <h2 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-gray-200' : 'text-indigo-900'
                }`}>
                  Perte Maximale Autorisée
                </h2>
                <p className={`text-2xl font-bold ${
                  darkMode ? 'text-blue-400' : 'text-indigo-600'
                }`}>
                  ${maxLoss.toFixed(2)}
                </p>
              </div>

              <div className="space-y-6">
                {Object.entries(CONTRACTS).map(([symbol, contract]) => (
                  <ContractCard
                    key={symbol}
                    symbol={symbol}
                    contract={contract}
                    stopLossPoints={stopLossPoints}
                    maxLoss={maxLoss}
                    darkMode={darkMode}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;