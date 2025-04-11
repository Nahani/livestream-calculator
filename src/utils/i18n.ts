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

const getPercentageFromDivisor = (divisor: number): string => {
  const percentage = (1 / divisor) * 100;
  return percentage % 1 === 0 ? percentage.toString() : (Math.floor(percentage * 100) / 100).toFixed(2);
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
        `Calculated with ${getPercentageFromDivisor(platform.drawdownDivisor)}% of drawdown`
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    },
    cfd: {
      title: "CFD Position Calculation",
      lots: "LOTS",
      spreadNote: "Don't forget to add your spread!"
    },
    challengeNote: {
      text: "For Topstep/Apex challenges, enter your accepted loss per trade multiplied by 10 (e.g., if you want to risk $1,000, enter $10,000)"
    },
    buttons: {
      installApp: "Install the app",
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode"
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
        `Calculé avec ${getPercentageFromDivisor(platform.drawdownDivisor)}% du drawdown`
    },
    contracts: {
      mini: "MINI",
      micro: "MICRO"
    },
    cfd: {
      title: "Calcul de Position CFD",
      lots: "LOTS",
      spreadNote: "Pensez à rajouter votre spread !"
    },
    challengeNote: {
      text: "En challenge Topstep/Apex, indiquez votre perte acceptée par trade x10 (ex : si vous souhaitez risquer 1 000, indiquez 10 000)"
    },
    buttons: {
      installApp: "Installer l'application",
      switchToLight: "Passer en mode clair",
      switchToDark: "Passer en mode sombre"
    }
  }
};

// Create a context to manage the current language
export const defaultLanguage: Language = getBrowserLanguage(); 