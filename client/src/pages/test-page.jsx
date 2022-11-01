import Navbar from "../components/Navbar";
import React, { Component, useEffect } from "react";
import { message, Descriptions, Typography } from "antd";
import GridLoader from 'react-spinners/GridLoader';
import "../styling/Properties/Properties.scss";
import PropertyListing from "../components/Properties/PropertyListing";
import SampleImage from "../assets/sample-property.png"
import SampleWalletImage from "../assets/sample-wallet-image.png";
import SearchAvailability from "../components/Properties/SearchAvailability";
import FilterProperties from "../components/Properties/FilterProperties";
import { getTableHeadUtilityClass, Pagination } from "@mui/material";



class App extends Component {

    constructor(props) {
        super(props);
    }



    

    render() {
        return (
            <div>
                <Navbar />
                emptyyty
            </div>

        )
    }

}


export default App;
