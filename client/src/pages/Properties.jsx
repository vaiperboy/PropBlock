import Navbar from "../components/Navbar";
import React, { useEffect } from "react";
import { message, Spin } from "antd";
import PropertyListing from "../components/Properties/PropertyListing";
import SampleWalletImage from "../assets/sample-wallet-image.png";
import SearchAvailability from "../components/Properties/SearchAvailability";
import FilterProperties from "../components/Properties/FilterProperties";
import { Pagination } from "@mui/material";
import "../styling/Properties/Properties.scss";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const console = require("console-browserify");

const App = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalResult, setTotalResult] = useState(0);
  const [totalPagesNumber, setTotalPageNumber] = useState(1);

  const [filterValues, setFilterValues] = useState({
    prices: {
      minPrice: 100,
      maxPrice: 10000000,
    },
    propertyType: "",
    minimumBeds: 0,
    minimumBaths: 0,
    facilities: 0,
    city: "",
  });

  const startingValues = {
    minPrice: 100,
    maxPrice: 10000000,
  };

  //to pass information from child to parent
  const handleFiltering = (_name, value) => {
    console.log("changed " + _name + " to " + JSON.stringify(value));
    var oldState = { ...filterValues };
    oldState[_name] = value;
    setFilterValues(oldState);
  };

  const switchPage = (e, page) => {
    //window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    console.log(page);
    setCurrentPageNumber(page);
  };

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
  };

  const loadProperties = async (city, propertyType, maxPrice) => {
    setIsLoading(true);
    try {
      fetch(
        "http://localhost:9000/getAllProperties?" +
          new URLSearchParams({
            pageNumber: currentPageNumber,
            city: filterValues.city,
            minPrice: filterValues.prices.minPrice,
            maxPrice: filterValues.prices.maxPrice,
            propertyType: filterValues.propertyType,
            facilities: filterValues.facilities,
            minimumBeds: filterValues.minimumBeds,
            minimumBaths: filterValues.minimumBaths,
          })
      )
        .then((res) => res.json())
        .then((res) => {
          setProperties(res.results);
          setTotalPageNumber(res.totalPages);
          setTotalResult(res.count);
        })
        .catch((err) => {
          message.error("error with API");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      message.error("error with setting data from API");
    }
  };

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    var city = queryParams.get("city");
    var maxPrice = queryParams.get("maxPrice");
    var propertyType = queryParams.get("propertyType");
    if (city !== null) {
      filterValues.city = city;
    }
    if (maxPrice !== null) {
      filterValues.prices.maxPrice = maxPrice;
    }
    if (propertyType !== null) {
      filterValues.propertyType = propertyType;
    }

    loadProperties();
  }, []);

  return (
    <div className="properties-page">
      <header className="App-header">
        <Navbar />
      </header>
      <div className="App">
        <div className="upper-body">
          <div className="topSearchSection">
            <SearchAvailability
              parentCallBack={handleFiltering}
              filterValues={filterValues}
            />
          </div>
        </div>
        <div className="body">
          <>{JSON.stringify(filterValues)}</>
          <div className="real-body">
            <div className="left-body">
              <FilterProperties
                minPrice={startingValues.minPrice}
                maxPrice={startingValues.maxPrice}
                parentCallBack={handleFiltering}
                loadPropertiesParent={loadProperties}
                isLoading={isLoading}
              />
            </div>
            <div className="right-body">
              {isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                    width: "70rem",
                    height: "40rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Spin size="large" style={{ margin: "0 2rem 0 0 " }} />{" "}
                  Loading
                </div>
              ) : (
                <>
                  <div class="property-listing">
                    <p className="resultsText">
                      Search result:
                      <p className="queries-count">{totalResult} properties</p>
                    </p>
                    <div className="propertyCards">
                      {properties.map((item) => {
                        return (
                          <PropertyListing
                            className="property"
                            image={item.images[0]}
                            propertyName={item.details.propertyTitle}
                            locationName={item.details.location}
                            propertyPrice={parseInt(item.listedPrice)}
                            features={[
                              item.details.bedsNumber + " BKH",
                              item.details.bathsNumber + " Baths",
                              item.details.occupantsNumber + " Occupants",
                            ]}
                            body={item.details.propertyDescription}
                            walletImage={SampleWalletImage}
                            walletAddress={item.address}
                            objectId={item.objectId}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="page-numbers">{constructPagesCount()}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
