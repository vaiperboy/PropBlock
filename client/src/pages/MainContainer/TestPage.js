import React, { useState, useEffect } from "react";
import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";
const console = require("console-browserify");

const { ethers } = require("ethers");

export const checkAddress = (addr) => {
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
    message.error("Address entered is invalid!\nPlease enter a valid address.");
    return false;
  }
};

// checks if the string only has numbers
export const onlyNumbers = (str) => {
  if (str.match(/^[0-9]+$/) == null) {
    return false;
  }
  return true;
};

const TestPage = () => {
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

  // State variables
  const { Moralis } = useMoralis();
  const { Title } = Typography;
  const [address, setAddress] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertyLandlordAddress, setPropertyLandlordAddress] = useState("");
  const [streetNum, setStreetNum] = useState("");
  const [area, setArea] = useState();
  const [apartmentNum, setApartmentnUM] = useState();
  const [listedPrice, setListedPrice] = useState();
  const [modifyLandlordAddress, setModifyLandlordAddress] = useState("");
  const [propertyId, setPropertyiD] = useState();
  const [modifyStreetNum, setModifyStreetNum] = useState("");
  const [modifyArea, setModifyArea] = useState();
  const [modifyApartmentNum, setModifyApartmentnUM] = useState();
  const [modifyListedPrice, setModifyListedPrice] = useState();
  const [deleteLandlordAddress, setDeleteLandlordAddress] = useState("");
  const [deletePropertyId, setDeletePropertyId] = useState();
  const [transferLandlordAddress, setTransferLandlordAddress] = useState("");
  const [transferBuyerAddress, setTransferBuyerAddress] = useState();
  const [transferPropertyId, setTransferPropertyId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Returns a hash code from a string
   * @param  {String} add -  The address to get the properties for.
   * @return {Object} - An array of objects (each object is a property)
   * @see -
   * Function - gets the propertes of the address from the smart contract
   */
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

  //   sets the loading for 2 secs
  const callLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
      console.log("Error: ", error);
    }
  };

  // adding a property
  const addProperty = async (
    addr,
    streetNum,
    area,
    apartmentNum,
    listedPrice
  ) => {
    try {
      let realEstateDappContract;
      //input error handling
      if (
        addr === "" ||
        streetNum === "" ||
        area === "" ||
        apartmentNum === "" ||
        listedPrice === ""
      ) {
        message.error("Invalid input! Please fill in all the field required.");
        return;
      }
      if (
        !onlyNumbers(area) ||
        !onlyNumbers(apartmentNum) ||
        !onlyNumbers(listedPrice)
      ) {
        message.error("Invalid Input! Enter the values in correct format.");
        return;
      }
      let exists = await checkLandlordExists(addr);
      if (!exists) {
        message.error(`Landlord does not exist ${addr}`);
        return;
      }
      if (!window.ethereum) {
        message.error(
          "Metamask not detected! Please install metamask to continue."
        );
        return;
      }
      // converting the data from string to int type
      const unitArea = parseInt(area);
      const uintApartmentNum = parseInt(apartmentNum);
      const unitListedPrice = parseInt(listedPrice);
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
            streetNum,
            unitArea,
            uintApartmentNum,
            unitListedPrice,
            ipfsHash
          );
          message.success(`Property added for landlord (address: ${addr})`);
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
          await realEstateDappContract.createPropertyListing(
            addr,
            streetNum,
            unitArea,
            uintApartmentNum,
            unitListedPrice,
            ipfsHash
          );
          message.success(`Property added for landlord (address: ${addr})`);
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
      console.log("Error: ", error);
    }
  };

  // modifys property details
  const modifyProperty = async (addr, propId) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      if (
        modifyStreetNum == "" ||
        modifyArea == "" ||
        modifyApartmentNum == "" ||
        modifyListedPrice == ""
      ) {
        message.error("Invalid input! Please fill in all the field required.");
        return;
      }
      if (
        !onlyNumbers(modifyArea) ||
        !onlyNumbers(modifyApartmentNum) ||
        !onlyNumbers(modifyListedPrice)
      ) {
        message.error("Invalid Input! Enter the values in correct format.");
        return;
      }
      const landlordExists = await checkLandlordExists(addr);
      if (!landlordExists) {
        message.error(
          "Landlord does not exist with this address: (" +
            addr.slice(0, 10) +
            "...)"
        );
        return;
      }
      const propertyExists = await checkPropertyExists(addr, propId);
      if (!propertyExists) {
        message.error("Property does not exist for this Id: " + propId);
        return;
      }
      await realEstateContract.modifyPropertyListing(
        addr,
        parseInt(propId),
        modifyStreetNum,
        parseInt(modifyArea),
        parseInt(modifyApartmentNum),
        parseInt(modifyListedPrice)
      );
      message.success(
        "Property (id: " +
          propId +
          ") modified successfully for landlord address (address: " +
          addr.slice(0, 10) +
          "..." +
          addr.slice(35, 42) +
          ")"
      );
    } catch (error) {
      console.log("Error: " + error.error.reason);
    }
  };

  // deletes the property for a landlord
  const deleteProperty = async (addr, propId) => {
    try {
      if (!checkAddress(addr)) {
        return;
      }
      const landlordExists = await checkLandlordExists(addr);
      if (!landlordExists) {
        message.error(
          "Landlord does not exist with this address: (" +
            addr.slice(0, 10) +
            "...)"
        );
        return;
      }
      const propertyExists = await checkPropertyExists(addr, propId);
      if (!propertyExists) {
        message.error("Property does not exist for this Id: " + propId);
        return;
      }
      await realEstateContract.removePropertyListing(addr, parseInt(propId));
      message.success(
        "Property (id: " +
          propId +
          ") belonging to landlord address (address: " +
          addr.slice(0, 10) +
          "..." +
          addr.slice(35, 42) +
          ") removed successfully."
      );
    } catch (error) {
      console.log("Error: " + error.error.reason);
    }
  };

  // transfers the property from the landlord to the buyer
  const transferPropertyUsingContract = async (landAddr, buyerAddr, propId) => {
    try {
      if (!checkAddress(landAddr) || !checkAddress(buyerAddr)) {
        return;
      }
      if (landAddr == buyerAddr) {
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
      message.error("Error: " + error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="hero-section">
        <Title level={2} type="success" style={{ margin: "0" }}>
          Properties Functions
        </Title>
        {/* -------------------- */}
        {/* Add a Property  */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "0.5rem 0 0 0",
          }}
        >
          Add a Property
        </h2>
        <label htmlFor="propertyLandlordAddress">
          Enter the landlord Address:
        </label>
        <input
          type="text"
          id="propertyLandlordAddress"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setPropertyLandlordAddress(e.target.value)}
        />
        <label htmlFor="streetNum">Enter the Street No:</label>
        <input
          type="text"
          id="streetNum"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setStreetNum(e.target.value)}
        />
        <label htmlFor="area">Enter the area in sqft (No decimals):</label>
        <input
          type="text"
          id="area"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setArea(e.target.value)}
        />
        <label htmlFor="apartmentNum">
          Enter the Apartment No (only numbers):
        </label>
        <input
          type="text"
          id="apartmentNum"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setApartmentnUM(e.target.value)}
        />
        <label htmlFor="listedPrice">Enter the Listed Price:</label>
        <input
          type="text"
          id="listedPrice"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setListedPrice(e.target.value)}
        />
        <Button
          text="Add Property"
          theme="colored"
          color="green"
          className="borderSquare"
          onClick={() =>
            addProperty(
              propertyLandlordAddress,
              streetNum,
              area,
              apartmentNum,
              listedPrice
            )
          }
        />
        {/* -------------------- */}
        {/* Modify a Property  */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "0.5rem 0 0 0",
          }}
        >
          Modify a Property
        </h2>
        <label htmlFor="propertyLandlordAddress">
          Enter the landlord Address:
        </label>
        <input
          type="text"
          id="propertyLandlordAddress"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setModifyLandlordAddress(e.target.value)}
        />
        <label htmlFor="propertyId">Enter the property Id:</label>
        <input
          type="text"
          id="propertyId"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setPropertyiD(e.target.value)}
        />
        <label htmlFor="streetNum">Enter New the Street No:</label>
        <input
          type="text"
          id="streetNum"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setModifyStreetNum(e.target.value)}
        />
        <label htmlFor="area">Enter the New area in sqft (No decimals):</label>
        <input
          type="text"
          id="area"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setModifyArea(e.target.value)}
        />
        <label htmlFor="apartmentNum">
          Enter the Apartment No (only numbers):
        </label>
        <input
          type="text"
          id="apartmentNum"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setModifyApartmentnUM(e.target.value)}
        />
        <label htmlFor="listedPrice">Enter the New Listed Price:</label>
        <input
          type="text"
          id="listedPrice"
          style={{ padding: "0.2rem", width: "30rem" }}
          onChange={(e) => setModifyListedPrice(e.target.value)}
        />
        <Button
          text="Modify Property"
          theme="colored"
          color="green"
          className="borderSquare"
          onClick={() => modifyProperty(modifyLandlordAddress, propertyId)}
        />
        {/* -------------------- */}
        {/* Delete Property  */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "0.5rem 0 0 0",
          }}
        >
          Delete Property
        </h2>
        <label htmlFor="addressForProperties">
          Enter the landlord address for property:
        </label>
        <input
          type="text"
          id="addressForProperties"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setDeleteLandlordAddress(e.target.value)}
        />
        <label htmlFor="propertyId">Enter the property Id:</label>
        <input
          type="text"
          id="propertyId"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setDeletePropertyId(e.target.value)}
        />
        <Button
          theme="colored"
          color="red"
          text="Delete Property"
          className="borderSquare"
          onClick={() =>
            deleteProperty(deleteLandlordAddress, deletePropertyId)
          }
        />
        {/* -------------------- */}
        {/* Transfer Property  */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "0.5rem 0 0 0",
          }}
        >
          Transfer Property
        </h2>
        <label htmlFor="addressForProperties">
          Enter the landlord address:
        </label>
        <input
          type="text"
          id="addressForProperties"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setTransferLandlordAddress(e.target.value)}
        />
        <label htmlFor="addressForProperties">Enter the Buyer's address:</label>
        <input
          type="text"
          id="addressForProperties"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setTransferBuyerAddress(e.target.value)}
        />
        <label htmlFor="propertyId">Enter the property Id:</label>
        <input
          type="text"
          id="propertyId"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setTransferPropertyId(e.target.value)}
        />
        <Button
          theme="colored"
          color="red"
          text="Transfer Property"
          className="borderSquare"
          onClick={() =>
            transferPropertyUsingContract(
              transferLandlordAddress,
              transferBuyerAddress,
              transferPropertyId
            )
          }
        />
        {/* -------------------- */}
        {/* Get Properties of landlord  */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: "0.5rem 0 0 0",
          }}
        >
          Get Properties of landlord
        </h2>
        <label htmlFor="addressForProperties">
          Enter the landlord address to get the properties:
        </label>
        <input
          type="text"
          id="addressForProperties"
          style={{ padding: "0.5rem" }}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button
          text="Get Properties"
          theme="colored"
          color="yellow"
          className="borderSquare"
          onClick={() => {
            callLoading();
            getPropertiesUsingContract(address);
          }}
        />
        {isLoading && (
          <Loading
            size={40}
            spinnerColor="#2E7DAF"
            style={{ margin: "0 auto" }}
          />
        )}
        {properties.map((property, key) => {
          return (
            <Descriptions title="Property" bordered>
              <Descriptions.Item label="Property Id." span={4}>
                {property.propertyId}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={4}>
                {property.streetName}
              </Descriptions.Item>
              <Descriptions.Item label="Appartment Number" span={4}>
                {property.apartmentNo}
              </Descriptions.Item>
              <Descriptions.Item label="Area (sqft)" span={2}>
                {property.area}
              </Descriptions.Item>
              <Descriptions.Item label="Listed Price (AED)">
                {property.listedPrice}
              </Descriptions.Item>
              <Descriptions.Item label="Owner's Address" span={3}>
                {property.landlordAddress}
              </Descriptions.Item>
            </Descriptions>
          );
        })}
        {properties.length == 0 && (
          <Title level={4} type="warning">
            No properties for this address.{" "}
          </Title>
        )}
      </div>
    </div>
  );
};

export default TestPage;
