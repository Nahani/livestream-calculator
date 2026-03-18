import React from "react";
import { ArrowDown } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/i18n";

interface StockResultProps {
  shares: number;
  riskPerShare: number;
  positionValue: number;
  totalRisk: number;
  entryPrice: number;
}

const CIRCLE_RADIUS = 46;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

interface StockRingCardProps {
  sharesCount: number;
  displayShares: string;
  riskPercent: number;
  entryPrice: number;
  riskPerShare: number;
  label: string;
  gradientId: string;
  gradientFrom: string;
  gradientTo: string;
  darkMode: boolean;
  t: typeof translations["en"];
}

const StockRingCard: React.FC<StockRingCardProps> = ({
  sharesCount,
  displayShares,
  riskPercent,
  entryPrice,
  riskPerShare,
  label,
  gradientId,
  gradientFrom,
  gradientTo,
  darkMode,
  t
}) => {
  const position = sharesCount * entryPrice;
  const risk = sharesCount * riskPerShare;
  const dashOffset = CIRCLE_CIRCUMFERENCE * (1 - riskPercent / 100);

  return (
    <div className={`rounded-2xl p-6 flex flex-col items-center transition-all duration-300 ${
      darkMode
        ? "bg-gray-800/80 shadow-xl shadow-black/20 hover:bg-gray-800"
        : "bg-white shadow-xl shadow-indigo-100/40 border border-gray-100 hover:shadow-2xl"
    }`}>
      {/* Label */}
      <span className={`text-xs font-semibold uppercase tracking-widest mb-4 ${
        darkMode ? "text-gray-500" : "text-gray-400"
      }`}>
        {label}
      </span>

      {/* Ring */}
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            strokeWidth="5"
            className={darkMode ? "stroke-gray-700/60" : "stroke-gray-100"}
          />
          <circle
            cx="50"
            cy="50"
            r={CIRCLE_RADIUS}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="animate-circle-reveal"
            style={{
              stroke: `url(#${gradientId})`,
              strokeDasharray: CIRCLE_CIRCUMFERENCE,
              strokeDashoffset: dashOffset,
            }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientFrom} />
              <stop offset="100%" stopColor={gradientTo} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center animate-count-up">
          <span className={`text-3xl font-black tracking-tight ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {displayShares}
          </span>
          <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${
            darkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            {t.stock.shares}
          </span>
        </div>
      </div>

      {/* Percentage */}
      <span className={`text-xs font-medium mb-4 ${
        riskPercent >= 100
          ? (darkMode ? "text-green-400/80" : "text-green-600")
          : (darkMode ? "text-blue-400/80" : "text-blue-600")
      }`}>
        {riskPercent.toFixed(0)}% {t.stock.totalRisk.toLowerCase()}
      </span>

      {/* Stats */}
      <div className={`w-full rounded-xl p-4 space-y-3 ${
        darkMode ? "bg-gray-900/50" : "bg-gray-50"
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {t.stock.positionValue}
          </span>
          <span className={`text-base font-bold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            {formatMoney(position)}
          </span>
        </div>
        <div className={`w-full h-px ${darkMode ? "bg-gray-800" : "bg-gray-200/60"}`}></div>
        <div className="flex items-center justify-between">
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {t.stock.totalRisk}
          </span>
          <span className={`text-base font-bold ${
            darkMode ? "text-red-400/80" : "text-red-500"
          }`}>
            -{formatMoney(risk)}
          </span>
        </div>
      </div>
    </div>
  );
};

const formatMoney = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const StockResult: React.FC<StockResultProps> = ({
  shares,
  riskPerShare,
  entryPrice
}) => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const flooredShares = Math.floor(shares);
  const hasDecimal = shares !== flooredShares;
  const acceptedLoss = shares * riskPerShare;
  const flooredRisk = flooredShares * riskPerShare;
  const riskUsedPercent = hasDecimal && flooredShares > 0
    ? (flooredRisk / acceptedLoss) * 100
    : 100;

  const formatShares = (n: number) => n % 1 === 0 ? n.toString() : n.toFixed(2);
  const stopLossPrice = entryPrice - riskPerShare;

  return (
    <div className="animate-fade-in">
      {/* Calculation summary */}
      <div className={`mb-6 flex items-center justify-center gap-3 text-base ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}>
        <span className={`text-lg font-semibold ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          {formatMoney(entryPrice)}
        </span>
        <ArrowDown className="w-4 h-4" />
        <span className={`text-lg font-semibold ${darkMode ? "text-red-400/90" : "text-red-600"}`}>
          {formatMoney(stopLossPrice)}
        </span>
        <span>=</span>
        <span className={`text-lg font-bold ${darkMode ? "text-blue-400" : "text-indigo-600"}`}>
          {formatMoney(riskPerShare)}
        </span>
        <span className={`text-sm ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
          / {language === "fr" ? "action" : "share"}
        </span>
      </div>

      {/* Cards grid */}
      <div className={`grid gap-4 ${hasDecimal && flooredShares > 0 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 max-w-sm mx-auto"}`}>
        {/* Exact card */}
        <StockRingCard
          sharesCount={shares}
          displayShares={formatShares(shares)}
          riskPercent={100}
          entryPrice={entryPrice}
          riskPerShare={riskPerShare}
          label={hasDecimal ? (language === "fr" ? "Exact" : "Exact") : (language === "fr" ? "Résultat" : "Result")}
          gradientId="gradExact"
          gradientFrom="#22c55e"
          gradientTo="#10b981"
          darkMode={darkMode}
          t={t}
        />

        {/* Rounded card */}
        {hasDecimal && flooredShares > 0 && (
          <StockRingCard
            sharesCount={flooredShares}
            displayShares={flooredShares.toString()}
            riskPercent={riskUsedPercent}
            entryPrice={entryPrice}
            riskPerShare={riskPerShare}
            label={language === "fr" ? "Arrondi" : "Rounded"}
            gradientId="gradRounded"
            gradientFrom="#3b82f6"
            gradientTo="#6366f1"
            darkMode={darkMode}
            t={t}
          />
        )}
      </div>
    </div>
  );
};
