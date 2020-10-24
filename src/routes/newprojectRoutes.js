const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";
// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:newprojectRoutes');
const passport = require('passport');

const newprojectRouter = express.Router();

function router() {
    newprojectRouter.route('/newproject')
    .post((req, res) => {
        const { name, id, slug, description }= req.body;
        const uri = process.env.MONGO_URI;
        const MongoClient = require("mongodb").MongoClient;
        const dbname = "CA";

        (async function addProject(){
            let client;
            try {
                client = await MongoClient.connect(uri);
                debug('Connected correctly to server');

                const db = client.db(dbname);

                const col = db.collection('projects');
                const project = { name, id, slug, description };
                const results = await col.insertOne(project);
                debug(results);
                req.login(results.ops[0], ()=>{
                    res.redirect('/newproject/newproject');
                });
            } catch(err){
                debug(err);
            }
        }());
        });
        newprojectRouter.route('/newproject')
        .get((req, res) => {
            res.json(req.user);
        });
        
        return newprojectRouter;
    }
    
    module.exports = router;