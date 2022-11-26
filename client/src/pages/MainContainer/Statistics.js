import React from "react";
import stats from "./stats_2.png";
import { Chart, Line } from "react-charts";
import transactions_icon from "../../assets/transactions_icon.png";
import properties_icon from "../../assets/properties_icon.png";
import agreements_icon from "../../assets/agreements_icon.png";
const console = require("console-browserify");

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
        height: "20rem",
        width: "95%",
      }}
    >
      <Chart className="statistics" data={data} axes={axes} />
    </div>
  );
}

function handleIncome(e) {
  let dailyButton = document.getElementById("dailyButton");
  let weeklyButton = document.getElementById("weeklyButton");
  let monthlyButton = document.getElementById("monthlyButton");
  if (e === "daily") {
    if (!dailyButton.classList.contains("selected")) {
      dailyButton.classList.add("selected");
    }
    weeklyButton.classList.remove("selected");
    monthlyButton.classList.remove("selected");
    // logic of displaying by daily
    return;
  }
  if (e === "weekly") {
    if (!weeklyButton.classList.contains("selected")) {
      weeklyButton.classList.add("selected");
    }
    dailyButton.classList.remove("selected");
    monthlyButton.classList.remove("selected");
    // logic of displaying by weekly
    return;
  }
  if (e === "monthly") {
    if (!monthlyButton.classList.contains("selected")) {
      monthlyButton.classList.add("selected");
    }
    dailyButton.classList.remove("selected");
    weeklyButton.classList.remove("selected");
    // logic of displaying by monthly
    return;
  }
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
                <div
                  className="dashboard_card_text"
                  style={{ height: "fit-content", color: "#1877F2" }}
                >
                  Properties
                </div>
                <img
                  src={properties_icon}
                  alt="Properties Icon"
                  style={{ width: "2rem" }}
                ></img>
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
                <div
                  className="dashboard_card_text"
                  style={{ height: "fit-content", color: "#1877F2" }}
                >
                  Transactions
                </div>
                <img
                  src={transactions_icon}
                  alt="Transactions Icon"
                  className="icon"
                  style={{ width: "2.5rem" }}
                ></img>
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
                <div
                  className="dashboard_card_text"
                  style={{ height: "fit-content", color: "#1877F2" }}
                >
                  Agreements
                </div>
                <img
                  src={agreements_icon}
                  alt="Transactions Icon"
                  className="icon"
                  style={{ width: "2.5rem" }}
                ></img>
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
                marginTop: "4rem",
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
                <button
                  className="incomeByButton selected"
                  id="dailyButton"
                  onClick={() => {
                    handleIncome("daily");
                  }}
                >
                  Daily
                </button>
                <button
                  className="incomeByButton"
                  id="weeklyButton"
                  onClick={() => {
                    handleIncome("weekly");
                  }}
                >
                  Weekly
                </button>
                <button
                  className="incomeByButton"
                  id="monthlyButton"
                  onClick={() => {
                    handleIncome("monthly");
                  }}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="recent_activity_container">
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
