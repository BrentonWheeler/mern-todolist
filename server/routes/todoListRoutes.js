var express = require("express");
//var app = express();
var UserRouter = new express.Router();
var shortid = require("shortid");

// Require Item model in our routes module
//var User = require('../models/user');

// Defined createTodoList route
UserRouter.route("/create").post(function (req, res) {
    let tempID = { id: shortid.generate() };
    console.log(tempID);
    res.json(tempID);
});

module.exports = UserRouter;
