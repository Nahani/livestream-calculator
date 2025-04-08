import { Platform } from '../types';

/**
 * Checks if a platform is a CFD platform
 * @param platform Selected platform
 * @returns Boolean indicating if platform is CFD type
 */
export const isCfdPlatform = (platform: Platform): boolean => {
  return platform.name === 'FTMO/WGF' || platform.name === 'UFUNDED';
};

/**
 * Calculates the maximum allowed loss based on drawdown and selected platform
 * @param drawdownValue Drawdown amount
 * @param platform Selected platform
 * @returns Maximum allowed loss amount
 */
export const calculateMaxLoss = (drawdownValue: number, platform: Platform): number => {
  return drawdownValue / platform.drawdownDivisor;
};

/**
 * Calculates the number of lots for CFD platforms
 * @param maxLoss Maximum allowed loss amount
 * @param stopLossPoints Stop loss points
 * @returns Maximum number of lots
 */
export const calculateCfdLots = (maxLoss: number, stopLossPoints: number): number => {
  if (!stopLossPoints) return 0;
  return Math.floor(maxLoss / stopLossPoints);
};

/**
 * Calculates the maximum number of contracts based on maximum allowed loss and stop loss
 * @param stopLossPoints Stop loss points
 * @param tickValue Contract tick value
 * @param maxLoss Maximum allowed loss
 * @returns Maximum number of contracts
 */
export const calculateMaxContracts = (
  stopLossPoints: number,
  tickValue: number,
  maxLoss: number
): number => {
  if (!stopLossPoints || !tickValue) return 0;
  
  const lossPerContract = stopLossPoints * tickValue;
  const maxContracts = Math.floor(maxLoss / lossPerContract);
  return Math.max(0, maxContracts);
};

/**
 * Calculates the number of additional micro contracts after using mini contracts
 * @param maxLoss Maximum allowed loss
 * @param miniContracts Number of mini contracts
 * @param stopLossPoints Stop loss points
 * @param miniTickValue Tick value for mini contract
 * @param microTickValue Tick value for micro contract
 * @returns Number of additional micro contracts
 */
export const calculateAdditionalMicroContracts = (
  maxLoss: number,
  miniContracts: number,
  stopLossPoints: number,
  miniTickValue: number,
  microTickValue: number
): number => {
  if (!stopLossPoints || !microTickValue) return 0;
  
  const lossFromMinis = miniContracts * stopLossPoints * miniTickValue;
  const remainingLoss = Math.max(0, maxLoss - lossFromMinis);
  
  const additionalMicros = remainingLoss > 0
    ? Math.floor(remainingLoss / (stopLossPoints * microTickValue))
    : 0;
    
  return additionalMicros;
}; 