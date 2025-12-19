
# Solana Personal Dormant Asset Reclaimer 🧹

An open-source CLI tool that helps Solana wallet owners discover and reclaim **rent-exempt SOL** locked in empty or dormant token accounts.

Every time you receive SPL tokens (including spam, airdrops, or dust), Solana creates a token account that holds ~0.002–0.01 SOL as rent. When the token balance reaches zero, you can close the account and reclaim that SOL.

This tool scans your wallet, identifies closeable empty accounts, enriches them with token metadata and inactivity data, calculates potential reclaimable SOL, and presents everything in a clean, prioritized table.

**Perfect for degens, traders, and NFT collectors** who have accumulated dozens or hundreds of unused token accounts.

## Features

- **Zero-balance token account detection** (standard SPL + Token-2022)
- **Reclaimable SOL calculation** (with USD estimate)
- **Token metadata enrichment** via Jupiter token list and Metaplex fallback
- **Inactivity estimation** (months since last activity)
- **Smart prioritization** with Diamond ◆, Golden ◆, and Cleanup ◇ tiers
- **Beautiful CLI output** with colors and sortable table
- **Safe & read-only** – no private keys required

## Screenshot

```
Total Reclaimable: 1.8421 SOL (~$230.26 USD)

Diamond Tier: 42 | Golden Tier: 68 | Cleanup: 15

┌────────────┬──────────────┬────────┬─────────────┬──────────┬──────────────┐
│ Pubkey     │ Symbol       │ Amount │ Reclaim SOL │ Inactive │ Tier         │
├────────────┼──────────────┼────────┼─────────────┼──────────┼──────────────┤
│ 7x4f...    │ UNKNOWN      │ 0.0000 │ 0.00203     │ 18 mo    │ ◆ Diamond    │
│ 9pLm...    │ BONK         │ 0.0000 │ 0.00203     │ 14 mo    │ ◆ Diamond    │
└────────────┴──────────────┴────────┴─────────────┴──────────┴──────────────┘
```

## Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup

```bash
git clone https://github.com/ilyarah/sol-reclaimer.git
cd sol-reclaimer
npm install
```

## Usage

```bash
npm start
```

You will be prompted to enter a Solana wallet address:

```
Enter your Solana wallet address:
```

Paste any public wallet address and press Enter.

The tool will:
1. Scan all token accounts
2. Filter closeable empty accounts
3. Enrich with metadata and pricing
4. Display a detailed report

### Example Test Address (with real reclaimable funds)
Try this address to see meaningful results:

`5tzFkiKscXHK5ZXCGbXZxdw7gTjjD1mBwuoFbhUvuAi9`

## How to Reclaim the SOL

The tool shows you what’s reclaimable but does not sign transactions (for safety).

Use one of these methods to actually close the accounts:
- **Phantom / Solflare / Backpack** → Go to Tokens tab → "Close Empty Accounts"
- **Sol Incinerator** (https://sol.incinerator.com) – popular community tool
- **Jupiter Wallet Cleaner** or similar dApps

## Future Plans
- Batch transaction generation (sign & send)
- Support for compressed NFTs rent reclamation
- Web version with wallet connect
- Export to CSV/JSON

## Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or suggestions
- Submit pull requests with improvements
- Add support for more token types

Steps:
1. Fork the repo
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Solana Labs and the Solana ecosystem
- Jupiter Aggregator for token lists
- Metaplex for NFT metadata tools
- The Solana community for inspiration and feedback

## Contact

For questions, suggestions, or support:  
**ilyarahnavard@gmail.com**

---

⭐ Star this repo if you reclaimed some free SOL!  
Happy cleaning!
```

Copy this entire text into a file named `README.md` in your project root — it’s now ready for GitHub and looks professional.

Let me know if you want a LICENSE file or GitHub Actions workflow next! 🚀
