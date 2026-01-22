var express = require("express");
const { route } = require("./hello");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
