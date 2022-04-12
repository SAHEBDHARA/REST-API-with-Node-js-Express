const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config(); // to use env we have to config first 


// this is the connection of mongoDB to server 
mongoose.connect(process.env.MONGO_URL,
    {useNewUrlParser: true},()=>{
   console.log("server is connected to mongodb..")
});





app.listen(3000,()=>{
    console.log("the server is running ...")
})