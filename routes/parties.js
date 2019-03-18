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
          if (round[0] != undefined) {
            if (round[round.length-1].round_q1_p1 == 14){
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game[0], round: round, player: game[0].game_p1})
            } else {
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game[0], round: round, player: game[0].game_p2})
            }
          } else {
            models.broquiz_round.create({
              round_game: req.params.numero,
              round_category: 7,
              round_p1_score: 0,
              round_p2_score: 0,
              round_q1: 1,
              round_q2: 1,
              round_q3: 1,
              round_q1_p1: 14,
              round_q1_p2: 14,
              round_q2_p1: 14,
              round_q2_p2: 14,
              round_q3_p1: 14,
              round_q3_p2: 14
            })
            .then(
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game, round: round})
            )
            .catch(err =>
              console.log('Error query !')
            )
          }
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

router.get('/partie/5/category', function(req, res, next) {
  models.broquiz_category.findAll({
    attributes: ['category_id','category_label'],
    order: Sequelize.literal('rand()'),
    limit: 4
  }).then(
    category => {
      res.render('category', {id: req.session.user_id, login: req.session.user_login, categories:category})
    } 
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('category',{id: req.session.user_id, login: req.session.user_login})
  });
});

module.exports = router;
