var express = require('express');
var router = express.Router();
var http = require('http');
var validator = require('validator');
var datetime = require('node-datetime');
var bodyParser = require('body-parser');
const models = require('../models');

const Sequelize = require('sequelize');

var app = express();
var categories = [];

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));




/* GET user */
router.get('/', function(req, res, next) {

  models
  .broquiz_category
  .findAll({
    attributes: ['category_label']

  }).then(
    category => {
      category.forEach(function(element) {
        categories.push(element.category_label);
        console.log(categories);
        res.render('question',{id: req.session.user_id, login: req.session.user_login, categories : categories});
      });
    }
  );

});

router.post('/addQuestion', function(req, res, next) {
  user_id = req.session.user_id;
  user_login = req.session.user_login;
  question_category = req.body.category;
  question_question = req.body.question;


  var validationQuestion = new Promise((success,error) => {
    if(validator.isEmpty(question_category) || validator.isEmpty(question_question)){
      error('Tout les champs ne sont pas complets !');
    } else if (entities.encode(question_question) != question_question) {
      error('Votre question n\'est pas valide !');
    } else if (validator.isEmpty(question_category) == false && validator.isEmpty(question_question) == false) {
      models
      .broquiz_question
      .findOne({
        where:{ question_label: question_question }
      }).then(
        user => {
          if (user) {
            error('Cette question existe déjà !');
          }
        }
      );
      models
      .broquiz_category
      .findOne({
        where:{ category_label: question_category }
      }).then(
        category => {
          if (category) {
            /*Attribuer la categorie finale*/
          }else{
            /*attribuer la categorie temporaire elle ne sera définitive qu'une fois la question validé par un admin*/
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



module.exports = router;
