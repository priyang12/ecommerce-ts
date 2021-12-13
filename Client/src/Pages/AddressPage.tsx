import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "../Utils/CustomHooks";
import { Address } from "../types";
import Navigators from "../Components/Navigators";

let init: Address = {
  homeAddress: "",
  city: "",
  postalCode: "",
  country: "",
};
if (localStorage.address) init = JSON.parse(localStorage.address);

const StyledContainer = styled.section`
  width: 100%;
  max-width: 80ch;
  margin: 0 auto;
`;

const AddressPage = () => {
  const history = useHistory();
  const [ShippingAddress, ChangeShippingAddress] = useForm(init);
  const { homeAddress, city, postalCode, country } = ShippingAddress;

  const [Valid, setValid] = useState(false);
  if (!localStorage.Cart || localStorage.Cart.length === 0) {
    history.push("/cart");
  }

  const validate = () => {
    if (
      homeAddress === "" ||
      city === "" ||
      postalCode === "" ||
      country === ""
    ) {
      return false;
    } else if (postalCode.length !== 6) return false;
    return true;
  };
  const SubmitAddress = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem(
        "address",
        JSON.stringify({ homeAddress, city, postalCode, country })
      );
      history.push("/payment");
    } else {
      setValid(true);
    }
  };
  return (
    <StyledContainer>
      <Navigators />
      <form onSubmit={SubmitAddress}>
        <h1>SHIPPING</h1>
        <div className="form-control">
          <input
            type="text"
            name="homeAddress"
            id="Address"
            onChange={ChangeShippingAddress}
            value={homeAddress}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="Address">homeAddress</label>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="city"
            id="City"
            onChange={ChangeShippingAddress}
            value={city}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="City">City</label>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="postalCode"
            id="PostalCode"
            onChange={ChangeShippingAddress}
            value={postalCode}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="PostalCode">Postal Code</label>
        </div>
        <div className="form-control">
          <input
            type="text"
            name="country"
            id="Country"
            onChange={ChangeShippingAddress}
            value={country}
            required
          />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label htmlFor="Country">Country</label>
        </div>
        <input type="submit" className="btn" value="Continue" />
        {Valid && (
          <div className="alert">Please Enter All the Fields Properly</div>
        )}
      </form>
    </StyledContainer>
  );
};

export default AddressPage;
