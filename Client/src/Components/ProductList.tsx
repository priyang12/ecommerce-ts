import { FC } from "react";
import { Link } from "react-router-dom";
import { ListProduct } from "../interfaces";
import Quantity from "./Quantity";
import {
  StyledItem,
  StyledPrice,
  StyledProductList,
  StyledQuantity,
} from "./StyledComponents/StyledProductList";

export type CartItem = {
  _id: string;
  product: ListProduct;
  qty: number;
};

type PropType = {
  Cart: CartItem;
  styledWidth: string;
  DeleteFromCart?: (id: string) => void;
  UpdateQty?: (_id: string, quantity: number) => void;
};

const ProductList: FC<PropType> = ({
  Cart,
  DeleteFromCart,
  UpdateQty,
  styledWidth,
}) => {
  const { _id, product, qty } = Cart;

  return (
    <StyledProductList>
      <StyledItem theme={{ width: styledWidth }}>
        <img src={product.image} alt={Image.name} />
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <StyledPrice>
          {UpdateQty ? product.price : `${product.price} x ${qty}`}
        </StyledPrice>
        <StyledQuantity>
          <label>{UpdateQty ? "Qty :" : "Total"}</label>
          {UpdateQty ? (
            <select
              data-testid="selectQty"
              value={qty}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                UpdateQty(product._id, parseInt(e.target.value))
              }
            >
              <Quantity countInStock={product.countInStock} />
            </select>
          ) : (
            <div> : {Math.round(qty * product.price)}</div>
          )}
        </StyledQuantity>
        {DeleteFromCart && (
          <button
            data-testid="DeleteIcon"
            className="btn"
            onClick={() => DeleteFromCart(product._id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        )}
      </StyledItem>
    </StyledProductList>
  );
};

export default ProductList;
