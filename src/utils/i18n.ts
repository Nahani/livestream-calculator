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
    tagline: "Calculate your position size. Protect your capital. Trade clean.",
    motto: "Risk first. Always.",
    acceptedLossHint: "Maximum amount you accept to lose on this trade.",
    disclaimer: "This tool doesn't replace a strategy. It protects your capital.",
    drawdown: {
      label: "Remaining Drawdown ($)",
      placeholder: "Enter remaining drawdown"
    },
    stopLoss: {
      label: "Stop Loss (points / $ for Gold)",
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
    },
    sections: {
      indices: "Indices",
      commodities: "Commodities",
      currencies: "Currencies"
    },
    auth: {
      loginToSeeResults: "Sign in to see results",
      createAccount: "Create an account",
      email: "Email",
      emailPlaceholder: "your@email.com",
      password: "Password",
      passwordPlaceholder: "Your password",
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      alreadyHaveAccount: "Already have an account? Sign in",
      noAccount: "Don't have an account? Sign up",
      invalidCredentials: "Invalid email or password",
      emailInUse: "This email is already in use",
      weakPassword: "Password must be at least 6 characters",
      invalidEmail: "Invalid email address",
      genericError: "An error occurred. Please try again.",
      forgotPassword: "Forgot password?",
      resetPassword: "Reset Password",
      resetPasswordInfo: "Enter your email and we'll send you a reset link.",
      resetEmailSent: "Reset email sent! Check your inbox.",
      checkSpam: "If you don't see the email, check your spam or junk folder.",
      backToLogin: "Back to sign in",
      userNotFound: "No account found with this email"
    },
    lossMode: {
      auto: "Auto",
      manual: "Manual",
      acceptedLoss: "Accepted Loss ($)",
      acceptedLossPlaceholder: "Enter accepted loss"
    }
  },
  fr: {
    tagline: "Calcule ta taille de position. Protège ton capital. Trade proprement.",
    motto: "Risk first. Always.",
    acceptedLossHint: "Montant maximum que tu acceptes de perdre sur ce trade.",
    disclaimer: "Cet outil ne remplace pas une stratégie. Il protège ton capital.",
    drawdown: {
      label: "Drawdown Restant ($)",
      placeholder: "Entrez le drawdown restant"
    },
    stopLoss: {
      label: "Stop Loss (points / $ pour Gold)",
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
    },
    sections: {
      indices: "Indices",
      commodities: "Matières Premières",
      currencies: "Devises"
    },
    auth: {
      loginToSeeResults: "Connectez-vous pour voir les résultats",
      createAccount: "Créez un compte",
      email: "Email",
      emailPlaceholder: "votre@email.com",
      password: "Mot de passe",
      passwordPlaceholder: "Votre mot de passe",
      signIn: "Se connecter",
      signUp: "S'inscrire",
      signOut: "Se déconnecter",
      alreadyHaveAccount: "Déjà un compte ? Se connecter",
      noAccount: "Pas de compte ? S'inscrire",
      invalidCredentials: "Email ou mot de passe invalide",
      emailInUse: "Cet email est déjà utilisé",
      weakPassword: "Le mot de passe doit contenir au moins 6 caractères",
      invalidEmail: "Adresse email invalide",
      genericError: "Une erreur est survenue. Veuillez réessayer.",
      forgotPassword: "Mot de passe oublié ?",
      resetPassword: "Réinitialiser",
      resetPasswordInfo: "Entrez votre email et nous vous enverrons un lien de réinitialisation.",
      resetEmailSent: "Email envoyé ! Vérifiez votre boîte de réception.",
      checkSpam: "Si vous ne voyez pas l'email, vérifiez vos spams ou courriers indésirables.",
      backToLogin: "Retour à la connexion",
      userNotFound: "Aucun compte trouvé avec cet email"
    },
    lossMode: {
      auto: "Auto",
      manual: "Manuel",
      acceptedLoss: "Perte Acceptée ($)",
      acceptedLossPlaceholder: "Entrez la perte acceptée"
    }
  }
};

// Create a context to manage the current language
export const defaultLanguage: Language = getBrowserLanguage(); 