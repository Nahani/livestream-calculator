import { ContractInfo } from '../types';

export const CONTRACTS: Record<string, ContractInfo> = {
  NQ: { name: "Nasdaq 100", mini: 20, micro: 2 },
  ES: { name: "S&P 500", mini: 50, micro: 5 },
  YM: { name: "Dow Jones", mini: 5, micro: 0.5 },
  GC: { name: "Gold", mini: 100, micro: 10 },
  CL: { name: "Crude Oil", mini: 1000, micro: 100 },
  "6E": { name: "EUR/USD", mini: 10, micro: 1 }
};