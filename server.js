const experss = require("express");
const app = experss();

// middleware 
app.use(express.json());

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
    const course = {
        id:courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})


app.listen(port, ()=> console.log(`the server is running in ${port}`))