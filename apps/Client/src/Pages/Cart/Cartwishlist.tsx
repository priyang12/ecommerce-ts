import React from "react";
import { Link } from "react-router-dom";
import { usePostCartQuery } from "../../API/CartAPI";
import { useFilterWishlist } from "../../API/WishListAPI";
import LoadingButton from "../../Components/LoadingButton";
import Select from "../../Components/Select";
import Quantity from "../../Components/Select/Quantity";
import Spinner from "../../Components/Spinner";
import { ImageContainer } from "../Reviews/StyledReview";
import { StyledWishlistItem, StyledWishlistProduct } from "./StyledCart";

interface FormData {
  selectQty: { value: string };
}

function Cartwishlist() {
  const { data: WishList, isLoading } = useFilterWishlist(
    JSON.stringify({
      created: -1,
    })
  );
  const { isLoading: CartMutation, mutate: PostQty } = usePostCartQuery();
  if (isLoading) return <Spinner />;
  if (!WishList) return null;

  const SubmitToCart = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const { selectQty } = e.target as typeof e.target & FormData;

    PostQty({
      ProductId: id,
      qty: parseInt(selectQty.value),
    });
  };

  return (
    <>
      <div>
        <h1>Wishlist</h1>
        <StyledWishlistProduct>
          {WishList?.products.map((item) => (
            <StyledWishlistItem key={item._id}>
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
                  isLoading={CartMutation}
                  loadingText={"Adding To Cart"}
                  className="btn"
                >
                  TO CART
                </LoadingButton>
              </form>
            </StyledWishlistItem>
          ))}
        </StyledWishlistProduct>
      </div>
    </>
  );
}

export default Cartwishlist;
