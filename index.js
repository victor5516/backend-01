//importamos express
const express = require('express');
//creamos una instancia de express
const app = express();
//importamos body-parser
const bodyParser = require('body-parser');

//usamos body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true} ));

const courses = [
    {id: 1, name: 'Frontend'},
    {id: 2, name: 'Backend'},
    {id: 3, name: 'Databases'}
]

//CRUD
//Create = POST
//Read = GET
//Update = PUT o PATCH
//Delete = DELETE


//creamos una ruta
app.get('/', (req, res)=>{
    res.send('Hello World');
})

app.get('/api/courses', (req, res)=>{

    res.send(courses);
}
)
//obtenemos un curso por id
app.get('/api/courses/:id', (req, res)=>{
    const id = req.params.id;
    const course = courses.find( course => course.id === parseInt(id));
    if(!course) res.status(404).send('El curso no fue encontrado');
    res.send(course);
})


//crear un curso
app.post('/api/courses', (req, res)=>{
    const body  = req.body;
    const course = {
        id:courses.length + 1,
        name: body.name
    }
    courses.push(course);
    res.send(course);
})

//actualizar un curso
app.put('/api/courses/:id', (req, res)=>{
    const id = req.params.id;
    const course = courses.find( course => course.id === parseInt(id));
    if(!course) res.status(404).send('El curso no fue encontrado');
    course.name = req.body.name;
    res.send(course);
})

//eliminar un curso
app.delete('/api/courses/:id', (req, res)=>{
    const id = req.params.id;
    const course = courses.find( course => course.id === parseInt(id));
    if(!course) res.status(404).send('El curso no fue encontrado');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000');
})