import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useLoadCartQuery } from "../../API/CartAPI";
import { useNavigate } from "react-router-dom";
import Spinner from "../../Components/Spinner";

interface ShippingAddress {
  address: string;
  city: string;
  postalcode: string;
}

interface CheckoutState {
  address?: ShippingAddress;
  payMethod?: string;
  order?: any;
}

type Action =
  | { type: "SET_ADDRESS"; payload: ShippingAddress }
  | { type: "SET_PAYMENT_METHOD"; payload: string }
  | { type: "SET_ORDER"; payload: any }
  | { type: "RESET" };

// export for testing
export const CheckoutContext = createContext<{
  state: CheckoutState;
  dispatch: React.Dispatch<Action>;
}>({
  state: {},
  dispatch: () => null,
});

const reducer = (state: CheckoutState, action: Action): CheckoutState => {
  switch (action.type) {
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_PAYMENT_METHOD":
      return { ...state, payMethod: action.payload };
    case "SET_ORDER":
      return { ...state, order: action.payload };
    case "RESET":
      return {};
    default:
      return state;
  }
};

const storedAddress = localStorage.getItem("checkout-address");
const initialState: CheckoutState = {
  address: storedAddress ? JSON.parse(storedAddress) : undefined,
  payMethod: undefined,
  order: undefined,
};

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const Navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: Cart, isSuccess, isError, isLoading } = useLoadCartQuery();

  useEffect(() => {
    if (state.address) {
      localStorage.setItem("checkout-address", JSON.stringify(state.address));
    }
  }, [state.address]);

  useEffect(() => {
    if ((isSuccess && Cart.products.length === 0) || isError) {
      Navigate("/cart");
    }
  }, [Cart, isError, isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
