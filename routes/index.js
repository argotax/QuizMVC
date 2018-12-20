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

const saltRounds = 10;

var app = express();
var server = app.listen(8080);

function getDate() {
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }
  today = yyyy + '-' + mm + '-' + dd + ' 00:00:00';
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = function(io) {
  io.on('connection', function (socket) {

    socket.on('signin', function (login, password) {
       eval(fs.readFileSync('./routes/script/accueil/signin.js').toString());
    });

    socket.on('signup', function (login, password, confpassword, email, confemail, country) {
      eval(fs.readFileSync('./routes/script/accueil/signup.js').toString());
    });

  });

  return router;
};
