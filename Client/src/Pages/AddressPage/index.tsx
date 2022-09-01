import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../../Utils/CustomHooks";
import { Address } from "../../interfaces";
import Navigators from "../../Components/Navigators";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import { OrderSchema } from "@ecommerce/validation";
import { FormControl, Input, Label } from "../../StyledComponents/FormControl";

const init: Address = {
  address: "",
  city: "",
  postalcode: "",
};

const AddressPage = () => {
  const history = useHistory();
  const { state: ShippingAddress, ChangeState } = useForm(
    localStorage.address ? JSON.parse(localStorage.address) : init
  );
  const { address, city, postalcode } = ShippingAddress;

  useEffect(() => {
    if (!localStorage.Cart || localStorage.Cart.length === 0) {
      history.push("/cart");
    }
  });
  const SubmitAddress = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      OrderSchema.pick({
        shippingAddress: true,
      }).parse({ shippingAddress: ShippingAddress });
      localStorage.setItem(
        "address",
        JSON.stringify({ address, city, postalcode })
      );
      history.push("/payment");
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
