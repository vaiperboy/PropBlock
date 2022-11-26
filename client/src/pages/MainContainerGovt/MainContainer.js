import React from "react";
import "../../styling/MainContainer/MainContainer.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LeftSidebar from "./LeftSidebar";
import AgreementsList from "./AgreementsList";
import MySettings from "./MySettings";
import AgreementView from "./AgreementView";
import { Spin, Skeleton, Avatar, List } from "antd";

class MainContainer extends React.Component {
  state = {
    menuState: {
      uploadMode: true,
      agreementView: false,
      settingView: false,
    },
    isLoading: true,
  };

  componentDidMount = () => {};

  componentWillUnmount = () => {};

  toggleView = (val) => {
    this.setState({
      menuState: { uploadMode: val, agreementView: false, settingView: false },
    });
  };

  toggleSettingView = (val) => {
    this.setState({
      menuState: { agreementView: false, uploadMode: false, settingView: val },
    });
  };

  toggleAgreementView = (val) => {
    this.setState({
      menuState: { agreementView: val, uploadMode: false, settingView: false },
    });
  };

  componentDidMount = async () => {
    // Set loading state to true initially
    await new Promise((r) => setTimeout(r, 500));
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
                toggleView={this.toggleView}
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
