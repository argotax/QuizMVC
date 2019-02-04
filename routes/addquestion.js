var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/addquestion', function(req, res, next) {
  res.render('addquestion');
});

module.exports = router;
