var express = require('express');
var app = express();
var UserRouter = express.Router();
var shortid = require('shortid');

// Require Item model in our routes module
//var User = require('../models/user');

// Defined createTodoList route
UserRouter.route('/create').post(function (req, res) {
  let tempID = {id: shortid.generate()};
  console.log(tempID)
  res.json(tempID);
});

// Defined get data(index or listing) route
UserRouter.route('/').get(function (req, res) {
  // Item.find(function (err, itms){
  //   if(err){
  //     console.log(err);
  //   }
  //   else {
  //     res.json(itms);
  //   }
  // });
  res.send("test");
});

module.exports = UserRouter;
