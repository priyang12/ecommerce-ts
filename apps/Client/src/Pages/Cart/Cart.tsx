import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AlertDisplay from "../../Components/AlertDisplay";
import CartWishlist from "./CartWishListSection/CartWishlist";
import CartContainer from "./CartProductions/CartProductions";
import { StyledContainer } from "./StyledCart";

const Cart = () => {
  const [Alert, setAlert] = useState({
    msg: "",
    type: false,
  });

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart " />
      </Helmet>
      {Alert.msg && (
        <AlertDisplay msg={Alert.msg} type={Alert.type ? "success" : "error"} />
      )}

      <StyledContainer>
        <h1>SHOPPING CART</h1>
        <CartContainer setAlert={setAlert} />
        <CartWishlist />
      </StyledContainer>
    </>
  );
};

export default Cart;
