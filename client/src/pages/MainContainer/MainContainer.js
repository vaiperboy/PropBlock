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
import { useMoralis } from "react-moralis";
import { Spin, Skeleton, Avatar, List } from "antd";
import AgreementPayment from "./AgreementPayment";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setToBuyer = this.setToBuyer.bind(this);
    this.setToOwnerAddress = this.setToOwnerAddress.bind(this);
    this.setToAgreementId = this.setToAgreementId.bind(this);
  }

  state = {
    menuState: {
      uploadMode: false,
      agreementView: false,
      agreementListView: false,
      purchaseRequestView: false,
      dashboardView: true,
      propertiesView: false,
      statsView: false,
      paymentView: false,
      profileView: false,
      settingView: false,
      agreementPayment: false,
    },
    // isLoading: false,
    isBuyer: true,
    ownerAddress: "",
    agreementId: "",
  };
 

  //reset dashboard view
  // componentDidUpdate(prevProps, prevState, snapshopt) {
  //   if (prevState.isBuyer !== this.state.isBuyer)  {
  //       this.toggleDashboardView(true)
  //     }
  // }

  setToBuyer = (val) => {
    this.setState({ isBuyer: val });
  };

  setToOwnerAddress = (val) => {
    this.setState({ ownerAddress: val });
  };

  setToAgreementId = (val) => {
    this.setState({ agreementId: val });
  };

  toggleView = (val) => {
    this.setState({
      menuState: {
        uploadMode: val,
        agreementView: false,
        agreementListView: false,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleAgreementListView = (val) => {
    this.setState({
      menuState: {
        uploadMode: false,
        agreementView: false,
        agreementListView: val,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  togglePropertiesView = (val) => {
    this.setState({
      menuState: {
        uploadMode: false,
        agreementView: false,
        agreementListView: false,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: val,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleAgreementView = (val) => {
    this.setState({
      menuState: {
        uploadMode: false,
        agreementView: val,
        agreementListView: false,
        purchaseRequestView: false,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  togglePurchaseRequestView = (val) => {
    this.setState({
      menuState: {
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: val,
        dashboardView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleDashboardView = (val) => {
    this.setState({
      menuState: {
        dashboardView: val,
        agreementView: false,
        agreementListView: false,
        uploadMode: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleStatsView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: val,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  togglePaymentView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: val,
        profileView: false,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleProfileView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: val,
        settingView: false,
        agreementPayment: false,
      },
    });
  };

  toggleSettingView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: val,
        agreementPayment: false,
      },
    });
  };

  toggleAgreementPaymentView = (val) => {
    this.setState({
      menuState: {
        dashboardView: false,
        agreementView: false,
        uploadMode: false,
        agreementListView: false,
        purchaseRequestView: false,
        propertiesView: false,
        statsView: false,
        paymentView: false,
        profileView: false,
        settingView: false,
        agreementPayment: val,
      },
    });
  };

  componentDidMount = async () => {
    // Set loading state to true initially
    // await new Promise((r) => setTimeout(r, 500));
    // this.setState({ isLoading: false });
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
            <div
              style={{ display: "flex", marginTop: "5rem" }}
              className="main_container_inner"
            >
              <LeftSidebar
                setBuyer={this.setToBuyer}
                isBuyer={this.state.isBuyer}
                menuState={this.state.menuState}
                toggleSettingView={this.toggleSettingView}
                toggleProfileView={this.toggleProfileView}
                togglePaymentView={this.togglePaymentView}
                toggleStatsView={this.toggleStatsView}
                togglePropertiesView={this.togglePropertiesView}
                toggleDashboardView={this.toggleDashboardView}
                purchaseRequestView={this.state.purchaseRequestView}
                toggleView={this.toggleView}
                toggleAgreementListView={this.toggleAgreementListView}
                togglePurchaseRequestView={this.togglePurchaseRequestView}
              />
              {this.state.menuState.dashboardView ? (
                <Dashboard
                  menuState={this.state.menuState}
                  toggleSettingView={this.toggleSettingView}
                  toggleProfileView={this.toggleProfileView}
                  togglePaymentView={this.togglePaymentView}
                  toggleAgreementListView={this.toggleAgreementListView}
                  toggleStatsView={this.toggleStatsView}
                  togglePropertiesView={this.togglePropertiesView}
                  toggleDashboardView={this.toggleDashboardView}
                  purchaseRequestView={this.state.purchaseRequestView}
                  toggleView={this.toggleView}
                  togglePurchaseRequestView={this.togglePurchaseRequestView}
                />
              ) : null}
              {this.state.menuState.agreementListView ? (
                <AgreementsList
                  isBuyer={this.state.isBuyer.toString()}
                  toggleAgreementView={this.toggleAgreementView}
                  toggleAgreementPaymentView={this.toggleAgreementPaymentView}
                  setOwnerAddress={this.setToOwnerAddress}
                  setAgreementId={this.setToAgreementId}
                />
              ) : null}
              {this.state.menuState.agreementView ? (
                <AgreementView
                  ownerAddress={this.state.ownerAddress}
                  agreementId={this.state.agreementId}
                />
              ) : null}

              {this.state.menuState.agreementPayment ? (
                <AgreementPayment
                  toggleAgreementListView={this.toggleAgreementListView}
                  ownerAddress={this.state.ownerAddress}
                  agreementId={this.state.agreementId}
                />
              ) : null}
              {this.state.menuState.agreement}
              {this.state.menuState.purchaseRequestView ? (
                <PurchaseRequests isBuyer={this.state.isBuyer.toString()} />
              ) : null}
              {this.state.menuState.propertiesView ? <MyProperties /> : null}
              {this.state.menuState.statsView ? <Statistics /> : null}
              {this.state.menuState.paymentView ? <MyPayments /> : null}
              {this.state.menuState.profileView ? <MyProfile /> : null}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
