import React, { useEffect, useState } from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import agreement_icon from "../../assets/agreement_icon.png";
import { useMoralis } from "react-moralis";
import { message, Upload, Tooltip, Checkbox } from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const console = require("console-browserify");

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const AgreementView = (props) => {
  // props for uploading files

  const nocPropsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      setNocFile(info.file.originFileObj);
    },
    onRemove(e) {},
  };

  const mouPropsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      let temp = [];
      temp.push(info.file.originFileObj);
      setMouFile(temp);
    },
    onRemove(e) {
      console.log("here");
      let temp = [];
      setMouFile(temp);
    },
  };

  const titlePropsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      setTitleFile(info.file.originFileObj);
    },
    onRemove(e) {},
  };

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

  const [propertyId, setPropertyId] = useState("");
  const [mouFile, setMouFile] = useState([]);
  const [nocFile, setNocFile] = useState([]);
  const [titleFile, setTitleFile] = useState([]);
  const [finishButton, setFinishButton] = useState(false);

  useEffect(() => {
    let agreementId = props.agreementId;
    async function fetchAgreementDetails(agreementId) {
      const request = Moralis.Object.extend("AgreementsTable");
      const agreementQuery = new Moralis.Query(request);
      agreementQuery.equalTo("agreementId", agreementId);
      const results = await agreementQuery.find();
      if (results.length > 0) {
        setPropertyId(results[0].get("propertyId"));
      }
      // console. results[0].get("ownerAddress")
    }
    fetchAgreementDetails(agreementId);
  }, []);

  const onCheck = (e) => {
    setFinishButton(e.target.checked);
  };
  const completeUpload = () => {
    const checked = document.getElementById("checkBox").checked;
    if (checked) {
      if (Object.keys(mouFile).length === 0 && mouFile.constructor === Object) {
        console.log("mou file: empty");
      } else {
        console.log("mou file: ", mouFile);
      }
      console.log("noc file: ", nocFile);
      console.log("title deed file: ", titleFile);
      message.success("here");
      return;
    } else {
      message.info("Note: Please check the box at the bottom to continue ");
      return;
    }
  };
  // ------------------
  return (
    <div className="rightsidebar_container">
      <div className="agreementView">
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p className="rightsidebar_title">My Agreements</p>
            <p className="agreement_view_subtitle">
              {/* Agreement ID - #{props.agreementId} */}
              Agreement ID - #{props.agreementId}
            </p>
          </div>
          <div>
            <img
              src={agreement_icon}
              style={{ width: "8rem" }}
              alt="Agreement icon"
            ></img>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 30,
            gap: 30,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 30,
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <p className="agreement_view_label">Property ID</p>
            {/* <span className="agreement_view_value">#{props.propertyId}</span> */}
            <span className="agreement_view_value">#{propertyId}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 30,
              alignItems: "center",
              justifyContent: "space-between",
              width: "50%",
            }}
          >
            <p className="agreement_view_label">Owner’s Address</p>
            {/* <span className="agreement_view_value">{props.ownerAddress}</span> */}
            <span className="agreement_view_value">
              {props.ownerAddress.slice(0, 10) +
                " ... " +
                props.ownerAddress.slice(25, 35)}
            </span>
          </div>
        </div>
        <div className="uploadAgreementDocs">
          <div className="nocUploadSection">
            <div className="agreementUploadHeading">
              <h3 id="firstAgreementUpload">
                NOC (No Objection Certificate) Document Upload
              </h3>
              <Tooltip
                title="A No Objection Certificate (NOC), is a type of legal document issued by an organization or individual stating that there are no objections to the points made within the document."
                color="#3daeee"
              >
                <span>
                  <InfoCircleOutlined
                    style={{ fontSize: "2.5rem", color: "#3daeee" }}
                  />
                </span>
              </Tooltip>
            </div>
            <Dragger {...nocPropsDragger} className="uploadFiles">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="mouUploadSection">
            <div className="agreementUploadHeading">
              <h3>MOU (Memorandum of Understanding) Document Upload</h3>
              <Tooltip
                title="A MOU is an agreement that is part of the purchasing process put together by the real estate agent, signed by the buyer and the seller, outlining the timescales and terms and conditions of the property purchase."
                color="#3daeee"
              >
                <span>
                  <InfoCircleOutlined
                    style={{ fontSize: "2.5rem", color: "#3daeee" }}
                  />
                </span>
              </Tooltip>
            </div>
            <Dragger {...mouPropsDragger} className="uploadFiles">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="titleDeedUploadSection">
            <div className="agreementUploadHeading">
              <h3>Updated Title Deed Document Upload</h3>
              <Tooltip
                title="A title deed is the document registered at the Land Department that provides proof of ownership of a plot of land or property. "
                color="#3daeee"
              >
                <span>
                  <InfoCircleOutlined
                    style={{ fontSize: "2.5rem", color: "#3daeee" }}
                  />
                </span>
              </Tooltip>
            </div>
            <Dragger {...titlePropsDragger} className="uploadFiles">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </div>
          <div className="bottomSection">
            <Checkbox onChange={onCheck} id="checkBox">
              I confirm that the above uploaded documents are valid
            </Checkbox>
            {finishButton ? (
              <button
                onClick={() => {
                  completeUpload();
                }}
                disabled={false}
                className="finishButton"
              >
                Finish
              </button>
            ) : (
              <button
                onClick={() => {
                  completeUpload();
                }}
                disabled={false}
                className="disabledFinishButton"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementView;
