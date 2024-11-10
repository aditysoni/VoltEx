# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


This platform allows users to trade electricity credits in a decentralized and transparent way. Users can:

Buy and sell electricity credits.
Participate in auctions to bid on electricity credits.
Claim electricity after winning an auction.
Check details of ongoing and past auctions.
Features
User Registration: Owners can register new users by providing necessary identification details.
Direct Selling: Users can place orders to sell electricity credits to other users.
Auction System: Users can participate in auctions to buy electricity credits by placing bids.
Electricity Claims: After winning an auction, the highest bidder can claim their purchased electricity credits.
View Auction and Order Details: Retrieve data about all auctions and orders for transparency.
Technology Stack
Smart Contract: Solidity, OpenZeppelin Contracts
Backend: Node.js, Express.js
Blockchain Network: Ethereum
Token Standard: ERC20, ERC721
Database (for server): MongoDB
Smart Contract Details
Smart Contract Files
The core smart contract for electricity trading is located in Trading.sol.

Key Structures
InfoUser: Stores user information like quantity, city code, and Aadhar number.
InfoOrder: Details of orders for direct electricity sales.
InfoAuction: Contains auction details, including start and end times, min and max bid prices, and the highest bidder.
Core Functions
addUser: Register a new user (only the owner can register users).
orderSell: Allows users to directly sell electricity credits by specifying price and quantity.
placeBid: Allows users to place bids on active auctions.
endAuction: Ends an auction and assigns the electricity credits to the highest bidder.
claimElectricity: Enables the highest bidder to claim their purchased electricity credits after an auction.
createAuction: Creates a new auction with a specified base price and duration.
Important Events
AuctionCreated: Emitted when a new auction is created.
AuctionEnded: Emitted when an auction ends, displaying the highest bid and winner.
ElectricityClaimed: Emitted when a user claims electricity after winning an auction.
