import { Navigate as Redirect, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  StyledHeader as Header,
  StyledOrderSummary as OrderSummary,
  StyledOrderSummaryBody as OrderSummaryBody,
  StyledOrderSummaryItem as OrderSummaryItem,
  StyledParagraph as Paragraph,
  StyledItemContainer,
  StyledPlaceOrder,
} from "./StyledPlaceOrder";
import { useLoadCartQuery } from "../../API/CartAPI";
import Spinner from "../../Components/Spinner";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import { SubmitButton } from "../../Components/UI/FormControl";
import OrderItem from "./ProductList";

import { css } from "@linaria/core";

const containerWidth = css`
  max-width: 80vw;
`;

/**
 * PlaceOrder Component
 *
 * Displays the final step of the checkout process where users can review
 * shipping details, payment method, and a summary of their order before placing it.
 *
 *
 * ## Route
 * - `/checkout/placeOrder`
 * @component
 *
 * @returns {JSX.Element} A React component that renders the place order page.
 *
 * @requires
 * - A valid address in checkout state or localStorage
 * - A selected payment method
 * - A non-empty cart (from `useLoadCartQuery`)
 *
 * @behavior
 * - Redirects to `/checkout/address` if no address
 * - Redirects to `/checkout/paymentMethod` if no payment method
 * - Redirects to `/` if the cart is empty
 *
 * @todo
 * - Replace local calculation logic with backend-confirmed values if applicable.
 * - Add validation/error states for failed order submissions
 * - Animate transitions or confirmation modals
 */
const PlaceOrder = () => {
  const Navigate = useNavigate();
  const {
    state: { address, payMethod },
    dispatch,
  } = useCheckout();

  const { data: cart, isLoading } = useLoadCartQuery();

  const ProductsAmount = cart
    ? cart.products.reduce((pre, current) => {
        return (pre += current.product.price * current.qty);
      }, 0)
    : 0;
  const roundedProductAmount = ProductsAmount.toFixed(2);
  const ShippingAmount = ProductsAmount > 500 ? 0 : 100;
  const TaxAmount = +(0.15 * ProductsAmount).toFixed(2);

  const TotalAmount = +(ProductsAmount + ShippingAmount + TaxAmount).toFixed(2);

  const PlaceTheOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const Order = {
      orderItems: cart?.products,
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

    Navigate("/checkout/paypal");
  };

  if (!address) return <Redirect to="/checkout/address" />;
  if (!payMethod) return <Redirect to="/checkout/paymentMethod" />;

  if (isLoading) return <Spinner />;

  if (cart && cart.products?.length === 0) return <Redirect to="/" />;

  return (
    <StyledCheckoutContainer className={containerWidth}>
      <Helmet>
        <title>Place Order</title>
        <meta name="description" content="Place Order" />
      </Helmet>
      <StyledPlaceOrder>
        <div>
          <div>
            <Header>SHIPPING </Header>
            <Paragraph>
              Address: {address.address} , {address.city} ,{address.postalcode},
            </Paragraph>
            <Header>PAYMENT METHOD</Header>
            <Paragraph>Method: {payMethod}</Paragraph>
          </div>

          <div className="order-details">
            <Header>ORDER ITEMS</Header>
            <StyledItemContainer>
              {cart?.products.map((item) => (
                <OrderItem Cart={item} key={item._id} styledWidth="80%" />
              ))}
            </StyledItemContainer>
          </div>
        </div>
        <OrderSummary>
          <form onSubmit={PlaceTheOrder} data-testid="PlaceOrder">
            <OrderSummaryBody>
              <Header>ORDER SUMMARY</Header>
              <OrderSummaryItem>
                Items Cost : <span> {roundedProductAmount}</span>
              </OrderSummaryItem>
              <OrderSummaryItem>
                Shipping Cost :
                <span data-testid="ShippingCost">{ShippingAmount}</span>
              </OrderSummaryItem>
              <OrderSummaryItem>
                Tax Cost :<span data-testid="TaxCost">{TaxAmount}</span>
              </OrderSummaryItem>
              <OrderSummaryItem>
                Total Cost :
                <span data-testid="TotalAmount">{Math.round(TotalAmount)}</span>
              </OrderSummaryItem>
            </OrderSummaryBody>
            <SubmitButton type="submit" value="PlaceOrder" />
          </form>
        </OrderSummary>
      </StyledPlaceOrder>
    </StyledCheckoutContainer>
  );
};

export default PlaceOrder;
