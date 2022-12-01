import { Upload } from "@web3uikit/core";
import { useState } from "react";
import React from "react";
import key from "ipfs-api/src/key";

const nacl = require("tweetnacl");
nacl.util = require("tweetnacl-util");
var { Crypt } = require("hybrid-crypto-js");
const console = require("console-browserify");

const Test = () => {
  var crypt = new Crypt({ md: "sha1" });
  const [frontIdDocument, setFrontIdDocument] = useState({});

  //START OF RSA

  //Result of openSSL
  const publicKey =
    "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4e3R+O5jcNragqe05vmQmFKzqaGMm25z9moHIhIBv8Fj0SwFF1ZRoA1WeL4PZ1xMDLirn1rR7tcoj5oNKtjd671j4SW7AV0NTv9y76dJlIaYTwyefFIvX40OwULId1xYr55XN2xN85rrQxtRHj5I5AeVDFr+attODqmKSQ3tVSQIDAQAB" +
    "-----END PUBLIC KEY-----";
  const privateKey =
    "-----BEGIN PRIVATE KEY-----\n" +
    "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALh7dH47mNw2tqCp7Tm+ZCYUrOpoYybbnP2agciEgG/wWPRLAUXVlGgDVZ4vg9nXEwMuKufWtHu1yiPmg0q2N3rvWPhJbsBXQ1O/3Lvp0mUhphPDJ58Ui9fjQ7BQsh3XFivnlc3bE3zmutDG1EePkjkB5UMWv5q204OqYpJDe1VJAgMBAAECgYAqzFlGP8VCsV7E/ycN0mGhhAJpjzYRebl+DC43uqWhUn0Qj6YH8XiweLWQMS3Bh+fdQQSrLGBKou32Ti//US6lbZ1k/XVA8b+c41511iVCs+Ez9+8g7213oxbVZTfgpZr/bMOdy6KWQj11h72KSX3SmsnUEYOejGAidKgJEtfL0QJBAOKke8c4mcXlhGz8fqmPjn4ap6F2DwbpkQjGovH5QN51bS7RfjQS+w2KywuusxsuooL+gPH7FATi9bZwU/oah08CQQDQYO15nsXvtyPMdHU1kUmnllX0P0ECAlWpR+eEnn9lZ7+8a3/0lWNB2vZa2df00y+1UD+yRtlEYdupjJT8YbPnAkEAhPZaZ5YdIKx19DptVKyTvAeHMIJCbpu4Kp3eGndQRzI8y6q7j3FTN66lUEU9bkT9sjv9Cfly1SsRW+aqXaASoQJBAIF8yfU6obt9rcQ+VhuMhh2bARy/NdFezAZehVLW/0lveClJEAFX148z1sTL/DPKDCp6jKpm9lpVCSBKGMbgm98CQGiZ8uTrc/7ObWSvSCgBNBbeXFEB97U4ZwXvrDccqeEPL4RhkDNRHuIBeVvc9wXW9lSPeRvcrUQNY6b+hxXAC+0=" +
    "-----END PRIVATE KEY-----";

  const myEncrypt = (data) => {
    try {
      //generate a signature to sign the data
      var signature = crypt.signature(privateKey, data);
      console.log("----SIGNATURE----\n", signature);

      //perform encryption
      var encrypted = crypt.encrypt(publicKey, data, signature); //signs and encrypts the encrypted with the generated signature and pubkey
      console.log("----ENCRYPTED----\n", encrypted);

      //perform decryption
      var decrypted = crypt.decrypt(privateKey, encrypted); //decrypts with privkey
      console.log("----DECRYPTED----\n", decrypted);

      //decrypts the signature of the result using the pubkey and compares the obtained hash from the signature to the original hash, returns true if sigs are equal
      var verify = crypt.verify(publicKey, decrypted.signature, data);
      console.log("----VERIFICATION----\n", verify);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Upload value="" onChange={setFrontIdDocument} theme="withIcon" />
      <h1>Upload Pic and Click on button</h1>
      <button
        onClick={() => {
          myEncrypt(frontIdDocument);
        }}
      >
        Encrypt Me
      </button>
    </div>
  );
};

export default Test;

/* Assigning every task in a function

const signData = (text) => {
    setplaintext(text);

    var signature = crypt.signature(privateKey, plaintextt);
    console.log("signature: ", signature);
    setSignature(signature);

    //encrypts it after signing it
    myencrypt(plaintextt, Signature);
  };

  const myencrypt = (text, sig) => {
    try {
      var encrypted = crypt.encrypt(publicKey, text, sig);
      console.log("encrypted: ", encrypted);
      setciphered(encrypted);

      return encrypted;
    } catch (error) {
      console.log(error);
    }
  };

  const mydecrypt = (cipher) => {
    var decrypted = crypt.decrypt(privateKey, cipher);
    console.log("decrypted: ", decrypted);
    setdecryptedd(decrypted);

    //verifying authenticity of ciphered, if true means message came from the right person
    return myverify(decryptedd, plaintextt);
  };

  //to verify data
  const myverify = (decrypted, text) => {
    var verify = crypt.verify(publicKey, decryptedd.signature, text);
    console.log("verify: ", verify);
    return verify;
  };

*/

/*USING CRYPTO MODULE (problem with fixProc file is not updated. Cannot read properties of null)
  const cryptoencrypt = (string) => {
    const encryptedData = crypto.publicEncrypt(
      {
        //key: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC4e3R+O5jcNragqe05vmQmFKzqaGMm25z9moHIhIBv8Fj0SwFF1ZRoA1WeL4PZ1xMDLirn1rR7tcoj5oNKtjd671j4SW7AV0NTv9y76dJlIaYTwyefFIvX40OwULId1xYr55XN2xN85rrQxtRHj5I5AeVDFr+attODqmKSQ3tVSQIDAQAB",
        key: publicKey,
      },
      Buffer.from(string, "utf-8")
    );
    const ciphered = encryptedData.toString("base64");
    console.log(encryptedData);
    console.log("encypted data: ", ciphered);

    return ciphered;
  };*/

/*USING TWEETNACL LIBRARY (ENCRYPTION IS DIFFERENT EVERYTIME, AND DECRYPTION RETURNS NULL) 
  const server = nacl.box.keyPair(); //server
  const client = nacl.box.keyPair(); //client

  const clientEncrypting = (string) => {
    //David computes a one time shared key

    const nonce = nacl.randomBytes(24);

    const encrypted = nacl.box(
      nacl.util.decodeUTF8(string),
      nonce,
      server.publicKey,
      client.secretKey
    );

    const message_in_transit = { encrypted, nonce };
    console.log(message_in_transit);
    setmessage_intransit(message_in_transit);
    //console.log("secretkey: ", client.secretKey);
    return message_in_transit;
  };

  const serverDecrypting = (message) => {
    let decoded_message = nacl.box.open(
      message.encrypted,
      message.nonce,
      client.publicKey,
      server.secretKey
    );

    let convertedToString = JSON.stringify(decoded_message);
    //let plain_text = nacl.util.encodeUTF8(decoded_message); //readable
    const utf8 = nacl.util.encodeUTF8(convertedToString);

    //return the plaintext

    console.log(decoded_message, convertedToString, utf8);
    return utf8;
  };*/

// const keys = {
//   privKey: `
//   -----BEGIN RSA PRIVATE KEY-----
//   MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
//   WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
//   aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
//   AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
//   xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
//   m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
//   8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
//   z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
//   rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
//   V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
//   aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
//   psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
//   uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
//   -----END RSA PRIVATE KEY-----`,
//   pubKey: `
//   -----BEGIN PUBLIC KEY-----
//   MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
//   FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
//   xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
//   gwQco1KRMDSmXSMkDwIDAQAB
//   -----END PUBLIC KEY-----
//   `

// }

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
