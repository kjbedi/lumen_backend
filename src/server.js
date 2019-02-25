var express = require('express');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://jasraj:hello@lumen-shard-00-00-827t7.mongodb.net:27017,lumen-shard-00-01-827t7.mongodb.net:27017,lumen-shard-00-02-827t7.mongodb.net:27017/test?ssl=true&replicaSet=Lumen-shard-0&authSource=admin&retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
})

app.get('/product-list', function (req, res) {
    client.connect(err => {
        const collection = client.db("lumen").collection("product").find({}).toArray(function(err, result) {
            console.log("Product list generated and sent");
            res.send(JSON.stringify(result));
        });
        
        // perform actions on the collection object
        client.close();
    });
    
    
})

app.get('/product-detail', function (req, res) {
    res.send('Hello World');
})

app.get('/report', function (req, res) {
    res.send('Hello World');
})

app.post('/report', function (req, res) {
    res.send('report');
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    var msg = `App started at port number: ${port}`; 
    console.log(msg)
})






// mongodb://_:<API-KEY>@stitch.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=backend-lumen-zgdot:mongodb-atlas:api-key