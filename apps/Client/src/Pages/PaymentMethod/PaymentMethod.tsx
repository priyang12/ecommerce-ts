import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import Navigators from "../../Components/Navigators";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import {
  StyledRadioFormContainer,
  StyledRadioFormControl,
} from "./StyledPaymentMethod";

const PaymentMethod = () => {
  const Navigate = useNavigate();
  const [Method, setMethod] = useState(
    localStorage.payMethod || "PayPal or Credit Card"
  );

  const SelectMethod = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("payMethod", Method);
    Navigate("/PlaceOrder");
  };

  useEffect(() => {
    if (!localStorage.address) {
      Navigate("/address");
    }
  }, [localStorage.address]);

  return (
    <StyledPaymentContainer>
      <Helmet>
        <title>Payment Method</title>
        <meta name="description" content="Payment Method" />
      </Helmet>
      <Navigators />
      <section className="container payments" id="payment">
        <h1>PAYMENT METHOD</h1>
        <h2>Select Method</h2>
        <form onSubmit={SelectMethod}>
          <StyledRadioFormContainer>
            <StyledRadioFormControl>
              <input
                type="radio"
                id="PayMethod"
                name="PayMethod"
                checked={Method === "PayPal or Credit Card"}
                value="PayPal or Credit Card"
                data-testid="PayPalButton"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="PayMethod">PayPal or Credit Card</label>
            </StyledRadioFormControl>
            <StyledRadioFormControl>
              <input
                type="radio"
                id="PayMethod"
                name="PayMethod"
                checked={Method === "Cash on Delivery"}
                value="Cash on Delivery"
                data-testid="CashButton"
                onChange={(e) => setMethod(e.target.value)}
              />
              <label htmlFor="PayMethod">Cash on Delivery</label>
            </StyledRadioFormControl>
          </StyledRadioFormContainer>

          <input type="submit" className="btn" value="Continue" />
        </form>
      </section>
    </StyledPaymentContainer>
  );
};

export default PaymentMethod;
