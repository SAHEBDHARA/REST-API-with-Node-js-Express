const router = require("express").Router();
const { promise } = require("bcrypt/promises");
const Post = require("../models/post");
const User = require("../models/user");

// Create a post 
router.post("/", async (req,res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
} )


// Update a post 

router.put("/:id", async (req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){ // chk the id of user 
        await post.updateOne({$set:req.body});
        res.status(200).json("the post has been updated")
    }else{
        res.status(403).json("you can update only your account")
    }
    }catch(err){
        res.status(500).json(err)
    }
});



// Delete a post 

router.delete("/:id", async (req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){ // chk the id of user 
        await post.deleteOne();
        res.status(200).json("the post has been deleted")
    }else{
        res.status(403).json("you can delete only your account")
    }
    }catch(err){
        res.status(500).json(err)
    }
});



// like and dislike a post

router.put("/:id/like", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json("the post has been liked");

        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json("the post has been unliked");
        }
    }catch(err){
        res.status(500).json(err);
    }
})

// Get a post 

router.get("/:id", async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
});

// Get  timeline posts

router.get("/timeline/:userId", async(req,res)=>{
 
    try{
        const currentUser = await User.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
               return Post.find({userId:friendId})
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts))//response.data.status
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;
