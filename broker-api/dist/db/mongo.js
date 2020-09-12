"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongodb = require("mongodb");

var _assert = _interopRequireDefault(require("assert"));

var _conf = _interopRequireDefault(require("./conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return !isNaN(new Date(dateStr).getTime()) ? "".concat(new Date(dateStr).toLocaleString()) : '';
  }
};

var formatter = function formatter(items) {
  return items.map(function (item) {
    return _objectSpread(_objectSpread({}, item), {}, {
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
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        mongoInsertOne(payload, db, function (res) {
          var insertedId = res.insertedId;
          resolve("".concat(insertedId));
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
          var result = _objectSpread(_objectSpread({}, res), {}, {
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
          resolve("".concat(id));
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
          resolve("Deleted ".concat(result.n, " record with id: ").concat(id));
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