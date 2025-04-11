import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Download } from 'lucide-react';
import { BeforeInstallPromptEvent } from '../types/pwa';
import { Tooltip } from './Tooltip';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/i18n';

export const PWAInstallButton: React.FC = () => {
  const { darkMode } = useTheme();
  const { language } = useLanguage();
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => setIsInstalled(true));

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', () => setIsInstalled(true));
    };
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
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