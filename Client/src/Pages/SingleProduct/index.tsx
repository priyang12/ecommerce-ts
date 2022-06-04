import { useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedProduct } from "../../interfaces";
import Reviews from "../../Components/Reviews";
import Rating from "../../Components/Rating";
import Quantity from "../../Components/Quantity";
import TimeoutBtn from "../../Components/TimeoutBtn";
import AlertDisplay from "../../Components/AlertDisplay";

//styles
import {
  StyledContainer,
  StyledProduct,
  StyledDetails,
  StyledCheckout,
} from "../../Components/StyledComponents/Productdetails";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { AddToCartQuery } from "../../API/CartAPI";
import { queryClient } from "../../query";
import Spinner from "../../Components/Spinner";
import { Helmet } from "react-helmet";
import { SingleProductCall } from "../../API/ProductAPI";
import { AddWishlistQuery } from "../../API/WishListAPI";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [Alert, setAlert] = useState("");
  const {
    data: FetchData,
    error: ProductError,
    isLoading: loading,
  }: { data: any; error: any; isLoading: boolean } = useQuery(
    [`product/${id}`, id],
    () => SingleProductCall(id)
  );

  const { mutate: AddToWishlist, isLoading: WishListLoading } = useMutation(
    AddWishlistQuery,
    {
      onSuccess: (data: any) => {
        setAlert(data.msg);
      },
    }
  );

  const { isLoading: ChangingQty, mutate: PostQty } = useMutation(
    AddToCartQuery,
    {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries(["Cart"]);
        data.msg && setAlert(data.msg); // if data.msg is not null
      },
      onSettled: () => {
        setTimeout(() => {
          setAlert("");
        }, 3000);
      },
      onError: (error: any) => {
        setAlert(error.msg);
      },
    }
  );

  const {
    data: WishListResult,
    isLoading: AddingWishList,
  }: {
    data: any;
    isLoading: boolean;
  } = useMutation(AddWishlistQuery, {
    onSuccess: (data: any) => {
      data.msg && setAlert(data.msg); // if data.msg is not null
    },
    onError: (error: any) => {
      setAlert(error.msg);
    },
  });
  const [Qty, setQty] = useState("1");

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    PostQty({
      id: Product._id,
      qty: parseInt(Qty),
    });
  };

  if (loading) return <Spinner />;

  if (ProductError) return <div className="Error">{ProductError}</div>;

  if (!FetchData) return null;

  const Product: DetailedProduct = FetchData;

  return (
    <div>
      <Helmet>
        <title>{Product.name}</title>
        <meta name="description" content={Product.description} />
      </Helmet>
      {FetchData && (
        <StyledContainer>
          {Alert && <AlertDisplay msg={Alert} type={true} />}
          <StyledProduct>
            <img src={Product.image} alt={Product.name} />
            <StyledDetails>
              <h2>{Product.name}</h2>
              <div className="star-review">
                <span className="stars">
                  <Rating
                    value={Product.rating}
                    text={`${Product.numReviews} reviews`}
                  />
                </span>
              </div>
              <h4>Price: {Product.price}</h4>
              <div className="Description">
                <div>Description:</div>
                {Product.description}
              </div>
            </StyledDetails>
            <StyledCheckout>
              <h3 className="status-label">Price: {Product.price}</h3>
              {Product.countInStock <= 0 ? (
                <h3 style={{ color: "red" }}>Status: Out In Stock</h3>
              ) : (
                <h3 className="status-label">Status: In Stock</h3>
              )}

              {Product.countInStock > 0 && (
                <form onSubmit={AddToCart}>
                  <label htmlFor="Qty">Qty</label>
                  <select id="Qty" onChange={(e) => setQty(e.target.value)}>
                    <Quantity countInStock={Product.countInStock} />
                  </select>
                  <br />

                  {localStorage.token ? (
                    <TimeoutBtn
                      Time={1000}
                      className="btn"
                      FormValue="ADD TO CART"
                    />
                  ) : (
                    <div className="btn-gray">Login/Register</div>
                  )}
                </form>
              )}
              <button
                className="btn btn-gray"
                onClick={() => {
                  AddToWishlist(Product._id);
                }}
              >
                WISHLIST
              </button>
              {ChangingQty && <AlertDisplay msg="Adding to cart" type={true} />}
              {WishListLoading && (
                <AlertDisplay msg="Adding to wishlist" type={true} />
              )}
              {AddingWishList && (
                <AlertDisplay msg={WishListResult.msg} type={true} />
              )}
            </StyledCheckout>
          </StyledProduct>
        </StyledContainer>
      )}
      <Reviews reviews={FetchData?.reviews} />
    </div>
  );
};

export default SingleProduct;
