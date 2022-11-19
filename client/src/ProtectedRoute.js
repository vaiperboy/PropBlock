import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import { useMoralis } from "react-moralis";
import NoMatch from "./pages/NoMatch";

var Web3 = require("web3");
const console = require("console-browserify");

function ProtectedRoute({ component }) {
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

  // useState vars
  const [isNormalUser, setIsNormalUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // checks if the user is not a government User
  const checkUserType = async () => {
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
        setIsNormalUser(true);
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        return;
      }
    } catch (error) {
      return error;
    }
  };

  // run when page is loading
  useEffect(() => {
    checkUserType();
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
    return isAuthenticated && isNormalUser ? { ...component } : <NoMatch />;
  }
}

export default ProtectedRoute;
