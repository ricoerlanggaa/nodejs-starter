var express = require('express');
var router = express.Router();

var auth = require('./auth')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/api/auth", auth);

module.exports = router;