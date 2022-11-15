import "../styling/Home/Home.scss";
import { Link } from "react-router-dom";
import { AutoComplete, Select, InputNumber } from "antd";
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
import rentHome from "../assets/rent-home-100-icon-min.png";
import buyHome from "../assets/buy-home-100-min.png";
import profile from "../assets/profile-min.png";
import location_icon from "../assets/location-icon.png";
import location_icon_blue from "../assets/location-icon-blue.png";
import property_type_icon from "../assets/home-icon.png";
import beds_icon from "../assets/beds-icon.svg";
import price_tag_icon from "../assets/tag-icon.png";
import hero_image from "../assets/hero-section-image.png";

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

  const { Option } = Select;

  return (
    <div>
      <Navbar/>
      <main>
        <div className="heroSection">
          <div className="leftSide">
            <div className="dottedLine"></div>
            <div>
              <h1>
                Find your dream home, <br /> the <span>Web3</span> way!
              </h1>
              <h5>Harness the real power of smart contracts.</h5>
              <Link to="/properties" className="exploreLink">
                <button className="exploreButton">Explore</button>
              </Link>
            </div>
          </div>
          <div className="rightSide">
            <img src={hero_image} alt="hero_Section_Image" />
          </div>
        </div>
        <div className="searchSection">
          <h2>Search available properties</h2>
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
        <div className="aboutUsSection">
          <div className="leftSide">
            <h1>About Us</h1>
            <h3 style={{ fontWeight: "600" }}>
              A real estate enlisting website, that uses blockchain innovation
              to connect real estate sellers and buyers.
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. ac aliquet odio mattis. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. ac aliquet odio mattis. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos.
            </p>
            <Link to="/aboutus" onClick={() => window.scrollTo(0, 0)}>
              <button className="readMoreButton">
                Read More
                {/* Icon here */}
              </button>
            </Link>
          </div>
          <div className="rightSide">
            <div className="image1">
              <img src={realEstateImage1} alt="Real_Estate_Image" />
            </div>
            <div className="bottomImages">
              <div className="image2">
                <img src={realEstateImage2} alt="Real_Estate_Image" />
              </div>
              <div className="image3">
                <img src={realEstateImage3} alt="Real_Estate_Image" />
              </div>
            </div>
          </div>
        </div>
        <div className="servicesSection">
          <h3>what we offer</h3>
          <div className="serviceCards">
            <div className="rentHome">
              <div className="iconDiv">
                <img src={rentHome} alt="rentHomeIcon" />
              </div>
              <h1>Rent a home</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                earum animi assumenda quia ex deserunt laudantium nostrum
                maiores placeat quaerat!
              </p>
            </div>
            <div className="buyHome">
              <div className="iconDiv">
                <img src={buyHome} alt="buyHomeIcon" />
              </div>
              <h1>Buy a home</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                earum animi assumenda quia ex deserunt laudantium nostrum
                maiores placeat quaerat!
              </p>
            </div>
            <div className="sellHome">
              <div className="iconDiv">
                <div className="sellIconDiv">
                  <TagOutlined />
                </div>
              </div>
              <h1>Sell a home</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                earum animi assumenda quia ex deserunt laudantium nostrum
                maiores placeat quaerat!
              </p>
            </div>
          </div>
        </div>
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
        {/* <div className="breakLine"></div> */}
        <div className="testimonialSection">
          <div className="heading">
            <h1>
              What some of our <span>Users</span> say
            </h1>
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
      </main>
      <Footer />
    </div>
  );
}
export default Home;
