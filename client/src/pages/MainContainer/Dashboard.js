import React, { useEffect, useState } from "react";
// import stats from "./stats_2.png";
import { Chart, Line } from "react-charts";
import stats from "../../assets/stats_icon.svg";

function MyChart() {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [
          { x: 1, y: 24 },
          { x: 2, y: 27 },
          { x: 3, y: 23 },
        ],
      },
      {
        label: "Series 2",
        data: [
          { x: 1, y: 20 },
          { x: 2, y: 22 },
          { x: 3, y: 18 },
          { x: 4, y: 22 },
          { x: 5, y: 18 },
        ],
      },
      {
        label: "Series 3",
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
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
        width: "30rem",
        height: "18rem",
      }}
    >
      <Chart data={data} axes={axes} />
    </div>
  );
}

class PurchaseRequests extends React.Component {
  componentDidMount = () => {};

  render() {
    let name = "Sultan";
    return (
      <div className="rightsidebar_container">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            gap: "0",
          }}
        >
          <div>
            <p className="rightsidebar_title" style={{ marginBottom: "1rem" }}>
              Welcome back, {name}
            </p>
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
              onClick={() => {
                this.props.togglePropertiesView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="41"
                  height="46"
                  viewBox="0 0 41 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 16.1667L20.5 1L40 16.1667V40C40 41.1493 39.5435 42.2515 38.7308 43.0641C37.9181 43.8768 36.8159 44.3333 35.6667 44.3333H5.33333C4.18406 44.3333 3.08186 43.8768 2.2692 43.0641C1.45655 42.2515 1 41.1493 1 40V16.1667Z"
                    stroke="#555555"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 44.3337V22.667H27V44.3337"
                    stroke="#555555"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="dashboard_card_text">My Properties</div>
            </div>
            <div
              className="dashboard_card"
              onClick={() => {
                this.props.togglePurchaseRequestView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="28"
                  height="33"
                  viewBox="0 0 28 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.9808 24.2629V3.68536C24.9808 3.33299 24.6944 3.04469 24.3444 3.04469H17.582V0.289808C17.582 0.0495566 17.3036 -0.0865856 17.1166 0.0615693L12.0409 4.09779C12.0066 4.1245 11.9788 4.15878 11.9596 4.198C11.9405 4.23722 11.9305 4.28033 11.9305 4.32403C11.9305 4.36772 11.9405 4.41083 11.9596 4.45005C11.9788 4.48927 12.0066 4.52355 12.0409 4.55026L17.1127 8.58648C17.2996 8.73464 17.5781 8.6025 17.5781 8.35824V5.60737H22.1128V24.2629C20.3546 24.8635 19.0896 26.5413 19.0896 28.5113C19.0896 30.9859 21.0865 32.996 23.5448 32.996C26.0031 32.996 28 30.9859 28 28.5113C28.004 26.5413 26.739 24.8675 24.9808 24.2629ZM23.5488 30.4333C23.0491 30.4231 22.5734 30.216 22.2237 29.8567C21.8739 29.4974 21.678 29.0144 21.678 28.5113C21.678 28.0082 21.8739 27.5252 22.2237 27.1659C22.5734 26.8066 23.0491 26.5996 23.5488 26.5893C24.0484 26.5996 24.5242 26.8066 24.8739 27.1659C25.2237 27.5252 25.4196 28.0082 25.4196 28.5113C25.4196 29.0144 25.2237 29.4974 24.8739 29.8567C24.5242 30.216 24.0484 30.4231 23.5488 30.4333ZM8.91035 4.48619C8.91035 2.01161 6.91348 0.00150651 4.45518 0.00150651C1.99687 0.00150651 0 2.01161 0 4.48619C0 6.45625 1.26495 8.13 3.02316 8.73464V24.2669C1.26495 24.8675 0 26.5453 0 28.5153C0 30.9899 1.99687 33 4.45518 33C6.91348 33 8.91035 30.9899 8.91035 28.5153C8.91035 26.5453 7.6454 24.8715 5.8872 24.2669V8.73464C7.6454 8.13 8.91035 6.45625 8.91035 4.48619ZM2.54582 4.48619C2.55601 3.98324 2.76166 3.50435 3.11862 3.15228C3.47559 2.80021 3.95543 2.60302 4.45518 2.60302C4.95493 2.60302 5.43476 2.80021 5.79173 3.15228C6.14869 3.50435 6.35434 3.98324 6.36454 4.48619C6.35434 4.98915 6.14869 5.46804 5.79173 5.82011C5.43476 6.17218 4.95493 6.36937 4.45518 6.36937C3.95543 6.36937 3.47559 6.17218 3.11862 5.82011C2.76166 5.46804 2.55601 4.98915 2.54582 4.48619ZM6.36454 28.5113C6.35434 29.0143 6.14869 29.4932 5.79173 29.8452C5.43476 30.1973 4.95493 30.3945 4.45518 30.3945C3.95543 30.3945 3.47559 30.1973 3.11862 29.8452C2.76166 29.4932 2.55601 29.0143 2.54582 28.5113C2.55601 28.0084 2.76166 27.5295 3.11862 27.1774C3.47559 26.8253 3.95543 26.6281 4.45518 26.6281C4.95493 26.6281 5.43476 26.8253 5.79173 27.1774C6.14869 27.5295 6.35434 28.0084 6.36454 28.5113Z"
                    fill="#444444"
                  />
                </svg>
              </div>
              <div className="dashboard_card_text">Purchase Requests</div>
            </div>
            <div
              className="dashboard_card"
              onClick={() => {
                this.props.toggleAgreementListView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="35"
                  viewBox="0 0 20 20"
                  fill="#333"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_27_10197)">
                    <path
                      d="M13.3334 12.5002H7.50004V10.8335H13.3334V12.5002ZM15.8334 9.16683H7.50004V7.50016H15.8334V9.16683ZM15.8334 5.8335H7.50004V4.16683H15.8334V5.8335ZM2.50004 4.16683V17.5002H15.8334V19.1668H2.50004C2.05801 19.1668 1.63409 18.9912 1.32153 18.6787C1.00897 18.3661 0.833374 17.9422 0.833374 17.5002V4.16683H2.50004ZM17.5 0.833496C17.9421 0.833496 18.366 1.00909 18.6786 1.32165C18.9911 1.63421 19.1667 2.05814 19.1667 2.50016V14.1668C19.1667 15.0918 18.425 15.8335 17.5 15.8335H5.83337C5.39135 15.8335 4.96742 15.6579 4.65486 15.3453C4.3423 15.0328 4.16671 14.6089 4.16671 14.1668V2.50016C4.16671 1.57516 4.90837 0.833496 5.83337 0.833496H17.5ZM5.83337 2.50016V14.1668H17.5V2.50016H5.83337Z"
                      fill="#444"
                      fill-opacity="0.8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_27_10197">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="dashboard_card_text">Agreements</div>
            </div>
            <div
              className="dashboard_card"
              onClick={() => {
                this.props.toggleStatsView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <img src={stats} style={{ width: "30px" }} />
              </div>
              <div className="dashboard_card_text">Statistics</div>
            </div>
            <div
              className="dashboard_card"
              onClick={() => {
                this.props.togglePaymentView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="23"
                  height="41"
                  viewBox="0 0 23 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 1V39.5"
                    stroke="#444444"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.25 8H7.125C5.50055 8 3.94263 8.64531 2.79397 9.79397C1.64531 10.9426 1 12.5005 1 14.125C1 15.7495 1.64531 17.3074 2.79397 18.456C3.94263 19.6047 5.50055 20.25 7.125 20.25H15.875C17.4995 20.25 19.0574 20.8953 20.206 22.044C21.3547 23.1926 22 24.7505 22 26.375C22 27.9995 21.3547 29.5574 20.206 30.706C19.0574 31.8547 17.4995 32.5 15.875 32.5H1"
                    stroke="#444444"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="dashboard_card_text">Payments</div>
            </div>

            <div
              className="dashboard_card"
              onClick={() => {
                this.props.toggleProfileView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="30"
                  height="34"
                  viewBox="0 0 30 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29 32.5V29C29 27.1435 28.2625 25.363 26.9497 24.0503C25.637 22.7375 23.8565 22 22 22H8C6.14348 22 4.36301 22.7375 3.05025 24.0503C1.7375 25.363 1 27.1435 1 29V32.5"
                    stroke="#555555"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 15C18.866 15 22 11.866 22 8C22 4.13401 18.866 1 15 1C11.134 1 8 4.13401 8 8C8 11.866 11.134 15 15 15Z"
                    stroke="#555555"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="dashboard_card_text">Profile</div>
            </div>
          </div>
          {/* Recent activity section */}
          {/* <div
            className="dashboard_card_container"
            style={{ flexDirection: "column" }}
          >
            <div style={{ marginTop: 25 }}>
              <p
                className="rightsidebar_subtitle"
                style={{ fontWeight: 500, color: "#555555" }}
              >
                Recent Activity
              </p>
            </div>
            <div className="recent_activity_container">
              <div
                style={{
                  display: "flex",
                  //   gap: "15px",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 6L9 12L15 18"
                      stroke="#242730"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span style={{ fontSize: 16 }}>2022</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="#B9B9B9"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: "10px" }}>7 days</span>
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_383_2574)">
                      <path
                        d="M3.82468 4.25639L6.74541 6.60547L9.66614 4.25639"
                        stroke="#878997"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_383_2574">
                        <rect
                          width="9.39632"
                          height="11.6829"
                          fill="white"
                          transform="matrix(0 -1 -1 0 12.5869 10.1289)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <MyChart />
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  marginLeft: 20,
                }}
              >
                <p className="recent_activity_text">
                  <svg
                    width="13"
                    height="14"
                    viewBox="0 0 13 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="6.08076"
                      cy="7.0666"
                      rx="6.08076"
                      ry="6.8"
                      fill="#3DAEEE"
                    />
                  </svg>
                  This Month
                </p>
                <p className="recent_activity_text">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <ellipse
                      cx="6.977"
                      cy="7.0666"
                      rx="6.08076"
                      ry="6.8"
                      fill="#FF6589"
                    />
                  </svg>
                  Last Month
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default PurchaseRequests;
