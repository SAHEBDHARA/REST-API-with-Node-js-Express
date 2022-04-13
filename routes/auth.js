const router = require("express").Router();
const User = require("../models/user")

// resister
 router.post("/resister", async (req,res)=>{
    const user = await new User ({
        username:"saheb",
        email:"sahebdhara@gmail.com",
        passowrd:"123456"
    })

   await user.save()
   res.send("ok")
   
})
// router.get("/resister", (req,res)=>{
//     res.send("ok")
// })

module.exports = router;