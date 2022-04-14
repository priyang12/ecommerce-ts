import { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { LoadOrderDetails } from "../API/OrdersAPI";
import { CartItem } from "../Components/ProductList";
import Spinner from "../Components/Spinner";
import TimeoutBtn from "../Components/TimeoutBtn";
import { AuthContext } from "../Context/Authentication/AuthContext";
import { useForm } from "../Utils/CustomHooks";

const OrderDetails = () => {
  const { state } = useContext(AuthContext);
  const [Review, onchangeReview] = useForm({
    rating: "",
    Comment: "",
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

  const SubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Review);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>{error}</div>;
  if (!OrderDetails) return <div>Server Error Please Try Again</div>;

  return (
    <Fragment>
      <section className="container" id="order">
        <div className="left">
          <div className="detail">
            <h1>SHIPPING</h1>
            <p>Name: {OrderDetails.user.name}</p>
            <p>Email: {OrderDetails.user.email}</p>
            <p>
              Address: {OrderDetails.shippingAddress.address},{" "}
              {OrderDetails.shippingAddress.city},{" "}
              {OrderDetails.shippingAddress.country} ,{" "}
              {OrderDetails.shippingAddress.postalcode}
            </p>
          </div>
          <div className="detail">
            <h1>PAYMENT METHOD</h1>
            <p>Method: {OrderDetails.paymentMethod}</p>
          </div>
          <div className="details">
            <h1>ORDER ITEMS</h1>
            <ul className="list">
              {OrderDetails.orderItems.map((orderitems: CartItem) => (
                <li className="list-item" key={orderitems._id}>
                  <img
                    src={`..${orderitems.product.image}`}
                    alt={orderitems.product.name}
                  />
                  <Link to={`/product/${orderitems.product._id}`}>
                    {orderitems.product.name}
                  </Link>
                  <p>
                    {orderitems.qty} x ${orderitems.product.price} = $
                    {Math.round(orderitems.qty * orderitems.product.price)}
                  </p>

                  {/* Review the Product If it is User's product */}
                  {!state.user?.isAdmin ||
                    (OrderDetails.user._id === state.user._id &&
                      OrderDetails.isDelivered && (
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
                          <input
                            type="textarea"
                            onChange={onchangeReview}
                          ></input>
                          <input type="submit" />
                        </form>
                      ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="right">
          <ul>
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
            <li>
              Total : <span>{OrderDetails.totalPrice}</span>
            </li>
            <li></li>
            {OrderDetails.isDelivered ? (
              <p className="success">Delivered</p>
            ) : state.user?.isAdmin ? (
              <TimeoutBtn
                className="btn"
                FormValue="Mark as Deliver"
                Time={5000}
              />
            ) : (
              <p className="alert">Not Delivered</p>
            )}
          </ul>
        </div>
      </section>
    </Fragment>
  );
};

export default OrderDetails;
