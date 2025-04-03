import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { defaultLanguage } from '../utils/i18n';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {}
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Key for localStorage
const LANGUAGE_STORAGE_KEY = 'calculator_language';

interface LanguageProviderProps {
  children: ReactNode;
}

// Provider component that supplies the language context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get language from localStorage or use browser default
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return (savedLanguage === 'en' || savedLanguage === 'fr') 
      ? savedLanguage 
      : defaultLanguage;
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  // Function to change language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}; 