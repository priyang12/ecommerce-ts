import { Link } from "react-router-dom";

type Props = {
  Orders: [];
};

const OrderList = ({ Orders }: Props) => {
  if (!Orders) return null;
  if (Orders.length === 0) {
    return (
      <ul className='list'>
        <li className='list-item'>
          <h1> No Order Are In Place</h1>
        </li>
      </ul>
    );
  }
  return (
    <ul className='list'>
      {Orders.map((order: any, index: number) => (
        <li className='list-item' key={index}>
          <h4>ORDER:{order._id}</h4>
          <p>Method: {order.paymentMethod}</p>
          <p>Total:${order.totalPrice}</p>
          {order.isDelivered ? (
            <p className='success'>Delivered</p>
          ) : (
            <p className='alert'>Not Delivered</p>
          )}

          <Link to={`./OrderStatus/${order._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
