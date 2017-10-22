// eslint ignores //
/*eslint new-cap: ["error", { "properties": true }]*/

var path = require("path");
var express = require("express");
//var app = express();
var router = new express.Router();
router.use(express.static(path.join(__dirname, "../../client")));

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../client", "index.html"));
});

module.exports = router;
