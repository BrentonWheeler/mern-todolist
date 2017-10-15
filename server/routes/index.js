// eslint ignores //
/*eslint new-cap: ["error", { "properties": true }]*/

//var path = require("path");
var express = require("express");
//var app = express();
var router = new express.Router();

router.get("/", function (req, res) {
    res.send("test");
});

module.exports = router;
