import { StyledRating, StyledProductCard } from "./StyledComponents/Products";
import { Link } from "react-router-dom";
import { Product } from "../interfaces";
import Rating from "./Rating";

type props = {
  product: Product;
};

const ProductCard: React.FC<props> = ({ product }) => {
  const { _id, name, image, price, rating, numReviews } = product;
  if (!product) return null;
  return (
    <StyledProductCard>
      <Link to={`/product/${_id}`}>
        <h4 className='CardTitle'>{name}</h4>
      </Link>
      <Link to={`/product/${_id}`}>
        <img src={image} alt='' />
      </Link>
      <h3 className='card-text'>${price}</h3>
      <StyledRating>
        <Rating value={rating} text={`${numReviews} reviews`} />
      </StyledRating>
    </StyledProductCard>
  );
};

export default ProductCard;
