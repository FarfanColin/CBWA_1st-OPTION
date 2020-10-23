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
        const { commentname} = req.body;
        const uri = process.env.MONGO_URI;
        const dbname = 'CA';

        (async function addcomment() {
            let client;
            try{
                client = await MongoClient.connect(uri);
                debug('Connected correctly to server');
                
                const db = client.db(dbname);

                const col = db.collection('comments');
                const comment = { commentname};
                const results = await col.insertOne(comment);
                debug(results);
                req.login(results.ops[0], ()=>{
                    res.redirect('/comment/comment'); 
                });
            } catch(err){
                debug(err);
            }
        }());
    });
    commentRouter.route('/comment')
    .get((req, res)=>{
        res.json(req.user);
    });
    return commentRouter;
}
module.exports = router;
