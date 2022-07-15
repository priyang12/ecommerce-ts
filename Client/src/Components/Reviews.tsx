import React, { Fragment } from "react";
import { Review } from "../interfaces";
import Rating from "./Rating";
import {
  ReviewContainer,
  ReviewItem,
  ReviewList,
} from "./StyledComponents/Review";

const Reviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;
  return (
    <Fragment>
      <ReviewContainer>
        <h1>REVIEWS</h1>
        <ReviewList>
          {reviews.map((review) => (
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
          ))}
        </ReviewList>
      </ReviewContainer>
    </Fragment>
  );
};

export default Reviews;
