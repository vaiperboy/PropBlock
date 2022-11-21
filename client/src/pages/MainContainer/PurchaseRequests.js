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

// importing images
import no_data from "../../assets/no_data.png";
const web3 = require("web3");
const console = require("console-browserify");

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PurchaseRequests = (props) => {
  const columnsBuyer = [
    {
      title: "Address Of User",
      width: 300,
      dataIndex: "address",
      key: "name",
      fixed: "left",
    },
    {
      title: "Property ID",
      width: 250,
      dataIndex: "propertyID",
      key: "1",
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      key: "2",
    },
    {
      title: "Decision",
      fixed: "right",
      keu: "status",
      render: (_, record) =>
        record.status === "Accepted" ? (
          <h3 style={{ color: "red" }}>Accepted</h3>
        ) : (
          <h3 style={{ color: "green" }}>Rejected</h3>
        ),
      kay: "3",
      width: 200,
      innerHeight: 100,
    },
  ];

  const shortenAddress = (text, maxWords) => {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 15) + " ... " + text.substring(text.length - 10);
    }
    return text;
  };

  // loads the dataSourceBuyer & dataSourceSeller
  useEffect(() => {
    // async function loadSellerData() {
    //   setIsLoading(true);
    //   fetch(
    //     "http://localhost:9000/getPurchaseRequests?" +
    //       new URLSearchParams({
    //         sessionToken: user.getSessionToken(),
    //         ownerAddress: user.get("ethAddress"),
    //       })
    //   )
    //     .then((res) => res.json())
    //     .then((res) => {
    //       var temp = [];
    //       for (var i = 0; i < res.length; i++) {
    //         var e = res[i];
    //         temp.push({
    //           key: i,
    //           address: shortenAddress(e.address, 25),
    //           propertyID: e.propertyObjectId,
    //           dateRequested: e.createdAt,
    //         });
    //       }
    //       setDataSourceSeller(temp);
    //       console.log(res);
    //     });
    //   setIsLoading(false);
    // }

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
            status: request.get("isAccepted"),
          });
        });
        setDataSourceBuyer(tempArray);

        // tempArray.sort(compareByDecision);
        // tempArray.sort(compareByAddress);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    // calling the functions
    loadBuyerRequests();
    // loadSellerData();
  }, []);

  // removes the request with the property ID
  const removeRequest = (propertyId, ownerAddress) => {
    removeByAttr();
    const temp = dataSourceBuyer;
    removeByAttr(temp, "propertyID", propertyId, "address", ownerAddress);
    setDataSourceBuyer(temp);
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
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  }

  const columnsSeller = [
    {
      title: "Address Of User",
      width: 300,
      dataIndex: "address",
      key: "name",
      fixed: "left",
    },
    {
      title: "Property ID",
      width: 250,
      dataIndex: "propertyID",
      key: "1",
    },
    {
      title: "Date Requested",
      dataIndex: "dateRequested",
      key: "2",
    },
    {
      title: "Decision",
      key: "operation",
      fixed: "right",
      width: 200,
      innerHeight: 100,
      render: (_, record) =>
        !accepted ? (
          <>
            <Popconfirm
              title="Are you sure to accepet this purchase request?"
              onConfirm={() => {
                handleDelete(record.key);
                message.success("Accepted Purchase Request");
              }}
              onCancel={() => {
                return;
              }}
              okText="Accept"
              cancelText="Cancel"
            >
              <button
                id="acceptButton"
                onClick={() => {
                  // message.success("Accepted Purchase Request");
                  // handleDelete(record.key);
                }}
              >
                Accept
              </button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure to reject this purchase request?"
              onConfirm={() => {
                handleDelete(record.key);
                message.info("Purchase Request Rejected");
              }}
              onCancel={() => {
                return;
              }}
              okText="Reject"
              cancelText="Cancel"
            >
              <button
                id="rejectButton"
                onClick={() => {
                  handleDelete(record.key);
                  handleDelete();
                }}
              >
                Reject
              </button>
            </Popconfirm>
          </>
        ) : (
          <>Accepted</>
        ),
    },
  ];

  // const [dataSourceSeller, setDataSourceSeller] = useState([
  //   {
  //     key: "1",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "2",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "3",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "4",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "5",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "6",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "y7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "10 Nov 2022",
  //   },
  //   {
  //     key: "7",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "z7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "12 Nov 2022",
  //   },
  //   {
  //     key: "8",
  //     address: "0x4001A8651c51...5da60538b327b96",
  //     propertyID: "u7dM24zgRcYAs68Hs03FMSki",
  //     dateRequested: "15 Nov 2022",
  //   },
  // ]);

  // handles the deletion of the row in the table
  const handleDelete = (key) => {
    const newData = dataSourceSeller.filter((item) => item.key !== key);
    setDataSourceSeller(newData);
  };

  const [dataSourceBuyer, setDataSourceBuyer] = useState([]);
  const [dataSourceSellerTemp, setDataSourceSellerTemp] = useState([
    {
      key: "1",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "None",
    },
    {
      key: "2",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "None",
    },
    {
      key: "3",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "None",
    },
  ]);
  const [dataSourceSeller, setDataSourceSeller] = useState([]);
  const [pruchaseRequests, setPurchaseRequests] = useState([]);
  const [accepted, setAccepted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
                      if (item.status.toString() === "None") {
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
                              style={{ color: "#9dabb3" }}
                            >
                              Pending
                            </td>
                          </tr>
                        );
                      }
                      if (item.status === "Accepted") {
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
                              Accepted
                            </td>
                          </tr>
                        );
                      }
                      if (item.status === "Rejected") {
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
                    {dataSourceSeller.map((item) =>
                      item.status.toString() === "true" ? (
                        <tr key={item.key} className="notBuyerFirstRowAccepted">
                          <td>{item.address}</td>
                          <td>{item.propertyID}</td>
                          <td>{item.dateRequested}</td>
                          {item.status.toString() === "true" ? (
                            <td
                              className="requestAccepted"
                              style={{ color: "#2db32d" }}
                            >
                              Accepted
                            </td>
                          ) : (
                            <td
                              className="requestRejected"
                              style={{ color: "#FF0000" }}
                            >
                              Rejected
                            </td>
                          )}
                        </tr>
                      ) : (
                        <tr key={item.key} className="notBuyerFirstRowRejected">
                          <td>{item.address}</td>
                          <td>{item.propertyID}</td>
                          <td>{item.dateRequested}</td>
                          {item.status.toString() === "true" ? (
                            <td
                              className="requestAccepted"
                              style={{ color: "#2db32d" }}
                            >
                              Accepted
                            </td>
                          ) : (
                            <td
                              className="requestRejected"
                              style={{ color: "#FF0000" }}
                            >
                              Rejected
                            </td>
                          )}
                        </tr>
                      )
                    )}
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
