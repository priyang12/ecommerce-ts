import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Redirect } from "react-router";
import { useAxios } from "../Utils/CustomHooks";
import AlertDisplay from "../Components/AlertDisplay";
import axios from "axios";
import {
  StyledContainer,
  FragmentContainer,
} from "../Components/StyledComponents/Container";

const Paypal = () => {
  const [Params, setParams] = useState<any>({
    method: "",
    url: "",
  });
  const { Alert, Err, FetchData, loading } = useAxios(Params);
  const [PaymentErrors, setPaymentErrors] = useState("");
  const Order = localStorage.order && JSON.parse(localStorage.order);
  const [SdkReady, setSdkReady] = useState(false);
  console.log("asdasd");
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      console.log(document.body);
      document.body.appendChild(script);
      script.onload = () => {
        setSdkReady(true);
      };
    };
    addPayPalScript();
  }, []);

  const successPaymentHandler = (paymentResult: object) => {
    console.log(typeof paymentResult);
    Order.payment = paymentResult;
    console.log(Order);
    setParams({
      method: "POST",
      url: "/api/orders",
      data: Order,
    });
    if (FetchData?.order?._id) {
      setTimeout(() => {
        <Redirect to='/OrderStatus' />;
      }, 1000);
    }
  };
  const DisplayPaymentError = (err: any) => {
    setPaymentErrors(err);
  };

  if (!Order) return <Redirect to='/' />;
  if (loading)
    return (
      <div className='loading' data-testid='Loading'>
        Loading
      </div>
    );
  if (PaymentErrors) return <div className='Error'>{PaymentErrors}</div>;
  if (Err) return <AlertDisplay msg={Err} type={false} />;
  return (
    <StyledContainer theme={{ marginTop: "2" }}>
      {!SdkReady ? (
        <div className='loading' data-testid='Loading'>
          Loading
        </div>
      ) : (
        <FragmentContainer>
          {Alert && <AlertDisplay msg={Alert} type={true} />}
          <br />
          <PayPalButton
            amount={Order.totalPrice}
            onSuccess={successPaymentHandler}
            onError={DisplayPaymentError}
          />
        </FragmentContainer>
      )}
    </StyledContainer>
  );
};

export default Paypal;
