//Why do we have to parse the body?

module.exports = function bodyParser(req) { //QUESTION: why export at the top? 
    return new Promise(resolve => { //QUESTION: why no reject param?
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