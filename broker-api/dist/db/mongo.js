"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _mongodb = require("mongodb");

var _assert = _interopRequireDefault(require("assert"));

var _conf = _interopRequireDefault(require("./conf"));

var _utils = require("../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var generate = function generate(payload) {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        var collection = db.collection(_conf["default"].collection);
        var token = (0, _utils.generateToken)();
        collection.insertOne(_extends({}, payload, {
          token: token,
          valid: true,
          ttl: 604800000
        }), function (err, result) {
          _assert["default"].equal(err, null);

          var insertedId = result.insertedId;
          resolve(token);
          client.close();
        });
      }
    });
  });
};

var validate = function validate(token) {
  return new Promise(function (resolve, reject) {
    _mongodb.MongoClient.connect(_conf["default"].host, _conf["default"].options, function (err, client) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        var db = client.db(_conf["default"].db);
        var collection = db.collection(_conf["default"].collection); // here we simply check for token - no ttl checks made

        collection.findOne({
          token: {
            $eq: token
          },
          valid: {
            $eq: true
          }
        }, function (err, found) {
          _assert["default"].equal(err, null); // invalidate token as soon as we have found it


          if (found) {
            var _id = found._id;
            collection.updateOne({
              _id: (0, _mongodb.ObjectId)(_id)
            }, {
              $set: {
                valid: false
              }
            }, function (err, result) {
              _assert["default"].equal(err, null);

              _assert["default"].equal(1, result.result.n);

              resolve(found);
            });
          }

          resolve(found);
        });
      }
    });
  });
};

var _default = {
  validate: validate,
  generate: generate
};
exports["default"] = _default;