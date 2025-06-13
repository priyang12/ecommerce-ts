import {
  StyledCart as Cart,
  StyledCartContainer as CartContainer,
  StyledCheckout as Checkout,
} from "./StyledCartProductions"; // use your Linaria file
import { Link } from "react-router-dom";
import { CartItem } from "../../PlaceOrder/ProductList";
import { useDeleteCartApi, useLoadCartQuery } from "../../../API/CartAPI";
import CartItemsUI from "./CartItemsUI";
import Spinner from "../../../Components/Spinner";

const CartContainerComponent = ({ setAlert }: { setAlert: any }) => {
  const { mutate: deleteCart } = useDeleteCartApi(setAlert);
  const { data: CartData, isFetching } = useLoadCartQuery();

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

  if (CartItems?.length === 0 || !CartItems) return <h1>Your Cart is Empty</h1>;

  if (isFetching) return <Spinner />;

  return (
    <CartContainer>
      <Cart>
        {CartItems.map((item, index) => (
          <CartItemsUI
            key={index}
            CartItem={item}
            RemoveFromCart={deleteCartID}
          />
        ))}
      </Cart>

      <Checkout>
        <h3>SUBTOTAL ({TotalProducts}) ITEMS</h3>
        <p>$ {TotalAmount}</p>
        <Link className="btn" to="/checkout/address">
          Checkout
        </Link>
      </Checkout>
    </CartContainer>
  );
};

export default CartContainerComponent;
