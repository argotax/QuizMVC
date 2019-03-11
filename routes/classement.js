var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

var app = express();

router.get('/', function(req, res, next) {
  models.broquiz_user.findAll({
    attributes: ['user_login','user_points','user_id'],
    order: [
      ['user_points', 'DESC']
    ]
  }).then(
    users => {
      res.render('classement',{id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, users: users})
    }
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });
});


module.exports = router;
