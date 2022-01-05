import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../Utils/CustomHooks";
import OrderList from "../Components/OrderList";
import Spinner from "../Components/Spinner";

const OrderStatus = () => {
  const { pathname } = useLocation();

  const [Url, setUrl] = useState("");

  const [FetchData, Err, loading] = useFetch(Url);
  useEffect(() => {
    if (pathname === "/OrderStatus") setUrl("/api/orders");
    else setUrl("/api/orders/all");
  }, [pathname]);

  if (loading) return <Spinner />;
  if (Err) return <div>{Err}</div>;
  if (!FetchData) return <div>Server Error Please Try Again</div>;

  return (
    <section id='OrderStatus'>
      <OrderList Orders={FetchData} />
    </section>
  );
};

export default OrderStatus;
