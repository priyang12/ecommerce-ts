import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import {
  StyledRadioFormContainer,
  StyledRadioFormControl,
} from "./StyledPaymentMethod";
import { css } from "@linaria/core";
import { SubmitButton } from "../../Components/UI/FormControl";

const containerWidth = css`
  max-width: 60ch;
`;

/**
 * Payment Method Component
 *
 * Handles the selection of a payment method during the checkout process.
 * Integrates with global checkout state via `CheckoutContext` and navigates
 * the user to the next step in the checkout flow.
 *
 * ## Navigation Logic
 * - Redirects to `/checkout/address` if no shipping address is found.
 * - On submission, stores the selected method in localStorage and dispatches
 *   a context action to update the checkout state.
 *
 * ## Payment Options
 * - "PayPal or Credit Card" (default)
 * - "Cash on Delivery"
 *
 * ## State Management
 * - `useCheckout` context for global checkout state.
 * - Local state (`useState`) for selected payment method.
 */

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
    <StyledCheckoutContainer className={containerWidth}>
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

          <SubmitButton type="submit" value="Continue" />
        </form>
      </section>
    </StyledCheckoutContainer>
  );
};

export default PaymentMethod;
