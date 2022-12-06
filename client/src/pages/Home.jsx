import "../styling/Home/Home.scss";
import { Link } from "react-router-dom";
import {
  AutoComplete,
  Select,
  InputNumber,
  notification,
  message,
  Spin,
} from "antd";
// import { Loading } from "@web3uikit/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SearchOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import rentHome from "../assets/rent-home-100-icon-min.png";
import rentHome from "../assets/rent_home_icon.png";
import buyHome from "../assets/buy_home_icon.png";
// import buyHome from "../assets/buy-home-100-min.png";
import profile from "../assets/profile-min.png";
import location_icon from "../assets/location-icon.png";
import location_icon_blue from "../assets/location-icon-blue.png";
import property_type_icon from "../assets/home-icon.png";
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
import { useNavigate, createSearchParams } from "react-router-dom";
import Fade from "react-reveal/Fade";
import emailjs from "emailjs-com";

const console = require("console-browserify");

function Home() {
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
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

  const navigate = useNavigate();
  const goToProperties = () => {
    navigate({
      pathname: "properties",
      search: createSearchParams({
        ...(city.length > 0 && { city: city }),
        ...(propertyType.length > 0 && { propertyType: propertyType }),
        ...(maxPrice > 0 && { maxPrice: maxPrice }),
      }).toString(),
    });
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
    console.log("here");
    emailjs
      .sendForm(
        "service_axyk4tx",
        "template_uogsaqt",
        e.target,
        "bv92eN3KhTcjHnZL8"
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

  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    prices: {
      minPrice: 100,
      maxPrice: 10000000,
    },
    propertyType: "",
    minimumBeds: 0,
    minimumBaths: 0,
    facilities: 0,
    city: "",
  });

  const loadProperties = async () => {
    if (isLoading) {
      message.error("Wait till it finishes...");
      return;
    }
    setIsLoading(true);
    try {
      fetch(
        "http://localhost:9000/getAllProperties?" +
          new URLSearchParams({
            pageNumber: 1,
            city: filterValues.city,
            minPrice: filterValues.prices.minPrice,
            maxPrice: filterValues.prices.maxPrice,
            propertyType: filterValues.propertyType,
            facilities: filterValues.facilities,
            minimumBeds: filterValues.minimumBeds,
            minimumBaths: filterValues.minimumBaths,
          })
      )
        .then((res) => res.json())
        .then((res) => {
          setProperties(res.results);
          console.log("res ", res.results);
        })
        .catch((err) => {
          message.error("error with API");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      message.error("error with setting data from API");
    }
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const shortenText = (text, maxWords) => {
    if (maxWords < text.length) {
      text = text.substring(0, maxWords) + "......";
    }
    return text;
  };
  useEffect(() => {
    loadProperties();
  }, []);

  const { Option } = Select;
  return (
    <div>
      <Navbar />
      <main>
        <div className="heroSection">
          <div className="dottedLine"></div>
          <div className="leftSide">
            <div>
              <Fade effect="fadeInUp" bottom duration={1000}>
                <h1>
                  Find your dream home, <br /> the <span>Web3</span> way!
                </h1>
                <h5>
                  Harness the real power of smart contracts to find your dream
                  home.
                </h5>
              </Fade>

              <Link to="/properties" bottom className="exploreLink">
                <Fade bottom duration={1000}>
                  <button className="exploreButton">Explore</button>
                </Fade>
              </Link>
            </div>
          </div>
          <Fade effect="fadeInUp" duration={3000}>
            <div className="rightSide">
              <img
                src={hero_image}
                alt="hero_Section_Image"
                style={{ height: "100%" }}
              />
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
                  onChange={setCity}
                  options={countryOptions}
                  placeholder="All"
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
                  placeholder="All"
                  style={{
                    width: "100%",
                  }}
                  onChange={setPropertyType}
                >
                  <Option value="">All</Option>
                  <Option value="Apartment">Apartment</Option>
                  <Option value="Villa">Villa</Option>
                  <Option value="Townhouse">Townhouse</Option>
                  <Option value="Penthouse">Penthouse</Option>
                  <Option value="Duplex">Duplex</Option>
                </Select>
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
                  onChange={setMaxPrice}
                  defaultValue={maxPrice}
                  min="0"
                  max="10000000"
                />
              </div>
            </div>
            <div
              id="searchButton"
              onClick={() => {
                goToProperties();
              }}
            >
              <SearchOutlined
                className="searchBarIcon"
                style={{ color: "#ffffff" }}
              />
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
            {isLoading ? (
              <div
                style={{
                  textAlign: "center",
                  width: "100%",
                  height: "20rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spin size="large" style={{ margin: "0 2rem 0 0 " }} />
              </div>
            ) : (
              <div className="properties">
                {properties.map((property, key) => (
                  <Link
                    className="property"
                    to={`../property/${property.objectId}`}
                  >
                    <img
                      src={`${property.images[0]}`}
                      alt="real_estate_image"
                    />

                    <div className="propertyLabel">
                      <h3 id={key}>{property.details.propertyTitle}</h3>
                      <p>
                        {property.details.location}
                        <img
                          src={location_icon_blue}
                          alt="location_icon_blue"
                        />
                      </p>
                    </div>
                    <div className="propertyDescription">
                      {shortenText(property.details.propertyDescription, 30)}
                    </div>
                    <div className="propertyPrice">
                      ${numberWithCommas(parseInt(property.listedPrice))}
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
}
export default Home;
