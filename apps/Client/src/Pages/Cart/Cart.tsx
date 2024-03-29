import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AlertDisplay from "../../Components/AlertDisplay";
import Spinner from "../../Components/Spinner";
import {
  StyledContainer,
  StyledCheckout,
  StyledCart,
  StyledCartContainer,
} from "./StyledCart";
import { useDeleteCartApi, useLoadCartQuery } from "../../API/CartAPI";
import { DetailedProduct } from "../../interfaces";
import CartItemsUI from "./CartItemsUI";
import Cartwishlist from "./Cartwishlist";

type CartItem = {
  _id: string;
  product: Pick<
    DetailedProduct,
    "_id" | "countInStock" | "name" | "price" | "image"
  >;
  qty: number;
};

const Cart = () => {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);
  const [CartItems, setCart] = useState<CartItem[]>([]);

  const [Alert, setAlert] = useState({
    msg: "",
    type: false,
  });

  const { data: Cart, isFetching, isLoading: loading } = useLoadCartQuery();

  const { mutate: DeleteCart, isLoading: Deleting } =
    useDeleteCartApi(setAlert);

  const RemoveFromCart = (id: string) => {
    DeleteCart(id);
  };

  useEffect(() => {
    if (Cart) {
      setCart(Cart.products);
    }
  }, [Cart]);

  useEffect(() => {
    if (CartItems?.length !== 0) {
      let TotalProducts = 0;
      let TotalAmount = 0;
      const Total = CartItems?.reduce((acc: any, item: CartItem) => {
        TotalProducts += item.qty;
        return acc + item.product.price * item.qty;
      }, 0);
      TotalAmount = Math.round(Total * 100) / 100;
      setTotalAmount(TotalAmount);
      setTotalProducts(TotalProducts);
    }
  }, [CartItems]);

  if (loading || isFetching) return <Spinner />;

  if (CartItems?.length === 0 || !CartItems)
    return (
      <StyledContainer>
        <h1>Your Cart is Empty</h1>
      </StyledContainer>
    );

  return (
    <>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Cart " />
      </Helmet>
      {Alert.msg && (
        <AlertDisplay msg={Alert.msg} type={Alert.type ? "success" : "error"} />
      )}
      {Deleting && <AlertDisplay type={"warning"} msg="Deleting" />}
      <StyledContainer>
        <h1>SHOPPING CART</h1>
        <StyledCartContainer>
          <StyledCart>
            {CartItems.map((item, index) => (
              <CartItemsUI
                key={index}
                CartItem={item}
                RemoveFromCart={RemoveFromCart}
              />
            ))}
          </StyledCart>

          <div>
            <StyledCheckout>
              <h3>SUBTOTAL ({TotalProducts}) ITEMS</h3>
              <p>$ {TotalAmount}</p>
              <Link className="btn" to="/address">
                Checkout
              </Link>
            </StyledCheckout>
          </div>
        </StyledCartContainer>
        <Cartwishlist />
      </StyledContainer>
    </>
  );
};

export default Cart;
