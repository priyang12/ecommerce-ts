import { FC } from "react";
import { Link } from "react-router-dom";
import { ListProduct } from "../types";
import Quantity from "./Quantity";
import {
  StyledItem,
  StyledProductList,
  StyledQuantity,
} from "./StyledComponents/StyledProductList";

// interface List {
//   Product: ListProduct;
//   type: string;
// }
// interface CartList extends ListProduct {
//   ClickFunction: (id: string) => void;
// }
// interface OrderList extends ListProduct {
//   qty: number;
// }

export type CartItem = {
  _id: string;
  product: ListProduct;
  qty: number;
};

type PropType = {
  Cart: CartItem;
  type: string;
  DeleteFromCart: (id: string) => void;
  UpdateQty: (_id: string, quantity: number) => void;
};

const ProductList: FC<PropType> = ({
  Cart,
  type,
  DeleteFromCart,
  UpdateQty,
}) => {
  const { _id, product, qty } = Cart;

  return (
    <StyledProductList>
      <StyledItem>
        <img src={product.image} alt={Image.name} />
        <Link to={`/product/${product._id}`}>{product.name}</Link>
        <p>{product.price}</p>
        <StyledQuantity>
          <label>Qty</label>
          {type === "cart" ? (
            <select
              data-testid="selectQty"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                UpdateQty(product._id, parseInt(e.target.value))
              }
            >
              <Quantity countInStock={product.countInStock} />
            </select>
          ) : (
            <div>{qty}</div>
          )}
        </StyledQuantity>
        {type === "cart" && (
          <button
            data-testid="DeleteIcon"
            className="btn"
            onClick={() => DeleteFromCart(_id)}
          >
            <i className="fas fa-trash">delete</i>
          </button>
        )}
      </StyledItem>
    </StyledProductList>
  );
};

export default ProductList;
