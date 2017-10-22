var express = require("express");
//var app = express();
var TodoListRouter = new express.Router();
var shortid = require("shortid");
var Promise = require("promise");
var path = require("path");

TodoListRouter.use(express.static(path.join(__dirname, "../../client")));

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
        { $push: { listItems: { text: req.body.text, completed: false } } },
        { safe: true, upsert: true },
        function (err, model) {
            console.log(err);
        }
    );
});

TodoListRouter.route("/getItems").post(function (req, res) {
    TodoList.findOne({ id: req.body.urlID }, function (err, docs) {
        if (docs === null) {
            console.log("id not found");
            res.json({ err: "error" });
        } else {
            console.log(docs.listItems);
            res.json({ itemArray: docs.listItems });
        }
    });
});

TodoListRouter.route("/:id").get(function (req, res) {
    TodoList.findOne({ id: req.params.id }, function (err, docs) {
        if (docs === null) {
            console.log("id not found");
            res.send("todolist id not found");
        } else {
            console.log("found");
            res.sendFile(path.join(__dirname, "../../client", "index.html"));
        }
    });
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
