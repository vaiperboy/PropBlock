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

  async function loadSellerData() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getPurchaseRequests?" +
      new URLSearchParams({
        mode: "seller",
        sessionToken: user.getSessionToken(),
        ownerAddress: user.get("ethAddress"),
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setDataSourceSeller(res)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function loadBuyerRequests() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getPurchaseRequests?" +
      new URLSearchParams({
        mode: "buyer",
        sessionToken: user.getSessionToken(),
        ownerAddress: user.get("ethAddress"),
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setDataSourceBuyer(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  // loads the dataSourceBuyer & dataSourceSeller
  useEffect(() => {
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



  const [isProcessing, setIsProcessing] = useState(false)
  const processRequest = async (key, doAccept) => {
    if (!isProcessing) {
      setIsProcessing(true)

      fetch(
        "http://localhost:9000/processPurchaseRequest?" +
        new URLSearchParams({
          sessionToken: user.getSessionToken(),
          ownerAddress: user.get("ethAddress"),
          key: key,
          type: doAccept ? "accept" : "reject"
        })
      )
        .then((res) => {
          message.success("Process has been " + (doAccept ? "accepted" : "rejected"))
          loadSellerData()
        }).catch(error => {
          message.error(error)
        })
        .finally(() => {
          setIsProcessing(false)
        })
    } else {
      message.info("process already in progress...")
    }

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

  const rejectRequest = (address, propertyId) => {
    message.error(
      "Request Accepted for owner: " + address + " & propertyId: " + propertyId
    );
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
                                onClick={() => { }}
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
                    {dataSourceSeller.length === 0 && (
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
                    {dataSourceSeller.map((item) => {
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
                      } else {
                        return (
                          <tr
                            key={item.key}
                            className="notBuyerFirstRowAccepted"
                          >
                            <td>{item.address}</td>
                            <td>{item.propertyID}</td>
                            <td>{item.dateRequested}</td>
                            <td style={{ display: "flex", gap: "1rem" }}>{item.isAccepted ? "accepted" : "rejected"}</td>
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
