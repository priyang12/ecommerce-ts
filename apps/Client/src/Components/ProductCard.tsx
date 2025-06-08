import {
  StyledRating,
  StyledProductCard,
  StyledProductPrice,
} from "./StyledComponents/Products";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import type { Product } from "../Types/interfaces";

type CardProps = {
  product: Product;
};

function ProductCard({
  product: { _id, name, image, price, rating, numReviews },
}: CardProps) {
  const Navigate = useNavigate();
  const EnterProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Navigate(`/product/${_id}`);
    }
  };
  return (
    <StyledProductCard
      className="product"
      tabIndex={0}
      onKeyDown={EnterProduct}
    >
      <Link to={`/product/${_id}`}>
        <h1 className="CardTitle">{name}</h1>
      </Link>
      <Link to={`/product/${_id}`}>
        <img
          src={image}
          alt={`${name}`}
          srcSet={`${image}?tr=w-225 225w,
        ${image}?tr=w-350 350w,
        ${image}?tr=w-700 700w`}
        />
      </Link>
      <StyledProductPrice>${price}</StyledProductPrice>
      <StyledRating>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </StyledRating>
    </StyledProductCard>
  );
}

export default ProductCard;
