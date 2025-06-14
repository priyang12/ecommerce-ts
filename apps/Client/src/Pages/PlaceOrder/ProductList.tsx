import { Link } from "react-router-dom";
import { CartProducts, ListProduct } from "../../Types/interfaces";
import {
  StyledItem as Item,
  StyledPrice as Price,
  StyledQuantity as Quantity,
} from "./StyledPlaceOrder";

export type CartItem = {
  _id: string;
  product: ListProduct;
  qty: number;
};

type PropType = {
  Cart: CartProducts;
  styledWidth: string;
};

function OrderItem({ Cart, styledWidth }: PropType) {
  const { product, qty } = Cart;
  return (
    <Item theme={{ width: styledWidth }}>
      <div>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={Image.name} />
        </Link>
        <Link to={`/product/${product._id}`}>{product.name}</Link>
      </div>
      <div>
        <Price>{`${product.price} x ${qty}`}</Price>
        <Quantity>
          <label htmlFor="selectQty">Total</label>
          <div>: {Math.round(qty * product.price)}</div>
        </Quantity>
      </div>
    </Item>
  );
}

export default OrderItem;
