var express = require('express');
var router = express.Router();

var fs = require('fs');
// var exec = require('child_process').exec;

// From http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function padDigits(number, digits) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number
  );
}

router.post('/capture', function (req, res, next) {
  var data = req.fields.data.split(';base64,')[1];
  var buf = new Buffer.from(data, 'base64');

  var file_name = 'out/frame_' + padDigits(req.fields.frame, 5) + '.png';
  fs.writeFile(file_name, buf, function (err) {
    if (err) {
      console.error('Error writing %s: %s', file_name, err);
      res.writeHead(500, 'Internal Error');
      res.end();
      return;
    }

    console.log(Date.now() + ' -- Saved frame ' + req.fields.frame);
    res.status(204).send('');
  });
});

module.exports = router;
