import React, { Suspense, useEffect, useState } from "react";
import { useCheckout } from "../../Context/CheckoutContext/CheckoutContext";
import { Helmet } from "react-helmet-async";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navigate } from "react-router";
import { useMakeOrder } from "../../API/OrdersAPI";
import axios, { AxiosResponse } from "axios";
import Spinner from "../../Components/Spinner";
import ErrorCatch from "../../Components/ErrorCatch";

import {
  StyledCard as Card,
  StyledContainer as Container,
  StyledHeading as Heading,
  StyledLottieWrapper as LottieWrapper,
  StyledSpinnerWrapper as SpinnerWrapper,
} from "./StyledPayPal";

const PayLottie = React.lazy(() => import("./PayLottie"));

type ClientIdRes = AxiosResponse<string>;

/**
 * PayPal Checkout Page Component
 *
 * Renders the PayPal payment interface and handles order finalization logic.
 * Integrates PayPal's React SDK for rendering payment buttons and capturing payment details.
 * Uses order data from the `CheckoutContext` and submits final order via `useMakeOrder` mutation.
 *
 * ## Route
 * - `/checkout/paypal`
 *
 * ## Payment Logic
 * - Fetches PayPal Client ID from `/api/config/paypal`
 * - Creates and approves PayPal order via `PayPalButtons`
 * - On successful payment, attaches payment result to order and places it via `useMakeOrder`
 *
 * ## Conditions & Redirects
 * - Redirects to `/cart` if no order is found
 * - Redirects to `/OrderStatus` after successful order placement
 * - Shows loading spinner while fetching PayPal config or submitting order
 */
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

  if (isOrderLoading || !ClientId)
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );

  return (
    <ErrorCatch>
      <Helmet>
        <title>PayPal Payment</title>
      </Helmet>
      <Container>
        <Card>
          <Heading>Complete Your Payment</Heading>
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
              <LottieWrapper>
                <PayLottie />
              </LottieWrapper>
            </Suspense>
          </PayPalScriptProvider>
        </Card>
      </Container>
    </ErrorCatch>
  );
}

export default Paypal;
