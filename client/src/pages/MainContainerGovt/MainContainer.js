import React from "react";
import "../../styling/MainContainer/MainContainer.scss";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LeftSidebar from "./LeftSidebar";
import AgreementsList from "./AgreementsList";
import MySettings from "./MySettings";
import AgreementView from "./AgreementView";

class MainContainer extends React.Component {
  state = {
    menuState: {
      uploadMode: true,
      agreementView: false,
      settingView: false,
    },
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

  render() {
    return (
      <div
        className="main_container"
        style={{
          scrollbarColor: "transparent transparent",
          scrollbarWidth: "none",
          userSelect: "text",
        }}
      >
        <Navbar />
        <div style={{ display: "flex" }}>
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
        <Footer />
      </div>
    );
  }
}

export default MainContainer;
