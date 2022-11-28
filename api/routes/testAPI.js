var express = require("express");
require("dotenv").config();
var Moralis = require("../modules/moralis");
var config = require('../config');
var helper = require("../functions/Helper");

var router = express.Router();

//getting all properties from Moralis
router.get("/", async function(req, res, next) {
   res.send("hiuii")
});

module.exports = router;