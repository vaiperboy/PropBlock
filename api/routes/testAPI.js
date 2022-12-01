var express = require("express");
require("dotenv").config();
var Moralis = require("../modules/moralis");
var config = require('../config');
var helper = require("../functions/Helper");

var router = express.Router();

//getting all properties from Moralis
router.get("/", async function(req, res, next) {
   const query = new Moralis.Query("PurchaseRequest");
   const pageNumber = parseInt(req.query.pageNumber) || 1;
   const pipeline = [
      {
         lookup: {
            from: "_User",
            localField: "sellerEthAddress",
            foreignField: "ethAddress",
            as: "userDetails"
         }
      },
      {
         project: {
            "userDetails.fullName": 1,r
         }
      }
   ]
   const _result = await query.aggregate(pipeline, {useMasterKey: true})
   const result = JSON.parse(JSON.stringify(_result))
   // for (var i = 0; i < result.results.length; i++) {
   //     console.log("getting for " + result.results[i].transaction_hash)
   //     var extraDetails = await helper.getPropertyExtraDetails(result.results[i].transaction_hash)
   //     var images = {images: await helper.getImages(result.results[i].ipfsHash)}
   //     Object.assign(result.results[i], result.results[i], extraDetails, images)
   // }
   // result.totalPages = helper.getTotalPageNumbers(result.count, config.pageSize)
   // res.json(result)
   res.send(result)
});

module.exports = router;