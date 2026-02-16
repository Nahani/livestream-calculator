import { Platform } from '../types';

/**
 * Checks if a platform is a CFD platform
 * @param platform Selected platform
 * @returns Boolean indicating if platform is CFD type
 */
export const isCfdPlatform = (platform: Platform): boolean => {
  return platform.name === 'CFD';
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
 * @param pointMultiplier Multiplier for stopLossPoints (1 for FTMO/UFUNDED, 0.1 for WGF)
 * @returns Maximum number of lots
 */
export const calculateCfdLots = (maxLoss: number, stopLossPoints: number, pointMultiplier: number = 1): number => {
  if (!stopLossPoints) return 0;
  return Math.floor(maxLoss / (stopLossPoints * pointMultiplier));
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

/**
 * Calculates potential loss with additional contracts
 * @param currentMiniContracts Current number of mini contracts
 * @param additionalMiniContracts Additional mini contracts to add
 * @param currentMicroContracts Current number of micro contracts
 * @param additionalMicroContracts Additional micro contracts to add
 * @param stopLossPoints Stop loss points
 * @param miniTickValue Mini contract tick value
 * @param microTickValue Micro contract tick value
 * @returns Total potential loss
 */
export const calculatePotentialLoss = (
  currentMiniContracts: number,
  additionalMiniContracts: number,
  currentMicroContracts: number,
  additionalMicroContracts: number,
  stopLossPoints: number,
  miniTickValue: number,
  microTickValue: number
): number => {
  const totalMiniLoss = (currentMiniContracts + additionalMiniContracts) * stopLossPoints * miniTickValue;
  const totalMicroLoss = (currentMicroContracts + additionalMicroContracts) * stopLossPoints * microTickValue;
  return totalMiniLoss + totalMicroLoss;
};

/**
 * Checks if adding micro contracts would reach conversion threshold
 * @param currentMicroContracts Current number of micro contracts
 * @param additionalMicroContracts Additional micro contracts to add
 * @returns Whether the total would reach conversion threshold
 */
export const wouldReachConversionThreshold = (
  currentMicroContracts: number,
  additionalMicroContracts: number
): boolean => {
  return currentMicroContracts + additionalMicroContracts === 10;
};

/**
 * Calculates whether additional contracts can be added within loss limit
 * @param currentLoss Current total loss
 * @param potentialLoss Potential total loss after adding contracts
 * @param maxLoss Maximum allowed loss
 * @param maxLossPercentage Maximum allowed loss percentage (e.g. 1.02 for 2% over)
 * @returns Whether additional contracts can be added
 */
export const canAddContracts = (
  currentLoss: number,
  potentialLoss: number,
  maxLoss: number,
  maxLossPercentage: number = 1.02
): boolean => {
  return currentLoss > 0 && potentialLoss <= maxLoss * maxLossPercentage;
}; 