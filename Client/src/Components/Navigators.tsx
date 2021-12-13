import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const LinkContainer = styled.ul`
  padding-left: 0%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
`;

const Navigators = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <LinkContainer>
      <li className={pathname === "/address" ? "Link-border" : ""}>
        <Link to="/address">Address</Link>
      </li>
      <li className={pathname === "/payment" ? "Link-border" : ""}>
        <Link to="/payment">Payment</Link>
      </li>
      <li className={pathname === "/PlaceOrder" ? "Link-border" : ""}>
        <Link to="/PlaceOrder">Place Order</Link>
      </li>
    </LinkContainer>
  );
};

export default Navigators;
