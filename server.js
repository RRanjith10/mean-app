// server.js

//========= importing modules ==========
var express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 apiRoutes = require('./server/routes/api.js'); //api routes
 
// creating express server
var app = express();
 
// parse application/json 
app.use(bodyParser.json());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// configure our routes
app.use(express.static(__dirname + '/'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});


app.get('/employee', apiRoutes.getAllEmployees);

app.post('/employee', apiRoutes.addEmployee);

app.delete('/employee/:id', apiRoutes.deleteEmployee);

app.get('/employee/:id', apiRoutes.getEmployee);

app.put('/employee/:id', apiRoutes.updateEmployee);


//========= configuration ==========

// setting port number for running server
var port = process.env.port || 8000;
 
// starting express server
app.listen(port, function() {
 console.log("Server is running at : http://localhost:" + port);
});  

//========= configuration ==========