import React from "react";
import stats from "./stats.png";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";

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
      await sleep(2500);
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
          >
            <button className="govt_button" style={{ userSelect: "none" }}>
              Government
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
              this.props.toggleView(true);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_27_10197)">
                <path
                  d="M13.3334 12.5002H7.50004V10.8335H13.3334V12.5002ZM15.8334 9.16683H7.50004V7.50016H15.8334V9.16683ZM15.8334 5.8335H7.50004V4.16683H15.8334V5.8335ZM2.50004 4.16683V17.5002H15.8334V19.1668H2.50004C2.05801 19.1668 1.63409 18.9912 1.32153 18.6787C1.00897 18.3661 0.833374 17.9422 0.833374 17.5002V4.16683H2.50004ZM17.5 0.833496C17.9421 0.833496 18.366 1.00909 18.6786 1.32165C18.9911 1.63421 19.1667 2.05814 19.1667 2.50016V14.1668C19.1667 15.0918 18.425 15.8335 17.5 15.8335H5.83337C5.39135 15.8335 4.96742 15.6579 4.65486 15.3453C4.3423 15.0328 4.16671 14.6089 4.16671 14.1668V2.50016C4.16671 1.57516 4.90837 0.833496 5.83337 0.833496H17.5ZM5.83337 2.50016V14.1668H17.5V2.50016H5.83337Z"
                  fill="#666666"
                  fill-opacity="0.8"
                />
              </g>
              <defs>
                <clipPath id="clip0_27_10197">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Agreements
          </div>
          <div
            className="leftsidebar_item"
            style={{
              color: this.props.menuState.usersView ? "#3DAEEE" : "",
            }}
            onClick={() => {
              this.props.toggleUsersView(true);
            }}
          >
            <UserOutlined />
            Users
          </div>
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
