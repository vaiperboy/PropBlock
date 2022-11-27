import React, { useState, useEffect } from "react";
import "../styling/Navbar/Navbar.scss";
import { Link } from "react-router-dom";
import { Avatar, Blockie } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import NavbarIcon from "../assets/framer-1.png";
import { message } from "antd";
import { LogoutOutlined, ProfileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import avatar_image from "../assets/avatar_icon.png";
var Web3 = require("web3");

const console = require("console-browserify");

const Navbar = (props) => {
  const [signedIn, setSignedIn] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [isGovenmentUser, setIsGovernmentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    Moralis,
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
      let userButtons = document.getElementById("userButtons");
      if (userButtons.style.display !== "flex") {
        userButtons.style.display = "flex";
      } else {
        userButtons.style.display = "none";
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", function handleClickOutsideBox(event) {
      const userButtons = document.getElementById("userButtons");
      const avatarIcon = document.getElementById("avatarIcon");

      if (
        !userButtons.contains(event.target) &&
        !avatarIcon.contains(event.target)
      ) {
        userButtons.style.display = "none";
      }
    });

    // check if normal user or govenment user
    const checkUserType = async () => {
      setIsLoading(true);
      const tempAddress = user.get("ethAddress");
      const userAddress = Web3.utils.toChecksumAddress(tempAddress);
      const users = Moralis.Object.extend("GovernmentUsers");
      const query = new Moralis.Query(users);
      query.equalTo("ethAddress", userAddress);
      query.limit(1);
      query.withCount();
      const results = await query.find();
      if (results.count === 0) {
        setIsGovernmentUser(false);
      } else {
        setIsGovernmentUser(true);
      }
      setIsLoading(false);
    };
    checkUserType();
  }, []);

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
              {window.location.pathname === "/howPropBlockWorks" ? (
                <Link to="/howPropBlockWorks" className="link">
                  <div className="current">How it works</div>
                </Link>
              ) : (
                <Link to="/howPropBlockWorks" className="link">
                  <div>How it Works</div>
                </Link>
              )}
              {window.location.pathname === "/properties" ? (
                <Link to="/properties" className="link">
                  <div className="current">Properties</div>
                </Link>
              ) : (
                <Link to="/properties" className="link">
                  <div>Properties</div>
                </Link>
              )}
              {window.location.pathname === "/contactus" ? (
                <Link to="/contactus" className="link">
                  <div className="current">Contact Us</div>
                </Link>
              ) : (
                <Link to="/contactus" className="link">
                  <div>Contact Us</div>
                </Link>
              )}
              {window.location.pathname === "/aboutus" ? (
                <Link to="/aboutus" className="link">
                  <div className="current">About</div>
                </Link>
              ) : (
                <Link to="/aboutus" className="link">
                  <div>About</div>
                </Link>
              )}
              <div className="avatarSection" id="avatarIcon">
                {isLoading ? (
                  <Avatar
                    isRounded
                    theme="image"
                    className="avatar"
                    onClick={() => {
                      showButtons();
                    }}
                  />
                ) : (
                  <Avatar
                    isRounded
                    theme="image"
                    className="avatar"
                    // image={avatar_image}
                    onClick={() => {
                      showButtons();
                    }}
                  />
                )}
                {isGovenmentUser ? (
                  <div className="userButtons" id="userButtons">
                    <div
                      className="dashboardButton userButton"
                      onClick={() => navigate("/government")}
                    >
                      Goverment Dashoard <ProfileOutlined />
                    </div>
                    <div
                      className="logoutButton userButton"
                      onClick={() => disconnectWallet()}
                    >
                      Logout <LogoutOutlined />
                    </div>
                  </div>
                ) : (
                  <div className="userButtons" id="userButtons">
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
                <Link to="/howPropBlockWorks" className="link">
                  <div className="current">Properties</div>
                </Link>
              ) : (
                <Link to="/properties" className="link">
                  <div>Properties</div>
                </Link>
              )}
              {window.location.pathname === "/howPropBlockWorks" ? (
                <Link to="/howPropBlockWorks" className="link">
                  <div className="current">How it works</div>
                </Link>
              ) : (
                <Link to="/howPropBlockWorks" className="link">
                  <div>how it works</div>
                </Link>
              )}
              {window.location.pathname === "/aboutus" ? (
                <Link to="/aboutus" className="link">
                  <div className="current">About</div>
                </Link>
              ) : (
                <Link to="/aboutus" className="link">
                  <div>About</div>
                </Link>
              )}
              {window.location.pathname === "/contactus" ? (
                <Link to="/contactus" className="link">
                  <div className="current">Contact Us</div>
                </Link>
              ) : (
                <Link to="/contactus" className="link">
                  <div>Contact Us</div>
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
