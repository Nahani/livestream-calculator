import { useEffect } from 'react';
import { ContractInfo } from '../types';
import { 
  calculateMaxContracts, 
  calculateAdditionalMicroContracts,
  calculatePotentialLoss,
  wouldReachConversionThreshold,
  canAddContracts
} from '../utils/calculatorUtils';
import { trackContractViewed } from '../utils/analytics';

export const useContractCalculation = (
  symbol: string,
  contract: ContractInfo,
  stopLossPoints: number,
  maxLoss: number
) => {
  // Using utility functions
  const maxMiniContracts = calculateMaxContracts(
    stopLossPoints,
    contract.mini,
    maxLoss
  );

  const maxMicroContracts = calculateMaxContracts(
    stopLossPoints,
    contract.micro,
    maxLoss
  );
  
  // Additional micro contracts to use with mini contracts
  const additionalMicros = calculateAdditionalMicroContracts(
    maxLoss,
    maxMiniContracts,
    stopLossPoints,
    contract.mini,
    contract.micro
  );
  
  // Determine if we should use mini contracts
  const useMini = maxMiniContracts > 0;
  
  // Calculate the total potential loss
  const totalLoss = calculatePotentialLoss(
    maxMiniContracts, 0,
    additionalMicros, 0,
    stopLossPoints,
    contract.mini,
    contract.micro
  );

  // Calculate potential loss with one more mini contract
  const potentialLossWithOneMoreMini = calculatePotentialLoss(
    maxMiniContracts, 1,
    additionalMicros, 0,
    stopLossPoints,
    contract.mini,
    contract.micro
  );
  
  // Calculate potential loss with one more micro contract
  const potentialLossWithOneMoreMicro = calculatePotentialLoss(
    maxMiniContracts, 0,
    additionalMicros, 1,
    stopLossPoints,
    contract.mini,
    contract.micro
  );

  // Check if adding one more micro would make 10 micros
  const wouldMakeTenMicros = wouldReachConversionThreshold(additionalMicros, 1);
  
  // If adding one micro would make 10, calculate loss with one more mini instead
  const potentialLossWithConvertedMini = wouldMakeTenMicros ? 
    calculatePotentialLoss(
      maxMiniContracts, 1,
      0, 0,
      stopLossPoints,
      contract.mini,
      contract.micro
    ) : 
    potentialLossWithOneMoreMicro;
  
  const canAddOneMoreMini = canAddContracts(totalLoss, potentialLossWithOneMoreMini, maxLoss);
  const canAddOneMoreMicro = canAddContracts(totalLoss, potentialLossWithOneMoreMicro, maxLoss) && !wouldMakeTenMicros;
  const canConvertToMini = wouldMakeTenMicros && canAddContracts(totalLoss, potentialLossWithConvertedMini, maxLoss);

  // Track contract view when component mounts or values change
  useEffect(() => {
    if (stopLossPoints && maxLoss) {
      trackContractViewed(
        symbol,
        maxMiniContracts + maxMicroContracts,
        stopLossPoints,
        totalLoss
      );
    }
  }, [symbol, maxMiniContracts, maxMicroContracts, stopLossPoints, maxLoss, totalLoss]);

  return {
    maxMiniContracts,
    maxMicroContracts,
    additionalMicros,
    useMini,
    totalLoss,
    potentialLossWithOneMoreMini,
    potentialLossWithOneMoreMicro,
    potentialLossWithConvertedMini,
    canAddOneMoreMini,
    canAddOneMoreMicro,
    canConvertToMini,
    stopLossPoints,
    contract
  };
}; 