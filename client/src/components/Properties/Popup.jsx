import React from "react";
import Popup from "reactjs-popup";
import "./Popup.scss";
import img from "../../assets/1-zwcayevpapn4hghyp-qcgw-2@2x.png";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

class Testpopup extends React.Component {
  constructor() {
    super();
    this.state = {
      fullname: "Qusai Abdelqader",
      walletAddress: "123456",
      CreatedOn: "",
      Description: "my name is qusai",
    };
  }

  render() {


    //timeAgo.format(Date.now() - 60 * 1000, "round"); //1 minute ago
    // // this.setState.CreatedOn(
    // //     timeAgo.format(Date.now() - 60 * 1000, 'round')
    // //     )
    // timeAgo.format(Date.now() - 2 * 60 * 60 * 1000, "round"); //2 hours ago
    // timeAgo.format(Date.now() - 24 * 60 * 60 * 1000, "round"); //1 day ago
    // timeAgo.format(Date.now() - 30 * 24 * 60 * 60 * 1000, "round"); //30 days ago
    // console.log(timeAgo);
    // timeAgo.format(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000, "round"); //12 months ago
    // console.log(timeAgo);
    // timeAgo.format(Date.now() - 2 * 12 * 30 * 24 * 60 * 60 * 1000, "round"); //2 years ago
    // console.log(timeAgo);
    // TimeAgo.addDefaultLocale(en);
    // const timeAgo = new TimeAgo("en-US");
    // timeAgo.format(new Date(), "round"); //right now


    return (
      <Popup trigger={<button className="main-button"></button>} modal nested>
        {(close) => (
          <div className="main">
            <div className="overlay" />

            <div className="modal">
              <button className="close" onClick={close}>
                &times;
              </button>

              <div className="header">
                <img src={img} />
                <p>{this.state.fullname} Information</p>
              </div>
              <div className="content">
                {" "}
                <div className="field">
                  Full Name : <p className="text">{this.state.fullname}</p>
                </div>
                <div className="field">
                  Wallet Address : <p className="text">{this.state.walletAddress}</p>
                </div>
                <div className="field">
                  Created On : <p className="text">13 Nov 2022 at 20:17:35 UTC</p>
                </div>
                <div className="field">
                  Description : <p className="text">{this.state.Description}</p>
                </div>

              </div>
              <div className="actions"></div>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default Testpopup;
