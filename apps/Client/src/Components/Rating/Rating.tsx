import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { StyledRatingContainer, StyledStars } from "./StyledRating";

type rating = {
  value: number;
  text?: string;
  color?: string;
};

const starColor = "#f8e825";
const totalStar = 5;
const halfStar = 0.5;

/**
 * Rating component for rendering star Icons from rating value.
 *
 * @component
 * @param {string} props.value - rating value.
 * @param {string} props.text - optional text value which can be render beside stars.
 * @param {string} props.color - optional color value of stars.
 *
 * @returns {JSX.Element} The rendered Rating component.
 *
 * @example
 * <Rating value={1.5} text={`${numReviews} reviews`} />
 */
function Rating({ value, text, color = starColor }: rating) {
  return (
    <StyledRatingContainer>
      <StyledStars>
        {Array.from({ length: totalStar }).map((_, index) => {
          const starValue = index + 1;
          return (
            <span key={index}>
              {value >= starValue ? (
                <FaStar role="img" aria-label="full-star" color={color} />
              ) : value >= starValue - halfStar ? (
                <FaStarHalfAlt
                  role="img"
                  aria-label="half-star"
                  color={color}
                />
              ) : (
                <FaRegStar role="img" aria-label="empty-star" color={color} />
              )}
            </span>
          );
        })}
      </StyledStars>
      <span>{text ? text : null}</span>
    </StyledRatingContainer>
  );
}

export default Rating;
