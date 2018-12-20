const express = require('express');
const models = require('../models');
const router = express.Router();
var datetime = require('node-datetime');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/register.twig');
});

var dt = datetime.create();
var creation = dt.format('Y/m/d H:M:S');


router.post('/', (req, res, next) => {
	const r = req.body;
  models
  .broquiz_user
  .create({
    user_login: r.username,
    user_email: r.email,
    user_password: r.password,
    user_salt: 'test',
    user_country: 'France',
    user_points: 0,
    user_status: 1,
    user_role: 1,
    createdAt: creation,
    updatedAt: creation,
    user_last_connection: creation
  })
.then(function() {
		//req.flash('success', "L'utilisateur a bien été ajouté.");
		res.redirect('/users');
	}).catch((err) => {
		//req.flash('errors', err.message);
		res.redirect('/users');
	});
});

module.exports = router;
