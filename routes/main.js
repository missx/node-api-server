var express = require('express');
var router = express.Router();

//only main routes 

router.get('/', function(req, res){
    res.send('this is the main api page!');
});

module.exports = router;