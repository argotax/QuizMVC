var express = require('express');
var router = express.Router();

const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models
  .broquiz_user
  .findAll({

    attributes: ['user_id', 'user_login', 'user_password', 'user_salt']
  }).then(
    user => {
    console.log(user);
    }
  );
  res.render('question',{login: req.session.login});
});

module.exports = router;
