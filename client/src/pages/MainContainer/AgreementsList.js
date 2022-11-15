import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import { useFiatBuy, useMoralis, useMoralisQuery } from "react-moralis";
import { Table, message, Popconfirm, Spin } from "antd";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import MyAgreements from "./MyAgreements";
const console = require("console-browserify");

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AgreementsList = (props) => {
  const [showAgreement, setShowAgreements] = useState(false);
  const [currentAgreementId, setCurrentAgreementId] = useState("");

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
      key: "3",
      dataIndex: "status",
      fixed: "right",
      width: 200,
      innerHeight: 100,
    },
  ];
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
        !isUploaded ? (
          <>
            <button
              id="acceptButton"
              onClick={() => {
                setShowAgreements(true);
                setIsUploaded(true);
              }}
            >
              Upload
            </button>
          </>
        ) : (
          <>
            <button
              id="acceptButton"
              style={{ pointerEvents: "none" }}
              onClick={() => {}}
              className
            >
              Uploaded
            </button>
          </>
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

  const [dataSourceBuyer, setDataSourceBuyer] = useState([
    {
      key: "1",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "Accepted",
    },
    {
      key: "2",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "Declined",
    },
    {
      key: "3",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "Accepted",
    },
    {
      key: "4",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "accepted",
    },
    {
      key: "5",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "accepted",
    },
    {
      key: "6",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "y7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "10 Nov 2022",
      status: "accepted",
    },
    {
      key: "7",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "z7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "12 Nov 2022",
      status: "accepted",
    },
    {
      key: "8",
      address: "0x4001A8651c51...5da60538b327b96",
      propertyID: "u7dM24zgRcYAs68Hs03FMSki",
      dateRequested: "15 Nov 2022",
      status: "accepted",
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

  const [agreements, setAgreements] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isUploaded, setIsUploaded] = useState(false);

  console.log("buyer: ", props.isBuyer);

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
      setAgreements(tmpData);
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
              <p className="rightsidebar_title">Agreements </p>
              <div className="purchaseRequestsContainer">
                <div className="tableContainer">
                  <Table
                    columns={columnsBuyer}
                    dataSource={dataSourceBuyer}
                    onChange={onChange}
                    pagination={{
                      pageSize: 50,
                    }}
                    scroll={{
                      y: 600,
                    }}
                    bordered
                    title={() => "Agreements"}
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
      if (showAgreement) return <MyAgreements />;
      else
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
                <div className="purchaseRequestsContainer">
                  <div className="tableContainer">
                    <Table
                      pagination={{
                        pageSize: 50,
                      }}
                      scroll={{
                        y: 600,
                      }}
                      columns={columnsSeller}
                      dataSource={dataSourceSeller}
                      onChange={onChange}
                      bordered
                      title={() => "Agreements"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
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
