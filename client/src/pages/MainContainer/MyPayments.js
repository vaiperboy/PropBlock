import React from "react";
import noPayment from "./noPayment.png";

class MyPayments extends React.Component {
  state = {};

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  render() {
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
            <img src={noPayment} style={{ maxWidth: "550px" }} />
            <p style={{ color: "#979797" }}>
              You have not made any payments yet.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MyPayments;
