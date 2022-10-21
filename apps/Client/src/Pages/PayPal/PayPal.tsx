import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from "react-router";
import axios, { AxiosResponse } from "axios";
import Spinner from "../../Components/Spinner";
import { useMakeOrder } from "../../API/OrdersAPI";
import styled from "styled-components";
import ErrorCatch from "../../Components/ErrorCatch";
import { Helmet } from "react-helmet-async";

type ClientIdRes = AxiosResponse<string>;

const StyledContainer = styled.div`
  margin: auto;
  width: 50%;
  height: 50vh;
  transform: translate(0%, 50%);
`;

function Paypal() {
  const {
    mutate: CallOrder,
    isLoading: isOrderLoading,
    isSuccess: isOrderSuccess,
  } = useMakeOrder();

  const [ClientId, setClientId] = useState("");
  const Order = localStorage.order && JSON.parse(localStorage.order);

  useEffect(() => {
    const GetClientId = async () => {
      const { data: ClientId }: ClientIdRes = await axios.get(
        "api/config/paypal"
      );

      setClientId(ClientId);
    };
    GetClientId();
  }, []);

  const successPaymentHandler = (paymentResult: object) => {
    Order.paymentResult = paymentResult;
    CallOrder(Order);
  };
  const DisplayPaymentError = (err: any) => {
    throw new Error(err);
  };

  if (isOrderLoading || !ClientId) return <Spinner />;

  if (isOrderSuccess) return <Navigate to="/OrderStatus" />;

  if (!Order) return <Navigate to="/" />;

  return (
    <ErrorCatch>
      <StyledContainer>
        <Helmet>
          <title>PayPal</title>
        </Helmet>
        <PayPalScriptProvider options={{ "client-id": ClientId }}>
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: Order.totalPrice,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order?.capture().then(function (details) {
                successPaymentHandler(details);
              }) as any;
            }}
            onError={(err) => DisplayPaymentError(err)}
          />
        </PayPalScriptProvider>
      </StyledContainer>
    </ErrorCatch>
  );
}

export default Paypal;
