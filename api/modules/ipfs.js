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

module.exports = auth;