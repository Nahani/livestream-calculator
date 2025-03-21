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

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  prefix?: string;
  darkMode: boolean;
}