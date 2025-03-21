import { useState, useCallback } from 'react';

export const useCalculator = () => {
  const [drawdown, setDrawdown] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');

  const calculateMaxLoss = useCallback((drawdownValue: number) => {
    return drawdownValue / 10;
  }, []);

  const maxLoss = drawdown ? calculateMaxLoss(parseFloat(drawdown)) : 0;
  const stopLossPoints = stopLoss ? parseFloat(stopLoss) : 0;

  return {
    drawdown,
    setDrawdown,
    stopLoss,
    setStopLoss,
    maxLoss,
    stopLossPoints
  };
};