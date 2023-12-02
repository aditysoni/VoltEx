const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    Aadhar: {
      type: String,
      require: true,
    },
    phone: {
      type: String,

      require: true,
    },
    walletaddress: {
      type: String,
      require: true,
    },
    maxquantity: {
      type: String,
      require: true,
    },
    pincode: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("registration", Register);
