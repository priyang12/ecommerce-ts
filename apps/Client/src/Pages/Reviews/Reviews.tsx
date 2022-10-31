import { useUserReviews } from "../../API/ReviewAPI";
import Spinner from "../../Components/Spinner";
import { StyledContainer } from "../SingleProduct/StyledSingleProduct";
import {
  ImageContainer,
  ReviewContainer,
  ReviewOrder,
  ReviewProduct,
  ReviewsList,
  UserReview,
} from "./StyledReview";
import Rating from "../../Components/Rating";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";

function Reviews() {
  const { data: Reviews, isLoading } = useUserReviews();
  if (isLoading) return <Spinner />;
  if (!Reviews) return null;

  return (
    <StyledContainer>
      <h1>Reviews </h1>
      <h2>Total Reviews : {Reviews.length}</h2>
      <ReviewsList>
        {Reviews.map((item) => (
          <ReviewItem item={item} key={item._id} />
        ))}
      </ReviewsList>
    </StyledContainer>
  );
}
function ReviewItem({ item }: any) {
  return (
    <ReviewContainer>
      <ReviewOrder>
        {typeof item.order === "string" ? (
          item.order
        ) : (
          <>
            <h2>Order</h2>
            <p>
              Items Price : <span>${item.order.itemsPrice}</span>
            </p>
            <p>
              Total Price : <span>${item.order.totalPrice}</span>
            </p>
            <p>
              Payment Method : <span>{item.order.paymentMethod}</span>
            </p>
            <p>
              Order Place Date :&nbsp;
              <span>
                {" "}
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

      <ReviewProduct>
        <h2>Product</h2>
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
        <h2>User Review</h2>
        <p>
          Review : <span>{item.comment}</span>
        </p>
        <div id="rating">
          <span>Given Rating :{item.rating}</span>
          <Rating value={item.rating} text={``} />
        </div>
        <p>
          Review : <span>{item.approved ? "approved" : "unapproved"}</span>
        </p>
        <p> {format(parseISO(item.createdAt), "yyyy-MM-dd' 'HH:mm")}</p>
      </UserReview>
    </ReviewContainer>
  );
}

export default Reviews;
