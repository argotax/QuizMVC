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
  console.log(r.username);
	models.user.create({
		username: r.username,
		password: r.password,
		email: r.email,
    salt: 'test'
	}).then(function() {
		//req.flash('success', "L'utilisateur a bien été ajouté.");
		res.redirect('/users');
	}).catch((err) => {
		//req.flash('errors', err.message);
		res.redirect('/users');
	});
});

module.exports = router;
