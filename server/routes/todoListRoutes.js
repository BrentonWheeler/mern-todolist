var express = require("express");
var TodoListRouter = new express.Router();
var shortid = require("shortid");
var Promise = require("promise");
var path = require("path");
var TodoList = require("../models/todoListModels");
var Trello = require("../models/trelloAuthModel");
var GitHub = require("../models/githubAuthModel");
var OAuth = require("oauth").OAuth;
var authHelpers = require("../modules/authHelpers");

/*
/     OAuth Setup and Functions
*/
const requestURL = "https://trello.com/1/OAuthGetRequestToken";
const accessURL = "https://trello.com/1/OAuthGetAccessToken";
const key = process.env.TRELLO_KEY;
const secret = process.env.TRELLO_OAUTH_SECRET;
const loginCallback = process.env.BASE_URL + "/trello/OAuthCallback";
const oauth = new OAuth(requestURL, accessURL, key, secret, "1.0A", loginCallback, "HMAC-SHA1");

TodoListRouter.use(express.static(path.join(__dirname, "../../client")));

// Route to create a new TodoList
TodoListRouter.route("/create").post((req, res) => {
    var newID;
    let findUniqueID = new Promise((resolve, reject) => {
        doesntExistInDB(shortid.generate(), response => {
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
TodoListRouter.route("/addItem").post((req, res) => {
    let shortID = shortid.generate();
    addItem(req.body.todoListID, req.body.text, shortID);
    res.json({ success: true, shortID: shortID });
});

// Route to retrieve all items in a todoList
TodoListRouter.route("/getItems").post((req, res) => {
    TodoList.findOne({ id: req.body.urlID }, (err, doc) => {
        if (doc === null) {
            console.log("id not found");
            res.json({ err: "error" });
        } else {
            res.json({
                itemArray: doc.listItems,
                title: doc.title,
                githubUpdateURL: doc.githubUpdateURL,
                githubAccessURL: doc.githubAccessURL,
                githubLinkOwner: doc.githubLinkOwner
            });
        }
    });
});

// Route to delete individual item in a todoList
TodoListRouter.route("/deleteItem").post((req, res) => {
    TodoList.update(
        { id: req.body.tlID },
        { $pull: { listItems: { id: req.body.tiID } } },
        { safe: true, multi: true },
        (err, obj) => {
            res.json({ err: err });
        }
    );
});

// Route to toggle completion an item
TodoListRouter.route("/toggleItem").post((req, res) => {
    // TODO: make this find object based on todoList ID and then todoItem ID
    TodoList.update(
        { "listItems.id": req.body.tiID },
        {
            $set: {
                "listItems.$.completed": !req.body.currentState
            }
        },
        (err, model) => {
            if (!err) {
                res.json({ success: true });
            }
        }
    );
});

// Route to update the text of an item
TodoListRouter.route("/updateItemText").post((req, res) => {
    // TODO: make this find object based on todoList ID and then todoItem ID
    TodoList.update(
        { "listItems.id": req.body.tiID },
        {
            $set: {
                "listItems.$.text": req.body.newText
            }
        },
        (err, model) => {
            if (!err) {
                res.json({ success: true });
            }
        }
    );
});

// Route to update title of a todoList
TodoListRouter.route("/updateTitle").post((req, res) => {
    //make this a promise
    updateTitle(req.body.tlID, req.body.newTitle);
    res.json({ success: true });
});

// Route to retrieve a todoList
TodoListRouter.route("/:id").get((req, res) => {
    TodoList.findOne({ id: req.params.id }, (err, docs) => {
        if (docs === null) {
            console.log("id not found");
            res.send("todolist id not found");
        } else {
            res.sendFile(path.join(__dirname, "../../client", "index.html"));
        }
    });
});

// Import a trello list into a todoList
TodoListRouter.route("/getListItems").post((req, res) => {
    updateTitle(req.body.todoListID, req.body.title);
    getTrelloListItems(req, res);
});

// Route to update GitHub update and access urls of a todoList
TodoListRouter.route("/updateGitHubLinks").post((req, res) => {
    // TODO: Make this return a thenable promise
    updateGitHubLinks(req.body.tlID, req.body.updateURL, req.body.accessURL, req.body.linkOwner);
    res.json({ success: true });
});

/* TodoList helper functions */
function addItem (todoListID, text, itemID) {
    TodoList.findOneAndUpdate(
        { id: todoListID },
        { $push: { listItems: { text: text, completed: false, id: itemID } } },
        { safe: true, upsert: true },
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

function updateTitle (todoListID, newTitle) {
    TodoList.update(
        { id: todoListID },
        {
            $set: {
                title: newTitle
            }
        },
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

function updateGitHubLinks (todoListID, updateURL, accessURL, linkOwner) {
    TodoList.update(
        { id: todoListID },
        {
            githubUpdateURL: updateURL,
            githubAccessURL: accessURL,
            githubLinkOwner: linkOwner
        },
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

// Recursively check for an unused ID
function doesntExistInDB (shortID, callback) {
    TodoList.findOne({ id: shortID }, (err, docs) => {
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

function getTrelloListItems (request, response) {
    new Promise((resolve, reject) => {
        getTrelloAuthEntryFromCookieKey(request.body.trelloAuthKey, resultDoc => {
            resolve(resultDoc);
        });
    }).then(dbEntry => {
        oauth.getProtectedResource(
            "https://api.trello.com/1/lists/" + request.body.trelloListID + "/cards",
            "GET",
            dbEntry.token,
            dbEntry.secret,
            (error, data, res) => {
                let dataJSON = JSON.parse(data);
                let itemArray = [];
                dataJSON.map(item => {
                    let shortID = shortid.generate();
                    itemArray.push({ text: item.name, completed: false, id: shortID });
                    addItem(request.body.todoListID, item.name, shortID);
                });
                response.json(itemArray);
            }
        );
    });
}
function getTrelloAuthEntryFromCookieKey (trelloAuthKey, callback) {
    Trello.findOne({ cookieKey: trelloAuthKey }, (err, doc) => {
        if (doc === null) {
            console.log("key not found");
        } else {
            return callback(doc);
        }
    });
}

module.exports = TodoListRouter;
