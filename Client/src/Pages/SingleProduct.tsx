import { useState } from "react";
import { useParams } from "react-router-dom";
import { DetailedProduct } from "../interfaces";
import Reviews from "../Components/Reviews";
import Rating from "../Components/Rating";
import Quantity from "../Components/Quantity";
import TimeoutBtn from "../Components/TimeoutBtn";
import AlertDisplay from "../Components/AlertDisplay";

//styles
import {
  StyledContainer,
  StyledProduct,
  StyledDetails,
  StyledCheckout,
} from "../Components/StyledComponents/Productdetails";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { AddToCartQuery } from "../API/CartAPI";
import { queryClient } from "../query";
import Spinner from "../Components/Spinner";

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [Alert, setAlert] = useState("");
  const {
    data: FetchData,
    error: ProductError,
    isLoading: loading,
  }: { data: any; error: any; isLoading: boolean } = useQuery(
    ["products", { id: id }],

    async () => {
      const url = `/api/products/product/${id}`;
      try {
        const res = await axios.get(url);

        return res.data;
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    }
  );
  const { isLoading: ChangingQty, mutate: PostQty } = useMutation(
    AddToCartQuery,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["Cart"]);
        data.msg && setAlert(data.msg); // if data.msg is not null
      },
      onSettled: () => {
        setTimeout(() => {
          setAlert("");
        }, 3000);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );
  const [Qty, setQty] = useState("1");

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(Product._id);
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
      {FetchData && (
        <StyledContainer>
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
                  <label>Qty</label>
                  <select onChange={(e) => setQty(e.target.value)}>
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
              {ChangingQty && <AlertDisplay msg="Adding to cart" type={true} />}
              {Alert && <AlertDisplay msg={Alert} type={true} />}
            </StyledCheckout>
          </StyledProduct>
        </StyledContainer>
      )}
      <Reviews reviews={FetchData?.reviews} />
    </div>
  );
};

export default SingleProduct;
