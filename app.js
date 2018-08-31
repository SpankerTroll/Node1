const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const movies = [
    {id:1, title:'Lion king'},
    {id:2, title:'It'},
    {id:3, title:'Frozen'},
];

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api', (req, res) =>{
    res.send(['Movies','Books','Music']);
});

app.get('/api/movies', (req, res) =>{
    res.send(movies);
});
app.post('/api/movies', (req, res) =>{
    const {error}=validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const movie ={
        id: movies.length+1,
        title: req.body.title
    };
    movies.push(movie);
    res.send(movie);
});

app.get('/api/movies/:id', (req, res) =>{
   const movie = movies.find(c => c.id === parseInt(req.params.id));
   if(!movie){
       res.status(404).send('Error 404');
       return;
   }
   res.send(movie);
});
app.put('/api/movies/:id', (req, res) =>{
    //Error 404
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if(!movie) return res.status(404).send('Error 404');
    //Error 400

    const {error}=validateMovies(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    movie.title = req.body.title;
    res.send(movie);
});
app.delete('/api/movies/:id', (req, res) =>{
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    // Error 404
    if(!movie) return res.status(404).send('Error 404');

    const index = movies.indexOf(movie);
    movies.splice(index,1);
    res.send(movie);
});

function validateMovies(movie) {
    const schema ={
        title: Joi.string().min(3).required()
    };
    return  Joi.validate(movie, schema);
}

// Reading the port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));

