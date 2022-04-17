import { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { LoadOrderDetails, MarkOrderAsDelivered } from "../API/OrdersAPI";
import Spinner from "../Components/Spinner";
import { CartItem } from "../Components/ProductList";
import AlertDisplay from "../Components/AlertDisplay";
import { StyledPaymentContainer } from "../Components/StyledComponents/StyledPayment";
import { AuthContext } from "../Context/Authentication/AuthContext";

import {
  StyledListItems,
  StyledOrderDetails,
  StyledOrderList,
} from "./StyledPages/StyledOrderDeatails";
import { queryClient } from "../query";

const OrderDetails = () => {
  const { state } = useContext(AuthContext);
  const [Alert, setAlert] = useState({
    msg: "",
    result: false,
  });
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
  } = useQuery([`OrderDetails/${id}`], () => LoadOrderDetails(id));

  const { mutate: MarkAsDeliver, isLoading: Mutating } = useMutation(
    MarkOrderAsDelivered,
    {
      onSuccess: (data) => {
        setAlert({ msg: data.msg, result: true });
        queryClient.invalidateQueries([`OrderDetails/${id}`]);
      },
    }
  );

  const SubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (isLoading || Mutating) return <Spinner />;
  if (isError) return <div>{error}</div>;
  if (!OrderDetails) return <div>Server Error Please Try Again</div>;

  return (
    <>
      <StyledPaymentContainer theme={{ maxWidth: "70vw" }}>
        {Alert.msg && <AlertDisplay msg={Alert.msg} type={Alert.result} />}
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
                MarkAsDeliver(id);
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
