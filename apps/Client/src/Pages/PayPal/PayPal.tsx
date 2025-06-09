import React, { Suspense, useEffect, useState } from "react";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from "react-router";
import axios, { AxiosResponse } from "axios";
import Spinner from "../../Components/Spinner";
import { useMakeOrder } from "../../API/OrdersAPI";
import styled from "styled-components";
import ErrorCatch from "../../Components/ErrorCatch";
import { Helmet } from "react-helmet-async";

const PayLottie = React.lazy(() => import("./PayLottie"));

type ClientIdRes = AxiosResponse<string>;

const StyledContainer = styled.div`
  margin: auto;
  width: 50%;
  height: 50vh;
  transform: translate(0%, 50%);
`;

function Paypal() {
  const {
    mutate: placeOrder,
    isLoading: isOrderLoading,
    isSuccess: isOrderSuccess,
  } = useMakeOrder();

  const [ClientId, setClientId] = useState("");
  const {
    state: { order },
  } = useCheckout();

  useEffect(() => {
    const GetClientId = async () => {
      const { data: ClientId }: ClientIdRes = await axios.get(
        "/api/config/paypal"
      );
      setClientId(ClientId);
    };
    GetClientId();
  }, []);

  const successPaymentHandler = (paymentResult: object) => {
    order.paymentResult = paymentResult;
    placeOrder(order);
  };
  const DisplayPaymentError = (err: any) => {
    throw new Error(err);
  };
  if (!order) return <Navigate to="/cart" />;
  if (isOrderSuccess) return <Navigate to="/OrderStatus" />;

  if (isOrderLoading || !ClientId) return <Spinner />;

  return (
    <ErrorCatch>
      <StyledContainer>
        <Helmet>
          <title>PayPal</title>
        </Helmet>
        <PayPalScriptProvider
          options={{
            clientId: ClientId,
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: String(100).toString(),
                      currency_code: "USD",
                    },
                  },
                ],
                intent: "CAPTURE",
              });
            }}
            onApprove={(data, actions) => {
              return actions.order?.capture().then(function (details) {
                successPaymentHandler(details);
              }) as any;
            }}
            onError={(err) => DisplayPaymentError(err)}
          />
          <Suspense fallback={<Spinner />}>
            <PayLottie />
          </Suspense>
        </PayPalScriptProvider>
      </StyledContainer>
    </ErrorCatch>
  );
}

export default Paypal;
