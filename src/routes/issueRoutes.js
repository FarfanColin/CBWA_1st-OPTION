const express = require('express');
const issueController = require('../controllers/issueController');


const issueRouter = express.Router();

function router(nav) {
  const { getIndex, getById, middleware} = issueController(nav);
  issueRouter.use(middleware);
  issueRouter.route('/')
    .get(getIndex);

  issueRouter.route('/:id')
  //issueRouter.route('/issues/:id')
    .get(getById);
  return issueRouter;
}


module.exports = router;
