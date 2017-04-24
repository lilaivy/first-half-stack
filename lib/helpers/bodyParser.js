//Why do we have to parse the body?

module.exports = function bodyParser(req) {
    return new Promise(resolve => { //QUESTION: why no reject param?...because nothing can go wrong when parsing the data
        let body = '';
        req.on('data', data => {
            body += data;
        });

        req.on('end', () => {
            console.log('body', body);
            resolve(body);
        });
    });
};