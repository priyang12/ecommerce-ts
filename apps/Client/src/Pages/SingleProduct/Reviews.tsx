// import { Review } from "../../interfaces";
import { useReviews } from "../../API/ReviewAPI";
import Rating from "../../Components/Rating";
import {
  NoReview,
  ReviewContainer,
  ReviewItem,
  ReviewList,
} from "./StyledReview";

function Reviews({ id }: { id: string }) {
  const { data: reviews } = useReviews(id);
  if (!reviews) return null;
  return (
    <>
      <ReviewContainer>
        <h1>REVIEWS : {reviews.length}</h1>
        <ReviewList>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewItem key={review._id}>
                <strong>
                  {typeof review.user !== "string" && review.user.name}
                </strong>
                <div className="star-review">
                  <span className="stars">
                    <Rating value={review.rating} text="" />
                  </span>
                </div>
                <p>{review.createdAt.slice(0, 10)}</p>
                <p>{review.comment}</p>
              </ReviewItem>
            ))
          ) : (
            <NoReview>No Reviews</NoReview>
          )}
        </ReviewList>
      </ReviewContainer>
    </>
  );
}

export default Reviews;
