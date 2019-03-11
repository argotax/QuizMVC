var express = require('express');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var app = express();

models.broquiz_user.hasMany(models.broquiz_game, {as: 'player_1', foreignKey : 'game_p1'});
models.broquiz_game.belongsTo(models.broquiz_user, {as: 'player_1', foreignKey : 'game_p1'});
models.broquiz_user.hasMany(models.broquiz_game, {as: 'player_2', foreignKey : 'game_p2'});
models.broquiz_game.belongsTo(models.broquiz_user, {as: 'player_2', foreignKey : 'game_p2'});
models.broquiz_category.hasMany(models.broquiz_round, {as: 'category', foreignKey : 'round_category'});
models.broquiz_round.belongsTo(models.broquiz_category, {as: 'category', foreignKey : 'round_category'});

router.get('/', function(req, res, next) {
  models.broquiz_game.findAll({
    attributes: ['game_id','game_p1', 'game_p2','game_p1_score', 'game_p2_score', 'game_p1_points', 'game_p2_points'],
    where:{
      [Op.or]: [  {game_p1: req.session.user_id},
                  {game_p2: req.session.user_id}],
      game_status: 12
    },
    include: [ { model: models.broquiz_user,attributes: ['user_login'], as: 'player_1'}, { model: models.broquiz_user,attributes: ['user_login'], as: 'player_2'}]
  }).then(
    game => {
      res.render('parties',{id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game})
    }
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });
});

router.get('/partie/:numero', function(req, res, next) {
  models.broquiz_game.findAll({
    attributes: ['game_id','game_p1', 'game_p2','game_p1_score', 'game_p2_score', 'game_p1_points', 'game_p2_points'],
    where:{
      game_id: req.params.numero
    },
    include: [ { model: models.broquiz_user,attributes: ['user_login'], as: 'player_1'}, { model: models.broquiz_user,attributes: ['user_login'], as: 'player_2'}]
  }).then(
    game => {
      models.broquiz_round.findAll({
        attributes: ['round_id','round_game', 'round_category','round_p1_score', 'round_p2_score', 'round_q1', 'round_q2', 'round_q3', 'round_q1_p1', 'round_q1_p2', 'round_q2_p1', 'round_q2_p2', 'round_q3_p1', 'round_q3_p2'],
        where:{
          round_game: req.params.numero
        },
        include: [ { model: models.broquiz_category,attributes: ['category_label'], as: 'category'}]
      }).then(
        round => {
          res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game, round: round})
        }
      ).catch(function (err) {
        console.log('Error query !', err);
        res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
      });
    }
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
  });
});

module.exports = router;
