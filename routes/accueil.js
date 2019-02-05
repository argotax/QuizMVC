var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {

  var friends = [];

  models
  .broquiz_friend
  .findAll({
    where:{ [Op.or]: [{friend_p1: req.session.user_id}, {friend_p2: req.session.user_id}], friend_status: 5 },
    attributes: ['friend_p1', 'friend_p2']
  }).then(
    user => {
      user.forEach(function(element) {
        if (element.friend_p1 != req.session.user_id) {
          friends.push(element.friend_p1);
        } else if (element.friend_p2 != req.session.user_id) {
          friends.push(element.friend_p2);
        }
      });
      models
      .broquiz_user
      .findAll({
        where:{ user_id: friends },
        attributes: ['user_login']
      }).then(
        friend => {
          friends = [];
          friend.forEach(function(element) {
            friends.push(element.user_login);
          });
          res.render('accueil',{id: req.session.user_id, login: req.session.user_login, friends: friends})
        }
      ).catch(function (err) {
        console.log('Error query !');
      });
    }
  ).catch(function (err) {
    console.log('Error query !');
  });

});

module.exports = router;
