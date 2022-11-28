import { useState } from "react";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Stepper, Upload, VerifyCode } from "@web3uikit/core";
import { message, Alert, notification, Checkbox } from "antd";
import realEstate from "../artifacts/contracts/realEstate.sol/realEstate.json";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "../styling/SignUp/SignUp.scss";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// -----------------
// Importing images
import signup_illustration from "../assets/signup_illustration.png";
import metamask from "../assets/icons8-metamask-logo-96-min.png";
import { useEffect } from "react";
import ipfs from "../modules/ipfs";
import Fade from "react-reveal/Fade";

// import { ArrowLeftOutlined } from "@ant-design/icons";
const console = require("console-browserify");

const { ethers } = require("ethers");

const validateEmail = (email) => {
  var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return validRegex.test(email);
};

// main function
const App = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  // Signer - this represents an Ethereum account that has the ability to sign transactions.
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  // Contract - this is an Ethers.js object that represents a specific contract deployed on-chain.
  const realEstateContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    realEstate.abi,
    signer
  );

  let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  const [fullName, setFullName] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpCode, setOTPCode] = useState("");

  const [userAddress, setUserAddress] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  //change all of these to 'false' in production
  const [isValidated, setIsValidated] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [idDocumentsVerified, setIdDocumentsVerified] = useState(false);
  const [passportDocumentsVerified, setPassportDocumentsVerified] =
    useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [frontIdDocument, setFrontIdDocument] = useState({});
  const [backIdDocument, setBackIdDocument] = useState({});
  const [frontPassportDocument, setFrontPassportDocument] = useState({});
  const [backPassportDocument, setBackPassportDocument] = useState({});

  const [isRegistering, setRegistering] = useState(false);

  const {
    setUserData,
    authenticate,
    signup,
    isAuthenticated,
    isAuthenticating,
    isUnauthenticated,
    user,
    account,
    logout,
    oralis,
    isInitialized,
    Moralis,
    ...rest
  } = useMoralis();
  let navigate = useNavigate();

  // disconnects the metamask wallet
  const disconnectWallet = async () => {
    try {
      await logout();
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // check if email
  const emailAlreadyExists = async (email) => {
    try {
      const userEmails = Moralis.Object.extend("_Users");
      const query = new Moralis.Query(userEmails);
      query.equalTo("email", email.toLowerCase());
      const results = await query.find();
      console.log(email);
      if (results.length > 0) return email + " already exists!";
      return "";
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  // checks if the user with the address exists already in the db
  const checkAddressExists = async (address) => {
    try {
      const users = Moralis.Object.extend("usersSignedUp");
      const query = new Moralis.Query(users);
      query.equalTo("address", address.toLowerCase());
      query.limit(1);
      query.withCount();
      const results = await query.find();
      if (results.count == 0) {
        return "";
      } else {
        return (
          "User with the address (" +
          address +
          " ) already exists! Please connect a new wallet address."
        );
        /*message.error(
          "User with the address (" +
            user.get("ethAddress") +
            " ) already exists! Please connect a new wallet address."
        );*/
      }
    } catch (error) {
      message.error("Error: " + error);
      return error;
    }
  };

  //check if account doesn't exist (1st step)
  const validateUser = async (email, address) => {
    try {
      const errors = [];

      if (!walletConnected) errors.push("Connect a wallet!");
      if (fullName === "" || email === "") {
        errors.push("Please make sure Name & Email inputs are filled!");
      } else {
        const nameReg = /^[a-zA-Z]+$/;
        if (!nameReg.test(fullName)) {
          errors.push("Error: Full Name can only contain characters");
        }
        const isValid = validateEmail(email);
        if (!isValid) {
          errors.push(
            "Invalid Email address! Enter a valid email address to continue."
          );
        }
      }

      //first step of validation
      if (errors.length > 0) {
        errors.forEach((e) => message.error(e));
        return;
      }

      var mailExists = await emailAlreadyExists(email);
      if (mailExists.length > 0) {
        errors.push(mailExists);
      }

      var addressExists = await checkAddressExists(address);
      if (addressExists.length > 0) {
        errors.push(addressExists);
      }

      //if no errors means user does not exist
      //means he can proceed
      if (errors.length == 0) {
        setIsValidated(true);
        message.info("You can proceed now!");
        return true;
      } else {
        //incase
        setIsValidated(false);
        errors.forEach((e) => {
          message.error(e);
        });
        return false;
      }
    } catch (error) {
      message.error("error: " + error);
      return false;
    }
  };

  // connect wallet for verification (1st step)
  const connectWallet1 = async () => {
    try {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      console.log("Account:", await signer.getAddress());
      setUserAddress(await signer.getAddress());
      setWalletConnected(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // sign up a user
  const { save } = useNewMoralisObject("usersSignedUp");

  const uploadDocuments = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          wrapWithDirectory: true,
          //progress: (prog) => console.log(`[ipfs] received: ${prog}`)
        };

        const files = [
          frontIdDocument,
          backIdDocument,
          frontPassportDocument,
          backPassportDocument,
        ];

        var hash = "";
        console.log(files);
        for await (const result of ipfs.addAll(files, options)) {
          console.log(result);
          hash = result.cid._baseCache.entries().next().value[1];
        }

        resolve(hash);
      } catch (error) {
        message.error("error with IPFS: " + error);
        resolve("");
      }
    });
  };

  const SignUpUser = async () => {
    setRegistering(true);
    message.info("Registring into database....");
    try {
      message.info("Uploading documents....");
      var ipfs = await uploadDocuments();
      if (ipfs.length == 0) {
        message.error("Failure in uploading documents...");
      } else {
        if (!Moralis.User.current()) {
          await authenticate()
            .then(function (user) {
              user.set("fullName", fullName);
              user.set("email", email);
              user.set("ipfsHash", ipfs);
              user.save();
              const data = {
                address: user.get("ethAddress"),
              };

              save(data, {
                onSuccess: (obj) => {
                  //message.info("New object created with objectId: " + obj.id);
                  accountCreated();
                  setRegistering(false);
                },
                onError: (error) => {
                  //message.error("Failed to create new object, with error code: " + error.message);
                  message.error("Failure in registering account");
                  logout().then();
                },
              });
            })
            .catch(function (error) {
              message.error("Couldn't authorize wallet: " + error);
            });
        }
      }
    } catch (error) {
      message.error("ERROR: " + error);
    }
  };

  // links to the Login Page
  const goBackToLoginPage = () => {
    let path = `../login`;
    navigate(path);
  };

  const openNotification = () => {
    notification["success"]({
      message: "New code sent successfully!",
      description:
        "A new confirmation code was sent to your email successfully. Please note the code and enter the code below to continue.",
      onClick: () => {},
      style: {
        backgroundColor: "#ffffff",
      },
    });
  };

  const accountCreated = async () => {
    message.success(
      "Account created successfully! Redirecting to login page ..."
    );
    await sleep(2500);
    navigate("/login");
  };

  const checkOTPCode = async (code) => {
    // Returns a random integer from 0 to 9:
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let num3 = Math.floor(Math.random() * 10);
    let num4 = Math.floor(Math.random() * 10);
    let otp =
      num1.toString() + num2.toString() + num3.toString() + num4.toString();
    if (code === "1112") {
      message.success("Code Validated Successfully!");
      setCodeVerified(true);
      return;
    } else {
      message.error(
        "Invalid OTP Code entered! Please enter the correct code to continue"
      );
      setCodeVerified(false);
    }
    console.log("code", code);
  };

  const getExtension = (file) => {
    return file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  //true if extension within range
  const checkExtension = (val, arr) => {
    return arr.indexOf(val) != -1;
  };

  const extensionsAllowed = ["pdf", "png", "jpg", "jpeg", "gif"];
  //for renaming files when uploading to IPFS
  const renameFile = (originalFile, newName) => {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  };

  const verifyIdDocuments = async (e) => {
    if (e.target.checked) {
      var errors = [];
      var frontExtension = "";
      var backExtension = "";
      if (
        frontIdDocument.name == undefined ||
        backIdDocument.name == undefined
      ) {
        errors.push("Please make sure you upload files for both fields!");
      } else {
        frontExtension = getExtension(frontIdDocument.name);
        backExtension = getExtension(backIdDocument.name);
        if (!checkExtension(frontExtension, extensionsAllowed))
          errors.push(
            "Make sure front ID has the following format: " +
              extensionsAllowed.join(", ")
          );
        if (!checkExtension(backExtension, extensionsAllowed))
          errors.push(
            "Make sure back ID has the following format: " +
              extensionsAllowed.join(", ")
          );
      }
      if (errors.length == 0) {
        e.target.checked = true;
        setIdDocumentsVerified(true);

        //rename files
        const front = renameFile(frontIdDocument, "front ID." + frontExtension);
        const back = renameFile(backIdDocument, "back ID." + backExtension);
        setFrontIdDocument(front);
        setBackIdDocument(back);
      } else {
        e.target.checked = false;
        setIdDocumentsVerified(false);
        errors.forEach((e) => message.error(e));
      }
    } else setIdDocumentsVerified(false);
  };

  const verifyPassportDocuments = async (e) => {
    if (e.target.checked) {
      var errors = [];
      var frontExtension = "";
      var backExtension = "";
      if (frontPassportDocument.name == undefined) {
        errors.push("Please make sure to upload your file!");
      } else {
        frontExtension = getExtension(frontPassportDocument.name);
        backExtension = getExtension(backPassportDocument.name);
        if (!checkExtension(frontExtension, extensionsAllowed))
          errors.push(
            "Make sure front passport has the following format: " +
              extensionsAllowed.join(", ")
          );
      }

      if (errors.length == 0) {
        e.target.checked = true;
        setPassportDocumentsVerified(true);

        //rename files
        const front = renameFile(
          frontPassportDocument,
          "front passport." + frontExtension
        );
        setFrontPassportDocument(front);
      } else {
        e.target.checked = false;
        setPassportDocumentsVerified(false);
        errors.forEach((e) => message.error(e));
      }
    } else setPassportDocumentsVerified(false);
  };

  useEffect(() => {
    console.log("is wallet connected: ", walletConnected);
    console.log("isauthenticated: ", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <Navbar signedIn2={isAuthenticated} />
      <div className="signup">
        <div className="leftSide">
          <Fade left duration={1000}>
            <div className="illustrationDiv">
              <img src={signup_illustration} alt="man illustration" />
            </div>
          </Fade>
        </div>
        <div className="rightSide">
          <div></div>
          <h1>Create your account</h1>
          <div className="signupSection">
            <Stepper
              onComplete={() => console.log("registered")}
              step={1}
              hasNavButtons={false}
              stepData={[
                {
                  content: (
                    <div>
                      <div className="SignUpMain">
                        <div className="fullName">
                          <Input
                            label="Full Name"
                            name="usernmae"
                            type="text"
                            id="fullName"
                            width="50%"
                            validation={{
                              required: true,
                              characterMinLength: 3,
                            }}
                            onChange={(e) => {
                              setFullName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="email">
                          <Input
                            label="Your email"
                            name="Test email Input"
                            type="email"
                            id="email"
                            width="50%"
                            validation={{
                              required: true,
                              regExp: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                              regExpInvalidMessage: "Invalid email address",
                            }}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            style={{ marginTop: "3rem" }}
                          />
                        </div>
                        {!walletConnected || userAddress.length == 0 ? (
                          <button
                            onClick={connectWallet1}
                            className="connectWalletButton"
                          >
                            Connect Wallet
                            <img src={metamask} alt="metamask icon" />
                          </button>
                        ) : (
                          <button
                            className="disconnectWalletButton"
                            onClick={() => {
                              //disconnectWallet();
                              //setWalletConnected(false);
                              //setUserAddress("");
                            }}
                            style={{ width: "40rem" }}
                          >
                            Disconnect Wallet from metamask & refresh
                          </button>
                        )}
                        <Button
                          onClick={() => {
                            validateUser(email, userAddress);
                          }}
                          type="Proceed"
                          text="Proceed"
                          theme="colored"
                          color="blue"
                          size="large"
                          isFullWidth="true"
                          disabled={isAuthenticating}
                          className="SignUpButton"
                          style={{
                            width: "50%",
                            marginTop: "2rem",
                          }}
                        />
                        <div className="linkToLoginPage">
                          Already have an account?{" "}
                          <Link to="/login2" className="loginText">
                            Login
                          </Link>{" "}
                          instead.
                        </div>
                        {isValidated && (
                          <button id="next" className="nextButton">
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  ),
                  title: "",
                },
                {
                  content: (
                    <div>
                      <button id="prev" className="prevButton">
                        <ArrowLeftOutlined /> Back
                      </button>
                      <h2>Confirm your email address</h2>
                      <p>
                        A 4-digit code has been sent to your email. Please enter
                        the code below.
                      </p>
                      <VerifyCode
                        onCompleted={(data) => setOTPCode(data)}
                        length={4}
                        placeholder={"0"}
                        label={""}
                      />
                      <button
                        className="resendEmailButton"
                        onClick={() => {
                          openNotification();
                        }}
                      >
                        Resend Code
                      </button>
                      <Button
                        onClick={() => {
                          checkOTPCode(otpCode);
                        }}
                        text="Submit"
                        theme="colored"
                        color="blue"
                        size="large"
                        isFullWidth="true"
                        disabled={isAuthenticating}
                        className="SignUpButton"
                        style={{
                          width: "50%",
                          marginTop: "2rem",
                        }}
                      />
                      {codeVerified && (
                        <Alert
                          message="OTP Code verified successfully! Please click next to complete the sign up process."
                          style={{ marginTop: "1rem", width: "fit-content" }}
                        />
                      )}
                      <div className="emailSection">
                        {codeVerified && (
                          <button id="next" className="nextButton">
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  ),
                  title: "",
                },
                {
                  content: (
                    <div>
                      <button
                        id="prev"
                        className="prevButton"
                        style={{ marginTop: "3.2rem" }}
                      >
                        <ArrowLeftOutlined /> Back
                      </button>
                      <h2>Upload Identification Documents</h2>
                      <p>Upload passport Page</p>
                      <Upload
                        value=""
                        theme="withIcon"
                        onChange={setFrontPassportDocument}
                      />
                      <div>
                        <div className="checkBoxDiv">
                          <input
                            type="checkbox"
                            name="passportCheckBox"
                            id="passportCheckBox"
                            onClick={verifyPassportDocuments}
                          />
                          <p>
                            I confirm that the <strong>passport</strong> is
                            valid until expiry date and is in color.
                          </p>
                        </div>
                      </div>
                      {passportDocumentsVerified ? (
                        <button id="next" className="nextButton">
                          Next
                        </button>
                      ) : (
                        <button
                          id="next"
                          className="nextButton"
                          style={{
                            pointerEvents: "none",
                            cursor: "not-allowed",
                            backgroundColor: "#74b7dd",
                          }}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  ),
                  title: "",
                },
                {
                  content: (
                    <div>
                      <button
                        id="prev"
                        className="prevButton"
                        style={{ marginTop: "3.2rem" }}
                      >
                        <ArrowLeftOutlined /> Back
                      </button>
                      <h2>Upload Identification Documents</h2>
                      <p>Upload ID - Front Page</p>
                      <Upload
                        value=""
                        onChange={setFrontIdDocument}
                        theme="withIcon"
                      />
                      <p style={{ marginTop: "1.5rem" }}></p>
                      <p>Upload ID - Back Page</p>
                      <Upload
                        value=""
                        onChange={setBackIdDocument}
                        theme="withIcon"
                      />
                      <div className="checkBoxDiv">
                        <input
                          type="checkbox"
                          name="idCheckBox"
                          id="idCheckBox"
                          onChange={verifyIdDocuments}
                        />
                        <p>
                          I confirm that the <strong>ID</strong> is valid until
                          expiry date and is in color.
                        </p>
                      </div>
                      {idDocumentsVerified ? (
                        <button id="next" className="nextButton">
                          Next
                        </button>
                      ) : (
                        <button
                          id="next"
                          className="nextButton"
                          style={{
                            pointerEvents: "none",
                            cursor: "not-allowed",
                            backgroundColor: "#74b7dd",
                          }}
                        >
                          Next
                        </button>
                      )}
                    </div>
                  ),
                  title: "",
                },
                {
                  content: (
                    <div>
                      <button
                        id="prev"
                        className="prevButton"
                        style={{ marginTop: "3.2rem" }}
                      >
                        <ArrowLeftOutlined /> Back
                      </button>
                      <h2>Terms & Conditions</h2>
                      <div className="termsDiv">
                        <h1> TABLE OF CONTENTS </h1>
                        <div className="linksToTerms">
                          <a href="#AgreementToTerms"> 1. AGREEMENT TO TERMS</a>
                          <br />
                          <a href="#intellectualProperty">
                            2. INTELLECTUAL PROPERTY RIGHTS
                          </a>
                          <br />
                          <a href="#userRepresentaions">
                            3. USER REPRESENTATIONS
                          </a>
                          <br />
                          <a href="#userRegistration">4. USER REGISTRATION</a>
                          <br />
                          <a href="#prohibitedActivites">
                            5. PROHIBITED ACTIVITIES
                          </a>
                          <br />
                          <a href="#usergenerated">
                            6. USER GENERATED CONTRIBUTIONS
                          </a>
                          <br />
                          <a href="#contributionLicense">
                            7. CONTRIBUTION LICENSE
                          </a>
                          <br />
                          <a href="#guidelines">8. GUIDELINES FOR REVIEWS</a>
                          <br />
                          <a href="#socialMedia">9. SOCIAL MEDIA</a>
                          <br />
                          <a href="#submissions">10. SUBMISSIONS</a>
                          <br />
                          <a href="#thirdParty">
                            11. THIRD-PARTY WEBSITE AND CONTENT
                          </a>
                          <br />
                          <a href="#advertisers">12. ADVERTISERS</a>
                          <br />
                          <a href="#siteManagement">13. SITE MANAGEMENT</a>
                          <br />
                          <a href="#privacyPolicy">14. PRIVACY POLICY</a>
                          <br />
                          <a href="#termAndTermination">
                            15. TERM AND TERMINATION
                          </a>
                          <br />
                          <a href="#modifications">
                            16. MODIFICATIONS AND INTERRUPTIONS
                          </a>
                          <br />
                          <a href="#governing">17. GOVERNING LAW</a>
                          <br />
                          <a href="#disputeResolution">
                            18. DISPUTE RESOLUTION
                          </a>
                          <br />
                          <a href="#corrections">19. CORRECTIONS</a>
                          <br />
                          <a href="#disclaimer">20. DISCLAIMER</a>
                          <br />
                          <a href="#limitations">
                            21. LIMITATIONS OF LIABILITY
                          </a>
                          <br />
                          <a href="#indemnification">22. INDEMNIFICATION</a>
                          <br />
                          <a href="#userDate">23. USER DATA</a>
                          <br />
                          <a href="#electronicCommunications">
                            24. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                            SIGNATURES
                          </a>
                          <br />
                          <a href="#californiaUsers">
                            25. CALIFORNIA USERS AND RESIDENTS
                          </a>
                          <br />
                          <a href="#miscellaneous">26. MISCELLANEOUS</a>
                          <br />
                          <a href="#contactUs">27. CONTACT US</a>
                          <br />
                        </div>
                        <div id="AgreementToTerms" className="heading">
                          1. AGREEMENT TO TERMS
                        </div>
                        <p>
                          These Terms of Use constitute a legally binding
                          agreement made between you, whether personally or on
                          behalf of an entity (“you”) and{" "}
                          <strong>PropBlockx llc Company</strong> website a well
                          as any other media form, media channel, mobile website
                          or mobile application related, linked, or otherwise
                          connected thereto (collectively, the “Site”).
                        </p>
                        <p>
                          Supplemental terms and conditions or documents that
                          may be posted on the Site from time to time are hereby
                          expressly incorporated herein by reference. We reserve
                          the right, in our sole discretion, to make changes or
                          modifications to these Terms of Use from time to time
                          . We will alert you about any changes by updating the
                          “Last updated” date of these Terms of Use, and you
                          waive any right to receive specific notice of each
                          such change. Please ensure that you check the
                          applicable Terms every time you use our Site so that
                          you understand which Terms apply. You will be subject
                          to, and will be deemed to have been made aware of and
                          to have accepted, the changes in any revised Terms of
                          Use by your continued use of the Site after the date
                          such revised Terms of Use are posted.
                        </p>
                        <p>
                          The information provided on the Site is not intended
                          for distribution to or use by any person or entity in
                          any jurisdiction or country where such distribution or
                          use would be contrary to law or regulation or which
                          would subject us to any registration requirement
                          within such jurisdiction or country. Accordingly,
                          those persons who choose to access the Site from other
                          locations do so on their own initiative and are solely
                          responsible for compliance with local laws, if and to
                          the extent local laws are applicable.
                        </p>
                        <div id="intellectualProperty" className="heading">
                          2. INTELLECTUAL PROPERTY RIGHTS
                        </div>
                        <p>
                          Unless otherwise indicated, the Site is our
                          proprietary property and all assets code, databases,
                          functionality, software, website designs, audio,
                          video, text, photographs, and graphics on the Site
                          (collectively, the “Content”) and the trademarks,
                          service marks, and logos contained therein (the
                          “Marks”) are owned or controlled by us or licensed to
                          us, and are protected by copyright and trademark laws
                          and various other intellectual property rights and
                          unfair competition laws of the United States,
                          international copyright laws, and international
                          conventions. The Content and the Marks are provided on
                          the Site “AS IS” for your information and personal use
                          only. Except as expressly provided in these Terms of
                          Use, no part of the Site and no Content or Marks may
                          be copied, reproduced, aggregated, republished,
                          uploaded, posted, publicly displayed, encoded,
                          translated, transmitted, distributed, sold, licensed,
                          or otherwise exploited for any commercial purpose
                          whatsoever, without our express prior written
                          permission.
                        </p>
                        <p>
                          Provided that you are eligible to use the Site, you
                          are granted a limited license to access and use the
                          Site and to download or print a copy of any portion of
                          the Content to which you have properly gained access
                          solely for your personal, non-commercial use. We
                          reserve all rights not expressly granted to you in and
                          to the Site, the Content and the Marks.
                        </p>
                        <div id="userRepresentaions" className="heading">
                          3. USER REPRESENTATIONS
                        </div>
                        <p>
                          By using the Site, you represent and warrant that: (1)
                          all registration information you submit will be true,
                          accurate, current, and complete; (2) you will maintain
                          the accuracy of such information and promptly update
                          such registration information as necessary (3) you
                          have the legal capacity and you agree to comply with
                          these Terms of Use; (4) you are not a minor in the
                          jurisdiction in which you reside (5) you will not
                          access the Site through automated or non-human means,
                          whether through a bot, script, or otherwise; (6) you
                          will not use the Site for any illegal or unauthorized
                          purpose; and (7) your use of the Site will not violate
                          any applicable law or regulation.
                        </p>
                        <p>
                          If you provide any information that is untrue,
                          inaccurate, not current, or incomplete, we have the
                          right to suspend or terminate your account and refuse
                          any and all current or future use of the Site (or any
                          portion thereof).
                        </p>
                        <div id="userRegistration" className="heading">
                          4. USER REGISTRATION
                        </div>
                        <p>
                          You may be required to register with the Site. You
                          agree to keep your password confidential and will be
                          responsible for all use of your account and password.
                          We reserve the right to remove, reclaim, or change a
                          username you select if we determine, in our sole
                          discretion, that such username is inappropriate,
                          obscene, or otherwise objectionable.
                        </p>
                        <div id="prohibitedActivites" className="heading">
                          5. PROHIBITED ACTIVITIES
                        </div>
                        <p>
                          You may not access or use the Site for any purpose
                          other than that for which we make the Site available.
                          The Site may not be used in connection with any
                          commercial endeavors except those that are
                          specifically endorsed or approved by us.
                        </p>
                        <p>As a user of the Site, you agree not to:</p>
                        <ul className="terms">
                          <li>
                            Systematically retrieve data or other content from
                            the Site to create or compile, directly or
                            indirectly, a collection, compilation, database, or
                            directory without written permission from us.
                          </li>
                          <li>
                            Trick, defraud, or mislead us and other users,
                            especially in any attempt to learn sensitive account
                            information such as user passwords.
                          </li>
                          <li>
                            Circumvent, disable, or otherwise interfere with
                            security-related features of the Site, including
                            features that prevent or restrict the use or copying
                            of any Content or enforce limitations on the use of
                            the Site and/or the Content contained therein.
                          </li>
                          <li>
                            Disparage, tarnish, or otherwise harm, in our
                            opinion, us and/or the Site.
                          </li>
                          <li>
                            Use any information obtained from the Site in order
                            to harass, abuse, or harm another person.
                          </li>
                          <li>
                            Make improper use of our support services or submit
                            false reports of abuse or misconduct.
                          </li>
                          <li>
                            Use the Site in a manner inconsistent with any
                            applicable laws or regulations.
                          </li>
                          <li>
                            Engage in unauthorized framing of or linking to the
                            Site.
                          </li>
                          <li>
                            Upload or transmit (or attempt to upload or to
                            transmit) viruses, Trojan horses, or other material,
                            including excessive use of capital letters and
                            spamming (continuous posting of repetitive text),
                            that interferes with any party's uninterrupted use
                            and enjoyment of the Site or modifies, impairs,
                            disrupts, alters, or interferes with the use,
                            features, functions, operation, or maintenance of
                            the Site.
                          </li>
                          <li>
                            Engage in any automated use of the system, such as
                            using scripts to send comments or messages, or using
                            any data mining, robots, or similar data gathering
                            and extraction tools.
                          </li>
                          <li>
                            Delete the copyright or other proprietary rights
                            notice from any Content.
                          </li>
                          <li>
                            Attempt to impersonate another user or person or use
                            the username of another user.
                          </li>
                          <li>
                            Upload or transmit (or attempt to upload or to
                            transmit) any material that acts as a passive or
                            active information collection or transmission
                            mechanism, including without limitation, clear
                            graphics interchange formats ("gifs"), 1x1 pixels,
                            web bugs, cookies, or other similar devices
                            (sometimes referred to as "spyware" or "passive
                            collection mechanisms" or "pcms").
                          </li>
                        </ul>
                        <div id="usergenerated" className="heading">
                          6. USER GENERATED CONTRIBUTIONS
                        </div>
                        <p>
                          The Site may invite you to chat, contribute to, or
                          participate in blogs, message boards, online forums,
                          and other functionality, and may provide you with the
                          opportunity to create, submit, post, display,
                          transmit, perform, publish, distribute, or broadcast
                          content and materials to us or on the Site, including
                          but not limited to text, writings, video, audio,
                          photographs, graphics, comments, suggestions, or
                          personal information or other material (collectively,
                          "Contributions"). Contributions may be viewable by
                          other users of the Site and through third-party
                          websites. As such, any Contributions you transmit may
                          be treated as non-confidential and non-proprietary.
                          When you create or make available any Contributions,
                          you thereby represent and warrant that:
                        </p>
                        <ul className="terms">
                          <li>
                            The creation, distribution, transmission, public
                            display, or performance, and the accessing,
                            downloading, or copying of your Contributions do not
                            and will not infringe the proprietary rights,
                            including but not limited to the copyright, patent,
                            trademark, trade secret, or moral rights of any
                            third party.
                          </li>
                          <li>
                            You are the creator and owner of or have the
                            necessary licenses, rights, consents, releases, and
                            permissions to use and to authorize us, the Site,
                            and other users of the Site to use your
                            Contributions in any manner contemplated by the Site
                            and these Terms of Use.
                          </li>
                          <li>
                            You have the written consent, release, and/or
                            permission of each and every identifiable individual
                            person in your Contributions to use the name or
                            likeness of each and every such identifiable
                            individual person to enable inclusion and use of
                            your Contributions in any manner contemplated by the
                            Site and these Terms of Use.
                          </li>
                          <li>
                            Your Contributions are not false, inaccurate, or
                            misleading.
                          </li>
                          <li>
                            Your Contributions are not unsolicited or
                            unauthorized advertising, promotional materials,
                            pyramid schemes, chain letters, spam, mass mailings,
                            or other forms of solicitation.
                          </li>
                          <li>
                            Your Contributions are not obscene, lewd,
                            lascivious, filthy, violent, harassing, libelous,
                            slanderous, or otherwise objectionable (as
                            determined by us).
                          </li>
                          <li>
                            Your Contributions do not ridicule, mock, disparage,
                            intimidate, or abuse anyone.
                          </li>
                        </ul>
                        <div id="contributionLicense" className="heading">
                          7. CONTRIBUTION LICENSE
                        </div>
                        <p>
                          By posting your Contributions to any part of the Site
                          or making Contributions accessible to the Site by
                          linking your account from the Site to any of your
                          social networking accounts, you automatically grant,
                          and you represent and warrant that you have the right
                          to grant, to us an unrestricted, unlimited,
                          irrevocable, perpetual, non-exclusive, transferable,
                          royalty-free, fully-paid, worldwide right, and license
                          to host, use, copy, reproduce, disclose, sell, resell,
                          publish, broadcast, retitle, archive, store, cache,
                          publicly perform, publicly display, reformat,
                          translate, transmit, excerpt (in whole or in part),
                          and distribute such Contributions (including, without
                          limitation, your image and voice) for any purpose,
                          commercial, advertising, or otherwise, and to prepare
                          derivative works of, or incorporate into other works,
                          such Contributions, and grant and authorize
                          sublicenses of the foregoing. The use and distribution
                          may occur in any media formats and through any media
                          channels.
                        </p>
                        <p>
                          This license will apply to any form, media, or
                          technology now known or hereafter developed, and
                          includes our use of your name, company name, and
                          franchise name, as applicable, and any of the
                          trademarks, service marks, trade names, logos, and
                          personal and commercial images you provide. You waive
                          all moral rights in your Contributions, and you
                          warrant that moral rights have not otherwise been
                          asserted in your Contributions.
                        </p>
                        <p>
                          We do not assert any ownership over your
                          Contributions. You retain full ownership of all of
                          your Contributions and any intellectual property
                          rights or other proprietary rights associated with
                          your Contributions. We are not liable for any
                          statements or representations in your Contributions
                          provided by you in any area on the Site. You are
                          solely responsible for your Contributions to the Site
                          and you expressly agree to exonerate us from any and
                          all responsibility and to refrain from any legal
                          action against us regarding your Contributions.
                        </p>
                        <p>
                          We have the right, in our sole and absolute
                          discretion, (1) to edit, redact, or otherwise change
                          any Contributions; (2) to re-categorize any
                          Contributions to place them in more appropriate
                          locations on the Site; and (3) to pre-screen or delete
                          any Contributions at any time and for any reason,
                          without notice. We have no obligation to monitor your
                          Contributions.
                        </p>
                        <div id="guidelines" className="heading">
                          8. GUIDELINES FOR REVIEWS
                        </div>
                        <p>
                          We may provide you areas on the Site to leave reviews
                          or ratings. When posting a review, you must comply
                          with the following criteria: (1) you should have
                          firsthand experience with the person/entity being
                          reviewed; (2) your reviews should not contain
                          offensive profanity, or abusive, racist, offensive, or
                          hate language; (3) your reviews should not contain
                          discriminatory references based on religion, race,
                          gender, national origin, age, marital status, sexual
                          orientation, or disability; (4) your reviews should
                          not contain references to illegal activity; (5) you
                          should not be affiliated with competitors if posting
                          negative reviews; (6) you should not make any
                          conclusions as to the legality of conduct; (7) you may
                          not post any false or misleading statements; and (8)
                          you may not organize a campaign encouraging others to
                          post reviews, whether positive or negative.
                        </p>
                        <p>
                          We may accept, reject, or remove reviews in our sole
                          discretion. We have absolutely no obligation to screen
                          reviews or to delete reviews, even if anyone considers
                          reviews objectionable or inaccurate. Reviews are not
                          endorsed by us, and do not necessarily represent our
                          opinions or the views of any of our affiliates or
                          partners. We do not assume liability for any review or
                          for any claims, liabilities, or losses resulting from
                          any review. By posting a review, you hereby grant to
                          us a perpetual, non-exclusive, worldwide,
                          royalty-free, fully-paid, assignable, and
                          sublicensable right and license to reproduce, modify,
                          translate, transmit by any means, display, perform,
                          and/or distribute all content relating to reviews.
                        </p>
                        <div id="socialMedia" className="heading">
                          9. SOCIAL MEDIA
                        </div>
                        <p>
                          As part of the functionality of the Site, you may link
                          your account with online accounts you have with
                          third-party service providers (each such account, a
                          "Third-Party Account") by either: (1) providing your
                          Third-Party Account login information through the
                          Site; or (2) allowing us to access your Third-Party
                          Account, as is permitted under the applicable terms
                          and conditions that govern your use of each
                          Third-Party Account. You represent and warrant that
                          you are entitled to disclose your Third-Party Account
                          login information to us and/or grant us access to your
                          Third-Party Account, without breach by you of any of
                          the terms and conditions that govern your use of the
                          applicable Third-Party Account, and without obligating
                          us to pay any fees or making us subject to any usage
                          limitations imposed by the third-party service
                          provider of the Third-Party Account. By granting us
                          access to any Third-Party Accounts, you understand
                          that (1) we may access, make available, and store (if
                          applicable) any content that you have provided to and
                          stored in your Third-Party Account (the "Social
                          Network Content") so that it is available on and
                          through the Site via your account, including without
                          limitation any friend lists and (2) we may submit to
                          and receive from your Third-Party Account additional
                          information to the extent you are notified when you
                          link your account with the Third-Party Account.
                          Depending on the Third- Party Accounts you choose and
                          subject to the privacy settings that you have set in
                          such Third-Party Accounts, personally identifiable
                          information that you post to your Third-Party Accounts
                          may be available on and through your account on the
                          Site. Please note that if a Third-Party Account or
                          associated service becomes unavailable or our access
                          to such Third Party Account is terminated by the
                          third-party service provider, then Social Network
                          Content may no longer be available on and through the
                          Site. You will have the ability to disable the
                          connection between your account on the Site and your
                          Third-Party Accounts at any time. PLEASE NOTE THAT
                          YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE
                          PROVIDERS ASSOCIATED WITH YOUR THIRD- PARTY ACCOUNTS
                          IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH
                          THIRD-PARTY SERVICE PROVIDERS. We make no effort to
                          review any Social Network Content for any purpose,
                          including but not limited to, for accuracy, legality,
                          or non-infringement, and we are not responsible for
                          any Social Network Content. You acknowledge and agree
                          that we may access your email address book associated
                          with a Third- Party Account and your contacts list
                          stored on your mobile device or tablet computer solely
                          for purposes of identifying and informing you of those
                          contacts who have also registered to use the Site. You
                          can deactivate the connection between the Site and
                          your Third-Party Account by contacting us using the
                          contact information below or through your account
                          settings (if applicable). We will attempt to delete
                          any information stored on our servers that was
                          obtained through such Third-Party Account, except the
                          username and profile picture that become associated
                          with your account.
                        </p>
                        <div id="submissions" className="heading">
                          10. SUBMISSIONS
                        </div>
                        <p>
                          You acknowledge and agree that any questions,
                          comments, suggestions, ideas, feedback, or other
                          information regarding the Site ("Submissions")
                          provided by you to us are non-confidential and shall
                          become our sole property. We shall own exclusive
                          rights, including all intellectual property rights,
                          and shall be entitled to the unrestricted use and
                          dissemination of these Submissions for any lawful
                          purpose, commercial or otherwise, without
                          acknowledgment or compensation to you. You hereby
                          waive all moral rights to any such Submissions, and
                          you hereby warrant that any such Submissions are
                          original with you or that you have the right to submit
                          such Submissions. You agree there shall be no recourse
                          against us for any alleged or actual infringement or
                          misappropriation of any proprietary right in your
                          Submissions.
                        </p>
                        <div id="thirdParty" className="heading">
                          11. THIRD-PARTY WEBSITE AND CONTENT
                        </div>
                        <p>
                          The Site may contain (or you may be sent via the Site)
                          links to other websites ("Third-Party Websites") as
                          well as articles, photographs, text, graphics,
                          pictures, designs, music, sound, video, information,
                          applications, software, and other content or items
                          belonging to or originating from third parties
                          ("Third-Party Content"). Such Third-Party Websites and
                          Third-Party Content are not investigated, monitored,
                          or checked for accuracy, appropriateness, or
                          completeness by us, and we are not responsible for any
                          Third-Party Websites accessed through the Site or any
                          Third-Party Content posted on, available through, or
                          installed from the Site, including the content,
                          accuracy, offensiveness, opinions, reliability,
                          privacy practices, or other policies of or contained
                          in the Third-Party Websites or the Third-Party
                          Content. Inclusion of, linking to, or permitting the
                          use or installation of any Third-Party Websites or any
                          Third-Party Content does not imply approval or
                          endorsement thereof by us. If you decide to leave the
                          Site and access the Third-Party Websites or to use or
                          install any Third-Party Content, you do so at your own
                          risk, and you should be aware these Terms of Use no
                          longer govern. You should review the applicable terms
                          and policies, including privacy and data gathering
                          practices, of any website to which you navigate from
                          the Site or relating to any applications you use or
                          install from the Site. Any purchases you make through
                          Third-Party Websites will be through other websites
                          and from other companies, and we take no
                          responsibility whatsoever in relation to such
                          purchases which are exclusively between you and the
                          applicable third party. You agree and acknowledge that
                          we do not endorse the products or services offered on
                          Third-Party Websites and you shall hold us harmless
                          from any harm caused by your purchase of such products
                          or services. Additionally, you shall hold us harmless
                          from any losses sustained by you or harm caused to you
                          relating to or resulting in any way from any
                          Third-Party Content or any contact with Third-Party
                          Websites
                        </p>
                        <div id="advertisers" className="heading">
                          12. ADVERTISERS
                        </div>
                        <p>
                          We allow advertisers to display their advertisements
                          and other information in certain areas of the Site,
                          such as sidebar advertisements or banner
                          advertisements. If you are an advertiser, you shall
                          take full responsibility for any advertisements you
                          place on the Site and any services provided on the
                          Site or products sold through those advertisements.
                          Further, as an advertiser, you warrant and represent
                          that you possess all rights and authority to place
                          advertisements on the Site, including, but not limited
                          to, intellectual property rights, publicity rights,
                          and contractual rights. We simply provide the space to
                          place such advertisements, and we have no other
                          relationship with advertisers.
                        </p>
                        <div id="siteManagement" className="heading">
                          13. SITE MANAGEMENT
                        </div>
                        <p>
                          We reserve the right, but not the obligation, to: (1)
                          monitor the Site for violations of these Terms of Use;
                          (2) take appropriate legal action against anyone who,
                          in our sole discretion, violates the law or these
                          Terms of Use, including without limitation, reporting
                          such user to law enforcement authorities; (3) in our
                          sole discretion and without limitation, refuse,
                          restrict access to, limit the availability of, or
                          disable (to the extent technologically feasible) any
                          of your Contributions or any portion thereof; (4) in
                          our sole discretion and without limitation, notice, or
                          liability, to remove from the Site or otherwise
                          disable all files and content that are excessive in
                          size or are in any way burdensome to our systems; and
                          (5) otherwise manage the Site in a manner designed to
                          protect our rights and property and to facilitate the
                          proper functioning of the Site.
                        </p>
                        <div id="privacyPolicy">14. PRIVACY POLICY</div>
                        <p>
                          We care about data privacy and security. By using the
                          Site, you agree to be bound by our Privacy Policy
                          posted on the Site, which is incorporated into these
                          Terms of Use. Please be advised the Site is hosted in
                          the United Arab Emirates. If you access the Site from
                          any other region of the world with laws or other
                          requirements governing personal data collection, use,
                          or disclosure that differ from applicable laws in the
                          United Arab Emirates, then through your continued use
                          of the Site, you are transferring your data to the
                          United Arab Emirates, and you agree to have your data
                          transferred to and processed in the United Arab
                          Emirates.
                        </p>
                        <div id="termAndTermination" className="heading">
                          15. TERM AND TERMINATION
                        </div>
                        <p>
                          These Terms of Use shall remain in full force and
                          effect while you use the Site. WITHOUT LIMITING ANY
                          OTHER PROVISION OF THESE TERMS OF USE, WE RESERVE THE
                          RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR
                          LIABILITY, DENY ACCESS TO AND USE OF THE SITE
                          (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY
                          PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                          WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
                          WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF USE
                          OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY
                          TERMINATE YOUR USE OR PARTICIPATION IN THE SITE OR
                          DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION
                          THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
                          SOLE DISCRETION.
                        </p>
                        <p>
                          If we terminate or suspend your account for any
                          reason, you are prohibited from registering and
                          creating a new account under your name, a fake or
                          borrowed name, or the name of any third party, even if
                          you may be acting on behalf of the third party. In
                          addition to terminating or suspending your account, we
                          reserve the right to take appropriate legal action,
                          including without limitation pursuing civil, criminal,
                          and injunctive redress.
                        </p>
                        <div id="modifications" className="heading">
                          16. MODIFICATIONS AND INTERRUPTIONS
                        </div>
                        <p>
                          We reserve the right to change, modify, or remove the
                          contents of the Site at any time or for any reason at
                          our sole discretion without notice. However, we have
                          no obligation to update any information on our Site.
                          We also reserve the right to modify or discontinue all
                          or part of the Site without notice at any time. We
                          will not be liable to you or any third party for any
                          modification, price change, suspension, or
                          discontinuance of the Site.
                        </p>
                        <p>
                          We cannot guarantee the Site will be available at all
                          times. We may experience hardware, software, or other
                          problems or need to perform maintenance related to the
                          Site, resulting in interruptions, delays, or errors.
                          We reserve the right to change, revise, update,
                          suspend, discontinue, or otherwise modify the Site at
                          any time or for any reason without notice to you. You
                          agree that we have no liability whatsoever for any
                          loss, damage, or inconvenience caused by your
                          inability to access or use the Site during any
                          downtime or discontinuance of the Site. Nothing in
                          these Terms of Use will be construed to obligate us to
                          maintain and support the Site or to supply any
                          corrections, updates, or releases in connection
                          therewith.
                        </p>
                        <div id="governing" className="heading">
                          17. GOVERNING LAW
                        </div>
                        <p>
                          These Terms shall be governed by and defined following
                          the laws of the United Arab Emirates. PropBlockx lIc
                          and yourself irrevocably consent that the courts of
                          the United Arab Emirates shall have exclusive
                          jurisdiction to resolve any dispute which may arise in
                          connection with these terms.
                        </p>
                        <div id="disputeResolution">18. DISPUTE RESOLUTION</div>
                        <p>
                          You agree to irrevocably submit all disputes related
                          to Terms or the relationship established by this
                          Agreement to the jurisdiction of the United Arab
                          Emirates courts. PropBlockx Ilc shall also maintain
                          the right to bring proceedings as to the substance of
                          the matter in the courts of the country where you
                          reside or, if these Terms are entered into in the
                          course of your trade or profession, the state of your
                          principal place of business.
                        </p>
                        <div id="corrections" className="heading">
                          {" "}
                          19. CORRECTIONS{" "}
                        </div>
                        <p>
                          There may be information on the Site that contains
                          typographical errors, inaccuracies, or omissions,
                          including descriptions, pricing, availability, and
                          various other information. We reserve the right to
                          correct any errors, inaccuracies, or omissions and to
                          change or update the information on the Site at any
                          time, without prior notice.
                        </p>
                        <div id="disclaimer" className="heading">
                          20. DISCLAIMER
                        </div>
                        <p>
                          THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE
                          BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR
                          SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST
                          EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES,
                          EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND
                          YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE
                          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                          PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
                          WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                          COMPLETENESS OF THE SITE'S CONTENT OR THE CONTENT OF
                          ANY WEBSITES LINKED TO THE SITE AND WE WILL ASSUME NO
                          LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
                          MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS,
                          (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE
                          WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF
                          THE SITE, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
                          SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION
                          AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY
                          INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM
                          THE SITE, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE
                          LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SITE
                          BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS
                          IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE
                          OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY
                          CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE
                          AVAILABLE VIA THE SITE. WE DO NOT WARRANT, ENDORSE,
                          GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR
                          SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH
                          THE SITE, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR
                          MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
                          ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY
                          WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION
                          BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS
                          OR SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR
                          SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT. YOU
                          SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION
                          WHERE APPROPRIATE
                        </p>
                        <div id="limitations" className="heading">
                          21. LIMITATIONS OF LIABILITY
                        </div>
                        <p>
                          IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR
                          AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
                          DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY,
                          INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING
                          LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER
                          DAMAGES ARISING FROM YOUR USE OF THE SITE. EVEN IF WE
                          HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                          NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
                          HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER
                          AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
                          TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO
                          US. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO
                          NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE
                          EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE
                          LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
                          DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND
                          YOU MAY HAVE ADDITIONAL RIGHTS.
                        </p>
                        <div id="indemnification" className="heading">
                          22. INDEMNIFICATION
                        </div>
                        <p>
                          You agree to defend, indemnify, and hold us harmless,
                          including our subsidiaries, affiliates, and all of our
                          respective officers, agents, partners, and employees,
                          from and against any loss, damage, liability, claim,
                          or demand, including reasonable attorneys' fees and
                          expenses, made by any third party due to or arising
                          out of: (1) your Contributions; (2) use of the Site;
                          (3) breach of these Terms of Use; (4) any breach of
                          your representations and warranties set forth in these
                          Terms of Use; (5) your violation of the rights of a
                          third party, including but not limited to intellectual
                          property rights; or (6) any overt harmful act toward
                          any other user of the Site with whom you connected via
                          the Site. Notwithstanding the foregoing, we reserve
                          the right, at your expense, to assume the exclusive
                          defense and control of any matter for which you are
                          required to indemnify us, and you agree to cooperate,
                          at your expense, with our defense of such claims. We
                          will use reasonable efforts to notify you of any such
                          claim, action, or proceeding which is subject to this
                          indemnification upon becoming aware of it.
                        </p>
                        <div id="userDate" className="heading">
                          23. USER DATA{" "}
                        </div>
                        <p>
                          We will maintain certain data that you transmit to the
                          Site for the purpose of managing the performance of
                          the Site, as well as data relating to your use of the
                          Site. Although we perform regular routine backups of
                          data, you are solely responsible for all data that you
                          transmit or that relates to any activity you have
                          undertaken using the Site. You agree that we shall
                          have no liability to you for any loss or corruption of
                          any such data, and you hereby waive any right of
                          action against us arising from any such loss or
                          corruption of such data.
                        </p>
                        <div id="electronicCommunications" className="heading">
                          24. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                          SIGNATURES
                        </div>
                        <p>
                          Visiting the Site, sending us emails, and completing
                          online forms constitute electronic communications. You
                          consent to receive electronic communications, and you
                          agree that all agreements, notices, disclosures, and
                          other communications we provide to you electronically,
                          via email and on the Site, satisfy any legal
                          requirement that such communication be in writing. YOU
                          HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                          CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO
                          ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS
                          OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA
                          THE SITE. You hereby waive any rights or requirements
                          under any statutes, regulations, rules, ordinances, or
                          other laws in any jurisdiction which require an
                          original signature or delivery or retention of
                          non-electronic records, or to payments or the granting
                          of credits by any means other than electronic means.
                        </p>
                        <div id="californiaUsers" className="heading">
                          25. CALIFORNIA USERS AND RESIDENTS
                        </div>
                        <p>
                          If any complaint with us is not satisfactorily
                          resolved, you can contact the Complaint Assistance
                          Unit of the Division of Consumer Services of the
                          California Department of Consumer Affairs in writing
                          at 1625 North Market Blvd., Suite N 112, Sacramento,
                          California 95834 or by telephone at (800) 952-5210 or
                          (916) 445-1254.
                        </p>
                        <div id="miscellaneous" className="heading">
                          {" "}
                          26. MISCELLANEOUS
                        </div>
                        <p>
                          These Terms of Use and any policies or operating rules
                          posted by us on the Site or in respect to the Site
                          constitute the entire agreement and understanding
                          between you and us. Our failure to exercise or enforce
                          any right or provision of these Terms of Use shall not
                          operate as a waiver of such right or provision. These
                          Terms of Use operate to the fullest extent permissible
                          by law. We may assign any or all of our rights and
                          obligations to others at any time. We shall not be
                          responsible or liable for any loss, damage, delay, or
                          failure to act caused by any cause beyond our
                          reasonable control. If any provision or part of a
                          provision of these Terms of Use is determined to be
                          unlawful, void, or unenforceable, that provision or
                          part of the provision is deemed severable from these
                          Terms of Use and does not affect the validity and
                          enforceability of any remaining provisions. There is
                          no joint venture, partnership, employment or agency
                          relationship created between you and us as a result of
                          these Terms of Use or use of the Site. You agree that
                          these Terms of Use will not be construed against us by
                          virtue of having drafted them. You hereby waive any
                          and all defenses you may have based on the electronic
                          form of these Terms of Use and the lack of signing by
                          the parties hereto to execute these Terms of Use.
                        </p>
                        <div id="contactUs" className="heading">
                          27. CONTACT US
                        </div>
                        <p>
                          In order to resolve a complaint regarding the Site or
                          to receive further information regarding use of the
                          Site, please contact us at:
                        </p>
                        <p>
                          <strong>PropBlockx LLC</strong> <br />
                          <strong>Dubai</strong>
                          <br />
                          <strong>United Arab Emirates </strong>
                        </p>
                      </div>
                      <div>
                        <div className="checkBoxDiv">
                          <input
                            type="checkbox"
                            name="termsCheckBox"
                            id="termsCheckBox"
                            onClick={(e) => setTermsAccepted(e.target.checked)}
                          />
                          <p>
                            I have read and agree to the terms and conditions of
                            PropBlock.
                          </p>
                        </div>
                      </div>
                      <div className="termsSectionBottom">
                        {!isRegistering ? (
                          <Button
                            onClick={async () => {
                              await SignUpUser();
                            }}
                            text="Create Account"
                            theme="colored"
                            color="blue"
                            size="large"
                            isFullWidth="true"
                            disabled={!termsAccepted}
                            className="SignUpButton"
                            style={{
                              width: "35%",
                            }}
                          />
                        ) : (
                          <Button
                            text="Creating account..."
                            theme="colored"
                            color="blue"
                            size="large"
                            isFullWidth="true"
                            disabled={true}
                            className="SignUpButton"
                            style={{
                              width: "35%",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  ),
                  title: "",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
