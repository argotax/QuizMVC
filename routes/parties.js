var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
var app = express();

router.get('/', function(req, res, next) {
  res.render('parties',{id: req.session.user_id, login: req.session.user_login, friends: req.session.friends})
});

router.get('/partie/:numero', function(req, res, next) {
  res.render('partie')
});

module.exports = router;
