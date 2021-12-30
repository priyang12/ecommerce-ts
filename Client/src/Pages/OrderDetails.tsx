import { Fragment, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { CartItem } from "../Components/ProductList";
import Spinner from "../Components/Spinner";
import TimeoutBtn from "../Components/TimeoutBtn";
import { AuthContext } from "../Context/AuthContext";
import { useFetch, useForm } from "../Utils/CustomHooks";

const OrderDetails = () => {
  const { state } = useContext(AuthContext);
  const [Review, onchangeReview] = useForm({
    rating: "",
    Comment: "",
  });
  const { id } = useParams<{ id: string }>();
  const { Err, FetchData, loading } = useFetch(`/api/orders/order/${id}`);

  const SubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Review);
  };

  if (loading) return <Spinner />;
  if (Err) return <div>{Err}</div>;
  if (!FetchData) return <div>Server Error Please Try Again</div>;

  return (
    <Fragment>
      <section className='container' id='order'>
        <div className='left'>
          <div className='detail'>
            <h1>SHIPPING</h1>
            <p>Name: {FetchData.user.name}</p>
            <p>Email: {FetchData.user.email}</p>
            <p>
              Address: {FetchData.shippingAddress.address},{" "}
              {FetchData.shippingAddress.city},{" "}
              {FetchData.shippingAddress.country} ,{" "}
              {FetchData.shippingAddress.postalcode}
            </p>
          </div>
          <div className='detail'>
            <h1>PAYMENT METHOD</h1>
            <p>Method: {FetchData.paymentMethod}</p>
          </div>
          <div className='details'>
            <h1>ORDER ITEMS</h1>
            <ul className='list'>
              {FetchData.orderItems.map((orderitems: CartItem) => (
                <li className='list-item' key={orderitems._id}>
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
                    (FetchData.user.id === state.user.id &&
                      FetchData.isDelivered && (
                        <form className='review' onSubmit={SubmitReview}>
                          <label>Rating</label>
                          <select className='rating'>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </select>
                          <label>Comment</label>
                          <input
                            type='textarea'
                            onChange={onchangeReview}
                          ></input>
                          <input type='submit' />
                        </form>
                      ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='right'>
          <ul>
            <h1>ORDER SUMMARY</h1>
            <li>
              Items : <span> ${FetchData.itemsPrice}</span>
            </li>
            <li>
              Shipping : <span> ${FetchData.shippingPrice}</span>
            </li>
            <li>
              Tax : <span> ${FetchData.taxPrice}</span>
            </li>
            <li>
              Total : <span>{FetchData.totalPrice}</span>
            </li>
            <li></li>
            {FetchData.isDelivered ? (
              <p className='success'>Delivered</p>
            ) : state.user?.isAdmin ? (
              <TimeoutBtn
                classValue='btn'
                FormValue='Mark as Deliver'
                Time={5}
              />
            ) : (
              <p className='alert'>Not Delivered</p>
            )}
          </ul>
        </div>
      </section>
    </Fragment>
  );
};

export default OrderDetails;
