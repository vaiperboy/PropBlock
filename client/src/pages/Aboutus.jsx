import React, { useEffect, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styling/About/About.scss";
import hero_vector from "../assets/about-vector-cropped.svg";
import NavbarIcon from "../assets/Vector.png";
import eye_icon from "../assets/eye-icon.png";
import light_icon from "../assets/Light-icon.png";
import people_icon from "../assets/People-icon.png";
import team_card_image from "../assets/team-image.jpg";
import moralis_logo from "../assets/moralis-logo.png";
import government_logo from "../assets/Government_of_Dubai_logo.png";
import ethereum_logo from "../assets/ethereum-logo.png";
import curved_vector from "../assets/Vector 1.svg";
import qusai_image from "../assets/qusai-1.png";
import ahmed_image from "../assets/ahmed-1.png";
import sultan_image from "../assets/sultan-1.png";

const Aboutus = () => {
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Navbar />
      <main>
        {/* Hero section  */}
        <section className="hero-section">
          <div className="text">
            <h1>
              Rethink <span> Real Estate.</span>
            </h1>
            <h1 className="lower-text">
              Rethink <span>Web3.</span>
            </h1>
          </div>
          <div className="vector">
            <img src={hero_vector} alt="Vector_for_hero_section" />
          </div>
        </section>
        <div className="white-box"></div>
        {/* Small Description section   */}
        <section className="about-description">
          <div className="horizontal-line"></div>
          <div className="middle-section">
            <p>
              Propblock is an innovative & leading startup where world-class
              tech professionals team up to build meaningful products and
              services.
            </p>
            <div className="vectical-line"></div>
            <img src={NavbarIcon} alt="Propblock_Icon" />
          </div>
          <div className="horizontal-line"></div>
        </section>
        <section className="focus">
          <h1>
            What we <span>focus</span> on
          </h1>
          <div className="attributes-section">
            <div className="attribute">
              <div className="image-container">
                <img src={eye_icon} alt="eye-icon" />
              </div>
              <h2>Transparency</h2>
              <p>
                We approach the world scientifically. We set out clear,
                verifiable hypotheses and continuously collect data to test
                them. We have an open mind to new information, especially that
                which changes our beliefs. We are reasoned and logical in our
                thinking.
              </p>
            </div>
            <div className="attribute">
              <div className="image-container">
                <img src={light_icon} alt="light-icon" />
              </div>
              <h2>Innovation</h2>
              <p>
                We approach the world scientifically. We set out clear,
                verifiable hypotheses and continuously collect data to test
                them. We have an open mind to new information, especially that
                which changes our beliefs. We are reasoned and logical in our
                thinking.
              </p>
            </div>
            <div className="attribute">
              <div className="image-container">
                <img src={people_icon} alt="people-icon" />
              </div>
              <h2>Team-work</h2>
              <p>
                We approach the world scientifically. We set out clear,
                verifiable hypotheses and continuously collect data to test
                them. We have an open mind to new information, especially that
                which changes our beliefs. We are reasoned and logical in our
                thinking.
              </p>
            </div>
          </div>
        </section>
        <section className="our-story">
          <div className="box">
            <h1>Our story in numbers.</h1>
            <div className="stats-div">
              <div className="stat">
                <h3>2022</h3>
                <p>PropBlock was founded</p>
              </div>
              <div className="stat">
                <h3>#1M+</h3>
                <p>Total Trasactions</p>
              </div>
              <div className="stat">
                <h3>100,000+</h3>
                <p>Properties added</p>
              </div>
              <div className="stat">
                <h3>#4</h3>
                <p>Employees</p>
              </div>
            </div>
          </div>
        </section>
        <section className="quote-section">
          <h1>
            We believe you have the <br />
            right to transparency & ownership.
          </h1>
          <div className="styled-shape">
            <svg
              viewBox="0 0 1730 580"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradientColor">
                  <stop offset="100%" stopColor="#3daeee">
                    <animate
                      attributeName="stop-color"
                      values="#9ED7F7;  #9ED7F7;#ffffff;#ffffff;#FFCA8B;#FFCA8B;#ffffff;#ffffff; #9ED7F7;  #9ED7F7;"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              <path
                id="styled-vector"
                d="M1 315.5V70.5C67.5 60 116.5 49 254.5 61C392.5 73 544 138 626 171.5C708 205 791 251 927.5 301C1064 351 1170.5 348 1267.5 317.5C1364.5 287 1447.5 237.5 1547.5 163C1627.5 103.4 1701.83 30.8333 1729 2V325.5C1729 325.5 1690.5 353.5 1663 375C1635.5 396.5 1470 510.5 1339 547.5C1208 584.5 1137 584 1028.5 572.5C941.7 563.3 812.333 514 758.5 490.5C712.667 468.833 588.8 412.8 460 362C299 298.5 230.5 299.5 159.5 296C102.7 293.2 30.1667 307.833 1 315.5Z"
                fill="#D9D9D9"
                stroke="black"
              />
            </svg>

            {/* <img src={curved_vector} alt="Curved_shape" /> */}
          </div>
        </section>
        <div className="horizontal-line"></div>
        <section className="team">
          <h1>Meet the team.</h1>
          <div className="team-cards">
            <div className="team-card">
              <img src={ahmed_image} alt="Team_card_image" />
              <div className="team-description">
                <h3>Ahmed Ennab</h3>
                <p>Senior Backend Dev (PropBlock)</p>
              </div>
            </div>
            <div className="team-card orange">
              <img src={sultan_image} alt="Team_card_image" />
              <div className="team-description">
                <h3>Sultan Speen Jan</h3>
                <p>Blockchain Dev</p>
              </div>
            </div>
            <div className="team-card">
              <img src={qusai_image} alt="Team_card_image" />
              <div className="team-description">
                <h3>Qusai AbdelQader</h3>
                <p>Full-Stack Dev</p>
              </div>
            </div>
            <div className="team-card orange">
              <img src={team_card_image} alt="Team_card_image" />
              <div className="team-description">
                <h3>Vishal Baheti</h3>
                <p>Junior Frontend Dev</p>
              </div>
            </div>
          </div>
        </section>
        <div className="horizontal-line"></div>
        <section className="partners">
          <div className="container">
            <div className="title">
              <h1>Some of our Partners</h1>
            </div>
            <div className="partner-cards">
              <div className="partner-card">
                <div className="image-div">
                  <img src={government_logo} alt="Government_logo" />
                </div>
                <h1>Dubai Land Department</h1>
                <div className="description">
                  DLD provides outstanding services to all its customers and
                  develops the necessary legislation to propel the real estate
                  sector in Dubai by organising and promoting real estate
                  investment, and spreading industry knowledge.
                </div>
                <div className="category">Government</div>
              </div>
              <div className="partner-card">
                <div className="image-div">
                  <img src={moralis_logo} alt="Moralis_logo" />
                </div>
                <h1>Moralis</h1>
                <div className="description">
                  Moralis provides world-class APIs to developers across the
                  globe, allowing companies and projects of all sizes to
                  seamlessly integrate blockchain into their solutions stack and
                  scale with ease.
                </div>
                <div className="category">Web3 API/ Server</div>
              </div>
              <div className="partner-card">
                <div className="image-div">
                  <img src={ethereum_logo} alt="Ethereum_logo" />
                </div>
                <h1>Ethereum</h1>
                <div className="description">
                  Ethereum is a technology for building apps and organizations,
                  holding assets, transacting and communicating without being
                  controlled by a central authority.
                </div>
                <div className="category">Blockchain</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Aboutus;
