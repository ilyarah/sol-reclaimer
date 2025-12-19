
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { ScannedAccount } from "./types";

const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

export const scanWallet = async (walletAddress: string): Promise<ScannedAccount[]> => {
  try {
    const walletPubkey = new PublicKey(walletAddress);

    const [standard, token2022] = await Promise.all([
      connection.getParsedTokenAccountsByOwner(walletPubkey, { programId: TOKEN_PROGRAM_ID }),
      connection.getParsedTokenAccountsByOwner(walletPubkey, { programId: TOKEN_2022_PROGRAM_ID }).catch(() => ({ value: [] }))
    ]);

    const allAccounts = [...standard.value, ...token2022.value];

    return allAccounts.map(item => {
      const info = item.account.data.parsed.info;
      const amount = Number(info.tokenAmount.amount);
      const uiAmount = info.tokenAmount.uiAmount || 0;

      return {
        pubkey: item.pubkey.toString(),
        mint: info.mint,
        amount,
        uiAmount,
        decimals: info.tokenAmount.decimals,
        lamports: item.account.lamports,
        isCloseable: amount === 0,
      };
    });
  } catch (error) {
    throw new Error(`Scan failed: ${(error as Error).message}`);
  }
};
