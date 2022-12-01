import React from "react";
import "../../styling/MainContainer/MainContainer.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LeftSidebar from "./LeftSidebar";
import AgreementsList from "./AgreementsList";
import MySettings from "./MySettings";
import AgreementView from "./AgreementView";
import { Spin, Skeleton, Avatar, List } from "antd";
import Users from "./Users";
import UserProfile from "./UserProfile";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setUserAddress = this.setUserAddress.bind(this);
    this.setUserEmailAddress = this.setUserEmailAddress.bind(this);
    this.setUserFullName = this.setUserFullName.bind(this);
  }
  state = {
    menuState: {
      uploadMode: true,
      agreementView: false,
      settingView: false,
      usersView: false,
      usersProfileView: false,
    },
    isLoading: true,
    userAddress: "",
    userFullName: "",
    userEmailAddress: "",
  };

  // changing to the user eth address
  setUserAddress = (val) => {
    this.setState({ userAddress: val });
  };

  // changing to the user email address
  setUserEmailAddress = (val) => {
    this.setState({ userEmailAddress: val });
  };

  // changing to the user email address
  setUserFullName = (val) => {
    this.setState({ userFullName: val });
  };

  componentDidMount = async () => {
    // Set loading state to true initially
    await new Promise((r) => setTimeout(r, 500));
    this.setState({ isLoading: false });
  };
  componentWillUnmount = () => {};

  toggleView = (val) => {
    this.setState({
      menuState: {
        uploadMode: val,
        agreementView: false,
        settingView: false,
        usersView: false,
        usersProfileView: false,
      },
    });
  };

  toggleSettingView = (val) => {
    this.setState({
      menuState: {
        agreementView: false,
        uploadMode: false,
        settingView: val,
        usersView: false,
        usersProfileView: false,
      },
    });
  };

  toggleAgreementView = (val) => {
    this.setState({
      menuState: {
        agreementView: val,
        uploadMode: false,
        settingView: false,
        usersView: false,
        usersProfileView: false,
      },
    });
  };

  toggleUsersView = (val) => {
    this.setState({
      menuState: {
        agreementView: false,
        uploadMode: false,
        settingView: false,
        usersView: val,
        usersProfileView: false,
      },
    });
  };

  toggleUserProfileView = (val) => {
    this.setState({
      menuState: {
        agreementView: false,
        uploadMode: false,
        settingView: false,
        usersView: false,
        usersProfileView: val,
      },
    });
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
                toggleView={this.toggleView}
                toggleUsersView={this.toggleUsersView}
                toggleAgreementView={this.toggleAgreementView}
              />
              {this.state.menuState.uploadMode ? (
                <AgreementsList
                  toggleView={this.toggleView}
                  toggleAgreementView={this.toggleAgreementView}
                />
              ) : null}
              {this.state.menuState.agreementView ? (
                <AgreementView toggleAgreementView={this.toggleAgreementView} />
              ) : null}
              {this.state.menuState.usersView ? (
                <Users
                  toggleAgreementView={this.toggleUsersView}
                  toggleUserProfileView={this.toggleUserProfileView}
                  setUserAddress={this.setUserAddress}
                  setUserEmailAddress={this.setUserEmailAddress}
                  setUserFullName={this.setUserFullName}
                />
              ) : null}
              {this.state.menuState.usersProfileView ? (
                <UserProfile
                  toggleUserProfileView={this.toggleUserProfileView}
                  userAddress={this.state.userAddress}
                  userEmailAddress={this.state.userEmailAddress}
                  userFullName={this.state.userFullName}
                />
              ) : null}
              {this.state.menuState.settingView ? (
                <MySettings toggleSettingView={this.toggleSettingView} />
              ) : null}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
