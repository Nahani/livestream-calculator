import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';
import type { Platform } from '../types';

// Utility function to track events
const trackEvent = (eventName: string, eventParams?: { [key: string]: string | number | boolean }) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

// Events related to calculations
export const trackCalculation = (drawdown: number, stopLoss: number, platform: Platform, maxLoss: number) => {
  trackEvent('calculation_performed', {
    drawdown_amount: drawdown,
    stop_loss_points: stopLoss,
    platform_name: platform.name,
    platform_divisor: platform.drawdownDivisor,
    max_loss_calculated: maxLoss
  });
};

// Events related to platform changes
export const trackPlatformChange = (platform: Platform) => {
  trackEvent('platform_changed', {
    platform_name: platform.name,
    platform_divisor: platform.drawdownDivisor
  });
};

// Events related to drawdown divisor changes
export const trackDivisorChange = (platform: Platform) => {
  trackEvent('divisor_changed', {
    platform_name: platform.name,
    new_divisor: platform.drawdownDivisor
  });
};

// Events related to user preferences
export const trackThemeChange = (isDarkMode: boolean) => {
  trackEvent('theme_changed', {
    theme: isDarkMode ? 'dark' : 'light'
  });
};

export const trackLanguageChange = (language: string) => {
  trackEvent('language_changed', {
    language: language
  });
};

// Events related to contracts
export const trackContractViewed = (
  symbol: string, 
  maxContracts: number, 
  stopLossPoints: number, 
  totalLoss: number
) => {
  trackEvent('contract_viewed', {
    contract_symbol: symbol,
    max_contracts: maxContracts,
    stop_loss_points: stopLossPoints,
    total_potential_loss: totalLoss
  });
};

// Events related to CFD
export const trackCfdCalculation = (
  maxLots: number,
  stopLossPoints: number,
  totalLoss: number
) => {
  trackEvent('cfd_calculation', {
    max_lots: maxLots,
    stop_loss_points: stopLossPoints,
    total_potential_loss: totalLoss
  });
};

// Events related to external links
export const trackYoutubeClick = () => {
  trackEvent('youtube_channel_click', {
    channel: 'Romain Bailleul'
  });
};

// Events related to PWA installation
export const trackPwaInstallPromptShown = () => {
  trackEvent('pwa_install_prompt_shown');
};

export const trackPwaInstallButtonClicked = () => {
  trackEvent('pwa_install_button_clicked');
};

export const trackPwaInstallPromptResponse = (outcome: 'accepted' | 'dismissed') => {
  trackEvent('pwa_install_prompt_response', {
    outcome: outcome
  });
};

export const trackPwaInstalled = (method: 'browser_prompt' | 'app_store' | 'other' = 'browser_prompt') => {
  trackEvent('pwa_installed', {
    method: method
  });
};

export const trackPwaAlreadyInstalled = () => {
  trackEvent('pwa_already_installed');
}; 