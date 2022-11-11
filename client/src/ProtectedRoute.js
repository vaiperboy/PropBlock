import { useMoralis } from "react-moralis";

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

  //return isAuthenticated ? { ...component } : <NoMatch />;
  return { ...component }
}

export default ProtectedRoute;
