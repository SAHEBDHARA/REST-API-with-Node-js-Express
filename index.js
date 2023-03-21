const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


dotenv.config(); // to use env we have to config first 


// this is the connection of mongoDB to server 


mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser: true},
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    }
  );

// Middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

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
    console.log("the server is running ...")
})