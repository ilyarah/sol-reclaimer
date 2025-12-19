
import axios from "axios";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";
import { ScannedAccount, EnrichedAccount } from "./types";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const metaplex = Metaplex.make(connection);

const STRICT_LIST = "https://token.jup.ag/strict";
const ALL_LIST = "https://token.jup.ag/all";

let tokenList: any[] = [];

const loadTokenList = async () => {
  if (tokenList.length > 0) return;
  try {
    const [strict, all] = await Promise.all([
      axios.get(STRICT_LIST).then(r => r.data),
      axios.get(ALL_LIST).then(r => r.data)
    ]);
    tokenList = [...strict, ...all];
  } catch (e) {
    console.warn("Could not load Jupiter token list");
  }
};

export const enrichAccounts = async (accounts: ScannedAccount[]): Promise<EnrichedAccount[]> => {
  await loadTokenList();

  const solPrice = tokenList.find(t => t.symbol === "SOL")?.price || 125; // fallback

  return Promise.all(accounts.map(async (acc) => {
    let symbol = "UNKNOWN";
    let name = "Unknown Token";
    let usdPrice = 0;

    const jupToken = tokenList.find(t => t.address === acc.mint);
    if (jupToken) {
      symbol = jupToken.symbol;
      name = jupToken.name;
      usdPrice = jupToken.price || 0;
    } else {
      try {
        const nft = await metaplex.nfts().findByMint({ mintAddress: new PublicKey(acc.mint) });
        if (nft.symbol) symbol = nft.symbol;
        if (nft.name) name = nft.name;
      } catch {}
    }

    let inactivityMonths = 0;
    try {
      const sigs = await connection.getSignaturesForAddress(new PublicKey(acc.pubkey), { limit: 1 });
      if (sigs.length > 0 && sigs[0].blockTime) {
        const months = (Date.now() / 1000 - sigs[0].blockTime) / (30 * 24 * 3600);
        inactivityMonths = Math.max(0, Math.floor(months));
      }
    } catch {}

    const reclaimableSOL = acc.lamports / 1e9;
    const reclaimableUSD = reclaimableSOL * solPrice;

    return {
      ...acc,
      symbol,
      name,
      usdPrice,
      tokenUSDValue: acc.uiAmount * usdPrice,
      reclaimableSOL,
      reclaimableUSD,
      inactivityMonths,
      isSpam: !jupToken && acc.uiAmount > 0,
    };
  }));
};
