import { Link } from "react-router-dom";
import { useUserReviews } from "../../API/ReviewAPI";
import Spinner from "../../Components/Spinner";
import Rating from "../../Components/Rating";
import { format, parseISO } from "date-fns";

import {
  StyledReviewsContainer as ReviewsContainer,
  StyledImageContainer as ImageContainer,
  StyledReviewContainer as ReviewContainer,
  StyledReviewOrder as ReviewOrder,
  StyledReviewProduct as ReviewProduct,
  StyledReviewsList as ReviewsList,
  StyledUserReview as UserReview,
} from "./StyledReview";

/**
 * Reviews Page Component
 *
 * Displays a list of user-submitted product reviews, including product details,
 * order history, and user feedback. Enables users to review past purchases
 * with links to corresponding product and order pages.
 *
 * ## Route
 * - `/reviews`
 *
 * ## Navigation
 * - Includes links to:
 *    - Individual product pages.
 *    - Detailed order status pages.
 *
 */
function Reviews() {
  const { data: reviews, isLoading } = useUserReviews();

  if (isLoading) return <Spinner />;
  if (!reviews) return null;

  return (
    <ReviewsContainer>
      <h1>Reviews</h1>
      <h2>Total Reviews : {reviews.length}</h2>
      <ReviewsList>
        {reviews.map((item) => (
          <ReviewItem item={item} key={item._id} />
        ))}
      </ReviewsList>
    </ReviewsContainer>
  );
}

function ReviewItem({ item }: any) {
  return (
    <ReviewContainer>
      <ReviewProduct>
        <h3>Product</h3>
        {typeof item.product === "string" ? (
          <Link to={`/product/${item.product}`}>
            <div>{item.product}</div>
          </Link>
        ) : (
          <>
            <p>
              Product Name : &nbsp;
              <Link to={`/product/${item.product._id}`}>
                <span>{item.product.name}</span>
              </Link>
            </p>

            <p>
              Brand : <span>{item.product.brand}</span>
            </p>
            <p>
              Price : <span>$ {item.product.price}</span>
            </p>
            <ImageContainer>
              <Link to={`/product/${item.product._id}`}>
                <img src={item.product.image} alt={item.product.name} />
              </Link>
            </ImageContainer>
          </>
        )}
      </ReviewProduct>
      <UserReview>
        <h3>User Review</h3>
        <p>
          Review : <span>{item.comment}</span>
        </p>
        <div className="rating">
          <span>Rating :{item.rating}</span>
          <Rating value={item.rating} text={``} />
        </div>
        <p>
          Review : <span>{item.approved ? "approved" : "unapproved"}</span>
        </p>
        <p> {format(parseISO(item.createdAt), "yyyy-MM-dd' 'HH:mm")}</p>
      </UserReview>
      <ReviewOrder>
        {typeof item.order === "string" ? (
          item.order
        ) : (
          <>
            <h3>Order</h3>
            <p>
              Items Price : $<span>{item.order.itemsPrice}</span>
            </p>
            <p>
              Total Price : $<span>{item.order.totalPrice}</span>
            </p>
            <p>
              Payment Method : <span>{item.order.paymentMethod}</span>
            </p>
            <p>
              Order Place Date :&nbsp;
              <span>
                {format(
                  parseISO(item.order.createdAt as string),
                  "dd-MM-yyyy'"
                )}
              </span>
            </p>
            <p>
              Order Delivered at :&nbsp;
              <span>
                {format(
                  parseISO(item.order.deliveredAt as string),
                  "dd-MM-yyyy'"
                )}
              </span>
            </p>
            <Link to={`/OrderStatus/${item.order._id}`}>
              <button className="btn">Order Details</button>
            </Link>
          </>
        )}
      </ReviewOrder>
    </ReviewContainer>
  );
}

export default Reviews;
