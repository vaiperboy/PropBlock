import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styling/HowPropBlockWorks/howPropBlockWorks.scss";
import { Stepper } from "@web3uikit/core";
import { Steps } from "antd";
// images
import alchemy_logo from "../assets/Alchemy_logo.svg";
import moralis_logo from "../assets/Moralis_logo.png";
import ethersjs_logo from "../assets/Ethersjs_logo.png";
import hardhat_logo from "../assets/Hardhat_logo.png";
import ethereum_logo from "../assets/Ethereum_logo.png";
import IPFS_logo from "../assets/IPFS_logo.png";
import blockchain_icon from "../assets/blockchain_icon.png";
import blockchain_svg from "../assets/about_prop.png";
import ethereum_icon from "../assets/Ethereum_icon.png";
import ethereum_svg from "../assets/ethereum_svg.png";
import smart_contract_icon from "../assets/smart_contract_icon.png";
import smart_contract_svg from "../assets/smart_contract_svg.png";
import bent_lines from "../assets/bent_lines.png";
import lines_svg from "../assets/lines_svg.svg";
// import lines_svg from "../assets/lines.svg";

// screenshots
import landing_page from "../assets/screenshots/landing_page.png";
import signup_page from "../assets/screenshots/signup_page.png";
import login_page from "../assets/screenshots/login_page.png";
import search_page from "../assets/screenshots/search_page.png";
import dashboad_page from "../assets/screenshots/dashboard_page.png";
import myproperties_page from "../assets/screenshots/myproperties_page.png";
import purchase_buyer_page from "../assets/screenshots/purchase_buyer_page.png";
import purchase_seller_page from "../assets/screenshots/purchase_seller_page.png";
import agreement_buyer_page from "../assets/screenshots/agreements_buyer_page.png";
import agreement_seller_page from "../assets/screenshots/agreements_seller_page.png";
import upload_docs_page from "../assets/screenshots/upload_docs_seller_page.png";
import stats_page from "../assets/screenshots/stats_page.png";
import payments_page from "../assets/screenshots/payments_page.png";
import profile_page from "../assets/screenshots/profile_page.png";
import create_property_page from "../assets/screenshots/create_property_page.png";

const { Step } = Steps;
const HowPropBlockWorks = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="HowToContainer">
          <div className="heroSection">
            <div className="text">
              <h1>Find your next home, effortlessly with PropBlock</h1>
              <h3>How it works</h3>
            </div>
            <div className="leftLogos">
              <img src={alchemy_logo} alt="Alchemy logo" id="Alchemy_logo" />
              <img src={moralis_logo} alt="Moralis logo" id="moralis_logo" />
              <img src={ethersjs_logo} alt="Ethersjs logo" id="ethersjs_logo" />
            </div>
            <div className="rightLogos">
              <img src={hardhat_logo} alt="Hardhat logo" id="hardhat_logo" />
              <img src={IPFS_logo} alt="IPFS logo" id="ipfs_logo" />
              <img src={ethereum_logo} alt="Ethereum logo" id="ethereum_logo" />
            </div>
          </div>
          <div className="techBehindPropBlock">
            <img
              src={lines_svg}
              alt="Lines"
              style={{
                width: "126.2rem",
                // height:"",
                // height: "20rem",
                position: "absolute",
                zIndex: "-1",
                margin: "0 10rem 0 10rem",
              }}
            />
            <h1 className="techHeading">Tech behind PropBlock</h1>
            <div className="blockchainSection">
              <div className="leftSide">
                <div className="icon">
                  <img src={blockchain_icon} alt="Blockchain Icon" />
                </div>
                <h1>Blockchain</h1>
                <p>
                  A distributed, immutable ledger that facilitates the process
                  of recording transactions and tracking assets in a business
                  network. A distributed, immutable ledger that facilitates the
                  process of recording transactions and tracking assets in a
                  business network.
                </p>
              </div>
              <div className="rightSide">
                <img src={blockchain_svg} alt="Blockchain SVG" />
              </div>
            </div>
            <div className="EthereumSection">
              <div className="leftSide">
                <img src={ethereum_svg} alt="Ethereum SVG" />
              </div>
              <div className="rightSide">
                <div className="icon">
                  <img src={ethereum_icon} alt="Ethereum Icon" />
                </div>
                <h1>Ethereum</h1>
                <p>
                  Ethereum is an open source, distributed software platform that
                  is based on blockchain technology. Ether is the native
                  cryptocurrency of Ethereum. Ethereum is an open source,
                  distributed software platform that is based on blockchain
                  technology. Ether is the native cryptocurrency of Ethereum.
                </p>
              </div>
            </div>
            <div className="SmartContractSection">
              <div className="leftSide">
                <div className="icon">
                  <img src={smart_contract_icon} alt="Smart Contract Icon" />
                </div>
                <h1>Smart Contract</h1>
                <p>
                  Programs stored on a blockchain that run when predetermined
                  conditions are met. Programs stored on a blockchain that run
                  when predetermined conditions are met. Programs stored on a
                  blockchain that run when predetermined conditions are met.
                </p>
              </div>
              <div className="rightSide">
                <img src={smart_contract_svg} alt="Smart Contract SVG" />
              </div>
            </div>
          </div>
          <div className="userManual">
            <div className="headingSection">
              <div className="text">
                <h1>User Manual</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Pariatur fugiat enim aspernatur laborum culpa tempora
                  similique. Magnam porro eum consequuntur officiis accusantium.
                  Cumque, aliquam enim. Nam aliquid iusto vero voluptas velit.
                </p>
              </div>
              <div className="styleContainer">
                <img src={bent_lines} alt="Lines Bend" />
              </div>
            </div>
            <div className="userGuide">
              {/* Landing Page  */}
              <h1 className="heading">PropBlock Pages</h1>
              <div className="landingPageSection">
                <div className="leftSide">
                  <h1>Landing Page</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Corrupti omnis, laudantium debitis repudiandae ex numquam
                    atque excepturi iusto animi, aliquam placeat ipsam sapiente,
                    at quo quae fugit sequi a? Earum.
                  </p>
                </div>
                <div className="rightSide">
                  <img src={landing_page} alt="Screenshot of home page" />
                </div>
              </div>
              {/* Search Properties Page  */}
              <div className="landingPageSectionFlipped">
                <div className="leftSide">
                  <img
                    src={search_page}
                    alt="Screenshot of MyProperties page"
                  />
                </div>
                <div className="rightSide">
                  <h1>Search Properties</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Corrupti omnis, laudantium debitis repudiandae ex numquam
                    atque excepturi iusto animi, aliquam placeat ipsam sapiente,
                    at quo quae fugit sequi a? Earum.
                  </p>
                </div>
              </div>
              {/* Sign Up Process  */}
              <div className="signupPageSection">
                <div className="leftSide">
                  <h1>Sign Up Process</h1>
                  <p>
                    Once on the sign up page (clicking on 'Get Started' Button),
                    the user can follow the below steps to sign up:
                    <Steps
                      progressDot
                      current={6}
                      direction="vertical"
                      style={{ marginTop: "2rem" }}
                    >
                      <Step
                        title="Enter user credentials and connect wallet"
                        description="Firstly, you need to enter your Full Name and Email (to be used for communication between user and PropBlock) and click on 'Connect wallet' button. Upon clicking the button, the user is prompted with Metamask request to connect the wallet to the site. After successfuly connection, the user can click on 'Proceed Button' which takes the user to the next step."
                      />
                      <Step
                        title="Enter the verfication code sent to Email"
                        description="In this step, you need to enter the verification code sent to the Email (entered in the previous step). Once the code entered is verified, you can move to the next step. "
                      />
                      <Step
                        title="Upload Passport Document"
                        description="In this step, you are required to upload a copy of your passport page for verification purposes."
                      />
                      <Step
                        title="Upload ID Document (Front & Back)"
                        description="In this step, you are required to upload a copy of the ID (front & back) document for verification purposes."
                      />
                      <Step
                        title="Accept PropBlock's Terms and Conditions"
                        description="In this step, you are required to accept the terms and conditions of PropBlock to use the platform."
                      />
                      <Step
                        title="Signed Up successfully"
                        description="Finally, you are successfully signed up to PropBlock and redirected to Home Page."
                      />
                    </Steps>
                  </p>
                </div>
                <div className="rightSide">
                  <img src={signup_page} alt="Signup Page Screenshot" />
                </div>
              </div>
              {/* Login Process  */}
              <div className="signupPageSection">
                <div className="leftSide">
                  <h1>Login Process</h1>
                  <p>
                    PropBlock uses Web3 login (using wallets) to log users in to
                    the plaflorm. On the login page (user has already signed
                    up), the user can follow the below steps to login to their
                    account:
                    <Steps
                      progressDot
                      current={6}
                      direction="vertical"
                      style={{ marginTop: "2rem" }}
                    >
                      <Step
                        title="Connect Wallet"
                        description="As we can see, there is a 'Connect Wallet' button which you can click on to connect your wallet (Metamask) to the site. "
                      />
                      <Step
                        title="Click on 'Login' Button and Login"
                        description="After a successfuly connection, the user can click on 'Login' which prompts the user with a Metamask request to 'Sign'. Once signed, the user is authenticated and redirected to 'Home' Page."
                      />
                    </Steps>
                  </p>
                </div>
                <div className="rightSide">
                  <img src={login_page} alt="Signup Page Screenshot" />
                </div>
              </div>
              {/* Dashboard Page  */}
              <div className="landingPageSection">
                <div className="leftSide">
                  <h1>User Dashboard</h1>
                  <p>
                    Once the user is authenticated successfully, the user can
                    click on the profile icon in the top-right part of the
                    Navbar and select 'Dashboard' from the options. Upon
                    clicking on the button, the user is redirected to the
                    'Dashboard' section which has two main divisions, the
                    'Buyer' section and the 'Seller' section where the user can
                    access different functionalities such as create property,
                    view purchase requests, etc.
                  </p>
                </div>
                <div className="rightSide">
                  <img src={dashboad_page} alt="Screenshot of Dashboard page" />
                </div>
              </div>
              {/* Dashboard Page  */}
              <div className="landingPageSectionFlipped">
                <div className="leftSide">
                  <img
                    src={myproperties_page}
                    alt="Screenshot of MyProperties page"
                  />
                </div>
                <div className="rightSide">
                  <h1>User Properties</h1>
                  <p>
                    From the left Menu, the user can select 'My Properties' and
                    see the properties the s/he has created. The user can also
                    create a property by click on the 'Add New Property' Button
                    next to the properties.
                  </p>
                </div>
              </div>
              {/* Create Property Process  */}
              <div className="signupPageSection">
                <div className="leftSide">
                  <h1>Create Property Process</h1>
                  <p>
                    To create a property listing on PropBlock, the user can
                    select the 'My Properties' section and click on 'Add New
                    Property' to create a new property. The following steps
                    below show how a user can create a new property:
                    <Steps
                      progressDot
                      current={6}
                      direction="vertical"
                      style={{ marginTop: "2rem" }}
                    >
                      <Step
                        title="Enter the details for the property"
                        description="Firstly, the user needs to enter the Title deed details, followed by the various property details as well as the facilities of the property that apply."
                      />
                      <Step
                        title="Add property title, description, title deed & property images"
                        description="In this step, the user has to provide a property title deed, property description, upload the title deed for the property (.pdf format), some images of the property and select the primary image for the property."
                      />
                      <Step
                        title="Complete property creation"
                        description="Finally, the user is required to pay for the smart contract transaction fees, since the data is stored in the smart contract as well."
                      />
                    </Steps>
                  </p>
                </div>
                <div className="rightSide">
                  <img
                    src={create_property_page}
                    alt="Signup Page Screenshot"
                  />
                </div>
              </div>
              {/* Create Property Process  */}
              <div className="signupPageSection">
                <div className="leftSide">
                  <h1>Purchase a property</h1>
                  <p>
                    To purchase a property, there are multiple steps involved
                    with different stakeholders such the buyer, seller (owner of
                    the property listing) as well as the government user (who
                    validates the documents for the property). To purchase a
                    property, the user needs to follow the steps given below:
                    <Steps
                      progressDot
                      current={6}
                      direction="vertical"
                      style={{ marginTop: "2rem" }}
                    >
                      <Step
                        title="Send a request for a specific property"
                        description="To start the purchase proocess, the user should select a specific property from the 'Search Page' and click on the 'Request Purchase' button to send a purchase request to the owner of the property. The purchase requests in the 'Dashboard' will be updated with a new row to and status of 'Pending' (meaning waiting for the seller's approval)."
                      />
                      <Step
                        title="Once accepted by seller, user starts the agreement for the property"
                        description="In case the seller accepts the user's (buyer) request, the user will be show the 'Create Agreement' button which allows the user to create a property agreement between the user and the seller and requires payment of Transaction Gas fees (Paid in Metamask). In case the request is rejected by the seller, the user is shown a status of 'Rejected'."
                      />
                      <Step
                        title="Seller uploads required documents, gets approval from Government user & buyer pays the different Fees for property transfer"
                        description="In this step, "
                      />
                    </Steps>
                  </p>
                </div>
                <div className="rightSide">
                  <img
                    src={create_property_page}
                    alt="Signup Page Screenshot"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HowPropBlockWorks;
