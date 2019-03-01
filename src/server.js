var express = require('express');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

var app = express();

var product = require("./app/routes/product-routes")
var productDetail = require ("./app/routes/product-detail")
var addProduct = require ("./app/routes/add-product")


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/product-list', product);
app.use('/product-detail', productDetail);
app.use('/add-product', addProduct);

app.get('/', function (req, res) {
    res.send('Hello World');
})

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port
    var msg = `App started at port number: ${port}`; 
    console.log(msg)
})






// mongodb://_:<API-KEY>@stitch.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=backend-lumen-zgdot:mongodb-atlas:api-key