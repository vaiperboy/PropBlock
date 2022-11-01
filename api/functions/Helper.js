const auth = require("../modules/ipfs");
var config = require('../config');
var axios = require('axios');


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
