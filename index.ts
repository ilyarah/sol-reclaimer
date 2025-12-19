import promptly from "promptly";
import chalk from "chalk";
import { scanWallet } from "./scanner";
import { indexAndFilter } from "./indexer";
import { enrichAccounts } from "./enricher";
import { analyzeAccounts } from "./analyzer";
import { printResults } from "./fronter";

// Main execution function
(async () => {
  console.log(chalk.bold.blue("\n🧹 Solana Dormant Asset Reclaimer\n"));

  // Prompt for Solana wallet address
  const wallet = await promptly.prompt("Enter your Solana wallet address: ");
  if (!wallet) {
    console.log(chalk.red("No wallet address provided. Exiting..."));
    process.exit(0);
  }

  try {
    // Step 1: Scan wallet for token accounts
    console.log(chalk.gray("Scanning token accounts...\n"));
    const scanned = await scanWallet(wallet);

    // Step 2: Filter out low-value or non-reclaimable accounts
    console.log(chalk.gray("Filtering reclaimable accounts...\n"));
    const filtered = indexAndFilter(scanned);

    // If no reclaimable accounts are found
    if (filtered.length === 0) {
      console.log(chalk.green("No reclaimable accounts found!\n"));
      return;
    }

    // Step 3: Enrich accounts with metadata and USD value
    console.log(chalk.gray(`Enriching ${filtered.length} accounts...\n`));
    const enriched = await enrichAccounts(filtered);

    // Step 4: Analyze accounts and calculate scores
    const analyzed = analyzeAccounts(enriched);

    // Step 5: Print results in an organized format
    printResults(analyzed);
  } catch (error) {
    // Handle unexpected errors
    console.error(chalk.red("\nError:"), (error as Error).message);
  }
})();
