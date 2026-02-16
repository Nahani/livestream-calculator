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
  name: 'Futures' | 'CFD';
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

export interface AuthContextType {
  user: { email: string } | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export type LossMode = "auto" | "manual";