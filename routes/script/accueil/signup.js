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
  console.log(success);
  signup_login = entities.encode(signup_login);
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(signup_password, salt);
  if (signup_country.indexOf('(') != -1) {
    signup_country = (signup_country.slice(0,signup_country.indexOf('(')));
  }
  getDate();
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
