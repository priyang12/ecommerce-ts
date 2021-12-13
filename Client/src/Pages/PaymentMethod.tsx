import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Navigators from "../Components/Navigators";

const StyledContainer = styled.section`
  width: 100%;
  max-width: 80ch;
  margin: 0 auto;
`;

const PaymentMethod = () => {
  const history = useHistory();
  const [Method, setMethod] = useState("PayPal or Credit Card");
  const SelectMethod = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("payMethod", Method);
    history.push("/PlaceOrder");
  };
  if (!localStorage.address) {
    history.push("/address");
  }
  return (
    <StyledContainer>
      <Navigators />
      <section className="container payments" id="payment">
        <h1>PAYMENT METHOD</h1>
        <h2>Select Method</h2>
        <form onSubmit={SelectMethod}>
          <div>
            <input
              type="radio"
              id="PayMethod"
              name="payment"
              value="PayPal or Credit Card"
              defaultChecked={true}
              onChange={(e) => setMethod(e.target.value)}
            />
            <label htmlFor="PayMethod">PayPal or Credit Card</label>
          </div>

          <input type="submit" className="btn" value="Continue" />
        </form>
      </section>
    </StyledContainer>
  );
};

export default PaymentMethod;
