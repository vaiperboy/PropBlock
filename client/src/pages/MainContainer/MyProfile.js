import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Input } from "@web3uikit/core";
import { message } from "antd";
const console = require("console-browserify");

const MyProfile = () => {
  const console = require("console-browserify");

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

  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 12) + " ... " + text.substring(text.length - 3);
    }
    return text;
  };
  const [emailAddress, setEmailAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setEmailAddress(user.get("email"));
    setFullName(user.get("fullName"));
    setDescription("big data");
    console.log(user.getSessionToken());
  }, [user]);

  const validateEmail = (email) => {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return validRegex.test(email);
  };

  const validateProfile = () => {
    var errors = [];
    const nameReg = /^[a-zA-Z]+$/;
    if (!nameReg.test(fullName)) {
      errors.push("Error: Full Name can only contain characters");
    }
    const isValid = validateEmail(emailAddress);
    if (!isValid) {
      errors.push(
        "Invalid Email address! Enter a valid email address to continue."
      );
    }

    if (errors.length == 0) return true;
    errors.forEach((e) => message.error(e));
    return false;
  };

  const updateProfile = () => {
    if (Moralis.User.current()) {
      if (validateProfile()) {
        try {
          user.set("fullName", fullName);
          user.set("email", emailAddress);
          user.save();
          message.success("Updated profile!");
        } catch (error) {
          message.error("Error in updating profile: " + error);
        }
      }
    } else message.error("you are not logged in??");
  };

  return (
    <div className="rightsidebar_container">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <p className="rightsidebar_title">My Profile</p>
        </div>
      </div>
      <div
        className="rightsidebar_content"
        style={{
          width: "100%",
          display: "flex",
          marginTop: 30,
          height: "auto",
        }}
      >
        <div className="profile_banner">
          <div className="profile_bottom">
            <div className="profile_picture" />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                alignItems: "center",
              }}
            >
              <p className="profile_address">
                Address - [{shortenAddress(user.get("ethAddress"), 18)}]
              </p>
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  className="profile_button"
                  style={{ userSelect: "none", height: "fit-content" }}
                  onClick={updateProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            borderRadius: "8px",
            padding: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div>
            <p>Name</p>
            <Input
              type="text"
              placeholder={fullName}
              validation={{
                required: true,
                characterMinLength: 3,
              }}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <p>Email</p>
            <Input
              type="text"
              style={{ width: "550px" }}
              placeholder={emailAddress}
              validation={{
                required: true,
                regExp: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                regExpInvalidMessage: "Invalid email address",
              }}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
          <div>
            <p>Description</p>
            <textarea
              className="profile_form_textarea"
              type="text"
              placeholder={description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
