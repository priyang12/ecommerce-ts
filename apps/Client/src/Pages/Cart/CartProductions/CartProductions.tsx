import {
  StyledCart as Cart,
  StyledCartContainer as CartContainer,
  StyledCheckout as Checkout,
  StyledCheckoutButton as CheckoutButton,
  StyledEmptyContainer as EmptyContainer,
} from "./StyledCartProductions"; // use your Linaria file
import { Link } from "react-router-dom";
import { CartItem } from "../../PlaceOrder/ProductList";
import { useDeleteCartApi, useLoadCartQuery } from "../../../API/CartAPI";
import CartItemsUI from "./CartItemsUI";
import Spinner from "../../../Components/Spinner";

/**
 * CartContainerComponent
 *
 * Displays all items currently in the user's shopping cart with subtotal and checkout option.
 * Handles deletion of individual cart items and conditionally renders based on cart state.
 *
 * ## Props
 * - `setAlert`: Function to display success or error messages (passed to deletion API).
 *
 * ## State & Calculations
 * - `CartItems`: Parsed from `CartData.products`, defaults to empty array if undefined.
 * - `TotalProducts`: Total quantity of items in cart (used for layout and summary).
 * - `TotalAmount`: Total price, rounded to two decimal places.
 *
 * ## UI Features
 * - Renders a responsive layout using `isWideLayout` when cart size exceeds 10 items.
 * - `CartItemsUI`: Component used to render each cart item with remove functionality.
 * - Displays a loading spinner while fetching cart data.
 * - Shows empty cart message if no products are in the cart.
 * - Subtotal and "Checkout" button are shown when items exist in the cart.
 *
 * ## Routing
 * - Checkout button navigates to `/checkout/address` using React Router.
 */
const CartContainerComponent = ({ setAlert }: { setAlert: any }) => {
  const { data: CartData, isFetching } = useLoadCartQuery();
  const { mutate: deleteCart } = useDeleteCartApi(setAlert);

  const CartItems: CartItem[] = CartData?.products ?? [];
  const TotalProducts = CartItems.reduce((acc, item) => acc + item.qty, 0);
  const TotalAmount =
    Math.round(
      CartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0) *
        100
    ) / 100;

  const deleteCartID = (id: string) => {
    deleteCart(id);
  };

  if (isFetching) return <Spinner />;

  if (CartItems?.length === 0 || !CartItems)
    return (
      <CartContainer isWideLayout={false}>
        <EmptyContainer>
          <h1>Your Cart is Empty</h1>
          <p>Why not add things to it! by going below</p>
        </EmptyContainer>
      </CartContainer>
    );

  const isWideLayout = TotalProducts > 10;

  return (
    <CartContainer isWideLayout={isWideLayout}>
      <Cart>
        {CartItems.map((item, index) => (
          <CartItemsUI
            key={index}
            CartItem={item}
            RemoveFromCart={deleteCartID}
          />
        ))}
      </Cart>

      <Checkout isWideLayout={isWideLayout}>
        <h3>SUBTOTAL ({TotalProducts}) ITEMS</h3>
        <p>$ {TotalAmount}</p>
        <Link to="/checkout/address">
          <CheckoutButton>Checkout</CheckoutButton>
        </Link>
      </Checkout>
    </CartContainer>
  );
};

export default CartContainerComponent;
