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
  const [table, setTable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [agreements, setAgreements] = useState([])
  const [dataSourceTemp, setdataSourceTemp] = useState([
    {
      key: "1",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSVi",
      status: "Pending",
      dateRequested: "10 Nov 2022",
      isPending: true,
    },
    {
      key: "2",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c52...5da60538b327b95",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      status: "Pending",
      dateRequested: "10 Nov 2022",
      isPending: true,
    },
    {
      key: "3",
      buyeraddress: "0x4001A8651c51...5da60538b327b96",
      selleraddress: "0x4001A8651c53...5da60538b327b94",
      propertyID: "y7dM24zgRcYAs68Hs03FMSsi",
      dateRequested: "10 Nov 2022",
      status: "Pending",
      isPending: true,
    },
  ]);

  // Function to shorten the address
  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 10) + " ... " + text.substring(text.length - 10);
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
  }

  useEffect(() => {
    message.info(user.getSessionToken())
    }, []);
  const [clicked, setClicked] = useState(false);

  if (table) {
    if (!isLoading) {
      return (
        <div className="rightsidebar_container">
          <div
            style={{
              minWidth: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <p className="rightsidebar_title">Argreement Drafts - Users</p>
              <div className="governmentAgreementsListContainer">
                <div className="tableContainer">
                  <table className="normalTable">
                    <tr>
                      <th>Buyer Address</th>
                      <th>Seller Address</th>
                      <th>Property ID</th>
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
                            <td
                              onClick={() => {
                                setTable(false);
                              }}
                            >
                              {shortenAddress(item.buyeraddress, 20)}
                            </td>
                            <td
                              onClick={() => {
                                setTable(false);
                              }}
                            >
                              {shortenAddress(item.selleraddress, 20)}
                            </td>
                            <td
                              onClick={() => {
                                setTable(false);
                              }}
                            >
                              {item.propertyID.slice(0, 5) +
                                " ... " +
                                item.propertyID.slice(
                                  item.propertyID.length - 5,
                                  item.propertyID.length
                                )}
                            </td>
                            <td
                              onClick={() => {
                                setTable(false);
                              }}
                            >
                              {item.status}
                            </td>
                            <td
                              onClick={() => {
                                setTable(false);
                              }}
                            >
                              {item.dateRequested}
                            </td>
                            <td style={{ display: "flex", gap: "1rem" }}>
                              <button
                                className="acceptButton"
                                onClick={() => {
                                  acceptRequest(item.propertyID);
                                }}
                              >
                                Accept
                              </button>
                              <button
                                className="rejectButton"
                                onClick={() => {
                                  rejectRequest(item.propertyID);
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
  } else {
    if (!isLoading) {
      return (
        <div className="rightsidebar_container">
          <div>
            <p
              className="agreement_view_subtitle"
              style={{ marginBottom: 15, color: "#555555" }}
            >
              Agreement ID - #12
            </p>
          </div>

          <div className="rightchild">
            <div className="buyerdoc">
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 23 }}
              >
                <p
                  className="agreement_view_subtitle"
                  style={{ color: "#3DAEEE", marginBottom: 0 }}
                >
                  Buyer’s Documents
                  <span style={{ color: "#555555" }}>(0x6e8 ... D00f94)</span>
                </p>
                <div className="rightPic"></div>
              </div>
              <div style={{ marginTop: 50 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <svg
                      width="40"
                      height="47"
                      viewBox="0 0 40 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                        fill="#1877F2"
                      />
                    </svg>
                    <p className="document_title">NOC Uploaded</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="accept_button"
                      style={{ userSelect: "none" }}
                    >
                      Accept
                    </button>
                    <button
                      className="reject_button"
                      style={{ userSelect: "none" }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <p className="document_title">
                    Reason for rejection (if applicable)
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <textarea
                      className="profile_form_textarea"
                      type="text"
                      defaultValue=""
                      style={{ height: "58px", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="horizontalline" />
              </div>
              <div style={{ marginTop: 20 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <svg
                      width="40"
                      height="47"
                      viewBox="0 0 40 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                        fill="#1877F2"
                      />
                    </svg>
                    <p className="document_title">MOU Uploaded</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="accept_button"
                      style={{ userSelect: "none" }}
                    >
                      Accept
                    </button>
                    <button
                      className="reject_button"
                      style={{ userSelect: "none" }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <p className="document_title">
                    Reason for rejection (if applicable)
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <textarea
                      className="profile_form_textarea"
                      type="text"
                      defaultValue=""
                      style={{ height: "58px", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="horizontalline" />
              </div>
              <div style={{ marginTop: 20 }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 20 }}
                  >
                    <svg
                      width="40"
                      height="47"
                      viewBox="0 0 40 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                        fill="#1877F2"
                      />
                    </svg>
                    <p className="document_title">Other Relevant docs</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className="accept_button"
                      style={{ userSelect: "none" }}
                    >
                      Accept
                    </button>
                    <button
                      className="reject_button"
                      style={{ userSelect: "none" }}
                    >
                      Decline
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 20,
                  }}
                >
                  <p className="document_title">
                    Reason for rejection (if applicable)
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <textarea
                      className="profile_form_textarea"
                      type="text"
                      defaultValue=""
                      style={{ height: "58px", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="horizontalline" />
              </div>
            </div>

            <div className="sellerdoc">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p
                    className="agreement_view_subtitle"
                    style={{ color: "#3DAEEE", marginBottom: 0 }}
                  >
                    Seller’s Documents{" "}
                    <span style={{ color: "#555555" }}>(0x6e8 ... D00f94)</span>
                  </p>
                  <div
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      borderRadius: "50%",
                      height: "52px",
                      width: "52px",
                      border: "2px solid #3DAEEE",
                      background:
                        'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB7WOft_Yed83SLXPSHpdGxI9Ms2HQVT9q1w&usqp=CAU")',
                    }}
                  />
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
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 20 }}
                    >
                      <svg
                        width="40"
                        height="47"
                        viewBox="0 0 40 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                          fill="#1877F2"
                        />
                      </svg>
                      <p className="document_title">NOC Uploaded</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="accept_button"
                        style={{ userSelect: "none" }}
                      >
                        Accept
                      </button>
                      <button
                        className="reject_button"
                        style={{ userSelect: "none" }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginTop: 20,
                    }}
                  >
                    <p className="document_title">
                      Reason for rejection (if applicable)
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <textarea
                        className="profile_form_textarea"
                        type="text"
                        defaultValue=""
                        style={{ height: "58px", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="horizontalline" />
                </div>
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 20 }}
                    >
                      <svg
                        width="40"
                        height="47"
                        viewBox="0 0 40 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                          fill="#1877F2"
                        />
                      </svg>
                      <p className="document_title">MOU Uploaded</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="accept_button"
                        style={{ userSelect: "none" }}
                      >
                        Accept
                      </button>
                      <button
                        className="reject_button"
                        style={{ userSelect: "none" }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginTop: 20,
                    }}
                  >
                    <p className="document_title">
                      Reason for rejection (if applicable)
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <textarea
                        className="profile_form_textarea"
                        type="text"
                        defaultValue=""
                        style={{ height: "58px", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="horizontalline" />
                </div>
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 20 }}
                    >
                      <svg
                        width="40"
                        height="47"
                        viewBox="0 0 40 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                          fill="#1877F2"
                        />
                      </svg>
                      <p className="document_title">Updated Title deed</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="accept_button"
                        style={{ userSelect: "none" }}
                      >
                        Accept
                      </button>
                      <button
                        className="reject_button"
                        style={{ userSelect: "none" }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginTop: 20,
                    }}
                  >
                    <p className="document_title">
                      Reason for rejection (if applicable)
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <textarea
                        className="profile_form_textarea"
                        type="text"
                        defaultValue=""
                        style={{ height: "58px", width: "100%" }}
                      />
                    </div>
                  </div>
                  <div className="horizontalline" />
                </div>
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 20 }}
                    >
                      <svg
                        width="40"
                        height="47"
                        viewBox="0 0 40 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28 0H12C9.8 0 8 1.7625 8 3.91667V35.25C8 37.4042 9.8 39.1667 12 39.1667H36C38.2 39.1667 40 37.4042 40 35.25V11.75L28 0ZM36 35.25H12V3.91667H26V13.7083H36V35.25ZM4 7.83333V43.0833H36V47H4C1.8 47 0 45.2375 0 43.0833V7.83333H4ZM16 19.5833V23.5H32V19.5833H16ZM16 27.4167V31.3333H26V27.4167H16Z"
                          fill="#1877F2"
                        />
                      </svg>
                      <p className="document_title">Other relevant docs </p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button
                        className="accept_button"
                        style={{ userSelect: "none" }}
                      >
                        Accept
                      </button>
                      <button
                        className="reject_button"
                        style={{ userSelect: "none" }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      marginTop: 20,
                    }}
                  >
                    <p className="document_title">
                      Reason for rejection (if applicable)
                    </p>
                    <textarea
                      className="profile_form_textarea"
                      type="text"
                      defaultValue=""
                      style={{
                        height: "58px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    />
                  </div>
                  <div className="horizontalline" />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 20,
                justifyContent: "flex-end",
              }}
            >
              <button
                className="applyy_button"
                style={{ userSelect: "none" }}
                onClick={() => {
                  setTable(true);
                }}
              >
                &#8592; Go Back
              </button>
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

export default AgreementsList;
