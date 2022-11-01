const { create } = require('ipfs-http-client');

require("dotenv").config();

const PROJECT_ID = process.env.INFURA_PROJECT_ID;
const PRIVATE_KEY = process.env.INFURA_PRIVATE_KEY;


const auth = 'Basic ' + Buffer.from(PROJECT_ID + ':' + PRIVATE_KEY).toString('base64');
const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});



//for retriving files
//const _ipfs = create(new URL("https://dweb.link/api/v0"));
//const _ipfs = create(new URL("https://ipfs.io/ipfs/"));


//module.exports = ipfs;
module.exports = auth;