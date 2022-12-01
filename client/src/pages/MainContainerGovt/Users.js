import React, { useEffect, useState } from "react";
import no_data from "../../assets/no_data.png";
import { Spin } from "antd";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersSourceTemp, setUsersSourceTemp] = useState([
    {
      key: "1",
      ethAddress: "0x4001A8651c51...5da60538b327b96",
      fullName: "Sultan SJ",
      emailAddress: "sultan11@gmail.com",
      ObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    },
    {
      key: "2",
      ethAddress: "0x4001A8651c51...5da60538b327b96",
      fullName: "Ahmed",
      emailAddress: "ahmed@gmail.com",
      ObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    },
    {
      key: "3",
      ethAddress: "0x4001A8651c51...5da60538b327b96",
      fullName: "John",
      emailAddress: "john@gmail.com",
      ObjectId: "y7dM24zgRcYAs68Hs03FMSki",
    },
  ]);

  useEffect(() => {
    setIsLoading(true);
    // loading the data

    setIsLoading(false);
  }, []);
  if (isLoading) {
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
  } else {
    return (
      <div>
        <div className="usersContainer">
          <p className="rightsidebar_title">PropBlock Users</p>
          <div className="usersSection">
            <div className="tableContainer usersTable">
              <table className="normalTable">
                <tr>
                  <th>User Wallet Address</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>User Profile</th>
                </tr>
                {/* show no data icon if array is empty */}
                {usersSourceTemp.length === 0 && (
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
                {usersSourceTemp.map((item) => {
                  return (
                    <tr key={item.key} className="FirstRow" onClick={() => {}}>
                      <td>{item.ethAddress}</td>
                      <td>{item.fullName}</td>
                      <td>{item.emailAddress}</td>
                      <td style={{ display: "flex", gap: "1rem" }}>
                        <button
                          className="viewUserButton"
                          onClick={() => {
                            props.setUserAddress(item.ethAddress);
                            props.setUserEmailAddress(item.emailAddress);
                            props.setUserFullName(item.fullName);
                            props.toggleUserProfileView(true);
                          }}
                        >
                          View User
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Users;
