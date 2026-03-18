import { useState } from "react";
import { calculateStockShares } from "../utils/calculatorUtils";

export const useStockCalculation = () => {
  const [entryPrice, setEntryPrice] = useState<string>("");
  const [stopLossPrice, setStopLossPrice] = useState<string>("");
  const [acceptedLoss, setAcceptedLoss] = useState<string>("");

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
