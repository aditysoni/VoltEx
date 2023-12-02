const express = require("express");
const app = express();
const port = 9000;
const mongoose = require("mongoose");
const cors = require("cors");
// const Userroute = require("./Routes/auth");
const User = require("./models/registration");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const Order = require("./models/order");
const { Auction, Bid } = require("./models/auction");
const AuctionTran = require("./models/auctionTra") ;
const MarketTra = require("./models/marketTra")

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/// USER ROUTES

app.post("/api/auth/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      Aadhar,
      phone,
      walletAddress,
      maxquantity,
      pincode,
      password,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      Aadhar: Aadhar,
      phone: phone,
      walletaddress: walletAddress,
      maxquantity: maxquantity,
      pincode: pincode,
      password: hashpass,
    });

    const save = await newUser.save();
    res.status(200).json(save);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    //   const {email,password}= req.body;

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("user not found");
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("wrong credentials");
    }

    //  res.status(200).json(user);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.name,
        email: user.email,
        walletAddress: user.walletaddress,
      },
      "jwt-secret-key",
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/api/auth/logout", (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully!");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/auth/refetch", (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(404).json({ error: "jwt must be provided" });
    }
    jwt.verify(token, "jwt-secret-key", {}, async (err, data) => {
      if (err) {
        return res.status(404).json(err);
      }

      res.status(200).json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//-------------------------------------------------Maketplace-----------------------------------------------------------------------


///ORDER ROUTES

app.post("/api/auth/market", async (req, res) => {
  
  // console.log(req.body);

  try {
    const { walletAddress, pincode, maxunit, Price ,users } = req.body;

    


    const order = await new Order({
      walletaddre: walletAddress,
      pincode: pincode,
      maxunit: maxunit,
      price: Price,
      user:users
    });

    const User = await order.save();

    res.status(201).json({ message: "order is placed" });
  } catch (error) {
    res.status(404).json(error);
  }
});


app.get("/api/auth/marketord", async (req, res) => {
  try {
    const allOrders = await Order.find();

    if (allOrders.length === 0) {
      return res.status(404).json({ message: "no order placed" });
    }

    return res.status(201).json(allOrders);
  } catch (error) {
    res.status(404).json(error);
  }
});



//  market transactions
app.post("/api/auth/marktra",async(req,res)=>{
     
   try {

    const {  buyerWallet,  sellerWallet, price , pincode } = req.body;

      const Tra = await new MarketTra({
        buyerWallet: buyerWallet,
        sellerWallet: sellerWallet, // Corrected the case here
        price: price,
        pincode:pincode
      });

      const done  = await Tra.save();

      if(done){
         res.status(201).json({message:"transaction  saved"})
      }
    
   } catch (error) {
    res.status(404).json({message:"transaction not saved"})
   }
})




//get all  the market transaction
app.get("/api/auth/markettra", async (req, res) => {
  try {
     const allTransactions = await MarketTra.find();
 
     if (allTransactions.length === 0) {
       return res.status(404).json({ message: "no transactions found" });
     }
 
     return res.status(200).json(allTransactions);
  } catch (error) {
     res.status(500).json(error);
  }
 });







//---------------------------------------------AUCTION-------------------------------------------------------------------------------------------------------

//post the order
app.post("/api/auth/auctionord", async (req, res) => {
  try {
    const { walletAddress, pincode, minPrice, maxunit, users } = req.body;

    // Create a new Auction document (bid material)
    const auctionOrder = await new Auction({
      walletaddre: walletAddress,
      pincode: pincode,
      maxunit: maxunit,
      minprice: minPrice,
      user:users
    });

    // Save the created auction order
    await auctionOrder.save();

    res.status(201).json({ message: "Auction order is placed", auctionOrder });
  } catch (error) {
    console.error("Error creating auction order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//post the bid

app.post("/api/auth/bid", async (req, res) => {

  try {

    console.log( {"data coming " : req.body})

    const { bidAmount, orderId, bidderWallet } = req.body;



    // Find the auction order by ID
    const auctionOrder = await Auction.findById(orderId);

    if (!auctionOrder) {
      return res.status(404).json({ error: "Auction order not found" });
    }

    // Check if the auction is still open
    if (auctionOrder.status !== "OPEN") {
      return res.status(400).json({ error: "Auction is not open for bidding" });
    }

    const user = await User.findOne({
      walletaddress: bidderWallet,
    });

      if(!user){
        return res.status(403).json({message:"User does not exist"})
      }
    console.log({"user" : user})


    // Push a new bid into the bids array
    const newBid = new Bid({
      bidder: user._id, // Assuming you use authentication and have a user ID in req.user
      bidderwallet: bidderWallet,
      bidAmount: bidAmount,
    });

    auctionOrder.bids.push(newBid);

    // Save the updated auction order
    await auctionOrder.save();

    res.json({ message: "Bid placed successfully", bid: newBid });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//fetch the order
app.get("/api/auth/auction", async (req, res) => {
  try {
    const allOrders = await Auction.find();

    if (allOrders.length === 0) {
      res.status(404).json({ message: "no order placed" });
    }

    return res.status(201).json(allOrders);
  } catch (error) {
    res.status(404).json(error);
  }
});


//auction transaction

app.post("/api/auth/auctra",async(req,res)=>{
     
  try {

   const {  buyerWallet, sellerWallet, price , pincode } = req.body;

     const Tra = await new AuctionTran({
       buyerWallet: buyerWallet,
       sellerWallet: sellerWallet, // Corrected the case here
       price: price,
       pincode:pincode
     });

     const done  = await Tra.save();

     if(done){
        res.status(201).json({message:"transaction  saved"})
     }
   
  } catch (error) {
   res.status(404).json({message:"transaction not saved"})
  }
})


//get all  the market transaction
app.get("/api/auth/aucttra", async (req, res) => {
 try {
    const allTransactions = await AuctionTran.find();

    if (allTransactions.length === 0) {
      return res.status(404).json({ message: "no transactions found" });
    }

    return res.status(201).json(allTransactions);
 } catch (error) {
    res.status(404).json(error);
 }
});


//fetch the particular order

app.get("/api/auth/bids/:id",async(req,res)=>{

   try {
 
    const bid = await Auction.findById(req.params.id).populate("bids");
     if (!bid) {
      return res.status(404).json({ error: "Order not found" });
    }

    const bids =  bid.bids

     return res.status(200).json(bids)
          
    
   } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
   }
})

mongoose
  .connect("mongodb://127.0.0.1:27017/energy-dapp", {})
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
