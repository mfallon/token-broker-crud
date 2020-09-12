"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _express = _interopRequireDefault(require("express"));

var _mongo = _interopRequireDefault(require("../db/mongo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();
/*
 * generate( { {} subject, {} invoice } ): nonce #
 * validate( nonce ): { subject, invoice }
 */

/*
 * TODO: secure communication over https
 */

/**
 * Index - Render listing of Issues
 */


router.get('/', function (req, res, next) {
  /*
   * return unauthorized
   */

  /*
  mongo.getAll()
    .then(issues => {
      res.json(issues);
    })
    .catch(error => {
      const message = `Could not getAll() because: ${error}`;
      console.log(message);
      res.json({
        error: message
      });
    });
    */
  // res.send("reject");
  console.log("protocol: " + req.protocol);
  console.log("secure: " + req.secure);
  res.status(404).end();
});
/**
 * Create - Post
 */

router.get('/generate', function (req, res) {
  // req.body contains { subject, invoice }

  /*
  const {
    description,
    severity,
    created,
    status
  } = req.body;
  if (!description) {
    res.status(400).end('Bad Request');
    return;
  }
  const payload = {
    description,
    severity: severity || 'minor',
    status: status || 'open',
    created: created || new Date().toISOString(),
    resolved: ''
  };
  */

  /*
   * Authorization checks - should have cert attached
   */

  /*
  mongo.save(payload)
    .then(id => {
      console.log(id);
      res.status(200).json({
        id
      });
    })
    .catch(err => {
      const message = `There was an error saving your issue: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
  */
  res.json({
    status: "/generate"
  }); // res.send("generate!");
});
router.get('/validate', function (req, res) {
  // extract token/nonce from req params
  res.json({
    status: "/validate"
  }); // res.send("validate!");
});
module.exports = router;