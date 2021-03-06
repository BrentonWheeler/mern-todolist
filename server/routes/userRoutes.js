var express = require("express");
var UserRouter = new express.Router();
var User = require("../models/userModels");

// User registration route
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

// User login route
UserRouter.route("/login").post((req, res) => {
    User.findOne({ username: req.body.data.username }, (err, docs) => {
        if (docs === null) {
            res.status(400).send("username doesnt exist");
        } else if (docs.password === req.body.data.password) {
            res.status(200).send("logged in");
        } else {
            res.status(400).send("wrong password");
        }
    });
});

module.exports = UserRouter;
