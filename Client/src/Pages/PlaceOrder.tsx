import React, { useContext, useEffect } from "react";
import TimeoutBtn from "../Components/TimeoutBtn";
import ProductList from "../Components/ProductList";
import Navigators from "../Components/Navigators";
import { Redirect, useHistory } from "react-router";
import { Address, Cart } from "../types";
import { AuthContext } from "../Context/AuthContext";
import { StyledPaymentContainer } from "../Components/StyledComponents/StyledPayment";

const PlaceOrder = () => {
  const history = useHistory();
  const { state } = useContext(AuthContext);
  const { token } = state;

  useEffect(() => {
    if (!token) {
      history.push("/");
    }
  }, [token, history]);

  const Cart: Cart[] = localStorage.Cart && JSON.parse(localStorage.Cart);
  const Address: Address =
    localStorage.address && JSON.parse(localStorage.address);
  const PayMethod = localStorage.payMethod;
  const ProductsAmount =
    localStorage.ProductsAmount && JSON.parse(localStorage.ProductsAmount);

  let ExtraAmount: number = 0;

  const addDecimals = (num: number) => {
    const result = Number((Math.round(num * 100) / 100).toFixed(2));
    ExtraAmount += result;
    return result;
  };
  const PlaceTheOrder = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shipping = addDecimals(ProductsAmount > 500 ? 0 : 100);
    const Tax = addDecimals(ProductsAmount * 0.1);
    const Order = {
      orderItems: Cart,
      shippingAddress: Address,
      paymentMethod: PayMethod,
      itemsPrice: ProductsAmount,
      taxPrice: 0.1 * ProductsAmount,
      shippingPrice: ProductsAmount > 500 ? 0 : 100,
      totalPrice: Math.round(shipping + Tax + ProductsAmount),
    };
    localStorage.setItem("order", JSON.stringify(Order));
    history.push("/PayPal");
  };

  if (!Cart || !Address || !PayMethod || !ProductsAmount)
    return <Redirect to='/cart' />;

  if (Cart?.length === 0) return <Redirect to='/' />;

  return (
    <StyledPaymentContainer>
      <Navigators />
      <div className='OrderDetails'>
        <div className='detail'>
          <h1>SHIPPING </h1>
          <p>
            Address: {Address.homeAddress} , {Address.city} ,
            {Address.postalCode}, {Address.country}
          </p>
        </div>
        <div className='detail'>
          <h1>PAYMENT METHOD</h1>
          <p>Method: {PayMethod}</p>
        </div>
        <div className='order-details'>
          <h1>ORDER ITEMS</h1>
          <ul className='order-list'>
            {Cart.map((item) => (
              <ProductList Cart={item} key={item._id} />
            ))}
          </ul>
        </div>
      </div>
      <div className='OrderSummary'>
        <form onSubmit={PlaceTheOrder} data-testid='PlaceOrder'>
          <ul className='checkout'>
            <h1>ORDER SUMMARY</h1>
            <li>
              Items Cost : <span> {ProductsAmount}</span>
            </li>
            <li>
              Shipping Cost :
              <span data-testid='ShippingCost'>
                {addDecimals(ProductsAmount > 500 ? 0 : 100)}
              </span>
            </li>
            <li>
              Tax Cost :
              <span data-testid='TaxCost'>
                {addDecimals(0.1 * ProductsAmount)}
              </span>
            </li>
            <li>
              Total Cost :
              <span data-testid='TotalAmount'>
                {ExtraAmount + ProductsAmount}
              </span>
            </li>
            <li></li>
          </ul>
          {/* <TimeoutBtn classValue='btn' FormValue='Place Order' Time={4000} /> */}
          <TimeoutBtn Time={1000} classname='btn' FormValue='PlaceOrder' />
        </form>
      </div>
    </StyledPaymentContainer>
  );
};

export default PlaceOrder;
