var express = require('express');
var app = express();
var jwt = require('express-jwt');
var bodyParser = require('body-parser');

var routes = require("./routes");

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes);



// Handle 404 error. 
app.use("*", function(req,res){
    res.status(404).send('404');
});

// Launch our API Server and have it listen on the indicated port.
app.listen(port, function() {
    console.log('Running on port ' + port);
});