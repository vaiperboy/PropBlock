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
  const [agreementsSource, setAgreementsSource] = useState([
    // {
    //   key: "1",
    //   buyeraddress: "0x4001A8651c51...5da60538b327b96",
    //   selleraddress: "0x4001A8651c51...5da60538b327b96",
    //   propertyID: "y7dM24zgRcYAs68Hs03FMSVi",
    //   status: "Pending",
    //   dateRequested: "10 Nov 2022",
    //   isPending: true,
    //   details: {
    //     areDocsUploaded: true,
    //     isGovernmentVerified: false,
    //     needsRevision: false,
    //     isRevisionRequired: false,
    //   },
    // },
    // {
    //   key: "2",
    //   buyeraddress: "0x4001A8651c51...5da60538b327b96",
    //   selleraddress: "0x4001A8651c52...5da60538b327b95",
    //   propertyID: "y7dM24zgRcYAs68Hs03FMSki",
    //   status: "Pending",
    //   dateRequested: "10 Nov 2022",
    //   isPending: true,
    //   details: {
    //     areDocsUploaded: true,
    //     isGovernmentVerified: false,
    //     needsRevision: false,
    //     isRevisionRequired: false,
    //   },
    // },
    // {
    //   key: "3",
    //   buyeraddress: "0x4001A8651c51...5da60538b327b96",
    //   selleraddress: "0x4001A8651c53...5da60538b327b94",
    //   propertyID: "y7dM24zgRcYAs68Hs03FMSsi",
    //   dateRequested: "10 Nov 2022",
    //   status: "Pending",
    //   isPending: true,
    //   details: {
    //     areDocsUploaded: false,
    //     isGovernmentVerified: false,
    //     needsRevision: false,
    //     isRevisionRequired: false,
    //   },
    // },
  ]);


  // function to change the view to agreement docs
  const handleAgreementDocs = (agreementID) => {
    props.setAgreementId(agreementID)
    props.toggleAgreementView(true);
  };

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 8) + " ... " + text.substring(text.length - 8);
    }
    return text;
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
        setAgreementsSource(res);
      })
      .catch((err) => {
        message.error("API error");
        setAgreementsSource([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadAgreements()
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
                    <th>Date Sent</th>
                    <th>Decision</th>
                  </tr>
                  {agreementsSource.length === 0 && (
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
                  {agreementsSource.map((item) => {
                    return (
                      <tr key={item.objectId} className="FirstRow">
                        <td>{shortenAddress(item.buyerAddress, 20)}</td>
                        <td>{shortenAddress(item.landlordAddress, 20)}</td>
                        <td>
                          <a href={"/property/" + item.details.propertyObjectId} target="_blank">
                            {
                              item.details.propertyObjectId.slice(0, 5) +
                              " ... " +
                              item.details.propertyObjectId.slice(
                                item.details.propertyObjectId.length - 3,
                                item.details.propertyObjectId.length
                              )
                            }
                          </a>
                        </td>
                        <td>{item.createdAt}</td>
                        <td style={{ display: "flex", gap: "1rem" }}>
                          {item.details.areDocsUploaded ? (
                            !item.details.isGovernmentVerified ? (
                              <button
                                className="acceptButton"
                                onClick={() => {
                                  handleAgreementDocs(item.objectId);
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
                            <p className="waitingForUpload">
                              Waiting for seller documents
                            </p>
                          )}
                        </td>
                      </tr>
                    );
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
