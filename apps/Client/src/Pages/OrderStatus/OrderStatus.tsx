import { useLoadOrders } from "../../API/OrdersAPI";
import OrderList from "./OrderList";
import Spinner from "../../Components/Spinner";
import { Helmet } from "react-helmet-async";

const OrderStatus = () => {
  const { isLoading: isOrdersLoading, data: OrderData } = useLoadOrders();

  if (isOrdersLoading) return <Spinner />;

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
