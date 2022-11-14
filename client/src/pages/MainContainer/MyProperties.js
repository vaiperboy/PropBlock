import React, { useState, useEffect } from "react";
import stats from "../../assets/etienne-beauregard-riverin.png";
import {
  message,
  Alert,
  notification,
  Checkbox,
  DatePicker,
  Upload,
  InputNumber,
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
import { useFiatBuy, useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate } from "react-router-dom";
import Property_Card from "./Property_Card";

// import Moralis from "moralis-v1/types";
const console = require("console-browserify");
const { Dragger } = Upload;

const MyProperties = () => {
  //set this to false to display the current properties

  // validated
  const [addPropertyView, setAddPropertyView] = useState(true);

  // step - 1
  const [address, setAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [deedno, setDeedno] = useState("");
  const [deedyr, setDeedyr] = useState("");
  const [type, setType] = useState("");
  const [isValidatedFirst, setIsValidatedFirst] = useState(false);

  // step - 2
  const [propertyid, setPropertyId] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [street, setStreet] = useState("");
  const [area, setArea] = useState("");
  const [apartno, setApartmentNo] = useState("");
  const [price, setPrice] = useState("");
  const [isValidatedSecond, setIsValidatedSecond] = useState(false);

  // step - 3
  const [bednumber, setBedNumber] = useState(1);
  const [bathnumber, setBathNumber] = useState(0);
  const [occupNum, setOccupNumber] = useState(1);
  const [facilities, setFacilities] = useState({
    parking: false,
    kitchen: false,
    security: false,
    freeWifi: false,
    coffee: false,
    pool: false,
    restaurant: false,
    hourAccess: false,
    tv: false,
  });

  // step - 4
  // ---------------
  const [isValidatedFourth, setIsValidatedFourth] = useState(false);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [primaryImageOption, setPrimaryImageOption] = useState("");
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

  // Validation Functions
  const validateInputFirst = (deedno, deedyr, type) => {
    try {
      const numbersOnly = /^[0-9]*$/;
      if (deedno === "") {
        message.error("Please fill the input for Title Deed No.");
        return;
      }
      if (!numbersOnly.test(deedno)) {
        message.error("Invalid Deed No. Format. Must be only numbers.");
        return;
      }
      if (deedyr === "") {
        message.error("Please fill the input for Title deed Year");
        return;
      }
      if (type === "" || type === "none") {
        message.error("Please fill the input for Property Type");
        return;
      }
      setIsValidatedFirst(true);
    } catch (error) {
      console.log("Error Message1: " + error);
    }
  };

  const validateInputSecond = (street, area, apartno, price) => {
    const numbersOnly = /^[0-9]*$/;
    try {
      if (street === "") {
        message.error("Please fill the input for Property Street");
        return;
      }
      if (area === "") {
        message.error("Please fill the input for Area");
        return;
      }
      if (!numbersOnly.test(area)) {
        message.error("Invalid Format! Area input should only contain numbers");
        return;
      }
      if (apartno === "") {
        message.error("Please fill the input for Apartment Number");
        return;
      }
      if (price === "") {
        message.error("Please fill the input for Price of the Property");
        return;
      }
      if (!numbersOnly.test(price)) {
        message.error(
          "Invalid Format! Price input should only contain numbers"
        );
        return;
      }
      setIsValidatedSecond(true);
    } catch (error) {
      message.error("Error Message: " + error);
    }
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
    },
    onRemove(e) {},
  };

  const validateInputFourth = () => {
    try {
      if (primaryImageOption === "" || primaryImageOption === undefined) {
        message.info("Please select a primary image to continue");
        return;
      }
      message.success("Data stored successfully!");
      console.log(
        "Inputs: ",
        ethAddress,
        street,
        area,
        apartno,
        emailAddress,
        fullName,
        deedno,
        deedyr,
        type,
        bednumber,
        bathnumber,
        occupNum
      );
      console.log("uploads: ", imageList, titleDeedFile);
      console.log("facilities: ", facilities);
      setIsValidatedFourth(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handlePrimaryImageChange = (e) => {
    setPrimaryImageOption(e);
    console.log("option checked", primaryImageOption);
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

  const printAllData = () => {};

  useEffect(() => {
    console.log(primaryImageOption);
  }, [primaryImageOption]);

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
                                  setIsValidatedFirst(false);
                                }}
                                validation={{
                                  required: true,
                                  regExp: "[0-9]+([,.][0-9]+)?",
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="datesub">Title Deed Year</label>
                              <DatePicker
                                format="YYYY"
                                picker="year"
                                disabledDate={disabledDate}
                                id="titleyr"
                                name="titleyr"
                                className="datePicker"
                                style={
                                  {
                                    // padding: "0.5rem 4rem"
                                  }
                                }
                                onChange={(e) => {
                                  setDeedyr(e._d.getFullYear());
                                  setIsValidatedFirst(false);
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="property-type">Property Type</label>
                              <div>
                                <SelectAnt
                                  defaultValue="none"
                                  className="selectPropertyType"
                                  style={{
                                    width: "200",
                                  }}
                                  onChange={(value) => {
                                    setType(value);
                                    setIsValidatedFirst(false);
                                  }}
                                  options={[
                                    {
                                      value: "none",
                                      label: "None",
                                    },
                                    {
                                      value: "villa",
                                      label: "Villa",
                                    },
                                    {
                                      value: "townhouse",
                                      label: "Townhouse",
                                    },
                                    {
                                      value: "apartment",
                                      label: "Apartment",
                                    },
                                    {
                                      value: "penthouse",
                                      label: "Penthouse",
                                    },
                                    {
                                      value: "duplex",
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

                            {!isValidatedFirst && (
                              <button
                                id="validateButtonFirst"
                                className="validatebtn"
                                text="Validate"
                                onClick={() =>
                                  validateInputFirst(deedno, deedyr, type)
                                }
                              >
                                Validate
                              </button>
                            )}

                            {isValidatedFirst && (
                              <button
                                id="next"
                                className="nextButton  "
                                text="Next"
                              >
                                Next
                              </button>
                            )}
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
                                placeholder="12500 (in sqft)"
                                value={area}
                                onChange={(e) => {
                                  setArea(e.target.value);
                                  setIsValidatedSecond(false);
                                }}
                                validation={{
                                  regExp: "[0-9]+([,.][0-9]+)?",
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
                                placeholder="12B"
                                value={apartno}
                                onChange={(e) => {
                                  setApartmentNo(e.target.value);
                                  setIsValidatedSecond(false);
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
                              onClick={() => {
                                setIsValidatedFirst(false);
                                setType("");
                              }}
                              style={{
                                padding: "0.5rem 2rem",
                                height: "fit-content",
                              }}
                            >
                              Back
                            </button>
                            {!isValidatedSecond && (
                              <button
                                id="validatebtn"
                                className="validatebtn"
                                text="Validate"
                                onClick={() =>
                                  validateInputSecond(
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
                                className="nextButton"
                                text="Next"
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
                                <InputNumber
                                  className="bedsInputNumber"
                                  min={1}
                                  max={10}
                                  defaultValue={1}
                                  onChange={(value) => {
                                    setBedNumber(value);
                                  }}
                                />
                              </div>
                              <div className="label-container">
                                <label for="NumberofBathrooms">
                                  No. of Bathrooms
                                </label>
                                <InputNumber
                                  className="bedsInputNumber"
                                  min={0}
                                  max={10}
                                  defaultValue={0}
                                  onChange={(value) => {
                                    setBathNumber(value);
                                  }}
                                />
                              </div>
                              <div className="label-container">
                                <label for="occupancynum">Occupancy No.</label>
                                <InputNumber
                                  className="bedsInputNumber"
                                  min={1}
                                  max={20}
                                  defaultValue={1}
                                  onChange={(value) => {
                                    setOccupNumber(value);
                                  }}
                                />
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
                                    alt="freeparking"
                                    className="facilityIcon"
                                    src={require("../../assets/pic1.png")}
                                  ></img>
                                  <label for="freeparking">Free Parking</label>
                                  <Input
                                    type="checkbox"
                                    id="freeparking"
                                    name="freeparking"
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        parking: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        freeWifi: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        restaurant: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        kitchen: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        coffee: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        hourAccess: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        security: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        pool: value,
                                      });
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
                                    onChange={(e) => {
                                      let value = e.target.checked;
                                      setFacilities({
                                        ...facilities,
                                        tv: value,
                                      });
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
                                onClick={() => {
                                  setIsValidatedSecond(false);
                                }}
                              >
                                Back
                              </button>
                            </div>
                            <div className="col-25">
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
                            <div className="imagesUploadContainer">
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
                                    width: "20rem",
                                  }}
                                  onChange={handlePrimaryImageChange}
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
                              onClick={() => {
                                setImageNames([]);
                              }}
                            >
                              Back
                            </button>
                            {!isValidatedFourth ? (
                              <button
                                id="validatebtn"
                                className="validatebtn"
                                text="Validate"
                                onClick={() => {
                                  validateInputFourth();
                                }}
                              >
                                Validate
                              </button>
                            ) : (
                              <button
                                id="next"
                                className="nextButton  "
                                text="Next"
                                onClick={() => {
                                  makePrimaryImage();
                                  printAllData();
                                }}
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
                              id="finishButton"
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
