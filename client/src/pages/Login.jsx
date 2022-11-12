import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Link, Navigate } from "react-router-dom";
import { message, Alert } from "antd";
import "../styling/Login/Login.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
  const [userAddress, setUserAddress] = useState("");
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


  // checks if the user with the address exists already in the db
  const checkUserExists = async (address) => {
    try {
      const userEmails = Moralis.Object.extend("usersSignedUp");
      const query = new Moralis.Query(userEmails);
      query.equalTo("address", address.toLowerCase());
      const results = await query.find();
      return results.length != 0;
    } catch (error) {
      message.error("Error: " + error);
    }
  };


  // logs the user in using the email & address
  const loginUser = async () => {
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
        let user = Moralis.User.current();
        if (!user) {
          if (!isAuthenticated) {
            await authenticate()
              .then(function (user) {
                loggedin();
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        } else {
          console.log("logged in user: " + user);
        }
      }
    }
    catch (error) {
      message.error(error);
    }
  };


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

  let navigate = useNavigate();
  const loggedin = async () => {
    message.success("Login successful. Redirecting to home page.");
    await sleep(2500);
    navigate("/");
  }

  return (
    <div>
      <Navbar />
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
                loginUser();
              }}
              disabled={isAuthenticating}
              className="loginButton"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login2;
