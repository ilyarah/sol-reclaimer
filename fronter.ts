import chalk from "chalk";
import { AnalyzedAccount } from "./types";

export const printResults = (accounts: AnalyzedAccount[]) => {
  if (accounts.length === 0) {
    console.log(chalk.green("\n🎉 No reclaimable accounts found! Your wallet is clean.\n"));
    return;
  }

  accounts.sort((a, b) => b.reclaimableSOL - a.reclaimableSOL);

  const totalSOL = accounts.reduce((s, a) => s + a.reclaimableSOL, 0);
  const totalUSD = accounts.reduce((s, a) => s + a.reclaimableUSD, 0);

  console.log(chalk.bold.green(`\nTotal Reclaimable: ${totalSOL.toFixed(4)} SOL (~$${totalUSD.toFixed(2)} USD)\n`));

  const diamond = accounts.filter(a => a.tier === 'Diamond').length;
  const golden = accounts.filter(a => a.tier === 'Golden').length;
  const cleanup = accounts.length - diamond - golden;

  console.log(chalk.cyan(`Diamond Tier: ${diamond} | Golden Tier: ${golden} | Cleanup: ${cleanup}\n`));

  console.table(
    accounts.map(acc => ({
      Pubkey: acc.pubkey.slice(0, 10) + "...",
      Symbol: acc.symbol.padEnd(12),
      Amount: acc.uiAmount.toFixed(4),
      "Reclaim SOL": chalk.yellow(acc.reclaimableSOL.toFixed(5)),
      Inactive: `${acc.inactivityMonths} mo`,
      Tier: acc.tier === 'Diamond' ? chalk.green('◆ Diamond') :
            acc.tier === 'Golden' ? chalk.yellow('◆ Golden') :
            chalk.gray('◇ Cleanup')
    }))
  );

  console.log(chalk.dim("\nTip: Use Sol Incinerator or your wallet's 'Close Empty Accounts' feature to reclaim!\n"));
};