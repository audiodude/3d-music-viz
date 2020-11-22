var express = require("express");
var router = express.Router();

router.get("/capture", function (req, res, next) {
  res.status(204).send("");
});

module.exports = router;
