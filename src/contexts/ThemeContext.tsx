import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeContextType } from '../types';
import { trackThemeChange } from '../utils/analytics';

// Creating context with default value
const ThemeContext = createContext<ThemeContextType>({
  darkMode: true,
  toggleDarkMode: () => {}
});

// Custom hook to use the context
export const useTheme = () => useContext(ThemeContext);

// Key for localStorage
const THEME_STORAGE_KEY = 'calculator_theme';

interface ThemeProviderProps {
  children: ReactNode;
}

// Provider component that supplies the context
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Get theme from localStorage or use dark mode by default
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Function to toggle between modes
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newValue));
      trackThemeChange(newValue);
      return newValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}; 