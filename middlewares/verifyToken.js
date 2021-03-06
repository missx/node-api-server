var jwt = require('jsonwebtoken');
var config = require('../config/globalConfig');

module.exports = function(req,res,next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.JWT_SECRET, function(err, decoded) {
            if (err) { //failed verification.
                return res.json({
                    "error": true,
                    "message": "Token is not valid"
                });
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {        
        // forbidden without token
        return res.status(403).send({
            "error": true
        });
    }
}