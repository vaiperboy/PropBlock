import React, { useEffect, useState } from "react";
import noPayment from "./noPayment.png";
import { Spin, message } from "antd";
import "../../styling/MainContainer/Agreements.scss";
import refresh_icon from "../../assets/refresh_iconx2.png";
const console = require("console-browserify");

const MyPayments = () => {
  // vars
  const [isLoading, setIsLoading] = useState(false);
  const [payments, setPayments] = useState([
    {
      txHash:
        "0xf8500698ff847acbf884982f49ffc8ff5e43440df4702ccd197b4fd2301c9988",
      dateCreated: "10 - 1 - 2022",
      confirm: true,
    },
    {
      txHash: "asdlkmasd",
      dateCreated: "10 - 1 - 2022",
      confirm: false,
    },
    {
      txHash: "asdlkmasd",
      dateCreated: "10 - 1 - 2022",
      confirm: true,
    },
  ]);
  const fetchPayments = async () => {
    setIsLoading(true);

    // fetch payments

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPayments();
    console.log("payments length: ", payments.length);
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
    if (payments.length === 0) {
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
              <p className="rightsidebar_title">My Payments</p>
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                borderRadius: "8px",
                padding: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={noPayment} style={{ maxWidth: "450px" }} />
              <p style={{ color: "#979797", fontSize: "2rem" }}>
                You have not made any payments yet.
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="rightsidebar_container">
          <div className="paymentsContainer">
            <div className="refreshSection">
              <button
                className="refreshButton"
                onClick={() => {
                  fetchPayments();
                }}
              >
                Refresh{" "}
                <img src={refresh_icon} alt="Refresh Icon" width={20}></img>
              </button>
            </div>
            <div className="tableContainer">
              <table className="buyersTable">
                <tr>
                  <th width="40%">Transaction Hash</th>
                  <th width="30%">Date Created</th>
                  <th width="20%">Confirmed</th>
                </tr>
                {payments.map((payment, key) => {
                  return (
                    <tr id={key}>
                      <td>
                        <a
                          href={
                            "https://goerli.etherscan.io/tx/" + payment.txHash
                          }
                          target="_blank"
                        >
                          {payment.txHash}
                        </a>
                      </td>
                      <td>{payment.dateCreated}</td>
                      <td>{payment.confirm ? "True" : "False"}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default MyPayments;
