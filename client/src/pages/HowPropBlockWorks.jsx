import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styling/HowPropBlockWorks/howPropBlockWorks.scss";

const HowPropBlockWorks = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <div className="leftSide">
            <h1>How Pro</h1>
          </div>
          <div className="rightSide"></div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HowPropBlockWorks;
