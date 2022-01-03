import { useLocation } from "react-router-dom";
import { useFetch } from "../Utils/CustomHooks";
import OrderList from "../Components/OrderList";
import Spinner from "../Components/Spinner";

const OrderStatus = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  const Url = pathname === "/OrderStatus" ? "/api/orders" : "/api/orders/all";

  const [FetchData, Err, loading] = useFetch(Url);
  console.log(Url);

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
