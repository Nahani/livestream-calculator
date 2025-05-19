export interface ContractInfo {
  name: string;
  mini: number;
  micro: number;
}

export interface PositionSizeResult {
  contracts: number;
  maxLoss: number;
}

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export type Platform = {
  name: 'TopStep/APEX' | 'FTMO/WGF' | 'UFUNDED';
  drawdownDivisor: 5 | 10 | 15;
}

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  prefix?: string;
  darkMode: boolean;
}

export interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  darkMode: boolean;
}