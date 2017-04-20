const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/friends';

const connect = {
    db: null
};

mongo.connect(url)
    .then(db => {
        connect.db = db;
    })
    .catch(err => {
        console.log('MONGO ERROR', err);
    });

module.exports = connect;