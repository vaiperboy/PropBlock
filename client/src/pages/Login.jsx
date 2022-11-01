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
import loginSvg from "../assets/login-image-min.png";
import metamask from "../assets/icons8-metamask-logo-96-min.png";

const console = require("console-browserify");
const { ethers } = require("ethers");
const { ethereum } = window;

// main function
const Login2 = () => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      const userEmails = Moralis.Object.extend("UserEmails");
      const query = new Moralis.Query(userEmails);
      query.equalTo("address", address.toLowerCase());
      const results = await query.find();
      if (results.length === 0) {
        return false;
      } else {
        return true;
      }
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
      if (!isAuthenticated) {
        message.error(
          "Wallet is not connected! Please connect the wallet to login."
        );
        return;
        // wallet is connected
      } else {
        const currentUser = Moralis.User.current();
        const userExists = await checkUserExists(currentUser.get("ethAddress"));
        if (!userExists) {
          message.error(
            "Invalid email or wrong wallet address connected! \nPlease connect a wallet that is signed up. "
          );
          return;
        } else {
          message.success("User is successfully logged In!");
          setIsLoggedIn(true);
          await sleep(2500);
          await nav("/");
        }
      }
    } catch (error) {
      message.error("Error " + error.code + ": ", error.message);
    }
  };

  // connect the metamask wallet
  const connectWallet = async () => {
    try {
      if (!isAuthenticated) {
        await authenticate().then(function (user) {});
      }
    } catch (error) {
      message.error(error);
    }
  };

  // disconnects the metamask wallet
  const disconnectWallet = async () => {
    try {
      const loggedout = await logout();
      if (loggedout) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      message.error("Error " + error.code + ": ", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="loginPage">
        <div className="leftSide">
          <div className="illustrationDiv">
            <img src={loginSvg} alt="man illustration" />
          </div>
        </div>
        <div className="rightSide">
          <div></div>
          <h1>Glad to see you back!</h1>
          <div className="loginSection">
            <p>Connect your wallet to login</p>
            {!false ? (
              <button className="connectWalletButton" onClick={connectWallet}>
                <span className="text">Connect Wallet</span>{" "}
                <img src={metamask} alt="metamask icon" />
              </button>
            ) : (
              <button
                className="disconnectWalletButton"
                onClick={() => {
                  disconnectWallet();
                }}
              >
                <span className="text">Disconnect Wallet</span>
              </button>
            )}
            <div className="linkToSignUpPage">
              Don't have an account?{" "}
              <Link to="/signup2" className="signupText">
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
