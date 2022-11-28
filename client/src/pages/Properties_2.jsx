import Navbar from "../components/Navbar";
import React, { Component, useEffect } from "react";
import { message, Descriptions, Typography } from "antd";
import GridLoader from "react-spinners/GridLoader";
import PropertyListing from "../components/Properties/PropertyListing";
import SampleImage from "../assets/sample-property.png";
import SampleWalletImage from "../assets/sample-wallet-image.png";
import SearchAvailability from "../components/Properties/SearchAvailability";
import FilterProperties from "../components/Properties/FilterProperties";
import { Pagination } from "@mui/material";
import "../styling/Properties/Properties.scss";
import Footer from "../components/Footer";
const console = require("console-browserify");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queriesCount: 0,
      filteringParameters: {
        prices: {
          minPrice: 100,
          maxPrice: 100000,
        },
        isVilla: true,
        isApartment: true,
        isTownhouse: true,
        isPenthouse: true,
        isDuplex: true,
        minimumBeds: 0,
        hasParking: true,
        hasWifi: true,
        hasRestaurant: true,
        hasPool: true,
      },
      properties: [],
      isLoading: false,
    };
    this.handleFiltering = this.handleFiltering.bind(this);
  }

  //to pass information from child to parent
  handleFiltering(_name, value) {
    var oldState = { ...this.state.filteringParameters };
    oldState[_name] = value;
    this.setState({ filteringParameters: oldState });
    console.log(_name + ": " + value);
  }

  //construct the pages count
  constructPagesCount() {
    return (
      <Pagination
        count={1}
        color="primary"
        size="large"
        onChange={this.switchPage}
        style={{ zoom: "130%" }}
      />
    );
  }

  constructPage(pageNo) {}

  switchPage(e, page) {
    //window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    console.log(page);
  }

  render() {
    return (
      <div className="properties-page">
        <header className="App-header">
          <Navbar />
        </header>
        <div className="App">
          <div className="upper-body">
            <div className="topSearchSection">
              <SearchAvailability />
            </div>
          </div>
          <div className="body">
            {/* <p>{JSON.stringify(this.state.filteringParameters)}</p> */}
            <div className="real-body">
              <div className="left-body">
                <FilterProperties
                  minPrice={100}
                  maxPrice={100000}
                  parentCallBack={this.handleFiltering}
                />
              </div>
              <div className="right-body">
                <div class="property-listing">
                  <p className="resultsText">
                    Search result:
                    <p className="queries-count">
                      {this.state.queriesCount} properties
                    </p>
                  </p>
                  <div className="propertyCards">
                    <PropertyListing
                      className="property"
                      image={SampleImage}
                      propertyName="Villa"
                      locationName="Dubai, UAE"
                      propertyPrice={1500230}
                      features={["3 BKH", "Lorem ipsum", "Lorem ipsum"]}
                      body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. "
                      walletImage={SampleWalletImage}
                      walletAddress="0x4001A8651c51a799ED5808ae45da60538b327b96"
                      objectId="7OEIKOHlC761LejpUBTeK4Gv"
                    />
                    <PropertyListing
                      className="property"
                      image={SampleImage}
                      propertyName="Villa"
                      locationName="Dubai, UAE"
                      propertyPrice={1500230}
                      features={["3 BKH", "Lorem ipsum", "Lorem ipsum"]}
                      body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. "
                      walletImage={SampleWalletImage}
                      walletAddress="0x4001A8651c51a799ED5808ae45da60538b327b96"
                      objectId="7OEIKOHlC761LejpUBTeK4Gv"
                    />
                    <PropertyListing
                      className="property"
                      image={SampleImage}
                      propertyName="Villa"
                      locationName="Dubai, UAE"
                      propertyPrice={1500230}
                      features={["3 BKH", "Lorem ipsum", "Lorem ipsum"]}
                      body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. "
                      walletImage={SampleWalletImage}
                      walletAddress="0x4001A8651c51a799ED5808ae45da60538b327b96"
                      objectId="7OEIKOHlC761LejpUBTeK4Gv"
                    />
                  </div>
                </div>

                <div className="page-numbers">{this.constructPagesCount()}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
