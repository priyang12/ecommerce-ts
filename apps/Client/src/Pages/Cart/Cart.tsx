import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AlertDisplay from "../../Components/AlertDisplay";
import { StyledContainer } from "./StyledCart";
import CartWishList from "./Cartwishlist";
import CartContainer from "./CartProductions/CartContainer";

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
        {/* <CartWishList /> */}
      </StyledContainer>
    </>
  );
};

export default Cart;
