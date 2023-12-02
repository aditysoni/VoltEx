const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      username: username,
      email: email,
      password: hashpass,
    });
    const save = await newUser.save();
    res.status(200).json(save);
  } catch (err) {
    res.status(400).json(err);
  }
});

//login

router.post("/login", async (req, res) => {
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
      { _id: user._id, username: user.username, email: user.email },
      "jwt-secret-key",
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get("/logout",async (req,res)=>{
    try{
        res.clearCookie("token",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//Refetch the user
router.get("/refetch", (req,res)=>{
    const token=req.cookies.token
    if (!token) {
        return res.status(404).json({ error: 'jwt must be provided' });
      }
    jwt.verify(token,"jwt-secret-key",{}, async (err,data)=>{
        if(err){
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})


module.exports = router;
