const Moralis = require("moralis-v1/node");
require("dotenv").config();

const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

(async() => {
    await Moralis.start({ serverUrl, appId, masterKey });
  }) ();



module.exports = Moralis;