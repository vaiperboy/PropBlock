import React from "react";
import stats from "./stats_2.png";
import { Chart, Line } from "react-charts";

function MyChart() {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          { x: -1, y: 25 },
          { x: 1, y: 24 },
          { x: 2, y: 27 },
          { x: 3, y: 24 },
          { x: 4, y: 25 },
          { x: 5, y: 28 },
        ],
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    <div
      style={{
        width: "62vw",
        maxWidth: "700px",
        height: "250px",
      }}
    >
      <Chart className="statistics" data={data} axes={axes} />
    </div>
  );
}

class PurchaseRequests extends React.Component {
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
            <p className="rightsidebar_title">Statistics</p>
          </div>
        </div>
        <div
          className="rightsidebar_content"
          style={{
            width: "100%",
            display: "flex",
            height: "auto",
          }}
        >
          <div className="dashboard_card_container">
            <div
              className="dashboard_card"
              style={{ height: "120px", background: "rgba(61, 174, 238, 0.1)" }}
              onClick={() => {
                this.props.togglePropertiesView(true);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="21"
                  height="23"
                  viewBox="0 0 21 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 8.5L10.5 1.5L19.5 8.5V19.5C19.5 20.0304 19.2893 20.5391 18.9142 20.9142C18.5391 21.2893 18.0304 21.5 17.5 21.5H3.5C2.96957 21.5 2.46086 21.2893 2.08579 20.9142C1.71071 20.5391 1.5 20.0304 1.5 19.5V8.5Z"
                    stroke="#1877F2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 21.5V11.5H13.5V21.5"
                    stroke="#1877F2"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div
                  className="dashboard_card_text"
                  style={{ height: "fit-content", color: "#1877F2" }}
                >
                  Properties
                </div>
              </div>
              <div style={{ fontSize: "40px", color: "#1877F2" }}>2</div>
            </div>
            <div
              className="dashboard_card"
              style={{ height: "125px", background: "rgba(61, 174, 238, 0.1)" }}
              onClick={() => {
                this.props.togglePropertiesView(true);
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_26_5904)">
                    <path
                      d="M21.5 4.5H3.5C2.39543 4.5 1.5 5.39543 1.5 6.5V18.5C1.5 19.6046 2.39543 20.5 3.5 20.5H21.5C22.6046 20.5 23.5 19.6046 23.5 18.5V6.5C23.5 5.39543 22.6046 4.5 21.5 4.5Z"
                      stroke="#1877F2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.5 10.5H23.5"
                      stroke="#1877F2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_26_5904">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.5 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div
                  className="dashboard_card_text"
                  style={{ height: "fit-content", color: "#1877F2" }}
                >
                  Transactions
                </div>
              </div>
              <div style={{ fontSize: "40px", color: "#1877F2" }}>2</div>
            </div>
          </div>
          <div
            className="dashboard_card_container"
            style={{ flexDirection: "column", gap: 0 }}
          >
            <div
              style={{
                marginTop: 25,
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <p
                className="rightsidebar_subtitle"
                style={{ fontWeight: 500, color: "#555555" }}
              >
                Income Overview
              </p>
              <div style={{ display: "flex", gap: "30px" }}>
                <p
                  className="recent_activity_text"
                  style={{ fontWeight: 500, color: "#1877F2" }}
                >
                  Monthly
                </p>
                <p className="recent_activity_text" style={{ fontWeight: 500 }}>
                  Weekly
                </p>
                <p className="recent_activity_text" style={{ fontWeight: 500 }}>
                  Daily
                </p>
              </div>
            </div>
            <div
              className="recent_activity_container"
              style={{ background: "#ECF7FE" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    alignItems: "left",
                    paddingTop: 40,
                  }}
                >
                  <span className="income_amt">$1,250,000</span>
                  <p style={{ color: "#1877F2" }}>Total Income</p>
                </div>
              </div>
              <MyChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseRequests;
