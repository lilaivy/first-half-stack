const parsedUrl = require('url').parse;

//QUESTION:why do we have to parse the URL?

module.exports = function parsePath(path) {
    const parsed = parsedUrl(path, true);
    const parts = parsed.pathname.slice(1).split('/');


    return {
        route: parts[0],
        query: parsed.query,
        params: {
            id: parts[1]
        }
    };
};