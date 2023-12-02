const mongoose = require("mongoose");

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

module.exports = mongoose.model("Bidschema", BidSchema);