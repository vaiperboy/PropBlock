import Navbar from "../components/Navbar";
import React, { Component, useEffect } from "react";
import { message, Descriptions, Typography, Spin } from "antd";
import GridLoader from "react-spinners/GridLoader";
import PropertyListing from "../components/Properties/PropertyListing";
import SampleImage from "../assets/sample-property.png";
import SampleWalletImage from "../assets/sample-wallet-image.png";
import SearchAvailability from "../components/Properties/SearchAvailability";
import FilterProperties from "../components/Properties/FilterProperties";
import { Pagination } from "@mui/material";
import "../styling/Properties/Properties.scss";
import Footer from "../components/Footer";
import { useState } from "react";
const console = require("console-browserify");

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([])
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
  const [totalPagesNumber, setTotalPageNumber] = useState(1)

  //to pass information from child to parent
  const handleFiltering = (_name, value) => {
    var oldState = { ...this.state.filteringParameters };
    oldState[_name] = value;
    this.setState({ filteringParameters: oldState });
    console.log(_name + ": " + value);
  }

  const switchPage = (e, page) => {
    //window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    console.log(page);
    setCurrentPageNumber(page)
  }


  //construct the pages count
  const constructPagesCount = () => {
    return (
      <Pagination
        count={totalPagesNumber}
        color="primary"
        size="large"
        onChange={switchPage}
        style={{ zoom: "130%" }}
      />
    );
  }

  const loadProperties = async () => {
    setIsLoading(true)
    fetch(
      "http://localhost:9000/getAllProperties?" +
      new URLSearchParams({
        pageNumber: currentPageNumber
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setProperties(res.results)
        setTotalPageNumber(res.totalPages)
        setTotalResult(res.count)
      })
      .catch(err => {
        message.error("error with API")
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  useEffect(() => {
    loadProperties()
  }, [currentPageNumber])


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
          <div className="real-body">
            <div className="left-body">
              <FilterProperties
                minPrice={100}
                maxPrice={100000}
                parentCallBack={handleFiltering}
              />
            </div>
            <div className="right-body">
              {
                isLoading ? (
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
                  <>
                    <div class="property-listing">
                      <p className="resultsText">
                        Search result:
                        <p className="queries-count">
                          {totalResult} properties
                        </p>
                      </p>
                      <div className="propertyCards">
                        {
                          properties.map((item) => {
                            return (
                              <PropertyListing
                                className="property"
                                image={item.images[0]}
                                propertyName={item.propertyTitle}
                                locationName="some where"
                                propertyPrice={parseInt(item.listedPrice)}
                                features={[ item.bedsNumber + " BKH", item.bathsNumber + " Baths", item.occupantsNumber + " Occupants"]}
                                body={item.propertyDescription}
                                walletImage={SampleWalletImage}
                                walletAddress={item.address}
                                objectId="7OEIKOHlC761LejpUBTeK4Gv"
                              />
                            )
                          })
                        }
                        {/* <PropertyListing
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
                  /> */}

                      </div>
                    </div>

                    <div className="page-numbers">{constructPagesCount()}</div>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default App;
