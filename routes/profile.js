var express = require('express');
var router = express.Router();
const promise = require('promise');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
models.broquiz_round.hasMany(models.broquiz_game, {as: 'joueur_1', foreignKey : 'game_p1'});
models.broquiz_game.belongsTo(models.broquiz_round, {as: 'joueur_1', foreignKey : 'game_p1'});
models.broquiz_game.hasMany(models.broquiz_round, {as: 'game', foreignKey : 'round_game'});
models.broquiz_round.belongsTo(models.broquiz_game, {as: 'game', foreignKey : 'round_game'});

var app = express();
router.get('/', function(req, res, next) {
  var rang = 0;
  var wrongAns = 0;
  var rightAns = 0;
  var noAns = 0;

  models.broquiz_user.findAll({
    attributes: ['user_login','user_points','user_id'],
    order: [
      ['user_points', 'DESC']
    ]
  }).then(
    users => {
      var count = 1;
      users.forEach(function(user) {
        if (user.user_id == 4) {//a ramplacer par l'id qu'on cherche
          rang = count;
        }
        count++;
      });
    }
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });



  models.broquiz_round.findAll({
    attributes: ['round_q1_p1','round_q2_p1','round_q3_p1'],

    include: [
      { model: models.broquiz_game, as: 'game', where:{game_p1: 1}}
    ]

  }).then(
    result=>{
      result.forEach(function(element){
        console.log(element.round_q1_p1);
      });


      // for (var i = 0; i < result.length; i++) {
      //   if (result[i].round_q1_p1 == 7) {
      //     rightAns++;
      //   }
      //   else if (result[i].round_q1_p1 == 8) {
      //     wrongAns++;
      //   }else if (result[i].round_q1_p1 == 14) {
      //     noAns++;
      //   }
      }
      // console.log('V : ', rightAns, 'W : ', wrongAns, 'N : ', noAns);


  );

});

router.get('/modify', function(req, res, next) {
  res.render('modify-profile', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends})
});



module.exports = router;
