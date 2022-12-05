import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Table, message, Popconfirm, Spin } from "antd";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import Web3 from "web3";
import no_data from "../../assets/no_data.png";
import AgreementView from "./AgreementView";
import "./Agreementview.scss";
import Testpopup from "../../components/Properties/Popup";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AgreementsList = (props) => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [dataSourceTemp, setdataSourceTemp] = useState([
    {
      key: "1",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSVi",
      status: "Pending",
      dateRequested: "10 Nov 2022",
      isPending: true,
      details: {
        areDocsUploaded: true,
        isGovernmentVerified: false,
        needsRevision: false,
        isRevisionRequired: false,
      },
    },
    {
      key: "2",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c52...5da60538b327b95",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      status: "Pending",
      dateRequested: "10 Nov 2022",
      isPending: true,
      details: {
        areDocsUploaded: true,
        isGovernmentVerified: false,
        needsRevision: false,
        isRevisionRequired: false,
      },
    },
    {
      key: "3",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c53...5da60538b327b94",
      propertyID: "y7dM24zgRcYAs68Hs03FMSsi",
      dateRequested: "10 Nov 2022",
      status: "Pending",
      isPending: true,
      details: {
        areDocsUploaded: false,
        isGovernmentVerified: false,
        needsRevision: false,
        isRevisionRequired: false,
      },
    },
  ]);

  // function to change the view to agreement docs
  const handleAgreementDocs = (agreementID) => {
    props.toggleAgreementView(true);
  };

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 8) + " ... " + text.substring(text.length - 8);
    }
    return text;
  };

  const acceptRequest = (propertyId) => {
    message.success("Request Accepted for property (" + propertyId + "...) ");
    removeRequest(dataSourceTemp, propertyId);
  };

  const rejectRequest = (propertyId) => {
    message.error("Request Rejected for property: " + propertyId);
    removeRequest(dataSourceTemp, propertyId);
  };

  // removes the request with the property ID
  const removeRequest = (arr, propertyId) => {
    let index;
    arr.map((request, k) => {
      request.isPending = false;
      if (request.propertyID === propertyId && request.isPending === true) {
        index = k;
      }
      const temp = setdataSourceTemp;
      temp[index].isPending = false;
      setdataSourceTemp(temp);
    });
  };

  const loadAgreements = async () => {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getAllAgreements?" +
        new URLSearchParams({
          mode: "goverment",
          sessionToken: user.getSessionToken(),
          ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
        })
    )
      .then((res) => res.json())
      .then((res) => {
        setAgreements(res);
      })
      .catch((err) => {
        message.error("API error");
        setAgreements([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    message.info(user.getSessionToken());
  }, []);
  const [clicked, setClicked] = useState(false);

  if (!isLoading) {
    return (
      <div className="rightsidebar_container">
        <div>
          <div>
            <p className="rightsidebar_title">Argreement Drafts - Users</p>
            <div className="governmentAgreementsListContainer">
              <div className="tableContainer">
                <table className="normalTable">
                  <tr>
                    <th width="20%">Buyer Address</th>
                    <th width="20%">Seller Address</th>
                    <th width="15%">Property ID</th>
                    <th>Status</th>
                    <th>Date Sent</th>
                    <th>Decision</th>
                  </tr>
                  {/* show no data icon if array is empty */}
                  {dataSourceTemp.length === 0 && (
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
                  {dataSourceTemp.map((item) => {
                    if (item.isPending === true) {
                      return (
                        <tr key={item.key} className="FirstRow">
                          <td>{shortenAddress(item.buyeraddress, 20)}</td>
                          <td>{shortenAddress(item.selleraddress, 20)}</td>
                          <td>
                            {item.propertyID.slice(0, 5) +
                              " ... " +
                              item.propertyID.slice(
                                item.propertyID.length - 3,
                                item.propertyID.length
                              )}
                          </td>
                          <td>{item.status}</td>
                          <td>{item.dateRequested}</td>
                          <td style={{ display: "flex", gap: "1rem" }}>
                            {item.details.areDocsUploaded ? (
                              !item.details.isGovernmentVerified ? (
                                <button
                                  className="acceptButton"
                                  onClick={() => {
                                    handleAgreementDocs(item.agreementObjectID);
                                  }}
                                >
                                  View Documents
                                </button>
                              ) : (
                                <p className="documentsVerified">
                                  Documents are verified
                                </p>
                              )
                            ) : (
                              // <button
                              //   className="acceptButton"
                              //   onClick={() => {
                              //     handleAgreementDocs(item.agreementObjectID);
                              //   }}
                              // >
                              //   View Documents
                              // </button>
                              <p className="waitingForUpload">
                                Waiting for seller documents
                              </p>
                            )}
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
};

export default AgreementsList;
