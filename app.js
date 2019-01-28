var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
let sess={
  maxAge:86400,
  secret: 'tata',
  name: 'express_session-cookie',
  proxy: true,
  resave: true,
  saveUninitialized: true
};

var app = express();
app.io = require('socket.io')();

const indexRouter = require('./routes/index');
const accueilRouter = require('./routes/accueil');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(session(sess));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/socket.io')));

app.use('/', indexRouter);
app.use('/accueil', accueilRouter);

app.io.on('connection', function(){
  console.log('connected');
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
