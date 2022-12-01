import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Image, Button, message } from "antd";
import {
  HeartOutlined,
  ShareAltOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../styling/Property/property.scss";

// Icons and images
import location_icon_blue from "../assets/location-icon-blue.png";
import bed_icon from "../assets/bed-icon.svg";
import bath_icon from "../assets/bath-icon.svg";
import people_icon from "../assets/people-icon.svg";
import area_icon from "../assets/area-icon.svg";
import profile_icon from "../assets/profile-icon.png";
import mail_icon from "../assets/mail-icon.svg";
import { useMoralis, useNewMoralisObject } from "react-moralis";

const console = require("console-browserify");

const Property = () => {
  const {
    address,
    ownerId,
    // title,
    // location,
    // city,
    // country,
    // beds,
    // baths,
    // people,
    // area,
    // price,
  } = useParams();
  const {
    setUserData,
    authenticate,
    signup,
    isAuthenticated,
    isAuthenticating,
    isUnauthenticated,
    user,
    account,
    logout,
    oralis,
    isInitialized,
    Moralis,
    ...rest
  } = useMoralis();
  const title = "Arabian Ranches | Golf Course Views - Dubai";
  const locationArea = "Arabian Ranches";
  const city = "Dubai";
  const country = "UAE";
  const beds = "3";
  const baths = "4";
  const people = "5";
  const area = "2,500";
  const price = "1,500,000";
  const ownerID = "0x0F7fe90b325C9A5837C968543E8EB1632Fa37771";
  const propertyObjectId = "y7dM24zgRcYAs68Hs03FMSki";
  const { save } = useNewMoralisObject("PurchaseRequest");

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log("visible", visible);
  }, [visible]);

  const tempImageArray = [
    {
      imageLocation: "realEstate_3-min.png",
    },
    {
      imageLocation: "realEstateProperty2.jpg",
    },
    {
      imageLocation: "realEstateProperty3.jpg",
    },

    {
      imageLocation: "realEstateProperty4.jpg",
    },

    {
      imageLocation: "realEstateProperty5.jpg",
    },
  ];

  const requestPurchase = async () => {
    const users = Moralis.Object.extend("PurchaseRequest");
    const query = new Moralis.Query(users);
    query.equalTo("requesterEthAddress", user.get("ethAddress").toLowerCase());
    query.equalTo("propertyObjectId", propertyObjectId);

    query.limit(1);
    query.withCount();
    const results = await query.find();
    if (results.count > 0) {
      message.error("You already have a request with this seller!");
      return;
    }

    message.info("Sending request to seller!");
    const data = {
      sellerEthAddress: ownerID,
      requesterEthAddress: user.get("ethAddress"),
      propertyObjectId: propertyObjectId,
      isPending: true
    };

    save(data, {
      onSuccess: (obj) => {
        message.success("Request sent to seller!");
      },
      onError: (error) => {
        message.error("Couldn't send request!");
        message.error(error.message);
        console.log(error);
      },
    });
  };

  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="propertyStyling">
        <div
          className="backButton"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftOutlined /> Back
        </div>
        <div className="titleSection">
          <div className="propertyTitle">{title}</div>
          <div className="propertyLocation">
            <img src={location_icon_blue} alt="location_blue_icon" />
            <h3 className="locationDetails">
              {locationArea} - {city}, {country}
            </h3>
            <p onClick={() => navigate(-1)}>show on map</p>
          </div>
        </div>
        <div className="imagesSection">
          <Image.PreviewGroup>
            {tempImageArray.map((property, key) => {
              if (key === 0)
                return (
                  <Image
                    src={require(`../assets/${property.imageLocation}`)}
                    id="firstImage"
                  />
                );
            })}
            {tempImageArray.map((property, key) => {
              if (key === 1)
                return (
                  <Image
                    src={require(`../assets/${property.imageLocation}`)}
                    id="secondImage"
                    placeholder="real image"
                  />
                );
            })}
            {tempImageArray.map((property, key) => {
              if (key === 2)
                return (
                  <Image
                    src={require(`../assets/${property.imageLocation}`)}
                    id="propertyImages"
                    placeholder="real image"
                  />
                );
            })}
            {tempImageArray.map((property, key) => {
              if (key !== 0 && key !== 1 && key !== 2)
                return (
                  <Image
                    src={require(`../assets/${property.imageLocation}`)}
                    style={{ display: "none" }}
                    preview={{
                      visible,
                      onVisibleChange: (value) => {
                        setVisible(value);
                      },
                    }}
                  />
                );
            })}
          </Image.PreviewGroup>
        </div>
        <div className="loadMoreButton">Load more</div>
        <div className="aboutProperty">
          <div className="leftSide">
            <div className="propertyInformation">
              <div className="topSection">
                <h3>About this property</h3>
                <div className="saveAndShareButtons">
                  <button className="save">
                    <div className="icon">
                      <HeartOutlined />
                    </div>
                    save
                  </button>
                  <button className="share">
                    <div className="icon">
                      <ShareAltOutlined />
                    </div>
                    share
                  </button>
                </div>
              </div>
              <div className="propertyFeatures">
                <div className="infoSection">
                  <img src={bed_icon} alt="bed_icon" />
                  <p>{beds} Beds</p>
                </div>
                <div className="infoSection">
                  <img src={bath_icon} alt="bath_icon" />
                  <p>{baths} Baths</p>
                </div>
                <div className="infoSection">
                  <img src={people_icon} alt="people_icon" />
                  <p>{people} People</p>
                </div>
                <div className="infoSection">
                  <img src={area_icon} alt="area_icon" />
                  <p>{area} sqft</p>
                </div>
              </div>
              <div className="propertyDescription">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                alias nemo nobis quos. Totam modi enim dignissimos praesentium
                id provident!
                <br /> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                minima nihil, soluta, molestias aut ab modi libero
                exercitationem cumque, ut deleniti accusamus quae ad enim illum?
                Debitis consectetur cum officia qui, libero molestias
                asperiores. Exercitationem quia aut asperiores tenetur ab.
              </div>
            </div>
          </div>
          <div className="rightSide">
            <div className="ownerDetails">
              <div className="owner">
                <img src={profile_icon} alt="profile_icon" />
                <p>{ownerID.slice(0, 5) + "..." + ownerID.slice(27, 42)}</p>
              </div>
              <div className="propertyPriceSection">
                <p>Property Price</p>
                <h1 className="price">$ {price}</h1>
              </div>
              <div className="userButtons">
                <button className="emailButton" onClick={() => {}}>
                  <p>Email</p>
                  <img src={mail_icon} alt="mail_icon" />
                </button>
                <button
                  className="requestPurchaseButton"
                  onClick={requestPurchase}
                >
                  Request Purchase
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Property;
