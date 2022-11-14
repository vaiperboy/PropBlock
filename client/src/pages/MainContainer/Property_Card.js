import { useParams, Link, useNavigate } from "react-router-dom";
import location_icon_blue from "../../assets/location-icon-blue.png";
import real_Estate_Image from "../../assets/realEstate_3-min.png";
import "../../styling/MainContainer/CreateProperty.scss";
import React from "react";
const console = require("console-browserify");

const Property_Card = (props) => {
  const {
    id,
    ownerAddress,
    label,
    city,
    country,
    description,
    price,
    imageLocation,
  } = props.props;

  return (
    <Link className="property" to={`../property/${ownerAddress}/`}>
      <div className="property-Image">
        <img
          src={real_Estate_Image}
          //   src={require(`../assets/${property.imageLocation}`)}
          alt="real_estate_image"
          className="property-Image"
        />
      </div>
      <div className="propertyLabel">
        <h3 id={id}>{label}</h3>
        <p>
          {city}, {country}
          <img src={location_icon_blue} alt="location_icon_blue" />
        </p>
      </div>
      <div className="propertyDescription">{description}</div>
      <div className="propertyPrice">${price}</div>
    </Link>
  );
};

export default Property_Card;
