var express = require('express');
var router = express.Router();
var debug  = require('debug');
var util = require('../util').util;
var MongoClient = require("mongodb").MongoClient
var azure = require("azure");




var serviceBusService = azure.createServiceBusService('Endpoint=sb://ntt-bus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=ak9L18tmI2FssJBIZLz3OCs8U55rcYZaSbwgAR6/B34=');
var url = "mongodb://serivice-desk-store:pMzmGDeCcbMZEJ7hVirY9YEA7NMm6abpGF6oNz32D6MNTqsmdqzvdg3MLVw80eMlztxPP03vxsKxtatgPOiCFg%3D%3D@serivice-desk-store.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";


function handleGet(req, res, next) {
  debug("GET-request recieved");
  var query;
  // Providing an id overwrites giving a query in the URL
  if (req.params.id) {
    query = {
      '_id':req.params.id
    };
  } else {
    console.log(req.query)
    query = req.query.query ? JSON.parse(req.query.query) :{};
  }
  var options = req.params.options || {};

  var test = ['limit', 'sort', 'fields', 'skip', 'hint', 'explain', 'snapshot', 'timeout'];

  MongoClient.connect(url, function(err, client) {
  
    if (err){
      res.status(500);
    }

    var db = client.db(req.params.db);
    var collection = db.collection(req.params.collection);
    
    collection.find(query).toArray(function(err, docs) {
      if(err){
        res.status(404);
      }else{
        res.status(200).json(docs);
        client.close();
      }
    });
  });
}


router.get('/:db/:collection/:id?',handleGet)
router.get('/:db/:collection/', handleGet);

//Post to Queue
router.post('/send/:queue', function (req, res) {
  debug("POST Send-request recieved");
  debug(JSON.stringify(req.body));
  
  var message =req.body.data[0];
  debug(JSON.stringify(message));
    serviceBusService.sendQueueMessage(req.params.queue, JSON.stringify(message), function(error){
    if(!error){
      res.set('content-type', 'application/json; charset=utf-8');
      res.status(201).json({"ok":1});
    }
  });
});


//Update Doc
router.put('/:db/:collection/:id', function (req, res) {
  debug("PUT-request recieved");
  debug(JSON.stringify(req.params));
  var spec = {
    '_id': req.params.id
  };

  console.log(spec);

  MongoClient.connect(url, function(err, client) {
  
    if (err){
      res.status(500);
    }

    var db = client.db(req.params.db);
    var collection = db.collection(req.params.collection);
    var body = util.cleanParams(req.body)
    console.log(body);
    console.log(req.body)
    collection.updateOne(spec, { $set: body }, function(err, result) {
      if (err) {
        res.status(500).json({'status':'error while updating'});
      }else{
        res.status(201).json({'ok':1});
      }
    });
  });
});




module.exports = router;
