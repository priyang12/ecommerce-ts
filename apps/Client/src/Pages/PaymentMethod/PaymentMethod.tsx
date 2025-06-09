import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import {
  StyledRadioFormContainer,
  StyledRadioFormControl,
} from "./StyledPaymentMethod";

const PaymentMethod = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useCheckout();
  const [method, setMethod] = useState(
    state.payMethod || "PayPal or Credit Card"
  );

  useEffect(() => {
    if (state.address === undefined) {
      Navigate("/checkout/address");
    }
  }, []);

  const SelectMethod = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("payMethod", method);
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: method,
    });
    Navigate("/checkout/PlaceOrder");
  };

  return (
    <StyledPaymentContainer>
      <Helmet>
        <title>Payment Method</title>
        <meta name="description" content="Payment Method" />
      </Helmet>
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
                checked={method === "PayPal or Credit Card"}
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
                checked={method === "Cash on Delivery"}
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
