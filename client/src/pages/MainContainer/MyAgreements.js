import React from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const MyAgreements = (props) => {
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
          <p className="rightsidebar_title">My Agreements</p>
          <p className="rightsidebar_subtitle">Agreement ID - #12212</p>
        </div>
        <div>
          <svg
            width="92"
            height="92"
            viewBox="0 0 92 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M62.6668 58.4998H33.5001V50.1665H62.6668V58.4998ZM75.1668 41.8332H33.5001V33.4998H75.1668V41.8332ZM75.1668 25.1665H33.5001V16.8332H75.1668V25.1665ZM8.50008 16.8332V83.4998H75.1668V91.8332H8.50008C6.28994 91.8332 4.17033 90.9552 2.60753 89.3924C1.04472 87.8296 0.166748 85.71 0.166748 83.4998V16.8332H8.50008ZM83.5001 0.166504C85.7102 0.166504 87.8298 1.04448 89.3926 2.60728C90.9554 4.17008 91.8334 6.2897 91.8334 8.49984V66.8332C91.8334 71.4582 88.1251 75.1665 83.5001 75.1665H25.1667C22.9566 75.1665 20.837 74.2885 19.2742 72.7257C17.7114 71.1629 16.8334 69.0433 16.8334 66.8332V8.49984C16.8334 3.87484 20.5417 0.166504 25.1667 0.166504H83.5001ZM25.1667 8.49984V66.8332H83.5001V8.49984H25.1667Z"
              fill="#3DAEEE"
              fill-opacity="0.56"
            />
          </svg>
        </div>
      </div>
      <div
        className="rightsidebar_content"
        style={{ width: "100%", display: "flex", marginTop: 30 }}
      >
        <div className="rightsidebar_item">
          <div className="rightsidebar_upload_text">
            NOC (No Objection Letter) Upload
          </div>
          <FilePond
            files={this.state.file1}
            onupdatefiles={(e) => {
              this.setState({ file1: e });
            }}
            allowImagePreview={false}
            allowMultiple={false}
            name="files"
            labelIdle={`<div><p style="display: flex; justify-content:'center'; align-items:'center'; text-align:'center'; margin-bottom: 0px; font-size: 16px;">Drag & Drop File<br/> or</p><p style="color: #3DAEEE; display: flex; justify-content: center; align-items: center' text-align: center, font-size: 14px'; cursor: pointer;">Browse Files</p></div>`}
          />
        </div>
        <div className="rightsidebar_item" style={{ marginTop: 20 }}>
          <div className="rightsidebar_upload_text">MOU Upload</div>
          <FilePond
            files={this.state.file2}
            onupdatefiles={(e) => {
              this.setState({ file2: e });
            }}
            allowImagePreview={false}
            allowMultiple={false}
            name="files"
            labelIdle={`<div><p style="display: flex; justify-content:'center'; align-items:'center'; text-align:'center'; margin-bottom: 0px; font-size: 16px;">Drag & Drop File<br/> or</p><p style="color: #3DAEEE; display: flex; justify-content: center; align-items: center' text-align: center, font-size: 14px'; cursor: pointer;">Browse Files</p></div>`}
          />
        </div>
        <div className="rightsidebar_item" style={{ marginTop: 20 }}>
          <div className="rightsidebar_upload_text">Updated Title deed</div>
          <FilePond
            files={this.state.file3}
            onupdatefiles={(e) => {
              this.setState({ file3: e });
            }}
            allowImagePreview={false}
            allowMultiple={false}
            name="files"
            labelIdle={`<div><p style="display: flex; justify-content:'center'; align-items:'center'; text-align:'center'; margin-bottom: 0px; font-size: 16px;">Drag & Drop File<br/> or</p><p style="color: #3DAEEE; display: flex; justify-content: center; align-items: center' text-align: center, font-size: 14px'; cursor: pointer;">Browse Files</p></div>`}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 16.5L18 21L33 6"
              stroke="#3DAEEE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M31.5 18V28.5C31.5 29.2956 31.1839 30.0587 30.6213 30.6213C30.0587 31.1839 29.2956 31.5 28.5 31.5H7.5C6.70435 31.5 5.94129 31.1839 5.37868 30.6213C4.81607 30.0587 4.5 29.2956 4.5 28.5V7.5C4.5 6.70435 4.81607 5.94129 5.37868 5.37868C5.94129 4.81607 6.70435 4.5 7.5 4.5H24"
              stroke="#3DAEEE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="checkbox_text">
            I confirm that the above uploaded documents are valid.
          </p>
        </div>
        <div style={{ display: "flex", marginTop: 20 }}>
          <button className="leftsidebar_button" style={{ userSelect: "none" }}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAgreements;
