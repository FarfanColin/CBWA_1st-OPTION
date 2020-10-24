const express = require('express');
const uri = process.env.MONGO_URI;
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectID;
// name of our database
const dbname = "CA";
// Options for mongoDB
const MONGO_OPTIONS = { useUnifiedTopology: true, useNewUrlParser: true };
const debug = require('debug')('app:projectController');
function projectController(nav){
    function getIndex(req, res) {
        const MongoClient = require("mongodb").MongoClient;
        const dbname = 'CA';
  
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(uri);
            debug('Connected correctly to server');
  
            const db = client.db(dbname);
  
            const col = await db.collection('projects');
  
            const projects = await col.find().toArray();
  
            res.render(
              'projectViewList',
              {
                nav,
                title: 'Projects',
                projects
              }
            );
          } catch (err) {
            debug(err.stack);
          }
          client.close();
        }());
      }
    function getById(req, res) {
        const { id } = req.params;
        const MongoClient = require("mongodb").MongoClient;
        const dbname = 'CA';
  
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(uri);
            debug('Connected correctly to server');
  
            const db = client.db(dbname);
  
            const col = await db.collection('projects');
  
            const project = await col.findOne({_id: new ObjectID(id) });
            debug(project);
            res.render(
              'projectView',
              {
                nav,
                title: 'Projects',
                project
              }
            );
          } catch (err) {
            debug(err.stack);
          }
        }());
      }
      function middleware(req, res, next){
          next();
      }
        return {
            getIndex,
            getById,
            middleware
        };
    }

module.exports = projectController;