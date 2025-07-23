import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  StyledCardImage,
  StyledCardTitle,
  StyledProductCard,
  StyledProductPrice,
  DealTag,
  DeliveryInfo,
  StyledCardBottomContainer,
} from "./StyledProductCard";
import Rating from "../Rating";
import type { Product } from "../../Types/interfaces";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component displays individual product details such as image, name, price, rating,
 * and optional promotional badges like "Limited Time Deal" or "Free Delivery".
 *
 * @component
 * @param {Object} props - Props passed to the component
 * @param {Product} props.product - Product details to display
 * @param {string} props.product._id - Unique identifier for the product
 * @param {string} props.product.name - Name of the product
 * @param {string} props.product.image - URL of the product image
 * @param {number} props.product.price - Price of the product
 * @param {number} props.product.rating - Average rating of the product
 * @param {number} props.product.numReviews - Number of reviews for the product
 *
 * @returns {JSX.Element} Rendered product card
 *
 */
function ProductCard({
  product: { _id, name, image, price, rating, numReviews },
}: ProductCardProps) {
  const Navigate = useNavigate();

  // Temporary UI flags for promotional badges
  const showLimitedDeal = Math.random() < 0.4; // ~40% chance
  const showFreeDelivery = Math.random() < 0.5; // ~50% chance

  const EnterProduct = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      Navigate(`/product/${_id}`);
    }
  };

  return (
    <StyledProductCard
      tabIndex={0}
      onKeyDown={EnterProduct}
      role="article"
      aria-labelledby={`${name}-title`}
    >
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
      <StyledCardBottomContainer>
        {showLimitedDeal && <DealTag> Limited Time Deal</DealTag>}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </div>
        {showFreeDelivery && (
          <DeliveryInfo> FREE delivery within 1 week</DeliveryInfo>
        )}
        <StyledProductPrice>${price} Only</StyledProductPrice>
      </StyledCardBottomContainer>
    </StyledProductCard>
  );
}

export default ProductCard;
