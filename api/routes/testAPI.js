var express = require("express");
require("dotenv").config();
var Moralis = require("../modules/moralis");
var config = require('../config');
var helper = require("../functions/Helper");
var router = express.Router();
var axios = require('axios');
const auth = require("../modules/ipfs");


//getting all properties from Moralis
router.get("/", async function (req, res, next) {
   var _config = {
      method: 'post',
      url: 'https://ipfs.infura.io:5001/api/v0/dag/get?arg=' + req.query.hash,
      headers: {
          'Authorization': auth
      }
  };
  await axios(_config)
      .then((response) => {
          res.send(response.data)
          return
      })
});

module.exports = router;