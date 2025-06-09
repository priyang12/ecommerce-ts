import React, { useLayoutEffect, useState } from "react";
import { Navigate as Redirect, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import ProductList from "./ProductList";
import {
  StyledHeader,
  StyledOrderSummary,
  StyledOrderSummaryBody,
  StyledOrderSummaryItem,
  StyledParagraph,
  StyledPlaceOrder,
} from "./StyledPlaceOrder";
import { useLoadCartQuery } from "../../API/CartAPI";
import Spinner from "../../Components/Spinner";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";

const PlaceOrder = () => {
  const Navigate = useNavigate();
  const { data: Cart, isLoading } = useLoadCartQuery();

  const [ProductsAmount, setProductsAmount] = useState(0);
  const ShippingAmount = ProductsAmount > 500 ? 0 : 100;
  const TaxAmount = 0.15 * ProductsAmount;
  const TotalAmount = ProductsAmount + ShippingAmount + TaxAmount;

  const {
    state: { address, payMethod },
    dispatch,
  } = useCheckout();

  // remove effect
  useLayoutEffect(() => {
    if (Cart) {
      setProductsAmount(() => {
        let Total = 0;
        Cart?.products?.forEach((item) => {
          Total += item.product.price * item.qty;
        });
        return Total;
      });
    }
  }, [Cart]);

  const PlaceTheOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Order = {
      orderItems: Cart?.products,
      shippingAddress: address,
      paymentMethod: payMethod,
      itemsPrice: ProductsAmount,
      taxPrice: TaxAmount,
      shippingPrice: ShippingAmount,
      totalPrice: Math.round(TotalAmount),
    };

    dispatch({
      type: "SET_ORDER",
      payload: Order,
    });

    Navigate("/checkout/PayPal");
  };

  if (isLoading) return <Spinner />;
  if (Cart && Cart.products?.length === 0) return <Redirect to="/" />;

  if (!address) return <Redirect to="/checkout/address" />;
  if (!payMethod) return <Redirect to="/checkout/paymentMethod" />;

  return (
    <StyledPaymentContainer theme={{ maxWidth: "80vw" }}>
      <Helmet>
        <title>Place Order</title>
        <meta name="description" content="Place Order" />
      </Helmet>
      <StyledPlaceOrder>
        <div className="OrderDetails">
          <div className="detail">
            <StyledHeader>SHIPPING </StyledHeader>
            <StyledParagraph>
              Address: {address.address} , {address.city} ,{address.postalcode},
            </StyledParagraph>
          </div>
          <div className="detail">
            <StyledHeader>PAYMENT METHOD</StyledHeader>
            <StyledParagraph>Method: {payMethod}</StyledParagraph>
          </div>
          <div className="order-details">
            <StyledHeader>ORDER ITEMS</StyledHeader>
            <ul className="order-list">
              {Cart?.products.map((item) => (
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
                <span data-testid="ShippingCost">{ShippingAmount}</span>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                Tax Cost :<span data-testid="TaxCost">{TaxAmount}</span>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                Total Cost :
                <span data-testid="TotalAmount">{Math.round(TotalAmount)}</span>
              </StyledOrderSummaryItem>
            </StyledOrderSummaryBody>
            <button className="btn">PlaceOrder</button>
          </form>
        </StyledOrderSummary>
      </StyledPlaceOrder>
    </StyledPaymentContainer>
  );
};

export default PlaceOrder;
