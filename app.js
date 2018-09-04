const Joi = require('joi');
const express = require('express');
const app = express();
const movies = require('./routes/movies');

app.use(express.json());
app.use('/api/movies', movies);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api', (req, res) =>{
    res.send(['Movies','Books','Music']);
});


// Reading the port from an environment variable
const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Listening on port ${port}`));

