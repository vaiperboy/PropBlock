import React, { useState, useEffect } from "react";
import "../styling/Navbar/Navbar.scss";
import { Link } from "react-router-dom";
import { Avatar, Blockie } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import NavbarIcon from "../assets/framer-1.png";
import { message } from "antd";
import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const console = require("console-browserify");

const Navbar = (props) => {
  const [signedIn, setSignedIn] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();
  let navigate = useNavigate();

  // disconnects the metamask wallet
  const disconnectWallet = async () => {
    try {
      await logout();
      await navigate("/");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  const showButtons = () => {
    try {
      console.log("Clicked");
      if (avatarClicked === true) {
        setAvatarClicked(false);
        console.log("Buttons show: ");

        return;
      }
      setAvatarClicked(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // add your logic here
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
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
              <div className="avatarSection">
                <Avatar
                  isRounded
                  theme="image"
                  className="avatar"
                  onClick={() => {
                    showButtons();
                  }}
                />
                {avatarClicked && (
                  <div className="userButtons">
                    <div
                      className="dashboardButton userButton"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard <ProfileOutlined />
                    </div>
                    <div
                      className="logoutButton userButton"
                      onClick={() => disconnectWallet()}
                    >
                      Logout <LogoutOutlined />
                    </div>
                  </div>
                )}
              </div>
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
