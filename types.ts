
export type ScannedAccount = {
  pubkey: string;
  mint: string;
  amount: number;
  uiAmount: number;
  decimals: number;
  lamports: number;
  isCloseable: boolean;
};

export type EnrichedAccount = ScannedAccount & {
  symbol: string;
  name: string;
  usdPrice: number;
  tokenUSDValue: number;
  reclaimableSOL: number;
  reclaimableUSD: number;
  inactivityMonths: number;
  isSpam: boolean;
};

export type AnalyzedAccount = EnrichedAccount & {
  forgottenScore: number;
  reusabilityScore: number;
  tier: 'Diamond' | 'Golden' | 'Cleanup';
};
