const mongoose = require("mongoose");
const MarketTra = new mongoose.Schema(
  {
    buyerWallet: {
      type: String,
      required: true,
    },
    sellerWallet: {  // Change the property name to "sellerWallet"
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    },
    { timestamps: true }
  );
  

  module.exports = mongoose.model("MarketTra", MarketTra);