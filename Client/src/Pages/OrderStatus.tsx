import OrderList from "../Components/OrderList";
import Spinner from "../Components/Spinner";
import { useFetch } from "../Utils/CustomHooks";

const OrderStatus = () => {
  const Url = "/api/orders";
  const [FetchData, Err, loading] = useFetch(Url);

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
