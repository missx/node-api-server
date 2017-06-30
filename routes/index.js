var express = require('express');
var router = express.Router();

let verifyToken = require('../middlewares/verifyToken');
var mainRoute = require('./main');
var dogsRoute = require('./dogs');
var auth = require('./auth');

router.use(mainRoute);
router.use(auth);
router.use(verifyToken, dogsRoute);

//add new lines for each module you create

module.exports = router;