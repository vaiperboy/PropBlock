import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { Form, Button, Input, Dropdown, Typography } from "@web3uikit/core";
import { ConnectButton } from "@web3uikit/web3";
import { AddUser } from "@web3uikit/icons";
import { message, Alert } from "antd";
import "../styling/Login/Login.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// -----------------
// importing images
import login_illustration from "../assets/login_illustration.png";
import login_svg from "../assets/login-image-min.png";
import metamask from "../assets/icons8-metamask-logo-96-min.png";
import MoralisType from "moralis-v1";

const console = require("console-browserify");
const { ethers } = require("ethers");
const { ethereum } = window;

// main function
const Login2 = () => {
  const [email, setEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const nav = useNavigate();
  const {
    Moralis,
    authenticated,
    auth,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    isUnauthenticated,
    user,
    account,
    isloggedOut,
    login,
    logout,
    oralis,
    isInitialized,
    ...rest
  } = useMoralis();
  let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  // validates the email entered
  const validateEmail = (email) => {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (validRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  };

  // checks if the user with the address exists already in the db
  const checkUserExists = async (address) => {
    try {
      const userEmails = Moralis.Object.extend("usersSignedUp");
      const query = new Moralis.Query(userEmails);
      query.equalTo("address", address);
      const results = await query.find();
      return results.length != 0;
    } catch (error) {
      message.error("Error: " + error);
    }
  };


  // logs the user in using the email & address
  const loginUser = async (email) => {
    try {
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }

      // wallet is connected
      // const currentUser = Moralis.User.current();
      // const userExists = await checkUserExists(currentUser.get("ethAddress"));
      console.log("useraddress: ", userAddress);
      const userExists = await checkUserExists(userAddress);
      if (!userExists) {
        message.error(
          "Invalid wallet connected! \nPlease connect a wallet that is signed up. "
        );
        return;
      } else {
        let value = await authenticate();
        if (value === undefined) {
          message.error("Wallet signature rejected!");
          return;
        } else {
          message.success("User is successfully logged In!");
          setIsLoggedIn(true);
        }
        await sleep(2500);
        await nav("/");
      }
    } catch (error) {
      message.error("Error " + error.code + ": ", error.message);
    }
  };

  // connect the metamask wallet
  // const connectWallet = async () => {
  //   try {
  //     if (!isAuthenticated) {
  //       await authenticate().then(function (user) {});
  //     }
  //   } catch (error) {
  //     message.error(error);
  //   }
  // };

  const connectWallet = async () => {
    try {
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      // console.log("Account:", await signer.getAddress());
      setUserAddress(await signer.getAddress());
      setWalletConnected(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const checkWalletConnected = async () => {
    var provider = new ethers.providers.Web3Provider(ethereum);
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  };

  // disconnects the metamask wallet
  // const disconnectWallet = async () => {
  //   try {
  //     await checkWalletConnected().then((connected) => {
  //       if (connected) {

  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error: ", error);
  //   }
  // };

  // const disconnectWallet = async () => {
  //   try {
  //     const loggedout = await logout();
  //     if (loggedout) {
  //       setIsLoggedIn(true);
  //     }
  //   } catch (error) {
  //     message.error("Error " + error.code + ": ", error.message);
  //   }
  // };

  return (
    <div>
      <Navbar signedIn2={isAuthenticated} />
      <div className="loginPage">
        <div className="leftSide">
          <div className="illustrationDiv">
            <img src={login_illustration} alt="man illustration" />
          </div>
        </div>
        <div className="rightSide">
          <div></div>
          <h1>Glad to see you back!</h1>
          <div className="loginSection">
            <p>Connect your wallet to login</p>
            {!walletConnected ? (
              <button className="connectWalletButton" onClick={connectWallet}>
                <span className="text">Connect Wallet</span>{" "}
                <img src={metamask} alt="metamask icon" />
              </button>
            ) : (
              <button
                className="disconnectWalletButton"
                onClick={() => {
                  // disconnectWallet();
                }}
              >
                <span className="text">Wallet Connected</span>
              </button>
            )}
            <div className="linkToSignUpPage">
              Don't have an account?{" "}
              <Link to="/signup" className="signupText">
                Sign Up
              </Link>{" "}
              instead.
            </div>
            <button
              onClick={() => {
                loginUser(email);
              }}
              disabled={isAuthenticating}
              className="loginButton"
            >
              Login
            </button>
            {isLoggedIn && (
              <Alert
                message="Login successful. Redirecting to home page."
                type="success"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login2;
