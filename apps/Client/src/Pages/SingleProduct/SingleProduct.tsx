import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImageMagnifier } from "@priyang/react-component-lib";
import { useAuth } from "../../Context/Authentication/AuthContext";
import { usePostCartQuery } from "../../API/CartAPI";
import { Helmet } from "react-helmet-async";
import { useSingleProduct } from "../../API/ProductAPI";
import { useAddWishlistQuery } from "../../API/WishListAPI";
import Quantity, {
  StyledQuantityOptions,
} from "../../Components/Select/Quantity";
import Reviews from "./Reviews";
import Rating from "../../Components/Rating";
import Select from "../../Components/Select";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import LoadingButton from "../../Components/LoadingButton";
import SuggestionProducts from "./SuggestionProducts";

//styles
import {
  StyledContainer,
  StyledProduct,
  StyledDetails,
  StyledCheckout,
  StyledImageContainer,
  StyledQuantity,
  StyledLoginButton,
  cartButton,
  wishlistButton,
  outOfStock,
  haveOfStock,
} from "./Styled/StyledSingleProduct";

const SingleProduct = () => {
  const { state } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState("1");

  const {
    data: Product,
    error: ProductError,
    isLoading: fetchingProduct,
  } = useSingleProduct(id as string, false);

  const { mutate: AddWishlist, isLoading: AddingWishList } =
    useAddWishlistQuery();

  const { isLoading: CartMutation, mutate: postQty } = usePostCartQuery();

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    postQty({
      ProductId: Product?._id,
      qty: parseInt(qty),
    });
  };

  if (fetchingProduct) return <Spinner />;

  if (ProductError) return <div className="Error">{ProductError.message}</div>;

  return (
    <>
      <Helmet>
        <title>{Product?.name}</title>
        <meta name="description" content={Product?.description} />
      </Helmet>
      {Product && (
        <StyledContainer>
          {CartMutation && <AlertDisplay msg="Adding to cart" type={"info"} />}
          {AddingWishList && (
            <AlertDisplay msg="Adding to wishlist" type={"info"} />
          )}
          <StyledProduct>
            <StyledImageContainer>
              <ImageMagnifier
                src={Product.image}
                width={""}
                height={""}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={1}
              />
            </StyledImageContainer>
            <StyledDetails>
              <h1>{Product.name}</h1>
              <div className="star-review">
                <span className="stars">
                  <Rating
                    value={Product.rating}
                    text={`${Product.numReviews} reviews`}
                  />
                </span>
              </div>
              <div>
                Brand: <span className="highlight">{Product.brand}</span>
              </div>
              <div>
                Category: <span className="highlight">{Product.category}</span>
              </div>
              <br />
              <div className="Description">
                Description: <span>{Product.description}</span>
              </div>
              <br />
            </StyledDetails>

            <StyledCheckout>
              <h2 className="status-label">Price: {Product.price}</h2>
              {Product.countInStock <= 0 ? (
                <p className={outOfStock}>Status: Out In Stock</p>
              ) : (
                <p className={haveOfStock}>Status: In Stock</p>
              )}
            </StyledCheckout>

            <StyledQuantity>
              {Product.countInStock > 0 ? (
                <form onSubmit={AddToCart}>
                  <label htmlFor="Quantity" aria-label="Quantity of product">
                    Quantity
                  </label>
                  <Select
                    style={{
                      width: "90%",
                    }}
                    id="Quantity"
                    name="Quantity"
                    onChange={(e) => setQty(e.target.value)}
                  >
                    <Quantity countInStock={Product.countInStock}>
                      <StyledQuantityOptions key={"initial"} value={qty}>
                        select number default to {qty}
                      </StyledQuantityOptions>
                    </Quantity>
                  </Select>

                  <br />
                  {state.token ? (
                    <LoadingButton
                      isLoading={CartMutation}
                      loadingText={"Adding To Cart"}
                      className={cartButton}
                    >
                      TO CART
                    </LoadingButton>
                  ) : (
                    <StyledLoginButton>Login/Register</StyledLoginButton>
                  )}
                  {state.token ? (
                    <LoadingButton
                      className={wishlistButton}
                      isLoading={AddingWishList}
                      loadingText={"Adding To Wishlist"}
                      onClick={(e) => {
                        e.preventDefault();
                        AddWishlist(Product._id);
                      }}
                    >
                      WISH LIST
                    </LoadingButton>
                  ) : null}
                </form>
              ) : null}
            </StyledQuantity>
          </StyledProduct>
        </StyledContainer>
      )}
      <Reviews />
      <br />
      {Product ? (
        <SuggestionProducts brand={Product.brand} category={Product.category} />
      ) : null}
    </>
  );
};

export default SingleProduct;
