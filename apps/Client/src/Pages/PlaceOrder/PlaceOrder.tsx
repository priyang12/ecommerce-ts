import { Navigate as Redirect, useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";
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
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import { css } from "@linaria/core";

const containerWidth = css`
  max-width: 80vw;
  height: 100vh;
`;

const PlaceOrder = () => {
  const Navigate = useNavigate();
  const {
    state: { address, payMethod },
    dispatch,
  } = useCheckout();

  // get the cart data from context.
  const { data: Cart, isLoading } = useLoadCartQuery();
  const ProductsAmount = Cart
    ? Cart.products.reduce((pre, current) => {
        return (pre += current.product.price * current.qty);
      }, 0)
    : 0;
  const ShippingAmount = ProductsAmount > 500 ? 0 : 100;
  const TaxAmount = 0.15 * ProductsAmount;
  const TotalAmount = ProductsAmount + ShippingAmount + TaxAmount;

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
  // if (Cart && Cart.products?.length === 0) return <Redirect to="/" />;

  if (!address) return <Redirect to="/checkout/address" />;
  if (!payMethod) return <Redirect to="/checkout/paymentMethod" />;

  return (
    <StyledCheckoutContainer className={containerWidth}>
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
    </StyledCheckoutContainer>
  );
};

export default PlaceOrder;
