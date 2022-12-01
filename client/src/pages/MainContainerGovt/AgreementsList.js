import React, { useEffect, useState } from "react";

import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Table, message, Popconfirm, Spin } from "antd";

import no_data from "../../assets/no_data.png";
import AgreementView from "./AgreementView";
import "./Agreementview.scss";
import Testpopup from "../../components/Properties/Popup";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AgreementsList = (props) => {
  const [table, setTable] = useState(true);
  const [file1, setfile1] = useState([]);
  const [file2, setfile2] = useState([]);
  const [file3, setfile3] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    // loading the data

    setIsLoading(false);
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

//  {/* <div style={{ display: "flex", gap: "20px" }}>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M17.6312 16.2521L13.9558 12.5767C14.8407 11.3987 15.3184 9.96482 15.3167 8.4915C15.3167 4.72822 12.255 1.6665 8.49175 1.6665C4.72847 1.6665 1.66675 4.72822 1.66675 8.4915C1.66675 12.2548 4.72847 15.3165 8.49175 15.3165C9.96506 15.3181 11.3989 14.8404 12.5769 13.9556L16.2523 17.631C16.4383 17.7973 16.681 17.886 16.9304 17.8791C17.1799 17.8721 17.4172 17.7699 17.5937 17.5934C17.7701 17.417 17.8723 17.1797 17.8793 16.9302C17.8863 16.6808 17.7975 16.4381 17.6312 16.2521ZM3.61675 8.4915C3.61675 7.52732 3.90266 6.58479 4.43833 5.7831C4.97401 4.98141 5.73538 4.35657 6.62617 3.98759C7.51696 3.61861 8.49716 3.52207 9.44281 3.71018C10.3885 3.89828 11.2571 4.36258 11.9389 5.04436C12.6207 5.72614 13.085 6.59478 13.2731 7.54044C13.4612 8.4861 13.3646 9.4663 12.9957 10.3571C12.6267 11.2479 12.0018 12.0092 11.2002 12.5449C10.3985 13.0806 9.45593 13.3665 8.49175 13.3665C7.19929 13.365 5.96022 12.8508 5.04632 11.9369C4.13241 11.023 3.6183 9.78396 3.61675 8.4915Z"
//                       fill="#261C15"
//                     />
//                   </svg>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M16.5769 3.76904H3.50961C2.84402 3.76904 2.20569 4.03345 1.73505 4.50409C1.26441 4.97474 1 5.61307 1 6.27866V13.1152C1 13.7578 1.25529 14.3742 1.7097 14.8286C2.16412 15.283 2.78044 15.5383 3.42308 15.5383H3.76923V17.2552C3.76923 17.7179 3.95304 18.1616 4.28022 18.4888C4.60739 18.816 5.05114 18.9998 5.51384 18.9998H14.4861C14.9488 18.9998 15.3926 18.816 15.7198 18.4888C16.047 18.1616 16.2308 17.7179 16.2308 17.2552V15.5383H16.5769C17.2196 15.5383 17.8359 15.283 18.2903 14.8286C18.7447 14.3742 19 13.7578 19 13.1152V6.19212C19 5.54948 18.7447 4.93316 18.2903 4.47875C17.8359 4.02433 17.2196 3.76904 16.5769 3.76904ZM14.8461 17.2552C14.8458 17.3506 14.8078 17.4419 14.7403 17.5094C14.6729 17.5768 14.5815 17.6148 14.4861 17.6152H5.51384C5.41847 17.6148 5.3271 17.5768 5.25966 17.5094C5.19222 17.4419 5.15419 17.3506 5.15384 17.2552V10.3598C5.15419 10.2644 5.19222 10.1731 5.25966 10.1056C5.3271 10.0382 5.41847 10.0002 5.51384 9.99981H14.4861C14.5815 10.0002 14.6729 10.0382 14.7403 10.1056C14.8078 10.1731 14.8458 10.2644 14.8461 10.3598V17.2552ZM15.9711 7.91943C15.7593 7.93645 15.5474 7.88809 15.364 7.78087C15.1805 7.67366 15.0344 7.51274 14.9452 7.31985C14.8561 7.12695 14.8283 6.91136 14.8656 6.70217C14.9028 6.49298 15.0034 6.30025 15.1536 6.15C15.3039 5.99975 15.4966 5.89921 15.7058 5.86194C15.915 5.82467 16.1306 5.85247 16.3235 5.94159C16.5164 6.03071 16.6773 6.17686 16.7845 6.36032C16.8917 6.54377 16.9401 6.7557 16.9231 6.9675C16.9033 7.21338 16.7967 7.44419 16.6222 7.61861C16.4478 7.79302 16.217 7.89966 15.9711 7.91943Z"
//                       fill="#261C15"
//                     />
//                     <path
//                       d="M13.8075 1H6.19217C5.60977 1.00087 5.0471 1.21114 4.60687 1.59243C4.16663 1.97372 3.87819 2.50061 3.79419 3.07692H16.2055C16.1215 2.50061 15.8331 1.97372 15.3929 1.59243C14.9526 1.21114 14.3899 1.00087 13.8075 1Z"
//                       fill="#261C15"
//                     />
//                   </svg>
//                   <svg
//                     width="20"
//                     height="17"
//                     viewBox="0 0 20 17"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       d="M11.7698 16.9165C11.6696 16.9164 11.57 16.9002 11.4749 16.8685L8.34404 15.8267C8.15785 15.7641 7.99611 15.6444 7.88181 15.4847C7.76751 15.3249 7.70645 15.1332 7.70732 14.9368V10.2802C7.70647 10.2783 7.70528 10.2766 7.70381 10.2751L1.11592 2.60166C0.96984 2.43148 0.875663 2.22296 0.84457 2.00085C0.813476 1.77874 0.846772 1.55237 0.940503 1.34862C1.03424 1.14487 1.18447 0.972292 1.37336 0.851383C1.56225 0.730474 1.78188 0.666308 2.00615 0.666504H18.4104C18.6347 0.666308 18.8543 0.730474 19.0432 0.851383C19.2321 0.972292 19.3824 1.14487 19.4761 1.34862C19.5698 1.55237 19.6031 1.77874 19.572 2.00085C19.5409 2.22296 19.4468 2.43148 19.3007 2.60166L12.7108 10.2759C12.7095 10.2774 12.7083 10.2791 12.7073 10.281V15.979C12.7077 16.1022 12.6837 16.2243 12.6367 16.3382C12.5897 16.4521 12.5207 16.5556 12.4335 16.6427C12.3464 16.7298 12.2429 16.7989 12.129 16.8459C12.0151 16.8929 11.893 16.9169 11.7698 16.9165Z"
//                       fill="#261C15"
//                     />
//                   </svg>
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fill-rule="evenodd"
//                       clip-rule="evenodd"
//                       d="M12.592 4.82834C12.6793 4.75362 12.7928 4.7085 12.9167 4.7085C13.0407 4.7085 13.1542 4.75362 13.2415 4.82834C13.1933 4.94554 13.1667 5.07391 13.1667 5.2085C13.1667 5.34308 13.1933 5.47145 13.2415 5.58865C13.1542 5.66337 13.0407 5.7085 12.9167 5.7085C12.7928 5.7085 12.6793 5.66337 12.592 5.58865C12.6402 5.47145 12.6667 5.34308 12.6667 5.2085C12.6667 5.07391 12.6402 4.94554 12.592 4.82834ZM11.1843 4.2085C11.5301 3.61069 12.1765 3.2085 12.9167 3.2085C13.657 3.2085 14.3034 3.61069 14.6492 4.2085H17.2917C17.844 4.2085 18.2917 4.65621 18.2917 5.2085C18.2917 5.76078 17.844 6.2085 17.2917 6.2085H14.6492C14.3034 6.8063 13.657 7.2085 12.9167 7.2085C12.1765 7.2085 11.5301 6.8063 11.1843 6.2085H2.29175C1.73946 6.2085 1.29175 5.76078 1.29175 5.2085C1.29175 4.65621 1.73946 4.2085 2.29175 4.2085H11.1843ZM13.2415 14.8283C13.1933 14.9455 13.1667 15.0739 13.1667 15.2085C13.1667 15.3431 13.1933 15.4715 13.2415 15.5887C13.1542 15.6634 13.0407 15.7085 12.9167 15.7085C12.7928 15.7085 12.6793 15.6634 12.592 15.5887C12.6402 15.4715 12.6667 15.3431 12.6667 15.2085C12.6667 15.0739 12.6402 14.9455 12.592 14.8283C12.6793 14.7536 12.7928 14.7085 12.9167 14.7085C13.0407 14.7085 13.1542 14.7536 13.2415 14.8283ZM14.6492 16.2085H17.2917C17.844 16.2085 18.2917 15.7608 18.2917 15.2085C18.2917 14.6562 17.844 14.2085 17.2917 14.2085H14.6492C14.3034 13.6107 13.657 13.2085 12.9167 13.2085C12.1765 13.2085 11.5301 13.6107 11.1843 14.2085H2.29175C1.73946 14.2085 1.29175 14.6562 1.29175 15.2085C1.29175 15.7608 1.73946 16.2085 2.29175 16.2085H11.1843C11.5301 16.8063 12.1765 17.2085 12.9167 17.2085C13.657 17.2085 14.3034 16.8063 14.6492 16.2085ZM6.66675 8.2085C7.40703 8.2085 8.05337 8.61069 8.39918 9.2085H17.2917C17.844 9.2085 18.2917 9.65621 18.2917 10.2085C18.2917 10.7608 17.844 11.2085 17.2917 11.2085H8.39918C8.05337 11.8063 7.40703 12.2085 6.66675 12.2085C5.92647 12.2085 5.28012 11.8063 4.93431 11.2085H2.29175C1.73946 11.2085 1.29175 10.7608 1.29175 10.2085C1.29175 9.65621 1.73946 9.2085 2.29175 9.2085H4.93431C5.28012 8.61069 5.92647 8.2085 6.66675 8.2085ZM6.91675 10.2085C6.91675 10.0739 6.94333 9.94554 6.99154 9.82834C6.90417 9.75362 6.79073 9.7085 6.66675 9.7085C6.54277 9.7085 6.42933 9.75362 6.34195 9.82834C6.39016 9.94554 6.41675 10.0739 6.41675 10.2085C6.41675 10.3431 6.39016 10.4715 6.34195 10.5887C6.42933 10.6634 6.54277 10.7085 6.66675 10.7085C6.79073 10.7085 6.90417 10.6634 6.99154 10.5887C6.94333 10.4715 6.91675 10.3431 6.91675 10.2085Z"
//                       fill="#261C15"
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <table class="" aria-label="simple table">
//                 <thead class="">
//                   <tr
//                     class=""
//                     onClick={(e) => {
//                       this.props.toggleAgreementView(2);
//                     }}
//                   >
//                     <th class="" scope="col">
//                       Buyer Address
//                     </th>
//                     <th class="" scope="col">
//                       Seller Address
//                     </th>
//                     <th class="" scope="col">
//                       Property ID
//                     </th>
//                     <th class="" scope="col">
//                       Status
//                     </th>
//                     <th class="" scope="col">
//                       Date Sent
//                     </th>
//                     <th class="" scope="col">
//                       Decision
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody class="">
//                   <tr
//                     class=""
//                     onClick={(e) => {
//                       this.props.toggleAgreementView(2);
//                     }}
//                   >
//                     <td class="">0x6e8 ... D00f94</td>
//                     <td class="">0x0F7 ... 5ds771</td>
//                     <td class="">1</td>
//                     <td class="">Pending</td>
//                     <td class="">20 Sep 2022</td>
//                     <td class="">Pending</td>
//                     {/* <td class="" style={{textAlign:'center'}}>
// 										<button className='agreement_uploaded_button' style={{userSelect:'none'}}>
// 											Uploaded
// 										</button>
// 									</td> */}
// 									</tr>
// 									<tr
// 									  class=""
// 									  onClick={(e) => {
// 										this.props.toggleAgreementView(2);
// 									  }}
// 									>
// 									  <td class="">0x6e8 ... D00f94</td>
// 									  <td class="">0x0F7 ... 5ds771</td>
// 									  <td class="">2</td>
// 									  <td class="">Pending</td>
// 									  <td class="">20 Sep 2022</td>
// 									  <td class="">Pending</td>
// 									  {/* <td class="" style={{textAlign:'center'}}>
// 														  <button className='agreement_upload_button' onClick={(e)=>{e.stopPropagation(); this.props.toggleView(true)}} style={{userSelect:'none'}}>
// 															  Upload
// 														  </button>
// 													  </td> */}
// 									</tr>
// 									<tr
// 									  class=""
// 									  onClick={(e) => {
// 										this.props.toggleAgreementView(2);
// 									  }}
// 									>
// 									  <td class="">0x6e8 ... D00f94</td>
// 									  <td class="">0x0F7 ... 5ds771</td>
// 									  <td class="">3</td>
// 									  <td class="">Evalated</td>
// 									  <td class="">20 Sep 2022</td>
// 									  <td class="">Approved</td>
// 									  {/* <td class="" style={{textAlign:'center'}}>
// 														  <button className='agreement_upload_button' onClick={(e)=>{e.stopPropagation(); this.props.toggleView(true)}} style={{userSelect:'none'}}>
// 															  Upload
// 														  </button>
// 													  </td> */}
// 									</tr>
// 								  </tbody>
// 								</table>
