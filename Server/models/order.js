const mongoose = require("mongoose");

const Orders = new mongoose.Schema(
  {
    walletaddre: {
      type: String,
      require: true,
    },
    pincode: {
      type: String,
      unique: true,
      require: true,
    },
    maxunit: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    user: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", Orders);
