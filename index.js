const express = require('express')
const path = require('path')
var mongo = require('mongodb');
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://malaotou:Aa123456@ds257372.mlab.com:57372/fudu-log";

 

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/wall', express.static('wall'))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send("req.header"))
  .get('/screen', function (req, res) {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db("fudu-log");
    dbo.collection("captureScreen").find({}).toArray(function(err,result){
      res.send(result);
    })
  });

  })
  .post('/', (req, res) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("fudu-log");
      var myobj = req.body;
      dbo.collection("logs").insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
      });
    });
    res.send("1 document inserted");
  })
  .post('/image', (req, res) => {

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("fudu-log");
      var myobj = req.body;

      dbo.collection("images").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length > 3) {
          var myquery = {};
          dbo.collection("images").deleteMany(myquery, function (err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            db.close();
          });
        }
        dbo.collection("images").insertOne(myobj, function (err, res) {
          if (err) throw err;
          db.close();
        });
        db.close();
      });

    });
    res.send("1 document inserted");
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
