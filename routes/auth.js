const router = require("express").Router();
const User = require("../models/user")

// resister rout
 router.get("/resister", async (req,res)=>{
    const user = await new User ({
        username:"saheb",
        email:"sahebdhara@gmail.com",
        passowrd:"123456"
    })

   await user.save()
   res.send("ok")
   
})


module.exports = router;