import React from 'react';
import "../../styling/Properties/FilterProperties.scss";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { Checkbox, Input, Button } from "@web3uikit/core";



class FilterProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            oldMin: this.props.minPrice,
            oldMax: this.props.maxPrice
        }
        console.log("constructed");
    }

    render() {
        return (
            <div className="filter-properties">
                <div className="inner-rectangle">
                    <div className="upper-body">
                        Filter By
                    </div>
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
                                    this.props.parentCallBack("prices", { "minPrice": min, "maxPrice": max });
                                    this.setState({ oldMin: min, oldMax: max });
                                }
                            }}
                        />
                        <hr></hr>
                        <p>Property Type</p>
                        <Checkbox
                            label="Villa"
                            name="isVilla"
                            onChange={e => this.props.parentCallBack("isVilla", e.target.checked)}
                            checked="true"
                        />
                        <Checkbox
                            label="Apartment"
                            name="isApartment"
                            onChange={e => this.props.parentCallBack("isApartment", e.target.checked)}
                            checked="true"
                        />
                        <Checkbox
                            label="Townhouse"
                            name="isTownhouse"
                            onChange={e => this.props.parentCallBack("isTownhouse", e.target.checked)}
                            checked="true"
                        />
                        <Checkbox
                            label="Penthouse"
                            name="isPenthouse"
                            onChange={e => this.props.parentCallBack("isPenthouse", e.target.checked)}
                            checked="true"
                        />
                        <Checkbox
                            label="Duplex"
                            name="isDuplex"
                            onChange={e => this.props.parentCallBack("isDuplex", e.target.checked)}
                            checked="true"
                        />
                        <hr></hr>
                        <p>Beds</p>

                        <Input
                            label="minimum beds?"
                            name="bedsNumber"
                            onChange={e => this.props.parentCallBack("minimumBeds", e.target.value)}
                            type="number"
                            min="0"
                        />
                        <hr></hr>
                        <p>Facilities</p>
                        <div className='inline'>
                            <div className="checkbox">
                                <Checkbox
                                    label="Parking"
                                    name="hasParking"
                                    className="checkbox"
                                    onChange={e => this.props.parentCallBack("hasParking", e.target.checked)}
                                    checked="true"
                                />
                            </div>
                            <div className="checkbox">
                                <Checkbox
                                    label="Restaurant"
                                    name="hasRestaurant"
                                    className="checkbox"
                                    onChange={e => this.props.parentCallBack("hasRestaurant", e.target.checked)}
                                    checked="true"
                                />
                            </div>

                        </div>

                        <div className='inline'>
                            <div className="checkbox">
                                <Checkbox
                                    label="Free Wifi"
                                    name="hasWifi"
                                    className="checkbox"
                                    onChange={e => this.props.parentCallBack("hasWifi", e.target.checked)}
                                    checked="true"
                                />
                            </div>
                            <div className="checkbox">
                                <Checkbox
                                    label="Swimming Pool"
                                    name="hasPool"
                                    className="checkbox"
                                    onChange={e => this.props.parentCallBack("hasPool", e.target.checked)}
                                    checked="true"
                                />
                            </div>
                        </div>

                    </div>
                    <button className="filter-button">
                        Filter Properties
                    </button>
                </div>

            </div>

        )
    }
};

export default FilterProperties;
