var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

models.broquiz_user.hasMany(models.broquiz_friend, {foreignKey : 'friend_p1'});
models.broquiz_friend.belongsTo(models.broquiz_user, {foreignKey : 'friend_p1'});

/* GET users listing. */
router.get('/', function(req, res, next) {

  var friends = [];

  models.broquiz_friend.findAll({
    where:{ [Op.or]: [{friend_p1: req.session.user_id}, {friend_p2: req.session.user_id}] },
    include: [ { model: models.broquiz_user, as: 'broquiz_user' } ]
  }).then(
    user => {
      friends = [];
      user.forEach(function(element) {
        friends.push(element.broquiz_user.user_login);
      });
      res.render('accueil',{id: req.session.user_id, login: req.session.user_login, friends: friends})
    }
  ).catch(function (err) {
    console.log('Error query !');
  });

});

module.exports = router;
