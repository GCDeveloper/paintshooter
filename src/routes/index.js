var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(path.join(__dirname, '..', 'views', 'index.html'));
	res.sendFile('../views/index.html');
});

module.exports = router;
