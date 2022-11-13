import React from "react";
import stats from "./stats.png";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

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
          </div>
        </div>
        {/*   */}
      </div>
    );
  }
}

export default PurchaseRequests;
