import { useState, useEffect } from 'react';
import type { Platform } from '../types';
import { calculateMaxLoss } from '../utils/calculatorUtils';

// Key for localStorage
const PLATFORM_STORAGE_KEY = 'calculator_platform';

export const useCalculator = () => {
  const [drawdown, setDrawdown] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  
  const [platform, setPlatform] = useState<Platform>(() => {
    const savedPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY);
    return (savedPlatform as Platform) || 'TopStep';
  });

  // Save platform to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PLATFORM_STORAGE_KEY, platform);
  }, [platform]);

  // Using the utility function for calculation
  const maxLoss = drawdown 
    ? calculateMaxLoss(parseFloat(drawdown), platform) 
    : 0;
    
  const stopLossPoints = stopLoss ? parseFloat(stopLoss) : 0;

  return {
    drawdown,
    setDrawdown,
    stopLoss,
    setStopLoss,
    platform,
    setPlatform,
    maxLoss,
    stopLossPoints
  };
};