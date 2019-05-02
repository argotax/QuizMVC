var express = require('express');
var router = express.Router();
var Promise = require('promise');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

var renderPage = function(req, res, values, ansTab, nbWins, winRate) {
  res.render('profile', {
    id: req.session.user_id,
    login: req.session.user_login,
    rangTab: values,
    winLose: ansTab,
    nbWins: nbWins,
    winRate: winRate
  });
};

models.broquiz_round.hasMany(models.broquiz_game, {
  as: 'joueur_1',
  foreignKey: 'game_p1'
});
models.broquiz_game.belongsTo(models.broquiz_round, {
  as: 'joueur_1',
  foreignKey: 'game_p1'
});
models.broquiz_game.hasMany(models.broquiz_round, {
  as: 'game',
  foreignKey: 'round_game'
});
models.broquiz_round.belongsTo(models.broquiz_game, {
  as: 'game',
  foreignKey: 'round_game'
});

var app = express();
router.get('/', function(req, res, next) {
  var rang = 0, wrongAns = 0, rightAns = 0, noAns = 0, wins = 0, loses = 0, nulls = 0, winRate = 0;

  var rankQuery = new Promise(function(resolve, reject) {
    models.broquiz_user.findAll({
      attributes: ['user_login', 'user_points', 'user_id'],
      order: [
        ['user_points', 'DESC']
      ]
    }).then(
      users => {
        var count = 1;
        users.forEach(function(user) {
          if (user.user_id == 1) { //a ramplacer par l'id qu'on cherche
            rang = count;
            resolve(rang);
          }
          count++;
        });
      }
    ).catch(function(err) {
      console.log('Error query !', err);
      res.render('accueil', {
        id: req.session.user_id,
        login: req.session.user_login
      })
    });
  }); //end promise rankquery

  var countryRankQuery = new Promise(function(resolve, reject) {
    models.broquiz_user.findAll({
      attributes: ['user_login', 'user_points', 'user_id', 'user_country'],
      order: [
        ['user_points', 'DESC']
      ],
      where: {
        user_country: 'Azerbaijan'
      }
    }).then(
      users => {
        var count = 1;
        users.forEach(function(user) {
          if (user.user_id == 1) { //a ramplacer par l'id qu'on cherche
            countryRang = count;
            resolve(countryRang);
          }
          count++;
        });
      }
    ).catch(function(err) {
      console.log('Error query !', err);
      res.render('accueil', {
        id: req.session.user_id,
        login: req.session.user_login
      })
    });
  }); //end promise countryRankquery

  var winLoseQuery_p1 = new Promise(function(resolve, reject) {
    models.broquiz_round.findAll({
      attributes: ['round_q1_p1', 'round_q2_p1', 'round_q3_p1'],

      include: [{
          model: models.broquiz_game,
          as: 'game',
          where: {
            game_p1: 1
          }
        } //a ramplacer avec l'id du mec qu'on cherche
      ]

    }).then(
      result => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].round_q1_p1 == 7) {
            rightAns++;
          } else if (result[i].round_q1_p1 == 8) {
            wrongAns++;
          } else if (result[i].round_q1_p1 == 14) {
            noAns++;
          }
        } //end for

        resolve();
      }).catch(function(err) {
      console.log('Error query !', err);
    });
  });

  var winLoseQuery_p2 = new Promise(function(resolve, reject) {
    models.broquiz_round.findAll({
      attributes: ['round_q1_p2', 'round_q2_p2', 'round_q3_p2'],

      include: [{
          model: models.broquiz_game,
          as: 'game',
          where: {
            game_p2: 1
          }
        } //a ramplacer avec l'id du mec qu'on cherche
      ]

    }).then(
      result => {
        for (var i = 0; i < result.length; i++) {
          if (result[i].round_q1_p1 == 7) {
            rightAns++;
          } else if (result[i].round_q1_p1 == 8) {
            wrongAns++;
          } else if (result[i].round_q1_p1 == 14) {
            noAns++;
          }
        } //end for

        resolve();
      }).catch(function(err) {
      console.log('Error query !', err);
    });
  });

  var numberWinLoseQuery_p1 = new Promise(function(resolve, reject) {
    models.broquiz_game.findAll({
      attributes: ['game_p1', 'game_p1_score', 'game_p2_score', 'game_status'],
      where: {
        game_p1: 1,
        game_status: 13
      }
    })
    .then(
      games => {
        var count = 1;
        games.forEach(function(game) {
          console.log('one game p1');
          if (game.game_p1_score>game.game_p2_score) {
            console.log('win p1');
            wins++;
          }
          else if (game.game_p1_score<game.game_p2_score) {
            console.log('lose p1');
            loses++;
          }
          else if (game.game_p1_score===game.game_p2_score) {
            console.log('null p1');
            nulls++;
          }
        });
        resolve();
      }).catch(function(err) {
      console.log('Error query !', err);
    });
  });

  var numberWinLoseQuery_p2 = new Promise(function(resolve, reject) {
    models.broquiz_game.findAll({
      attributes: ['game_p2', 'game_p2_score', 'game_p1_score', 'game_status'],
      where: {
        game_p2: 1,
        game_status: 13
      }
    })
    .then(
      games => {
        var count = 1;
        games.forEach(function(game) {
          console.log('one game p2');
          if (game.game_p2_score>game.game_p1_score) {
            console.log('win p2');
            wins++;
          }
          else if (game.game_p2_score<game.game_p1_score) {
            console.log('lose p2');
            loses++;
          }
          else if (game.game_p1_score===game.game_p2_score) {
            console.log('null p2');
            nulls++;
          }
        });
        resolve();
      }).catch(function(err) {
      console.log('Error query !', err);
    });
  });

  Promise.all([rankQuery, countryRankQuery, numberWinLoseQuery_p1, numberWinLoseQuery_p2, winLoseQuery_p1, winLoseQuery_p2]).then(function(values) {
    var ansTab = [rightAns, wrongAns, noAns];
    var nbWins = [wins, loses, nulls];
    winRate = parseFloat(wins*100/(wins+loses)).toFixed(2);
    console.log('winrate : ', winRate);
    renderPage(req, res, values, ansTab, nbWins, winRate);
  });

}); //end router.get /

router.get('/modify', function(req, res, next) {
  res.render('modify-profile', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends})
});



module.exports = router;
