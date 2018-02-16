var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'This is my project', message: 'Im a message' });
});

module.exports = router;
