var express = require('express');
var router = express.Router();

var profile = require('../controllers/profile')

router.get('/detail', profile.detail);

module.exports = router;
