"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _mongo = _interopRequireDefault(require("../db/mongo"));

var _api = _interopRequireDefault(require("../services/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

/**
 * Index - Render listing of items
 */
router.get('/', function (req, res, next) {
  _mongo["default"].getAll().then(function (items) {
    res.json(items);
  })["catch"](function (error) {
    var message = "Could not getAll() because: " + error;
    console.log(message);
    res.json({
      error: message
    });
  });
});
/**
 * Create - Post
 */

router.post('/', function (req, res) {
  console.log(req.body);
  var token = req.body.token;

  if (!token) {
    res.status(400).end('Bad Request');
    return;
  } // TODO: check token with service and save if ok


  _api["default"].validate(token, function (res) {
    console.log(res.status);

    if (404 === res.status) {
      console.log("token not found");
    } else if (200 === res.status) {
      res.json({
        message: "pending"
      });
    } else {
      console.log("some other issue");
    }
  });
  /*
  mongo.save(payload)
    .then(id => {
      console.log(id);
      res.status(200).json({
        id
      });
    })
    .catch(err => {
      const message = `There was an error saving your item: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
    */

});
/**
 * Edit - Get
 */

router.get('/:id', function (req, res) {
  var id = req.params.id;

  if (!id) {
    res.status(400).end('Bad Request');
    return;
  }

  _mongo["default"].get(id).then(function (item) {
    res.status(200).json(item);
  })["catch"](function (err) {
    var message = "There was an error getting your item: " + err;
    console.log(message);
    res.json({
      error: message
    });
  });
});
/**
 * Edit - Post
 */

router.put('/:id', function (req, res) {
  var id = req.params.id;
  var _req$body = req.body,
      description = _req$body.description,
      severity = _req$body.severity,
      status = _req$body.status,
      created = _req$body.created;

  if (!id || !description) {
    res.status(400).end('Bad Request');
    return;
  }

  var payload = {
    description: description,
    severity: severity || 'minor',
    status: status || 'open',
    created: created || new Date().toISOString(),
    resolved: status === 'closed' ? new Date().toISOString() : ''
  };

  _mongo["default"].update(id, payload).then(function (id) {
    res.status(200).json({
      id: id
    });
  })["catch"](function (err) {
    var message = "There was an error updating your item: " + err;
    console.log(message);
    res.json({
      error: message
    });
  });
});
/**
 * Delete - Get
 */

router["delete"]('/:id', function (req, res) {
  var id = req.params.id;

  if (!id) {
    res.status(400).end('Bad Request');
    return;
  }

  _mongo["default"].remove(id).then(function (status) {
    res.status(200).json({
      status: status
    });
  })["catch"](function (err) {
    var message = "There was an error deleting your item: " + err;
    console.log(message);
    res.json({
      error: message
    });
  });
});
module.exports = router;