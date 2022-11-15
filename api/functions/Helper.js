const auth = require("../modules/ipfs");
var config = require('../config');
var axios = require('axios');
var Moralis = require("../modules/moralis");


//to cache the result
var hashesDict = [];


//gets all the links inside a ipfs directory
module.exports.getLinks = async function (cid) {
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

//makes sure user is authenticated
module.exports.isAuthenticated = async function(sessionToken) {
    return new Promise(async (resolve, reject) => {
        try {
            var query = new Moralis.Query("_Session");
            query.equalTo("sessionToken", sessionToken);
            query.limit(1);
            query.withCount();
            const result = await query.find();
            resolve(result.count == 1); //if session exsists its authenticated
        } catch {
            resolve(false);
        }
    });
}


//caching
module.exports.getUser = async function(address) {
    return new Promise(async (resolve, reject) => {
        console.log("finding with: " + address);
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
        query.equalTo("propertyType", params["propertyType"]);
    }

    if (params["facilities"] != undefined && params["facilities"] > 0) {
        query.greaterThan("facilities", params["facilities"]);
    }

    
}
