var path = require("path");
var express = require("express");
var router = new express.Router();
router.use(express.static(path.join(__dirname, "../../client")));

router.route("/accessToken=:accessToken&accessTokenSecret=:accessTokenSecret").get(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client", "index.html"));
});

module.exports = router;
