import { useState, useEffect } from "react";
import type { Platform, LossMode } from "../types";
import { calculateMaxLoss } from "../utils/calculatorUtils";
import { trackCalculation, trackPlatformChange } from "../utils/analytics";

const PLATFORM_STORAGE_KEY = "calculator_platform";
const LOSS_MODE_STORAGE_KEY = "calculator_loss_mode";

export const useCalculator = () => {
  const [drawdown, setDrawdown] = useState<string>("");
  const [stopLoss, setStopLoss] = useState<string>("");
  const [acceptedLoss, setAcceptedLoss] = useState<string>("");

  const [lossMode, setLossMode] = useState<LossMode>(() => {
    const saved = localStorage.getItem(LOSS_MODE_STORAGE_KEY);
    return saved === "auto" ? "auto" : "manual";
  });
  
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

  useEffect(() => {
    localStorage.setItem(PLATFORM_STORAGE_KEY, JSON.stringify(platform));
    trackPlatformChange(platform);
  }, [platform]);

  useEffect(() => {
    localStorage.setItem(LOSS_MODE_STORAGE_KEY, lossMode);
  }, [lossMode]);

  const maxLoss = lossMode === "manual" && acceptedLoss
    ? parseFloat(acceptedLoss)
    : drawdown
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
    stopLossPoints,
    lossMode,
    setLossMode,
    acceptedLoss,
    setAcceptedLoss
  };
};