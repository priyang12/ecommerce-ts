import { useParams } from "react-router-dom";
import { useProductReviews } from "../../API/ReviewAPI";
import Rating from "../../Components/Rating";
import {
  NoReview,
  ReviewContainer,
  ReviewItem,
  ReviewList,
  StyledLoadingReview,
} from "./Styled/StyledReview";

/**
 * Component for displaying product reviews.
 *
 * Retrieves the `id` from the URL params and fetches the product's reviews using a custom hook.
 *
 * - Shows a loading state while reviews are being fetched.
 * - Displays a message if there are no reviews.
 * - Renders a list of reviews with user's name, rating, date, and comment.
 *
 * @component
 *
 * @returns {JSX.Element | null} Rendered review section or null if data is not available.
 */

function Reviews({}: {}) {
  const { id } = useParams<{ id: string }>();
  const { data: reviews, isLoading } = useProductReviews(id);

  if (isLoading) {
    return (
      <StyledLoadingReview>
        <p>Fetching Reviews</p>
      </StyledLoadingReview>
    );
  }

  if (!reviews) return null;

  return (
    <ReviewContainer>
      <h1>REVIEWS : {reviews.length}</h1>
      <ReviewList>
        {reviews.length > 0
          ? reviews.map((review) => (
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
          : null}
      </ReviewList>
      {reviews.length === 0 ? <NoReview>No Reviews</NoReview> : null}
    </ReviewContainer>
  );
}

export default Reviews;
