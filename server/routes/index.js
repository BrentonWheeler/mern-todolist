var path = require('path');
var router = require('express').Router();

router.get('/', function(req, res) {
  res.send('test');
});

module.exports = router;
