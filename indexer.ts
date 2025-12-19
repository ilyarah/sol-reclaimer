
import { ScannedAccount } from "./types";

export const indexAndFilter = (
  accounts: ScannedAccount[],
  minLamports: number = 1_000_000 // ~0.001 SOL
): ScannedAccount[] => {
  if (accounts.length === 0) return [];

  // Deduplicate and filter closeable with meaningful rent
  const unique = Array.from(new Map(accounts.map(a => [a.pubkey, a])).values());
  return unique.filter(a => a.isCloseable && a.lamports >= minLamports);
};
