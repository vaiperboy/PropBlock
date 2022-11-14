import React, { useState, useEffect } from "react";
import stats from "../../assets/etienne-beauregard-riverin.png";
import {
  message,
  Alert,
  notification,
  Checkbox,
  DatePicker,
  Upload,
  Button,
  Modal,
} from "antd";

import { PlusOutlined, UploadOutlined, InboxOutlined } from "@ant-design/icons";
import "../../styling/MainContainer/CreateProperty.scss";
import { Input, Stepper, Select } from "@web3uikit/core";
import blueTick from "./assets/blue_tick.png";
import image from "../../assets/blue_tick.png";
import moment from "moment";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { useNavigate } from "react-router-dom";
// import Moralis from "moralis-v1/types";
const console = require("console-browserify");
const { Dragger } = Upload;

const TestPage = () => {
  //set this to false to display the current properties
  const [addPropertyView, setAddPropertyView] = useState(true);
  const [imagesList, setImagesList] = useState({});
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [deedyr, setDeedyr] = useState("");
  const [type, setType] = useState("");
  const [deedno, setDeedno] = useState("");
  const [occupNum, setOccupNumber] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [isValidatedSecond, setIsValidatedSecond] = useState(false);
  // const [isValidatedThird, setIsValidatedThird] = useState(false);
  const [fileList, setFileList] = useState({});
  const validateInputThird = (bednumber, bathnumber, occupancynum) => {
    try {
      if (occupancynum === 0) {
        message.error("Occupancy Number cant be 0");
      }
    } catch (error) {}
  };

  // html for upload button - images
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleChange = (info) => {
    let newFileList = [...info.fileList];
    setFileList(newFileList);
  };

  const showImages = () => {
    fileList.map((file) => {
      console.log("File: ", file.name);
    });
  };

  const propsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    action: "",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      console.log("status: ", info.file);
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  if (addPropertyView) {
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
            <p className="rightsidebar_title">My Properties</p>
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
              height: "60px",
              width: "100%",
              display: "flex",
              gap: "30px",
              borderRadius: "8px",
              padding: "16px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: "350px",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.33)",
              }}
            >
              <div>
                <img src={stats} style={{ width: "100%" }} />
              </div>
              <div style={{ padding: 15 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p className="card_title">Villas, Jumeriah</p>
                  <p
                    className="card_amount_text"
                    style={{ color: "#278F3E", fontWeight: 600 }}
                  >
                    $ 1,500,000{" "}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p
                    className="card_info"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    3BKH{" "}
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "rgba(85, 85, 85, 0.47)",
                        margin: "0px 5px",
                      }}
                    />{" "}
                    Lorem Ipsum
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p className="card_amount_sub_text" style={{ marginTop: 2 }}>
                    Property ID - 1
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "20px",
                    marginTop: 7,
                  }}
                >
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span
                      className="card_info"
                      style={{
                        marginTop: 2,
                        fontWeight: 500,
                        color: "#555555",
                        alignItems: "center",
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <svg
                        width="30"
                        height="19"
                        viewBox="0 0 30 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z"
                          fill="#3DAEEE"
                        />
                      </svg>
                      3 Beds
                    </span>
                    <span
                      className="card_info"
                      style={{
                        marginTop: 2,
                        fontWeight: 500,
                        color: "#555555",
                        alignItems: "center",
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <svg
                        width="30"
                        height="19"
                        viewBox="0 0 30 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z"
                          fill="#3DAEEE"
                        />
                      </svg>
                      4 Baths
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "350px",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 0px 4px 1px rgba(0, 0, 0, 0.33)",
              }}
            >
              <div>
                <img src={stats} style={{ width: "100%" }} />
              </div>
              <div style={{ padding: 15 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p className="card_title">Villas, Jumeriah</p>
                  <p
                    className="card_amount_text"
                    style={{ color: "#278F3E", fontWeight: 600 }}
                  >
                    $ 1,500,000{" "}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p
                    className="card_info"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    3BKH{" "}
                    <div
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: "rgba(85, 85, 85, 0.47)",
                        margin: "0px 5px",
                      }}
                    />{" "}
                    Lorem Ipsum
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    maxHeight: "25px",
                  }}
                >
                  <p className="card_amount_sub_text" style={{ marginTop: 2 }}>
                    Property ID - 1
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "20px",
                    marginTop: 7,
                  }}
                >
                  <div style={{ display: "flex", gap: "20px" }}>
                    <span
                      className="card_info"
                      style={{
                        marginTop: 2,
                        fontWeight: 500,
                        color: "#555555",
                        alignItems: "center",
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <svg
                        width="30"
                        height="19"
                        viewBox="0 0 30 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z"
                          fill="#3DAEEE"
                        />
                      </svg>
                      3 Beds
                    </span>
                    <span
                      className="card_info"
                      style={{
                        marginTop: 2,
                        fontWeight: 500,
                        color: "#555555",
                        alignItems: "center",
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <svg
                        width="30"
                        height="19"
                        viewBox="0 0 30 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5455 2.46847H8.45455C6.7977 2.46847 5.45455 3.81161 5.45455 5.46847V9.74447C5.45455 10.4976 4.84402 11.1081 4.09091 11.1081C3.33779 11.1081 2.72727 10.4976 2.72727 9.74447V1.36364C2.72727 0.610523 2.11675 0 1.36364 0C0.610521 0 0 0.610521 0 1.36364V17.1499C0 17.903 0.610521 18.5135 1.36364 18.5135C2.11675 18.5135 2.72727 17.903 2.72727 17.1499V16.6622C2.72727 15.6397 3.55615 14.8108 4.57862 14.8108H25.4214C26.4438 14.8108 27.2727 15.6397 27.2727 16.6622V17.1499C27.2727 17.903 27.8832 18.5135 28.6364 18.5135C29.3895 18.5135 30 17.903 30 17.1499V7.40541C30 6.09605 29.4253 4.84032 28.4024 3.91446C27.3795 2.98861 25.9921 2.46847 24.5455 2.46847Z"
                          fill="#3DAEEE"
                        />
                      </svg>
                      4 Baths
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => setAddPropertyView(false)}>
              <svg
                className="add-property-sign"
                width="77"
                height="77"
                viewBox="0 0 77 77"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="38.5"
                  cy="38.5"
                  r="38"
                  fill="white"
                  stroke="#3DAEEE"
                />
                <path
                  d="M50.1667 39.6667H40.6667V49.1667H37.5V39.6667H28V36.5H37.5V27H40.6667V36.5H50.1667V39.6667Z"
                  fill="#3DAEEE"
                />
              </svg>
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
            <p className="rightsidebar_title">My Profile</p>
          </div>
        </div>
        <div
          className="rightsidebar_content"
          style={{
            width: "100%",
            display: "flex",
            marginTop: 20,
            height: "auto",
          }}
        >
          <div className="create-property" style={{ marginLeft: "10rem" }}>
            <div className="container">
              <div className="containerchild">
                <Stepper
                  style={{
                    position: "relative",
                  }}
                  onComplete={() => console.log("TTEST")}
                  step={1}
                  hasNavButtons={false}
                  stepData={[
                    {
                      content: (
                        <div className="fullform">
                          <div className="inputs-container">
                            <p>
                              Upload the required title deed and images for your
                              property. Make sure that the images are high
                              quality for better viewing. You can upload upto 8
                              images for your property.
                            </p>
                            <p
                              className="text upload"
                              style={{ marginTop: "5rem" }}
                            >
                              Upload Title Deed
                            </p>
                            {/* <Upload /> */}
                            <br />
                            <p className="text upload">Upload Images</p>
                            <Upload
                              action=""
                              onChange={handleChange}
                              multiple={true}
                              listType="picture-card"
                              accept=".png, .jpeg, .jpg"
                              maxCount={5}
                              multiple={true}
                            >
                              {uploadButton}
                            </Upload>
                          </div>
                          <Button onClick={showImages}>show images</Button>
                          <div style={{ margin: "2rem" }}></div>
                          <Dragger {...propsDragger}>
                            <p className="ant-upload-drag-icon">
                              <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                              Click or drag file to this area to upload
                            </p>
                            <p className="ant-upload-hint">
                              Support for a single or bulk upload. Strictly
                              prohibit from uploading company data or other band
                              files
                            </p>
                          </Dragger>

                          <div className="buttons-container">
                            <button
                              className="prevButton btn-submit reset"
                              id="prev"
                              style={{
                                padding: "0.5rem 2rem",
                                height: "fit-content",
                              }}
                            >
                              {" "}
                              Back
                            </button>
                            {!isValidatedSecond && (
                              <button
                                id="validateButton"
                                className="validatebtn"
                                text="Validate"
                                onClick={() => validateInputThird(occupNum)}
                              >
                                {" "}
                                Validate
                              </button>
                            )}

                            {isValidatedSecond && (
                              <button
                                id="next"
                                className="nextButton  "
                                text="Next"
                                onClick={() => validateInputThird(occupNum)}
                              >
                                Next
                              </button>
                            )}
                          </div>
                        </div>
                      ),
                    },
                    {
                      content: (
                        <div className="fullform">
                          <div className="checkimage">
                            {<img src={image} alt=""></img>}
                          </div>
                          <p className="text done">
                            Your property was created Successfully!
                          </p>
                          <div id="dashboardend">
                            <button
                              className="nextButton btn-submit end"
                              id=""
                              style={{}}
                              onClick={() => {
                                window.location.reload(false);
                              }}
                            >
                              Finish
                            </button>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default TestPage;
