var express = require('express');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://jasraj:hello@lumen-shard-00-00-827t7.mongodb.net:27017,lumen-shard-00-01-827t7.mongodb.net:27017,lumen-shard-00-02-827t7.mongodb.net:27017/test?ssl=true&replicaSet=Lumen-shard-0&authSource=admin&retryWrites=true";
var router = express.Router();

router.get('/', function (req, res) {
    var Id = req.query.id;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("lumen").collection("product").find({id:Id}).toArray(function(err, result) {
            console.log("Product list generated and sent");
            res.send(JSON.stringify(result));
        });
        
        // perform actions on the collection object
        client.close();
    });
})

module.exports = router;