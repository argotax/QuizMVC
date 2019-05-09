var express = require('express');
var router = express.Router();
var Promise = require('promise');
var multer = require('multer');
var path = require('path');
var validator = require('validator');
const models = require('../models');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});
const bcrypt = require('bcrypt');
const fs = require('fs');

const saltRounds = 10;
var verifFile = true;

var uploadBanner = multer({
  fileFilter: function(req, file, callback) {
    if(path.extname(file.originalname) !== '.jpg') {
      verifFile = false;
      return callback(null, true);
    }
    verifFile = true;
    callback(null, true)
  },
  dest: './public/image/banner',
  limits: {
    fileSize: 10000000
  }
})
var uploadProfile = multer({
  fileFilter: function(req, file, callback) {
    if(path.extname(file.originalname) !== '.jpg') {
      verifFile = false;
      return callback(null, true);
    }
    verifFile = true;
    callback(null, true)
  },
  dest: './public/image/profile'
})

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

models.broquiz_round.hasMany(models.broquiz_game, { as: 'joueur_1', foreignKey: 'game_p1' });
models.broquiz_game.belongsTo(models.broquiz_round, { as: 'joueur_1', foreignKey: 'game_p1' });
models.broquiz_game.hasMany(models.broquiz_round, { as: 'game', foreignKey: 'round_game' });
models.broquiz_round.belongsTo(models.broquiz_game, { as: 'game', foreignKey: 'round_game' });

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
    renderPage(req, res, values, ansTab, nbWins, winRate);
  });

}); //end router.get /

router.get('/modify', function(req, res, next) {
  res.render('modify-profile', {id: req.session.user_id, login: req.session.user_login, friends: req.session.friends})
});

router.post('/verif_modif_profile', function(req, res, next) {

  var modif_login = req.body.login;
  var modif_password = req.body.newPassword;
  var modif_confpassword = req.body.confNewPassword;
  var modif_oldpassword = req.body.oldPassword;

  var validationModif = new Promise((success, error) => {
    if ((validator.isEmpty(modif_login) || validator.isEmpty(modif_oldpassword)) || (validator.isEmpty(modif_confpassword) && validator.isEmpty(modif_password) == false) || (validator.isEmpty(modif_password) && validator.isEmpty(modif_confpassword) == false)) {
        error('Tout les champs ne sont pas complets !');
    } else if (/\s/.test(modif_login)) {
        error('Votre pseudo ne doit pas contenir d\'espace !');
    } else if (entities.encode(modif_login) != modif_login) {
        error('Votre pseudo n\'est pas valide !');
    } else if (modif_login.length < 5) {
        error('Votre pseudo doit contenir 5 caractères minimum !');
    } else if (validator.isEmpty(modif_password) == false && modif_password.length < 5) {
        error('Votre mot de passe doit contenir 5 caractères minimum !');
    } else if (validator.isEmpty(modif_password) == false && validator.isEmpty(modif_confpassword) == false && modif_password != modif_confpassword) {
        error('Les mots de passe ne correspondent pas !');
    } else if (validator.isEmpty(modif_login) == false && modif_login != req.session.user_login) {
      models
      .broquiz_user
      .findOne({
        where: {
            user_login: modif_login
        }
      }).then(
          user => {
            if (user) {
              error('Ce pseudo est déjà utilisé !');
            }
          }
      );
      models
      .broquiz_user
      .findOne({
        where: {
            user_id: req.session.user_id
        }
      }).then(
        user => {
          if (user.user_password != bcrypt.hashSync(modif_oldpassword, user.user_salt)) {
            error('Mot de passe éronné !');
          } else {
            success('Modifié avec succès !');
          }
        }
      );
    } else {
      success('Modifié avec succès !');
    }
  })

  validationModif.then(function(success) {

    if (validator.isEmpty(modif_password)) {
      modif_password = modif_oldpassword;
    }

    modif_login = entities.encode(modif_login);
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(modif_password, salt);

    models.broquiz_user.update(
      { user_login: modif_login,
        user_password: hash,
        user_salt: salt
      },
      { where: { user_id: req.session.user_id } }
    ).catch(err =>
      console.log('Error query !')
    )

    try {
      if (fs.existsSync("public/image/banner/"+req.session.user_login+"_banner.jpg")) {
        fs.rename('public/image/banner/'+req.session.user_login+'_banner.jpg', 'public/image/banner/'+modif_login+'_banner.jpg', function (err) {
          if (err) {
            console.log("Fail banner name change !");
          } else {
            try {
              if (fs.existsSync("public/image/profile/"+req.session.user_login+"_profile.jpg")) {
                fs.rename('public/image/profile/'+req.session.user_login+'_profile.jpg', 'public/image/profile/'+modif_login+'_profile.jpg', function (err) {
                  if (err) {
                    console.log("Fail profile name change !");
                  } else {
                    req.session.user_login = modif_login;

                    modif_error = undefined;

                    modif_login = undefined;
                    modif_password = undefined;
                    modif_confpassword = undefined;
                    modif_olfpassword = undefined;

                    res.render('modify-profile', { modif_validate: success, id: req.session.user_id, login: req.session.user_login })
                  }
                });
              }
            } catch(err) {
              console.error(err)
            }
          }
        });
      }
    } catch(err) {
      console.error(err)
    }

  }).catch(function(error) {
    res.render('modify-profile', { modif_error: error, modif_login: modif_login, modif_password: modif_password, modif_confpassword: modif_confpassword, modif_oldpassword: modif_oldpassword, id: req.session.user_id, login: req.session.user_login });
  });

});

router.post('/upload/banner', uploadBanner.single('bannerInput'), function(req, res, next) {
  try {
    fs.unlink('public/image/banner/'+req.session.user_login+'_banner.jpg', function (err) {
      if (err) {
        console.log("Fail delete old banner !");
      } else {
        try {
          fs.rename('public/image/banner/'+req.file.filename, 'public/image/banner/'+req.session.user_login+'_banner.jpg', function (err) {
            if (err) {
              console.log("Fail rename new banner !");
            } else {
              res.redirect('../modify');
            }
          });
        } catch(err) {
          console.error(err)
        }
      }
    })
  } catch(err) {
    console.error(err)
  }
});

router.post('/upload/profile', uploadProfile.single('profileInput'), function(req, res, next) {
  try {
    fs.unlink('public/image/profile/'+req.session.user_login+'_profile.jpg', function (err) {
      if (err) {
        console.log("Fail delete old profile !");
      } else {
        try {
          fs.rename('public/image/profile/'+req.file.filename, 'public/image/profile/'+req.session.user_login+'_profile.jpg', function (err) {
            if (err) {
              console.log("Fail rename new profile !");
            } else {
              res.redirect('../modify');
            }
          });
        } catch(err) {
          console.error(err)
        }
      }
    })
  } catch(err) {
    console.error(err)
  }
});

module.exports = router;
