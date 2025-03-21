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
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto p-2 md:p-4">
        <div className={`rounded-2xl shadow-2xl backdrop-blur-sm p-4 md:p-6 transition-all duration-300 animate-scale-in ${
          darkMode 
            ? 'bg-gray-800/90 shadow-gray-900/50' 
            : 'bg-white/90 shadow-indigo-100/50'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 animate-slide-in">
              <div className={`p-2 rounded-xl transition-colors duration-300 ${
                darkMode ? 'bg-blue-500/10' : 'bg-indigo-500/10'
              }`}>
                <Calculator className={`w-6 h-6 transition-colors duration-300 ${
                  darkMode ? 'text-blue-400' : 'text-indigo-600'
                }`} />
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold tracking-wider transition-colors duration-300 ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm'
              }`}>
                LIVESTREAM CALCULATOR
              </h1>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 animate-fade-in">
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
            <div className="animate-fade-in">
              <div className={`mb-6 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                darkMode 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' 
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50'
              }`}>
                <h2 className={`text-base font-medium mb-1 transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-indigo-900'
                }`}>
                  Perte Maximale Autorisée
                </h2>
                <p className={`text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? 'text-blue-400' : 'text-indigo-600'
                }`}>
                  ${maxLoss.toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(CONTRACTS).map(([symbol, contract], index) => (
                  <div key={symbol} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;