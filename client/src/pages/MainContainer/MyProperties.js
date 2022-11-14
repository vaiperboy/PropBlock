import React, { useState, useEffect } from "react";
import stats from "../../assets/etienne-beauregard-riverin.png";
import {
  message,
  Alert,
  notification,
  Checkbox,
  DatePicker,
  Upload,
  Select as SelectAnt,
  Modal,
  Radio,
} from "antd";

import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import "../../styling/MainContainer/CreateProperty.scss";
import { Input, Stepper, Select } from "@web3uikit/core";
import blueTick from "./assets/blue_tick.png";
import image from "../../assets/blue_tick.png";
import moment from "moment";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate } from "react-router-dom";
import Property_Card from "./Property_Card";

// import Moralis from "moralis-v1/types";
const console = require("console-browserify");
const { Dragger } = Upload;

const MyProperties = () => {
  //set this to false to display the current properties
  const [addPropertyView, setAddPropertyView] = useState(true);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [deedyr, setDeedyr] = useState("");
  const [type, setType] = useState("");
  const [deedno, setDeedno] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [propertyid, setPropertyId] = useState("");
  const [datesub, setDateSubmitted] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [apartno, setApartmentNo] = useState("");
  const [price, setPrice] = useState("");
  const [bednumber, setBedNumber] = useState(0);
  const [bathnumber, setBathNumber] = useState(0);
  const [occupNum, setOccupNumber] = useState(0);
  //freeParking = 1
  //hasPool = 2
  //freeParking & haspool = 3
  const [isfreeparking, setIsFreeParking] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hasKitchen, setHasKitchen] = useState(false);
  const [hasCoffee, setHasCoffee] = useState(false);
  const [hasWholeAccess, setHasWholeAccess] = useState(false);
  const [hasSecurity, setHasSecurity] = useState(false);
  const [hasTV, setHasTV] = useState(false);
  const [isfreewifi, setIsFreeWifi] = useState(false);
  const [hasRestaurant, setHasRestaurant] = useState(false);
  const [isValidated, setIsValidated] = useState(true);
  const [isValidatedSecond, setIsValidatedSecond] = useState(true);
  // const [isValidatedThird, setIsValidatedThird] = useState(false);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [titleDeedFile, setTitleDeedFile] = useState({});
  const [imageNames, setImageNames] = useState([]);

  const { user, ...rest } = useMoralis();
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  const clearState = () => {
    setAddress("");
    setFullName("");
    setDeedno("");
    setDeedyr("");
    setType("");
  };

  const validateInputFirst = (deedno, deedyr, type) => {
    try {
      const deednoReg = /[0-9]+([,.][0-9]+)?/;
      if (deedno === "") {
        message.error("Please fill deedno Input");
        return;
      } else if (deedyr === "") {
        message.error("Please fill deedyr Input");
        return;
      } else if (type === "") {
        message.error("Please fill type Input");
        return;
      } else if (!deednoReg.test(deedno)) {
        message.error("Invalid Deed No. Format. Must be only numbers.");
        return;
      } else setIsValidated(true);
    } catch (error) {}
  };

  const validateInputSecond = (datesub, street, area, apartno, price) => {
    const apartnoReg = /[0-9]+([,.][0-9]+)?/;
    try {
      if (
        datesub === "" ||
        street === "" ||
        area === "" ||
        apartno === "" ||
        price === ""
      ) {
        message.error("Please fill all Inputs");
        return;
      } else if (!apartnoReg.test(apartno) || !apartnoReg.test(price)) {
        message.error("Invalid Format, please only use numbers");
      } else setIsValidatedSecond(true);
    } catch (error) {}
  };

  const validateInputThird = (bednumber, bathnumber, occupancynum) => {
    try {
      if (occupancynum === 0) {
        message.error("Occupancy Number cant be 0");
      }
    } catch (error) {}
  };

  useEffect(() => {
    setEthAddress(user.get("ethAddress"));
    setEmailAddress(user.get("email"));
    setFullName(user.get("fullName"));
  }, [user]);
  let navigate = useNavigate();

  // html for upload button - images
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChangeImages = (info) => {
    console.log(info.fileList);
    const files = [];
    const names = [];
    info.fileList.forEach((e) => {
      files.push(e.originFileObj);
      names.push({
        value: e.name,
        label: e.name,
      });
    });
    setImageNames(names);
    setImageList(files);
  };

  // props for uploading files
  const propsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      setTitleDeedFile(info.file.originFileObj);
      console.log(titleDeedFile);
    },
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setPrimaryImageIndex(e.target.value);
  };

  const sampleProperties = [
    {
      id: 1,
      ownerAddress: "0xd1D3dB802977ee31062477E37a51B0BB452275f9",
      label: "Villa, Jumeirah",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "750,000",
      imageLocation: "realEstate_3-min.png",
    },
    {
      id: 2,
      ownerAddress: "0xd1D3dB802977ee31062477E37a51B0BB452275f9",
      label: "Smart Building Apartment",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "1,500,000",
      imageLocation: "realEstate_2-min.png",
    },
    {
      id: 2,
      ownerAddress: "0xd1D3dB802977ee31062477E37a51B0BB452275f9",
      label: "Smart Building Apartment",
      city: "Dubai",
      country: "UAE",
      description: "Set in exotic landscaped gardens",
      price: "1,500,000",
      imageLocation: "realEstate_2-min.png",
    },
  ];

  const makePrimaryImage = () => {
    //swapping
    let first = imageList[0];
    imageList[0] = imageList[primaryImageIndex];
    imageList[primaryImageIndex] = first;
  };

  // properties view
  if (addPropertyView) {
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
            <p className="rightsidebar_title">My Properties</p>
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
          <div
            style={{
              height: "60px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "30px",
              borderRadius: "8px",
              flexWrap: "wrap",
            }}
          >
            <div className="property-card">
              {sampleProperties.map((property, i) => (
                <Property_Card props={property} />
              ))}
              <div
                onClick={() => setAddPropertyView(false)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "fit-content",
                  height: "28rem",
                }}
              >
                <svg
                  className="add-property-sign"
                  width="77"
                  height="77"
                  viewBox="0 0 77 77"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="38.5"
                    cy="38.5"
                    r="38"
                    fill="white"
                    stroke="#3DAEEE"
                  />
                  <path
                    d="M50.1667 39.6667H40.6667V49.1667H37.5V39.6667H28V36.5H37.5V27H40.6667V36.5H50.1667V39.6667Z"
                    fill="#3DAEEE"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    // creating a property view
  } else {
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
            marginTop: 20,
            height: "auto",
          }}
        >
          <div className="create-property">
            <div className="container">
              <div className="containerchild">
                <Stepper
                  style={{
                    position: "relative",
                  }}
                  onComplete={() => console.log("TTEST")}
                  step={1}
                  hasNavButtons={false}
                  stepData={[
                    {
                      content: (
                        <div className="fullform">
                          <div className="inputs-container">
                            <div className="input-item">
                              <label for="InputAddress">Owner's Address</label>
                              <Input
                                type="text"
                                id="InputAddress"
                                className="ethAddressInput"
                                name="address"
                                placeholder={`${
                                  ethAddress.slice(0, 6) +
                                  "..." +
                                  ethAddress.slice(25, 35)
                                }`}
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                                validation={{
                                  readOnly: true,
                                }}
                                disabled="true"
                                style={{
                                  backgroundColor: "#9fcbe4",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="InputName">Owner's Name</label>
                              <Input
                                type="text"
                                id="InputName"
                                name="name"
                                className="fullNameInput"
                                placeholder={`${fullName}`}
                                onChange={(e) => {
                                  setFullName(e.target.value);
                                }}
                                validation={{
                                  readOnly: true,
                                }}
                                disabled="true"
                                style={{
                                  backgroundColor: "#9fcbe4",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="InputDeedno">Title Deed No.</label>
                              <Input
                                openByDefault
                                id="InputDeedno"
                                name="titleno"
                                placeholder="#789456"
                                value={deedno}
                                onChange={(e) => {
                                  setDeedno(e.target.value);
                                  setIsValidated(false);
                                }}
                                validation={{
                                  required: true,
                                  regExp: "[0-9]+([,.][0-9]+)?",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="type">Title Deed Year</label>
                              <Input
                                type="month"
                                id="titleyr"
                                name="titleyr"
                                placeholder="..."
                                value={deedyr}
                                onChange={(e) => {
                                  setDeedyr(e.target.value);
                                  setIsValidated(false);
                                }}
                                validation={{
                                  required: true,
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="property-type">Property Type</label>
                              <div>
                                <Select
                                  id="property-type"
                                  name="property-type"
                                  className="selectPropertyType"
                                  placeholder="None"
                                  style={{
                                    minWidth: "75%",
                                    marginRight: "22%",
                                  }}
                                  onChange={(e) => {
                                    console.log(e.id);
                                    setType(e.id);
                                    setIsValidated(false);
                                  }}
                                  validation={{
                                    required: true,
                                  }}
                                  options={[
                                    {
                                      id: "villa",
                                      label: "Villa",
                                    },
                                    {
                                      id: "townhouse",
                                      label: "Townhouse",
                                    },
                                    {
                                      id: "apartment",
                                      label: "Apartment",
                                    },
                                    {
                                      id: "penthouse",
                                      label: "Penthouse",
                                    },
                                    {
                                      id: "duplex",
                                      label: "Duplex",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="buttons-container">
                            <button
                              className="prevButton"
                              onClick={() => setAddPropertyView(true)}
                              style={{
                                padding: "0.5rem 2rem",
                                height: "fit-content",
                              }}
                            >
                              Go Back
                            </button>

                            {isValidated && (
                              <button
                                id="validateButton"
                                className="validatebtn"
                                text="Validate"
                                onClick={() =>
                                  validateInputFirst(deedno, deedyr, type)
                                }
                              >
                                Validate
                              </button>
                            )}

                            <button
                              id="next"
                              className="nextButton  "
                              text="Next"
                              onClick={() =>
                                validateInputFirst(deedno, deedyr, type)
                              }
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      ),
                      title: "",
                    },
                    {
                      content: (
                        <div className="fullform">
                          <div className="inputs-container">
                            <div className="input-item">
                              <label for="prop-id">Property ID</label>
                              <Input
                                type="text"
                                id="prop-id"
                                name="propertyid"
                                className="propertyIdInput"
                                placeholder={`${propertyid}`}
                                value={propertyid}
                                onChange={(e) => {
                                  setPropertyId(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                disabled
                                style={{
                                  backgroundColor: "#9fcbe4",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="InputName">Owner's Email</label>
                              <Input
                                type="text"
                                id="InputName"
                                name="name"
                                className="emailAddressInput"
                                placeholder={`${emailAddress}`}
                                onChange={(e) => {
                                  setEmailAddress(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                disabled
                                style={{
                                  backgroundColor: "#9fcbe4",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="InputDeedno">Owner's Address</label>
                              <Input
                                type="text"
                                id="InputDeedno"
                                name="titleno"
                                className="ethAddressInput"
                                placeholder={`${
                                  ethAddress.slice(0, 6) +
                                  "..." +
                                  ethAddress.slice(25, 35)
                                }`}
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                disabled
                                style={{
                                  backgroundColor: "#9fcbe4",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="datesub">Date Submitted</label>
                              <DatePicker
                                format="DD - MM - YYYY"
                                disabledDate={disabledDate}
                                id="datesub"
                                name="datesub"
                                className="datePicker"
                                style={
                                  {
                                    // padding: "0.5rem 4rem"
                                  }
                                }
                                onChange={(e) => {
                                  setDateSubmitted(e._d);
                                  setIsValidatedSecond(false);
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="street">Street Name</label>
                              <Input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Sheikh Mohammed Bin Zayed Str"
                                value={street}
                                onChange={(e) => {
                                  setStreet(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                validation={{
                                  required: true,
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="type">Area</label>
                              <Input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="Al Barari"
                                value={area}
                                onChange={(e) => {
                                  setArea(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                validation={{
                                  required: true,
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="type">Apartment No.</label>
                              <Input
                                type="text"
                                id="apartno"
                                name="apartno"
                                placeholder="123"
                                value={apartno}
                                onChange={(e) => {
                                  setApartmentNo(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                validation={{
                                  required: true,
                                  regExp: "[0-9]+([,.][0-9]+)?",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="type">Listing Price</label>
                              <Input
                                type="text"
                                id="price"
                                name="price"
                                placeholder="999 AED"
                                value={price}
                                onChange={(e) => {
                                  setPrice(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                validation={{
                                  regExp: "[0-9]+([,.][0-9]+)?",
                                  required: true,
                                }}
                              />
                            </div>
                          </div>
                          <div className="buttons-container">
                            <button
                              className="prevButton"
                              id="prev"
                              onClick={() => (
                                setIsValidated(false), setType("")
                              )}
                              style={{
                                padding: "0.5rem 2rem",
                                height: "fit-content",
                              }}
                            >
                              Back
                            </button>
                            {!isValidatedSecond && (
                              <button
                                id="next"
                                className="validatebtn"
                                text="Validate"
                                onClick={() =>
                                  validateInputSecond(
                                    datesub,
                                    street,
                                    area,
                                    apartno,
                                    price
                                  )
                                }
                              >
                                Validate
                              </button>
                            )}
                            {isValidatedSecond && (
                              <button
                                id="next"
                                className="nextButton  "
                                text="Next"
                                onClick={() =>
                                  validateInputSecond(
                                    datesub,
                                    street,
                                    area,
                                    apartno,
                                    price
                                  )
                                }
                              >
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="fullform-third">
                          <div className="inputs-container">
                            <p style={{ fontWeight: "600", fontSize: "2rem" }}>
                              Enter Additional Property Details
                            </p>
                            <div className="first-container">
                              <div className="label-container">
                                <label for="NumberofBeds">No. of Beds</label>
                                <Input
                                  type="number"
                                  id="NumberofBeds"
                                  name="NumberofBeds"
                                  placeholder="0"
                                  value={bednumber}
                                  onChange={(e) => {
                                    setBedNumber(e.target.value);
                                  }}
                                  validation={{
                                    required: true,
                                  }}
                                  style={{
                                    maxWidth: "9rem",
                                    minWidth: "9rem",
                                  }}
                                ></Input>
                              </div>

                              <div className="label-container">
                                <label for="NumberofBathrooms">
                                  No. of Bathrooms
                                </label>
                                <Input
                                  type="number"
                                  id="NumberofBathrooms"
                                  name="NumberofBathrooms"
                                  placeholder="0"
                                  value={bathnumber}
                                  onChange={(e) => {
                                    setBathNumber(e.target.value);
                                  }}
                                  validation={{
                                    required: true,
                                  }}
                                  style={{
                                    maxWidth: "9rem",
                                    minWidth: "9rem",
                                  }}
                                ></Input>
                              </div>

                              <div className="label-container">
                                <label for="occupancynum">Occupancy No.</label>
                                <Input
                                  type="number"
                                  id="occupancynum"
                                  name="occupancynum"
                                  placeholder="0"
                                  value={occupNum}
                                  onChange={(e) => {
                                    setOccupNumber(e.target.value);
                                  }}
                                  validation={{
                                    required: true,
                                  }}
                                  style={{
                                    maxWidth: "9rem",
                                    minWidth: "9rem",
                                  }}
                                ></Input>
                              </div>
                            </div>
                            <p
                              style={{
                                fontWeight: "600",
                                fontSize: "2rem",
                                margin: "3rem 0 2rem 0",
                              }}
                            >
                              Check The Facilities that Apply
                            </p>
                            <div className="icons-container">
                              <div className="icons-row">
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/pic1.png")}
                                  ></img>
                                  <label for="freeparking">Free Parking</label>
                                  <Input
                                    type="checkbox"
                                    id="freeparking"
                                    name="freeparking"
                                    value={isfreeparking}
                                    onChange={(e) => {
                                      setIsFreeParking(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture2.png")}
                                  ></img>
                                  <label for="freewifi">Free Wifi</label>
                                  <Input
                                    type="checkbox"
                                    id="freewifi"
                                    name="freewifi"
                                    value={isfreewifi}
                                    onChange={(e) => {
                                      setIsFreeWifi(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />{" "}
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture3.png")}
                                  ></img>
                                  <label for="restaurant">Restaurant</label>
                                  <Input
                                    type="checkbox"
                                    id="restaurant"
                                    name="restaurant"
                                    value={hasRestaurant}
                                    onChange={(e) => {
                                      setHasRestaurant(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="icons-row">
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture5.png")}
                                  ></img>{" "}
                                  <label for="kitchen">Kitchen</label>
                                  <Input
                                    type="checkbox"
                                    id="kitchen"
                                    name="kitchen"
                                    value={hasKitchen}
                                    onChange={(e) => {
                                      setHasKitchen(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />{" "}
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture6.png")}
                                  ></img>{" "}
                                  <label for="coffee">Coffee Maker</label>
                                  <Input
                                    type="checkbox"
                                    id="coffee"
                                    name="coffee"
                                    value={hasCoffee}
                                    onChange={(e) => {
                                      setHasCoffee(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />{" "}
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture7.png")}
                                  ></img>{" "}
                                  <label for="access">24 Hour Access</label>
                                  <Input
                                    type="checkbox"
                                    id="access"
                                    name="access"
                                    value={hasWholeAccess}
                                    onChange={(e) => {
                                      setHasWholeAccess(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="icons-row">
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture8.png")}
                                  ></img>{" "}
                                  <label for="security">Security</label>
                                  <Input
                                    type="checkbox"
                                    id="security"
                                    name="security"
                                    value={hasSecurity}
                                    onChange={(e) => {
                                      setHasSecurity(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture4.png")}
                                  ></img>{" "}
                                  <label for="pool">Swimming Pool</label>
                                  <Input
                                    type="checkbox"
                                    id="pool"
                                    name="pool"
                                    value={hasPool}
                                    onChange={(e) => {
                                      setHasPool(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                                <div className="facility">
                                  <img
                                    alt=""
                                    className="facilityIcon"
                                    src={require("../../assets/Picture9.png")}
                                  ></img>
                                  <label for="tv">TV</label>
                                  <Input
                                    type="checkbox"
                                    id="tv"
                                    name="tv"
                                    value={hasTV}
                                    onChange={(e) => {
                                      setHasTV(e.target.value);
                                    }}
                                    style={{
                                      outline: "none",
                                      maxWidth: "6rem",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="buttons-container">
                            <div className="col-75">
                              <button
                                className="prevButton btn-submit reset"
                                id="prev"
                                style={{
                                  padding: "0.5rem 2rem",
                                  height: "fit-content",
                                }}
                              >
                                {" "}
                                Back
                              </button>
                            </div>
                            <div className="col-25">
                              {
                                <button
                                  id="next"
                                  className="nextButton"
                                  text="Validate"
                                  onClick={() =>
                                    validateInputFirst(deedno, deedyr, type)
                                  }
                                >
                                  {" "}
                                  Validate
                                </button>
                              }

                              {/* {isValidated && (
                                <button
                                  id="next"
                                  className="nextButton  "
                                  text="Next"
                                  onClick={() =>
                                    validateInputFirst(deedno, deedyr, type)
                                  }
                                >
                                  Next
                                </button>
                              )} */}
                            </div>
                          </div>
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="fullform">
                          <div className="inputs-container">
                            <p>
                              Upload the required title deed and images for your
                              property. Make sure that the images are high
                              quality for better viewing. You can upload upto 8
                              images for your property.
                            </p>
                            <p
                              className="text upload"
                              style={{ marginTop: "3rem" }}
                            >
                              Upload Title Deed
                            </p>
                            <div>
                              <Dragger
                                {...propsDragger}
                                className="uploadFiles"
                              >
                                <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                  Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                  Support for a single or bulk upload.
                                </p>
                              </Dragger>
                            </div>
                            <br></br>
                            <p className="text upload">
                              Upload Images (Max - 5)
                            </p>
                            <div>
                              <Upload
                                action=""
                                onChange={handleChangeImages}
                                multiple={true}
                                listType="picture-card"
                                accept=".png, .jpeg, .jpg"
                                maxCount={5}
                                multiple={true}
                                className="uploadImages"
                              >
                                {uploadButton}
                              </Upload>
                            </div>
                            {imageNames.length > 0 ? (
                              <div className="primaryImage">
                                <h1>
                                  Select the primary image from the list for
                                  display
                                </h1>
                                <SelectAnt
                                  defaultValue="none"
                                  style={{
                                    width: "fit-content",
                                  }}
                                  onChange={onChange}
                                  options={imageNames}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="buttons-container">
                            <button
                              className="prevButton btn-submit reset"
                              id="prev"
                              style={{
                                padding: "0.5rem 2rem",
                                height: "fit-content",
                              }}
                            >
                              {" "}
                              Back
                            </button>
                            {!isValidatedSecond && (
                              <button
                                id="next"
                                className="validatebtn"
                                text="Validate"
                                onClick={() => {
                                  validateInputThird(occupNum);
                                  makePrimaryImage();
                                }}
                              >
                                {" "}
                                Validate
                              </button>
                            )}

                            {isValidatedSecond && (
                              <button
                                id="next"
                                className="nextButton  "
                                text="Next"
                                onClick={() => validateInputThird(occupNum)}
                              >
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="fullform">
                          <div className="checkimage">
                            {<img src={image} alt=""></img>}
                          </div>
                          <p className="text done">
                            Your property was created Successfully!
                          </p>
                          <div id="dashboardend">
                            <button
                              className="nextButton btn-submit end"
                              id=""
                              style={{}}
                              onClick={() => {
                                window.location.reload(false);
                              }}
                            >
                              Finish
                            </button>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MyProperties;
