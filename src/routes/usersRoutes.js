const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";

// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:usersRoutes');

const userstRouter = express.Router();

function router(nav) {
  userstRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  userstRouter.route('/')
    .get((req, res) => {
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'CA';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const col = await db.collection('users');

          const users = await col.find().toArray();

          res.render(
            'userViewList',
            {
              nav,
              title: 'Users',
              users
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  userstRouter.route('/:id')
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

          const col = await db.collection('users');

          const user = await col.findOne({_id: new ObjectID(id) });
          debug(user);
          res.render(
            'userView',
            {
              nav,
              title: 'Users',
              user
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return userstRouter;
}


module.exports = router;