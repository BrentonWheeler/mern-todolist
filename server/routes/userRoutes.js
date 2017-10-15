// itemRoutes.js

var express = require("express");
//var app = express();
var UserRouter = new express.Router();

// Require Item model in our routes module
var User = require("../models/user");

// Defined register route
UserRouter.route("/register").post(function (req, res) {
    var user = new User(req.body.data);
    user
        .save()
        .then(user => {
            res.status(200).send("registered");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
    console.log(req.body);
});

// Defined login route
UserRouter.route("/login").post(function (req, res) {
    User.findOne({ username: req.body.data.username }, function (err, docs) {
        if (docs.length === 0) {
            res.status(400).send("username doesnt exist");
        } else if (docs.password === req.body.data.password) {
            res.status(200).send("logged in");
        } else {
            res.status(400).send("wrong password");
        }
    });
    //console.log(req.body)
});

// Defined get data(index or listing) route
UserRouter.route("/").get(function (req, res) {
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
