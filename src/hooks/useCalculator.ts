import { useState, useEffect } from 'react';
import type { Platform } from '../types';
import { calculateMaxLoss } from '../utils/calculatorUtils';
import { trackCalculation, trackPlatformChange } from '../utils/analytics';

// Key for localStorage
const PLATFORM_STORAGE_KEY = 'calculator_platform';

export const useCalculator = () => {
  const [drawdown, setDrawdown] = useState<string>('');
  const [stopLoss, setStopLoss] = useState<string>('');
  
  const [platform, setPlatform] = useState<Platform>(() => {
    const savedPlatform = localStorage.getItem(PLATFORM_STORAGE_KEY);
    if (savedPlatform) {
      try {
        const parsed = JSON.parse(savedPlatform);
        return {
          name: parsed.name,
          drawdownDivisor: parsed.drawdownDivisor
        };
      } catch {
        // Fallback to default if parsing fails
        return {
          name: 'TopStep/APEX',
          drawdownDivisor: 10
        };
      }
    }
    return {
      name: 'TopStep/APEX',
      drawdownDivisor: 10
    };
  });

  // Save platform to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(PLATFORM_STORAGE_KEY, JSON.stringify(platform));
    trackPlatformChange(platform);
  }, [platform]);

  // Using the utility function for calculation
  const maxLoss = drawdown 
    ? calculateMaxLoss(parseFloat(drawdown), platform) 
    : 0;
    
  const stopLossPoints = stopLoss ? parseFloat(stopLoss) : 0;

  // Track calculation when values change
  useEffect(() => {
    if (drawdown && stopLoss) {
      trackCalculation(
        parseFloat(drawdown),
        stopLossPoints,
        platform,
        maxLoss
      );
    }
  }, [drawdown, stopLoss, platform, maxLoss]);

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