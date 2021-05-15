const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

function verifyToken(req, res, next) {
    // const test = req.headers.authorization;
    // console.log(test);
    if (req.headers.authorization) {
        var token = req.headers.authorization.split(' ');
        //console.log(token);

        if (token[0] === 'Bearer') {
            jwt.verify(token[1], keys.cookieKey, function (err, decoded) {
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Failed to authenticate token' });
                }

                req.googleId = decoded.googleId;
                req._id = decoded._id
                //console.log('googleId:', req.googleId + '\ndecoded:', decoded.googleId);
                next();
            });
        }
        else {
            return res.status(401).send({ auth: false, message: 'Invalid token' });
        }
    }
    else {
        return res.status(401).send({ auth: false, message: 'no token provided' });
    }
}

module.exports = verifyToken;