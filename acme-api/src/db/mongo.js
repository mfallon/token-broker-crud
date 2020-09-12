import { MongoClient, ObjectId } from 'mongodb';
import assert from 'assert';
import conf from './conf';

/**
 * Mongo Wrappers
 */
const mongoFindAll = (db, callback) => {
  const collection = db.collection(conf.collection);
  collection.find({}).toArray((err, result) => {
    assert.equal(err, null);
    callback(result);
  });
};

const mongoInsertOne = (record, db, callback) => {
  const collection = db.collection(conf.collection);
  collection.insertOne(record, (err, result) => {
    assert.equal(err, null);
    callback(result);
  });
};

const mongoFindOne = (id, db, callback) => {
  const collection = db.collection(conf.collection);
  collection.findOne(ObjectId(id), (err, result) => {
    assert.equal(err, null);
    callback(result);
  });
};

const mongoUpdateOne = (id, set, db, callback) => {
  const collection = db.collection(conf.collection);
  collection.updateOne({ _id: ObjectId(id) }, set, (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
};

const mongoDeleteOne = (id, db, callback) => {
  const collection = db.collection(conf.collection);
  collection.deleteOne({ _id: ObjectId(id) }, (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    callback(result);
  });
};

/**
 * Formatter
 */
const format = {
  date: dateStr =>
    !isNaN(new Date(dateStr).getTime()) ?
      `${new Date(dateStr).toLocaleString()}`:
      ''
};

const formatter = items => items.map(item => ({
  ...item,
  id: item._id, // remap for frontend
  created: format.date(item.created),
  resolved: format.date(item.resolved)
}));

/**
 * Module
 */
const getAll = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(conf.db);
        mongoFindAll(db, res => {
          resolve(formatter(res));
          client.close();
        });
      }
    });
  });
};

/**
 */
const save = payload => {
  // TODO: connect to broker api to see if we have a token present
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(conf.db);
        mongoInsertOne(payload, db, res => {
          const { insertedId } = res;
          resolve(`${insertedId}`);
          client.close();
        });
      }
    });
  });
};


/**
 */
const get = id => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const db = client.db(conf.db);
        mongoFindOne(id, db, res => {
          const result = {
            ...res,
            created: format.date(res.created),
            resolved: format.date(res.resolved)
          };
          resolve(result);
          client.close();
        });
      }
    });
  });
};

/**
 */
const update = (id, payload) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const db = client.db(conf.db);
        mongoUpdateOne(id, { $set: payload }, db, res => {
          resolve(`${id}`);
          client.close();
        });
      }
    });
  });
};

/**
 */
const remove = id => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(conf.host, conf.options, (err, client) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        const db = client.db(conf.db);
        mongoDeleteOne(id, db, res => {
          const { result } = res;
          resolve(`Deleted ${result.n} record with id: ${id}`);
          client.close();
        });
      }
    });
  });
};

export default {
  getAll,
  save,
  get,
  update,
  remove
};
