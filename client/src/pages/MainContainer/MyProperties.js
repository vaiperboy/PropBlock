import React, { useState, useEffect } from "react";
import {
  message,
  DatePicker,
  Upload as UploadAntDesign,
  InputNumber,
  Select as SelectAnt,
} from "antd";
import {
  PlusOutlined,
  InboxOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../../styling/MainContainer/CreateProperty.scss";
import { Input, Stepper, TextArea, Upload } from "@web3uikit/core";
// import blueTick from "./assets/blue_tick.png";
import image from "../../assets/blue_tick.png";
import moment from "moment";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { useNavigate } from "react-router-dom";
import Property_Card from "./Property_Card";
import ipfs from "../../modules/ipfs";

// smart contract imports and defs
import { getParsedEthersError } from "@enzoferey/ethers-error-parser";

import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";
import Web3 from "web3";
const { ethers } = require("ethers");
const { ethereum } = window;

// import Moralis from "moralis-v1/types";
const console = require("console-browserify");
// const { Dragger } = Upload;

const MyProperties = () => {
  const { save } = useNewMoralisObject("PropertyDetails");

  // contract address
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

  // checks if the string only has numbers
  const onlyNumbers = (str) => {
    const numbersOnly = /^[0-9]*$/;
    if (!numbersOnly.test(str)) {
      return false;
    }
    return true;
  };

  //set this to false to display the current properties
  // validated
  const [addPropertyView, setAddPropertyView] = useState(true);

  // step - 1
  const [ownerAddress, setOwnerAddress] = useState("");
  const [ethAddress, setEthAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [propertyTitleDeedNumber, setPropertyTitleDeedNumber] = useState("");
  const [propertyTitleDeedYear, setPropertyTitleDeedYear] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyStreet, setPropertyStreet] = useState("");
  const [propertyArea, setPropertyArea] = useState("");
  const [propertyApartmentNo, setPropertyApartmentNo] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [bedNumber, setBedNumber] = useState(1);
  const [bathNumber, setBathNumber] = useState(0);
  const [occupancyNum, setOccupancyNumber] = useState(1);
  const [propertyCity, setPropertyCity] = useState("");
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
  const [isValidatedFirst, setIsValidatedFirst] = useState(false);

  // -------------------------------
  // step - 2
  const [isValidatedSecond, setIsValidatedSecond] = useState(false);
  const [transactionHash, setTransactionHash] = useState(false);
  const [titleDeedRemoved, setTitleDeedRemoved] = useState(false);
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [primaryImageOption, setPrimaryImageOption] = useState("");
  const [imageList, setImageList] = useState([]);
  const [titleDeedFile, setTitleDeedFile] = useState({});
  const [imageNames, setImageNames] = useState([]);
  const { user, Moralis } = useMoralis();
  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");

  const [isCreatingProperty, setIsCreatingProperty] = useState(true);

  // Property Facilities
  const [facilitiesOptions, setFacilitiesOptions] = useState([
    { value: 1, label: "Free Parking" },
    { value: 2, label: "Kitchen" },
    { value: 4, label: "Security" },
    { value: 8, label: "Free WiFi" },
    { value: 16, label: "Coffee Maker" },
    { value: 64, label: "Swimming Pool" },
    { value: 128, label: "24 hour access" },
    { value: 256, label: "TV Access" },
  ]);
  const [facilitiesXor, setFacilitiesXor] = useState(0);
  const [userProperties, setUserProperties] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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


  const fetchUserProperties = async () => {
    try {
      fetch(
        "http://localhost:9000/getUserProperties?" +
        new URLSearchParams({
          ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress"))
        })
      )
        .then((res) => res.json())
        .then((res) => {
          // id: 2,
          // ownerAddress: "0xd1D3dB802977ee31062477E37a51B0BB452275f9",
          // label: "Smart Building Apartment",
          // city: "Dubai",
          // country: "UAE",
          // description: "Set in exotic landscaped gardens",
          // price: "1,500,000",
          // imageLocation: "realEstate_2-min.png",
          console.log(res)
          var tmp = []
          for (var i = 0; i < res.results.length; i++) {
            const item = res.results[i]
            console.log(item)
            tmp.push({
              id: item.objectId,
              ownerAddress: item.landlordAddress,
              label: item.details.propertyTitle,
              location: item.details.location,
              description: item.details.propertyDescription,
              price: item.numericPrice,
              imageLocation: item.images[0]
            })
          }
          setUserProperties(tmp)
        })
        .catch((err) => {
          message.error("error with API " + err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      message.error("error with setting data from API");
    }
  }



  useEffect(() => {
    setOwnerAddress(user.get("ethAddress"));
    setEmailAddress(user.get("email"));
    setFullName(user.get("fullName"));

    fetchUserProperties()
  }, [])


  // -------------------------------
  // Functions
  // -------------------------------

  //only made it for lowest number (least option)
  const handleFacilities = (arr) => {
    var tmp = 0;
    for (var i = 0; i < arr.length; i++) tmp = tmp | arr[i];
    setFacilitiesXor(tmp);
    console.log(tmp);
  };

  // cannot select date after 'Today'
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  // function to add property
  const addProperty = async () => {
    try {
      let realEstateDappContract;
      setIsCreatingProperty(true);
      // converting the data from string to int type
      const uintTitleDeedNo = parseInt(propertyTitleDeedNumber);
      const uintTitleDeedYear = parseInt(propertyTitleDeedYear);
      const uintArea = parseInt(propertyArea);
      const uintListedPrice = parseInt(propertyPrice);
      const uintFacilities = parseInt(facilities);

      // checking if metamask extension is installed
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }

      // if metamask is installed
      if (ethereum) {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        // connected
        //set up transaction parameters
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const walletAddress = accounts[0]; // first account in MetaMask
        const signerNew = provider.getSigner(walletAddress);
        realEstateDappContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          realEstate.abi,
          signerNew
        );

        // calling the contract function 'createPropertyListing' to create a property
        // getting the transaction hash
        message.info("Property is being added....");
        const ipfsHash = await uploadIpfs();
        //const ipfsHash = "123123123";
        if (ipfsHash.length == 0) {
          message.error("Could not upload files via IPFS!");
          return;
        }

        const result = await realEstateDappContract.createPropertyListing(
          ownerAddress,
          propertyType,
          uintTitleDeedNo,
          uintTitleDeedYear,
          propertyStreet,
          uintArea,
          propertyApartmentNo,
          uintListedPrice,
          ipfsHash
        );

        console.log(result.hash);
        // OFF-Chain function goes here
        // ----------------------------
        //facilities, beds#, tx Hash, occup#, baths#, propertyTitle, proeprtyDescription
        const property = Moralis.Object.extend("PropertyDetails");
        const query = new Moralis.Query(property);
        query.equalTo("txHash", result.hash);
        query.limit(1);
        query.withCount();
        const results = await query.find();
        if (results.count > 0) {
          message.error("Details for this property already exists!");
          return;
        }

        message.info("Adding extra details");
        const data = {
          txHash: result.hash,
          facilities: facilitiesXor,
          city: propertyCity,
          bedsNumber: bedNumber,
          bathsNumber: bathNumber,
          propertyTitle: propertyTitle,
          propertyDescription: propertyDescription,
          occupantsNumber: occupancyNum,
        };

        save(data, {
          onSuccess: (obj) => {
            message.success(
              `Property added for landlord (address: ${ownerAddress})`
            );
          },
          onError: (error) => {
            message.error("Couldn't send request!");
            message.error(error.message);
            console.log(error);
          },
        });
      }
    } catch (error) {
      const parsedEthersError = getParsedEthersError(error);
      if (parsedEthersError.errorCode === "REJECTED_TRANSACTION") {
        message.error(
          "Error: You rejected the transaction. Please accept the transaction to continue the agreement."
        );
      } else {
        message.error("Error: " + parsedEthersError.errorCode);
      }
    }

    setIsCreatingProperty(false);
  };


  // function to upload via IPFS
  const uploadIpfs = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          wrapWithDirectory: true,
          //progress: (prog) => console.log(`[ipfs] received: ${prog}`)
        };
        const files = imageList;
        var hash = "";
        console.log("files to add: " + files);
        for await (const result of ipfs.addAll(files, options)) {
          hash = result.cid._baseCache.entries().next().value[1];
        }
        console.log(hash);
        resolve(hash);
      } catch (error) {
        message.error("error with IPFS: " + error);
        resolve("");
      }
    });
  };

  // Validation Functions
  // ---------------------

  // step - 1
  const validateInputFirst = (
    propertyTitleDeedNumber,
    propertyTitleDeedYear,
    propertyCity,
    propertyType,
    propertyStreet,
    propertyArea,
    propertyApartmentNo,
    propertyPrice
  ) => {
    try {
      const numbersOnly = /^[0-9]*$/;
      if (propertyTitleDeedNumber === "") {
        message.error("Please fill the input for Title Deed No.");
        return;
      }
      if (!numbersOnly.test(propertyTitleDeedNumber)) {
        message.error("Invalid Deed No. Format. Must be only numbers.");
        return;
      }
      if (propertyTitleDeedYear === "") {
        message.error("Please fill the input for Title deed Year");
        return;
      }
      if (propertyCity === "" || propertyCity === "none") {
        message.error("Please fill the input for Property City");
        return;
      }
      if (propertyType === "" || propertyType === "none") {
        message.error("Please fill the input for Property Type");
        return;
      }
      if (propertyStreet === "") {
        message.error("Please fill the input for Property Street");
        return;
      }
      if (propertyArea === "") {
        message.error("Please fill the input for Area");
        return;
      }
      if (!numbersOnly.test(propertyArea)) {
        message.error("Invalid Format! Area input should only contain numbers");
        return;
      }
      if (propertyApartmentNo === "") {
        message.error("Please fill the input for Apartment Number");
        return;
      }
      if (propertyPrice === "") {
        message.error("Please fill the input for Price of the Property");
        return;
      }
      if (!numbersOnly.test(propertyPrice)) {
        message.error(
          "Invalid Format! Price input should only contain numbers"
        );
        return;
      }
      setIsValidatedFirst(true);
    } catch (error) {
      console.log("Error Message1: " + error);
    }
  };

  const getExtension = (file) => {
    return file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  //true if extension within range
  const checkExtension = (val, arr) => {
    return arr.indexOf(val) !== -1;
  };

  const extensionsAllowed = ["pdf"];

  // step - 2
  const validateInputSecond = () => {
    try {
      if (propertyTitle === "") {
        message.error("Please enter the title for the property");
        return;
      }
      if (propertyDescription === "") {
        message.error("Please upload the description for the property");
        return;
      }
      if (titleDeedFile === "") {
        message.error("Please enter the title deed file for the property");
        return;
      }
      if (
        titleDeedFile === undefined ||
        titleDeedFile.name === undefined ||
        !checkExtension(getExtension(titleDeedFile.name), extensionsAllowed)
      ) {
        message.error(
          "Please make sure the file extension are: " +
          extensionsAllowed.join(",")
        );
        return;
      }
      if (imageList.length === 0) {
        message.error("Please add at least one picture for the property");
        return;
      }
      if (primaryImageOption === "" || primaryImageOption === undefined) {
        message.error("Please select a primary image to continue");
        return;
      }
      message.success("Data stored successfully!");
      console.log(
        "All data: ",
        ownerAddress,
        propertyStreet,
        propertyArea,
        propertyApartmentNo,
        emailAddress,
        fullName,
        propertyTitleDeedNumber,
        propertyTitleDeedYear,
        propertyType,
        bedNumber,
        bathNumber,
        occupancyNum
      );
      console.log("uploads: ", imageList, titleDeedFile);
      console.log("facilities: ", facilities);
      setIsValidatedSecond(true);
    } catch (error) {
      console.log("Error: ", error);
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


  const clearState = () => {
    setOwnerAddress("");
    setFullName("");
    setPropertyTitleDeedNumber("");
    setPropertyTitleDeedYear("");
    setPropertyType("");
  };

  let navigate = useNavigate();

  const handlePrimaryImageChange = (e) => {
    setPrimaryImageOption(e);
    console.log("option checked", primaryImageOption);
  };

  const makePrimaryImage = () => {
    //swapping
    let first = imageList[0];
    imageList[0] = imageList[primaryImageIndex];
    imageList[primaryImageIndex] = first;
  };

  const printAllData = () => { };

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
              {userProperties.map((property, i) => (
                <Property_Card props={property} />
              ))}
              <div
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
                  onClick={() => {
                    setAddPropertyView(false);
                  }}
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
            <p className="rightsidebar_title">Creating a new property</p>
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
                <ArrowLeftOutlined
                  className="arrowBack"
                  onClick={() => {
                    setAddPropertyView(true);
                  }}
                />
                {/* <button className="backButton"></button> */}
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
                            {/* Owner's Details */}
                            <div className="input-item">
                              <h1
                                style={{
                                  marginBottom: "0",
                                  paddingBottom: "0.2rem",
                                  fontSize: "2rem",
                                  color: "#3daeee",
                                }}
                              >
                                Owner's Details
                              </h1>
                            </div>
                            <div className="input-item">
                              <label for="InputAddress">Owner's Address</label>
                              <Input
                                type="text"
                                id="InputAddress"
                                className="ethAddressInput"
                                name="address"
                                placeholder={`${ethAddress.slice(0, 6) +
                                  "..." +
                                  ethAddress.slice(25, 35)
                                  }`}
                                value={ownerAddress}
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
                            <div
                              style={{ border: "0.5px solid #a9dffd" }}
                            ></div>
                            {/* Title Deed Details */}
                            <div className="input-item">
                              <h1
                                style={{
                                  marginTop: "1rem",
                                  marginBottom: "0",
                                  paddingBottom: "0.2rem",
                                  fontSize: "2rem",
                                  color: "#3daeee",
                                }}
                              >
                                Title Deed Details
                              </h1>
                            </div>
                            <div className="input-item">
                              <label for="InputDeedno">Title Deed No.</label>
                              <Input
                                openByDefault
                                id="InputDeedno"
                                name="titleno"
                                placeholder="#789456"
                                value={propertyTitleDeedNumber}
                                onChange={(e) => {
                                  setPropertyTitleDeedNumber(e.target.value);
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
                                  setPropertyTitleDeedYear(e._d.getFullYear());
                                  setIsValidatedFirst(false);
                                }}
                              />
                            </div>
                            <div
                              style={{ border: "0.5px solid #a9dffd" }}
                            ></div>
                            {/* Property Details */}
                            <div className="input-item">
                              <h1
                                style={{
                                  marginTop: "1rem",
                                  marginBottom: "0",
                                  paddingBottom: "0.2rem",
                                  fontSize: "2rem",
                                  color: "#3daeee",
                                }}
                              >
                                Property Details
                              </h1>
                            </div>
                            <div className="input-item">
                              <label for="property-city">Property City</label>
                              <div>
                                <SelectAnt
                                  defaultValue="none"
                                  className="selectPropertyType"
                                  style={{
                                    width: "17rem",
                                  }}
                                  onChange={(value) => {
                                    setPropertyCity(value);
                                    setIsValidatedFirst(false);
                                  }}
                                  options={[
                                    {
                                      value: "none",
                                      label: "None",
                                    },
                                    {
                                      value: "Abu Dhabi",
                                      label: "Abu Dhabi",
                                    },
                                    {
                                      value: "Dubai",
                                      label: "Dubai",
                                    },
                                    {
                                      value: "Ajman",
                                      label: "Ajman",
                                    },
                                    {
                                      value: "Sharjah",
                                      label: "Sharjah",
                                    },
                                    {
                                      value: "Ras Al Khaimah",
                                      label: "Ras Al Khaimah",
                                    },

                                    {
                                      value: "Umm Al Quwain",
                                      label: "Umm Al Quwain",
                                    },

                                    {
                                      value: "Fujairah",
                                      label: "Fujairah",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                            <div className="input-item">
                              <label for="property-type">Property Type</label>
                              <div>
                                <SelectAnt
                                  defaultValue="none"
                                  className="selectPropertyType"
                                  style={{
                                    width: "14rem",
                                  }}
                                  onChange={(value) => {
                                    setPropertyType(value);
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
                            <div className="input-item">
                              <label for="street">Street Name</label>
                              <Input
                                type="text"
                                id="street"
                                name="street"
                                placeholder="Sheikh Mohammed Bin Zayed Str"
                                value={propertyStreet}
                                onChange={(e) => {
                                  setPropertyStreet(e.target.value);
                                  setIsValidatedFirst(false);
                                }}
                                validation={{
                                  required: true,
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <label for="type">Plot Size</label>
                              <Input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="12500 (in sqft)"
                                value={propertyArea}
                                onChange={(e) => {
                                  setPropertyArea(e.target.value);
                                  setIsValidatedFirst(false);
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
                                value={propertyApartmentNo}
                                onChange={(e) => {
                                  setPropertyApartmentNo(e.target.value);
                                  setIsValidatedFirst(false);
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
                                value={propertyPrice}
                                onChange={(e) => {
                                  setPropertyPrice(e.target.value);
                                  setIsValidatedFirst(false);
                                }}
                                validation={{
                                  regExp: "[0-9]+([,.][0-9]+)?",
                                  required: true,
                                }}
                              />
                            </div>
                            <div className="input-item">
                              <div className="inputs-container-2">
                                <div className="first-container">
                                  <div className="label-container">
                                    <label for="NumberofBeds">
                                      No. of Beds
                                    </label>
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
                                    <label for="occupancynum">
                                      Occupancy No.
                                    </label>
                                    <InputNumber
                                      className="bedsInputNumber"
                                      min={1}
                                      max={20}
                                      defaultValue={1}
                                      onChange={(value) => {
                                        setOccupancyNumber(value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              style={{ border: "0.5px solid #a9dffd" }}
                            ></div>
                            {/* Property Facilities */}
                            <div className="input-item">
                              <h1
                                style={{
                                  marginBottom: "0",
                                  paddingBottom: "0.2rem",
                                  fontSize: "2rem",
                                  color: "#3daeee",
                                }}
                              >
                                Select the Facilities that apply
                              </h1>
                            </div>
                            <div
                              className="input-item"
                              style={{ width: "100%" }}
                            >
                              <SelectAnt
                                mode="tags"
                                className="facilitiesSelect"
                                size={"medium"}
                                placeholder="Please select"
                                onChange={handleFacilities}
                                style={{
                                  width: "100%",
                                }}
                                options={facilitiesOptions}
                              />
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
                                  validateInputFirst(
                                    propertyTitleDeedNumber,
                                    propertyTitleDeedYear,
                                    propertyCity,
                                    propertyType,
                                    propertyStreet,
                                    propertyArea,
                                    propertyApartmentNo,
                                    propertyPrice
                                  )
                                }
                              >
                                Validate
                              </button>
                            )}
                            {isValidatedFirst && (
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
                      title: "",
                    },
                    {
                      content: (
                        <div className="fullform">
                          <div className="input-item">
                            <label for="InputName" style={{ color: "#3daeee" }}>
                              Property Title
                            </label>
                            <Input
                              type="text"
                              id="InputName"
                              name="name"
                              className="propertyTitle"
                              placeholder="Jumeriah Homes ..."
                              onChange={(e) => {
                                setPropertyTitle(e.target.value);
                                setIsValidatedSecond(false);
                                console.log("Des: ", propertyTitle);
                              }}
                              width="60rem"
                            />
                          </div>
                          <div className="input-item">
                            <label
                              for="InputName"
                              style={{ marginBottom: "1rem", color: "#3daeee" }}
                            >
                              Property Description
                            </label>
                            <TextArea
                              name="propertyDescription"
                              className="propertyDescription"
                              onChange={(e) => {
                                setPropertyDescription(e.target.value);
                                setIsValidatedSecond(false);
                              }}
                              placeholder="Enter your property description here ..."
                              width="100rem"
                              style={{
                                resize: "none",
                              }}
                            />
                          </div>
                          <div className="inputs-container">
                            <p
                              className="text upload"
                              style={{ marginTop: "2rem", color: "#3daeee" }}
                            >
                              Upload Title Deed
                            </p>
                            <p className="note">
                              Upload the required title deed for your property.
                              (Only .pdf format is accepted)
                            </p>
                            <div>
                              {/* <Dragger
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
                              </Dragger> */}
                              <Upload
                                descriptionText="Only .pdf files are accepted"
                                onChange={(e) => {
                                  setTitleDeedFile(e);
                                }}
                                style={{}}
                                theme="withIcon"
                              />
                            </div>
                            <br></br>
                            <p
                              className="text upload"
                              style={{ color: "#3daeee" }}
                            >
                              Upload Images (Max - 5)
                            </p>
                            <p className="note">
                              Upload the property images and make sure that the
                              images are high quality for better viewing. You
                              can upload upto 5 images for your property.
                            </p>
                            <div className="imagesUploadContainer">
                              <UploadAntDesign
                                onChange={handleChangeImages}
                                multiple={true}
                                listType="picture-card"
                                accept=".png, .jpeg, .jpg"
                                maxCount={5}
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
                              </UploadAntDesign>
                              {/* <Upload
                                acceptedFiles="image/jpeg"
                                descriptionText="Only .jpeg files are accepted"
                                onChange={function noRefCheck() {}}
                                style={{}}
                                theme="withIcon"
                              /> */}
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
                                setIsValidatedFirst(false);
                                setPropertyTitleDeedYear("");
                                setPropertyType("");
                              }}
                            >
                              Back
                            </button>
                            {!isValidatedSecond ? (
                              <button
                                id="validatebtn"
                                className="validatebtn"
                                text="Validate"
                                onClick={() => {
                                  validateInputSecond();
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
                                  addProperty();
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
                        <div>
                          {isCreatingProperty ? (
                            <div className="fullform">
                              <h1>Creating property....</h1>
                            </div>
                          ) : (
                            <div className="fullform">
                              <div className="checkimage">
                                {<img src={image} alt=""></img>}
                              </div>
                              <p className="text done">
                                Your property was created Successfully!
                              </p>
                              <button
                                className="nextButton btn-submit end"
                                id="finishButton"
                                onClick={() => {
                                  window.location.reload(false);
                                }}
                                style={{ marginTop: "0" }}
                              >
                                Finish
                              </button>
                            </div>
                          )}
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
