const express = require('express');
const app = express(); //Q: so app automatically wraps the entire file? No need to create a function called app to export?
const morgan = require('morgan');
const ObjectID = require('mongodb').ObjectID; //Q: is this necessary? why dont' we have access to this when we require mongo in connect.js?
const bodyParser = require('body-parser'); //does this replace our helper function enitrely?
const connect = require('./connect');

// const routes = { 'homies': homies };

app.use(bodyParser.json()); //Q:replaces body parser helper function? built into express
app.use(morgan('dev')); //NOTE: this is just the convention with morgan.

app.use(express.static('public')); //Q: what belongs in my public directory?...nothing for this assignment.

app.get('/homies'), (req, res) => {
    connect.db.collection('homies')
    .find(req.query).toArray()
    .then(homies => {
        res.end(homies);
    });
};


app.get('/homies/:id', (req, res) => {
    const _id = new ObjectID(req.params.id);
    connect.db.collection('homies')
        .findOne({ _id })
        .then(homie => {
            if (!homie) {
                res.status(404).send({ error: 'resource not found' });
            } else {
                console.log('homie', homie);
                return res.send(homie);
            }
        });
});

app.post('/homies', (req, res) => {
    connect.db.collection('homies')
        .insert(req.body)
        .then(response => { //Q: why? this is not a problem in in-class code
            return response.ops[0];
        })
        .then(savedHomie => res.send(savedHomie))
        .catch(err => console.log(err));
});



module.exports = app;




// // const parsePath = require('./helpers/parsePath');
// const notFound = require('./helpers/notFound');
// // const bodyParser = require('./helpers/bodyParser');
// const homies = require('./routes/homies');

// const routes = { 'homies': homies };

// function app(req, res) {
//     console.log(req.method, req.url);
//     const url = parsePath(req.url);
//     req.query = url.query;
//     req.params = url.params;

//     res.setHeader('Content-Type', 'application/json');
//     const route = routes[url.route] || notFound;
//     route(req, res);



// }

