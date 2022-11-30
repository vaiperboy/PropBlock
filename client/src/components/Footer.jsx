import React from "react";
import { Link } from "react-router-dom";
// import FooterIcon from "../assets/framer-1.png";
import FooterIcon from "../assets/framer_white.png";
import Facebook_icon from "../assets/facebook_icon.png";
import Insta_icon from "../assets/insta_icon.png";
import Twitter_icon from "../assets/twitter_icon.png";
import "../styling/Footer/Footer.scss";

const Footer = () => {
  return (
    <>
      <div className="footerMain">
        <div className="topSection">
          <img src={FooterIcon} alt="FooterIcon" />
          <div>
            <p>Your new home is a few clicks away.</p>
            <Link to="/properties" className="exploreLink">
              <button className="exploreButton">Explore</button>
            </Link>
          </div>
        </div>
        <div className="bottomSection">
          <div className="col1">
            <h3>Customers</h3>
            <Link to="/terms&conditions" className="link">
              Terms & Conditions
            </Link>
          </div>
          <div className="col2">
            <h3>Services</h3>
            <Link to="/properties" className="link">
              Properties
            </Link>
            <Link
              to="/buy"
              className="link"
              style={{ pointerEvents: "none", color: "grey" }}
            >
              Buy
            </Link>
            <Link
              to="/rent"
              className="link"
              style={{ pointerEvents: "none", color: "grey" }}
            >
              Rent
            </Link>
          </div>
          <div className="col3">
            <h3>About</h3>
            <Link to="/aboutus" className="link">
              Our Story
            </Link>
          </div>
          <div className="col4">
            <h3>Help</h3>
            <Link to="/FAQ" className="link">
              FAQ's
            </Link>
            <Link to="/contactus" className="link">
              Contact Us
            </Link>
            <div className="socialLinks">
              <a href="#" target="_blank">
                <img
                  src={Facebook_icon}
                  alt="Facebook Icon"
                  style={{ width: "1.5rem" }}
                />
              </a>
              <a href="#" target="_blank">
                <img src={Insta_icon} alt="Instagram Icon" />
              </a>
              <a href="#" target="_blank">
                <img src={Twitter_icon} alt="Twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
