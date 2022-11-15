import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import NoMatch from "./pages/NoMatch";
import { message, Spin } from "antd";
var Web3 = require("web3");
const console = require("console-browserify");

function ProtectedRouteGovernment({ component }) {
  const {
    setUserData,
    authenticate,
    signup,
    isAuthenticated,
    isAuthenticating,
    isUnauthenticated,
    user,
    account,
    logout,
    oralis,
    isInitialized,
    Moralis,
    ...rest
  } = useMoralis();

  const [isGovernmentUser, setIsGovernmentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkGovernmentUser = async () => {
    try {
      const tempAddress = user.get("ethAddress");
      const userAddress = Web3.utils.toChecksumAddress(tempAddress);
      const users = Moralis.Object.extend("GovernmentUsers");
      const query = new Moralis.Query(users);
      query.equalTo("ethAddress", userAddress);
      query.limit(1);
      query.withCount();
      const results = await query.find();
      if (results.count === 0) {
        message.error("Your are not the governement User");
        setIsLoading(false);
        return;
      } else {
        setIsGovernmentUser(true);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      return error;
    }
  };
  useEffect(() => {
    checkGovernmentUser();
    console.log("now");
  }, [user]);

  if (isLoading === true) {
    return (
      <div
        style={{
          width: "100%",
          height: "60rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "500",
            marginLeft: "3rem",
            color: "#3daeee",
          }}
        >
          Loading
        </h1>
      </div>
    );
  } else {
    return isGovernmentUser ? { ...component } : <NoMatch />;
  }
}

export default ProtectedRouteGovernment;
