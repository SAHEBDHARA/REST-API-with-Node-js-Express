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



    if(result.error){
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
    // look up the course 
    const course = courses.find( c => c.id === parseInt(req.params.id));
   if(!course) res.status(404).send('the course with the give ID was wrong ')

   
   const schema = {
    name: Joi.string().min(3).required()
};
// const result = Joi.ValidationError(req.body, schema);




if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;

}
const result =  validateCourse(req.body);
const {error} =  validateCourse(req.body);

course.name = req.body.name;
res.send(course);

    
})

function    validateCourse (course){

    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.Validate(course, schema);
    
    

}





app.listen(port, ()=> console.log(`the server is running in ${port}`))