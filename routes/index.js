var express = require('express');
var router = express.Router();

var auth = require('./auth')
var profile = require('./profile')

var authMiddleware = require('../middleware/auth')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use("/api/auth", auth);
router.use("/api/profile", [authMiddleware.verifyToken], profile);

module.exports = router;