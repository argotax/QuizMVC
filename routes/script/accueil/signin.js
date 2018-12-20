signin_login = login;
signin_password = password;

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
          console.log('oui');
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
  socket.emit('redirect', '/accueil');
})
.catch(function(error) {
  socket.emit('connection_error', error);
});
