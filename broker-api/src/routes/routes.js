import fs from 'fs';
import express from 'express';
import mongo from '../db/mongo';

const router = express.Router();

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
router.get('/', function(req, res, next) {
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
router.get('/generate', (req, res) => {
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
  });
  // res.send("generate!");
});


router.get('/validate', (req, res) => {
  // extract token/nonce from req params
  res.json({
    status: "/validate"
  });
  // res.send("validate!");
});


module.exports = router;
