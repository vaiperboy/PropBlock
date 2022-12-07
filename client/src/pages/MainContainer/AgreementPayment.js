import React, { useEffect, useState } from "react";
import "../../styling/MainContainer/Agreements.scss";
import "../../styling/MainContainer/AgreementPayment.scss";
import { Spin, Input, Tooltip, message } from "antd";
import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import Web3 from "web3";
import realEstate from "../../artifacts/contracts/realEstate.sol/realEstate.json";
const { ethers } = require("ethers");
const console = require("console-browserify");
const { ethereum } = window;


const AgreementPayment = (props) => {
  const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState({});
  const [canPayLandlord, setCanPayLandlord] = useState(false);
  const [canPayPropBlock, setCanPayPropBlock] = useState(false);
  const [canPayDld, setCanPayDld] = useState(false);
  const {
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

  // function to pay the owner
  const ownerPayment = async () => {
    try {
      var propertyValue = payment.numericPrice
      // converting to number to hex encoded value
      // const hexValue = Web3.utils.toHex(propertyValue + "00000000000000000");
      const hexValue = Web3.utils.toHex(propertyValue + "00000000");

      // get the connect account from Metamask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[0],
              to: Web3.utils.toChecksumAddress(payment.landlordAddress),
              value: hexValue,
            },
          ],
        })
        .then(
          async (txHash) => {
            message.success("You paid to Owner. Give it few minutes to get confirmed")
            const query = new Moralis.Query("AgreementStatus")
            query.equalTo("objectId", payment.details._id)
            const agreementStatus = await query.first()
            agreementStatus.set("landlordTxHash", txHash)
            agreementStatus.save()
            setCanPayLandlord(false)
          }
          // do the off-chain stuff here
        )
        .catch((error) => message.error(error));
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to pay the DLD fees
  const dldFeesPayment = async () => {
    try {
      var propertyValue = payment.numericPrice
      // get 4% of the property price
      const fourPercentValue = parseInt(propertyValue) * 0.04;
      // converting to number to hex encoded value
      // const hexValue = Web3.utils.toHex(fourPercentValue + "000000000000");
      const hexValue = Web3.utils.toHex(propertyValue + "00000000");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[0],
              to: "0x7ca510fB48358e4FFeD5d761DE3479f546Ba7d3C",
              value: hexValue,
            },
          ],
        })
        .then(
          async (txHash) => {
            message.success("You paid to DLD. Give it few minutes to get confirmed")
            const query = new Moralis.Query("AgreementStatus")
            query.equalTo("objectId", payment.details._id)
            const agreementStatus = await query.first()
            agreementStatus.set("dldTxHash", txHash)
            agreementStatus.save()
            setCanPayDld(false)
          }
          // do the off-chain stuff here
        )
        .catch((error) => message.error(error));
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to pay the PropBlock fees
  const propBlockFeesPayment = async () => {
    try {
      var propertyValue = payment.numericPrice
      // get 1% of the property price
      const onePercentValue = parseInt(propertyValue) * 0.01;
      // converting to number to hex encoded value
      // const hexValue = Web3.utils.toHex(onePercentValue + "000000000000");
      const hexValue = Web3.utils.toHex(propertyValue + "00000000");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[0],
              to: "0x4001A8651c51a799ED5808ae45da60538b327b96",
              value: hexValue,
            },
          ],
        })
        .then(
          async (txHash) => {
            message.success("You paid to PropBlock. Give it few minutes to get confirmed")
            const query = new Moralis.Query("AgreementStatus")
            query.equalTo("objectId", payment.details._id)
            const agreementStatus = await query.first()
            agreementStatus.set("propBlockTxHash", txHash)
            agreementStatus.save()
            setCanPayPropBlock(false)
          }
          // do the off-chain stuff here
        )
        .catch((error) => message.error(error));
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to transfer the property from owner to buyer after
  //  payment of all the fees
  const transferProperty = async (owner, buyer, propertyId) => {
    try {
      // performing the contract function
      const uintPropertyId = parseInt(propertyId);
      const ownerAddress = Web3.utils.toChecksumAddress(owner);
      const buyerAddress = Web3.utils.toChecksumAddress(buyer);



      const accounts = await ethereum.request({ method: "eth_accounts" });
      // connected
      //set up transaction parameters
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const walletAddress = accounts[0]; // first account in MetaMask
      const signerNew = provider.getSigner(walletAddress);
      var realEstateDappContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        realEstate.abi,
        signerNew
      );

      // calling the contract address
      const txHash = await realEstateDappContract.transferProperty(
        ownerAddress,
        uintPropertyId,
        buyerAddress
      );

      // do the off-chain stuff here
      message.success("You now own this property!")
      var query = new Moralis.Query("PropertiesAdded")
      query.equalTo("objectId", payment.details.propertyObjectId)
      var result = await query.first()
      result.set("landlordAddress", buyerAddress)
      result.save()

      {
        const query = new Moralis.Query("AgreementStatus")
        query.equalTo("objectId", payment.details._id)
        const agreementStatus = await query.first()
        agreementStatus.set("buyerPaymentComplete", true)
        agreementStatus.save()
      }
    } catch (error) {
      message.error("Error: ", error);
      console.log(error)
      console.log("error occured")
    }
  };

  // transfer eth to smart contract
  const transferToContaract = async (ethValue) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // converting to number to hex encoded value
      const hexValue = Web3.utils.toHex(ethValue + "000000000000");

      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params: [
            {
              from: accounts[0],
              to: "0xD93602922ee643F733f16CA00FEd0698766b4Ed9",
              value: hexValue,
            },
          ],
        })
        .then(
          (txHash) => console.log(txHash)
          // do the off-chain stuff here
        )
        .catch((error) => console.error);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getStatus = (canPay, isTxConfirmed) => {
    if (canPay === true) return "Waiting on payment";
    else {
      if (isTxConfirmed) return "Payment complete";
      else return "Waiting on confirmations";
    }
  };

  async function loadPayment() {
    setIsLoading(true);
    fetch(
      "http://localhost:9000/getPaymentDetails?" +
      new URLSearchParams({
        sessionToken: user.getSessionToken(),
        ownerAddress: Web3.utils.toChecksumAddress(user.get("ethAddress")),
        agreementObjectId: props.agreementId,
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setPayment(res);

        //if user paid do not pay again
        if (res.details.propBlockTxHash === undefined) setCanPayPropBlock(true);
        if (res.details.dldTxHash === undefined) setCanPayDld(true);
        if (res.details.landlordTxHash === undefined) setCanPayLandlord(true);
      })
      .catch((err) => {
        message.error("API error");
        setPayment({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadPayment();
  }, []);


  if (isLoading) {
    return (
      <div
        style={{
          textAlign: "center",
          width: "60%",
          height: "50rem",
          marginLeft: "5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" style={{ margin: "0 2rem 0 0 " }} /> Loading
      </div>
    );
  } else
    return (
      <div className="rightsidebar_container">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p className="rightsidebar_title">Agreement Payment </p>
            <div className="agreementPaymentContainer">
              <button
                className="backButton"
                onClick={() => {
                  props.toggleAgreementListView(true);
                }}
              >
                <ArrowLeftOutlined /> Back
              </button>
              <div className="agreementDetailsContainer">
                <h1>Agreement ID - #{payment.objectId.slice(0, 6)}</h1>
                {/* Owner Address */}
                <div className="agreementDetails">
                  <div className="title">Owner Address</div>
                  <div className="data">
                    <Input
                      placeholder={`${payment.landlordAddress.slice(0, 10) +
                        " ... " +
                        payment.landlordAddress.slice(
                          payment.landlordAddress.length - 8,
                          payment.landlordAddress.length
                        )
                        }`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {/* Property Id */}
                <div className="agreementDetails">
                  <div className="title">Property ID</div>
                  <div className="data">
                    <a
                      href={"/property/" + payment.details.propertyObjectId}
                      target="_blank"
                    >
                      <Input
                        placeholder={`${payment.details.propertyObjectId}`}
                        style={{
                          border: "1px solid #333",
                          borderRadius: "0.5rem",
                        }}
                        disabled={true}
                      />
                    </a>
                  </div>
                </div>
                <div className="breaker"></div>
                <h2>
                  Property Price Payment{" "}
                  <Tooltip title="Price of the property (in Eth) paid to the owner.">
                    <span>
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
                </h2>
                <div className="agreementDetails">
                  <div className="title">Payment Status</div>
                  <div className="data">
                    <Input
                      placeholder={getStatus(
                        canPayLandlord,
                        payment.isLandlordTxConfirmed
                      )}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {canPayLandlord && (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        ownerPayment(payment.numericPrice);
                      }}
                    >
                      Pay Owner
                    </button>
                  </div>
                )}

                <div className="breaker"></div>
                <h2>
                  DLD - Government Fee Payment (4%){" "}
                  <Tooltip title="Fees of 4% of the total price of property paid to the DLD Government.">
                    <span>
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
                </h2>
                <div className="agreementDetails">
                  <div className="title">Payment Status</div>
                  <div className="data">
                    <Input
                      placeholder={getStatus(
                        canPayDld,
                        payment.isDldTxConfirmed
                      )}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {canPayDld && (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        dldFeesPayment(100);
                      }}
                    >
                      Pay DLD Fees
                    </button>
                  </div>
                )}
                <div className="breaker"></div>
                <h2>
                  PropBlock Fees Payment{" "}
                  <Tooltip title="PropBlock requires payment of 1% of the total price of property for property transfer.">
                    <span>
                      <InfoCircleOutlined />
                    </span>
                  </Tooltip>
                </h2>
                <div className="agreementDetails">
                  <div className="title">Payment Status</div>
                  <div className="data">
                    <Input
                      placeholder={getStatus(
                        canPayDld,
                        payment.isPropBlockTxConfirmed
                      )}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {canPayPropBlock && (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        propBlockFeesPayment();
                      }}
                    >
                      Pay PropBlock Fees
                    </button>
                  </div>
                )}
                <div className="breaker"></div>
                <h2>Complete Property Transfer </h2>
                <div className="agreementDetails">
                  <div className="data">
                    <button
                      className="completeTransfer"
                      onClick={() => {
                        transferProperty(
                          payment.landlordAddress,
                          payment.buyerAddress,
                          payment.property.propertyId
                        );
                      }}
                      // disabled={(canPayDld || canPayLandlord || canPayPropBlock)}
                      disabled={(!payment.isDldTxConfirmed || !payment.isLandlordTxConfirmed || !payment.isPropBlockTxConfirmed)}
                    >
                      Complete Transfer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
export default AgreementPayment;
