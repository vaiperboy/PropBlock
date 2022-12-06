import React, { useEffect, useState } from "react";
import agreement_icon from "../../assets/agreement_icon.png";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { message, Upload, Tooltip, Checkbox } from "antd";
import { InboxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import ipfs from "../../modules/ipfs";
import Web3 from "web3";

const { Dragger } = Upload;
const console = require("console-browserify");

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

  const [mouFile, setMouFile] = useState([]);
  const [nocFile, setNocFile] = useState([]);
  const [titleFile, setTitleFile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  //for renaming files when uploading to IPFS
  const renameFile = (originalFile, newName) => {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  };

  //upload docs via IPFS
  const uploadToIpfs = async () => {
    return new Promise(async (resolve, reject) => {
      var hashes = {};
      try {
        hashes.nocHash = (await ipfs.add(nocFile)).path;
        hashes.mouHash = (await ipfs.add(mouFile)).path;
        hashes.titleDeedHash = (await ipfs.add(titleFile)).path;
        resolve(hashes);
      } catch (error) {
        reject(error);
      }
    });
  };

  window.uploadToIpfs = uploadToIpfs;

  const validateUpload = () => {
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
      return false;
    }
    return true;
  };

  const { save } = useNewMoralisObject("AgreementDocuments");
  const [isUploading, setIsUploading] = useState(false);
  const uploadDocs = async (e) => {
    if (isUploading) {
      message.error("Documents already being uploaded!");
      return;
    }

    if (!validateUpload) {
      return;
    }

    setIsUploading(true);
    uploadToIpfs()
      .then(async (hashes) => {
        const data = {
          agreementObjectId: agreement.objectId,
          nocHash: hashes.nocHash,
          mouHash: hashes.mouHash,
          titleDeedHash: hashes.titleDeedHash,
        };

        save(data, {
          onSuccess: (obj) => {
            message.success("Documents uploaded!");
          },
          onError: (error) => {
            message.error("Couldn't input documents into database!");
          },
        });
      })
      .catch((err) => {
        message.error("Issue with uploading to IPFS! " + err);
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const onCheck = (e) => {
    setIsChecked(e.target.checked);
  };

  const [agreement, setAgreement] = useState({});
  async function loadAgreement() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getAgreement?" +
        new URLSearchParams({
          sessionToken: user.getSessionToken(),
          ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
          agreementObjectId: props.agreementId,
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

  // ------------------
  return (
    <div>
      {isLoading ? (
        <p>loading</p>
      ) : (
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
                  Agreement ID - #{agreement.objectId.slice(0, 6)}
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
                <a
                  href={"/property" + agreement.details.propertyObjectId}
                  target="_blank"
                >
                  <span className="agreement_view_value">
                    #{agreement.details.propertyObjectId}
                  </span>
                </a>
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
                <span className="agreement_view_value">
                  {agreement.landlordAddress.slice(0, 10) +
                    " ... " +
                    agreement.landlordAddress.slice(25, 35)}
                </span>
              </div>
            </div>
            {/* {agreement.documents.reasonForRejection !== undefined && (
              <h1 style={{ color: "red", fontSize: "2rem " }}>
                Reason for rejection: {agreement.documents.reasonForRejection}
              </h1>
            )} */}
            {true && (
              <h1 style={{ color: "red", fontSize: "2rem " }}>
                Reason for rejection: heraerlkams asdkjna
              </h1>
            )}
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
                {isChecked ? (
                  <button
                    onClick={() => {
                      uploadDocs();
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
      )}
    </div>
  );
};

export default AgreementView;
