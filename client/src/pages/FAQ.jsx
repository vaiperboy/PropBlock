import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styling/FAQ/FAQ.scss";
import { Collapse } from "antd";

const console = require("console-browserify");
const { Panel } = Collapse;

const FAQ = () => {
  const questions = {
    1: "How does proBlock make money?",
    2: "Does propBlock provide any support?",
    3: "What is the property verification process?",
    4: "What is the process of transfering a property?",
    5: "Can I edit my property details after creating a property on propBlock?",
    6: "How can I change my full name or email address?",
    7: "How does propBlock charge its users?",
  };
  const answers = {
    1: "PropBlock mainly provides a lot of services to its users for free including creating an account, creating a property, listing the property, etc. However, propBlock only requires a payment of 1% of the value of a property from the buyer when the seller (user) has agreed to transfer the property to the buyer.",
    2: "PropBlock provides the best support to its users in terms of questions asked on the contact page via email as well as 24x7 techincal support in case there are any issues or queries from the users. ",
    3: "To successfully verify a property, users (sellers) are required to upload their valid title deed documents which are looked at and verified by the government. Once the documents are verified, the property created by the user is set to verified.",
    4: "For transferring a property from the buyer to the seller, the documents first need to be approved by the government, followed by the payment of the buyer for the transfer of the property ( + the 1% of the value of the property for propBlock). ",
    5: "Property details cannot be edited once the property is created since the property details are written into the smart contract and saved forever.",
    6: "To change your full name or email address, login to your profile, click on the avatar and select the dashboard option. Once the dashboard is loaded, click on the profile page and enter your new full name followed by new email addres and click on edit profile.",
    7: "Propblock charges its users only when the property is being transfered from one user (seller) to another (buyer) and the amount charged is 1% of the value of the property in eth.",
  };

  return (
    <>
      <Navbar />
      <div className="FAQ">
        <div className="heading">Frequently Asked Questions</div>
        <Collapse ghost className="questionsSection">
          <Panel header={questions[1]} key="1" className="question">
            <p className="answer">{answers[1]}</p>
          </Panel>
          <Panel header={questions[2]} key="2" className="question">
            <p className="answer">{answers[2]}</p>
          </Panel>
          <Panel header={questions[3]} key="3" className="question">
            <p className="answer">{answers[3]}</p>
          </Panel>
          <Panel header={questions[4]} key="4" className="question">
            <p className="answer">{answers[4]}</p>
          </Panel>
          <Panel header={questions[5]} key="5" className="question">
            <p className="answer">{answers[5]}</p>
          </Panel>
          <Panel header={questions[6]} key="6" className="question">
            <p className="answer">{answers[6]}</p>
          </Panel>
          <Panel header={questions[7]} key="7" className="question">
            <p className="answer">{answers[7]}</p>
          </Panel>
        </Collapse>
        <div className="blob"></div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
