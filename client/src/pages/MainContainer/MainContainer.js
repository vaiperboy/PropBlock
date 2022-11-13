import React from "react";
import "../../styling/MainContainer/MainContainer.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LeftSidebar from "./LeftSidebar";
import MyAgreements from "./MyAgreements";
import AgreementsList from "./AgreementsList";
import AgreementView from "./AgreementView";
import PurchaseRequests from "./PurchaseRequests";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics";
import MyProperties from "./MyProperties";
import MyPayments from "./MyPayments";
import MyProfile from "./MyProfile";
import stats from "./stats.png";
import MySettings from "./MySettings";
import { useMoralis } from "react-moralis";
import { Spin, Skeleton, Avatar, List } from "antd";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    menuState: {
      uploadMode: false,
      agreementView: false,
      purchaseRequestView: false,
      dashboardView: true,
      propertiesView: false,
      statsView: false,
      paymentView: false,
      profileView: false,
      settingView: false,
    },
    isLoading: true,
  };

  toggleView = (val) => {
    this.setState({
      menuState: {
        uploadMode: val,
        agreementView: false,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  togglePropertiesView = (val) => {
    this.setState({
      menuState: {
        uploadMode: false,
        agreementView: false,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: val,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  toggleAgreementView = (val) => {
    this.setState({
      menuState: {
        agreementView: val,
        purchaseRequestView: false,
        uploadMode: false,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  togglePurchaseRequestView = (val) => {
    this.setState({
      menuState: {
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: val,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  toggleDashboardView = (val) => {
    this.setState({
      menuState: {
        dashboardView: val,
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  toggleStatsView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: val,
        paymentView: false,
        profileView: false,
        settingView: false,
      },
    });
  };

  togglePaymentView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: val,
        profileView: false,
        settingView: false,
      },
    });
  };

  toggleProfileView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: val,
        settingView: false,
      },
    });
  };

  toggleSettingView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: val,
      },
    });
  };

  componentDidMount = async () => {
    // Set loading state to true initially
    await new Promise((r) => setTimeout(r, 1500));
    this.setState({ isLoading: false });
  };

  render() {
    return this.state.isLoading ? (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          gap: "3rem",
          justifyContent: "center",
          marginTop: "30rem",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
        <h1 style={{ fontSize: "2.5rem", color: "#3daeee" }}>Loading . . . </h1>
      </div>
    ) : (
      <div>
        <Navbar />
        <main>
          <div
            className="main_container"
            style={{
              scrollbarColor: "transparent transparent",
              scrollbarWidth: "none",
              userSelect: "text",
            }}
          >
            <div style={{ display: "flex", marginTop: "5rem" }}>
              <LeftSidebar
                menuState={this.state.menuState}
                toggleSettingView={this.toggleSettingView}
                toggleProfileView={this.toggleProfileView}
                togglePaymentView={this.togglePaymentView}
                toggleStatsView={this.toggleStatsView}
                togglePropertiesView={this.togglePropertiesView}
                toggleDashboardView={this.toggleDashboardView}
                purchaseRequestView={this.state.purchaseRequestView}
                toggleView={this.toggleView}
                toggleAgreementView={this.toggleAgreementView}
                togglePurchaseRequestView={this.togglePurchaseRequestView}
              />
              {this.state.menuState.dashboardView ? (
                <Dashboard
                  menuState={this.state.menuState}
                  toggleSettingView={this.toggleSettingView}
                  toggleProfileView={this.toggleProfileView}
                  togglePaymentView={this.togglePaymentView}
                  toggleStatsView={this.toggleStatsView}
                  togglePropertiesView={this.togglePropertiesView}
                  toggleDashboardView={this.toggleDashboardView}
                  purchaseRequestView={this.state.purchaseRequestView}
                  toggleView={this.toggleView}
                  toggleAgreementView={this.toggleAgreementView}
                  togglePurchaseRequestView={this.togglePurchaseRequestView}
                />
              ) : null}
              {this.state.menuState.uploadMode ? (
                <MyAgreements />
              ) : this.state.menuState.agreementView === 1 &&
                !this.state.menuState.purchaseRequestView &&
                !this.state.menuState.dashboardView ? (
                <AgreementsList
                  toggleView={this.toggleView}
                  toggleAgreementView={this.toggleAgreementView}
                />
              ) : null}
              {this.state.menuState.agreementView === 2 ? (
                <AgreementView />
              ) : null}
              {this.state.menuState.purchaseRequestView ? (
                <PurchaseRequests />
              ) : null}
              {this.state.menuState.propertiesView ? <MyProperties /> : null}
              {this.state.menuState.statsView ? <Statistics /> : null}
              {this.state.menuState.paymentView ? <MyPayments /> : null}
              {this.state.menuState.profileView ? <MyProfile /> : null}
              {this.state.menuState.settingView ? <MySettings /> : null}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
