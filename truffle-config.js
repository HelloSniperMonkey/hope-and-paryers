require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    mainnet: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: process.env.INFURA_API_URL,
          numberOfAddresses: 1,
          shareNonce: true
        }),
      network_id: 1,        // Mainnet network id
      gas: 5500000,         // Gas limit (adjust based on your contract's needs)
      gasPrice: 10000000000, // 10 Gwei (adjust based on current gas prices)
      confirmations: 2,     // # of confirmations to wait between deployments
      timeoutBlocks: 200,   // # of blocks before a deployment times out
      skipDryRun: true      // Skip dry run before migrations
    }
  },
  compilers: {
    solc: {
      version: "0.5.0",    // Use the same compiler version you've tested with
    }
  }
};
