import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AlertDisplay from "../../Components/AlertDisplay";
import CartWishList from "./CartWishListSection/CartWishList";
import CartContainer from "./CartProductions/CartProductions";
import { StyledContainer } from "./StyledCart";

/**
 * Cart Page Component
 *
 * Displays the user's shopping cart with current cart items and wishlist.
 * Handles alert messaging for cart actions and integrates metadata for SEO.
 *
 * ## Route
 * - `/cart`
 *
 * ## State Management
 * - `Alert`: Local state used to show temporary success or error messages.
 * - `setAlert`: Passed down to child components (e.g. `CartContainer`) for triggering alerts.
 *
 * ## Components Used
 * - `AlertDisplay`: Shows success or error messages based on cart actions.
 * - `CartContainer`: Renders the list of products added to the cart; can trigger alerts.
 * - `CartWishList`: Displays items saved for later or wished for.
 *
 * ## UI Features
 * - Page title and metadata managed with `react-helmet-async`.
 * - Styled layout using `StyledContainer` for consistent theming.
 *
 * ## Notes
 * - Alert messages are conditionally rendered based on `Alert.msg`.
 */
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
        <CartWishList />
      </StyledContainer>
    </>
  );
};

export default Cart;
