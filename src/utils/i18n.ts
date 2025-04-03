import { Platform } from '../types';

type Language = 'en' | 'fr';

// Get the browser language or 'en' as fallback
export const getBrowserLanguage = (): Language => {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return (browserLang === 'fr') ? 'fr' : 'en';
};

// Translations for the application
export const translations = {
  en: {
    drawdown: {
      label: "Remaining Drawdown ($)",
      placeholder: "Enter remaining drawdown"
    },
    stopLoss: {
      label: "Stop Loss (points)",
      placeholder: "Enter your stop loss"
    },
    platform: {
      label: "Platform"
    },
    maxLoss: {
      title: "Maximum Allowed Loss",
      calculatedWith: (platform: Platform) => 
        platform === 'UFUNDED' ? 'Calculated with 1/15 of drawdown' : 'Calculated with 1/10 of drawdown'
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    }
  },
  fr: {
    drawdown: {
      label: "Drawdown Restant ($)",
      placeholder: "Entrez le drawdown restant"
    },
    stopLoss: {
      label: "Stop Loss (points)",
      placeholder: "Entrez votre stop loss"
    },
    platform: {
      label: "Plateforme"
    },
    maxLoss: {
      title: "Perte Maximale Autorisée",
      calculatedWith: (platform: Platform) => 
        platform === 'UFUNDED' ? 'Calculé avec 1/15 du drawdown' : 'Calculé avec 1/10 du drawdown'
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    }
  }
};

// Create a context to manage the current language
export const defaultLanguage: Language = getBrowserLanguage(); 