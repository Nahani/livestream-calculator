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
      <label className={`block text-sm font-medium mb-2 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className={`relative rounded-lg shadow-sm ${
        darkMode ? 'shadow-gray-900/50' : 'shadow-indigo-100'
      }`}>
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-lg ${prefix ? 'pl-7' : 'px-4'} py-2.5 text-sm transition-colors duration-200 ${
            darkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
              : 'bg-white border border-indigo-100 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
          }`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};