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
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      if (info.fileList.length === 0) setNocFile({});
      else setNocFile(info.file.originFileObj);
    },
  };

  const mouPropsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      if (info.fileList.length === 0) setMouFile({});
      else setMouFile(info.file.originFileObj);
    },
  };

  const titlePropsDragger = {
    name: "file",
    multiple: true,
    accept: ".pdf",
    maxCount: 1,
    onChange(info) {
      if (info.fileList.length === 0) setTitleFile({});
      else setTitleFile(info.file.originFileObj);
    },
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
  const [isValidated, setIsValidated] = useState(false);
  const [agreement, setAgreement] = useState({});
  const [isUploaded, setIsUploaded] = useState(false);

  const validateUpload = (e) => {
    var errors = [];
    console.log("here");
    if (nocFile.name === undefined) {
      errors.push("NoC file cannot be empty!");
    }
    if (mouFile.name == undefined) {
      errors.push("MOU file cannot be empty!");
    }
    if (titleFile.name == undefined) {
      errors.push("Title Deed file cannot be empty!");
    }
    if (errors.length > 0) {
      errors.forEach((e) => message.error(e));
      setIsUploaded(false);
      return false;
    }
    message.success("Files are uploaded successfully/");
    setIsUploaded(true);
    return true;
  };

  const onCheck = (e) => {
    setIsValidated(e.target.checked);
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
              {/* {props.ownerAddress.slice(0, 10) +
                " ... " +
                props.ownerAddress.slice(25, 35)} */}
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
            {isValidated ? (
              <button
                onClick={() => {
                  validateUpload();
                }}
                className="finishButton"
              >
                Finish
              </button>
            ) : (
              <button disabled={true} className="disabledFinishButton">
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
