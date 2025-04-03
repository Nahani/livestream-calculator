import React from 'react';
import { SelectProps } from '../types';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-300 outline-none appearance-none ${
            darkMode 
              ? 'bg-gray-700/50 border-2 border-gray-600 text-white focus:border-blue-500/50 focus:bg-gray-700' 
              : 'bg-white/50 border-2 border-indigo-100 text-gray-900 focus:border-indigo-500/50 focus:bg-white'
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
          <svg 
            className={`h-4 w-4 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}; 