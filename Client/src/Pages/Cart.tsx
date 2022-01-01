import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../Utils/CustomHooks";
import AlertDisplay from "../Components/AlertDisplay";
import ProductList, { CartItem } from "../Components/ProductList";
import { Redirect } from "react-router-dom";
import { StyledContainer, StyledCheckout } from "./StyledPages/StyledCart";

const Cart = () => {
  const [TotalAmount, setTotalAmount] = useState(0);
  const [TotalProducts, setTotalProducts] = useState(0);

  const [Params, setParams] = useState<any>({
    method: "GET",
    url: "/api/cart",
  });
  const { Alert, Err, FetchData, loading } = useAxios(Params);

  const SummeryCall = useCallback(() => {
    let amount = 0;
    let Products = 0;
    if (FetchData) {
      FetchData.cart?.forEach((item: CartItem) => {
        amount = amount + item.product.price;
        Products = Products + item.qty;
      });
      setTotalAmount(amount);
      setTotalProducts(Products);
      localStorage.setItem("ProductsAmount", JSON.stringify(amount));
      localStorage.setItem("Cart", JSON.stringify(FetchData?.cart));
    }
  }, [FetchData]);

  useEffect(() => {
    SummeryCall();
  }, [SummeryCall]);

  const UpdateQuantity = (_id: string, quantity: number) => {
    const cartProduct = {
      id: _id,
      qty: quantity,
    };

    setParams({
      method: "POST",
      url: `/api/cart`,
      data: cartProduct,
    });
  };

  const RemoveFromCart = (id: string) => {
    setParams({
      method: "DELETE",
      url: `/api/cart/${id}`,
    });
  };

  if (!localStorage.token) return <Redirect to='/' />;

  if (loading) return <div data-testid='Loading'>Loading</div>;

  if (!FetchData || FetchData.cart?.length === 0)
    return (
      <StyledContainer>
        <h1>Empty Cart</h1>
      </StyledContainer>
    );

  return (
    <Fragment>
      {Err && <AlertDisplay msg={Err} type='fail' />}
      {Alert && <AlertDisplay msg={Alert} type='success' />}
      <StyledContainer>
        <h1>SHOPPING CART</h1>
        {FetchData.cart?.map((item: CartItem) => (
          <ProductList
            key={item._id}
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
