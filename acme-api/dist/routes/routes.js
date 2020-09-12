"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _mongo = _interopRequireDefault(require("../db/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

/**
 * Index - Render listing of items
 */
router.get('/', function (req, res, next) {
  _mongo["default"].getAll().then(function (items) {
    res.json(items);
  })["catch"](function (error) {
    var message = "Could not getAll() because: ".concat(error);
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
  var _req$body = req.body,
      description = _req$body.description,
      severity = _req$body.severity,
      created = _req$body.created,
      status = _req$body.status;

  if (!description) {
    res.status(400).end('Bad Request');
    return;
  }

  var payload = {
    description: description,
    severity: severity || 'minor',
    status: status || 'open',
    created: created || new Date().toISOString(),
    resolved: ''
  };

  _mongo["default"].save(payload).then(function (id) {
    console.log(id);
    res.status(200).json({
      id: id
    });
  })["catch"](function (err) {
    var message = "There was an error saving your item: ".concat(err);
    console.log(message);
    res.json({
      error: message
    });
  });
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
    var message = "There was an error getting your item: ".concat(err);
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
  var _req$body2 = req.body,
      description = _req$body2.description,
      severity = _req$body2.severity,
      status = _req$body2.status,
      created = _req$body2.created;

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
    var message = "There was an error updating your item: ".concat(err);
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
    var message = "There was an error deleting your item: ".concat(err);
    console.log(message);
    res.json({
      error: message
    });
  });
});
module.exports = router;