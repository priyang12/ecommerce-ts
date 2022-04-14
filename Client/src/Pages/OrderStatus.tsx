import { useLocation } from "react-router-dom";
import OrderList from "../Components/OrderList";
import Spinner from "../Components/Spinner";
import { useQuery } from "react-query";
import { LoadOrders } from "../API/OrdersAPI";

const OrderStatus = () => {
  const { pathname } = useLocation();
  const Url = pathname === "/OrderStatus" ? "/api/orders" : "/api/orders/all";

  const {
    isLoading,
    isError,
    data: OrderData,
    error,
  }: {
    isLoading: boolean;
    isError: boolean;
    data: any;
    error: any;
  } = useQuery([`${Url}`], LoadOrders);

  if (isLoading) return <Spinner />;
  if (isError) return <div>{error.message}</div>;
  if (!OrderData) return <div>Server Error Please Try Again</div>;

  return (
    <section id="OrderStatus">
      <OrderList Orders={OrderData} />
    </section>
  );
};

export default OrderStatus;
