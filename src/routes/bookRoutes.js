const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";
// location of where our mongoDB database is located
//const url = "mongodb://localhost:27017";
// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(nav) {
  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/')
    .get((req, res) => {
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const col = await db.collection('books');

          const books = await col.find().toArray();

          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });

  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(uri);
          debug('Connected correctly to server');

          const db = client.db(dbname);

          const col = await db.collection('books');

          const book = await col.findOne({_id: new ObjectID(id) });
          debug(book);
          res.render(
            'bookView',
            {
              nav,
              title: 'Library',
              book
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });
  return bookRouter;
}


module.exports = router;
