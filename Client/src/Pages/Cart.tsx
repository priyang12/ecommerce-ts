import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertDisplay from "../Components/AlertDisplay";
import ProductList, { CartItem } from "../Components/ProductList";
import { StyledContainer, StyledCheckout } from "./StyledPages/StyledCart";
import { LoadCartQuery, RemoveFromCartQuery } from "../API/CartAPI";
import { useMutation, useQuery } from "react-query";

const Cart = () => {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);

  const {
    data: FetchData,
    error: Err,
    isLoading: loading,
  } = useQuery(["Cart"], LoadCartQuery);

  const { mutate, isSuccess } = useMutation(["Cart"], RemoveFromCartQuery);

  const CartItems = FetchData?.Cart as CartItem[];

  useEffect(() => {
    if (CartItems?.length !== 0) {
      let TotalProducts = 0;
      let TotalAmount = 0;
      const Total = CartItems?.reduce((acc, item: CartItem) => {
        TotalProducts += item.qty;
        return acc + item.product.price * item.qty;
      }, 0);
      TotalAmount = Math.round(Total * 100) / 100;
      setTotalAmount(TotalAmount);
      setTotalProducts(TotalProducts);
      localStorage.setItem("ProductsAmount", JSON.stringify(TotalProducts));
      localStorage.setItem("Cart", JSON.stringify(CartItems));
    }
  }, [CartItems]);

  const UpdateQuantity = (_id: string, quantity: number) => {
    // updata
    // url: `/api/cart`,
    // data: {
    //   id: _id,
    //   qty: quantity,
    // },
  };

  const RemoveFromCart = (id: string) => {
    mutate(id);
  };

  if (!FetchData) return <div>Server Error</div>;

  if (loading) return <div data-testid='Loading'>Loading</div>;

  if (!CartItems || CartItems?.length === 0)
    return (
      <StyledContainer>
        <h1>Empty Cart</h1>
      </StyledContainer>
    );

  return (
    <Fragment>
      {/* {Err && <AlertDisplay msg={Err} type={false} />} */}
      {isSuccess && <AlertDisplay msg='Product is Deleted' type={true} />}
      <StyledContainer>
        <h1>SHOPPING CART</h1>
        {CartItems?.map((item: CartItem) => (
          <ProductList
            key={item._id}
            styledWidth='auto'
            Cart={item}
            DeleteFromCart={RemoveFromCart}
            UpdateQty={UpdateQuantity}
          />
        ))}

        <StyledContainer>
          <StyledCheckout>
            <h3>SUBTOTAL ({TotalProducts}) ITEMS</h3>
            <p>${TotalAmount}</p>
            <Link className='btn' to='/address'>
              Checkout
            </Link>
          </StyledCheckout>
        </StyledContainer>
      </StyledContainer>
    </Fragment>
  );
};

export default Cart;
