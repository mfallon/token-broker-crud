import fs from 'fs';
import express from 'express';
const router = express.Router();
import mongo from '../db/mongo';

/**
 * Index - Render listing of items
 */
router.get('/', function(req, res, next) {
  mongo.getAll()
    .then(items => {
      res.json(items);
    })
    .catch(error => {
      const message = `Could not getAll() because: ${error}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});

/**
 * Create - Post
 */
router.post('/', (req, res) => {
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
});

/**
 * Edit - Get
 */
router.get('/:id', function(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).end('Bad Request');
    return;
  }
  mongo.get(id)
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      const message = `There was an error getting your item: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});


/**
 * Edit - Post
 */
router.put('/:id', function(req, res) {
  const { id } = req.params;
  const {
    description,
    severity,
    status,
    created
  } = req.body;
  if (!id || !description) {
    res.status(400).end('Bad Request');
    return;
  }
  const payload = {
    description,
    severity: severity || 'minor',
    status: status || 'open',
    created: created || new Date().toISOString(),
    resolved: status === 'closed' ?
      new Date().toISOString() :
      ''
  };
  mongo.update(id, payload)
    .then(id => {
      res.status(200).json({
        id
      });
    })
    .catch(err => {
      const message = `There was an error updating your item: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});

/**
 * Delete - Get
 */
router.delete('/:id', function(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).end('Bad Request');
    return;
  }
  mongo.remove(id)
    .then(status => {
      res.status(200).json({
        status
      });
    })
    .catch(err => {
      const message = `There was an error deleting your item: ${err}`;
      console.log(message);
      res.json({
        error: message
      });
    });
});

module.exports = router;
