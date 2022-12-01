import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Avatar } from "@web3uikit/core";
import { Spin, message } from "antd";
import "./userProfile.scss";
import { DownloadOutlined } from "@ant-design/icons";
const console = require("console-browserify");

const UserProfile = (props) => {
  let fullName = "Sultan";
  const { Moralis, authenticated, ...rest } = useMoralis();
  const [isLoading, setIsLoading] = useState(false);
  const [isBanned, setIsBaned] = useState(false);

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 10) + " ... " + text.substring(text.length - 10);
    }
    return text;
  };

  // fetching the data for the user
  useEffect(() => {
    setIsLoading(true);
    // loading the data

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "60%",
          height: "50rem",
          marginLeft: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" style={{ margin: "0 2rem 0 0 " }} /> Loading
      </div>
    );
  } else {
    return (
      <div className="userProfileSection">
        <div className="user_profile_banner">
          <Avatar
            isRounded
            theme="image"
            className="avatar"
            size={110}
            style={{
              width: "8rem",
              height: "8rem",
            }}
          />
          <p className="profile_address">User - {props.userFullName}</p>
        </div>
        <div className="profileSection" style={{}}>
          <div className="currentDetails">
            <h2>User Details</h2>
            <div className="profileDetails">
              <div className="leftSide">
                <h3>Name</h3>
                <h3>Wallet Address</h3>
                <h3>Email Address</h3>
              </div>
              <div className="rightSide">
                <div className="userDetail">{props.userAddress}</div>
                <div className="userDetail">{props.userFullName}</div>
                <div className="userDetail">{props.userEmailAddress}</div>
              </div>
            </div>
          </div>
          <h2>User Documents</h2>
          <div className="documentsSection">
            <div className="documentTitleContainer">
              <div className="documentTitle">User Id Card</div>
              <div className="documentTitle">User Passport</div>
              <div className="documentTitle">Ban User</div>
            </div>
            <div className="documentFileContainer">
              <div
                className="documentItem downloadButton"
                onClick={() => {
                  message.info("Id downloaded");
                  console.log("here");
                }}
              >
                Download File <DownloadOutlined />
              </div>
              <div
                className="documentItem downloadButton"
                onClick={() => {
                  message.info("Passport downloaded");
                  console.log("here");
                }}
              >
                Download File <DownloadOutlined />
              </div>
              {!isBanned ? (
                <div
                  className="documentItem BanButton"
                  onClick={() => {
                    message.success("User is banned successfully");
                    setIsBaned(true);
                  }}
                >
                  Ban User
                </div>
              ) : (
                <div
                  className="documentItem BanButton"
                  onClick={() => {
                    message.success("User is unbanned");
                    setIsBaned(false);
                  }}
                >
                  UnBan User
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default UserProfile;
