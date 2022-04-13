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
    res.status(500).json(err)
  }
   
});

// loging 

router.post("/login", async (req,res)=>{

    try{
        // for user name 
        const user = await User.findOne({email:req.body.email}) // it will find the matched user  
        !user && res.status(404).json("user not found") // if there is no user of this email just response that
         
        // for password 
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password ");

        // if user enter true password 
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }

   
})



// export the module
module.exports = router;