var express = require("express");
var gitHubRouter = new express.Router();
//var url = require("url");
//var Trello = require("../models/trelloAuthModel");

/*
/     Routes
*/
gitHubRouter.get("/", function (req, res) {
    res.send("test route");
});

module.exports = gitHubRouter;
