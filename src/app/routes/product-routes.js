var express = require('express');
const controller = require("../controllers");

var router = express.Router();

router.get('/', function (req, res) {
    controller.getProductList.getList(req, res);
})

module.exports = router;