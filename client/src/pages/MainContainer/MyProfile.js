import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { Avatar } from "@web3uikit/core";
import { Input } from "@web3uikit/core";
import { message } from "antd";
import avatar_icon from "../../assets/avatar_icon.png";
const console = require("console-browserify");

const MyProfile = () => {
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
  // const [description, setDescription] = useState("");
  const [emailAddressInput, setEmailAddressInput] = useState("");
  const [fullNameInput, setFullNameInput] = useState("");

  useEffect(() => {
    setEmailAddress(user.get("email"));
    setFullName(user.get("fullName"));
    console.log(user.getSessionToken());
  }, [user]);

  const validateEmail = (email) => {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return validRegex.test(email);
  };

  const validateProfile = () => {
    var errors = [];
    const nameReg = /^[a-zA-Z]+$/;
    if (!nameReg.test(fullNameInput)) {
      errors.push("Error: Full Name can only contain characters");
    }
    const isValid = validateEmail(emailAddressInput);
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
    try {
      if (fullNameInput === "" || emailAddressInput === "") {
        message.error(
          "Input is Empty! Please enter a input to edit your profile."
        );
        return;
      }
      if (fullName === fullNameInput) {
        message.error("Invalid Full Name! Enter a different name to continue.");
        return;
      }
      if (emailAddress === emailAddressInput) {
        message.error(
          "Invalid Email Address! Enter a different email address to continue."
        );
        return;
      }
      if (Moralis.User.current()) {
        if (validateProfile()) {
          try {
            user.set("fullName", fullNameInput);
            user.set("email", emailAddressInput);
            user.save();
            message.success("Updated profile!");
            setFullName(fullNameInput);
            setEmailAddress(emailAddressInput);
          } catch (error) {
            message.error("Error in updating profile: " + error);
          }
        }
      } else message.error("you are not logged in??");
    } catch (error) {
      console.log("Error: ", error);
    }
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
            <div className="profile_picture">
              {/* <img src={avatar_icon} alt="Avatar Icon"></img> */}
              <Avatar
                isRounded
                theme="image"
                className="avatar"
                size={110}
                // image={avatar_image}
                style={{
                  width: "20rem",
                  backgroundColor: "#3daeee",
                  height: "12rem",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
                alignItems: "center",
              }}
            >
              <p className="profile_address" style={{ fontSize: "2.5rem" }}>
                Address - [{shortenAddress(user.get("ethAddress"), 18)}]
              </p>
              <div style={{ display: "flex", gap: "15px" }}></div>
            </div>
          </div>
        </div>
        <div className="profileSection" style={{}}>
          <div className="currentDetails">
            <h2>Current Details</h2>
            <div className="profileDetails">
              <div className="leftSide">
                <h3>Name</h3>
                <h3>Email Address</h3>
              </div>
              <div className="rightSide">
                <div className="userDetail">{fullName}</div>
                <div className="userDetail">{emailAddress}</div>
              </div>
            </div>
          </div>
          <div className="sectionLine"></div>
          <h2>Edit Details</h2>
          <div className="editSection">
            <p>New Full Name</p>
            <Input
              type="text"
              placeholder={fullName}
              validation={{
                required: true,
                characterMinLength: 3,
              }}
              onChange={(e) => setFullNameInput(e.target.value)}
            />
          </div>
          <div className="editSection">
            <p>New Email Address</p>
            <Input
              type="text"
              style={{ width: "550px" }}
              placeholder={emailAddress}
              validation={{
                required: true,
                regExp: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                regExpInvalidMessage: "Invalid email address",
              }}
              onChange={(e) => setEmailAddressInput(e.target.value)}
            />
          </div>
          {/* <div className="editSection">
            <p>Description</p>
            <textarea
              className="profile_form_textarea"
              type="text"
              placeholder={description}
            />
          </div> */}
          <button
            className="profile_button"
            style={{
              userSelect: "none",
              width: "fit-content",
              height: "fit-content",
            }}
            onClick={updateProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
