var express = require('express');
const controller = require('../controllers');

const uri = "mongodb://jasraj:hello@lumen-shard-00-00-827t7.mongodb.net:27017,lumen-shard-00-01-827t7.mongodb.net:27017,lumen-shard-00-02-827t7.mongodb.net:27017/test?ssl=true&replicaSet=Lumen-shard-0&authSource=admin&retryWrites=true";
var router = express.Router();

router.get('/', function (req, res) {
    controller.addProduct.add(req, res);
})

module.exports = router;