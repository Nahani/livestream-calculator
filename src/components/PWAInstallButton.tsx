import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Download } from 'lucide-react';
import { BeforeInstallPromptEvent } from '../types/pwa';
import { Tooltip } from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';
import { 
  trackPwaInstallPromptShown, 
  trackPwaInstallButtonClicked, 
  trackPwaInstallPromptResponse, 
  trackPwaInstalled,
  trackPwaAlreadyInstalled
} from '../utils/analytics';

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export const PWAInstallButton: React.FC = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      setInstallPrompt(e as BeforeInstallPromptEvent);
      // Track when the installation prompt is available
      trackPwaInstallPromptShown();
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      // Track when the app is installed
      trackPwaInstalled('browser_prompt');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if the app is already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         (window.navigator as NavigatorWithStandalone).standalone === true;
    
    if (isStandalone) {
      setIsInstalled(true);
      trackPwaAlreadyInstalled();
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      trackPwaInstallButtonClicked();
      
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      
      trackPwaInstallPromptResponse(outcome);
      
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
    }
  };

  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <Tooltip text={translations[language].buttons.installApp}>
      <button
        onClick={handleInstallClick}
        className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${
          darkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-blue-400' 
            : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
        }`}
      >
        <Download className="w-5 h-5" />
      </button>
    </Tooltip>
  );
}; 