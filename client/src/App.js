import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  let optionsForScroll = {
    damping: "0.2",
  };
  Scrollbar.init(document.querySelector("body"), optionsForScroll);

  return (
    <Router>
      <Routes>
        {/* <Route path="/About" element={<About />}></Route> */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/buy" element={<Buy />}></Route>
        <Route path="/aboutus" element={<Aboutus />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/PropertyFunctions" element={<PropertyFunc />}></Route>
        <Route path="/AgreementFunctions" element={<AgreementFunc />}></Route>
        <Route path="/properties" element={<Properties />}></Route>
        <Route path="/property/:id" element={<Property />}></Route>
        <Route path="/dashboard" element={<MainContainer />}></Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
}
export default App;
