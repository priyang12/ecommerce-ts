import { Link } from "react-router-dom";
import { CartProducts, ListProduct } from "../../Types/interfaces";
import { StyledItem, StyledPrice, StyledQuantity } from "./StyledProductList";

export type CartItem = {
  _id: string;
  product: ListProduct;
  qty: number;
};

type PropType = {
  Cart: CartProducts;
  styledWidth: string;
};

function ProductList({ Cart, styledWidth }: PropType) {
  const { product, qty } = Cart;
  return (
    <StyledItem theme={{ width: styledWidth }}>
      <div>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={Image.name} />
        </Link>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </div>
      <div>
        <StyledPrice>{`${product.price} x ${qty}`}</StyledPrice>
        <StyledQuantity>
          <label htmlFor="selectQty">Total</label>
          <div>: {Math.round(qty * product.price)}</div>
        </StyledQuantity>
      </div>
    </StyledItem>
  );
}

export default ProductList;
