import "../styling/Home/Home.scss";
import { Link } from "react-router-dom";
import { AutoComplete, Select, InputNumber, notification } from "antd";
// import { Loading } from "@web3uikit/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  TagOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import realEstateImage1 from "../assets/realEstate_1-min.png";
import realEstateImage2 from "../assets/realEstate_2-min.png";
import realEstateImage3 from "../assets/realEstate_3-min.png";
// import rentHome from "../assets/rent-home-100-icon-min.png";
import rentHome from "../assets/rent_home_icon.png";
import buyHome from "../assets/buy_home_icon.png";
// import buyHome from "../assets/buy-home-100-min.png";
import profile from "../assets/profile-min.png";
import location_icon from "../assets/location-icon.png";
import location_icon_blue from "../assets/location-icon-blue.png";
import property_type_icon from "../assets/home-icon.png";
import beds_icon from "../assets/beds-icon.svg";
import price_tag_icon from "../assets/tag-icon.png";
// import hero_image from "../assets/hero-section-image.png";
import hero_image from "../assets/hero_illustration.png";
import ethereum_logo from "../assets/ethereum-logo.png";
import moralis_logo from "../assets/moralis-logo.png";
import propertyFinder_logo from "../assets/propertyFinder-logo.svg";
import government_Of_Dubai from "../assets/Government_of_Dubai_logo.png";
import about_logo from "../assets/about_prop.png";
import about_logo2 from "../assets/about_prop2.png";
import contact_us from "../assets/contact_us.png";
import { useEffect, useState } from "react";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Reveal from "react-reveal/Reveal";
import Slide from "react-reveal/Slide";
import emailjs from "emailjs-com";

const console = require("console-browserify");

function Home() {
  const countryOptions = [
    {
      value: "Abu Dhabi",
    },
    {
      value: "Dubai",
    },
    {
      value: "Ajman",
    },
    {
      value: "Sharjah",
    },
    {
      value: "Ras Al Khaima",
    },
    {
      value: "Umm Al Quwain",
    },
    {
      value: "Fujairah",
    },
    {
      value: "Al Ain",
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const sampleProperties = [
    {
      id: 1,
      label: "Villa, Jumeirah",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "750,000",
      imageLocation: "realEstate_3-min.png",
    },
    {
      id: 2,
      label: "Smart Building Apartment",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "1,500,000",
      imageLocation: "realEstate_2-min.png",
    },
    {
      id: 3,
      label: "La Meridien Beach Resort",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "1,500,000",
      imageLocation: "realEstate_1-min.png",
    },
  ];

  const [status, setStatus] = useState("Submit");
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Submitting ...");
    emailjs
      .sendForm(
        "service_gmrzi7k",
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

  const { Option } = Select;
  return (
    <div>
      <Navbar />
      <main>
        <div className="heroSection">
          <div className="dottedLine"></div>
          <div className="leftSide">
            <div>
              <Fade left duration={1800}>
                <h1>
                  Find your dream home, <br /> the <span>Web3</span> way!
                </h1>
                <h5>
                  Harness the real power of smart contracts to find your dream
                  home.
                </h5>
              </Fade>

              <Link to="/properties" className="exploreLink">
                <Fade left duration={2000}>
                  <button className="exploreButton">Explore</button>
                </Fade>
              </Link>
            </div>
          </div>
          <Fade effect="fadeInUp" duration={3500}>
            <div className="rightSide">
              <img src={hero_image} alt="hero_Section_Image" />
            </div>
          </Fade>
        </div>
        <div className="searchSection">
          <h2>Search for available properties</h2>
          <div className="buttonsSection">
            <button className="buyButton">Buy</button>
            <button className="rentButton">Rent</button>
          </div>
          <div className="searchBar">
            <div className="locationFilter">
              <div className="filterDiv">
                <label htmlFor="location">Location </label>
                <img src={location_icon} alt="location_icon" />
              </div>
              <div className="inputDiv">
                <AutoComplete
                  id="location"
                  style={{
                    width: "100%",
                  }}
                  options={countryOptions}
                  placeholder="Dubai"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </div>
            </div>
            <div className="horizontal_line"></div>
            <div className="propertyTypeFilter">
              <div className="filterDiv">
                <label htmlFor="location">Property Type</label>
                <img src={property_type_icon} alt="property_icon" />
              </div>
              <div className="inputDiv">
                <Select
                  placeholder="Apartment "
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                >
                  <Option value="Apartment">Apartment</Option>
                  <Option value="Villa">Villa</Option>
                  <Option value="Townhouse">Townhouse</Option>
                  <Option value="Penthouse">Penthouse</Option>
                  <Option value="Duplex">Duplex</Option>
                </Select>
              </div>
            </div>
            <div className="horizontal_line"></div>
            <div className="bedsFilter">
              <div className="filterDiv">
                <label htmlFor="location">Beds</label>
                <img src={beds_icon} alt="beds_icon" />
              </div>
              <div className="inputDiv">
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  defaultValue="1"
                  min="0"
                  max="10"
                />
              </div>
            </div>
            <div className="horizontal_line"></div>
            <div className="priceFilter">
              <div className="filterDiv">
                <label htmlFor="location">Price</label>
                <img src={price_tag_icon} alt="price_icon" />
              </div>
              <div className="inputDiv">
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                  defaultValue="1"
                  min="0"
                  max="10000000"
                />
              </div>
            </div>
            <div id="searchButton" onClick={() => {}}>
              <SearchOutlined className="searchBarIcon" />
            </div>
          </div>
        </div>
        {/* <div className="horizontal-breaker"></div> */}

        <div className="introducingPropBlock">
          <div className="top">
            <div className="dottedLine"></div>
            <Fade bottom duration={1100}>
              <div className="leftSide">
                <p>Introducing PropBlock</p>
                <h2>
                  Get your property in front of millions with the comfort of a
                  few clicks.
                </h2>
              </div>
              <div className="rightSide">
                <div className="section">
                  <h3>Simple</h3>
                  <p>
                    Save time: Create and send a survey in as little as 30
                    seconds. Feedback is compiled in easy to understand graphs
                    for actionable insights.
                  </p>
                </div>
                <div className="section">
                  <h3>Empowering</h3>
                  <p>
                    Save time: Create and send a survey in as little as 30
                    seconds. Feedback is compiled in easy to understand graphs
                    for actionable insights.
                  </p>
                </div>
                <div className="section">
                  <h3>Practical</h3>
                  <p>
                    Save time: Create and send a survey in as little as 30
                    seconds. Feedback is compiled in easy to understand graphs
                    for actionable insights.
                  </p>
                </div>
              </div>
            </Fade>
          </div>
          <div className="bottom">
            <Fade effect="fadeInUp" duration={1500}>
              <div className="rentSection">
                <img src={rentHome} alt="Rent Icon"></img>
                <div className="lowerSection">
                  <h2>Rent a Home</h2>
                  <p>Find your new rental apartment faster than ever.</p>
                  <span>Coming Soon</span>
                </div>
              </div>
            </Fade>
            <Fade effect="fadeInUp" duration={1500}>
              <div className="buySection">
                <img src={buyHome} alt="Buy Icon"></img>
                <div className="lowerSection">
                  <h2>Buy a Home</h2>
                  <p>Find a new home or sell you property, hassle-free.</p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
        <div className="knowPropBlock">
          <div className="dottedLine"></div>
          <div>
            <div className="headingSection">
              <Fade bottom>
                <div>
                  <h1>A little about PropBlock</h1>
                  <h3>
                    "A real estate enlisting website, that uses blockchain
                    innovation to connect real estate sellers and buyers."
                  </h3>
                </div>
              </Fade>
            </div>
            <div className="lowerSection">
              <div className="section1">
                <Fade left duration={1300}>
                  <div className="leftSection">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Doloremque accusantium, adipisci inventore modi itaque
                      amet quos, ea pariatur eaque eos, nisi laboriosam iusto.
                      Cupiditate beatae libero sed harum exercitationem iste
                      dignissimos quo, officiis eum similique, voluptatibus quod
                      vel nobis quis deleniti officia iusto amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti fugit vel sapiente eaque ipsum. Quia voluptatem
                      consectetur autem sapiente! In neque eos explicabo, veniam
                      iste quos aliquid est dignissimos magnam consequatur
                      voluptatibus voluptate.
                    </p>
                  </div>
                </Fade>
                <Fade right duration={1300}>
                  <div className="rightSection">
                    <img src={about_logo} alt="Blockchain Illustration" />
                  </div>
                </Fade>
              </div>
              <div className="section2">
                <Fade left duration={1300}>
                  <div className="leftSection">
                    <img src={about_logo2} alt="Blockchain Illustration 2" />
                  </div>
                </Fade>
                <Fade right duration={1300}>
                  <div className="rightSection">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Doloremque accusantium, adipisci inventore modi itaque
                      amet quos, ea pariatur eaque eos, nisi laboriosam iusto.
                      Cupiditate beatae libero sed harum exercitationem iste
                      dignissimos quo, officiis eum similique, voluptatibus quod
                      vel nobis quis deleniti officia iusto amet.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Corrupti fugit vel sapiente eaque ipsum. Quia voluptatem
                      consectetur autem sapiente! In neque eos explicabo, veniam
                      iste quos aliquid est dignissimos magnam consequatur
                      voluptatibus voluptate. Beatae vitae doloribus quae soluta
                      neque asperiores, numquam minima ullam ratione, quo
                      quisquam recusandae, nihil debitis cupiditate.
                    </p>
                    <Link to="/aboutus" className="exploreLink">
                      <button className="aboutButton">Read More</button>
                    </Link>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
        <Fade bottom>
          <div className="industryLeaders">
            <h2>Industry Leaders Trust PropBlock</h2>
            <div className="logosContainer">
              <img src={ethereum_logo} alt="Ethereum_Logo" />
              <img src={propertyFinder_logo} alt="propertyFinder_logo" />
              <img src={government_Of_Dubai} alt="Government_of_dubai" />
              <img src={moralis_logo} alt="Moralis_Logo" />
            </div>
          </div>
        </Fade>
        <Fade bottom>
          <div className="trendingProperties">
            <div className="trendingHeader">
              <h1>Trending Properties</h1>
              <Link to="/properties" className="viewMoreButton">
                view more
                <div className="viewMoreIcon">
                  <ArrowRightOutlined />
                </div>
              </Link>
            </div>
            <div className="properties">
              {sampleProperties.map((property, key) => (
                <Link className="property" to={`../property/${property.id}`}>
                  <img
                    src={require(`../assets/${property.imageLocation}`)}
                    alt="real_estate_image"
                  />

                  <div className="propertyLabel">
                    <h3 id={key}>{property.label}</h3>
                    <p>
                      {property.city}, {property.country}
                      <img src={location_icon_blue} alt="location_icon_blue" />
                    </p>
                  </div>
                  <div className="propertyDescription">
                    {property.description}
                  </div>
                  <div className="propertyPrice">${property.price}</div>
                </Link>
              ))}
            </div>
          </div>
        </Fade>
        {/* <div className="breakLine"></div> */}
        <Fade bottom>
          <div className="testimonialSection">
            <div className="heading">
              <h1>Users Testimonials</h1>
            </div>
            <div className="customers">
              <div className="customer1">
                <div className="profile">
                  <img src={profile} alt="customer_image" />
                  <h2>0xd1D3 ... 75f9</h2>
                </div>
                <div className="comment">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati repellendus itaque reprehenderit neque dolore soluta
                  nostrum, facilis atque porro commodi!
                </div>
              </div>
              <div className="customer2">
                <div className="profile">
                  <img src={profile} alt="customer_image" />
                  <h2>0xd1D3 ... 75f9</h2>
                </div>
                <div className="comment">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati repellendus itaque reprehenderit neque dolore soluta
                  nostrum, facilis atque porro commodi!
                </div>
              </div>
              <div className="break"></div>
              <div className="customer3">
                <div className="profile">
                  <img src={profile} alt="customer_image" />
                  <h2>0xd1D3 ... 75f9</h2>
                </div>
                <div className="comment">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati repellendus itaque reprehenderit neque dolore soluta
                  nostrum, facilis atque porro commodi!
                </div>
              </div>
              <div className="customer4">
                <div className="profile">
                  <img src={profile} alt="customer_image" />
                  <h2>0xd1D3 ... 75f9</h2>
                </div>
                <div className="comment">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Obcaecati repellendus itaque reprehenderit neque dolore soluta
                  nostrum, facilis atque porro commodi!
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <div className="contactSection">
          <div className="topSection">
            <div className="leftSide">
              <h1>Get in touch</h1>
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
            <div className="rightSide">
              <img src={contact_us} alt="Contact us icon"></img>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  // return (
  //   <div>
  //     <Navbar />
  //     <main>
  //       <div className="heroSection">
  //         <div className="leftSide">
  //           <div className="dottedLine"></div>
  //           <div>
  //             <Fade left duration={1800}>
  //               <h1>
  //                 Find your dream home, <br /> the <span>Web3</span> way!
  //               </h1>
  //               <h5>Harness the real power of smart contracts.</h5>
  //             </Fade>
  //             <Link to="/properties" className="exploreLink">
  //               <button className="exploreButton">Explore</button>
  //             </Link>
  //           </div>
  //         </div>
  //         <div className="rightSide">
  //           <img src={hero_image} alt="hero_Section_Image" />
  //         </div>
  //       </div>
  //       <div className="searchSection">
  //         <h2>Search available properties</h2>
  //         <div className="buttonsSection">
  //           <button className="buyButton">Buy</button>
  //           <button className="rentButton">Rent</button>
  //         </div>
  //         <div className="searchBar">
  //           <div className="locationFilter">
  //             <div className="filterDiv">
  //               <label htmlFor="location">Location </label>
  //               <img src={location_icon} alt="location_icon" />
  //             </div>
  //             <div className="inputDiv">
  //               <AutoComplete
  //                 id="location"
  //                 style={{
  //                   width: "100%",
  //                 }}
  //                 options={countryOptions}
  //                 placeholder="Dubai"
  //                 filterOption={(inputValue, option) =>
  //                   option.value
  //                     .toUpperCase()
  //                     .indexOf(inputValue.toUpperCase()) !== -1
  //                 }
  //               />
  //             </div>
  //           </div>
  //           <div className="horizontal_line"></div>
  //           <div className="propertyTypeFilter">
  //             <div className="filterDiv">
  //               <label htmlFor="location">Property Type</label>
  //               <img src={property_type_icon} alt="property_icon" />
  //             </div>
  //             <div className="inputDiv">
  //               <Select
  //                 placeholder="Apartment "
  //                 style={{
  //                   width: "100%",
  //                 }}
  //                 onChange={handleChange}
  //               >
  //                 <Option value="Apartment">Apartment</Option>
  //                 <Option value="Villa">Villa</Option>
  //                 <Option value="Townhouse">Townhouse</Option>
  //                 <Option value="Penthouse">Penthouse</Option>
  //                 <Option value="Duplex">Duplex</Option>
  //               </Select>
  //             </div>
  //           </div>
  //           <div className="horizontal_line"></div>
  //           <div className="bedsFilter">
  //             <div className="filterDiv">
  //               <label htmlFor="location">Beds</label>
  //               <img src={beds_icon} alt="beds_icon" />
  //             </div>
  //             <div className="inputDiv">
  //               <InputNumber
  //                 style={{
  //                   width: "100%",
  //                 }}
  //                 defaultValue="1"
  //                 min="0"
  //                 max="10"
  //               />
  //             </div>
  //           </div>
  //           <div className="horizontal_line"></div>
  //           <div className="priceFilter">
  //             <div className="filterDiv">
  //               <label htmlFor="location">Price</label>
  //               <img src={price_tag_icon} alt="price_icon" />
  //             </div>
  //             <div className="inputDiv">
  //               <InputNumber
  //                 style={{
  //                   width: "100%",
  //                 }}
  //                 defaultValue="1"
  //                 min="0"
  //                 max="10000000"
  //               />
  //             </div>
  //           </div>
  //           <div id="searchButton" onClick={() => {}}>
  //             <SearchOutlined className="searchBarIcon" />
  //           </div>
  //         </div>
  //       </div>
  //       {/* <div className="horizontal-breaker"></div> */}

  //       <div className="servicesSection">
  //         <h3>what we offer</h3>
  //         <div className="serviceCards">
  //           <Slide left duration={1000}>
  //             <div className="rentHome">
  //               <div className="iconDiv">
  //                 <img src={rentHome} alt="rentHomeIcon" />
  //               </div>
  //               <h1>Rent a home</h1>
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
  //                 earum animi assumenda quia ex deserunt laudantium nostrum
  //                 maiores placeat quaerat!
  //               </p>
  //             </div>
  //           </Slide>
  //           <Slide bottom duration={1000}>
  //             <div className="buyHome">
  //               <div className="iconDiv">
  //                 <img src={buyHome} alt="buyHomeIcon" />
  //               </div>
  //               <h1>Buy a home</h1>
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
  //                 earum animi assumenda quia ex deserunt laudantium nostrum
  //                 maiores placeat quaerat!
  //               </p>
  //             </div>
  //           </Slide>
  //           <Slide right duration={1000}>
  //             <div className="sellHome">
  //               <div className="iconDiv">
  //                 <div className="sellIconDiv">
  //                   <TagOutlined />
  //                 </div>
  //               </div>
  //               <h1>Sell a home</h1>
  //               <p>
  //                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
  //                 earum animi assumenda quia ex deserunt laudantium nostrum
  //                 maiores placeat quaerat!
  //               </p>
  //             </div>
  //           </Slide>
  //         </div>
  //       </div>
  //       <div className="aboutUsSection">
  //         <div className="leftSide">
  //           <h1>About Us</h1>
  //           <Fade left>
  //             <h3 style={{ fontWeight: "600" }}>
  //               A real estate enlisting website, that uses blockchain innovation
  //               to connect real estate sellers and buyers.
  //             </h3>
  //             <p>
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
  //               vulputate libero et velit interdum, ac aliquet odio mattis.
  //               Class aptent taciti sociosqu ad litora torquent per conubia
  //               nostra, per inceptos himenaeos.
  //             </p>
  //             <p>
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
  //               vulputate libero et velit interdum, ac aliquet odio mattis.
  //               Class aptent taciti sociosqu ad litora torquent per conubia
  //               nostra, per inceptos himenaeos. ac aliquet odio mattis. Class
  //               aptent taciti sociosqu ad litora torquent per conubia nostra,
  //               per inceptos himenaeos. ac aliquet odio mattis. Class aptent
  //               taciti sociosqu ad litora torquent per conubia nostra, per
  //               inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur
  //               adipiscing elit. Nunc vulputate libero et velit interdum, ac
  //               aliquet odio mattis. Class aptent taciti sociosqu ad litora
  //               torquent per conubia nostra, per inceptos himenaeos. ac aliquet
  //               odio mattis. Class aptent taciti sociosqu ad litora torquent per
  //               conubia nostra, per inceptos himenaeos. ac aliquet odio mattis.
  //               Class aptent taciti sociosqu ad litora torquent per conubia
  //               nostra, per inceptos himenaeos.
  //             </p>
  //           </Fade>
  //           <Fade left duration={1000}>
  //             <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>
  //               <button className="readMoreButton">
  //                 Read More
  //                 {/* Icon here */}
  //               </button>
  //             </Link>
  //           </Fade>
  //         </div>
  //         <div className="rightSide">
  //           <div className="image1">
  //             <img src={realEstateImage1} alt="Real_Estate_Image" />
  //           </div>
  //           <div className="bottomImages">
  //             <div className="image2">
  //               <img src={realEstateImage2} alt="Real_Estate_Image" />
  //             </div>
  //             <div className="image3">
  //               <img src={realEstateImage3} alt="Real_Estate_Image" />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="trendingProperties">
  //         <div className="trendingHeader">
  //           <h1>Trending Properties</h1>
  //           <Link to="/properties" className="viewMoreButton">
  //             view more
  //             <div className="viewMoreIcon">
  //               <ArrowRightOutlined />
  //             </div>
  //           </Link>
  //         </div>
  //         <div className="properties">
  //           {sampleProperties.map((property, key) => (
  //             <Link className="property" to={`../property/${property.id}`}>
  //               <img
  //                 src={require(`../assets/${property.imageLocation}`)}
  //                 alt="real_estate_image"
  //               />

  //               <div className="propertyLabel">
  //                 <h3 id={key}>{property.label}</h3>
  //                 <p>
  //                   {property.city}, {property.country}
  //                   <img src={location_icon_blue} alt="location_icon_blue" />
  //                 </p>
  //               </div>
  //               <div className="propertyDescription">
  //                 {property.description}
  //               </div>
  //               <div className="propertyPrice">${property.price}</div>
  //             </Link>
  //           ))}
  //         </div>
  //       </div>
  //       {/* <div className="breakLine"></div> */}
  //       <Fade bottom>
  //         <div className="testimonialSection">
  //           <div className="heading">
  //             <h1>
  //               What some of our <span>Users</span> say
  //             </h1>
  //           </div>
  //           <div className="customers">
  //             <div className="customer1">
  //               <div className="profile">
  //                 <img src={profile} alt="customer_image" />
  //                 <h2>0xd1D3 ... 75f9</h2>
  //               </div>
  //               <div className="comment">
  //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  //                 Obcaecati repellendus itaque reprehenderit neque dolore soluta
  //                 nostrum, facilis atque porro commodi!
  //               </div>
  //             </div>
  //             <div className="customer2">
  //               <div className="profile">
  //                 <img src={profile} alt="customer_image" />
  //                 <h2>0xd1D3 ... 75f9</h2>
  //               </div>
  //               <div className="comment">
  //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  //                 Obcaecati repellendus itaque reprehenderit neque dolore soluta
  //                 nostrum, facilis atque porro commodi!
  //               </div>
  //             </div>
  //             <div className="break"></div>
  //             <div className="customer3">
  //               <div className="profile">
  //                 <img src={profile} alt="customer_image" />
  //                 <h2>0xd1D3 ... 75f9</h2>
  //               </div>
  //               <div className="comment">
  //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  //                 Obcaecati repellendus itaque reprehenderit neque dolore soluta
  //                 nostrum, facilis atque porro commodi!
  //               </div>
  //             </div>
  //             <div className="customer4">
  //               <div className="profile">
  //                 <img src={profile} alt="customer_image" />
  //                 <h2>0xd1D3 ... 75f9</h2>
  //               </div>
  //               <div className="comment">
  //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  //                 Obcaecati repellendus itaque reprehenderit neque dolore soluta
  //                 nostrum, facilis atque porro commodi!
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </Fade>
  //     </main>
  //     <Footer />
  //   </div>
  // );
}
export default Home;
