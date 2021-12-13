import { Fragment, useContext, useState } from "react";
import { useAxios } from "../Utils/CustomHooks";
import { AuthContext } from "../Context/AuthContext";
import { DetailedProduct } from "../types";
import Rating from "./Rating";
import TimeoutBtn from "./TimeoutBtn";
import Quantity from "./Quantity";
import {
  StyledContainer,
  StyledProduct,
  StyledDetails,
  StyledCheckout,
} from "./StyledComponents/Productdetails";

const ProductDetails: React.FC<{ Product: DetailedProduct }> = ({
  Product,
}) => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const [Qty, setQty] = useState("1");
  const [Params, setParams] = useState<any>(null);
  const { Alert, Err } = useAxios(Params);

  const AddToCart = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Add Cart");
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
  if (!Product) return null;

  return (
    <Fragment>
      {Product && (
        <section>
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
                <h3>Price: {Product.price}</h3>
                {Product.countInStock === 0 ? (
                  <h3 style={{ color: "red" }}>Status: Out In Stock</h3>
                ) : (
                  <h3>Status: In Stock</h3>
                )}

                {Product.countInStock !== 0 && (
                  <form onSubmit={AddToCart}>
                    <label>Qty</label>
                    <select onChange={(e) => setQty(e.target.value)}>
                      <Quantity countInStock={Product.countInStock} />
                    </select>
                    <br />

                    {user ? (
                      <TimeoutBtn
                        Time={1000}
                        classValue="btn"
                        FormValue="ADD TO CART"
                      />
                    ) : (
                      <div className="btn-gray">Login/Register</div>
                    )}
                  </form>
                )}
                {Alert && <div className="alert">{Alert}</div>}
                {Err && <div className="alert">{Err}</div>}
              </StyledCheckout>
            </StyledProduct>
          </StyledContainer>
        </section>
      )}
    </Fragment>
  );
};

export default ProductDetails;
