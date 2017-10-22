var express = require("express");
//var app = express();
var TodoListRouter = new express.Router();
var shortid = require("shortid");
var Promise = require("promise");

// Require Item model in our routes module
var TodoList = require("../models/todoListModels");

// create TodoList route
TodoListRouter.route("/create").post(function (req, res) {
    var newID;
    let findUniqueID = new Promise(function (resolve, reject) {
        doesntExistInDB(shortid.generate(), function (response) {
            resolve(response);
        });
    });

    findUniqueID.then(response => {
        newID = { id: response };
        console.log(newID);
        createTodoListInDB(newID)
            .then(entry => {
                res.status(200).json(newID);
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    });
});

TodoListRouter.route("/addItem").post(function (req, res) {
    TodoList.findOneAndUpdate(
        { id: req.body.todoListID },
        { $push: { listItems: req.body.text } },
        { safe: true, upsert: true },
        function (err, model) {
            console.log(err);
        }
    );
});

// helper functions //
//this is recursive
function doesntExistInDB (shortID, callback) {
    TodoList.findOne({ id: shortID }, function (err, docs) {
        if (docs === null) {
            return callback(shortID);
        } else {
            doesntExistInDB(shortid.generate(), callback);
        }
    });
}

function createTodoListInDB (newID) {
    var todoList = new TodoList(newID);
    return todoList.save();
}

module.exports = TodoListRouter;
