import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { useMoralis } from "react-moralis";
import { message, Popconfirm, Spin } from "antd";
import MyAgreements from "./MyAgreements";
import no_data from "../../assets/no_data.png";
import "../../styling/MainContainer/Agreements.scss";
import AgreementView from "./AgreementView";
import refresh_icon from "../../assets/refresh_iconx2.png";
import Web3 from "web3";
const console = require("console-browserify");

const AgreementsList = (props) => {
  const [showAgreement, setShowAgreements] = useState(false);
  const [dataSourceSeller, setDataSourceSeller] = useState([
    // upload documents - first time
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: false,
    //   isBeingVerified: false,
    //   notFirstTime: false,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // uploaded documents - first time
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: true,
    //   isBeingVerified: false,
    //   notFirstTime: false,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // uploaded && approved
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: true,
    //   isBeingVerified: true,
    //   notFirstTime: false,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: true,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // needs revision - upload needed second time
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: false,
    //   isBeingVerified: true,
    //   notFirstTime: true,
    //   isRevisionRequired: true,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // uploaded second time - after revision
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: true,
    //   isBeingVerified: false,
    //   notFirstTime: true,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // buyer cancelled
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: true,
    //   isBeingVerified: false,
    //   notFirstTime: false,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: true,
    //   isOwnerCancelled: false,
    //   buyerPaymentComplete: false,
    // },
    // // owner cancelled
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   buyerAddress: "0x4D06acf12147CfD22C5a3d0A73ece625D0999aE3",
    //   propertyID: "1",
    //   agreementId: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   areDocsUploaded: true,
    //   isBeingVerified: false,
    //   notFirstTime: false,
    //   isRevisionRequired: false,
    //   isGovernmentVerified: false,
    //   isBuyerCancelled: false,
    //   isOwnerCancelled: true,
    //   buyerPaymentComplete: false,
    // },
  ]);
  const [dataSourceBuyer, setDataSourceBuyer] = useState([
    // {
    //   key: "1",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   propertyID: "1",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   isGovernmentVerified: false,
    //   isOwnerCancelled: false,
    //   isBuyerCancelled: false,
    //   isTransfered: false,
    // },
    // {
    //   key: "2",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   propertyID: "2",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   isGovernmentVerified: true,
    //   isOwnerCancelled: false,
    //   isBuyerCancelled: false,
    //   isTransfered: false,
    // },
    // {
    //   key: "3",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   propertyID: "3",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   isGovernmentVerified: false,
    //   isOwnerCancelled: true,
    //   isBuyerCancelled: false,
    //   isTransfered: false,
    // },
    // {
    //   key: "4",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   propertyID: "4",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   isGovernmentVerified: false,
    //   isOwnerCancelled: false,
    //   isBuyerCancelled: true,
    //   isTransfered: false,
    // },
    // {
    //   key: "5",
    //   ownerAddress: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
    //   propertyID: "5",
    //   propertyObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    //   isGovernmentVerified: true,
    //   isOwnerCancelled: false,
    //   isBuyerCancelled: false,
    //   isTransfered: true,
    // },
  ]);
  // const [agreements, setAgreements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadDocumentsView, setUploadDocumentsView] = useState(false);

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 15) + " ... " + text.substring(text.length - 10);
    }
    return text;
  };

  // function run when clicked on finish agreement button
  const completeAgreement = (ownerAddress, agreementId) => {
    try {
      props.toggleAgreementPaymentView(true);
      props.setOwnerAddress(ownerAddress);
      props.setAgreementId(agreementId);
    } catch (error) {
      console.log("error: " + error);
    }
  };

  function sortByAction(a, b) {
    if (a.isGovernmentVerified > b.isGovernmentVerified) {
      return -1;
    }
    if (a.isGovernmentVerified < b.isGovernmentVerified) {
      return 1;
    }
    return 0;
  }

  const handleUploadDocuments = (agreementId) => {
    try {
      setUploadDocumentsView(true);
      props.setAgreementId(agreementId);
      props.toggleAgreementView(true);
    } catch (error) {
      console.log("Error: ", error);
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

  // runs first
  useEffect(() => {
    loadBuyerAgreements();
    loadSellerAgreements();
  }, []);

  async function loadBuyerAgreements() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getAllAgreements?" +
        new URLSearchParams({
          mode: "buyer",
          sessionToken: user.getSessionToken(),
          ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
        })
    )
      .then((res) => res.json())
      .then((res) => {
        setDataSourceBuyer(res);
      })
      .catch((err) => {
        message.error("API error");
        setDataSourceBuyer([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function loadSellerAgreements() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getAllAgreements?" +
        new URLSearchParams({
          mode: "seller",
          sessionToken: user.getSessionToken(),
          ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
        })
    )
      .then((res) => res.json())
      .then((res) => {
        setDataSourceSeller(res);
      })
      .catch((err) => {
        message.error("API error");
        setDataSourceSeller([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

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
              <p className="rightsidebar_title">Agreements </p>
              <div className="agreementsContainer">
                <div className="refreshSection">
                  <button
                    className="refreshButton"
                    onClick={() => {
                      loadBuyerAgreements();
                    }}
                  >
                    Refresh{" "}
                    <img src={refresh_icon} alt="Refresh Icon" width={20}></img>
                  </button>
                </div>
                <div className="tableContainer">
                  <table className="buyersTable">
                    <tr>
                      <th width="30%">Owner's Address</th>
                      <th width="13%">Property ID</th>
                      <th>Agreement Status</th>
                      <th width="25%">Action</th>
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
                    {dataSourceBuyer.map((item, i) => {
                      // Agreement is cancelled by the buyer
                      if (item.details.isBuyerCancelled === true) {
                        return (
                          <tr
                            key={item.objectId}
                            className="agreementCancelled"
                          >
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#cb4335" }}>
                              You Cancelled the agreement
                            </td>
                            <td>-</td>
                          </tr>
                        );
                      }
                      // Agreement is cancelled by the owner of the property
                      if (item.details.isOwnerCancelled === true) {
                        return (
                          <tr
                            key={item.objectId}
                            className="agreementCancelled"
                          >
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#cb4335" }}>
                              Cancelled by Owner
                            </td>
                            <td>-</td>
                          </tr>
                        );
                      }
                      // documents are to be uploaded by the user
                      if (item.details.areDocsUploaded === false) {
                        return (
                          <tr
                            key={item.objectId}
                            className="agreementCancelled"
                          >
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#3daeee" }}>
                              Waiting for Seller Documents Upload
                            </td>
                            <td className="acceptAgreement">- </td>
                          </tr>
                        );
                      }
                      // Agreement Completed
                      if (item.details.isTransfered === true) {
                        return (
                          <tr
                            key={item.objectId}
                            className="agreementCompleted"
                          >
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#3daeee" }}>
                              Agreement Completed
                            </td>
                            <td className="acceptAgreement">- </td>
                          </tr>
                        );
                      }
                      // Complete Agreement
                      if (
                        item.details.isGovernmentVerified === true &&
                        item.details.isOwnerCancelled === false &&
                        item.details.isBuyerCancelled === false
                      ) {
                        return (
                          <tr key={item.objectId} className="agreementComplete">
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#2ecc71" }}>Govt. Verified</td>
                            <td className="acceptAgreement">
                              <button
                                className="finishAgreementButton"
                                onClick={() => {
                                  completeAgreement(
                                    item.ownerAddress,
                                    item.agreementId
                                  );
                                }}
                              >
                                Finish Agreement
                              </button>
                            </td>
                          </tr>
                        );
                      }
                      // Agreement waiting for government approval
                      if (
                        item.details.isGovernmentVerified === false &&
                        item.details.isOwnerCancelled === false &&
                        item.details.isBuyerCancelled === false
                      ) {
                        return (
                          <tr
                            key={item.objectId}
                            className="agreementCancelled"
                          >
                            <td>{shortenAddress(item.landlordAddress, 20)}</td>
                            <td>
                              <a
                                href={
                                  "property/" + item.details.propertyObjectId
                                }
                                target="_blank"
                              >
                                {item.details.propertyObjectId}
                              </a>
                            </td>
                            <td style={{ color: "#3daeee" }}>
                              Govt. Approval Pending
                            </td>
                            <td className="acceptAgreement">- </td>
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
    if (!isLoading) {
      if (showAgreement) return <MyAgreements />;
      else {
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
                <p className="rightsidebar_title">My Properties Agreements</p>
                <div className="agreementsContainer">
                  <div className="refreshSection">
                    <button
                      className="refreshButton"
                      onClick={() => {
                        loadSellerAgreements();
                      }}
                    >
                      Refresh{" "}
                      <img
                        src={refresh_icon}
                        alt="Refresh Icon"
                        width={20}
                      ></img>
                    </button>
                  </div>
                  <div className="tableContainer">
                    <table className="buyersTable">
                      <tr>
                        <th width="28%">Owner's Address</th>
                        <th width="13%">Property ID</th>
                        <th>Agreement Status</th>
                        <th width="20%">Action</th>
                      </tr>
                      {/* Array is empty */}
                      {dataSourceSeller.length === 0 && (
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
                      {dataSourceSeller.map((item) => {
                        // Agreement is cancelled by the owner of the property
                        if (item.details.isOwnerCancelled === true) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementCancelled"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "red" }}>
                                Cancelled by Owner
                              </td>
                              <td>-</td>
                            </tr>
                          );
                        }
                        // Agreement is cancelled by the buyer
                        if (item.details.isBuyerCancelled === true) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementCancelled"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "red" }}>Cancelled</td>
                              <td>-</td>
                            </tr>
                          );
                        }
                        // Upload documents for the agreement - first time
                        if (
                          item.details.areDocsUploaded === false &&
                          item.details.needsRevision === false
                        ) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementCancelled"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "#3daeee" }}>
                                Upload Documents for agreement
                              </td>
                              <td>
                                <buttom
                                  className="uploadDocumentsButton"
                                  onClick={() => {
                                    handleUploadDocuments(item.objectId);
                                  }}
                                >
                                  Upload Documents
                                </buttom>
                              </td>
                            </tr>
                          );
                        }
                        // Document are uploaded - first time && waiting approval
                        if (
                          item.details.areDocsUploaded === true &&
                          item.details.needsRevision === false &&
                          item.details.isBeingVerified === true
                        ) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementComplete"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "#666666" }}>
                                Govt. Approval Pending
                              </td>
                              <td> - </td>
                            </tr>
                          );
                        }
                        // documents are uploaded and approved
                        if (
                          item.details.areDocsUploaded === true &&
                          item.details.isGovernmentVerified === true
                        ) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementComplete"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "#2ecc71" }}>
                                Govt. Approved
                              </td>
                              <td> - </td>
                            </tr>
                          );
                        }
                        // documents need revison
                        if (
                          item.details.areDocsUploaded === true &&
                          item.details.needsRevision === true &&
                          item.details.isBeingVerified === false
                        ) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementComplete"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "#dc8d0f" }}>
                                Documents Invalid - Upload valid Documents
                              </td>
                              <td>
                                <buttom
                                  className="uploadDocumentsButton"
                                  onClick={() => {
                                    handleUploadDocuments(item.objectId);
                                  }}
                                >
                                  Upload Documents
                                </buttom>
                              </td>
                            </tr>
                          );
                        }
                        // Document are uploaded - not first time && waiting approval
                        if (
                          item.details.areDocsUploaded === true &&
                          item.details.needsRevision === true &&
                          item.details.isBeingVerified === true
                        ) {
                          return (
                            <tr
                              key={item.objectId}
                              className="agreementComplete"
                            >
                              <td>{shortenAddress(item.buyerAddress, 20)}</td>
                              <td>
                                <a
                                  href={
                                    "property/" + item.details.propertyObjectId
                                  }
                                  target="_blank"
                                >
                                  {item.details.propertyObjectId}
                                </a>
                              </td>
                              <td style={{ color: "#666666" }}>
                                Govt. Approval Pending (After revision)
                              </td>
                              <td> - </td>
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
      }
    } else {
      if (showAgreement) {
        try {
          return <MyAgreements />;
        } catch (error) {}
      } else
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

export default AgreementsList;
