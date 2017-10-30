var path = require("path");
var express = require("express");
var router = new express.Router();
router.use(express.static(path.join(__dirname, "../../client")));

module.exports = router;
