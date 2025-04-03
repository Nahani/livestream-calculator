import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeContextType } from '../types';

// Création du contexte avec une valeur par défaut
const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {}
});

// Hook personnalisé pour utiliser le contexte
export const useTheme = () => useContext(ThemeContext);

// Clé pour localStorage
const THEME_STORAGE_KEY = 'calculator_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

// Composant Provider qui fournit le contexte
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Récupérer le thème depuis localStorage ou utiliser dark mode par défaut
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Enregistrer le thème dans localStorage quand il change
  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Fonction pour basculer entre les modes
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 