import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrderDetails } from "../../API/OrdersAPI";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import Spinner from "../../Components/Spinner";
import {
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

const OrderDetails = () => {
  const Navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: OrderDetails,
    isLoading: isOrderDetailsLoading,
    error: OrderDetailsError,
    isError: isOrderDetailsError,
  }: {
    data: any;
    isLoading: boolean;
    error: any;
    isError: boolean;
  } = useOrderDetails(id as string);

  const EnterProduct = (
    e: React.KeyboardEvent<HTMLLIElement>,
    ProductID: string
  ) => {
    if (e.key === "Enter") {
      Navigate(`/product/${ProductID}`);
    }
  };

  if (isOrderDetailsLoading) return <Spinner />;
  if (isOrderDetailsError) return <div>{OrderDetailsError}</div>;
  if (!OrderDetails) return null;

  return (
    <>
      <Helmet>
        <title>Order Details</title>
        <meta
          name="description"
          content={`
        Order Details
        ${OrderDetails._id}
        ${OrderDetails.shippingAddress.address}
        ${OrderDetails.shippingAddress.city}
        ${OrderDetails.paymentMethod}
        `}
        />
      </Helmet>
      <StyledPaymentContainer theme={{ maxWidth: "70vw" }}>
        <StyledOrderDetails>
          <h1>SHIPPING</h1>
          <p>
            Name: <span>{OrderDetails.user.name}</span>
          </p>
          <p>
            Email: <span>{OrderDetails.user.email}</span>
          </p>
          <p>
            Address:
            <span>
              &nbsp;
              {OrderDetails.shippingAddress.address}
              &nbsp;
              <>&#44;</>
            </span>
            <span>
              &nbsp;
              {OrderDetails.shippingAddress.city} <>&#44;</>
            </span>
            <span>{OrderDetails.shippingAddress.postalcode}</span>
          </p>
        </StyledOrderDetails>

        <StyledOrderDetails>
          <h2>PAYMENT METHOD</h2>
          <p>Method: {OrderDetails.paymentMethod}</p>
        </StyledOrderDetails>

        <StyledOrderItems>
          <h3>ORDER ITEMS</h3>
          <StyledOrderList>
            {OrderDetails.orderItems.map((orderItems: any) => (
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
                {OrderDetails.isDelivered ? (
                  !orderItems.Reviewed ? (
                    <ReviewModel
                      ProductID={orderItems.product._id}
                      OrderID={id as string}
                    />
                  ) : (
                    <ReviewButton
                      className="success"
                      style={{
                        width: "auto",
                      }}
                    >
                      <Link to="/reviews" className="success">
                        Review Submitted
                      </Link>
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
              Items : <span> ${OrderDetails.itemsPrice}</span>
            </li>
            <li>
              Shipping : <span> ${OrderDetails.shippingPrice}</span>
            </li>
            <li>
              Tax : <span> ${OrderDetails.taxPrice}</span>
            </li>
            <li className="Total">
              Total : <span>${OrderDetails.totalPrice}</span>
            </li>
          </ul>
        </StyledOrderDetails>
        {OrderDetails.isDelivered ? (
          <StyledDelivery
            theme={{
              color: "green",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
          >
            Delivered
          </StyledDelivery>
        ) : (
          <StyledDelivery
            theme={{
              color: "red",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            }}
          >
            Not Delivered
          </StyledDelivery>
        )}
      </StyledPaymentContainer>
    </>
  );
};

export default OrderDetails;
