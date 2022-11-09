import "../styling/Home/Home.scss";
import realEstate from "../artifacts/contracts/realEstate.sol/realEstate.json";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { message, Typography, AutoComplete, Select, InputNumber } from "antd";
// import { Loading } from "@web3uikit/core";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  TagOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  // useMoralisQuery,
  useMoralis,
  // useMoralisCloudFunction,
} from "react-moralis";
// import Title from "antd/lib/skeleton/Title";
// import PropertyFunc from "../Functions/PropertyFunc";

// -------
// Importing Images
// import HeroImage from "../assets/featuredimage-realestate-1@2x-min.png";
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

const items = [
  { value: "Dubai" },
  { value: "Abu Dhabi" },
  { value: "Ajman" },
  { value: "Sharjah" },
  { value: "Ras Al Khaimah" },
  { value: "Umm Al Quwain" },
];
const { ethereum } = window;
const axios = require("axios");
const bs58 = require("bs58");
const console = require("console-browserify");
const { ethers } = require("ethers");

function Home() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://eth-goerli.g.alchemy.com/v2/${API_KEY}`;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  const provider = new ethers.providers.JsonRpcProvider(API_URL);
  // Signer - this represents an Ethereum account that has the ability to sign transactions.
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  // Contract - this is an Ethers.js object that represents a specific contract deployed on-chain.
  const realEstateContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    realEstate.abi,
    signer
  );

  const {
    Moralis,
    isAuthenticated,
    authenticate,
    user,
    useMoralisCloudFunction,
  } = useMoralis();

  // const sendEmailToUser = async (email, name) => {
  //   const url = "www.google.com";
  //   const params = { email, url, name };
  //   const sendVerificationEmail = await Moralis.Cloud.run(
  //     "sendEmailToUser",
  //     params
  //   );
  // };

  // const { Title } = Typography;
  // const [address, setAddress] = useState("");
  const [addressForProperties, setAddressForProperties] = useState("");
  const [properties, setProperties] = useState([]);
  // const [name, setName] = useState();
  // const [email, setEmail] = useState();
  // const [propertyLandlordAddress, setPropertyLandlordAddress] = useState("");
  // const [streetNum, setStreetNum] = useState("");
  // const [area, setArea] = useState();
  // const [apartmentNum, setApartmentNum] = useState();
  // const [listedPrice, setListedPrice] = useState();
  // const [addressExists, setAddressExists] = useState(false);

  const [Loader, setLoader] = useState(false);

  const getOwner = async () => {
    try {
      const owner = await realEstateContract.owner();
      message.success("Owner: " + owner);
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  const checkAddress = (addr) => {
    if (addr === "") {
      message.error(
        "Address Input cannot be empty!\nPlease enter a valid address."
      );
      return false;
    }
    try {
      const newAddress = ethers.utils.getAddress(addr);
      const isAddr = ethers.utils.isAddress(newAddress);
      return true;
    } catch (error) {
      message.error(
        "Address entered is invalid!\nPlease enter a valid address."
      );
      return false;
    }
  };

  const checkLandlordExists = async (addr) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      const landlords = Moralis.Object.extend("Landlords");
      const query = new Moralis.Query(landlords);
      query.equalTo("landlordAddress", addr.toLowerCase());
      query.select("landlordAddress");
      const results = await query.find();
      if (results.length == 0) {
        return false;
      } else {
        message.error(
          "Landlord already exists with this address (" + addr + ")"
        );
        return true;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const checkWalletConnected = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        return true;
      } else {
        return false;
      }
    }
  };

  const createNewLandlord = async (addr) => {
    try {
      let realEstateDappContract;
      //input error handling
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }
      if (!checkAddress(addr)) {
        return;
      }
      let exists = await checkLandlordExists(addr);
      if (exists) {
        return;
      }
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        // connected
        if (accounts.length) {
          //set up transaction parameters
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const walletAddress = accounts[0]; // first account in MetaMask
          const signerNew = provider.getSigner(walletAddress);
          realEstateDappContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            realEstate.abi,
            signerNew
          );
          await realEstateDappContract.addLandlord(addr);
          message.success(
            "Landlord with address " + addr + " is added successfully."
          );
          // not connected
        } else {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          //set up transaction parameters
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const walletAddress = accounts[0]; // first account in MetaMask
          const signerNew = provider.getSigner(walletAddress);
          realEstateDappContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            realEstate.abi,
            signerNew
          );
          await realEstateDappContract.addLandlord(addr);
          message.success(
            "Landlord with address " + addr + " is added successfully."
          );
        }
      }
    } catch (error) {
      if (error.code === 4001) {
        message.error("Error " + error.code + ": " + error.message);
      } else {
        message.error("Error: " + error.code);
      }
    }
  };

  const addLandlord = async (addr) => {
    if (!checkAddress(addr)) {
      return;
    }
    let exists = await checkLandlordExists(addr);
    if (exists) {
      return;
    }
    await realEstateContract.addLandlord(addr);
    message.success(
      "User with address (" + addr.slice(0, 10) + "...) is added successfully"
    );
  };

  const createNewLandlordWithMoralis = async (addr) => {
    try {
      let realEstateDappContract;
      //input error handling
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }
      if (!checkAddress(addr)) {
        return;
      }
      let exists = await checkLandlordExists(addr);
      if (exists) {
        console.log("Landlord exists", addr);
        return;
      }
      if (!isAuthenticated) {
        await authenticate().then(function (user) {
          console.log(user.get("ethAddress"));
          // const accounts = await ethereum.request({
          //       //   method: "eth_requestAccounts",
          //       // });
          //     //set up transaction parameters
          //     const provider = new ethers.providers.Web3Provider(window.ethereum);
          //     const walletAddress = accounts[0]; // first account in MetaMask
          //     const signerNew = provider.getSigner(walletAddress);
          //     realEstateDappContract = new ethers.Contract(
          //       CONTRACT_ADDRESS,
          //       realEstate.abi,
          //       signerNew
          //     );
          //     await realEstateDappContract.addLandlord(addr);
          //     message.success(
          //       "Landlord with address " + addr + " is added successfully."
          //     );
        });
      } else {
        //set up transaction parameters
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const walletAddress = accounts[0]; // first account in MetaMask
        //     const signerNew = provider.getSigner(walletAddress);
        //     realEstateDappContract = new ethers.Contract(
        //       CONTRACT_ADDRESS,
        //       realEstate.abi,
        //       signerNew
        //     );
        //     await realEstateDappContract.addLandlord(addr);
        //     message.success(
        //       "Landlord with address " + addr + " is added successfully."
        //     );
      }
    } catch (error) {
      if (error.code === 4001) {
        message.error("Error " + error.code + ": " + error.message);
      } else {
        message.error("Error: " + error.code);
      }
    }
  };

  const getProperties = async () => {
    if (checkAddress(addressForProperties)) {
      try {
        // const results = await fetch();
        const landlords = Moralis.Object.extend("Properties");
        const query = new Moralis.Query(landlords);
        query.equalTo("landlordAddress", addressForProperties.toLowerCase());
        query.select("landlordAddress");
        const results = await query.find();
        await setProperties(results);
        message.success(
          "Successfully retreived properties for " + addressForProperties
        );
      } catch (error) {
        message.error("Error: " + error.message);
      }
    }
  };

  const getPropertiesUsingContract = async () => {
    if (checkAddress(addressForProperties)) {
      try {
        const counter = await realEstateContract.getLandlordCounter(
          addressForProperties
        );
        setProperties([]);
        for (let i = 1; i <= counter; i++) {
          let property = await realEstateContract.getProperty(
            addressForProperties,
            i
          );
          let _area = parseInt(property[1]._hex, 16);
          let _apartmentNo = parseInt(property[2]._hex, 16);
          let _listedPrice = parseInt(property[3]._hex, 16);
          const propertyObj = {
            landlordAddress: addressForProperties,
            propertyId: i,
            streetName: property[0],
            area: _area,
            apartmentNo: _apartmentNo,
            listedPrice: _listedPrice,
          };
          setProperties((properties) => [...properties, propertyObj]);
        }
      } catch (error) {
        message.error("Error1: " + error.message);
      }
    }
  };

  const onlyNumbers = (str) => {
    if (str.match(/^[0-9]+$/) == null) {
      return false;
    }
    return true;
  };

  // const addProperty = async () => {
  //   if (checkAddress(propertyLandlordAddress)) {
  //     if (
  //       streetNum == "" ||
  //       area == "" ||
  //       apartmentNum == "" ||
  //       listedPrice == ""
  //     ) {
  //       message.error("Invalid input! Please fill in all the field required.");
  //       return;
  //     }
  //     if (
  //       !onlyNumbers(area) ||
  //       !onlyNumbers(apartmentNum) ||
  //       !onlyNumbers(listedPrice)
  //     ) {
  //       message.error("Invalid Input! Enter the values in correct format.");
  //       return;
  //     }
  //     try {
  //       const tempArea = parseInt(area);
  //       const tempApartmentNum = parseInt(apartmentNum);
  //       const tempListedPrice = parseInt(listedPrice);
  //       await realEstateContract.createPropertyListing(
  //         propertyLandlordAddress,
  //         streetNum,
  //         tempArea,
  //         tempApartmentNum,
  //         tempListedPrice
  //       );
  //       message.success(
  //         "Property added for landlord (address: " +
  //           propertyLandlordAddress +
  //           ")"
  //       );
  //     } catch (error) {
  //       message.error("Error: " + error.message);
  //     }
  //   }
  // };

  const testLoading = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  const uploadMetaDataToIPFS = async () => {
    try {
      if (!isAuthenticated) {
        message.error("Error: You have to be authenticated to upload to IPFS.");
        return;
      }
      const user = { name: "James", id: "1", location: "Texas" };
      const file = new Moralis.File("file.json", {
        base64: btoa(JSON.stringify(user)),
      });
      await file.saveIPFS();
      const link = file.ipfs();
      const hash = link.split("/", 5)[4];
      console.log("hash: " + hash);
      console.log("link: " + link);

      axios
        .get(link)
        .then(function (response) {
          // handle success
          console.log(response.data);
          console.log(link);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  const getLocationValue = () => {
    let x = document.getElementById("locationInput").value;
    if (x === "") {
      console.log("Value is empty");
      return;
    }
    console.log("x = ", x);
  };

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
      <Navbar signedIn2={isAuthenticated} />
      <main>
        <div className="heroSection">
          <div className="leftSide">
            <div className="dottedLine"></div>
            <div>
              <h1>
                Find your dream home, <br /> the <span>Web3</span> way!
              </h1>
              <h5>
                Harness the real power of smart contracts and find your dream
                home.
              </h5>
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
            <h1>User Testomonials</h1>
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
