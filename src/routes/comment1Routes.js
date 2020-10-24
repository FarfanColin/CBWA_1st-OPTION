const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";

// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:comment1Routes');

const comment1Router = express.Router();

function router(nav) {
  comment1Router.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  comment1Router.route('/')
    .get((req, res) => {
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'CA';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const col = await db.collection('comments');

          const comments = await col.find().toArray();

          res.render(
            'commentViewList',
            {
              nav,
              title: 'Comments',
              comments
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  comment1Router.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'CA';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const col = await db.collection('comments');

          const comment = await col.findOne({_id: new ObjectID(id) });
          debug(comment);
          res.render(
            'commentView',
            {
              nav,
              title: 'Comments',
              comment
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return comment1Router;
}


module.exports = router;