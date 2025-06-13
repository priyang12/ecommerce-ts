import React from "react";
import { Link } from "react-router-dom";
import { usePostCartQuery } from "../../../API/CartAPI";
import { useFilterWishlist } from "../../../API/WishListAPI";
import LoadingButton from "../../../Components/LoadingButton";
import Select from "../../../Components/Select";
import Quantity from "../../../Components/Select/Quantity";
import Spinner from "../../../Components/Spinner";

import {
  StyledWishlistProduct as WishlistProduct,
  StyledWishlistItem as WishlistItem,
  StyledImageContainer as ImageContainer,
} from "./StyledCartWishList";

interface FormData {
  selectQty: { value: string };
}

function CartWishlist() {
  const { data: wishList, isLoading } = useFilterWishlist(
    JSON.stringify({
      created: -1,
    })
  );
  const { isLoading: addingToCart, mutate: PostQty } = usePostCartQuery();

  const SubmitToCart = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const { selectQty } = e.target as typeof e.target & FormData;

    PostQty({
      ProductId: id,
      qty: parseInt(selectQty.value),
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <h1>Wishlist</h1>
      <WishlistProduct>
        {wishList?.products.map((item) => (
          <WishlistItem key={item._id}>
            <ImageContainer>
              <Link to={`/product/${item._id}`}>
                <img src={item.image} alt={item.name} loading="lazy" />
              </Link>
            </ImageContainer>
            <p>{item.name}</p>
            <p>{item.description}</p>
            <p>Price : ${item.price}</p>
            <form onSubmit={(e) => SubmitToCart(e, item._id)}>
              <label htmlFor="selectQty">Quantity</label>
              <br />
              <Select id="selectQty" name="selectQty" data-testid="selectQty">
                <Quantity countInStock={item.countInStock} />
              </Select>
              <br />
              <LoadingButton
                isLoading={addingToCart}
                loadingText={"Adding To Cart"}
              >
                TO CART
              </LoadingButton>
            </form>
          </WishlistItem>
        ))}
      </WishlistProduct>
    </div>
  );
}

export default CartWishlist;
