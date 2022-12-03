import React, { useEffect, useState } from "react";
import "../../styling/MainContainer/Agreements.scss";
import "../../styling/MainContainer/AgreementPayment.scss";
import { Spin, Input, Tooltip, message } from "antd";
import { ArrowLeftOutlined, InfoCircleOutlined } from "@ant-design/icons";

const AgreementPayment = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  // function to pay the owner
  const ownerPayment = () => {
    try {
      message.info("Payment to owner function");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to pay the DLD fees
  const dldFeesPayment = () => {
    try {
      message.info("Payment of DLD fees to government");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to pay the DLD fees
  const propBlockFeesPayment = () => {
    try {
      message.info("Payment of PropBlock Fees");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  // function to transfer the property from owner to buyer after
  //  payment of all the fees
  const transferProperty = (owner, buyer, propertyId) => {
    try {
      message.info("Transfer Property Function");
    } catch (error) {
      message.error("Error: ", error);
    }
  };

  useEffect(() => {
    setIsLoading(false);
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
                <h1>Agreement ID - #{props.agreementId}</h1>
                {/* Owner Address */}
                <div className="agreementDetails">
                  <div className="title">Owner Address</div>
                  <div className="data">
                    <Input
                      placeholder={`${
                        props.ownerAddress.slice(0, 10) +
                        " ... " +
                        props.ownerAddress.slice(
                          props.ownerAddress.length - 8,
                          props.ownerAddress.length
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
                    <Input
                      placeholder={`${props.propertyId}`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {/* Agreement Id */}
                <div className="agreementDetails">
                  <div className="title">Agreement Id</div>
                  <div className="data">
                    <Input
                      placeholder={`${props.agreementId}`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
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
                      placeholder={`${props.paymentOwnerStatus}`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {props.paymentOwnerStatus ? (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <div className="paymentComplete">
                      <Input
                        placeholder="Payment Complete"
                        style={{
                          border: "1px solid #333",
                          borderRadius: "0.5rem",
                        }}
                        disabled={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        ownerPayment();
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
                      placeholder={`${props.paymentGovernmentStatus}`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {props.paymentGovernmentStatus ? (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <div className="paymentComplete">
                      <Input
                        placeholder="Payment Complete"
                        style={{
                          border: "1px solid #333",
                          borderRadius: "0.5rem",
                        }}
                        disabled={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        dldFeesPayment();
                      }}
                      disabled={!props.paymentOwnerStatus}
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
                      placeholder={`${props.paymentGovernmentStatus}`}
                      style={{
                        border: "1px solid #333",
                        borderRadius: "0.5rem",
                      }}
                      disabled={true}
                    />
                  </div>
                </div>
                {props.paymentGovernmentStatus ? (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <div className="paymentComplete">
                      <Input
                        placeholder="Payment Complete"
                        style={{
                          border: "1px solid #333",
                          borderRadius: "0.5rem",
                        }}
                        disabled={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="agreementDetails">
                    <div className="title">Complete Payment</div>
                    <button
                      className="payButton"
                      onClick={() => {
                        propBlockFeesPayment();
                      }}
                      disabled={!props.paymentGovernmentStatus}
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
                        transferProperty();
                      }}
                      disabled={!props.propBlockFeesPayment}
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
