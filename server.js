const experss = require("express");
const app = experss();

const port = process.env.PORT || 3000;



app.get('/',(req,res)=>{
    res.send("hello world")
});


app.get('/api/courses',(req,res)=>{
res.send([1,2,3])
});

app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
})


app.listen(port, ()=> console.log(`the server is running in ${port}`))