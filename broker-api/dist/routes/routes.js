"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _mongo = _interopRequireDefault(require("../db/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/*
 * TODO: secure communication over https
 */


router.get('/', function (req, res, next) {
  res.status(404).end();
});
/**
 * Create - Post
 */

router.post('/generate', function (req, res) {
  var _req$body = req.body,
      subject = _req$body.subject,
      object = _req$body.object;
  var payload = {
    created: new Date().getTime(),
    ttl: 604800000,
    data: {
      subject: subject,
      object: object
    }
  };

  _mongo["default"].generate(payload).then(function (token) {
    res.status(200).json({
      token: token
    });
  })["catch"](function (err) {
    var message = "There was an error: " + err;
    console.log(message);
    res.json({
      error: message
    });
  });
});
router.get('/validate/:token', function (req, res) {
  var token = req.params.token;

  _mongo["default"].validate(token).then(function (response) {
    if (!response) {
      // if no record of this token found then return 404
      console.log("Broker says: record not found");
      res.status(404).end();
    } else {
      // return invoice information
      var _response$data = response.data,
          subject = _response$data.subject,
          object = _response$data.object;
      res.json({
        subject: subject,
        object: object
      });
    }
  })["catch"](function (error) {
    var message = "Could not get() because: " + error;
    console.log(message);
    res.json({
      error: message
    });
  });
});
module.exports = router;