import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import { useFiatBuy, useMoralis, useMoralisQuery } from "react-moralis";
import { CrossCircle } from "@web3uikit/icons";
import { Table, message, Popconfirm, Spin } from "antd";
import { Modal } from "@web3uikit/core";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "../../styling/MainContainer/purchaseRequests.scss";
import { computeAddress, hexlify } from "ethers/lib/utils";
import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";

// importing images
import no_data from "../../assets/no_data.png";

const web3 = require("web3");
const { ethers } = require("ethers");
const console = require("console-browserify");

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PurchaseRequests = (props) => {
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

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 15) + " ... " + text.substring(text.length - 10);
    }
    return text;
  };

  // loads the dataSourceBuyer & dataSourceSeller
  useEffect(() => {
    // For Sellers
    async function loadSellerData() {
      setIsLoading(true);
      fetch(
        "http://localhost:9000/getPurchaseRequests?" +
          new URLSearchParams({
            sessionToken: user.getSessionToken(),
            ownerAddress: user.get("ethAddress"),
          })
      )
        .then((res) => res.json())
        .then((res) => {
          var temp = [];
          for (var i = 0; i < res.length; i++) {
            var e = res[i];
            temp.push({
              key: i,
              address: shortenAddress(e.address, 25),
              propertyID: e.propertyObjectId,
              dateRequested: e.createdAt,
            });
          }
          setDataSourceSeller(temp);
          console.log(res);
        });
      setIsLoading(false);
    }

    // For Buyers
    const loadBuyerRequests = async () => {
      try {
        const userEmails = Moralis.Object.extend("PurchaseRequest");
        const query = new Moralis.Query(userEmails);
        const userAddress = web3.utils.toChecksumAddress(
          user.get("ethAddress")
        );
        query.equalTo("requesterEthAddress", userAddress);
        const results = await query.find();
        let tempArray = [];
        let date;
        results.forEach((request, key) => {
          let day = request.createdAt.getDate().toString();
          let month = request.createdAt.getMonth().toString();
          let year = request.createdAt.getFullYear().toString();
          date = day + " - " + month + " - " + year;
          tempArray.push({
            key: key + 1,
            address: request.get("sellerEthAddress"),
            propertyID: request.get("propertyObjectId"),
            dateRequested: date,
            isAccepted: request.get("isAccepted"),
            isPending: request.get("isPending"),
          });
        });
        setDataSourceBuyer(tempArray);
        tempArray.sort(compareByDecision);
        // tempArray.sort(compareByAddress);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // calling the functions
    loadBuyerRequests();
    loadSellerData();
  }, []);

  // comparison functions
  // --------------------
  function compareByAddress(a, b) {
    if (a.address < b.address) {
      return -1;
    }
    if (a.address > b.address) {
      return 1;
    }
    return 0;
  }
  function compareByDecision(a, b) {
    if (a.isAccepted > b.isAccepted) {
      return -1;
    }
    if (a.isAccepted < b.isAccepted) {
      return 1;
    }
    return 0;
  }

  // variables
  const [dataSourceBuyer, setDataSourceBuyer] = useState([]);
  const [dataSourceSellerTemp, setDataSourceSellerTemp] = useState([
    {
      key: "1",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSVi",
      dateRequested: "10 Nov 2022",
      isPending: true,
    },
    {
      key: "2",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      isPending: false,
    },
    {
      key: "3",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      isPending: true,
    },
  ]);
  const [dataSourceSeller, setDataSourceSeller] = useState([]);
  const [pruchaseRequests, setPurchaseRequests] = useState([]);
  const [accepted, setAccepted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Functions for Seller to 'accept' or 'reject' the request
  const acceptRequest = (requesterAddress, propertyId) => {
    message.success(
      "Request Accepted for user (" + requesterAddress.slice(0, 12) + "...) "
    );
    removeRequest(dataSourceSellerTemp, requesterAddress, propertyId);
  };

  const rejectRequest = (address, propertyId) => {
    message.error(
      "Request Accepted for owner: " + address + " & propertyId: " + propertyId
    );
  };

  // removes the request with the property ID
  const removeRequest = (arr, ownerAddress, propertyId) => {
    let index;
    arr.map((request, k) => {
      if (
        request.address === ownerAddress &&
        request.propertyID === propertyId &&
        request.isPending === true
      ) {
        index = k;
      }
      const temp = setDataSourceSellerTemp;
      temp[index].isPending = false;
      setDataSourceSellerTemp(temp);
    });
  };

  // removes the object by the key and value
  let removeByAttr = function (arr, attr1, value1, attr2, value2) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr1) &&
        arr[i].hasOwnProperty(attr2) &&
        arguments.length > 2 &&
        arr[i][attr1] === value1 &&
        arr[i][attr2] === value2
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };

  // creates the agreementDraft for the property
  const createAgreementDraft = async (
    ownerAddress,
    propertyId,
    buyerAddress,
    agreementHash
  ) => {
    try {
      // if (!onlyNumbers(propertyId)) {
      //   message.error("Invalid Input: Id entered is in incorrect format.");
      //   return;
      // }
      // if (propertyId === "0") {
      //   message.error("Invalid ID! Property Id cannot be zero.");
      //   return;
      // }
      // if (terms == "") {
      //   message.error("Invalid Input! Terms of agreement cannot be empty.");
      //   return;
      // }

      // generating a random strings for the Agreement Hash
      const rand1 = Math.random().toString(36).substring(2, 12);
      const rand2 = Math.random().toString(36).substring(2, 12);
      const rand3 = Math.random().toString(36).substring(2, 12);
      const rand4 = Math.random().toString(36).substring(2, 8);
      const hash = rand1 + rand2 + rand3 + rand4;
      await realEstateContract.submitDraft(
        ownerAddress,
        parseInt(propertyId),
        buyerAddress,
        hash
      );
      message.success(
        "Agreement deployed successfully (hash: " + hash.slice(0, 10) + "...)"
      );
    } catch (error) {
      message.error("Error: " + error.error.reason);
    }
  };

  const {
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

  // shows the buyer purchase requests section
  if (props.isBuyer === "true") {
    if (!isLoading) {
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
              <p className="rightsidebar_title">My Purchase Requests</p>
              <div className="purchaseRequestsContainer">
                <div className="tableContainer">
                  <table className="normalTable">
                    <tr>
                      <th>Address of User</th>
                      <th>Property ID</th>
                      <th>Date Requested</th>
                      <th>Seller Decision</th>
                    </tr>
                    {/* Array is empty */}
                    {dataSourceBuyer.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          <img
                            src={no_data}
                            style={{ width: "10rem" }}
                            alt="no_Data"
                          ></img>
                        </td>
                      </tr>
                    )}
                    {dataSourceBuyer.map((item) => {
                      if (item.isPending === true) {
                        return (
                          <tr
                            key={item.key}
                            className="notBuyerFirstRowPending"
                          >
                            <td>{shortenAddress(item.address, 20)}</td>
                            <td>{item.propertyID}</td>
                            <td>{item.dateRequested}</td>
                            <td
                              className="requestAccepted"
                              style={{ color: "#666" }}
                            >
                              Pending
                            </td>
                          </tr>
                        );
                      }
                      // Accepted
                      if (
                        item.isAccepted === true &&
                        item.isPending === false
                      ) {
                        return (
                          <tr
                            key={item.key}
                            className="notBuyerFirstRowAccepted"
                          >
                            <td>{shortenAddress(item.address, 20)}</td>
                            <td>{item.propertyID}</td>
                            <td>{item.dateRequested}</td>
                            <td
                              className="requestAccepted"
                              style={{ color: "#2db32d" }}
                            >
                              <button
                                className="createAgreementDraftButton"
                                onClick={() => {}}
                              >
                                Create Agreement
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      // Rejected
                      if (
                        item.isAccepted === false &&
                        item.isPending === false
                      ) {
                        return (
                          <tr
                            key={item.key}
                            className="notBuyerFirstRowRejected"
                          >
                            <td>{shortenAddress(item.address, 20)}</td>
                            <td>{item.propertyID}</td>
                            <td>{item.dateRequested}</td>
                            <td
                              className="requestRejected"
                              style={{ color: "#FF0000" }}
                            >
                              Rejected
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            textAlign: "center",
            width: "60%",
            height: "50rem",
            marginLeft: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" style={{ margin: "0 2rem 0 0 " }} /> Loading
        </div>
      );
    }
  } else {
    // shows the Seller purchase requests section
    if (!isLoading) {
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
              <p className="rightsidebar_title">
                Purchase Requests for Properties
              </p>
              <div className="purchaseRequestsContainer">
                <div className="tableContainer">
                  <table className="normalTable">
                    <tr>
                      <th>Address of User</th>
                      <th>Property ID</th>
                      <th>Date Requested</th>
                      <th>Your Decision</th>
                    </tr>
                    {/* show no data icon if array is empty */}
                    {dataSourceSellerTemp.length === 0 && (
                      <tr>
                        <td colspan="4" style={{ textAlign: "center" }}>
                          <img
                            src={no_data}
                            style={{ width: "10rem" }}
                            alt="no_Data"
                          ></img>
                        </td>
                      </tr>
                    )}
                    {dataSourceSellerTemp.map((item) => {
                      if (item.isPending === true) {
                        return (
                          <tr
                            key={item.key}
                            className="notBuyerFirstRowAccepted"
                          >
                            <td>{item.address}</td>
                            <td>{item.propertyID}</td>
                            <td>{item.dateRequested}</td>
                            <td style={{ display: "flex", gap: "1rem" }}>
                              <button
                                className="acceptButton"
                                onClick={() => {
                                  acceptRequest(item.address, item.propertyID);
                                }}
                              >
                                Accept
                              </button>
                              <button
                                className="rejectButton"
                                onClick={() => {
                                  rejectRequest(item.address, item.propertyID);
                                }}
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            textAlign: "center",
            width: "60%",
            height: "50rem",
            marginLeft: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spin size="large" style={{ margin: "0 2rem 0 0 " }} /> Loading
        </div>
      );
    }
  }
};

export default PurchaseRequests;
