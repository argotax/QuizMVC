var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

const Op = Sequelize.Op;

/* GET users listing. */
router.get('/', function(req, res, next) {

  var compteur = 0;
  var friends = [];
  var friends_id = [];

  models.broquiz_friend.findAll({
    attributes: ['friend_id', 'friend_p1', 'friend_status'],
    where:{ friend_p2: req.session.user_id }
  }).then(
    user => {
      user.forEach(function(element) {
        friends.push([element.friend_id, element.friend_p1, element.friend_status]);
      });
      models.broquiz_friend.findAll({
        attributes: ['friend_id', 'friend_p2', 'friend_status'],
        where:{ friend_p1: req.session.user_id, friend_status: 5}
      }).then(
        friend => {
          friend.forEach(function(element) {
            friends.push([element.friend_id, element.friend_p2, element.friend_status]);
          });
          friends.forEach(function(element){
            friends_id.push(element[1]);
          });
          models.broquiz_user.findAll({
            attributes: ['user_id', 'user_login'],
            where:{user_id:{[Op.in]: friends_id}},
            order: sequelize.fn('FIELD', sequelize.col('user_id'), '3', '5', '30', '27', '28')
          }).then(
            login => {
              login.forEach(function(element) {
                friends[compteur].push(element.user_login);
                compteur += 1;
              });
              console.log(friends);
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
    }
  ).catch(function (err) {
    console.log('Error query !');
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });
});

module.exports = router;
