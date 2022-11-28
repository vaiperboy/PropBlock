import { Upload } from "@web3uikit/core";
import { useState } from "react";
import React from "react";
import crypto from 'crypto';
import key from "ipfs-api/src/key";


const Test = () => {

  const [frontIdDocument, setFrontIdDocument] = useState({});
  var data = [{ id: 1 }, { id: 2 }];
  const crypto = require("crypto");



  const keys = {
    privKey: `
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
    WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
    aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
    AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
    xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
    m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
    8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
    z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
    rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
    V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
    aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
    psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
    uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
    -----END RSA PRIVATE KEY-----`,
    pubKey: `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
    FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
    xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
    gwQco1KRMDSmXSMkDwIDAQAB
    -----END PUBLIC KEY-----
    `


  }

  const datastring = "my secret date";

  const encryptedData = crypto.publicEncrypt(
    {
      key: key.pubKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(datastring)
  );

  console.log("encypted data: ", encryptedData);

  const decryptedData = crypto.privateDecrypt(
    {
      key: key.privKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedData
  );
  console.log("decrypted data: ", decryptedData);





  return (
    <div>
      
      emptyyty
      <Upload value="" onChange={setFrontIdDocument} theme="withIcon" />
      <h1>Ciphertext</h1>
      {/* <p>{encryptedText}</p> */}
      <p>
        <b>Decrypting using private key...</b>
      </p>
      <h1>Plaintext</h1>
      {/* <p>{decryptedText}</p> */}
    </div>
  );
};

export default Test;



  //var str = JSON.stringify(data); //convert object to string
  //console.log(typeof str);
  //var obj = JSON.parse(str); //convert string back to object
  //console.log(obj["1"][2][3]);


/*   AES enc/dec 
 var data = [{ id: 1 }, { id: 2 }];

  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();

  var bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  console.log(data, ciphertext, decryptedData);
    */

/*
  //BEGIN RSA String ENCRYPT
  const text = "qusai";
  const encryptedText = encryptRsa.encryptStringWithRsaPublicKey({
    text,
    publicKey:
      "-----BEGIN PUBLIC KEY-----\nMIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgEzCqLqxWSiOTkWFQaPhY6X+qom8\nzzbidCpNu/zxwTieMvnBE4yPCeSRwJMFjJD2UGr7I/WunOsx+rAxYbzoMELw6TdZ\naaKygSLfkncUmbL6MQ1ZCSQQR6weaQj8VeYKNaA3QSqJYXCRPky6LI/o73brTCpE\nsWuVWp577q2PbTDbAgMBAAE=\n-----END PUBLIC KEY-----",
  });
  console.log("ENTERRRRRRRRRRRRRRRRRRRRRR", encryptedText);
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIICWwIBAAKBgEzCqLqxWSiOTkWFQaPhY6X+qom8zzbidCpNu/zxwTieMvnBE4yP
  CeSRwJMFjJD2UGr7I/WunOsx+rAxYbzoMELw6TdZaaKygSLfkncUmbL6MQ1ZCSQQ
  R6weaQj8VeYKNaA3QSqJYXCRPky6LI/o73brTCpEsWuVWp577q2PbTDbAgMBAAEC
  gYAdokTrlk4aZx32nuRhdUE4M2H5POgugyxfrJT3qQl0Zza8zvpSGGK0WESlPc4v
  pLgVJRGT5q5z6l6iqN3XxTfkI2LpvoaJzkS7Ow6ODkSfnoaeE5LsBA19BYGGgtw5
  uD4c7YBVJoEWZelSgsfSJdUpq/4YIBDSETA2aXWuC32l4QJBAJjciW9COFow7mH7
  lWveyrBGjGbisv/A9OzJAsjzsgqudvTMCFUrQgRcRlof45TPQzvlCerNg9/Q/Q3W
  oUvjYXECQQCAjVSlzYWtFovvG306VXvhjgR4W5D1Eg1havbeJpdQPgulyPnyBCDR
  6XUeGyH8fTaT0ByDxRqiQnk2r5UuZ5ELAkEAhMF7pqG3OTUnwvbxJTbfh0ot46jc
  1ltpGz/T6Fwk8zvj2eRdFEK2Wf0dqGXri7CZbqoS+9Yywq3JKDyP5s16MQJAI04t
  dEfosavijK3BC9dUaZMGeUO0oQnvMNUerc5tejVAH6z9sFEf7mauqrEK+XwuFBRw
  8GOet/eHsNQyJYd+FwJAPDgogfNfjBV6bQT2UQwHdfzKG1Jfcs5Pz/fLMljsa67I
  osWRyvZU4dRMwmNpo+m9YyKHDuQ/NwwMBhQtYlkzDw==
  -----END RSA PRIVATE KEY-----`;
     const decryptedText = encryptRsa.decryptStringWithRsaPrivateKey({
       text: encryptedText,
       privateKey: privateKey,
     });*/

     //   // To export the public key and write it to file:
//   const exportedPublicKeyBuffer = keys.pubKey.export({
//     type: "pkcs1",
//     format: "pem",
//   });
//   fs.writeFileSync("public.pem", exportedPublicKeyBuffer, {
//     encoding: "utf-8",
//   });

//   // To export the private key and write it to file to use it in API
//   const exportedPrivateKeyBuffer = keys.privKey.export({
//     type: "pkcs1",
//     format: "pem",
//   });
//   fs.writeFileSync("private.pem", exportedPrivateKeyBuffer, {
//     encoding: "utf-8",
//   });