/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY =
  "6d90411b0d9cce9f4ba9f0d84f340d5f8d6408ef03ff030d01f4c9780217b183";
// const RPC_URL = "https://rpc.ankr.com/polygon_mumbai";
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_mumbai: {
      url: "https://rpc.ankr.com/polygon_mumbai",
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/bOY9sPwzLLIyHZjwR2QQFX9AtruNz5Tz",
      accounts: [
        "6d90411b0d9cce9f4ba9f0d84f340d5f8d6408ef03ff030d01f4c9780217b183",
      ],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
