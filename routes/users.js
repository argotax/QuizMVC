const express = require('express');
const models = require('../models');
const router = express.Router();
var datetime = require('node-datetime');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/register.twig');
});

var dt = datetime.create();
var creation = dt.format('Y/m/d H:M:S');


router.post('/', (req, res, next) => {
	const r = req.body;

  var salt = bcrypt.genSaltSync(saltRounds);

  bcrypt.hash(r.password, salt, (err, hash) => {
    models.user.create({
      username: r.username,
      password: hash,
      email: r.email,
      salt: salt
    }).then(function() {
      //req.flash('success', "L'utilisateur a bien été ajouté.");
      res.redirect('/users');
    }).catch((err) => {
      //req.flash('errors', err.message);
      res.redirect('/users');
    });

  });
});

module.exports = router;
