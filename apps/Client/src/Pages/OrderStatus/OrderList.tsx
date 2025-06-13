import { Link } from "react-router-dom";
import { OrderListItem } from "../../Constants/interface";
import {
  StyledListItem as ListItem,
  StyledOrderLists as OrderLists,
} from "./StyledOrderStatus";
import { css } from "@linaria/core";

type Props = {
  orders: OrderListItem[];
};

const StyledContainer = css`
  width: 100%;
  max-width: 100ch;
  margin: 5rem auto;
`;

const OrderList = ({ orders }: Props) => {
  return (
    <div className={StyledContainer}>
      <OrderLists>
        {orders.map((order, index: number) => (
          <Link to={`/OrderStatus/${order._id}`} key={index}>
            <ListItem>
              <p>ORDER:{order._id}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Total:${order.totalPrice}</p>
              {order.isDelivered ? (
                <p className="success">Delivered</p>
              ) : (
                <p className="alert">Not Delivered</p>
              )}
            </ListItem>
          </Link>
        ))}
      </OrderLists>
    </div>
  );
};

export default OrderList;
