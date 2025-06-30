import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { AiFillSave } from "react-icons/ai";
import Select from "../../../Components/Select";
import Quantity from "../../../Components/Select/Quantity";
import { useAddWishlistQuery } from "../../../API/WishListAPI";
import { usePostCartQuery } from "../../../API/CartAPI";
import type { CartItem } from "../../PlaceOrder/ProductList";

import {
  CartCard as StyledCartCard,
  CartImageContainer as StyledCartImageContainer,
  CartInfo as StyledCartInfo,
  CartInfoContainer as StyledCartInfoContainer,
  TotalPrice as StyledTotalPrice,
  IconButton,
} from "./StyledCartProductions";

function CartItemsUI({
  CartItem,
  RemoveFromCart,
}: {
  CartItem: CartItem;
  RemoveFromCart: (id: string) => void;
}) {
  const { mutate: AddToWishlist } = useAddWishlistQuery();
  const { mutate: UpdateCart } = usePostCartQuery();

  return (
    <StyledCartCard data-testid="cart-item">
      <StyledCartImageContainer>
        <img src={CartItem.product.image} alt={CartItem.product.name} />
      </StyledCartImageContainer>
      <StyledCartInfoContainer>
        <StyledCartInfo>
          <li className="ProductName">
            <Link to={`/product/${CartItem.product._id}`}>
              {CartItem.product.name}
            </Link>
          </li>
          <li className="price">Price : ${CartItem.product.price}</li>
        </StyledCartInfo>
        <>
          <label htmlFor="selectQty">Quantity</label>
          <Select
            id="selectQty"
            name="selectQty"
            data-testid="selectQty"
            value={CartItem.qty}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              UpdateCart({
                ProductId: CartItem.product._id,
                qty: parseInt(e.target.value),
              });
            }}
          >
            <Quantity countInStock={CartItem.product.countInStock} />
          </Select>
          <IconButton
            data-testid="DeleteIcon"
            onClick={() => {
              RemoveFromCart(CartItem.product._id);
            }}
          >
            <FaTrash />
            delete
          </IconButton>
          <IconButton
            onClick={() => {
              AddToWishlist(CartItem.product._id);
            }}
          >
            <AiFillSave />
            Save for later
          </IconButton>
        </>
      </StyledCartInfoContainer>
      <StyledTotalPrice>
        <span>
          Total: ${(CartItem.product.price * CartItem.qty).toFixed(2)}
        </span>
      </StyledTotalPrice>
    </StyledCartCard>
  );
}

export default CartItemsUI;
