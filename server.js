var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Model = require('./model/Model');
Model = new Model();

var app = express();
var server = app.listen(3000);

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.all('/', function(request, response) {
    response.send("Welcome to Node JS app");
});

app.post('/saveData', function(request, response) {
    var paramOne = request.body.paramOne;
    var paramTwo = request.body.paramTwo;
    Model.saveData(paramOne, paramTwo).then(function(res) {
        response.json({ success: true, msg: 'Data has been saved successfully.', data: "" });
    }, function(err) {
        response.json({ success: false, msg: err });
    });

    
});

app.get('/getData', function(request, response) {
    Model.getData().then(function(res) {
        response.json({ success: true, msg: 'Data has been fetched successfully.', data: res });
    }, function(err) {
        response.json({ success: false, msg: err });
    });
});