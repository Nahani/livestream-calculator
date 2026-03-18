import React from "react";
import { NumberInput } from "../NumberInput";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../utils/i18n";

interface StockInputFormProps {
  entryPrice: string;
  setEntryPrice: (value: string) => void;
  stopLossPrice: string;
  setStopLossPrice: (value: string) => void;
  acceptedLoss: string;
  setAcceptedLoss: (value: string) => void;
}

export const StockInputForm: React.FC<StockInputFormProps> = ({
  entryPrice,
  setEntryPrice,
  stopLossPrice,
  setStopLossPrice,
  acceptedLoss,
  setAcceptedLoss
}) => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 animate-fade-in">
      <NumberInput
        label={t.stock.entryPrice}
        value={entryPrice}
        onChange={setEntryPrice}
        placeholder={t.stock.entryPricePlaceholder}
        prefix="$"
        darkMode={darkMode}
      />
      <NumberInput
        label={t.stock.stopLossPrice}
        value={stopLossPrice}
        onChange={setStopLossPrice}
        placeholder={t.stock.stopLossPricePlaceholder}
        prefix="$"
        darkMode={darkMode}
      />
      <NumberInput
        label={t.stock.acceptedLoss}
        value={acceptedLoss}
        onChange={setAcceptedLoss}
        placeholder={t.stock.acceptedLossPlaceholder}
        prefix="$"
        darkMode={darkMode}
      />
    </div>
  );
};
