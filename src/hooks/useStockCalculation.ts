import { useState, useEffect } from "react";
import { calculateStockShares } from "../utils/calculatorUtils";

const STOCK_STORAGE_PREFIX = "calculator_stock_";

export const useStockCalculation = () => {
  const [entryPrice, setEntryPrice] = useState<string>(() =>
    localStorage.getItem(STOCK_STORAGE_PREFIX + "entryPrice") || ""
  );
  const [stopLossPrice, setStopLossPrice] = useState<string>(() =>
    localStorage.getItem(STOCK_STORAGE_PREFIX + "stopLossPrice") || ""
  );
  const [acceptedLoss, setAcceptedLoss] = useState<string>(() =>
    localStorage.getItem(STOCK_STORAGE_PREFIX + "acceptedLoss") || ""
  );

  useEffect(() => {
    localStorage.setItem(STOCK_STORAGE_PREFIX + "entryPrice", entryPrice);
  }, [entryPrice]);

  useEffect(() => {
    localStorage.setItem(STOCK_STORAGE_PREFIX + "stopLossPrice", stopLossPrice);
  }, [stopLossPrice]);

  useEffect(() => {
    localStorage.setItem(STOCK_STORAGE_PREFIX + "acceptedLoss", acceptedLoss);
  }, [acceptedLoss]);

  const entry = entryPrice ? parseFloat(entryPrice) : 0;
  const stop = stopLossPrice ? parseFloat(stopLossPrice) : 0;
  const loss = acceptedLoss ? parseFloat(acceptedLoss) : 0;

  const hasInput = entry > 0 && stop > 0 && loss > 0 && entry > stop;

  const result = hasInput
    ? calculateStockShares(entry, stop, loss)
    : { shares: 0, riskPerShare: 0, positionValue: 0, totalRisk: 0 };

  return {
    entryPrice,
    setEntryPrice,
    stopLossPrice,
    setStopLossPrice,
    acceptedLoss,
    setAcceptedLoss,
    hasInput,
    ...result
  };
};
