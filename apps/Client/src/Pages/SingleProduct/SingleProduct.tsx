import { useState } from "react";
import { useParams } from "react-router-dom";
import { ImageMagnifier } from "@priyang/react-component-lib";
import Reviews from "./Reviews";
import Rating from "../../Components/Rating";
import Quantity, {
  StyledQuantityOptions,
} from "../../Components/Select/Quantity";
import Select from "../../Components/Select";
import AlertDisplay from "../../Components/AlertDisplay";
import { usePostCartQuery } from "../../API/CartAPI";
import { Helmet } from "react-helmet-async";
import { useSingleProduct } from "../../API/ProductAPI";
import { useAddWishlistQuery } from "../../API/WishListAPI";
import Spinner from "../../Components/Spinner";
import LoadingButton from "../../Components/LoadingButton";
import { useAuth } from "../../Context/Authentication/AuthContext";
import SuggestionProducts from "./SuggestionProducts";

//styles
import {
  StyledContainer,
  StyledProduct,
  StyledDetails,
  StyledCheckout,
  StyledImageContainer,
  StyledQuantity,
  CheckFormControl,
} from "./Styled/StyledSingleProduct";

const SingleProduct = () => {
  const { state } = useAuth();
  const { id } = useParams<{ id: string }>();

  const {
    data: Product,
    error: ProductError,
    isLoading: loading,
  } = useSingleProduct(id as string, false);

  const { mutate: AddWishlist, isLoading: AddingWishList } =
    useAddWishlistQuery();

  const { isLoading: CartMutation, mutate: PostQty } = usePostCartQuery();

  const [Qty, setQty] = useState("1");

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    PostQty({
      ProductId: Product?._id,
      qty: parseInt(Qty),
    });
  };

  if (loading) return <Spinner />;

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
              <div>Brand: {Product.brand}</div>
              <div>Category: {Product.category}</div>
              <br />
              <div className="Description">
                Description: <span>{Product.description}</span>
              </div>
              <br />
            </StyledDetails>

            <StyledCheckout>
              <h2 className="status-label">Price: {Product.price}</h2>
              {Product.countInStock <= 0 ? (
                <p style={{ color: "red" }}>Status: Out In Stock</p>
              ) : (
                <p className="status-label">Status: In Stock</p>
              )}
            </StyledCheckout>

            <StyledQuantity>
              {Product.countInStock > 0 && (
                <form onSubmit={AddToCart}>
                  <CheckFormControl>
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
                        <StyledQuantityOptions key={"initial"} value={""}>
                          select number
                        </StyledQuantityOptions>
                      </Quantity>
                    </Select>
                  </CheckFormControl>
                  <br />

                  {state.token ? (
                    <LoadingButton
                      isLoading={CartMutation}
                      loadingText={"Adding To Cart"}
                      className="btn"
                    >
                      TO CART
                    </LoadingButton>
                  ) : (
                    <div className="btn-gray">Login/Register</div>
                  )}

                  {state.token ? (
                    <LoadingButton
                      className="btn"
                      style={{
                        backgroundColor: " #626d78",
                      }}
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
              )}
            </StyledQuantity>
          </StyledProduct>
        </StyledContainer>
      )}
      {id && <Reviews id={id as string} />}
      <br />
      {Product ? (
        <SuggestionProducts brand={Product.brand} category={Product.category} />
      ) : null}
    </>
  );
};

export default SingleProduct;
