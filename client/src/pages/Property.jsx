import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Image, Button, message, Modal } from "antd";
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
import coffeee_icon from "../assets/coffee_icon.png";
import wifi_icon from "../assets/wifi_icon.png";
import swimming_pool_icon from "../assets/swimming_icon.png";
import tv_access_icon from "../assets/tv_icon.png";
import security_icon from "../assets/security_icon.png";
import parking_icon from "../assets/parking_icon.png";
import kitchen_icon from "../assets/kitchen_icon.png";
import access_24_icon from "../assets/24_access_icon.png";
import NoMatch from "./NoMatch";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import Web3 from "web3";
const console = require("console-browserify");

const Property = (props) => {
  const {
    objectId
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

  const [property, setProperty] = useState({})
  const { save } = useNewMoralisObject("PurchaseRequest");

  // state vars
  const [visible, setVisible] = useState(false);

  // parking, kitchen, security, wifi, coffee, 24_access, washing, swimming, tv
  const [freeParkingFacility, setFreeParkingFacility] = useState(false);
  const [kitchenFacility, setKitchenFacility] = useState(false);
  const [securityFacility, setSecurityFacility] = useState(false);
  const [wifiFacility, setWifiFacility] = useState(false);
  const [coffeeFacility, setCoffeeFacility] = useState(false);
  const [access24Facility, setAccess24Facility] = useState(false);
  const [swimmingFacility, setSwimmingFacility] = useState(false);
  const [tvFacility, setTvFacility] = useState(false);
  const [tempFacilities, setTempFacilities] = useState(5);
  const [isPropertySaved, setIsPropertySaved] = useState(false);

  const handleFacilities = (faciltiesNum) => {
    try {
      if (faciltiesNum & 1) {
        setFreeParkingFacility(true);
      }
      if (faciltiesNum & 2) {
        setKitchenFacility(true);
      }
      if (faciltiesNum & 4) {
        setSecurityFacility(true);
      }
      if (faciltiesNum & 8) {
        setWifiFacility(true);
      }
      if (faciltiesNum & 16) {
        setCoffeeFacility(true);
      }
      if (faciltiesNum & 64) {
        setSwimmingFacility(true);
      }
      if (faciltiesNum & 128) {
        setAccess24Facility(true);
      }
      if (faciltiesNum & 256) {
        setTvFacility(true);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const [isPropertyFound, setIsPropertyFound] = useState(true)
  const [isLoading, setIsLoading] = useState(true)


  const fetchProperty = async () => {
    setIsLoading(true)
    try {
      fetch(
        "http://localhost:9000/getProperty?" +
        new URLSearchParams({
          objectId: objectId
        })
      )
        .then((res) => {
          if (res.status !== 200) throw new Error(res.status)
          else {
            setIsPropertyFound(true)
            return res.json()
          }
        })
        .then((res) => {
          setProperty(res)
          handleFacilities(res.details.facilities)
        })
        .catch((err) => {
          setIsPropertyFound(false)
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProperty()
  }, []);

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
    var userAddress = Web3.utils.toChecksumAddress(user.get("ethAddress"))
    if (userAddress == property.address) {
      message.error("You own this property. You cannot send a request to yourself!")
      return
    }

    const users = Moralis.Object.extend("PurchaseRequest");
    const query = new Moralis.Query(users);
    query.equalTo("requesterEthAddress", userAddress);
    query.equalTo("propertyObjectId", objectId);
    query.limit(1);
    query.withCount();
    const _result = await query.find();
    if (_result.count > 0) {
      message.error("You already have a request with this seller!");
      return;
    }

    message.info("Sending request to seller!");
    const data = {
      sellerEthAddress: Web3.utils.toChecksumAddress(property.address),
      requesterEthAddress: userAddress,
      propertyObjectId: objectId,
      isPending: true,
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

  const ModalInfo = () => {
    if (isLoading) return;
    Modal.info({
      title: "",
      width: 650,
      content: (
        <div>
          <p
            style={{
              fontWeight: "bold",
              marginTop: "2rem",
              fontSize: "1.5rem",
            }}
          >
            Owner Address: <span style={{ fontWeight: "400" }}>{property.address}</span>
          </p>
          <p
            style={{
              fontWeight: "bold",
              marginTop: "2rem",
              fontSize: "1.5rem",
            }}
          >
          </p>
        </div>
      ),
      onOk() { },
    });
  };

  const saveProperty = () => {
    if (isPropertySaved) {
      message.success("Property removed from Favorites");
      setIsPropertySaved(false);
    } else {
      message.success("Property Saved to Favorites");
      setIsPropertySaved(true);
    }
  };

  const commafy = (num) => {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }


  const navigate = useNavigate();
  return (
    <div>
      {
        (!isLoading) ? (
          <>
            {
              (isPropertyFound) ? (
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
                      <div className="propertyTitle">{property.details.propertyTitle}</div>
                      <div className="propertyLocation">
                        <img src={location_icon_blue} alt="location_blue_icon" />
                        <h3 className="locationDetails">
                          {property.details.location}
                        </h3>
                        <p>show on map</p>
                      </div>
                    </div>
                    <div className="imagesSection">
                      <Image.PreviewGroup>
                        {property.images.map((property, key) => {
                          if (key === 0)
                            return (
                              <Image
                                src={property}
                                id="firstImage"
                              />
                            );
                        })}
                        {property.images.map((property, key) => {
                          if (key === 1)
                            return (
                              <Image
                                src={property}
                                id="secondImage"
                                placeholder="real image"
                              />
                            );
                        })}
                        {property.images.map((property, key) => {
                          if (key === 2)
                            return (
                              <Image
                                src={property}
                                id="propertyImages"
                                placeholder="real image"
                              />
                            );
                        })}
                        {property.images.map((property, key) => {
                          if (key !== 0 && key !== 1 && key !== 2)
                            return (
                              <Image
                                src={property}
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
                              {!isPropertySaved ? (
                                <button
                                  className="save"
                                  onClick={() => {
                                    saveProperty();
                                  }}
                                >
                                  <div className="icon">
                                    <HeartOutlined />
                                  </div>
                                  Save
                                </button>
                              ) : (
                                <button
                                  className="saved"
                                  onClick={() => {
                                    saveProperty();
                                  }}
                                >
                                  <div className="icon">
                                    <HeartOutlined />
                                  </div>
                                  Saved
                                </button>
                              )}
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
                              <p>{property.details.bedsNumber} Beds</p>
                            </div>
                            <div className="infoSection">
                              <img src={bath_icon} alt="bath_icon" />
                              <p>{property.details.bathsNumber} Baths</p>
                            </div>
                            <div className="infoSection">
                              <img src={people_icon} alt="people_icon" />
                              <p>{property.details.occupantsNumber} People</p>
                            </div>
                            <div className="infoSection">
                              <img src={area_icon} alt="area_icon" />
                              <p>{property.areaSize} sqft</p>
                            </div>
                          </div>
                          <div className="propertyDescription">
                            {property.details.propertyDescription}
                          </div>
                          <div className="propertyFacilities">
                            <div className="heading">Property Facilities</div>
                            <div className="facilitiesContainer">
                              <div className="column">
                                {freeParkingFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={parking_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Free Parking</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={parking_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Free Parking</div>
                                  </div>
                                )}
                                {wifiFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={wifi_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Free Wifi</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={wifi_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Free Wifi</div>
                                  </div>
                                )}
                                {swimmingFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img
                                        src={swimming_pool_icon}
                                        alt="Free Parking Icon"
                                      />
                                    </div>
                                    <div className="facilityTitle">Swimming Pool</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img
                                        src={swimming_pool_icon}
                                        alt="Free Parking Icon"
                                      />
                                    </div>
                                    <div className="facilityTitle">Swimming Pool</div>
                                  </div>
                                )}
                              </div>
                              <div className="column">
                                {kitchenFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={kitchen_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Kitchen</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={kitchen_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Kitchen</div>
                                  </div>
                                )}
                                {coffeeFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={coffeee_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Coffee Maker</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={coffeee_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Coffee Maker</div>
                                  </div>
                                )}
                                {access24Facility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={access_24_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">24 Hour Access</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={access_24_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">24 Hour Access</div>
                                  </div>
                                )}
                              </div>
                              <div className="column">
                                {securityFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={security_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Security</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={security_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">Security</div>
                                  </div>
                                )}
                                {tvFacility ? (
                                  <div className="row">
                                    <div className="image">
                                      <img src={tv_access_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">TV Access</div>
                                  </div>
                                ) : (
                                  <div className="row disabled">
                                    <div className="image">
                                      <img src={tv_access_icon} alt="Free Parking Icon" />
                                    </div>
                                    <div className="facilityTitle">TV Access</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rightSide">
                        <div className="ownerDetails">
                          <div className="propertyPriceSection">
                            <h1 className="price">AED {commafy(property.numericPrice)}</h1>
                          </div>
                          <p className="ownerDetailsHeading">Owner Details</p>
                          <div
                            className="owner"
                            onClick={() => {
                              ModalInfo();
                            }}
                          >
                            <img src={profile_icon} alt="profile_icon" />
                            <p>{property.address.slice(0, 5) + "..." + property.address.slice(27, 42)}</p>
                          </div>
                          <div className="userButtons">
                            <button className="emailButton" onClick={() => { }}>
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

              ) : <NoMatch />
            }
          </>
        ) : <>loading</>
      }
    </div>
  );
};

export default Property;
