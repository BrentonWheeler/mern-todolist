var express = require("express");
//var app = express();
var TodoListRouter = new express.Router();
var shortid = require("shortid");
var Promise = require("promise");

// Require Item model in our routes module
var TodoList = require("../models/todoListModels");

// create TodoList route
TodoListRouter.route("/create").post(function (req, response) {
    var id = new Promise(function (resolve, reject) {
        doesntExistInDB("test")
            .then(res => {
                console.log("2: " + res);
                return resolve(res);
            })
            .then(res => {
                console.log("3: " + res);
            });
    });
    let test = id();
    //console.log(tempID);
    console.log("4: " + test);

    // USE THIS AFTER PROMISE
    //console.log(res);
    //res.json(res);

    // check if short id exists in db
    // if no continue
    // if yes re-gen
});

// helper functions

// this is recursive
function doesntExistInDB (tempID) {
    TodoList.findOne({ id: tempID }, function (err, docs) {
        if (docs === null) {
            console.log("1: " + tempID);
            return Promise.resolve(tempID);
        } else {
            //console.log("got here 1 " + tempID);
            doesntExistInDB(shortid.generate());
        }
    });
}
module.exports = TodoListRouter;
