import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Input, notification } from "antd";
import "../styling/ContactUs/ContactUs.scss";
import { Link } from "react-router-dom";
import ethereum_logo from "../assets/ethereum-logo.png";
import moralis_logo from "../assets/moralis-logo.png";
import propertyFinder_logo from "../assets/propertyFinder-logo.svg";
import government_Of_Dubai from "../assets/Government_of_Dubai_logo.png";
import emailjs from "emailjs-com";
const console = require("console-browserify");
const { TextArea } = Input;

const ContactUs = () => {
  const [status, setStatus] = useState("Submit");
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Submitting ...");
    emailjs
      .sendForm(
        "service_thu8bw9",
        "template_uogsaqt",
        e.target,
        "_71PziH1OmwrfGNEc"
      )
      .then((res) => {
        document.getElementById("myForm").reset();
        notification["success"]({
          message: "Message sent successfully",
          description:
            "Thank you for contacting Team PropBlock. The team will respond to your message as soon as possible.",
          onClick: () => {},
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    setStatus("Submit");
  };
  return (
    <>
      <Navbar />
      <div className="contactUs">
        <div className="topSection">
          <div className="leftSide">
            <h1>Let's Talk</h1>
            <p>
              Need support? or have a question for PropBlock? We're here to
              help.
            </p>
            <p className="email">support@propblock.io</p>
          </div>
          <div className="rightSide">
            <h1>Contact Us</h1>
            <form onSubmit={sendEmail} id="myForm">
              <div className="fullName">
                <input
                  type="text"
                  name="firstName"
                  className="Input"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  className="Input"
                  placeholder="Last Name"
                  required
                />
              </div>
              <input
                type="email"
                name="userEmail"
                className="Input"
                placeholder="Work Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
              <input
                type="text"
                name="companyName"
                className="Input"
                placeholder="Company Name"
                required
              />
              <textarea
                placeholder="How can we help?"
                name="message"
                id="message"
                rows="5"
                className="textAreaClass"
                required
              ></textarea>
              <p className="disclaimer">
                For information about how PropBlock handles personal data, see
                our <Link to="/terms&conditions">Terms & Conditions</Link>
              </p>
              <button className="submitMessage" type="submit">
                {status}
              </button>
            </form>
          </div>
        </div>
        <div className="bottomSection">
          <h2>Industry Leaders Trust PropBlock</h2>
          <div className="logosContainer">
            <img src={ethereum_logo} alt="Ethereum_Logo" />
            <img src={propertyFinder_logo} alt="propertyFinder_logo" />
            <img src={government_Of_Dubai} alt="Government_of_dubai" />
            <img src={moralis_logo} alt="Moralis_Logo" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
