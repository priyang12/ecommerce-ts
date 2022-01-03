import { Link } from "react-router-dom";
import styled from "styled-components";
import { Order } from "../types";
import { StyledContainer } from "./StyledComponents/Container";

type Props = {
  Orders: [];
};

const ListItem = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--assertive-color);
  color: var(--main-light-color);
  border-radius: 15px;
  div {
    min-width: 300px;
  }
  p {
    min-width: 100px;
  }
  a {
    color: var(--bg-light);
  }
`;

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
    <StyledContainer theme={{ marginTop: 5 }}>
      {Orders.map((order: Order, index: number) => (
        <ListItem key={index}>
          {order.user ? (
            <div>
              <p>name :{order.user.name}</p>
              <p>Email :{order.user.email}</p>
            </div>
          ) : (
            <h4>ORDER:{order._id}</h4>
          )}
          <p>Method: {order.paymentMethod}</p>
          <p>Total:${order.totalPrice}</p>
          {order.isDelivered ? (
            <p className='success'>Delivered</p>
          ) : (
            <p className='alert'>Not Delivered</p>
          )}

          <Link to={`./OrderStatus/${order._id}`}>Details</Link>
        </ListItem>
      ))}
    </StyledContainer>
  );
};

export default OrderList;
