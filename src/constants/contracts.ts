import { ContractInfo } from '../types';

export const CONTRACTS: Record<string, ContractInfo> = {
  NQ: { name: 'Nasdaq 100', mini: 20, micro: 2 },
  ES: { name: 'S&P 500', mini: 50, micro: 5 },
  YM: { name: 'Dow Jones', mini: 5, micro: 0.5 }
};