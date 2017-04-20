const parsePath = require('./helpers/parsePath');
const notFound = require('./helpers/notFound');
const bodyParser = require('./helpers/bodyParser');
const homies = require('./routes/homies');

const routes = { 'homies': homies };

function app(req, res) {
    console.log(req.method, req.url);
    const url = parsePath(req.url);
    req.query = url.query;
    req.params = url.params;

    res.setHeader('Content-Type', 'application/json');
    const route = routes[url.route] || notFound;
    route(req, res);



}

module.exports = app;