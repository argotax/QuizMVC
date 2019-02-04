var express = require('express');
var router = express.Router();

var EventEmitter = require('events').EventEmitter;

var action = new EventEmitter();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('accueil',{login: req.session.login});
});

module.exports = router;
