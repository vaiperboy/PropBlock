import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import { useFiatBuy, useMoralis, useMoralisQuery } from "react-moralis";
import { Table, message } from "antd";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "../../styling/MainContainer/purchaseRequests.scss";
const console = require("console-browserify");

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const PurchaseRequests = (props) => {
  const columns = [
    {
      title: "Address Of User",
      width: 200,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Property ID",
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
      render: () => (
        <>
          <button
            id="acceptButton"
            onClick={() => {
              message.success("Accepted");
            }}
          >
            Accept
          </button>
          <button
            id="rejectButton"
            onClick={() => {
              message.error("Rejected");
            }}
          >
            Reject
          </button>
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      column2: "London Park2",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 40,
      column2: "London Park2",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const [pruchaseRequests, setPurchaseRequests] = useState([]);

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
      console.log(tmpData);
    }

    loadData();
  }, []);

  if (props.isBuyer === "true") {
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
                  columns={columns}
                  dataSource={data}
                  onChange={onChange}
                  pagination={{
                    pageSize: 50,
                  }}
                  bordered
                  title={() => "Purchase Requests Sent"}
                  // footer={() => "Footer"}
                  scroll={{
                    y: 240,
                  }}
                />
                ;
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
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
              {PurchaseRequests}
              <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{
                  pageSize: 50,
                }}
                scroll={{
                  y: 240,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PurchaseRequests;
