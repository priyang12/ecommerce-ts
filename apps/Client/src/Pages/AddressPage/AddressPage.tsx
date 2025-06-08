import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../Utils/CustomHooks";
import { Address } from "../../interfaces";
import Navigators from "../../Components/Navigators";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import { OrderSchema } from "../../validation";
import { FormControl, Input, Label } from "../../StyledComponents/FormControl";
import { useLoadCartQuery } from "../../API/CartAPI";

const init: Address = {
  address: "",
  city: "",
  postalcode: "",
};

const AddressPage = () => {
  const Navigate = useNavigate();
  const { state: ShippingAddress, ChangeState } = useForm(
    localStorage.address ? JSON.parse(localStorage.address) : init
  );
  const { address, city, postalcode } = ShippingAddress;
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
      localStorage.setItem(
        "address",
        JSON.stringify({ address, city, postalcode })
      );
      Navigate("/paymentMethod");
    } catch (error: any) {
      // Need To Handle Error
    }
  };
  return (
    <StyledPaymentContainer theme={{ maxWidth: "60ch" }}>
      <Navigators />
      <form onSubmit={SubmitAddress}>
        <h1>SHIPPING</h1>
        <FormControl>
          <Input
            type="text"
            name="address"
            id="address"
            onChange={ChangeState}
            value={address}
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
            value={city}
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
            value={postalcode}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <Label htmlFor="postalcode">Postal Code</Label>
        </FormControl>

        <input type="submit" className="btn" value="Continue" />
      </form>
    </StyledPaymentContainer>
  );
};

export default AddressPage;
