import React from "react";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import { PWAInstallButton } from "./PWAInstallButton";
import { Tooltip } from "./Tooltip";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../utils/i18n";

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="animate-slide-in">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">LST</span>
            <span className={darkMode ? "text-white" : "text-gray-900"}> Risk Calculator</span>
          </h1>
          <div className="h-1 mt-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-transparent w-48 md:w-64" />
        </div>
      <div className="flex items-center gap-2">
        <PWAInstallButton />
        <Tooltip text={darkMode ? t.buttons.switchToLight : t.buttons.switchToDark}>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-all cursor-pointer duration-300 transform hover:scale-105 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600"
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </Tooltip>
        {user && (
          <Tooltip text={t.auth.signOut}>
            <button
              onClick={signOut}
              className={`p-2 rounded-lg transition-all cursor-pointer duration-300 transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white"
                  : "bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600"
              }`}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </Tooltip>
        )}
      </div>
      </div>
      <p className={`mt-2 text-xs md:text-sm italic transition-colors duration-300 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}>
        {t.tagline}
      </p>
      <div className="flex justify-center mt-4">
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase backdrop-blur-sm transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5"
            : "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-200/50 shadow-md shadow-blue-100/50"
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
          {t.motto}
        </span>
      </div>
    </div>
  );
}; 