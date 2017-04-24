const http = require('http');
const app = require('./lib/app');
const DB_URI = 'mongodb://localhost:27017/friends';
const connect = require('./lib/connect');
connect.connect(DB_URI);

const server = http.createServer(app);
const PORT = 3000;

server.listen(PORT, () => {
    console.log('Server now listening on', server.address());

});