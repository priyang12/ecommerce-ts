import { useLoadOrders } from "../../API/OrdersAPI";
import OrderList from "./OrderList";
import Spinner from "../../Components/Spinner";
import { Helmet } from "react-helmet-async";

const OrderStatus = () => {
  const {
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    data: OrderData,
    error: OrderError,
  } = useLoadOrders("/api/orders");

  if (isOrdersLoading) return <Spinner />;

  // @ts-ignore
  if (isOrdersError) return <div>{OrderError.message}</div>;

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section>
        {OrderData && OrderData.length > 0 ? (
          <OrderList Orders={OrderData} />
        ) : (
          <div>No Order Are In Place</div>
        )}
      </section>
    </>
  );
};

export default OrderStatus;
