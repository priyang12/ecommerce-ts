import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch, useAxios } from "../Utils/CustomHooks";
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

const SingleProduct = () => {
  const { id } = useParams<{ id: string }>();
  const [FetchData, ProductError, loading] = useFetch(
    `/api/products/product/${id}`
  );

  const [Qty, setQty] = useState("1");
  const [Params, setParams] = useState<any>({
    url: "",
  });
  const { Alert, Err } = useAxios(Params);

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("click");
    const CartItem = {
      id: Product._id,
      qty: Qty,
    };
    setParams({
      method: "POST",
      url: "/api/cart",
      data: CartItem,
    });
  };
  console.log(FetchData?.countInStock);
  if (loading) return <div data-testid='Loading'>Loading</div>;

  if (ProductError) return <div className='Error'>{ProductError}</div>;

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
              <div className='star-review'>
                <span className='stars'>
                  <Rating
                    value={Product.rating}
                    text={`${Product.numReviews} reviews`}
                  />
                </span>
              </div>
              <h4>Price: {Product.price}</h4>
              <div className='Description'>
                <div>Description:</div>
                {Product.description}
              </div>
            </StyledDetails>
            <StyledCheckout>
              <h3 className='status-label'>Price: {Product.price}</h3>
              {Product.countInStock <= 0 ? (
                <h3 style={{ color: "red" }}>Status: Out In Stock</h3>
              ) : (
                <h3 className='status-label'>Status: In Stock</h3>
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
                      Time={5000}
                      className='btn'
                      FormValue='ADD TO CART'
                    />
                  ) : (
                    <div className='btn-gray'>Login/Register</div>
                  )}
                </form>
              )}

              {Alert && <AlertDisplay msg={Alert} type={true} />}
              {Err && <AlertDisplay msg={Err} type={false} />}
            </StyledCheckout>
          </StyledProduct>
        </StyledContainer>
      )}
      <Reviews reviews={FetchData?.reviews} />
    </div>
  );
};

export default SingleProduct;
