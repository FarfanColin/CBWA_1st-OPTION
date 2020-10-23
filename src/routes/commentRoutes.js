const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";
// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:commentRoutes');
const passport = require('passport');

const commentRouter = express.Router();

function router() {
  commentRouter.route('/comment')
    .post((req, res) => {
      debug(req.body);
      req.login(req.body, ()=>{
         res.redirect('/comment/comment'); 
      })
    });
    commentRouter.route('/comment')
    .get((req, res)=>{
        res.json(req.user);
    });
    return commentRouter;
}
module.exports = router;
