const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";

// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const uri = process.env.MONGO_URI;
      const dbname = 'CA';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const response = await db.collection('issues').insertMany(issues);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
