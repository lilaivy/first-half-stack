const express = require('express');
const app = express(); //Q: so app automatically wraps the entire file? No need to create a function called app to export?
const morgan = require('morgan');
const ObjectID = require('mongodb').ObjectID; 
const bodyParser = require('body-parser'); 
const connect = require('./connect');


app.use(bodyParser.json()); 
app.use(morgan('dev')); //NOTE: this is just the convention with morgan.

app.use(express.static('public')); //Q: what belongs in my public directory?...nothing for this assignment. It's typically reserverd for images and other assets (see in class code).

app.get('/homies', (req, res) => {
    connect.db.collection('homies')
    .find(req.query).toArray()
    .then(homies => {
        res.send(homies);
    });
  
});


app.get('/homies/:id', (req, res) => {
    const _id = new ObjectID(req.params.id);
    connect.db.collection('homies')
        .findOne({ _id })
        .then(homie => {
            if (!homie) {
                res.status(404).send({ error: 'resource not found' });
            } else {
                return res.send(homie);
            }
        });
});

app.post('/homies', (req, res) => {
    connect.db.collection('homies')
        .insert(req.body)
        .then(response => { 
            return response.ops[0];
        })
        .then(savedHomie => res.send(savedHomie))
        .catch(err => console.log(err));
});



module.exports = app;






