import React, { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router";
import TimeoutBtn from "../Components/TimeoutBtn";
import ProductList from "../Components/ProductList";
import Navigators from "../Components/Navigators";
import { Address, Cart } from "../interfaces";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { StyledPaymentContainer } from "../Components/StyledComponents/StyledPayment";

import {
  StyledHeader,
  StyledOrderSummary,
  StyledOrderSummaryBody,
  StyledOrderSummaryItem,
  StyledPlaceOrder,
} from "./StyledPages/StyledPlaceOrder";

const PlaceOrder = () => {
  const history = useHistory();
  const { state } = useContext(AuthContext);
  const { token } = state;

  const Cart: Cart[] = localStorage.Cart && JSON.parse(localStorage.Cart);
  const Address: Address =
    localStorage.address && JSON.parse(localStorage.address);
  const PayMethod = localStorage.payMethod;
  const ProductsAmount =
    localStorage.ProductsAmount && JSON.parse(localStorage.ProductsAmount);

  let ExtraAmount: number = 0;

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);

  const addDecimals = (num: number) => {
    const result = Number((Math.round(num * 100) / 100).toFixed(2));
    ExtraAmount += result;
    return result;
  };
  const PlaceTheOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shipping = addDecimals(ProductsAmount > 500 ? 0 : 100);
    const Tax = addDecimals(ProductsAmount * 0.1);
    const Order = {
      orderItems: Cart,
      shippingAddress: Address,
      paymentMethod: PayMethod,
      itemsPrice: ProductsAmount,
      taxPrice: 0.1 * ProductsAmount,
      shippingPrice: ProductsAmount > 500 ? 0 : 100,
      totalPrice: Math.round(shipping + Tax + ProductsAmount),
    };
    localStorage.setItem("order", JSON.stringify(Order));
    history.push("/PayPal");
  };

  if (!Cart || !Address || !PayMethod || !ProductsAmount)
    return <Redirect to="/cart" />;

  if (Cart?.length === 0) return <Redirect to="/" />;

  return (
    <StyledPaymentContainer theme={{ maxWidth: "80vw" }}>
      <Navigators />
      <StyledPlaceOrder>
        <div className="OrderDetails">
          <div className="detail">
            <StyledHeader>SHIPPING </StyledHeader>
            <p>
              Address: {Address.homeAddress} , {Address.city} ,
              {Address.postalCode},
            </p>
          </div>
          <div className="detail">
            <StyledHeader>PAYMENT METHOD</StyledHeader>
            <p>Method: {PayMethod}</p>
          </div>
          <div className="order-details">
            <StyledHeader>ORDER ITEMS</StyledHeader>
            <ul className="order-list">
              {Cart.map((item) => (
                <ProductList Cart={item} key={item._id} styledWidth="80%" />
              ))}
            </ul>
          </div>
        </div>
        <StyledOrderSummary>
          <form onSubmit={PlaceTheOrder} data-testid="PlaceOrder">
            <StyledOrderSummaryBody>
              <StyledHeader>ORDER SUMMARY</StyledHeader>
              <StyledOrderSummaryItem>
                Items Cost : <span> {ProductsAmount}</span>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                Shipping Cost :
                <span data-testid="ShippingCost">
                  {addDecimals(ProductsAmount > 500 ? 0 : 100)}
                </span>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                Tax Cost :
                <span data-testid="TaxCost">
                  {addDecimals(0.1 * ProductsAmount)}
                </span>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                Total Cost :
                <span data-testid="TotalAmount">
                  {Math.round(ExtraAmount + ProductsAmount)}
                </span>
              </StyledOrderSummaryItem>
            </StyledOrderSummaryBody>

            <TimeoutBtn Time={4000} className="btn" FormValue="PlaceOrder" />
          </form>
        </StyledOrderSummary>
      </StyledPlaceOrder>
    </StyledPaymentContainer>
  );
};

export default PlaceOrder;
