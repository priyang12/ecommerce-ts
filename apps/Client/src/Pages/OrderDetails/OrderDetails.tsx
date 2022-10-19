import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useOrderDelivered, useOrderDetails } from "../../API/OrdersAPI";
import { CartItem } from "../../Components/ProductList";
import { StyledPaymentContainer } from "../../Components/StyledComponents/StyledPayment";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import {
  StyledListItems,
  StyledOrderDetails,
  StyledOrderList,
} from "./StyledOrderDeatails";

const OrderDetails = () => {
  const { state } = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();

  const {
    data: OrderDetails,
    isLoading,
    error,
    isError,
  }: {
    data: any;
    isLoading: boolean;
    error: any;
    isError: boolean;
  } = useOrderDetails(id);

  const {
    mutate: MarkAsDeliver,
    isLoading: Mutating,
    isSuccess,
  } = useOrderDelivered();

  const SubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isLoading || Mutating) return <Spinner />;
  if (isError) return <div>{error}</div>;
  if (!OrderDetails) return <div>Server Error Please Try Again</div>;

  return (
    <>
      <StyledPaymentContainer theme={{ maxWidth: "70vw" }}>
        {isSuccess && <AlertDisplay msg="Order Delivered" type={"success"} />}
        <div className="left">
          <StyledOrderDetails>
            <h1>SHIPPING</h1>
            <p>
              Name: <span>{OrderDetails.user.name}</span>
            </p>
            <p>
              Email: <span>{OrderDetails.user.email}</span>
            </p>
            <p>
              Address: {OrderDetails.shippingAddress.address},{" "}
              {OrderDetails.shippingAddress.city},{" "}
              {OrderDetails.shippingAddress.country} ,{" "}
              {OrderDetails.shippingAddress.postalcode}
            </p>
          </StyledOrderDetails>
          <StyledOrderDetails>
            <h1>PAYMENT METHOD</h1>
            <p>Method: {OrderDetails.paymentMethod}</p>
          </StyledOrderDetails>
          <div className="details">
            <h1>ORDER ITEMS</h1>
            <StyledOrderList>
              {OrderDetails.orderItems.map((orderItems: CartItem) => (
                <StyledListItems key={orderItems._id}>
                  <p>
                    {orderItems.qty} x ${orderItems.product.price} = $
                    {Math.round(orderItems.qty * orderItems.product.price)}
                  </p>
                  <img
                    src={`..${orderItems.product.image}`}
                    alt={orderItems.product.name}
                  />
                  <Link to={`/product/${orderItems.product._id}`}>
                    {orderItems.product.name}
                  </Link>
                </StyledListItems>
              ))}
            </StyledOrderList>
          </div>
        </div>
        <StyledOrderDetails>
          <h1>ORDER SUMMARY</h1>
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
          <li></li>
          {OrderDetails.isDelivered ? (
            <p className="success">Delivered</p>
          ) : state.user?.isAdmin ? (
            <button
              className="btn"
              onClick={() => {
                MarkAsDeliver(id as string);
              }}
            >
              Mark as Delivered
            </button>
          ) : (
            <p className="alert">Not Delivered</p>
          )}
        </StyledOrderDetails>
        {OrderDetails.user._id === state.user?._id && OrderDetails.isDelivered && (
          <form className="review" onSubmit={SubmitReview}>
            <label>Rating</label>
            <select className="rating">
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
            <label>Comment</label>
            {/* <input type="textarea" onChange={onchangeReview}></input> */}
            <input type="submit" />
          </form>
        )}
      </StyledPaymentContainer>
    </>
  );
};

export default OrderDetails;
