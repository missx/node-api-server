var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var config = require('../config/globalConfig.js');
var users = require('../models/objects/users');

//more validations should be added to this method
//it just shows how to create the jwt token
router.post('/authenticate', function(req, res) {
    
    let { username, password } = req.body;
    let user = users.usersData.find((user) => { //find username
        if (user.username === username) {
            return user;
        }
    });
    if (!user) { //if not found, error
        res.json({
            error: true,
            message: "User not found"
        });
    } else if (user.password !== password) { //if wrong pwd, error
        res.json({
            error: true,
            message: "Wrong password"
        });
    } else { //create token and send
        console.log(config.JWT_EXPIRATION_TIME);
        let token = jwt.sign(user, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRATION_TIME
        });
        res.json({
            error: false,
            token: token
        });
    }

});


module.exports = router;