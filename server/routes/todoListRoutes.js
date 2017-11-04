var express = require("express");
var TodoListRouter = new express.Router();
var shortid = require("shortid");
var Promise = require("promise");
var path = require("path");
var TodoList = require("../models/todoListModels");

TodoListRouter.use(express.static(path.join(__dirname, "../../client")));

// Route to create a new TodoList
TodoListRouter.route("/create").post(function (req, res) {
    var newID;
    let findUniqueID = new Promise(function (resolve, reject) {
        doesntExistInDB(shortid.generate(), function (response) {
            resolve(response);
        });
    });

    findUniqueID.then(response => {
        newID = { id: response, title: "My Todo List" };
        createTodoListInDB(newID)
            .then(entry => {
                res.status(200).json(newID);
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    });
});

// Route to add individual todoList item
TodoListRouter.route("/addItem").post(function (req, res) {
    let shortID = shortid.generate();
    TodoList.findOneAndUpdate(
        { id: req.body.todoListID },
        { $push: { listItems: { text: req.body.text, completed: false, shortID: shortID } } },
        { safe: true, upsert: true },
        function (err, model) {
            if (err) {
                console.log(err);
            }
        }
    );
    res.json({ success: true, shortID: shortID });
});

// Route to retrieve all items in a todoList
TodoListRouter.route("/getItems").post(function (req, res) {
    TodoList.findOne({ id: req.body.urlID }, function (err, docs) {
        if (docs === null) {
            console.log("id not found");
            res.json({ err: "error" });
        } else {
            res.json({ itemArray: docs.listItems, title: docs.title });
        }
    });
});

// Route to delete individual item in a todoList
TodoListRouter.route("/deleteItem").post(function (req, res) {
    TodoList.update(
        { id: req.body.tlID },
        { $pull: { listItems: { shortID: req.body.tiID } } },
        { safe: true, multi: true },
        function (err, obj) {
            res.json({ err: err });
        }
    );
});

// Route to toggle completion an item
TodoListRouter.route("/toggleItem").post(function (req, res) {
    // TODO: make this find object based on todoList ID and then todoItem ID
    TodoList.update(
        { "listItems.shortID": req.body.tiID },
        {
            $set: {
                "listItems.$.completed": !req.body.currentState
            }
        },
        function (err, model) {
            if (!err) {
                res.json({ success: true });
            }
        }
    );
});

// Route to update the text of an item
TodoListRouter.route("/updateItemText").post(function (req, res) {
    // TODO: make this find object based on todoList ID and then todoItem ID
    TodoList.update(
        { "listItems.shortID": req.body.tiID },
        {
            $set: {
                "listItems.$.text": req.body.newText
            }
        },
        function (err, model) {
            if (!err) {
                res.json({ success: true });
            }
        }
    );
});

// Route to update title of a todoList
TodoListRouter.route("/updateTitle").post(function (req, res) {
    TodoList.update(
        { id: req.body.tlID },
        {
            $set: {
                title: req.body.newTitle
            }
        },
        function (err) {
            if (!err) {
                res.json({ success: true });
            }
        }
    );
});

// Route to retrieve a todoList
TodoListRouter.route("/:id").get(function (req, res) {
    TodoList.findOne({ id: req.params.id }, function (err, docs) {
        if (docs === null) {
            console.log("id not found");
            res.send("todolist id not found");
        } else {
            res.sendFile(path.join(__dirname, "../../client", "index.html"));
        }
    });
});

/* TodoList helper functions */

// Recursively check for an unused ID
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
