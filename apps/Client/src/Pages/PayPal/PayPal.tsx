import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router";
import axios from "axios";

import {
  StyledContainer,
  FragmentContainer,
} from "../../Components/StyledComponents/Container";
import { useMutation } from "react-query";
import Spinner from "../../Components/Spinner";
import AlertDisplay from "../../Components/AlertDisplay";

function Paypal() {
  const Navigate = useNavigate();
  const {
    mutate: CallOrder,
    isLoading,
    isSuccess,
    isIdle,
    error: OrderError,
  } = useMutation(async (order) => {
    const res = await axios.post("/api/orders", order);
    return res;
  });
  const [PaymentErrors, setPaymentErrors] = useState("");
  const Order = localStorage.order && JSON.parse(localStorage.order);
  const [SdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        setSdkReady(true);
      };
    };
    addPayPalScript();
  }, []);

  const successPaymentHandler = (paymentResult: object) => {
    Order.payment = paymentResult;
    CallOrder(Order);
  };
  const DisplayPaymentError = (err: any) => {
    setPaymentErrors(err);
  };

  if (isLoading || !isIdle) return <Spinner />;

  if (isSuccess) return Navigate("/OrderStatus");

  if (!Order) return Navigate("/");

  if (PaymentErrors) return <div className="Error">{PaymentErrors}</div>;

  return (
    <StyledContainer theme={{ marginTop: "2" }}>
      {!SdkReady ? (
        <Spinner />
      ) : (
        <FragmentContainer>
          {OrderError && (
            <AlertDisplay msg="Error While Placing Order" type={false} />
          )}
          <PayPalButton
            amount={Order.totalPrice}
            onSuccess={successPaymentHandler}
            onError={DisplayPaymentError}
          />
        </FragmentContainer>
      )}
    </StyledContainer>
  );
}

export default Paypal;
