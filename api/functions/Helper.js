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

//processes the filtering parameters
module.exports.processFiltering = function(params) {
    const output = {};
    output.minimumBeds = parseInt(params.minimumBeds) || 0;
    output.minimumBaths = parseInt(params.minimumBaths) || 0;
    output.minPrice = parseInt(params.minPrice) || 0;
    output.maxPrice = parseInt(params.maxPrice) || 10000000
    output.propertyType = params.propertyType === undefined ? "" : params.propertyType.toLowerCase()
    output.facilities = parseInt(params.facilities) || 0;
    output.city = params.city === undefined ? "" : params.city.toLowerCase()
    return output
}

//calculates the number of pages
module.exports.getTotalPageNumbers = function(totalCount, pageSize) {
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
}


module.exports.isAddress = function (address) {
    return /^(0x)?[0-9a-f]{40}$/i.test(address)
};
