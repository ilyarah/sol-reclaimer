
import { EnrichedAccount, AnalyzedAccount } from "./types";

const calculateForgottenScore = (acc: EnrichedAccount): number => {
  let score = 0;
  score += Math.min(acc.inactivityMonths * 3, 60); // max 60 for long inactivity
  if (acc.amount === 0) score += 30;
  if (acc.isSpam) score += 10;
  return Math.min(100, score);
};

const calculateReusabilityScore = (acc: EnrichedAccount): number => {
  let score = 0;
  if (acc.reclaimableSOL > 0.01) score += 50;
  else if (acc.reclaimableSOL > 0.005) score += 30;
  else score += 10;
  if (["SOL", "USDC", "JUP", "BONK"].includes(acc.symbol)) score += 20;
  return Math.min(100, score);
};

export const analyzeAccounts = (accounts: EnrichedAccount[]): AnalyzedAccount[] => {
  return accounts.map(acc => {
    const forgottenScore = calculateForgottenScore(acc);
    const reusabilityScore = calculateReusabilityScore(acc);

    let tier: 'Diamond' | 'Golden' | 'Cleanup' = 'Cleanup';
    if (forgottenScore >= 70 && reusabilityScore >= 70) tier = 'Diamond';
    else if (forgottenScore >= 50 || reusabilityScore >= 60) tier = 'Golden';

    return { ...acc, forgottenScore, reusabilityScore, tier };
  });
};
