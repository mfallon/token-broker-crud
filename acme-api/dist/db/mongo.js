"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mongodb = require("mongodb");

var _assert = _interopRequireDefault(require("assert"));

var _conf = _interopRequireDefault(require("./conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Mongo Wrappers
 */
var mongoFindAll = function mongoFindAll(db, callback) {
  var collection = db.collection(_conf["default"].collection);
  collection.find({}).toArray(function (err, result) {
    _assert["default"].equal(err, null);

    callback(result);
  });
};

var mongoInsertOne = function mongoInsertOne(record, db, callback) {
  var collection = db.collection(_conf["default"].collection);
  collection.insertOne(record, function (err, result) {
    _assert["default"].equal(err, null);

    callback(result);
  });
};

var mongoFindOne = function mongoFindOne(id, db, callback) {
  var collection = db.collection(_conf["default"].collection);
  collection.findOne((0, _mongodb.ObjectId)(id), function (err, result) {
    _assert["default"].equal(err, null);

    callback(result);
  });
};

var mongoUpdateOne = function mongoUpdateOne(id, set, db, callback) {
  var collection = db.collection(_conf["default"].collection);
  collection.updateOne({
    _id: (0, _mongodb.ObjectId)(id)
  }, set, function (err, result) {
    _assert["default"].equal(err, null);

    _assert["default"].equal(1, result.result.n);

    callback(result);
  });
};

var mongoDeleteOne = function mongoDeleteOne(id, db, callback) {
  var collection = db.collection(_conf["default"].collection);
  collection.deleteOne({
    _id: (0, _mongodb.ObjectId)(id)
  }, function (err, result) {
    _assert["default"].equal(err, null);

    _assert["default"].equal(1, result.result.n);

    callback(result);
  });
};
/**
 * Formatter
 */


var format = {
  date: function date(dateStr) {
    return !isNaN(new Date(dateStr).getTime()) ? "" + new Date(dateStr).toLocaleString() : '';
  }
};

var formatter = function formatter(items) {
  return items.map(function (item) {
    return _extends({}, item, {
      id: item._id,
      // remap for frontend
      created: format.date(item.created),
      resolved: format.date(item.resolved)
    });
  });
};
/**
 * Module
 */


var getAll = function getAll() {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoFindAll(db, function (res) {
          resolve(formatter(res));
          client.close();
        });
      }
    });
  });
};
/**
 */


var save = function save(payload) {
  // TODO: connect to broker api to see if we have a token present
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoInsertOne(payload, db, function (res) {
          var insertedId = res.insertedId;
          resolve("" + insertedId);
          client.close();
        });
      }
    });
  });
};
/**
 */


var get = function get(id) {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoFindOne(id, db, function (res) {
          var result = _extends({}, res, {
            created: format.date(res.created),
            resolved: format.date(res.resolved)
          });

          resolve(result);
          client.close();
        });
      }
    });
  });
};
/**
 */


var update = function update(id, payload) {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoUpdateOne(id, {
          $set: payload
        }, db, function (res) {
          resolve("" + id);
          client.close();
        });
      }
    });
  });
};
/**
 */


var remove = function remove(id) {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoDeleteOne(id, db, function (res) {
          var result = res.result;
          resolve("Deleted " + result.n + " record with id: " + id);
          client.close();
        });
      }
    });
  });
};

var _default = {
  getAll: getAll,
  save: save,
  get: get,
  update: update,
  remove: remove
};
exports["default"] = _default;