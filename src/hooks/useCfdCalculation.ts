import { useEffect } from 'react';
import { calculateCfdLots, canAddContracts } from '../utils/calculatorUtils';
import { trackCfdCalculation } from '../utils/analytics';

export const useCfdCalculation = (
  maxLoss: number,
  stopLossPoints: number
) => {
  // Calculate maximum lots for CFD platforms
  const maxLots = calculateCfdLots(maxLoss, stopLossPoints);
  
  // Calculate the total potential loss
  const totalLoss = stopLossPoints ? maxLots * stopLossPoints : 0;

  // Calculate loss with one more lot
  const potentialLossWithOneMore = stopLossPoints ? (maxLots + 1) * stopLossPoints : 0;
  
  // Check if we can add one more lot
  const canAddOneMore = canAddContracts(totalLoss, potentialLossWithOneMore, maxLoss);

  // Track CFD calculations when values change
  useEffect(() => {
    if (stopLossPoints && maxLoss) {
      trackCfdCalculation(
        maxLots,
        stopLossPoints,
        totalLoss
      );
    }
  }, [maxLots, stopLossPoints, maxLoss, totalLoss]);

  return {
    maxLots,
    totalLoss,
    potentialLossWithOneMore,
    canAddOneMore
  };
}; 