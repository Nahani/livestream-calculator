import React from 'react';
import { useCalculator } from './hooks/useCalculator';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { MaxLossDisplay } from './components/MaxLossDisplay';
import { ContractList } from './components/ContractList';
import { useTheme } from './contexts/ThemeContext';

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

          <ContractList 
            stopLossPoints={stopLossPoints}
            maxLoss={maxLoss}
            darkMode={darkMode}
          />
        </div>
      )}
    </Layout>
  );
}

export default App;