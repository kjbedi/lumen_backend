var express = require('express');
var router = express.Router();

const controller = require("../controllers");

router.get('/', function (req, res) {
    controller.getItemDetail.itemDetailByid(req, res);
})

module.exports = router;