import React from "react";
import stats from "../../assets/stats_icon.svg";
import { useMoralis } from "react-moralis";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import dashboard_icon from "../../assets/dashboard_iconx2.png";
import stats_icon from "../../assets/statistics_icon.png";
import properties_icon from "../../assets/properties_icon.png";
import purchase_icon from "../../assets/purchase_icon.png";
import agreements_icon from "../../assets/agreements_icon.png";
import payments_icon from "../../assets/payments_icon.png";
import profile_icon from "../../assets/profile_icon.png";
import settings_icon from "../../assets/settings_icon.png";

const Disconnect = () => {
  const {
    Moralis,
    authenticated,
    auth,
    authenticate,
    isAuthenticated,
    isAuthenticating,
    isUnauthenticated,
    user,
    account,
    isloggedOut,
    login,
    logout,
    oralis,
    isInitialized,
    ...rest
  } = useMoralis();

  let sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
  let navigate = useNavigate();

  const disconnectWallet = async () => {
    try {
      await logout();
      message.success("Logged out... re-directing");
      navigate("/");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  return (
    <button className="disconnectWalletButton" onClick={disconnectWallet}>
      <span className="text">Logout</span>
    </button>
  );
};

class LeftSidebar extends React.Component {
  componentDidMount = () => {};

  componentWillUnmount = () => {};

  switchToBuyer = () => {
    this.props.setBuyer(true);
  };

  switchToSeller = () => {
    this.props.setBuyer(false);
  };

  render() {
    return (
      <div className="leftsidebar_container">
        <div style={{ width: "100%", display: "flex" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
            className="buttonsContainer"
          >
            <button
              className={
                this.props.isBuyer
                  ? "leftsidebar_button"
                  : "leftsidebar_button_outlined"
              }
              style={{ userSelect: "none" }}
              onClick={this.switchToBuyer}
            >
              Buyer
            </button>
            <button
              className={
                this.props.isBuyer
                  ? "leftsidebar_button_outlined"
                  : "leftsidebar_button"
              }
              style={{ userSelect: "none" }}
              onClick={this.switchToSeller}
            >
              Seller
            </button>
          </div>
        </div>
        <div
          className="leftsidebar_content"
          style={{
            width: "100%",
            display: "flex",
            border: "",
            height: "75rem",
            position: "relative",
          }}
        >
          {this.props.isBuyer ? (
            <>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.toggleDashboardView(true);
                }}
              >
                <img
                  src={dashboard_icon}
                  alt="Dashboard Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.dashboardView ? "#3DAEEE" : "",
                  }}
                >
                  Dashboard
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.togglePropertiesView(true);
                }}
              >
                <img
                  src={properties_icon}
                  alt="Properties Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.propertiesView ? "#3DAEEE" : "",
                  }}
                >
                  My Properties
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.togglePurchaseRequestView(true);
                }}
              >
                <img
                  src={purchase_icon}
                  alt="Purchase Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.purchaseRequestView
                      ? "#3DAEEE"
                      : "",
                  }}
                >
                  Purchase for buyer
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.toggleView(false);
                  this.props.toggleAgreementListView(1);
                }}
              >
                <img
                  src={agreements_icon}
                  alt="Agreements Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.agreementListView
                      ? "#3DAEEE"
                      : "",
                  }}
                >
                  Agreements
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.toggleStatsView(true);
                }}
              >
                <img src={stats_icon} alt="Stats Icon" className="icon" />
                <h2
                  style={{
                    color: this.props.menuState.statsView ? "#3DAEEE" : "",
                  }}
                >
                  Statistics
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.togglePaymentView(true);
                }}
              >
                <img
                  src={payments_icon}
                  alt="Payments icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.paymentView ? "#3DAEEE" : "",
                  }}
                >
                  Payments
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                onClick={() => {
                  this.props.toggleProfileView(true);
                }}
              >
                <img
                  src={profile_icon}
                  alt="Profile Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.profileView ? "#3DAEEE" : "",
                  }}
                >
                  Profile
                </h2>
              </div>
            </>
          ) : (
            <>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.dashboardView ? "#3DAEEE" : "",
                }}
                onClick={() => {
                  this.props.toggleDashboardView(true);
                }}
              >
                <img
                  src={dashboard_icon}
                  alt="Dashboard Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.dashboardView ? "#3DAEEE" : "",
                  }}
                >
                  Dashboard
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.propertiesView ? "#3DAEEE" : "",
                }}
                onClick={() => {
                  this.props.togglePropertiesView(true);
                }}
              >
                <img
                  src={properties_icon}
                  alt="Properties Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.propertiesView ? "#3DAEEE" : "",
                  }}
                >
                  My Properties
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.purchaseRequestView
                    ? "#3DAEEE"
                    : "",
                }}
                onClick={() => {
                  this.props.togglePurchaseRequestView(true);
                }}
              >
                <img
                  src={purchase_icon}
                  alt="Purchase Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.purchaseRequestView
                      ? "#3DAEEE"
                      : "",
                  }}
                >
                  Purchase Requests
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color:
                    this.props.menuState.agreementView ||
                    this.props.menuState.uploadMode
                      ? "#3DAEEE"
                      : "",
                }}
                onClick={() => {
                  this.props.toggleView(false);
                  this.props.toggleAgreementListView(1);
                }}
              >
                <img
                  src={agreements_icon}
                  alt="Agreements Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.agreementListView
                      ? "#3DAEEE"
                      : "",
                  }}
                >
                  My Agreements
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.statsView ? "#3DAEEE" : "",
                }}
                onClick={() => {
                  this.props.toggleStatsView(true);
                }}
              >
                <img src={stats_icon} alt="Stats Icon" className="icon" />
                <h2
                  style={{
                    color: this.props.menuState.statsView ? "#3DAEEE" : "",
                  }}
                >
                  Statistics
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.paymentView ? "#3DAEEE" : "",
                }}
                onClick={() => {
                  this.props.togglePaymentView(true);
                }}
              >
                <img
                  src={payments_icon}
                  alt="Payments icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.paymentView ? "#3DAEEE" : "",
                  }}
                >
                  Payments
                </h2>
              </div>
              <div
                className="leftsidebar_item"
                style={{
                  color: this.props.menuState.profileView ? "#3DAEEE" : "",
                }}
                onClick={() => {
                  this.props.toggleProfileView(true);
                }}
              >
                <img
                  src={profile_icon}
                  alt="Profile Icon"
                  className="icon"
                ></img>
                <h2
                  style={{
                    color: this.props.menuState.profileView ? "#3DAEEE" : "",
                  }}
                >
                  Profile
                </h2>
              </div>
            </>
          )}
          <div
            className="leftsidebar_item disconnect_item"
            style={{ color: "red", position: "absolute", bottom: 0 }}
          >
            <Disconnect />
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSidebar;
