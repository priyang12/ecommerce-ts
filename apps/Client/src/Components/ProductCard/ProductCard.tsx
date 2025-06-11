import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledCardImage,
  StyledCardTitle,
  StyledProductCard,
  StyledProductPrice,
} from "./StyledProductCard";
import Rating from "../Rating";
import type { Product } from "../../Types/interfaces";

interface ProductCardProps {
  product: Product;
}

/**
 *
 *
 * @param {ProductCardProps} {
 *   product: { _id, name, image, price, rating, numReviews },
 * }
 * add full docs later after dummy UI's are added.
 * @return {*}
 */
function ProductCard({
  product: { _id, name, image, price, rating, numReviews },
}: ProductCardProps) {
  const Navigate = useNavigate();

  const EnterProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Navigate(`/product/${_id}`);
    }
  };

  return (
    <StyledProductCard tabIndex={0} onKeyDown={EnterProduct}>
      <Link to={`/product/${_id}`}>
        <StyledCardTitle>{name}</StyledCardTitle>
      </Link>
      <Link to={`/product/${_id}`}>
        <StyledCardImage
          src={image}
          alt={`${name}`}
          srcSet={`${image}?tr=w-225 225w,
                    ${image}?tr=w-350 350w,
                    ${image}?tr=w-700 700w`}
        />
      </Link>

      <Rating value={rating} text={`${numReviews} reviews`} />
      <StyledProductPrice>${price}</StyledProductPrice>
    </StyledProductCard>
  );
}

export default ProductCard;
