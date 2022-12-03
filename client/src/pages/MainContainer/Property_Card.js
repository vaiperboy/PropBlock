import { useParams, Link, useNavigate } from "react-router-dom";
import location_icon_blue from "../../assets/location-icon-blue.png";
import "../../styling/MainContainer/CreateProperty.scss";
import React from "react";
const console = require("console-browserify");

const Property_Card = (props) => {
  const {
    id,
    label,
    location,
    description,
    price,
    imageLocation,
  } = props.props;

  const commafy = (num) => {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  const shortenText = (text, maxWords) => {
    if (text.length > maxWords) {
      text = text.substring(0, maxWords) + "......";
    }
    return text;
  }

  return (
    <Link className="property" to={`../property/${id}/`}>
      <div className="property-Image">
        <img
          src={imageLocation}
          //   src={require(`../assets/${property.imageLocation}`)}
          alt="real_estate_image"
          className="property-Image"
        />
      </div>
      <div className="propertyLabel">
        <h3>{label}</h3>
        <p>
          {location}
          <img src={location_icon_blue} alt="location_icon_blue" />
        </p>
      </div>
      <div className="propertyDescription">{shortenText(description, 25)}</div>
      <div className="propertyPrice">AED {commafy(price)}</div>
    </Link>
  );
};

export default Property_Card;
