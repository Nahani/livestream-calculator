import { Platform } from '../types';

type Language = 'en' | 'fr';

/**
 * Get the browser language or 'en' as fallback
 * This function tries to detect the user's preferred language
 * It checks:
 * 1. navigator.language (full locale like 'en-US' or 'fr-FR')
 * 2. navigator.languages (array of preferred languages)
 * 3. Defaults to 'en' if no supported language is found
 */
export const getBrowserLanguage = (): Language => {
  // First try the main navigator.language
  const primaryLanguage = navigator.language.toLowerCase();
  
  if (primaryLanguage.startsWith('fr')) {
    return 'fr';
  }
  
  // If not found, try the navigator.languages array if available
  if (navigator.languages && navigator.languages.length) {
    // Check if any of the preferred languages start with 'fr'
    for (const lang of navigator.languages) {
      if (lang.toLowerCase().startsWith('fr')) {
        return 'fr';
      }
    }
  }
  
  // Default to English if no French language is found
  return 'en';
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
    drawdownDivisor: {
      label: "Drawdown Risk"
    },
    maxLoss: {
      title: "Maximum Allowed Loss",
      calculatedWith: (platform: Platform) => 
        `Calculated with 1/${platform.drawdownDivisor} of drawdown`
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    },
    cfd: {
      title: "CFD Position Calculation",
      lots: "LOTS",
      spreadNote: "Pensez à rajouter votre spread"
    },
    challengeNote: {
      text: "For challenges, indicate your remaining drawdown x 10"
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
    drawdownDivisor: {
      label: "Risque Drawdown"
    },
    maxLoss: {
      title: "Perte Maximale Autorisée",
      calculatedWith: (platform: Platform) => 
        `Calculé avec 1/${platform.drawdownDivisor} du drawdown`
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    },
    cfd: {
      title: "Calcul de Position CFD",
      lots: "LOTS",
      spreadNote: "Pensez à rajouter votre spread"
    },
    challengeNote: {
      text: "En challenge indiquez votre drawdown restant x 10"
    }
  }
};

// Create a context to manage the current language
export const defaultLanguage: Language = getBrowserLanguage(); 