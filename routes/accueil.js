var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {

  var friends = [];
  var compteur = 0;

  models.broquiz_friend.findAll({
    attributes: ['friend_id', 'friend_status', [models.sequelize.literal('CASE WHEN friend_p1 = 1 THEN friend_p2 ELSE friend_p1 END'), 'friend_p1']],
    where:{ [Op.or]: [{friend_p1: req.session.user_id}, {friend_p2: req.session.user_id}] }
  }).then(
    user => {
      user.forEach(function(element) {
        friends.push(element.friend_p1);
      });
      models.broquiz_user.findAll({
        attributes: ['user_login'],
        where:{ user_id:{[Op.or]: friends}}
      }).then(
        friend => {
          friends = [];
          friend.forEach(function(element) {
            friends.push([user[compteur].friend_id, element.user_login, user[compteur].friend_status]);
              compteur = compteur + 1;
          });
          res.render('accueil',{id: req.session.user_id, login: req.session.user_login, friends: friends})
        }
      ).catch(function (err) {
        console.log('Error query !');
        res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
      });
    }
  ).catch(function (err) {
    console.log('Error query !');
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });

});

module.exports = router;
