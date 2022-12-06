import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import "./Agreementview.scss";
import { Switch, Input, message, Spin, Popconfirm } from "antd";
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

  const ipfsLink = "https://propblock.infura-ipfs.io/ipfs/"
  const { TextArea } = Input;
  const [isLoading, setIsLoading] = useState(true);
  const [nocComment, setNocComment] = useState("");
  const [mouComment, setMouComment] = useState("");
  const [titleDeedComment, setTitleDeedComment] = useState("");

  const [nocAccepted, setNocAccepted] = useState(false)
  const [mouAccepted, setMouAccepted] = useState(false)
  const [titleDeedAccepted, setTitleDeedAccepted] = useState(false)
  const [agreement, setAgreement] = useState({});

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
        mode: "goverment",
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setAgreement(res);
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
    loadAgreement();
  }, []);


  const openDocument = (hash) => {
    window.open(ipfsLink.concat(hash), '_blank').focus();
  }

  const buildResponse = () => {
    var content = ""
    if (!nocAccepted) content += "NOC Rejected for the following reason: " + nocComment + ". "
    if (!mouAccepted) content += "MOU Rejected for the following reason: " + mouComment + ". "
    if (!titleDeedAccepted) content += "Title deed Rejected for the following reason: " + titleDeedComment + ". "
    return content
  }

  const buildPopconfirmTitle = () => {
    let title;
    var content = []
    if (!nocAccepted) content.push("NOC")
    if (!mouAccepted) content.push("MOU")
    if (!titleDeedAccepted) content.push("Title Deed")

    if (content.length > 0) {
      title = "Are you sure you want to reject "
      if (content.length == 1) title += "the submitted " + content[0] + " document?"
      else title += "these " + content.length + " submitted documents: (" + content.join(", ") +")?"
    }
    else title = "Are you sure you want to accept all these 3 documents?"
    return title
  }


  const [isProcessing, setIsProcessing] = useState(false)
  const createDecision = async () => {
    if (isProcessing) {
      message.error("Process already in progress!")
      return
    }

    setIsProcessing(true)
    if (!nocAccepted || !mouAccepted || !titleDeedAccepted) {
      //rejecting
      const agreementDocuments = Moralis.Object.extend("AgreementDocuments")
      const docsQuery = new Moralis.Query(agreementDocuments)
      docsQuery.equalTo("objectId", agreement.documents._id)
      const docsResult = await docsQuery.first()
      docsResult.set("reasonForRejection", buildResponse())
      docsResult.save()

      const agreementStatus = Moralis.Object.extend("AgreementStatus")
      const statusQuery = new Moralis.Query(agreementStatus)
      statusQuery.equalTo("objectId", agreement.details._id)
      const statusResult = await statusQuery.first()
      statusResult.set("needsRevision", true)
      statusResult.set("isBeingVerified", false)
      statusResult.save()
      message.info("Agreement has been REJECTED!")
    } else {
      //accepting
      const agreementStatus = Moralis.Object.extend("AgreementStatus")
      const statusQuery = new Moralis.Query(agreementStatus)
      statusQuery.equalTo("objectId", agreement.details._id)
      const statusResult = await statusQuery.first()
      statusResult.set("isGovermentVerified", true)
      statusResult.set("needsRevision", false)
      statusResult.save()
      message.info("Agreement has been ACCEPETED!")
    }

    setIsProcessing(false)
  }

  return (
    <>
      {isLoading ? (
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
              Property ID -{" "}
              <a
                href={"/property/" + agreement.details.propertyObjectId}
                target="_blank"
              >
                #{agreement.details.propertyObjectId}
              </a>
            </h1>
          </div>
          <div>
            Created on: {agreement.createdAt}
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
                  <h3>Email</h3>
                  <p>{agreement.buyer.email}</p>
                </div>
                <div className="detail">
                  <h3>View Front ID</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.buyer.frontIdHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Back ID</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.buyer.backIdHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Passport</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.buyer.passportHash) }}>
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
                  <h3>Email</h3>
                  <p>{agreement.landlord.email}</p>
                </div>
                <div className="detail">
                  <h3>View Front ID</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.landlord.frontIdHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Back ID</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.landlord.backIdHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
                <div className="detail">
                  <h3>View Passport</h3>
                  <button className="downloadButton" onClick={() => { openDocument(agreement.landlord.passportHash) }}>
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
                  <h2>Valid Document</h2>
                  <Switch defaultChecked={false} onChange={setNocAccepted} />
                  <button className="downloadButton" onClick={() => { openDocument(agreement.documents.nocHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              {
                (!nocAccepted || nocAccepted === undefined) && (
                  <div className="commentSection">
                    <p className="document_title">
                      Reason for rejection
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
                ) 
              }

            </div>
            <div className="horizontalline" />
            <div className="documentContainer">
              <div className="topSection">
                <div className="leftSide">
                  <img src={document_icon} alt="Document Icon"></img>
                  <p className="document_title">MOU Uploaded</p>
                </div>
                <div className="rightSide">
                  <h2>Valid Document</h2>
                  <Switch defaultChecked={false} onChange={setMouAccepted} />
                  <button className="downloadButton" onClick={() => { openDocument(agreement.documents.mouHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              {
                (!mouAccepted || mouAccepted === undefined) && (
                  <div className="commentSection">
                    <p className="document_title">
                      Reason for rejection
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
                )
              }

            </div>
            <div className="horizontalline" />
            <div className="documentContainer">
              <div className="topSection">
                <div className="leftSide">
                  <img src={document_icon} alt="Document Icon"></img>
                  <p className="document_title">Title Deed Uploaded</p>
                </div>
                <div className="rightSide">
                  <h2>Valid Document</h2>
                  <Switch defaultChecked={false} onChange={setTitleDeedAccepted} />
                  <button className="downloadButton" onClick={() => { openDocument(agreement.documents.titleDeedHash) }}>
                    View <FolderViewOutlined />
                  </button>
                </div>
              </div>
              {
                (!titleDeedAccepted || titleDeedAccepted === undefined) && (
                  <div className="commentSection">
                    <p className="document_title">
                      Reason for rejection
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
                )
              }

            </div>
            <Popconfirm
              title={buildPopconfirmTitle()}
              onConfirm={() => createDecision()}
              okText="Yes"
              cancelText="No"
            >
              <button className="save_button">
                Save <SaveOutlined />
              </button>
            </Popconfirm>

          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default AgreementView;
