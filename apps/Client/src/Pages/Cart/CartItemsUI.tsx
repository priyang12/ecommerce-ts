import { Link } from "react-router-dom";
import { CartItem } from "../../Components/ProductList";
import { FaTrash } from "react-icons/fa";
import { AiFillSave } from "react-icons/ai";
import {
  IconButton,
  StyledCartCard,
  StyledCartImageContainer,
  StyledCartInfo,
  StyledCartInfoContainer,
  StyledTotalPrice,
} from "./StyledCart";
import { AddWishlistQuery } from "../../API/WishListAPI";
import Quantity from "../../Components/Quantity";
import { PostCartQuery } from "../../API/CartAPI";

function CartItemsUI({
  CartItem,
  RemoveFromCart,
}: {
  CartItem: CartItem;
  RemoveFromCart: (id: string) => void;
}) {
  const {
    mutate: AddToWishlist,
    isLoading: AddingWishList,
    isError,
  } = AddWishlistQuery();

  const PostCart = PostCartQuery();
  const { mutate: UpdateCart } = PostCart;

  return (
    <StyledCartCard>
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
          <li className="price">Price : {CartItem.product.price}</li>
        </StyledCartInfo>
        <div>
          <label htmlFor="selectQty">Quantity</label>

          <select
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
          </select>
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
        </div>
      </StyledCartInfoContainer>
      <StyledTotalPrice>
        <span>Total : {CartItem.product.price * CartItem.qty}</span>
      </StyledTotalPrice>
    </StyledCartCard>
  );
}

export default CartItemsUI;
