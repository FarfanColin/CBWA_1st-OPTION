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
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'libraryApp';
      (async function mongo() {
        let client;

        try {
          client = await MongoClient.connect(uri);

          debug('Connected correctly to server');

          const db = client.db(dbname);
          const col = db.collection('users');

          const user = await col.findOne({ username });

          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        } catch (err) {
          console.log(err.stack);
        }
        // Close connection
        client.close();
      }());
    }));
};
