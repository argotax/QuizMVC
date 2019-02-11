var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const Sequelize = require('sequelize');
const models = require('./models');

var app = express();
app.io = require('socket.io')();

const indexRouter = require('./routes/index');
const accueilRouter = require('./routes/accueil');

const Op = Sequelize.Op;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(logger('dev'));
app.use(session({
  secret: 'tata',
  maxAge: 86400,
  name: 'express_session_cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/socket.io')));

app.use('/', indexRouter);
app.use('/accueil', accueilRouter);

app.io.on('connection', function(socket){
  console.log('connected');

  socket.on('friend-request', function(friendRequest){
    if (friendRequest.friend != friendRequest.user) {
      models
      .broquiz_user
      .findAll({
        where:{ user_login: {[Op.or]: [friendRequest.user, friendRequest.friend] }},
        attributes: ['user_id']
      }).then(
        user => {
          models
          .broquiz_friend
          .create({
            friend_p1: user[0].user_id,
            friend_p2: user[1].user_id,
            friend_status: 6
          });
        }
      );
    }
  })

  socket.on('confirm-request', function(confirmRequest){
    models.broquiz_friend.update(
      { friend_status: 5 },
      { where: { friend_id: confirmRequest.friend } }
    )
    .then(result =>
      socket.emit('friend-confirmed', {data:confirmRequest.friend})
    )
    .catch(err =>
      console.log('Error query !')
    )
  })

  socket.on('cancel-request', function(confirmRequest){
    models.broquiz_friend.destroy({
      where: {
        friend_id: confirmRequest.friend
      }
    })
    .then(result =>
      socket.emit('friend-canceled', {data:confirmRequest.friend})
    )
    .catch(err =>
      console.log('Error query !')
    )
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
