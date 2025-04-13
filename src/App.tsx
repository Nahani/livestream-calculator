import React from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { MaxLossDisplay } from './components/MaxLossDisplay';
import { ContractList } from './components/ContractList';
import { CfdCard } from './components/CfdCard';
import { useTheme } from './contexts/ThemeContext';
import { isCfdPlatform } from './utils/calculatorUtils';
import { SEO } from './components/SEO';

function App() {
  const { darkMode } = useTheme();
  const {
    drawdown,
    setDrawdown,
    stopLoss,
    setStopLoss,
    platform,
    setPlatform,
    maxLoss,
    stopLossPoints
  } = useCalculator();
  
  return (
    <Layout>
      <SEO />
      <Header />
      
      <InputForm
        drawdown={drawdown}
        setDrawdown={setDrawdown}
        stopLoss={stopLoss}
        setStopLoss={setStopLoss}
        platform={platform}
        setPlatform={setPlatform}
      />

      {drawdown && stopLoss && (
        <div className="animate-fade-in">
          <MaxLossDisplay 
            maxLoss={maxLoss} 
            platform={platform} 
          />

          {isCfdPlatform(platform) ? (
            <div className="grid grid-cols-1 gap-4 mb-6">
              <CfdCard
                maxLoss={maxLoss}
                stopLossPoints={stopLossPoints}
                darkMode={darkMode}
                platform={platform}
              />
            </div>
          ) : (
            <ContractList 
              stopLossPoints={stopLossPoints}
              maxLoss={maxLoss}
              darkMode={darkMode}
            />
          )}
        </div>
      )}
    </Layout>
  );
}

export default App;