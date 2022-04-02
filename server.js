const experss = require("express");
const Joi = require('joi');
const app = experss();

// middleware 
 app.use(experss.json());

const port = process.env.PORT || 3000;

const courses = [
    { name: 'course1', id: 1},
    { name: 'course2', id: 2},
    { name: 'course3', id: 3}
]



app.get('/',(req,res)=>{
    res.send("hello world")
});


app.get('/api/courses',(req,res)=>{
res.send(courses)
});

app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('the course with the give ID was wrong ')
   res.send(course);
});


// post request 

app.post('/api/courses', (req,res)=>{

    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.ValidationError(req.body, schema);
    console.log(result);



    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send('valid name is required and should be minimum 3 characters')
        return;

    }
    const course = {
        id:courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res) => {
    
})





app.listen(port, ()=> console.log(`the server is running in ${port}`))