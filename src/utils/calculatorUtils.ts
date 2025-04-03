import { Platform } from '../types';

/**
 * Calcule la perte maximale autorisée en fonction du drawdown et de la plateforme
 * @param drawdownValue Montant du drawdown
 * @param platform Plateforme sélectionnée
 * @returns Montant de la perte maximale autorisée
 */
export const calculateMaxLoss = (drawdownValue: number, platform: Platform): number => {
  const divisor = platform === 'UFUNDED' ? 15 : 10;
  return drawdownValue / divisor;
};

/**
 * Calcule le nombre maximum de contrats en fonction de la perte maximale autorisée et du stop loss
 * @param stopLossPoints Points de stop loss
 * @param tickValue Valeur d'un tick pour le contrat
 * @param maxLoss Perte maximale autorisée
 * @returns Nombre maximum de contrats
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
 * Calcule le nombre de micro contrats additionnels après avoir utilisé des mini contrats
 * @param maxLoss Perte maximale autorisée
 * @param miniContracts Nombre de mini contrats
 * @param stopLossPoints Points de stop loss
 * @param miniTickValue Valeur d'un tick pour mini contrat
 * @param microTickValue Valeur d'un tick pour micro contrat
 * @returns Nombre de micro contrats additionnels
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