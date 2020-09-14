import { MongoClient, ObjectId } from 'mongodb';
import assert from 'assert';
import conf from './conf';
import { generateToken } from '../lib/utils';

const generate = payload => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(conf.db);
        const collection = db.collection(conf.collection);
        const token = generateToken();
        collection.insertOne({ ...payload, token, valid: true, ttl: 604800000 }, (err, result) => {
          assert.equal(err, null);
          const { insertedId } = result;
          resolve(token);
          client.close();
        });
      }
    });
  });
};

const validate = token => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const db = client.db(conf.db);
        const collection = db.collection(conf.collection);
        // here we simply check for token - no ttl checks made
        collection.findOne({ token: { $eq: token }, valid: { $eq: true } }, (err, found) => {
          assert.equal(err, null);
          // invalidate token as soon as we have found it
          if (found) {
            const { _id } = found;
            collection.updateOne({ _id: ObjectId(_id) }, { $set: { valid: false } }, (err, result) => {
              assert.equal(err, null);
              assert.equal(1, result.result.n);
              resolve(found);
            });
          }
          resolve(found);
        });
      }
    });
  });
};

export default {
  validate,
  generate
};
