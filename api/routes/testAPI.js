var express = require("express");
require("dotenv").config();
var Moralis = require("../modules/moralis");
var config = require('../config');
var helper = require("../functions/Helper");

var router = express.Router();

//getting all properties from Moralis
router.get("/", async function (req, res, next) {
   var mode = req.query.mode.toLowerCase()
   var ownerAddress = req.query.ownerAddress
   ownerAddress = helper.toCheckSumAddress(ownerAddress)
   
   const query = new Moralis.Query("PurchaseRequest");
   const pipeline = [
      {
         match: {
            ...(mode == "seller") ? {
               sellerEthAddress: ownerAddress
            } : {
               requesterEthAddress: ownerAddress
            }
         }
      },
      {
         lookup: {
            from: "PropertiesAdded",
            localField: "propertyObjectId",
            foreignField: "_id",
            as: "details"
         }
      },
      {
        project: {
          "details.propertyId" : 1,
          "sellerEthAddress": 1,
          "requesterEthAddress": 1,
          "propertyObjectId": 1,
          "createdAt": 1,
          "isPending": 1,
          "isAccepted": 1,
          "agreementStarted": 1,
        }
      },
      {
         match: {
           "details": {$exists: true}
         }
       }
   ]
   const _result = await query.aggregate(pipeline, { useMasterKey: true })
   const result = JSON.parse(JSON.stringify(_result))
   res.send(result)
   return
});

module.exports = router;