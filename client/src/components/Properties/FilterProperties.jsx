import React from "react";
import "../../styling/Properties/FilterProperties.scss";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { Checkbox, Input, Button } from "@web3uikit/core";
import { Radio, Select } from "antd";
const console = require("console-browserify");
const { Option } = Select;

class FilterProperties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldMin: this.props.minPrice,
      oldMax: this.props.maxPrice,
      facilitiesOptions: [
        { value: 1, label: "Free Parking" },
        { value: 2, label: "Kitchen" },
        { value: 4, label: "Security" },
        { value: 8, label: "Free WiFi" },
        { value: 16, label: "Coffee Maker" },
        { value: 64, label: "Restaurant" },
        { value: 128, label: "24 hour access" },
        { value: 256, label: "TV Access" },
      ],
      facilitiesXor: 0,
    };
    this.handleFacilities = this.handleFacilities.bind(this);
  }

  //only made it for lowest number (least option)
  handleFacilities(arr) {
    /*let tmp = 1;
    for (const e of arr) {
      tmp = tmp | e;
    }
    this.setState({facilitiesXor: tmp});
    console.log(this.state.facilitiesXor);*/
    if (arr.length > 0) {
      var lowest = arr[0];
      for (var i = 1; i < arr.length; i++) {
        if (arr[i] < lowest) lowest = arr[i];
      }
      this.setState({ facilitiesXor: lowest });
    } else this.setState({ facilitiesXor: 0 });
  }

  render() {
    return (
      <div className="filter-properties">
        <div className="inner-rectangle">
          <div className="upper-body">Filters</div>
          <div className="filter-body">
            <p>Price</p>
            <MultiRangeSlider
              className="slider"
              min={this.props.minPrice}
              max={this.props.maxPrice}
              onChange={({ min, max }) => {
                //because this object calls onchange
                //when it is contructed, i placed
                //a check to prevent that
                if (min != this.state.oldMin || max != this.state.oldMax) {
                  this.props.parentCallBack("prices", {
                    minPrice: min,
                    maxPrice: max,
                  });
                  this.setState({ oldMin: min, oldMax: max });
                }
              }}
            />
            <hr></hr>
            <p>Property Type</p>
            <div className="inputDiv">
              <Select
                placeholder="Apartment "
                style={{
                  width: "100%",
                }}
                //onChange={handleChange}
              >
                <Option value="Apartment">Apartment</Option>
                <Option value="Villa">Villa</Option>
                <Option value="Townhouse">Townhouse</Option>
                <Option value="Penthouse">Penthouse</Option>
                <Option value="Duplex">Duplex</Option>
              </Select>
            </div>
            <hr></hr>
            <p>Beds</p>

            <Input
              label="minimum beds?"
              name="bedsNumber"
              onChange={(e) =>
                this.props.parentCallBack("minimumBeds", e.target.value)
              }
              type="number"
              min="0"
            />
            <hr></hr>
            <p>Facilities</p>
            <Select
              mode="tags"
              size={"medium"}
              placeholder="Please select"
              onChange={this.handleFacilities}
              style={{ width: "100%", margin: "0 0 2rem 0" }}
              options={this.state.facilitiesOptions}
            />
          </div>
          <button className="filter-button">Filter Properties</button>
        </div>
      </div>
    );
  }
}

export default FilterProperties;
