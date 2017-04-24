const connect = require('../connect');
const bodyParser = require('../helpers/bodyParser');//do I still need these helper functions?
const ObjectId = require('mongodb').ObjectId; 

function homies(req, res) {
    const homies = connect.db.collection('homies');

    if (req.method === 'POST') {
        bodyParser(req)
            .then(body => JSON.parse(body))
            .then(homie => {
                // data validation goes here
                return homies.insert(homie);
            })
            .then(homies => {
                const serialized = JSON.stringify(homies.ops[0]);
                res.end(serialized);
            });
    }
    else {
        if (req.params.id) {
            homies.findOne({ _id: ObjectId(req.params.id) })
                .then(homies => {
                    const serialized = JSON.stringify(homies);
                    res.end(serialized);
                });
        }
        homies.find(req.query).toArray()
            .then(homies => {
                const serialized = JSON.stringify(homies);
                console.log(serialized);
                res.end(serialized); //res.end has to have stringified param

            });
    }
}





module.exports = homies;