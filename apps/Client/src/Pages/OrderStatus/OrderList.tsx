import { Link } from "react-router-dom";
import { StyledContainer } from "../../Components/StyledComponents/Container";
import { OrderListItem } from "../../Constants/interface";
import { ListItem, OrderLists } from "./StyledOrderStatus";

type Props = {
  Orders: OrderListItem[];
};

const OrderList = ({ Orders }: Props) => {
  return (
    <StyledContainer theme={{ marginTop: 5 }}>
      <OrderLists>
        {Orders.map((order, index: number) => (
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
    </StyledContainer>
  );
};

export default OrderList;
