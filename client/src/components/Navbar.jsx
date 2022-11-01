import React, { useState, useEffect } from "react";
import "../styling/Navbar/Navbar.scss";
import { Link } from "react-router-dom";
import { Avatar } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import NavbarIcon from "../assets/framer-1.png";

const console = require("console-browserify");

const Navbar = () => {
  const [signedIn, setSignedIn] = useState(true);
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      {signedIn ? (
        <div className="Navbar">
          <div className="leftSide">
            <img src={NavbarIcon} alt="NavbarIcon" />
            <Link to="/" className="homeLink">
              <h2>PropBlockx</h2>
            </Link>
          </div>
          <div className="rightSide">
            <nav>
              {window.location.pathname === "/properties" ? (
                <Link to="/properties" className="link">
                  <div className="current">Properties</div>
                </Link>
              ) : (
                <Link to="/properties" className="link">
                  <div>Properties</div>
                </Link>
              )}
              {window.location.pathname === "/buy" ? (
                <Link to="/buy" className="link">
                  <div className="current">Buy</div>
                </Link>
              ) : (
                <Link to="/buy" className="link">
                  <div>Buy</div>
                </Link>
              )}
              {window.location.pathname === "/rent" ? (
                <Link to="" className="linkDisabled">
                  <div className="disabled">Rent</div>
                </Link>
              ) : (
                <Link to="" className="linkDisabled">
                  <div className="disabled">Rent</div>
                </Link>
              )}
              {window.location.pathname === "/aboutus" ? (
                <Link to="/aboutus" className="link">
                  <div className="current">About Us</div>
                </Link>
              ) : (
                <Link to="/aboutus" className="link">
                  <div>About Us</div>
                </Link>
              )}
              <Link to="/dashboard">
                <Avatar
                  isRounded
                  theme="image"
                  className="avatar"
                />
              </Link>

            </nav>
          </div>
        </div>
      ) : (
        <div className="Navbar">
          <div className="leftSide">
            <img src={NavbarIcon} alt="NavbarIcon" />
            <Link to="/" className="homeLink">
              <h2>PropBlockX</h2>
            </Link>
          </div>
          <div className="rightSide">
            <nav>
              {window.location.pathname === "/properties" ? (
                <Link to="/properties" className="link">
                  <div className="current">Properties</div>
                </Link>
              ) : (
                <Link to="/properties" className="link">
                  <div>Properties</div>
                </Link>
              )}
              {window.location.pathname === "/buy" ? (
                <Link to="/buy" className="link">
                  <div className="current">Buy</div>
                </Link>
              ) : (
                <Link to="/buy" className="link">
                  <div>Buy</div>
                </Link>
              )}
              {window.location.pathname === "/rent" ? (
                <Link to="" className="linkDisabled">
                  <div className="disabled">Rent</div>
                </Link>
              ) : (
                <Link to="" className="linkDisabled">
                  <div className="disabled">Rent</div>
                </Link>
              )}
              {window.location.pathname === "/aboutus" ? (
                <Link to="/aboutus" className="link">
                  <div className="current">About Us</div>
                </Link>
              ) : (
                <Link to="/aboutus" className="link">
                  <div>About Us</div>
                </Link>
              )}
              <Link to="/signup">
                <button className="getStarted">Get Started</button>
              </Link>
              <Link to="/login">
                <button className="login">Login</button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
