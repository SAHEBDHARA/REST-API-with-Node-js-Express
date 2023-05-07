const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
// const multer = require("multer")
// const fileUpload = require('express-fileupload') // new 
const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'djunn67k4',
  api_key: '417733636794263',
  api_secret: 'aV0-qawBwds0xOZ01IYaxWq5I0Y',
  secure: true,
});






dotenv.config(); // to use env we have to config first 






mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true},
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );


// app.use(fileUpload({
//     useTempFiles:true
// }))

// Middleware 

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));



// const storage = multer.diskStorage({

//     destination: function (req, file, cb) {
//       cb(null, '/FullStack/Social Medial/Rest Api/public')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })


// const upload = multer({storage: storage});

// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     try {
//         return res.status(200).json("file uploaded")
//     } catch (error) {
//         console.log(error)
//     }
// })



// creating upload request 

app.post("/api/upload",(req,res,next)=>{
    // const file = req.files.file;
    // console.log(file)

    // cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    //     console.log(result)
    // })


cloudinary.uploader
 .upload("./public/images/ad.png")
 .then(result=>console.log(result));
})



// creating home rout 



app.get("/",(req,res)=>{
    res.send("this the homepage")
})

// creating user rout
app.get("/api/user",(req,res)=>{
    res.send("welcome to user page")
})

app.get("/api/posts",(req,res) =>{
    res.send("this is user page")
})

// using the routes
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

 


app.listen(4000,()=>{
    console.log("the server is running ..")
}) 
