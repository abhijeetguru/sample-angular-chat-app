var authprocessor = require('../Processor/Authentication/AuthenticationProcessor');

module.exports = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (authorization == null || !authorization.startsWith('Bearer ')) {
        res.statusCode = 403;
        res.send('Please provide authorization.');
    } else {
        var validity = new authprocessor().isTokenValid(req.body.Header.Username, authorization.slice(7, authorization.length));
        if(!validity){
            res.statusCode = 401;
            res.send('You are unauthorized.');
        }else{
            next();
        }
    }
};