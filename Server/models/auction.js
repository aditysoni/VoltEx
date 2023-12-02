const mongoose = require("mongoose");

// Schema 1: Bid Schema
const BidSchema = new mongoose.Schema(
  {
    bidder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "registration",
    },
    bidderwallet: {
      type: String,
    },
    bidAmount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Schema 2: Auction Schema
const AuctionSchema = new mongoose.Schema(
  {
    walletaddre: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      unique: true,
      required: true,
    },
    maxunit: {
      type: String,
      required: true,
    },
    minprice: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "OPEN",
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bids: [BidSchema], // Embedding BidSchema in AuctionSchema
  },
  { timestamps: true }
);

// Export both schemas
module.exports = {
  Auction: mongoose.model("Auction", AuctionSchema),
  Bid: mongoose.model("Bid", BidSchema),
};
