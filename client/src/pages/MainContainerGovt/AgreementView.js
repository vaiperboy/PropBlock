import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import "./Agreementview.scss";
import { Switch, Input, message } from "antd";
import {
  FolderViewOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import document_icon from "../../assets/document_icon.svg";
import save_icon from "../../assets/save_icon.png";
import Web3 from "web3";
import { useMoralis, useNewMoralisObject } from "react-moralis";

const console = require("console-browserify");

const AgreementView = (props) => {
  
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

  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(true)
  const [nocComment, setNocComment] = useState("");
  const [mouComment, setMouComment] = useState("");
  const [titleDeedComment, setTitleDeedComment] = useState("");
  const [agreement, setAgreement] = useState({})
  
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const shortenAddress = (address) => {
    let newAddress =
      address.slice(0, 5) +
      " ... " +
      address.slice(address.length - 3, address.length);
    return newAddress;
  };

  const handleBackButton = () => {
    console.log("props: ", props);
    props.toggleView(true);
  };

  async function loadAgreement() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getAgreement?" +
      new URLSearchParams({
        sessionToken: user.getSessionToken(),
        ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
        agreementObjectId: props.agreementId,
        mode: "goverment"
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setAgreement(res)
      })
      .catch((err) => {
        message.error("API error");
        setAgreement({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadAgreement()
  }, [])

  return (
    <>
    {
      (isLoading) ? (
        <>loading</>
        ) : (
          <div className="rightsidebar_container">
          <p
            className="agreement_view_subtitle"
            style={{ marginBottom: 15, color: "#555555" }}
          >
            Agreement ID - #{agreement.objectId.slice(0, 6)}
          </p>
          <button
            className="applyy_button"
            onClick={() => {
              handleBackButton();
            }}
          >
            <ArrowLeftOutlined /> Back
          </button>
          <div className="propertyId">
            <h1>
              Property ID - <a href={"/property/" + agreement.details.propertyObjectId} target="_blank">#{agreement.details.propertyObjectId}</a>
            </h1>
          </div>
          <div className="agreementUsersDetails">
            <div className="user">
              <h1>Buyer's Details</h1>
              <div className="userDetails">
                <div className="detail">
                  <h3>Name</h3>
                  <p>{agreement.buyer.fullName}</p>
                </div>
                <div className="detail">
                  <h3>Address</h3>
                  <p>#{shortenAddress(agreement.buyerAddress)}</p>
                </div>
                <div className="detail">
                  <h3>View Front ID</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Back ID</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Passport</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
            </div>
            <div className="user">
              <h1>Seller's Details</h1>
              <div className="userDetails">
                <div className="detail">
                  <h3>Name</h3>
                  <p>{agreement.landlord.fullName}</p>
                </div>
                <div className="detail">
                  <h3>Address</h3>
                  <p>#{shortenAddress(agreement.landlordAddress)}</p>
                </div>
                <div className="detail">
                  <h3>View Front ID</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Back ID</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Passport</h3>
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="documentSection">
            <div className="heading">
              <p className="agreement_view_subtitle">Agreement Documents</p>
            </div>
            <div className="documentContainer">
              <div className="topSection">
                <div className="leftSide">
                  <img src={document_icon} alt="Document Icon"></img>
                  <p className="document_title">NOC Uploaded</p>
                </div>
                <div className="rightSide">
                  <h2>Validate Document</h2>
                  <Switch defaultChecked={false} onChange={onChange} />
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              <div className="commentSection">
                <p className="document_title">
                  Reason for rejection (if applicable)
                </p>
                <div>
                  <TextArea
                    onChange={(e) => setNocComment(e.target.value)}
                    placeholder="Enter you Noc Comment here"
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="horizontalline" />
            <div className="documentContainer">
              <div className="topSection">
                <div className="leftSide">
                  <img src={document_icon} alt="Document Icon"></img>
                  <p className="document_title">MOU Uploaded</p>
                </div>
                <div className="rightSide">
                  <h2>Validate Document</h2>
                  <Switch defaultChecked={false} onChange={onChange} />
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              <div className="commentSection">
                <p className="document_title">
                  Reason for rejection (if applicable)
                </p>
                <div>
                  <TextArea
                    onChange={(e) => setMouComment(e.target.value)}
                    placeholder="Enter you Noc Comment here"
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="horizontalline" />
            <div className="documentContainer">
              <div className="topSection">
                <div className="leftSide">
                  <img src={document_icon} alt="Document Icon"></img>
                  <p className="document_title">Title Deed Uploaded</p>
                </div>
                <div className="rightSide">
                  <h2>Validate Document</h2>
                  <Switch defaultChecked={false} onChange={onChange} />
                  <button className="downloadButton" onClick={() => {}}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              <div className="commentSection">
                <p className="document_title">
                  Reason for rejection (if applicable)
                </p>
                <div>
                  <TextArea
                    onChange={(e) => setTitleDeedComment(e.target.value)}
                    placeholder="Enter you Title Deed Comment here"
                    autoSize={{
                      minRows: 3,
                      maxRows: 5,
                    }}
                  />
                </div>
              </div>
            </div>
            <button className="save_button" onClick={() => {}}>
              Save <SaveOutlined />
            </button>
          </div>
          <div></div>
        </div>
        )
    }
    </>
    
  );
};

export default AgreementView;
