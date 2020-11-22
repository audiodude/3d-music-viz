var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(["a", "b", "c"]);
});

module.exports = router;
