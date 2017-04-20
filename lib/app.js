const parsePath = require('./helpers/parsePath');
const notFound = require('./helpers/notFound');
const friends = require('./routes/friends');

const routes = { 'friends': friends };

function app(req, res) {
    console.log(req.method, req.url);
    const url = parsePath(req.url);
    req.query = url.query;
    req.params = url.params;
    res.end('bye');


}

module.exports = app;