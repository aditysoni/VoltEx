const express = require('express');
const app = express();
const mongoose = require("mongoose");
const authRoute = require('./routes/auth')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const userRoute = require('./routes/user');
const postRoute = require('./routes/posts')
const commentRoute=require('./routes/comments')
const multer=require('multer')
const path=require("path")

mongoose
  .connect("mongodb://127.0.0.1:27017/blog-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(cors({origin:"http://localhost:5173",credentials:true}))
  app.use(express.json())
  app.use(cookieParser())
  app.use("/images",express.static(path.join(__dirname,"/images")))
  app.use('/api/auth',authRoute)

  app.use("/api/users",userRoute)

  app.use("/api/posts",postRoute)

  app.use("/api/comments",commentRoute)





  //image upload
  const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})



const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})




  

  app.listen(5000, () => {
    console.log("server is running on port" + " " + 5000);
  });