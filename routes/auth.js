const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// resister rout  
 router.post("/resister", async (req,res)=>{


  try
  {
      // genetate new password 
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt); // making the password bycript and adding salt

      //create new user
      const newUser = new User ({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
    
      });


      // save user and return response
      const user = await newUser.save() // saveing the data to mongodb
      res.status(200).json(user) // send the json data to 
  } 
  catch(err){
   console.log(err)
  }
   
});


module.exports = router;