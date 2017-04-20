const cowsay = require('cowsay');

//this is the error message for all not found items, not just via id

module.exports = function notFound(req, res) {
    res.setHeader('Content-Type', 'text/html'); //if not found, print cowsay to localhost with err message. that's why it has to be in html
    res.statusCode = 404;
    const message = res.statusMessage = `${req.url} not found`;
    const cowsaid = cowsay.say({
        text: message,
        e: 'oO',
        T: 'U'
    });
    res.end(`<pre>${cowsaid}</pre>`);
};