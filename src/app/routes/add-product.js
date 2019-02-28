var express = require('express');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://jasraj:hello@lumen-shard-00-00-827t7.mongodb.net:27017,lumen-shard-00-01-827t7.mongodb.net:27017,lumen-shard-00-02-827t7.mongodb.net:27017/test?ssl=true&replicaSet=Lumen-shard-0&authSource=admin&retryWrites=true";
var router = express.Router();
var yyyymmdd = () => {
    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
}


router.get('/', function (req, res) {
    var userId = req.query.user;
    var productId = req.query.product;
    var quantity = req.query.quantity;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        //this flag is set to know whether to create a new document or update an existing one.
        var makeNewEntryflag = true;
        var checkInDb =new Promise((resolve, reject) => {
            const collection = client.db("lumen").collection("transactions").find({user_id:userId},{status:1}).toArray(function(err, result) {
                result.forEach(function(element){
                    if(element.status == "inCart"){
                        makeNewEntryflag = false;
                        console.log("found");
                        console.log("resolved")
                        resolve();
                        return;
                    }
                });
                resolve();
                res.send(JSON.stringify(result));
            });
            
        }).then((v) => {
            console.log(makeNewEntryflag);
            if(makeNewEntryflag){
                var dbo = client.db("lumen");
                var myobj = { user_id: userId, status: "inCart", items_id: [`${productId},${quantity}`], last_updated_time: `${Date.now()}`, last_updated_date :yyyymmdd()};
                dbo.collection("transactions").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                });
            }else{
                console.log("update entry");
                //update existing entry
            }
        });
            
        // perform actions on the collection object
        
    });
    client.close();
})

module.exports = router;