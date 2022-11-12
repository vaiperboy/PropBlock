import { create } from 'ipfs-http-client'
require("dotenv").config();

//const PROJECT_ID = process.env.INFURA_PROJECT_ID;
//const PRIVATE_KEY = process.env.INFURA_PRIVATE_KEY;
const PROJECT_ID = "2F4YBXV6APjG1ZeCRcgCfV70j0I"
const PRIVATE_KEY = "07064f83ea921c57da2cbfad89b36e2f"

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
const _ipfs = create(new URL("https://dweb.link/api/v0"));

export default ipfs;