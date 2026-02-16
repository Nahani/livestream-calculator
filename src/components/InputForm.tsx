import React from "react";
import { Platform, LossMode } from "../types";
import { NumberInput } from "./NumberInput";
import { Select } from "./Select";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/i18n";

interface InputFormProps {
  drawdown: string;
  setDrawdown: (value: string) => void;
  stopLoss: string;
  setStopLoss: (value: string) => void;
  platform: Platform;
  setPlatform: (value: Platform) => void;
  lossMode: LossMode;
  setLossMode: (value: LossMode) => void;
  acceptedLoss: string;
  setAcceptedLoss: (value: string) => void;
}

interface PlatformOption {
  value: Platform['name'];
  label: string;
}

export const InputForm: React.FC<InputFormProps> = ({
  drawdown,
  setDrawdown,
  stopLoss,
  setStopLoss,
  platform,
  setPlatform,
  lossMode,
  setLossMode,
  acceptedLoss,
  setAcceptedLoss
}) => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const platformOptions: PlatformOption[] = [
    { value: 'Futures', label: 'Futures' },
    { value: 'CFD', label: 'CFD' }
  ];

  const divisorOptions = [
    { value: '5', label: '20% (5 SL)' },
    { value: '10', label: '10% (10 SL)' },
    { value: '15', label: '6.66% (15 SL)' }
  ];

  const handlePlatformChange = (value: string) => {
    setPlatform({
      name: value as Platform['name'],
      drawdownDivisor: 10
    });
  };

  const handleDivisorChange = (value: string) => {
    setPlatform({
      name: platform.name,
      drawdownDivisor: parseInt(value) as 5 | 10 | 15
    });
  };

  return (
    <>
      <div className={`grid grid-cols-1 gap-4 mb-3 animate-fade-in ${
        lossMode === "auto"
          ? "md:grid-cols-[auto_1fr_1fr_1fr_1fr]"
          : "md:grid-cols-[auto_1fr_1fr_1fr]"
      }`}>
        <div className="md:w-40">
          <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Mode
          </label>
          <div className={`flex rounded-xl overflow-hidden border-2 transition-all duration-300 ${
            darkMode
              ? "border-gray-600 shadow-lg shadow-gray-900/30"
              : "border-indigo-100 shadow-lg shadow-indigo-100/50"
          }`}>
            <button
              type="button"
              onClick={() => setLossMode("manual")}
              className={`flex-1 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                lossMode === "manual"
                  ? "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
                    : "bg-white/50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.lossMode.manual}
            </button>
            <button
              type="button"
              onClick={() => setLossMode("auto")}
              className={`flex-1 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
                lossMode === "auto"
                  ? "bg-blue-600 text-white"
                  : darkMode
                    ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600"
                    : "bg-white/50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {t.lossMode.auto}
            </button>
          </div>
        </div>
        {lossMode === "auto" ? (
          <NumberInput
            label={t.drawdown.label + " *"}
            value={drawdown}
            onChange={setDrawdown}
            placeholder={t.drawdown.placeholder}
            prefix="$"
            darkMode={darkMode}
          />
        ) : (
          <div>
            <NumberInput
              label={t.lossMode.acceptedLoss}
              value={acceptedLoss}
              onChange={setAcceptedLoss}
              placeholder={t.lossMode.acceptedLossPlaceholder}
              prefix="$"
              darkMode={darkMode}
            />
            <p className={`text-[0.6rem] mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              {t.acceptedLossHint}
            </p>
          </div>
        )}
        <NumberInput
          label={t.stopLoss.label}
          value={stopLoss}
          onChange={setStopLoss}
          placeholder={t.stopLoss.placeholder}
          darkMode={darkMode}
        />
        <Select
          label={t.platform.label}
          value={platform.name}
          onChange={handlePlatformChange}
          options={platformOptions}
          darkMode={darkMode}
        />
        {lossMode === "auto" && (
          <Select
            label={t.drawdownDivisor.label}
            value={platform.drawdownDivisor.toString()}
            onChange={handleDivisorChange}
            options={divisorOptions}
            darkMode={darkMode}
          />
        )}
      </div>
      {lossMode === "auto" && (
        <p className={`text-[0.6rem] sm:text-[0.7rem] italic ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          * {t.challengeNote.text}
        </p>
      )}
    </>
  );
}; 