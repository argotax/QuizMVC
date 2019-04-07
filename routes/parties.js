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
            console.log(round.length);
            if (((round[round.length-1].round_q1_p1 == undefined) && (round.length%2 == 1)) || ((round[round.length-1].round_q1_p2 != undefined) && (round.length%2 == 0))){
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game[0], round: round, player: game[0].game_p1})
            } else {
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game[0], round: round, player: game[0].game_p2})
            }
          } else {
            models.broquiz_round.create({
              round_game: req.params.numero,
              round_p1_score: 0,
              round_p2_score: 0
            })
            .then(
              res.render('partie', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends, game: game, round: round, player: game[0].game_p1})
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

router.get('/partie/:numero/category', function(req, res, next) {
  models.broquiz_category.findAll({
    attributes: ['category_id','category_label'],
    order: Sequelize.literal('rand()'),
    limit: 4
  }).then(
    category => {
      models.broquiz_round.findOne({
        attributes: ['round_id'],
        where: {
          round_game: req.params.numero
        },
        order: [['round_id', 'DESC']]
      }).then(
        round => {
          req.session.round = round.round_id;
          res.render('category', {id: req.session.user_id, login: req.session.user_login, game:req.params.numero, categories:category, round:round})
        }
      ).catch(function (err) {
        console.log('Error query !', err);
        res.render('category',{id: req.session.user_id, login: req.session.user_login})
      })
    }
  ).catch(function (err) {
    console.log('Error query !', err);
    res.render('category',{id: req.session.user_id, login: req.session.user_login})
  });
});

router.get('/partie/:numero/game/:category', function(req, res, next) {
  models.broquiz_question.findAll({
    attributes: ['question_id', 'question_category', 'question_label', 'question_image', 'question_status'],
    where:{
      question_category: req.params.category
    },
    order: Sequelize.literal('rand()'),
    limit: 3
  }).then(
    question => {
      models.broquiz_answer.findAll({
        attributes: ['answer_id','answer_question', 'answer_label','answer_image', 'answer_status'],
        where:{
          answer_question: {
            [Op.in]: [question[0].question_id, question[1].question_id, question[2].question_id]
          }
        },
        order: sequelize.fn('FIELD', sequelize.col('answer_question'), [question[0].question_id, question[1].question_id, question[2].question_id])
      }).then(
        answer => {
          res.render('game',{id: req.session.user_id, login: req.session.user_login, question: question, answer: answer, round:req.session.round, game:req.params.numero})
        }
      )
    }
  )
});

module.exports = router;
