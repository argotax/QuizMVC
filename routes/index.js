var express = require('express');
var router = express.Router();
var http = require('http');
var validator = require('validator');
var datetime = require('node-datetime');
var bodyParser = require('body-parser');
  const models = require('../models');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require('fs');
const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const saltRounds = 10;

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/signin', function(req, res, next) {
  signin_login = req.body.connectLogin;
  signin_password = req.body.connectPassword;

  var validationSignin = new Promise((success,error) => {
    if(validator.isEmpty(signin_login) || validator.isEmpty(signin_password)){
      error('Tout les champs ne sont pas complets !');
    } else if (validator.isEmail(signin_login)) {
      models
      .broquiz_user
      .findOne({
        where:{ user_email: signin_login },
        attributes: ['user_id', 'user_login', 'user_password', 'user_salt']
      }).then(
        user => {
          if (!user){
            error('Cette adresse email n\'existe pas !');
          } else if (user.user_password == bcrypt.hashSync(signin_password, user.user_salt)) {
            success('Connected');
          } else {
            error('Mot de passe éronné !');
          }
        }
      );
    } else {
      models
      .broquiz_user
      .findOne({
        where:{ user_login: signin_login },
        attributes: ['user_id', 'user_login', 'user_password', 'user_salt']
      }).then(
        user => {
          if (!user){
            error('Ce login n\'existe pas !');
          } else if (user.user_password == bcrypt.hashSync(signin_password, user.user_salt)) {
            req.session.user_id = user.user_id;
            req.session.user_login = user.user_login;
            success('Connected');
          } else {
            error('Mot de passe éronné !');
          }
        }
      );
    }
  });

  validationSignin
  .then(function(success) {
    res.redirect('/accueil');
  })
  .catch(function(error) {
    res.render('index', { signin_error: error });
  });
});

router.post('/signup', function(req, res, next) {
  signup_login = req.body.login;
  signup_password = req.body.password;
  signup_confpassword = req.body.confpassword;
  signup_email = req.body.email;
  signup_confemail = req.body.confemail;
  signup_country = req.body.country;

  var validationSignup = new Promise((success,error) => {
    if(validator.isEmpty(signup_login) || validator.isEmpty(signup_password) || validator.isEmpty(signup_confpassword) || validator.isEmpty(signup_email) || validator.isEmpty(signup_confemail) || validator.isEmpty(signup_country)){
      error('Tout les champs ne sont pas complets !');
    } else if (/\s/.test(signup_login)) {
      error('Votre pseudo ne doit pas contenir d\'espace !');
    } else if (entities.encode(signup_login) != signup_login) {
      error('Votre pseudo n\'est pas valide !');
    } else if (signup_login.length < 5) {
      error('Votre pseudo doit contenir 5 caractères minimum !');
    } else if (signup_password.length < 5) {
      error('Votre mot de passe doit contenir 5 caractères minimum !');
    } else if (signup_password != signup_confpassword) {
      error('Les mots de passe ne correspondent pas !');
    } else if (validator.isEmail(signup_email) == false) {
      error('Votre email est invalide !');
    } else if (signup_email != signup_confemail) {
      error('Les email ne correspondent pas !');
    } else if (validator.isEmpty(signup_login) == false && validator.isEmpty(signup_email) == false) {
      models
      .broquiz_user
      .findOne({
        where:{ user_login: signup_login }
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
        where:{ user_email: signup_email }
      }).then(
        user => {
          if (user) {
            error('Cet email est déjà utilisé !');
          }else{
            success('Tous les champs sont valides');
          }
        }
      );
    }
  })

  validationSignup
  .then(function(success) {
    signup_login = entities.encode(signup_login);
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(signup_password, salt);
    if (signup_country.indexOf('(') != -1) {
      signup_country = (signup_country.slice(0,signup_country.indexOf('(')));
    }
    var dt = datetime.create();
    var creation = dt.format('Y/m/d H:M:S');

    models
    .broquiz_user
    .create({
      user_login: signup_login,
      user_email: signup_email,
      user_password: hash,
      user_salt: salt,
      user_country: signup_country,
      user_points: 0,
      user_status: 1,
      user_role: 2
    });

    models
    .broquiz_user
    .findOne({
      where:{ user_login: signup_login },
      attributes: ['user_id', 'user_login']
    }).then(
      user => {
        req.session.id = user.user_id;
        req.session.login = user.user_login;
      }
    );

    signup_error = undefined;

    signup_login = undefined;
    signup_password = undefined;
    signup_confpassword = undefined;
    signup_email = undefined;
    signup_confemail = undefined;
    signup_country = undefined;

    res.redirect('/accueil');

  })
  .catch(function(error) {
    res.render('index', { signup_error: error, login: signup_login, email: signup_email, confemail: signup_confemail, country: signup_country });
  });
});

router.get('/disconnect', function(req, res, next) {
  req.session.destroy();
  res.render('index');
});

module.exports = router;
