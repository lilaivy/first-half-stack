//QUESTION:is this the file that connects us to MongoDB?

const mongo = require('mongodb').MongoClient;



const connect = {
    db: null,

    connect(dbUri) { //QUESTION: why is this dbUri not DB_URI from server.js line 6
        if (this.db) return Promise.reject('Already connected to db');
        return mongo.connect(dbUri)
            .then(db => this.db = db);
    },

    close() {
        if (!this.db) return Promise.resolve();
        return this.db.close()
            .then(result => {
                this.db = null;
                return result;
            });

    }
};


module.exports = connect;