const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');
const connect = require('../lib/connect');
const request = chai.request(app);

const DB_URI = 'mongodb://localhost:27017/unicorns-test';


let fakeHomie1 = {
    name: 'fake',
    likes: 'poser',
};

let fakeHomie2 = {
    name: 'fake2',
    likes: 'poser2',
};

let fakeHomie3 = {
    name: 'fake3',
    likes: 'updated like',
};

describe('homies REST api', () => {

    before(() => connect.connect(DB_URI));
    before(() => connect.db.dropDatabase());
    after(() => connect.close());

    describe('POST /homies', () => {
        it('saves a homie when we post', () => {
            return request
                .post('/homies')
                .send(fakeHomie1)
                .then(res => {
                    return res.body;
                })
                .then(savedHomie => {
                    assert.ok(savedHomie._id);
                    fakeHomie1._id = savedHomie._id;
                    assert.deepEqual(savedHomie, fakeHomie1);
                });

        });
    });

    describe('GET /homies', () => {

        it('returns array of all resources', () => {

            return request
                .post('/homies')
                .send(fakeHomie2)
                .then(res => res.body)
                .then(savedHomie => {
                    fakeHomie2 = savedHomie;
                })
                .then(() => request.get('/homies'))
                .then(res => res.body)
                .then(homieArray => assert.deepEqual(homieArray, [fakeHomie1, fakeHomie2]));
        });

        it('updates homie data', () => {

            const updatedName = fakeHomie2.name = 'chris';

            return request
                .put(`/homies/${fakeHomie2._id}`)
                .send(fakeHomie2)
                .then(() => request.get(`/homies/${fakeHomie2._id}`))
                .then(res => res.body)
                .then(savedHomie => assert.deepEqual(savedHomie.name, updatedName));


        });

    });

    describe('GET /homies/:id', () => {

        it('returns the single object specified by the id', () => {

            return request
                .get(`/homies/${fakeHomie1._id}`)
                .then(res => res.body)
                .then(homie => {
                    assert.deepEqual(homie, fakeHomie1);
                });
        });

        it('returns 404 not found if no resource found with that id', () => {

            return request
                .get('/homies/doesnotexist')
                .then(
                () => {
                    throw new Error('successful status code not expected');
                },

                res => {
                    assert.equal(res.status, 404);
                    assert.ok(res.response.body.error);
                });
        });

    });

});

