import React from "react";
import Navbar from "../Navbar";
import "../../styling/Home/Home.css";
import Title from "antd/lib/skeleton/Title";
import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";
import { useState, useEffect } from "react";
import { message, Descriptions, Typography, Input } from "antd";
import { Button, Loading } from "@web3uikit/core";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { checkAddress, onlyNumbers } from "./PropertyFunc";
const console = require("console-browserify");
const { ethers } = require("ethers");

const AgreementFunc = () => {
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
  const { TextArea } = Input;
  const [address, setAddress] = useState("");
  const [landlordAddressSubmit, setLandlordAddressSubmit] = useState("");
  const [buyerAddressSubmit, setBuyerAddressSubmit] = useState("");
  const [propertyIdSubmit, setPropertyIdSubmit] = useState("");
  const [otherTerms, setOtherTerms] = useState("");
  const [landlordAddressDecision, setLandlordAddressDecision] = useState("");
  const [buyerAddressDecision, setBuyerAddressDecision] = useState("");
  const [propertyIdDecision, setPropertyIdDecision] = useState("");
  const [landlordAddressCancel, setLandlordAddressCancel] = useState("");
  const [propertyIdCancel, setPropertyIdCancel] = useState("");
  const [landlordAddressSign, setLandlordAddressSign] = useState("");
  const [buyerAddressSign, setBuyerAddressSign] = useState("");
  const [propertyIdSign, setPropertyIdSign] = useState("");
  const [landlordAddressComplete, setLandlordAddressComplete] = useState("");
  const [buyerAddressComplete, setBuyerAddressComplete] = useState("");
  const [propertyIdComplete, setPropertyIdComplete] = useState("");
  const [testingLandlordAddress, setTestingLandlordAddress] = useState();
  const [testingBuyerAddress, setTestingBuyerAddress] = useState();
  const [testingPropertyId, setTestingPropertyId] = useState();
  const temp = async () => {};

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
      if (results.length == 0) {
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
      if (results.length == 0) {
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

  // checks if the agreement Draft exists
  const checkAgreementDraftExists = async (landAddr, propId) => {
    try {
      const agreementDrafts = Moralis.Object.extend("AgreementDrafts");
      const query = new Moralis.Query(agreementDrafts);
      query.equalTo("landlordAddress", landAddr);
      query.equalTo("propertyID", propId);
      query.select("landlordAddress");
      const results = await query.find();
      if (results.length == 0) {
        message.error(
          "Agreement does not exist for this landlord address and Id."
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // checks if the agreement Draft exists
  const checkAgreementDraftExistsWithBuyer = async (
    landAddr,
    buyerAddr,
    propId
  ) => {
    try {
      const agreementDrafts = Moralis.Object.extend("AgreementDrafts");
      const query = new Moralis.Query(agreementDrafts);
      query.equalTo("landlordAddress", landAddr);
      query.equalTo("buyerAddress", buyerAddr);
      query.equalTo("propertyID", propId);
      query.select("landlordAddress");
      const results = await query.find();
      if (results.length == 0) {
        message.error(
          "Agreement does not exist for this landlord address and Id."
        );
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // Submit draft function
  const submitDraftUsingContract = async (
    landAddr,
    buyerAddr,
    propId,
    terms
  ) => {
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
      if (terms == "") {
        message.error("Invalid Input! Terms of agreement cannot be empty.");
        return;
      }
      const landlordExists = await checkLandlordExists(landAddr);
      const buyerExists = await checkLandlordExists(buyerAddr);
      if (!landlordExists || !buyerExists) {
        return;
      }
      const propertyExists = await checkPropertyExists(landAddr, propId);
      if (!propertyExists) {
        return;
      }
      const rand1 = Math.random().toString(36).substring(2, 12);
      const rand2 = Math.random().toString(36).substring(2, 12);
      const rand3 = Math.random().toString(36).substring(2, 12);
      const rand4 = Math.random().toString(36).substring(2, 8);
      const hash = rand1 + rand2 + rand3 + rand4;
      await realEstateContract.submitDraft(
        landAddr,
        parseInt(propId),
        buyerAddr,
        terms,
        hash
      );
      message.success(
        "Agreement deployed successfully (hash: " + hash.slice(0, 10) + "...)"
      );
    } catch (error) {
      message.error("Error: " + error.error.reason);
    }
  };

  // Accept/ Decline Agreement Offer
  const agreementDecisionUsingContract = async (landAddr, propId, decision) => {
    try {
      if (!checkAddress(landAddr)) {
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
      if (!landlordExists) {
        return;
      }
      const agreementDraftExists = await checkAgreementDraftExists(
        landAddr,
        propId
      );
      if (!agreementDraftExists) {
        return;
      }
      await realEstateContract.agreementDecision(
        landAddr,
        parseInt(propId),
        decision
      );
      if (decision) {
        message.success(
          "Agreement Accepted! Agreement Status changed to 'confirmed'"
        );
      } else
        message.success(
          "Agreement Declined! Agreement Status changed to 'rejected'"
        );
    } catch (error) {
      message.error("Error: " + error.error);
    }
  };

  // get Agreement Status
  const getAgreementStatus = async (landAddr, propId) => {
    try {
      const agreementDraftExists = await checkAgreementDraftExists(
        landAddr,
        propId
      );
      if (!agreementDraftExists) {
        return;
      }
      const agreementDrafts = Moralis.Object.extend("AgreementDraftStatus");
      const query = new Moralis.Query(agreementDrafts);
      query.equalTo("landlordAddress", landAddr);
      query.equalTo("propertyId", propId);
      query.descending("updatedAt");
      query.select("status");
      const results = await query.find();
      const agreementStatus = results[0].get("status");
      if (results.length == 0) {
        message.error("Agreement does not exist for these addresses and Id.");
        return "null";
      } else {
        return agreementStatus;
      }
    } catch (error) {
      message.error("Error: " + error);
    }
  };

  // Cancel Agreement
  const cancelAgreementUsingContract = async (landAddr, propId) => {
    try {
      if (!checkAddress(landAddr)) {
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
      if (!landlordExists) {
        return;
      }
      const agreementDraftExists = await checkAgreementDraftExists(
        landAddr,
        propId
      );
      if (!agreementDraftExists) {
        return;
      }
      const agreementStatus = await getAgreementStatus(landAddr, propId);
      if (
        agreementStatus == "2" ||
        agreementStatus == "4" ||
        agreementStatus == "5" ||
        agreementStatus == "6"
      ) {
        message.error("Agreement Draft cannot be cancelled. ");
        return;
      }
      await realEstateContract.cancellAgreement(landAddr, propId);
      message.success("Agreement cancelled successsfully.");
    } catch (error) {
      message.error("Error: ", error.error);
    }
  };

  // landlord Sign Agreement
  const landlordSignAgreement = async (landAddr, buyerAddr, propId) => {
    try {
      if (!checkAddress(landAddr) || !checkAddress(buyerAddr)) {
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
      if (!landlordExists) {
        return;
      }
      const buyerExists = await checkLandlordExists(buyerAddr);
      if (!buyerExists) {
        return;
      }
      const agreementDraftExists = await checkAgreementDraftExistsWithBuyer(
        landAddr,
        buyerAddr,
        propId
      );
      if (!agreementDraftExists) {
        return;
      }
      if (!window.ethereum) {
        message.error(
          "No wallet detected! Please install metamask or any other wallet."
        );
      }
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signatureMessage = String(
        landAddr.slice(0, 15) + buyerAddr.slice(0, 16) + propId
      );

      const landlordSignature = await signer.signMessage(signatureMessage);
      const address = await signer.getAddress();
      if (address !== landAddr) {
        message.error(
          "You cannot sign the transaction. Only the landlord can sign the transaction."
        );
        return;
      }
      await realEstateContract.landlordSignedAgreement(
        landAddr,
        parseInt(propId),
        landlordSignature
      );
      message.success(
        "Landlord (add: " +
          landAddr.slice(0, 10) +
          "...) signed the transaction successfully."
      );
      console.log(
        "signedContent: " +
          signatureMessage +
          ", \nlandlordSignature: " +
          landlordSignature +
          ",\n address: " +
          address
      );
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        message.error("User rejected the signature");
        return;
      }
      message.error("Error: " + error.error.reason);
      return;
    }
  };

  // Buyer Sign Agreement
  const buyerSignAgreement = async (landAddr, buyerAddr, propId) => {
    try {
    } catch (error) {
      message.error("Error: ", error.error);
    }
  };

  // landlord Sign Agreement
  const testingLandlordSign = async (landAddr, buyerAddr, propId) => {
    try {
      if (!window.ethereum) {
        message.error(
          "No wallet detected! Please install metamask or any other wallet."
        );
      }
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signatureMessage = String(
        landAddr.slice(0, 15) + buyerAddr.slice(0, 16) + propId
      );

      const landlordSignature = await signer.signMessage(signatureMessage);
      const address = await signer.getAddress();
      console.log(
        "signedContent: hello, \nlandlordSignature: " +
          landlordSignature +
          ",\n address: " +
          address
      );

      const messageVerification = await verifySignature(
        signatureMessage,
        landlordSignature,
        address
      );
      if (!messageVerification) {
        return;
      }
      message.success("Message was verified");
    } catch (error) {
      if (error.code === "ACTION_REJECTED") {
        message.error("User rejected the signature");
        return;
      }
      console.log("Error: " + error.code);
      return;
    }
  };

  const verifySignature = async (Message, signature, address) => {
    try {
      const signAddr = await ethers.utils.verifyMessage(Message, signature);
      if (signAddr !== address) {
        message.error("Signature was not verified.");
        return false;
      }
      return true;
    } catch (error) {
      console.log("Error1: " + error);
    }
  };
  // Buyer Sign Agreement
  const testingBuyerSign = async (landAddr, propId) => {
    try {
    } catch (error) {
      message.error("Error: " + error.error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="hero-section">
        <Title level={3} style={{ margin: "1rem 0 0 0" }}>
          Check Address
        </Title>
        <label htmlFor="area">Enter the landlord Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "30rem" }}
        />
        <Button
          text="Check Address"
          className="borderSquare"
          theme="colored"
          color="green"
          onClick={() => temp()}
        />
        <hr style={{ width: "100%" }} />
        <Title level={3} style={{ margin: "1rem 0 0 0", color: "#338fff" }}>
          Submit Draft (Agreement)
        </Title>
        <label htmlFor="area">Enter the landlord Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setLandlordAddressSubmit(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the Buyer's Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setBuyerAddressSubmit(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the property Id:</label>
        <Input
          placeholder="eg: 12"
          onChange={(e) => setPropertyIdSubmit(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label>Enter the Terms of Agreement:</label>
        <TextArea
          placeholder="Terms of Agreement"
          autoSize={{
            minRows: 5,
          }}
          onChange={(e) => setOtherTerms(e.target.value)}
        />
        <Button
          text="Submit Draft"
          theme="colored"
          color="blue"
          className="borderSquare"
          onClick={() =>
            submitDraftUsingContract(
              landlordAddressSubmit,
              buyerAddressSubmit,
              propertyIdSubmit,
              otherTerms
            )
          }
        />
        <hr style={{ width: "100%" }} />
        <Title level={3} style={{ margin: "1rem 0 0 0", color: "#ce9a39" }}>
          Agreement Offer Desicion
        </Title>
        <label htmlFor="area">Enter the landlord's Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setLandlordAddressDecision(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the Buyer's Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setBuyerAddressDecision(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the property Id:</label>
        <Input
          placeholder="eg: 12"
          onChange={(e) => setPropertyIdDecision(e.target.value)}
          style={{ width: "30rem" }}
        />
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Button
            text="Accept"
            theme="colored"
            color="green"
            className="borderSquare"
            onClick={() => {
              agreementDecisionUsingContract(
                landlordAddressDecision,
                propertyIdDecision,
                true
              );
            }}
          />
          <Button
            text="Decline"
            theme="colored"
            color="red"
            className="borderSquare"
            onClick={() => {
              agreementDecisionUsingContract(
                landlordAddressDecision,
                buyerAddressDecision,
                propertyIdDecision,
                false
              );
            }}
          />
        </div>
        <hr style={{ width: "100%" }} />
        <Title level={3} style={{ margin: "1rem 0 0 0", color: "#ce3939" }}>
          Cancel Agreement
        </Title>
        <label htmlFor="area">Enter the landlord Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setLandlordAddressCancel(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the property Id:</label>
        <Input
          placeholder="eg: 12"
          onChange={(e) => setPropertyIdCancel(e.target.value)}
          style={{ width: "30rem" }}
        />
        <Button
          text="Cancel Agreement"
          theme="colored"
          color="red"
          style={{ marginTop: "1rem" }}
          className="borderSquare"
          onClick={() => {
            cancelAgreementUsingContract(
              landlordAddressCancel,
              propertyIdCancel
            );
          }}
        />
        <hr style={{ width: "100%" }} />
        <Title level={3} style={{ margin: "1rem 0 0 0", color: "#399fce" }}>
          Landlord & Buyer Sign Agreement
        </Title>
        <label htmlFor="area">Enter the landlord Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setLandlordAddressSign(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the Buyer's Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setBuyerAddressSign(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the property Id:</label>
        <Input
          placeholder="eg: 12"
          onChange={(e) => setPropertyIdSign(e.target.value)}
          style={{ width: "30rem" }}
        />
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <Button
            text="Landlord Sign Agreement"
            theme="colored"
            color="green"
            style={{ marginTop: "1rem" }}
            className="borderSquare"
            onClick={() => {
              landlordSignAgreement(
                landlordAddressSign,
                buyerAddressSign,
                propertyIdSign
              );
            }}
          />
          <Button
            text="Buyer Sign Agreement"
            theme="colored"
            color="yellow"
            style={{ marginTop: "1rem" }}
            className="borderSquare"
            onClick={() => {
              buyerSignAgreement(
                landlordAddressSign,
                buyerAddressSign,
                propertyIdSign
              );
            }}
          />
        </div>
        <hr style={{ width: "100%" }} />
        <Title level={3} style={{ margin: "1rem 0 0 0", color: "#399fce" }}>
          Complete Agreement
        </Title>
        <label htmlFor="area">Enter the landlord Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setLandlordAddressComplete(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the Buyer's Address:</label>
        <Input
          placeholder="eg: 0x12Dd1sa... "
          onChange={(e) => setBuyerAddressComplete(e.target.value)}
          style={{ width: "30rem" }}
        />
        <label htmlFor="area">Enter the property Id:</label>
        <Input
          placeholder="eg: 12"
          onChange={(e) => setPropertyIdComplete(e.target.value)}
          style={{ width: "30rem" }}
        />
        <Button
          text="Landlord Sign Agreement"
          theme="colored"
          color="blue"
          style={{ marginTop: "1rem" }}
          className="borderSquare"
          onClick={() => {
            cancelAgreementUsingContract(
              landlordAddressCancel,
              propertyIdCancel
            );
          }}
        />
        <div style={{ height: "5rem" }}></div>
      </div>
    </div>
  );
};

export default AgreementFunc;
