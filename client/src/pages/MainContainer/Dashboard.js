import React, { useEffect, useState } from "react";
import stats from "./stats_2.png";
import { Chart, Line } from "react-charts";

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
        height: "20rem",
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
            <p className="rightsidebar_title">Welcome back, {name}</p>
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
                this.props.toggleStatsView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <img src={stats} style={{ width: "41px", height: "41px" }} />
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
                    stroke="#555555"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.25 8H7.125C5.50055 8 3.94263 8.64531 2.79397 9.79397C1.64531 10.9426 1 12.5005 1 14.125C1 15.7495 1.64531 17.3074 2.79397 18.456C3.94263 19.6047 5.50055 20.25 7.125 20.25H15.875C17.4995 20.25 19.0574 20.8953 20.206 22.044C21.3547 23.1926 22 24.7505 22 26.375C22 27.9995 21.3547 29.5574 20.206 30.706C19.0574 31.8547 17.4995 32.5 15.875 32.5H1"
                    stroke="#555555"
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
                    fill="#555555"
                  />
                </svg>
              </div>
              <div className="dashboard_card_text">Purchase Requests</div>
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
            <div
              className="dashboard_card"
              onClick={() => {
                this.props.toggleSettingView(true);
              }}
            >
              <div className="dashboard_card_icon">
                <svg
                  width="39"
                  height="39"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_26_3332)">
                    <path
                      d="M19.5 24.375C22.1924 24.375 24.375 22.1924 24.375 19.5C24.375 16.8076 22.1924 14.625 19.5 14.625C16.8076 14.625 14.625 16.8076 14.625 19.5C14.625 22.1924 16.8076 24.375 19.5 24.375Z"
                      stroke="#555555"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M31.525 24.375C31.3087 24.8651 31.2442 25.4088 31.3397 25.936C31.4353 26.4631 31.6866 26.9495 32.0612 27.3325L32.1588 27.43C32.4609 27.7318 32.7006 28.0903 32.8642 28.4848C33.0277 28.8794 33.1119 29.3023 33.1119 29.7294C33.1119 30.1565 33.0277 30.5794 32.8642 30.9739C32.7006 31.3685 32.4609 31.7269 32.1588 32.0287C31.8569 32.3309 31.4985 32.5706 31.1039 32.7342C30.7094 32.8977 30.2865 32.9819 29.8594 32.9819C29.4323 32.9819 29.0094 32.8977 28.6148 32.7342C28.2203 32.5706 27.8618 32.3309 27.56 32.0287L27.4625 31.9312C27.0795 31.5566 26.5931 31.3053 26.066 31.2097C25.5388 31.1142 24.9951 31.1787 24.505 31.395C24.0244 31.601 23.6145 31.943 23.3257 32.379C23.037 32.815 22.8821 33.3258 22.88 33.8487V34.125C22.88 34.987 22.5376 35.8136 21.9281 36.4231C21.3186 37.0326 20.492 37.375 19.63 37.375C18.768 37.375 17.9414 37.0326 17.3319 36.4231C16.7224 35.8136 16.38 34.987 16.38 34.125V33.9787C16.3674 33.4409 16.1933 32.9192 15.8803 32.4816C15.5673 32.044 15.1299 31.7107 14.625 31.525C14.1349 31.3087 13.5912 31.2442 13.064 31.3397C12.5369 31.4353 12.0505 31.6866 11.6675 32.0612L11.57 32.1588C11.2682 32.4609 10.9097 32.7006 10.5152 32.8642C10.1206 33.0277 9.69773 33.1119 9.27062 33.1119C8.84352 33.1119 8.42061 33.0277 8.02607 32.8642C7.63153 32.7006 7.27309 32.4609 6.97125 32.1588C6.66908 31.8569 6.42936 31.4985 6.26581 31.1039C6.10225 30.7094 6.01807 30.2865 6.01807 29.8594C6.01807 29.4323 6.10225 29.0094 6.26581 28.6148C6.42936 28.2203 6.66908 27.8618 6.97125 27.56L7.06875 27.4625C7.44337 27.0795 7.69468 26.5931 7.79026 26.066C7.88584 25.5388 7.82131 24.9951 7.605 24.505C7.39901 24.0244 7.05698 23.6145 6.62101 23.3257C6.18503 23.037 5.67415 22.8821 5.15125 22.88H4.875C4.01305 22.88 3.1864 22.5376 2.5769 21.9281C1.96741 21.3186 1.625 20.492 1.625 19.63C1.625 18.768 1.96741 17.9414 2.5769 17.3319C3.1864 16.7224 4.01305 16.38 4.875 16.38H5.02125C5.55912 16.3674 6.08076 16.1933 6.51836 15.8803C6.95596 15.5673 7.28929 15.1299 7.475 14.625C7.69131 14.1349 7.75584 13.5912 7.66026 13.064C7.56468 12.5369 7.31337 12.0505 6.93875 11.6675L6.84125 11.57C6.53908 11.2682 6.29936 10.9097 6.13581 10.5152C5.97225 10.1206 5.88807 9.69773 5.88807 9.27062C5.88807 8.84352 5.97225 8.42061 6.13581 8.02607C6.29936 7.63153 6.53908 7.27309 6.84125 6.97125C7.14309 6.66908 7.50153 6.42936 7.89607 6.26581C8.29061 6.10225 8.71352 6.01807 9.14062 6.01807C9.56773 6.01807 9.99064 6.10225 10.3852 6.26581C10.7797 6.42936 11.1382 6.66908 11.44 6.97125L11.5375 7.06875C11.9205 7.44337 12.4069 7.69468 12.934 7.79026C13.4612 7.88584 14.0049 7.82131 14.495 7.605H14.625C15.1056 7.39901 15.5155 7.05698 15.8043 6.62101C16.093 6.18503 16.2479 5.67415 16.25 5.15125V4.875C16.25 4.01305 16.5924 3.1864 17.2019 2.5769C17.8114 1.96741 18.638 1.625 19.5 1.625C20.362 1.625 21.1886 1.96741 21.7981 2.5769C22.4076 3.1864 22.75 4.01305 22.75 4.875V5.02125C22.7521 5.54415 22.907 6.05504 23.1957 6.49101C23.4845 6.92698 23.8944 7.26901 24.375 7.475C24.8651 7.69131 25.4088 7.75584 25.936 7.66026C26.4631 7.56468 26.9495 7.31337 27.3325 6.93875L27.43 6.84125C27.7318 6.53908 28.0903 6.29936 28.4848 6.13581C28.8794 5.97225 29.3023 5.88807 29.7294 5.88807C30.1565 5.88807 30.5794 5.97225 30.9739 6.13581C31.3685 6.29936 31.7269 6.53908 32.0287 6.84125C32.3309 7.14309 32.5706 7.50153 32.7342 7.89607C32.8977 8.29061 32.9819 8.71352 32.9819 9.14062C32.9819 9.56773 32.8977 9.99064 32.7342 10.3852C32.5706 10.7797 32.3309 11.1382 32.0287 11.44L31.9312 11.5375C31.5566 11.9205 31.3053 12.4069 31.2097 12.934C31.1142 13.4612 31.1787 14.0049 31.395 14.495V14.625C31.601 15.1056 31.943 15.5155 32.379 15.8043C32.815 16.093 33.3258 16.2479 33.8487 16.25H34.125C34.987 16.25 35.8136 16.5924 36.4231 17.2019C37.0326 17.8114 37.375 18.638 37.375 19.5C37.375 20.362 37.0326 21.1886 36.4231 21.7981C35.8136 22.4076 34.987 22.75 34.125 22.75H33.9787C33.4558 22.7521 32.945 22.907 32.509 23.1957C32.073 23.4845 31.731 23.8944 31.525 24.375V24.375Z"
                      stroke="#555555"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_26_3332">
                      <rect width="39" height="39" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="dashboard_card_text">Settings</div>
            </div>
          </div>
          <div
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
          </div>
        </div>
      </div>
    );
  }
}

export default PurchaseRequests;
