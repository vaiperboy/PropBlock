const auth = require("../modules/ipfs");
var config = require('../config');
var axios = require('axios');
var Moralis = require("../modules/moralis");
const { pageSize } = require("../config");


//to cache the result
var hashesDict = [];


//gets all the links inside a ipfs directory
module.exports.getImages = async function (cid) {
    var hashes = [];

    //if cache doesn't exist
    if (hashesDict[cid] == undefined) {
        hashesDict[cid] = [];

        var _config = {
            method: 'post',
            url: 'https://ipfs.infura.io:5001/api/v0/dag/get?arg=' + cid,
            headers: {
                'Authorization': auth
            }
        };
        await axios(_config)
            .then(function (response) {
                response.data.Links.forEach(elm => {
                    hashesDict[cid].push(elm.Name);
                });
            })
            .catch(function (error) {
                console.log(error);
                return hashes;
            });

    }

    //add to cache
    hashesDict[cid].forEach(element => {
        hashes.push(config.ipfsLink.concat(element));
    });

    return hashes;
}

//makes sure user is authenticated & with the matching address
//passing the address is optional
module.exports.isAuthenticated = async function(sessionToken, address) {
    return new Promise(async (resolve, reject) => {
        try {
            var sessionQuery = new Moralis.Query("_Session");
            sessionQuery.equalTo("sessionToken", sessionToken);
            sessionQuery.limit(1);
            const result = await sessionQuery.find({useMasterKey: true});
            if (result.length === 0) {
                resolve(false)
                return;
            }

            //if not address is passed
            if (address === undefined) {
                resolve(true)
                return
            }

            const userId = JSON.parse(JSON.stringify(result))[0].user.objectId

            //check _User table
            var userQuery = new Moralis.Query("_User")
            userQuery.equalTo("objectId", userId)
            userQuery.limit(1)
            const userQueryResult = await userQuery.find({useMasterKey: true})
            if (userQueryResult.length === 0) {
                resolve(false)
                return;
            }
            const _result = JSON.parse(JSON.stringify(userQueryResult))[0]
            const matchingUserAddress = _result.ethAddress
            resolve(matchingUserAddress.toLowerCase() == address.toLowerCase())
            return
        } catch {
            resolve(false);
        }
    });
}


//caching
module.exports.getUser = async function(address) {
    return new Promise(async (resolve, reject) => {
        const query = new Moralis.Query("_User");
        query.equalTo("ethAddress", address.toLowerCase());
        query.limit(1);
        var result = await query.find({useMasterKey: true});
        var user = {};
        result.forEach((e) => {
            user = {
            "fullName": e.get("fullName").toString(),
            "address": e.get("ethAddress").toString()
            }
        });
        resolve(user);
    });
}

//processes the moralis Query object with the 
//parameters
module.exports.processFiltering = async function(params, query) {
    if (params["propertyType"] != undefined) {
        query.equalTo("propertyType", params["propertyType"].toLowerCase());
    }

    if (params["facilities"] != undefined && params["facilities"] > 0) {
        query.greaterThan("facilities", params["facilities"]);
    }
    
    if (params["minPrice"] != undefined) {
        var minPrice = parseInt(params["minPrice"]);
        if (!isNaN(minPrice)) query.greaterThan("listedPrice", minPrice);
    }

    if (params["maxPrice"] != undefined) {
        var maxPrice = parseInt(params["maxPrice"]);
        if (!isNaN(maxPrice)) query.greaterThan("listedPrice", maxPrice);
    }
}

//calculates the number of pages
module.exports.getTotalPageNumbers = function(totalCount, pageSize) {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}


//gets extra details about the property
module.exports.getPropertyExtraDetails = async function(txHash) {
    return new Promise(async (resolve, reject) => {
        var tmp = {}
        const query = new Moralis.Query("PropertyDetails")
        query.equalTo("txHash", txHash)
        const _result = await query.find()
        var result = JSON.parse(JSON.stringify(_result))
        console.log(result)
        if (result) {
            result = result[0]
            tmp  = {
                facilities: result.facilities,
                bedsNumber: result.bedsNumber,
                bathsNumber: result.bathsNumber,
                propertyTitle: result.propertyTitle,
                propertyDescription: result.propertyDescription,
                occupantsNumber: result.occupantsNumber
            }
        }
        resolve(tmp)
    })
}
