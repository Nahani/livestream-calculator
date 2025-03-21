import React from 'react';
import { InputProps } from '../types';

export const NumberInput: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  darkMode
}) => {
  return (
    <div>
      <label className={`block text-sm font-medium mb-3 transition-colors duration-300 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className={`relative rounded-xl transition-all duration-300 ${
        darkMode 
          ? 'shadow-lg shadow-gray-900/30' 
          : 'shadow-lg shadow-indigo-100/50'
      }`}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className={`text-sm transition-colors duration-300 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-xl ${
            prefix ? 'pl-8' : 'px-4'
          } py-3.5 text-sm transition-all duration-300 outline-none ${
            darkMode 
              ? 'bg-gray-700/50 border-2 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500/50 focus:bg-gray-700' 
              : 'bg-white/50 border-2 border-indigo-100 text-gray-900 placeholder-gray-400 focus:border-indigo-500/50 focus:bg-white'
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};