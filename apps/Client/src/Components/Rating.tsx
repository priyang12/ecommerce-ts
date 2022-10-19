import { Fragment } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
type rating = {
  value: number;
  text: string;
  color: string;
};

const Rating = ({ value, text, color }: rating) => {
  return (
    <Fragment>
      <span>
        {value >= 1 ? (
          <FaStar color={color} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar color={color} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar color={color} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar color={color} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar color={color} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt color={color} />
        ) : (
          <FaRegStar color={color} />
        )}
      </span>
      <span>{text && text}</span>
    </Fragment>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
