var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const Sequelize = require('sequelize');
const models = require('./models');
var tools = require('./routes/function');
const sequelize = new Sequelize('broquiz', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

var app = express();
app.io = require('socket.io')();

const indexRouter = require('./routes/index');
const accueilRouter = require('./routes/accueil');
const partiesRouter = require('./routes/parties');
const questionRouter = require('./routes/question');
const classementRouter = require('./routes/classement');
const profileRouter = require('./routes/profile');

const Op = Sequelize.Op;

// view engine setup
app.set('views', path.join(__dirname, 'views'))
.set('view engine', 'twig')
.use(logger('dev'))
.use(session({
  secret: 'tata',
  maxAge: 86400,
  name: 'express_session_cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
}))
.use(express.json())
.use(express.urlencoded({ extended: false }))
.use(cookieParser())

.use(express.static(path.join(__dirname, 'public')))
.use(express.static(path.join(__dirname, 'node_modules/socket.io')))

.use('/', indexRouter)
.use('/accueil', accueilRouter)
.use('/parties', partiesRouter)
.use('/question', questionRouter)
.use('/profile', profileRouter)
.use('/classement', classementRouter)
.io.on('connection', function(socket){
  console.log('connected');

  socket.on('friend-request', function(friendRequest){
    models
    .broquiz_user
    .findOne({
      where:{ user_login: friendRequest.friend },
      attributes: ['user_id']
    }).then(
      user => {
        models
        .broquiz_friend
        .create({
          friend_p1: friendRequest.user,
          friend_p2: user.user_id,
          friend_status: 6
        });
      }
    );
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

  socket.on('search-random-game', function(searchRandomGame){
    models.broquiz_user.findOne({
      where: {
        user_status: 9,
        user_id: {
          [Op.ne]: searchRandomGame.user
        }
      },
      order: sequelize.random()
    })
    .then(result =>
      models.broquiz_game.create({
        game_p1: searchRandomGame.user,
        game_p2: result.user_id,
        game_p1_score: 0,
        game_p2_score: 0,
        game_p1_points: 0,
        game_p2_points: 0,
        game_status: 12
      })
      .catch(err =>
        console.log('Error query !')
      )
    )
    .catch(err =>
      console.log('Error query !')
    )
  })

  socket.on('choose-category', function(chooseCategory){
    models.broquiz_round.update(
      { round_category: chooseCategory.category },
      { where: { round_id: chooseCategory.round } }
    )
    .then(result =>
      socket.emit('redirect', '/parties/partie/'+chooseCategory.game + '/game/' + chooseCategory.category)
    )
    .catch(err =>
      console.log('Error query !')
    )
  })

  socket.on('player-answer', function(answerResponse){
    var score =0;
    for (var answer in answerResponse.answer) {
      if (answer==7) {
        score++;
      }
    }
    models.broquiz_round.findAll({
      attributes: ['round_q1_p1', 'round_q1_p2'],
      where:{
        round_game: answerResponse.game
      }
    }).then(
      round => {
        if (((round[round.length-1].round_q1_p1 == undefined) && (round.length%2 == 1)) || ((round[round.length-1].round_q1_p2 != undefined) && (round.length%2 == 0))){
          models.broquiz_round.update(
            {round_p1_score: score, round_q1_p1: answerResponse.answer[0], round_q2_p1: answerResponse.answer[1], round_q3_p1: answerResponse.answer[2]},
            { where: { round_id: answerResponse.round } }
          )
          .catch(err =>
            console.log('Error query !')
          )
        } else {
          models.broquiz_round.update(
            {round_p2_score: score, round_q1_p2: answerResponse.answer[0], round_q2_p2: answerResponse.answer[1], round_q3_p2: answerResponse.answer[2]},
            { where: { round_id: answerResponse.round } }
          )
          .catch(err =>
            console.log('Error query !')
          )
        }
      }
    ).catch(function (err) {
      console.log('Error query !', err);
      res.render('accueil',{id: req.session.user_id, login: req.session.user_login})
    });
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
