import { Helmet } from "react-helmet-async";
import { useLoadOrders } from "../../API/OrdersAPI";
import OrderList from "./OrderList";
import Spinner from "../../Components/Spinner";
import {
  StyledEmptyContainer as EmptyContainer,
  StyledSpinnerWrapper as SpinnerWrapper,
} from "./StyledOrderStatus";

/**
 * @component OrderStatus
 * @description
 * Displays the user's order status page.
 * Fetches order data using `useLoadOrders` and conditionally renders:
 * - A spinner while loading
 * - A list of orders if available
 * - A message indicating no orders otherwise
 *
 * @returns {JSX.Element} React component that shows either a loading spinner, a list of orders, or an empty state.
 *
 * @route /OrderStatus
 */
const OrderStatus = () => {
  const { isLoading: isOrdersLoading, data: orderData } = useLoadOrders();

  if (isOrdersLoading)
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <section>
        {orderData && orderData.length > 0 ? (
          <OrderList orders={orderData} />
        ) : (
          <EmptyContainer>
            <h1>No Order Are In Place</h1>
          </EmptyContainer>
        )}
      </section>
    </>
  );
};

export default OrderStatus;
