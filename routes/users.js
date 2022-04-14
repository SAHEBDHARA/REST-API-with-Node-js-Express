const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// update user 
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){  // chk the user id is same or not and the user should be admin
                                                               
    if(req.body.password){ // if i want to change the pasword 
        try{
            const salt = await bcrypt.genSalt(10); // we are going to create new salt password
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }catch(err){
            return res.status(500).json(err);
        }
    }
    // updating actual user 

    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set:req.body,
        });
        res.status(200).json("Account has been update")
    }catch(err){
        return res.status(500).json(err);
    }

    }else{
        return res.status(403).json("you have updated your account")
    }
});




// DELETE USER




router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){  // chk the user id is same or not and the user should be admin
                                                               
    
    // deleteing actual user 

    try{
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted")
    }catch(err){
        return res.status(500).json(err);
    }

    }else{
        return res.status(403).json("you can delete only your account")
    }
});







// GET A USER

router.get("/:id", async (req,res)=>{

    try{
        const user = await User.findById(req.params.id);// searching user using their id
        const {password,updatedAt, ...other} = user._doc // this document carries all documents

        res.status(200).json(other);

    }catch(err){
        res.status(500).json(err)
    }
});






// follow a user 


// unfollow a user 



module.exports = router;