import { useMoralis } from "react-moralis";
import NoMatch from "./pages/NoMatch";

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

  return isAuthenticated ? { ...component } : <NoMatch />;
}

export default ProtectedRoute;
