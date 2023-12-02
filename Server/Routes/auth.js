const express=require('express')
const User = require('../models/registration');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




router.post('/signup', async (req,res)=>{

    try {
        const {name,email,Aadhar,phone,walletAddress,maxquantity,pincode,password }= req.body;
        const newUser = new User({
           name:name,email:email,Aadhar:Aadhar,phone:phone,walletaddress:walletAddress,maxquantity:maxquantity,pincode:pincode,password:password
        })
        console.log(newUser)
        const save = await newUser.save();
        res.status(200).json(save);

    } catch (error) {
        res.status(404).json(error)
    }
})


router.post("/login", async (req, res) => {
    try {
      //   const {email,password}= req.body;
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json("user not found");
      }

      console.log(user.name)
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        return res.status(401).json({message:"wrong credentials"});
      }
  
      
  
      const token = jwt.sign(
        { _id: user._id, username: user.username, email: user.email },
        "jwt-secret-key",
        { expiresIn: "3d" }
      );
      const { password, ...info } = user._doc;
      res.cookie("token", token).status(200).json(info);
      console.log(token)
    } catch (err) {
      res.status(400).json(err);
    }
  });
  

module.exports = router;





