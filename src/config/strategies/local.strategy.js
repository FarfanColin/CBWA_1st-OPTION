const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";
// location of where our mongoDB database is located

// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      emailField: 'email',
      passwordField: 'password',
      usertypeField: 'usertype'
    }, (username, password, email, usertype, done) => {
      const MongoClient = require("mongodb").MongoClient;
      const dbname = 'CA';
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


module.exports = function localStrategycomment(){
  passport.use(new Strategy(
    { 
      commentnameField: 'commentname'
    },(commentname, done) => {
      const commentUser = {
        commentname
      };
      done(null, commentUser);
    }
    ));
};

module.exports = function localStrategyproject(){
  passport.use(new Strategy(
    { 
      nameField: 'name',
      idField: 'id',
      slugField: 'slug',
      descriptionField: 'description',
    },(name, id, slug, description, done) => {
      const projectUser = {
        name, id, slug, description
      };
      done(null, projectUser);
    }
    ));
};