import React from "react";
import { Link } from "react-router-dom";
import { Button, Tag } from "@web3uikit/core";
import { useMoralis } from "react-moralis";
import "../../styling/Properties/PropertyListing.scss";
import LocationPoint from "../../assets/location-point.svg";
import HeartNotFilled from "../../assets/heart-not-filled.svg";

class PropertyListing extends React.Component {
  constructor(props) {
    super(props);
  }

  commafy(num) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  shortenText(text, maxWords) {
    if (maxWords < text.length) {
      text = text.substring(0, maxWords) + "......";
    }
    return text;
  }

  
  toFeatures(value, maxCounter) {
    return value.slice(0, 3).map((val, idx) => {
      return (
        <>
          <p style={{ float: "left" }}>{val}</p>
          {idx + 1 < value.length ? (
            <div style={{ float: "left" }} className="dot"></div>
          ) : null}
        </>
      );
    });
  }

  

  shortenAddress(text, maxWords) {
    if (maxWords < text.length && maxWords >= 18) {
      text = text.substring(0, 12) + " ... " + text.substring(text.length - 3);
    }
    return text;
  }

  render() {
    //   const [modal2Open, setModal2Open] = useState(false);
    return (
      <div className="property-listing">
        <div className="rectangle">
          <div className="property">
            <img id="property-image" src={this.props.image} alt="Real estate" />
            <div className="right-child">
              <p id="propertyName">{this.props.propertyName}</p>
              <div className="inline">
                <img
                  style={{ float: "left" }}
                  src={LocationPoint}
                  alt="Location icon"
                />
                <p id="locationName">{this.props.locationName}</p>
                <a href="#" className="link">
                  Show on map
                </a>
                <p id="propertyPrice">
                  ${this.commafy(this.props.propertyPrice)}
                </p>
              </div>

              <div className="property-inline">
                <hr className="property-line-break"></hr>
                <div className="property-upper-body">
                  <p>Details</p>
                  <div className="features">
                    {this.toFeatures(this.props.features, 3)}
                  </div>

                  <br></br>
                  <div className="content">
                    {this.shortenText(this.props.body, 50)}
                  </div>
                </div>
                <div className="lower-body">
                  <div className="address-box">
                    <img id="walletImage" src={this.props.walletImage} />
                    <p id="walletAddress">
                      ({this.shortenAddress(this.props.walletAddress, 20)})
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link to={"/property/" + this.props.objectId} className="link">
              <button className="property-button">View Property</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyListing;
