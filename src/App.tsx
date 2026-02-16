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
import { useLanguage } from "./contexts/LanguageContext";
import { translations } from "./utils/i18n";

function App() {
  const { darkMode } = useTheme();
  const { user, loading } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];
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

      <div className="flex justify-center mt-8">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-all duration-300 ${
          darkMode
            ? "bg-gray-800/50 text-gray-400 border border-gray-700/50"
            : "bg-gray-50 text-gray-500 border border-gray-200/50"
        }`}>
          <svg className={`w-4 h-4 flex-shrink-0 ${darkMode ? "text-blue-400/70" : "text-blue-500"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t.disclaimer}</span>
        </div>
      </div>
    </Layout>
  );
}

export default App;