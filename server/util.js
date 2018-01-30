

var mongo = require("mongodb")
var debug = require('debug');

debug("util.js is loaded");

module.exports.util = {
  /*
   * flavorize - Changes JSON based on flavor in configuration
   */
  flavorize: function (doc, direction) {
    if (direction === "in") {
      if (config.flavor === "normal") {
        delete doc.id;
      }
    } else {
      if (config.flavor === "normal") {
        var id = doc._id.toHexString();
        delete doc._id;
        doc.id = id;
      } else {
        doc._id = doc._id.toHexString();
      }
    }
    return doc;
  },
  cleanParams: function (params) {
    var clean = JSON.parse(JSON.stringify(params));
    if (clean.id) {
      delete clean.id;
    }
    if (clean.db) {
      delete clean.db;
    }
    if (clean.collection) {
      delete clean.collection;
    }
    return clean;
  },
  parseJSON: function (data, next) {
    var json;
    try {
      json = JSON.parse(data);
    } catch (e) {
      return next("Invalid Arguemetns");
    }
    return json;
  },
  connectionURL: function (dbName) {
    var auth = "";

    //return "mongodb://" + auth + "localhost" + ":" + "27107" + "/" + dbName; // + "?maxPoolSize=20";
    return "mongodb://serivice-desk-store:pMzmGDeCcbMZEJ7hVirY9YEA7NMm6abpGF6oNz32D6MNTqsmdqzvdg3MLVw80eMlztxPP03vxsKxtatgPOiCFg%3D%3D@serivice-desk-store.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
  }
};