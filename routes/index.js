var express = require('express');
var router = express.Router();

router.post('/capture', function (req, res, next) {
  res.status(204).send('');
});

module.exports = router;
