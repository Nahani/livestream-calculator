import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import { Layout } from "./components/Layout";
import { Header } from "./components/Header";
import { InputForm } from "./components/InputForm";
import { MaxLossDisplay } from "./components/MaxLossDisplay";
import { ContractList } from "./components/ContractList";
import { CfdCard } from "./components/CfdCard";
import { LoginForm } from "./components/LoginForm";
import { useTheme } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { isCfdPlatform } from "./utils/calculatorUtils";
import { SEO } from "./components/SEO";

function App() {
  const { darkMode } = useTheme();
  const { user, loading } = useAuth();
  const {
    drawdown,
    setDrawdown,
    stopLoss,
    setStopLoss,
    platform,
    setPlatform,
    maxLoss,
    stopLossPoints,
    lossMode,
    setLossMode,
    acceptedLoss,
    setAcceptedLoss
  } = useCalculator();

  const hasInput = lossMode === "manual"
    ? acceptedLoss && stopLoss
    : drawdown && stopLoss;

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
        lossMode={lossMode}
        setLossMode={setLossMode}
        acceptedLoss={acceptedLoss}
        setAcceptedLoss={setAcceptedLoss}
      />

      {hasInput && (
        <div className="animate-fade-in">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : !user ? (
            <LoginForm />
          ) : (
            <>
              <MaxLossDisplay
                maxLoss={maxLoss}
                platform={platform}
                lossMode={lossMode}
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
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default App;