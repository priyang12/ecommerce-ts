import { Fragment, useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Redirect } from "react-router";
import { useAxios } from "../Utils/CustomHooks";
import AlertDisplay from "../Components/AlertDisplay";
import axios from "axios";

const Paypal = () => {
  const [Params, setParams] = useState<any>(null);
  const { Alert, Err, FetchData, loading } = useAxios(Params);
  const [PaymentErrors, setPaymentErrors] = useState("");
  const Order = localStorage.order && JSON.parse(localStorage.order);
  const [SdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/config/paypal");
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
      data: Order,
    });
    if (FetchData?.order?._id) {
      setTimeout(() => {
        <Redirect to="/OrderStatus" />;
      }, 1000);
    }
  };
  console.log("herer");
  const DisplayPaymentError = (err: any) => {
    console.log(err);
    setPaymentErrors(err);
  };

  if (!Order) return <Redirect to="/" />;
  if (loading)
    return (
      <div className="loading" data-testid="Loading">
        Loading
      </div>
    );
  if (Err) return <div className="Error">{Err}</div>;
  if (PaymentErrors) return <div className="Error">{PaymentErrors}</div>;
  return (
    <Fragment>
      {!SdkReady ? (
        <div className="loading" data-testid="Loading">
          Loading
        </div>
      ) : (
        <Fragment>
          <div className="container" id="paypal">
            <AlertDisplay msg={Alert} type="success" />
            <PayPalButton
              amount={Order.totalPrice}
              onSuccess={successPaymentHandler}
              onError={DisplayPaymentError}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Paypal;
