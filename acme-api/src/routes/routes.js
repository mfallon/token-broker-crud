import fs from 'fs';
import express from 'express';
const router = express.Router();
import mongo from '../db/mongo';
import api from '../services/api';

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
  const { token } = req.body;
  if (!token) {
    res.status(400).end('Bad Request');
    return;
  }
  api.validate(token, response => {
    /* TODO
     * extract the response details (subject, object)
     * and check against an internal data store
     * for identity and policy correspondence.
     *
     * For now we simply check the returned record
     * against hard coded values
    */
    const allowedPolicies = ["XN012345", "YN012345", "ZN012345"];
    const { subject, object } = response.data;
    if (allowedPolicies.includes(subject.policyNumber)) {
      // we assume John Doe belongs to a policy that
      // covers the treatment for the invoice returned
      const payload = {
        created: new Date().getTime(),
        description: `${object.provider}, ${object.dept}, ${object.service}`,
        ...subject,
        ...object
      };
      mongo.save(payload)
        .then(id => {
          res.status(200).json({
            id,
            ...payload
          });
        })
        .catch(err => {
          const message = `There was an error submitting your claim: ${err}`;
          res.status(400).json({
            message
          });
        });
    } else {
      // failure case
      const message = `${subject.name} is not covered under this scheme`;
      res.status(400).json({
        message
      });
    }
  }, err => {
    res.status(404).end(err.message);
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
