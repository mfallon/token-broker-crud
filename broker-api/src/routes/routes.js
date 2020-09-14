import fs from 'fs';
import express from 'express';
import mongo from '../db/mongo';

const router = express.Router();

/*
 * TODO: secure communication over https
 */

router.get('/', function(req, res, next) {
  res.status(404).end();
});

/**
 * Create - Post
 */
router.post('/generate', (req, res) => {
  const {
    subject,
    object
  } = req.body;

  const payload = {
    created: new Date().getTime(),
    ttl: 604800000,
    data: {
      subject,
      object
    }
  };
  mongo.generate(payload)
    .then(token => {
      res.status(200).json({
        token
      });
    })
    .catch(err => {
      const message = `There was an error: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});


router.get('/validate/:token', (req, res) => {
  const {
    token
  } = req.params;
  mongo.validate(token)
    .then(response => {
      if (!response) {
        // if no record of this token found then return 404
        console.log("Broker says: record not found");
        res.status(404).end();
      } else {
        // return invoice information
        const {
          subject,
          object
        } = response.data;
        res.json({ subject, object });
      }
    })
    .catch(error => {
      const message = `Could not get() because: ${error}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});


module.exports = router;
