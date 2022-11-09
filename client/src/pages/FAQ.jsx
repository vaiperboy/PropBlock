import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styling/FAQ/FAQ.scss";
import { Collapse } from "antd";

const console = require("console-browserify");
const { Panel } = Collapse;

const FAQ = () => {
  const question1 = `How does proBlock make money?`;
  const question2 = `Does propBlock provide any support?`;
  const question3 = `What is the property verification process?`;
  const question4 = `What is the process of transfering a property?`;
  const question5 = `Can I edit my property details after creating a property on propBlock?`;
  const question6 = `What is the difference between the Free and Paid versions?`;
  const answer1 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  const answer2 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  const answer3 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  const answer4 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  const answer5 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  const answer6 = `Free version contains a limited amount of pre-designed blocks in
    comparison to the Pro version with more than 100 blocks. Also,
    Free version email exports can’t be used for commercial purposes
    either for your own business or your clients. You can read more
    about this on a License Page.`;
  return (
    <>
      <Navbar />
      <div className="FAQ">
        <div className="heading">Frequently Asked Questions</div>
        <Collapse ghost className="questionsSection">
          <Panel header={question1} key="1" className="question">
            <p className="answer">{answer1}</p>
          </Panel>
          <Panel header={question2} key="2" className="question">
            <p className="answer">{answer2}</p>
          </Panel>
          <Panel header={question3} key="3" className="question">
            <p className="answer">{answer3}</p>
          </Panel>
          <Panel header={question4} key="4" className="question">
            <p className="answer">{answer4}</p>
          </Panel>
          <Panel header={question5} key="5" className="question">
            <p className="answer">{answer5}</p>
          </Panel>
          <Panel header={question6} key="6" className="question">
            <p className="answer">{answer6}</p>
          </Panel>
        </Collapse>
        <div className="blob"></div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
