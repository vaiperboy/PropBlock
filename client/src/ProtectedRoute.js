import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PropertyFunc from "./Functions/PropertyFunc";
import SignUp from "./pages/Signup";
import AgreementFunc from "./Functions/AgreementFunc";
import Properties from "./pages/Properties_2";
import Buy from "./pages/Buy";
import Property from "./pages/Property";
import NoMatch from "./pages/NoMatch";
import Scrollbar from "smooth-scrollbar";
import Aboutus from "./pages/Aboutus";
import MainContainer from "./pages/MainContainer/MainContainer";
import { useMoralis, useMoralisQuery } from "react-moralis";

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
