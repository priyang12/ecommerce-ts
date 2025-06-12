import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { useForm } from "../../Hooks/useForm";
import { Address } from "../../Types/interfaces";
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import { OrderSchema } from "../../validation";
import { FormControl, Input, Label } from "../../Components/UI/FormControl";
import { useLoadCartQuery } from "../../API/CartAPI";
import { toast } from "react-toastify";
import { css } from "@linaria/core";

const init: Address = {
  address: "",
  city: "",
  postalcode: "",
};

const containerWidth = css`
  max-width: 60ch;
`;

const AddressPage = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useCheckout();

  const { state: ShippingAddress, ChangeState } = useForm(
    state.address ? state.address : init
  );
  const { data: Cart, isSuccess, isError } = useLoadCartQuery();

  useEffect(() => {
    if ((isSuccess && Cart.products.length === 0) || isError) {
      Navigate("/cart");
    }
  }, [Cart, Navigate, isError, isSuccess]);

  const SubmitAddress: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();
    try {
      OrderSchema.pick({
        shippingAddress: true,
      }).parse({ shippingAddress: ShippingAddress });
      dispatch({ type: "SET_ADDRESS", payload: ShippingAddress });
      Navigate("/checkout/paymentMethod");
    } catch (error: any) {
      if (error instanceof Error) toast(error.message);
    }
  };
  return (
    <StyledCheckoutContainer className={containerWidth}>
      <form onSubmit={SubmitAddress}>
        <h1>SHIPPING</h1>
        <FormControl>
          <Input
            type="text"
            name="address"
            id="address"
            onChange={ChangeState}
            value={ShippingAddress.address}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="address">address</Label>
        </FormControl>
        <FormControl>
          <Input
            type="text"
            name="city"
            id="City"
            onChange={ChangeState}
            value={ShippingAddress.city}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="City">City</Label>
        </FormControl>
        <FormControl>
          <Input
            type="number"
            name="postalcode"
            id="postalcode"
            onChange={ChangeState}
            value={ShippingAddress.postalcode}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="postalcode">Postal Code</Label>
        </FormControl>

        <input type="submit" className="btn" value="Continue" />
      </form>
    </StyledCheckoutContainer>
  );
};

export default AddressPage;
