import "../styling/Home/Home.css";
import Navbar from "../components/Navbar";
import React, { Component } from "react";
import { message, Descriptions, Typography } from "antd";
import GridLoader from "react-spinners/GridLoader";
import "../styling/Properties/Properties.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      isLoading: true,
    };
  }

  callAPI() {
    fetch("http://localhost:9000/getProperties")
      .then((res) => res.json())
      .then((res) => this.setState({ properties: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callAPI();
    this.state.isLoading = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div className="hero-section">
            <div className="container">
              <div className="loader-container">
                <GridLoader color="#36d7b7" size="20px" speedMultiplier="1.7" />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <div className="hero-section">
            {this.state.properties.map((property, key) => {
              return (
                <Descriptions title="Property" bordered>
                  <Descriptions.Item label="Property Id." span={4}>
                    {property.counter}
                  </Descriptions.Item>
                  <Descriptions.Item label="Address" span={4}>
                    {property.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Appartment Number" span={4}>
                    {property.apartmentNum}
                  </Descriptions.Item>
                  <Descriptions.Item label="Area (sqft)" span={2}>
                    {property.area}
                  </Descriptions.Item>
                  <Descriptions.Item label="Listed Price (AED)">
                    {property.listedPrice}
                  </Descriptions.Item>
                  <Descriptions.Item label="Owner's Address" span={3}>
                    {property.landlordAddress}
                  </Descriptions.Item>
                  <Descriptions.Item label="Image link" span={3}>
                    {property.images.map((img) => (
                      <img
                        src={img}
                        style={{
                          height: "100px",
                          width: "100px",
                        }}
                      />
                    ))}
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default App;
