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

// smart contract imports and defs
import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";
const { ethers } = require("ethers");
const { ethereum } = window;

// import Moralis from "moralis-v1/types";
const console = require("console-browserify");
const { Dragger } = Upload;

const MyProperties = () => {
  // ----------------------------------
  // Smart Contract Variables
  // ----------------------------------

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

  const { Moralis } = useMoralis();
  const [properties, setProperties] = useState([]);

  // -------------------------------------------
  // Smart Contract Functions
  // -------------------------------------------

  // checks if the string only has numbers
  const onlyNumbers = (str) => {
    const numbersOnly = /^[0-9]*$/;
    if (!numbersOnly.test(str)) {
      return false;
    }
    return true;
  };

  const checkAddress = (addr) => {
    try {
      if (addr === "") {
        message.error(
          "Address Input cannot be empty!\nPlease enter a valid address."
        );
        return false;
      }
      const newAddress = ethers.utils.getAddress(addr);
      const isAddr = ethers.utils.isAddress(newAddress);
      return true;
    } catch (error) {
      message.error("Error (Invalid Address): ", error);
      return false;
    }
  };

  // checks if the landlord with this addr exists
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
      if (results.length === 0) {
        message.error(
          "Landlord does not exist for this address: " +
            addr.slice(0, 10) +
            "..." +
            addr.slice(35, 42)
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error1: ", error);
    }
  };

  const getPropertiesUsingContract = async (addr) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      const landlordExists = await checkLandlordExists(addr);
      if (!landlordExists) {
        return;
      }
      const counter = await realEstateContract.getLandlordCounter(addr);
      setProperties([]);
      for (let i = 1; i <= counter; i++) {
        const propertyExists = await checkPropertyExistsUsingContract(addr, i);
        if (propertyExists) {
          let property = await realEstateContract.getProperty(addr, i);
          let _area = parseInt(property[1]._hex, 16);
          let _apartmentNo = parseInt(property[2]._hex, 16);
          let _listedPrice = parseInt(property[3]._hex, 16);
          const propertyObj = {
            landlordAddress: addr,
            propertyId: i,
            streetName: property[0],
            area: _area,
            apartmentNo: _apartmentNo,
            listedPrice: _listedPrice,
          };
          setProperties((properties) => [...properties, propertyObj]);
        }
      }
    } catch (error) {
      message.error("Error1: " + error.message);
    }
  };
  // checks if a property exists
  const checkPropertyExists = async (addr, id) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      if (!onlyNumbers(id)) {
        message.error("Invalid Id! Enter the ID in correct format");
        return;
      }
      if (id === "0") {
        message.error("Invalid ID! Property Id cannot be zero.");
        return;
      }
      const properties = Moralis.Object.extend("Properties");
      const query = new Moralis.Query(properties);
      query.equalTo("landlordAddress", addr.toLowerCase());
      query.equalTo("propertyId", id);
      const results = await query.find();
      if (results.length === 0) {
        message.error(
          "Property with id " +
            id +
            " does not exist for this address: " +
            addr.slice(0, 10) +
            "..." +
            addr.slice(35, 42)
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // checks if a property exists using the realEstate Contract
  const checkPropertyExistsUsingContract = async (addr, id) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      const exists = await realEstateContract.checkPropertyExists(addr, id);
      if (exists) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error2: ", error);
    }
  };

  // Adding a new property
  const addProperty = async (
    addr,
    propertyType,
    titleDeedNo,
    titleDeedYear,
    streetNum,
    area,
    apartmentNum,
    listedPrice,
    ipfs,
    facilities
  ) => {
    try {
      let realEstateDappContract;
      console.log("here");

      //input error handling
      if (
        addr === "" ||
        propertyType === "" ||
        streetNum === "" ||
        apartmentNum === "" ||
        ipfs === ""
      ) {
        message.error("Invalid input! Please fill in all the field required.");
        return;
      }
      if (
        titleDeedNo === 0 ||
        titleDeedYear === 0 ||
        area === 0 ||
        listedPrice === 0 ||
        facilities === 0
      ) {
        message.error(
          "Invalid input! Please fill the inputs with the right feild types."
        );
        return;
      }

      if (
        !onlyNumbers(titleDeedNo) ||
        !onlyNumbers(titleDeedYear) ||
        !onlyNumbers(area) ||
        !onlyNumbers(listedPrice) ||
        !onlyNumbers(facilities)
      ) {
        message.error("Invalid Input! Enter the values in correct format.");
        return;
      }
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }
      // converting the data from string to int type
      const uintTitleDeedNo = parseInt(titleDeedNo);
      const uintTitleDeedYear = parseInt(titleDeedYear);
      const uintArea = parseInt(area);
      const uintListedPrice = parseInt(listedPrice);
      const uintFacilities = parseInt(facilities);
      const ipfsHash = "";
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
          await realEstateDappContract.createPropertyListing(
            addr,
            propertyType,
            uintTitleDeedNo,
            uintTitleDeedYear,
            streetNum,
            uintArea,
            apartmentNum,
            uintListedPrice,
            ipfsHash,
            uintFacilities
          );
          message.success(`Property added for landlord (address: ${addr})`);
        } else {
          // if not connected then
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
          await realEstateDappContract.createPropertyListing(
            addr,
            propertyType,
            uintTitleDeedNo,
            uintTitleDeedYear,
            streetNum,
            uintArea,
            apartmentNum,
            uintListedPrice,
            ipfsHash,
            uintFacilities
          );
          message.success(`Property added for landlord (address: ${addr})`);
        }
      }
    } catch (error) {
      if (error.code === 4001) {
        message.error("Error " + error.code + ": " + error.message);
      } else {
        message.error("Error: " + error);
        console.log("Error: " + error.message);
      }
    }
  };

  const samplePropertyDetails = {
    addr: "0x6F7CBEE1098D7b5890299FA1B16b98F458926636",
    propertyType: "villa",
    titleDeedNo: 12344,
    titleDeedYear: 2020,
    streetNum: "12 Street",
    area: 2500,
    apartmentNum: "12A",
    listedPrice: 1250000,
    ipfs: "asdasdmkalksfm",
    facilities: 1,
  };

  const displayPropertyDetails = () => {
    console.log(samplePropertyDetails.addr, samplePropertyDetails.area);
  };

  // transfers the property from the landlord to the buyer
  const transferPropertyUsingContract = async (landAddr, buyerAddr, propId) => {
    try {
      if (!checkAddress(landAddr) || !checkAddress(buyerAddr)) {
        return;
      }
      if (landAddr === buyerAddr) {
        message.error("Invalid Input: Addresses cannot be the same.");
        return;
      }
      if (!onlyNumbers(propId)) {
        message.error("Invalid Input: Id entered is in incorrect format.");
        return;
      }
      if (propId === "0") {
        message.error("Invalid ID! Property Id cannot be zero.");
        return;
      }
      const landlordExists = await checkLandlordExists(landAddr);
      const buyerExists = await checkLandlordExists(buyerAddr);
      if (!landlordExists || !buyerExists) {
        return;
      }
      const propertyExists = await checkPropertyExistsUsingContract(
        landAddr,
        propId
      );
      if (!propertyExists) {
        message.error(
          "The landlord does not have a property with this property Id (" +
            propId +
            ")"
        );
        return;
      }
      await realEstateContract.transferProperty(
        landAddr,
        parseInt(propId),
        buyerAddr
      );
      message.success(
        "Property (id: " +
          propId +
          ") transfered successfully from landlord (" +
          landAddr.slice(0, 10) +
          "..." +
          landAddr.slice(35, 42) +
          ") to Buyer (" +
          buyerAddr.slice(0, 10) +
          "..." +
          buyerAddr.slice(35, 42) +
          "."
      );
    } catch (error) {
      message.error("Error Message: " + error);
    }
  };

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

  // Validation Functions
  // ---------------------
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

  // Handling Functions
  // -------------------
  // function to handle the images for property
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

  useEffect(() => {
    setEthAddress(user.get("ethAddress"));
    setEmailAddress(user.get("email"));
    setFullName(user.get("fullName"));
  }, [user]);

  const clearState = () => {
    setAddress("");
    setFullName("");
    setDeedno("");
    setDeedyr("");
    setType("");
  };

  let navigate = useNavigate();

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
                onClick={() =>
                  // addProperty(
                  //   samplePropertyDetails.addr,
                  //   samplePropertyDetails.propertyType,
                  //   samplePropertyDetails.titleDeedNo,
                  //   samplePropertyDetails.titleDeedYear,
                  //   samplePropertyDetails.streetNum,
                  //   samplePropertyDetails.area,
                  //   samplePropertyDetails.apartmentNum,
                  //   samplePropertyDetails.listedPrice,
                  //   samplePropertyDetails.ipfs,
                  //   samplePropertyDetails.facilities
                  // )
                  {
                    setAddPropertyView(false);
                  }
                }
                // onClick={() => setAddPropertyView(false)}
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
                                <div>
                                  <PlusOutlined />
                                  <div
                                    style={{
                                      marginTop: 8,
                                    }}
                                  >
                                    Upload
                                  </div>
                                </div>{" "}
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
