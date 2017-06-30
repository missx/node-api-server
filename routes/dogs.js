var express = require('express');
var router = express.Router();

var dogs = require('../models/objects/dogs');

router.get('/dogs', function(req, res) {
    res.json(dogs.dogsData);
});

module.exports = router;