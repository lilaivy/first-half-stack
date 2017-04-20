const connect = require('../connect');
const bodyParser = require('../helpers/bodyParser');
const ObjectId = require('mongodb').ObjectId;

function homies(req, res) {
    const homies = connect.db.collection('homies');


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
            res.end(serialized); //res.end has to have stringified param

        });

}





module.exports = homies;