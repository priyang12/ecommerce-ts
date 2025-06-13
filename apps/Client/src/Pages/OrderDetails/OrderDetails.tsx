import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrderDetails } from "../../API/OrdersAPI";
import Spinner from "../../Components/Spinner";
import {
  deliveryDone,
  deliveryNotDone,
  ReviewButton,
  StyledDelivery,
  StyledImageContainer,
  StyledListItems,
  StyledOrderDetails,
  StyledOrderItems,
  StyledOrderList,
} from "./StyledOrderDeatails";
import { Helmet } from "react-helmet-async";
import ReviewModel from "./ReviewModel";
import { StyledCheckoutContainer } from "../../Components/UI/CheckoutContainer";
import { css } from "@linaria/core";

const containerWidth = css`
  max-width: 70vw;
`;

/**
 * OrderDetails component
 *
 * Displays detailed information about a specific order, including:
 * - User shipping address
 * - Payment method
 * - List of ordered products
 * - Delivery status
 * - Review submission status per item
 * - Order price breakdown (items, shipping, tax, total)
 *
 *
 * * ## Route
 * - `/OrderStatus/:id`
 *
 * Fetches order data based on the route `id` param using `useOrderDetails`.
 * Shows a spinner while loading, and returns nothing if data is unavailable.
 *
 * Integrates the `ReviewModel` for unreviewed items in delivered orders.
 * Provides semantic HTML and accessible keyboard support for navigating to product pages.
 */
const OrderDetails = () => {
  const Navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: orderDetails, isLoading } = useOrderDetails(id as string);

  const EnterProduct = (
    e: React.KeyboardEvent<HTMLLIElement>,
    ProductID: string
  ) => {
    if (e.key === "Enter") {
      Navigate(`/product/${ProductID}`);
    }
  };

  if (isLoading) return <Spinner />;
  if (!orderDetails) return null;

  return (
    <>
      <Helmet>
        <title>Order Details</title>
        <meta
          name="description"
          content={`
        Order Details
        ${orderDetails._id}
        ${orderDetails.shippingAddress.address}
        ${orderDetails.shippingAddress.city}
        ${orderDetails.paymentMethod}
        `}
        />
      </Helmet>

      <StyledCheckoutContainer className={containerWidth}>
        <StyledOrderDetails>
          <h1>SHIPPING</h1>
          <p>
            Name: &nbsp;
            <span>
              {typeof orderDetails.user !== "string" && orderDetails.user.name}
            </span>
          </p>
          <p>
            Email: &nbsp;
            <span>
              {typeof orderDetails.user !== "string" && orderDetails.user.email}
            </span>
          </p>
          <p>
            Address:
            <span>
              &nbsp;
              {orderDetails.shippingAddress.address}
              &nbsp;
              <>&#44;</>
            </span>
            <span>
              &nbsp;
              {orderDetails.shippingAddress.city} <>&#44;</>
            </span>
            <span>{orderDetails.shippingAddress.postalcode}</span>
          </p>
        </StyledOrderDetails>

        <StyledOrderDetails>
          <h2>PAYMENT METHOD</h2>
          <p>Method: {orderDetails.paymentMethod}</p>
        </StyledOrderDetails>

        <StyledOrderItems>
          <h3>ORDER ITEMS</h3>
          <StyledOrderList>
            {orderDetails.orderItems.map((orderItems: any) => (
              <div
                key={orderItems._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <StyledListItems
                  key={orderItems._id}
                  tabIndex={0}
                  data-testid={`orderItem-${orderItems._id}`}
                  onKeyDown={(e) => EnterProduct(e, orderItems.product._id)}
                >
                  <Link to={`/product/${orderItems.product._id}`} tabIndex={-1}>
                    <StyledImageContainer>
                      <img
                        src={`${orderItems.product.image}`}
                        alt={orderItems.product.name}
                      />
                    </StyledImageContainer>
                  </Link>
                  <Link to={`/product/${orderItems.product._id}`} tabIndex={-1}>
                    {orderItems.product.name}
                  </Link>
                  <p>
                    {orderItems.qty} x ${orderItems.product.price} = $
                    {Math.round(orderItems.qty * orderItems.product.price)}
                  </p>
                </StyledListItems>
                {orderDetails.isDelivered ? (
                  !orderItems.Reviewed && id ? (
                    <ReviewModel
                      ProductID={orderItems.product._id}
                      OrderID={id}
                    />
                  ) : (
                    <ReviewButton>
                      <Link to="/reviews">Review Submitted</Link>
                    </ReviewButton>
                  )
                ) : null}
              </div>
            ))}
          </StyledOrderList>
        </StyledOrderItems>
        <br />
        <StyledOrderDetails>
          <h3>ORDER SUMMARY</h3>
          <ul>
            <li>
              Items : <span> ${orderDetails.itemsPrice}</span>
            </li>
            <li>
              Shipping : <span> ${orderDetails.shippingPrice}</span>
            </li>
            <li>
              Tax : <span> ${orderDetails.taxPrice.toFixed(2)}</span>
            </li>
            <li className="Total">
              Total : <span>${orderDetails.totalPrice}</span>
            </li>
          </ul>
        </StyledOrderDetails>
        {orderDetails.isDelivered ? (
          <StyledDelivery className={deliveryDone}>Delivered</StyledDelivery>
        ) : (
          <StyledDelivery className={deliveryNotDone}>
            Not Delivered
          </StyledDelivery>
        )}
      </StyledCheckoutContainer>
    </>
  );
};

export default OrderDetails;
