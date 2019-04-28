var express = require('express');
var router = express.Router();
var http = require('http');
var validator = require('validator');
var datetime = require('node-datetime');
var bodyParser = require('body-parser');
const models = require('../models');

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const Sequelize = require('sequelize');

var app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


/* GET user */
router.get('/', function(req, res, next) {

  var categories = [];

  models
  .broquiz_category
  .findAll({
    attributes: ['category_id', 'category_label']
  }).then(
    category => {
      res.render('question',{id: req.session.user_id, login: req.session.user_login, category : category});
    }
  );

});

router.post('/add', function(req, res, next) {

  user_id = req.session.user_id;
  user_login = req.session.user_login;
  category = req.body.category;
  question = req.body.question;
  answer1 = req.body.reponse1;
  answer2 = req.body.reponse2;
  answer3 = req.body.reponse3;
  answer4 = req.body.reponse4;

  var validationQuestion = new Promise((success,error) => {
    if(validator.isEmpty(category) || validator.isEmpty(question) || validator.isEmpty(answer1) || validator.isEmpty(answer2) || validator.isEmpty(answer3) || validator.isEmpty(answer4)){
      error('Tout les champs ne sont pas complets !');
    } /*else if (entities.encode(question) != question){
      error('Votre question n\'est pas valide !');
    } else if (entities.encode(answer1) != answer1){
      error('Votre réponse1  n\'est pas valide !');
    } else if (entities.encode(answer2) != answer2){
      error('Votre réponse2  n\'est pas valide !');
    } else if (entities.encode(answer3) != answer3){
      error('Votre réponse3  n\'est pas valide !');
    } else if (entities.encode(answer4) != answer4){
      error('Votre réponse4  n\'est pas valide !');
    }*/  else {
      models.broquiz_question.create({
        question_creator: 1,
        question_validator: 2,
        question_category: category,
        question_label: question,
        question_image: '',
        question_status: 1
      }).then(
        result => {
          console.log(result.question_id);
          models.broquiz_answer.bulkCreate([
            {answer_question: result.question_id, answer_label: answer1, answer_image: '', answer_status: 7},
            {answer_question: result.question_id, answer_label: answer2, answer_image: '', answer_status: 8},
            {answer_question: result.question_id, answer_label: answer3, answer_image: '', answer_status: 8},
            {answer_question: result.question_id, answer_label: answer4, answer_image: '', answer_status: 8}
          ]).then(
            success('Question ajoutée !')
          ).catch(err =>
            console.log('Error query !')
          );
        }
      ).catch(err =>
        console.log('Error query !')
      )
    }
  })

  validationQuestion
  .then(function(success) {
    console.log(success);
    res.redirect('/question');
  })
  .catch(function(error) {
    console.log(error);
    res.render('question');
  });
});



module.exports = router;
