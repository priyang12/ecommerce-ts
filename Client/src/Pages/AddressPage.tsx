import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "../Utils/CustomHooks";
import { Address } from "../interfaces";
import Navigators from "../Components/Navigators";
import { StyledPaymentContainer } from "../Components/StyledComponents/StyledPayment";

let init: Address = {
  homeAddress: "",
  city: "",
  postalCode: "",
};

const AddressPage = () => {
  const history = useHistory();
  const [ShippingAddress, ChangeShippingAddress, SetState] = useForm(init);
  const { homeAddress, city, postalCode, country } = ShippingAddress;

  useEffect(() => {
    if (localStorage.address) {
      SetState(JSON.parse(localStorage.address));
    }
    // eslint-disable-next-line
  }, []);

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
    <StyledPaymentContainer theme={{ maxWidth: "60ch" }}>
      <Navigators />
      <form onSubmit={SubmitAddress}>
        <h1>SHIPPING</h1>
        <div className='form-control'>
          <input
            type='text'
            name='homeAddress'
            id='Address'
            onChange={ChangeShippingAddress}
            value={homeAddress}
            required
          />
          <span className='highlight'></span>
          <span className='bar'></span>
          <label htmlFor='Address'>homeAddress</label>
        </div>
        <div className='form-control'>
          <input
            type='text'
            name='city'
            id='City'
            onChange={ChangeShippingAddress}
            value={city}
            required
          />
          <span className='highlight'></span>
          <span className='bar'></span>
          <label htmlFor='City'>City</label>
        </div>
        <div className='form-control'>
          <input
            type='text'
            name='postalCode'
            id='PostalCode'
            onChange={ChangeShippingAddress}
            value={postalCode}
            required
          />
          <span className='highlight'></span>
          <span className='bar'></span>
          <label htmlFor='PostalCode'>Postal Code</label>
        </div>

        <input type='submit' className='btn' value='Continue' />
        {Valid && (
          <div className='alert'>Please Enter All the Fields Properly</div>
        )}
      </form>
    </StyledPaymentContainer>
  );
};

export default AddressPage;
