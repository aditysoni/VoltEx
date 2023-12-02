require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

// const GOERLI_URL = process.env.GOERLI_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url:"https://eth-goerli.g.alchemy.com/v2/32YKYyMjTGgfzGPFxA-QjGRUsorsDeKT",
      accounts: ["25feb674107bba57d56c12fe76222685719274350d17868d7facef78543be5e8"],
    },
  },
};
