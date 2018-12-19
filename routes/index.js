var express = require('express');
var router = express.Router();
var http = require('http');
var validator = require('validator');
var datetime = require('node-datetime');
var crypto = require('crypto');
var bodyParser = require('body-parser');
const models = require('../models');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();


var app = express();
var server = app.listen(8080);


function hashPwd(password) {
  var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
  };

  var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
  };

  salt = genRandomString(16); /** Gives us salt of length 16 */
  passwordData = sha512(password, salt);
}
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

    // socket.on('signin', function (login, password) {
      //   eval(fs.readFileSync('scripts/signin.js').toString());
      // });
      socket.on('signup', function (login, password, confpassword, email, confemail, country) {
        // eval(fs.readFileSync('scripts/signup.js').toString());
        signup_login = login;
        signup_password = password;
        signup_confpassword = confpassword;
        signup_email = email;
        signup_confemail = confemail;
        signup_country = country;

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
          }//end elseif
        })

        validationSignup
        .then(function(success) {
          signup_login = entities.encode(signup_login);
          hashPwd(signup_password);
          newpassword = passwordData.passwordHash;
          if (signup_country.indexOf('(') != -1) {
            signup_country = (signup_country.slice(0,signup_country.indexOf('(')));
          }
          getDate();
          var dt = datetime.create();
          var creation = dt.format('Y/m/d H:M:S');
          var values = [[signup_login, signup_email, newpassword, salt, signup_country, creation, 0, 3, 2]];

          models
          .broquiz_user
          .create({
            user_login: signup_login,
            user_email: signup_email,
            user_password: newpassword,
            user_salt: salt,
            user_country: signup_country,
            user_points: 0,
            user_status: 1,
            user_role: 1,
            createdAt: creation,
            updatedAt: creation,
            user_last_connection: creation
          });

          signup_error = undefined;

          signup_login = undefined;
          signup_password = undefined;
          signup_confpassword = undefined;
          signup_email = undefined;
          signup_confemail = undefined;
          signup_country = undefined;

          socket.emit('redirect', '/accueil');

        })
        .catch(function(error) {
          socket.emit('inscription_error', error);
        });
      });

    });

  return router;
};
