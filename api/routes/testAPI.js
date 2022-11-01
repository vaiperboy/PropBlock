var express = require("express");
require("dotenv").config();
var Moralis = require("../modules/moralis");
var config = require('../config');
var helper = require("../functions/Helper");

var router = express.Router();

//getting all properties from Moralis
router.get("/", async function(req, res, next) {
    const query = new Moralis.Query("Properties");

    //define a hard-coded maximim query limit if condition fails
    var limit = parseInt(req.query.limit);
    //query.limit(limit >  config.maxQueryLimit ? config.maxQueryLimit : limit);
    query.limit(2);
    query.withCount();
    const _results = await query.find();

    //copy object to add another parameter(s)
    var results = JSON.parse(JSON.stringify(_results));
    for (var i = 0; i < results.results.length; i++) {
        //add image link to object
        results.results[i].images = await helper.getLinks(results.results[i].ipfsHash);
    }

    res.send(results);
});

module.exports = router;