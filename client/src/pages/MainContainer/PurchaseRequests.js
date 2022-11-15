import React from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "../../styling/MainContainer/purchaseRequests.scss";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

class PurchaseRequests extends React.Component {
  state = {
    inputDragEvent: {},
    file1: [],
    file2: [],
    file3: [],
  };

  componentDidMount = () => {};
  componentWillUnmount = () => {};

  render() {
    if (this.props.isBuyer === "true") {
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
              <p className="rightsidebar_title">My Purchase Requests</p>
              <div className="purchaseRequestsContainer"></div>
            </div>
          </div>
        </div>
      );
    } else {
    }
  }
}

export default PurchaseRequests;
