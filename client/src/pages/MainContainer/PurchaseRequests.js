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
import { hexlify } from "ethers/lib/utils";
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
      dataIndex: "status",
      kay: "3",
      width: 200,
      innerHeight: 100,
    },
  ];

  const [dataSourceBuyer, setDataSourceBuyer] = useState([
    {
      key: "1",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "accepted",
    },
    {
      key: "2",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "declined",
    },
    {
      key: "3",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "accepted",
    },
  ]);

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

  const [dataSourceSeller, setDataSourceSeller] = useState([
    {
      key: "1",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "2",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "3",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "4",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "5",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "6",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
    },
    {
      key: "7",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "z7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "12 Nov 2022",
    },
    {
      key: "8",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "u7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "15 Nov 2022",
    },
  ]);

  // handles the deletion of the row in the table
  const handleDelete = (key) => {
    const newData = dataSourceSeller.filter((item) => item.key !== key);
    setDataSourceSeller(newData);
  };

  // is run for the table
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [pruchaseRequests, setPurchaseRequests] = useState([]);
  const [accepted, setAccepted] = useState(false);
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

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const requests = Moralis.Object.extend("PurchaseRequest");
      const users = Moralis.Object.extend("_Users");
      const purchaseQuery = new Moralis.Query(requests);
      console.log(user.get("ethAddress"));
      purchaseQuery.equalTo(
        "sellerEthAddress",
        user.get("ethAddress").toLowerCase()
      );
      const results = await purchaseQuery.find();
      console.log("results: " + results);
      const tmpData = [];
      results.forEach(async (e) => {
        console.log("currently at: " + e.get("requesterEthAddress"));
        const usersQuery = new Moralis.Query(users);
        //usersQuery.limit(1);
        //usersQuery.equalTo(
        // "ethAddress",
        //e.get("requesterEthAddress").toLowerCase()
        //);
        const usersResult = await usersQuery.find();
        usersResult = usersResult[0];
        tmpData.push({
          //
          fullName: usersResult.get("fullName"),
          address: usersResult.get("ethAddress"),
          propertyObjectId: e.get("propertyObjectId"),
          dateSubmitted: e.get("createdAt"),
          status: e.get("isAccepted"),
        });
      });
      setPurchaseRequests(tmpData);
      setIsLoading(false);
      console.log(tmpData);
    }

    loadData();
  }, []);

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
                  <Table
                    columns={columnsBuyer}
                    dataSource={dataSourceBuyer}
                    onChange={onChange}
                    pagination={{
                      pageSize: 50,
                    }}
                    bordered
                    title={() => "Purchase Requests Sent"}
                    scroll={{
                      y: 240,
                    }}
                  />
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
                  <Table
                    pagination={{
                      pageSize: 50,
                    }}
                    scroll={{
                      y: 240,
                    }}
                    columns={columnsSeller}
                    dataSource={dataSourceSeller}
                    onChange={onChange}
                    bordered
                    scroll={{
                      y: 600,
                    }}
                    title={() => "Purchase Requests Received"}
                  />
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
